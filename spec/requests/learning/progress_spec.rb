require 'rails_helper'

RSpec.describe 'Learning::Progress', type: :request do
  let(:user) { create(:user) }
  let(:user_progress) { user.user_progress || user.create_user_progress! }

  describe 'POST /learning/progress/complete_lesson' do
    context 'when authenticated' do
      it 'creates a lesson completion record' do
        expect {
          post '/learning/progress/complete_lesson',
            params: { module_type: 'grammar', lesson_id: 'a1_syntax_1', score: 85, time_spent: 300 },
            headers: auth_headers(user),
            as: :json
        }.to change(LessonCompletion, :count).by(1)

        expect(response).to have_http_status(:success)
      end

      it 'returns updated progress with completedLessonIds' do
        post '/learning/progress/complete_lesson',
          params: { module_type: 'grammar', lesson_id: 'a1_syntax_1' },
          headers: auth_headers(user),
          as: :json

        json = JSON.parse(response.body)
        expect(json['success']).to be true
        expect(json['progress']).to be_present
        expect(json['progress']['completedLessonIds']).to be_present
        expect(json['progress']['completedLessonIds']['grammar']).to include('a1_syntax_1')
      end

      it 'increments lessons completed count' do
        initial_count = user_progress.lessons_completed

        post '/learning/progress/complete_lesson',
          params: { module_type: 'grammar', lesson_id: 'a1_syntax_1' },
          headers: auth_headers(user),
          as: :json

        user_progress.reload
        expect(user_progress.lessons_completed).to eq(initial_count + 1)
      end

      it 'does not create duplicate completions for same lesson' do
        # Complete lessonfirst time
        post '/learning/progress/complete_lesson',
          params: { module_type: 'grammar', lesson_id: 'a1_syntax_1' },
          headers: auth_headers(user),
          as: :json

        expect {
          # Try to complete same lesson again
          post '/learning/progress/complete_lesson',
            params: { module_type: 'grammar', lesson_id: 'a1_syntax_1' },
            headers: auth_headers(user),
            as: :json
        }.not_to change(LessonCompletion, :count)
      end

      it 'tracks multiple lessons across different modules' do
        post '/learning/progress/complete_lesson',
          params: { module_type: 'grammar', lesson_id: 'a1_syntax_1' },
          headers: auth_headers(user),
          as: :json

        post '/learning/progress/complete_lesson',
          params: { module_type: 'reading', lesson_id: 'a1_reading_1' },
          headers: auth_headers(user),
          as: :json

        json = JSON.parse(response.body)
        expect(json['progress']['completedLessonIds']['grammar']).to include('a1_syntax_1')
        expect(json['progress']['completedLessonIds']['reading']).to include('a1_reading_1')
      end

      it 'returns new achievements when earned' do
        # This would trigger first_lesson achievement
        user.lesson_completions.destroy_all
        user_progress.update(lessons_completed: 0)

        post '/learning/progress/complete_lesson',
          params: { module_type: 'grammar', lesson_id: 'a1_syntax_1' },
          headers: auth_headers(user),
          as: :json

        json = JSON.parse(response.body)
        # Achievement check depends on implementation
        expect(json).to have_key('new_achievements')
      end
    end

    context 'when not authenticated' do
      it 'returns unauthorized' do
        post '/learning/progress/complete_lesson',
          params: { module_type: 'grammar', lesson_id: 'a1_syntax_1' },
          as: :json

        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'GET /learning/progress' do
    context 'when authenticated' do
      before do
        # Create some lesson completions
        create_list(:lesson_completion, 3, user: user, module_type: 'grammar')
        create_list(:lesson_completion, 2, user: user, module_type: 'reading')
      end

      it 'returns user progress with all completed lesson IDs' do
        get '/learning/progress',
          headers: auth_headers(user).merge('Accept' => 'application/json')

        expect(response).to have_http_status(:success)
        json = JSON.parse(response.body)

        expect(json['completedLessonIds']).to be_present
        expect(json['completedLessonIds']['grammar'].length).to eq(3)
        expect(json['completedLessonIds']['reading'].length).to eq(2)
      end

      it 'includes lessons by module stats' do
        get '/learning/progress',
          headers: auth_headers(user).merge('Accept' => 'application/json')

        json = JSON.parse(response.body)
        expect(json['lessonsByModule']['grammar']).to eq(3)
        expect(json['lessonsByModule']['reading']).to eq(2)
      end

      it 'returns recent lessons limited to 10' do
        create_list(:lesson_completion, 15, user: user, module_type: 'vocabulary')

        get '/learning/progress',
          headers: auth_headers(user).merge('Accept' => 'application/json')

        json = JSON.parse(response.body)
        expect(json['recentLessons'].length).to eq(10)
      end

      it 'includes all lesson IDs regardless of recency' do
        # Create 15 grammar lessons
        15.times do |i|
          create(:lesson_completion, user: user, module_type: 'grammar', lesson_id: "grammar_#{i}")
        end

        get '/learning/progress',
          headers: auth_headers(user).merge('Accept' => 'application/json')

        json = JSON.parse(response.body)
        # recentLessons is limited to 10
        expect(json['recentLessons'].length).to eq(10)
        # But completedLessonIds should have all 15
        expect(json['completedLessonIds']['grammar'].length).to eq(15)
      end
    end
  end

  describe "GET /learning/progress/upgrade_eligibility" do
    context "when not authenticated" do
      it "redirects to login" do
        get "/learning/progress/upgrade_eligibility"
        expect(response).to have_http_status(:found)
      end
    end

    context "when authenticated" do
      context "with A1 user who completed all requirements" do
        before do
          14.times do |i|
            create(:lesson_completion, user: user, module_type: 'grammar', lesson_id: "a1_lesson_#{i + 1}")
          end
          10.times do |i|
            create(:lesson_completion, user: user, module_type: 'reading', lesson_id: "a1_reading_#{i + 1}")
          end
          3.times do |i|
            create(:lesson_completion, user: user, module_type: 'writing', lesson_id: "a1_writing_#{i + 1}")
          end
          4.times do |i|
            create(:lesson_completion, user: user, module_type: 'vocabulary', lesson_id: "a1_vocabulary_#{i + 1}")
          end
          create(:grammar_exam, user: user, level: 'A1', score: 85)
        end

        it "returns eligibility data" do
          get "/learning/progress/upgrade_eligibility",
              headers: auth_headers(user)

          expect(response).to have_http_status(:ok)
          json = JSON.parse(response.body)
          expect(json['eligible']).to be true
          expect(json['current_level']).to eq('A1')
          expect(json['next_level']).to eq('A2')
        end

        it "returns completion status for all modules" do
          get "/learning/progress/upgrade_eligibility",
              headers: auth_headers(user)

          json = JSON.parse(response.body)
          status = json['completion_status']
          expect(status['grammar']['complete']).to be true
          expect(status['reading']['complete']).to be true
          expect(status['writing']['complete']).to be true
          expect(status['vocabulary']['complete']).to be true
        end
      end

      context "with partially completed user" do
        before do
          5.times do |i|
            create(:lesson_completion, user: user, module_type: 'grammar', lesson_id: "a1_lesson_#{i + 1}")
          end
        end

        it "returns ineligible status" do
          get "/learning/progress/upgrade_eligibility",
              headers: auth_headers(user)

          expect(response).to have_http_status(:ok)
          json = JSON.parse(response.body)
          expect(json['eligible']).to be false
        end
      end

      context "with C1 user" do
        before do
          user_progress.update!(level: 'C1')
        end

        it "returns ineligible with no next level" do
          get "/learning/progress/upgrade_eligibility",
              headers: auth_headers(user)

          expect(response).to have_http_status(:ok)
          json = JSON.parse(response.body)
          expect(json['eligible']).to be false
          expect(json['next_level']).to be_nil
        end
      end
    end
  end

  describe "POST /learning/progress/upgrade" do
    context "when not authenticated" do
      it "redirects to login" do
        post "/learning/progress/upgrade", params: { to_level: 'A2' }
        expect(response).to have_http_status(:found)
      end
    end

    context "when authenticated" do
      context "with eligible upgrade" do
        before do
          14.times do |i|
            create(:lesson_completion, user: user, module_type: 'grammar', lesson_id: "a1_lesson_#{i + 1}")
          end
          10.times do |i|
            create(:lesson_completion, user: user, module_type: 'reading', lesson_id: "a1_reading_#{i + 1}")
          end
          3.times do |i|
            create(:lesson_completion, user: user, module_type: 'writing', lesson_id: "a1_writing_#{i + 1}")
          end
          4.times do |i|
            create(:lesson_completion, user: user, module_type: 'vocabulary', lesson_id: "a1_vocabulary_#{i + 1}")
          end
          create(:grammar_exam, user: user, level: 'A1', score: 85)
        end

        it "successfully upgrades user" do
          post "/learning/progress/upgrade",
               params: { to_level: 'A2' },
               headers: auth_headers(user)

          expect(response).to have_http_status(:ok)
          json = JSON.parse(response.body)
          expect(json['success']).to be true
          expect(json['new_level']).to eq('A2')
          expect(json['previous_level']).to eq('A1')
        end

        it "updates user progress level" do
          post "/learning/progress/upgrade",
               params: { to_level: 'A2' },
               headers: auth_headers(user)

          user_progress.reload
          expect(user_progress.level).to eq('A2')
        end

        it "awards achievement" do
          expect {
            post "/learning/progress/upgrade",
                 params: { to_level: 'A2' },
                 headers: auth_headers(user)
          }.to change(Achievement, :count).by(1)

          json = JSON.parse(response.body)
          expect(json['achievement']).not_to be_nil
          expect(json['achievement']['type']).to eq('level_upgrade_a2')
        end
      end

      context "with ineligible upgrade" do
        before do
          # Only 5 grammar lessons (need 14)
          5.times do |i|
            create(:lesson_completion, user: user, module_type: 'grammar', lesson_id: "a1_lesson_#{i + 1}")
          end
        end

        it "returns error" do
          post "/learning/progress/upgrade",
               params: { to_level: 'A2' },
               headers: auth_headers(user)

          expect(response).to have_http_status(:unprocessable_entity)
          json = JSON.parse(response.body)
          expect(json['error']).to be_present
        end

        it "does not update user level" do
          post "/learning/progress/upgrade",
               params: { to_level: 'A2' },
               headers: auth_headers(user)

          user_progress.reload
          expect(user_progress.level).to eq('A1')
        end
      end

      context "with invalid level progression" do
        before do
          14.times do |i|
            create(:lesson_completion, user: user, module_type: 'grammar', lesson_id: "a1_lesson_#{i + 1}")
          end
          10.times do |i|
            create(:lesson_completion, user: user, module_type: 'reading', lesson_id: "a1_reading_#{i + 1}")
          end
          3.times do |i|
            create(:lesson_completion, user: user, module_type: 'writing', lesson_id: "a1_writing_#{i + 1}")
          end
          4.times do |i|
            create(:lesson_completion, user: user, module_type: 'vocabulary', lesson_id: "a1_vocabulary_#{i + 1}")
          end
          create(:grammar_exam, user: user, level: 'A1', score: 85)
        end

        it "rejects level skip (A1→B1)" do
          post "/learning/progress/upgrade",
               params: { to_level: 'B1' },
               headers: auth_headers(user)

          expect(response).to have_http_status(:unprocessable_entity)
          json = JSON.parse(response.body)
          expect(json['error']).to match(/Invalid level progression/i)
        end
      end

      context "with invalid to_level parameter" do
        it "returns error for invalid level code" do
          post "/learning/progress/upgrade",
               params: { to_level: 'Z9' },
               headers: auth_headers(user)

          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end
  end
end
