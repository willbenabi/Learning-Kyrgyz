require 'rails_helper'

RSpec.describe "GrammarExams", type: :request, inertia: true do
  let(:user) { create(:user) }

  describe "GET /grammar_exams/new" do
    context "when not authenticated" do
      it "redirects to login" do
        get "/grammar_exams/new?level=A1"
        expect(response).to have_http_status(:found)
        expect(response.location).to include(login_path)
      end
    end

    context "when authenticated" do
      before do
        # Create sufficient lesson completions to unlock exam
        15.times do |i|
          create(:lesson_completion, user: user, module_type: 'grammar', lesson_id: "a1_lesson_#{i}")
        end
      end

      context "with JSON format" do
        it "returns exam availability data" do
          get "/grammar_exams/new?level=A1",
              headers: auth_headers(user),
              as: :json

          expect(response).to have_http_status(:ok)
          json = JSON.parse(response.body)
          expect(json).to have_key('can_take_exam')
          expect(json).to have_key('best_score')
          expect(json).to have_key('attempt_count')
        end

        it "returns can_take_exam true when user completed all lessons" do
          get "/grammar_exams/new?level=A1",
              headers: auth_headers(user),
              as: :json

          json = JSON.parse(response.body)
          expect(json['can_take_exam']).to be true
          expect(json['best_score']).to eq(0)
          expect(json['attempt_count']).to eq(0)
        end

        it "returns best score and attempt count when user has attempts" do
          create(:grammar_exam, user: user, level: 'A1', score: 85)
          create(:grammar_exam, user: user, level: 'A1', score: 92)

          get "/grammar_exams/new?level=A1",
              headers: auth_headers(user),
              as: :json

          json = JSON.parse(response.body)
          expect(json['best_score']).to eq(92)
          expect(json['attempt_count']).to eq(2)
        end
      end

      context "with HTML format (Inertia)" do
        it "renders the exam start page when user completed lessons" do
          get "/grammar_exams/new?level=A1",
              headers: auth_headers(user, inertia: true)

          expect(response).to have_http_status(:ok)
          expect_inertia.to render_component('Learning/GrammarExam/New')
          expect_inertia.to include_props('level', 'bestScore', 'attemptCount', 'previousAttempts')
        end

        it "redirects when user has not completed lessons" do
          LessonCompletion.destroy_all # Remove all completions

          get "/grammar_exams/new?level=A1",
              headers: auth_headers(user, inertia: true)

          expect(response).to have_http_status(:found)
        end

        it "includes previous attempts in props" do
          create(:grammar_exam, user: user, level: 'A1', score: 75)
          create(:grammar_exam, user: user, level: 'A1', score: 92)

          get "/grammar_exams/new?level=A1",
              headers: auth_headers(user, inertia: true)

          expect(inertia.props['previousAttempts'].length).to eq(2)
        end
      end

      context "with invalid level" do
        it "returns unprocessable entity" do
          get "/grammar_exams/new?level=Z9",
              headers: auth_headers(user),
              as: :json

          expect(response).to have_http_status(:unprocessable_entity)
          json = JSON.parse(response.body)
          expect(json['error']).to eq('Invalid level')
        end
      end
    end
  end

  describe "POST /grammar_exams/generate" do
    context "when not authenticated" do
      it "returns unauthorized" do
        post "/grammar_exams/generate", params: { level: 'A1' }
        expect(response).to have_http_status(:found) # redirects to login
      end
    end

    context "when authenticated" do
      before do
        create_list(:grammar_exam_question, 40, level: 'A1')
      end

      it "generates 35 random questions" do
        post "/grammar_exams/generate",
             params: { level: 'A1' },
             headers: auth_headers(user)

        expect(response).to have_http_status(:ok)
        json = JSON.parse(response.body)
        expect(json['questions'].length).to eq(35)
      end

      it "returns questions with correct format" do
        post "/grammar_exams/generate",
             params: { level: 'A1' },
             headers: auth_headers(user)

        json = JSON.parse(response.body)
        question = json['questions'].first

        expect(question).to have_key('id')
        expect(question).to have_key('category')
        expect(question).to have_key('question')
        expect(question).to have_key('options')
      end

      it "returns error when not enough questions" do
        GrammarExamQuestion.destroy_all
        create_list(:grammar_exam_question, 10, level: 'B1')

        post "/grammar_exams/generate",
             params: { level: 'B1' },
             headers: auth_headers(user)

        expect(response).to have_http_status(:unprocessable_entity)
        json = JSON.parse(response.body)
        expect(json['error']).to include('Not enough questions')
      end
    end
  end

  describe "POST /grammar_exams/submit" do
    let!(:questions) do
      (1..35).map do |i|
        create(:grammar_exam_question, level: 'A1', correct_answer_index: 0)
      end
    end

    let(:answers) do
      questions.map { |q| { question_id: q.id, selected_index: 0 } }
    end

    context "when not authenticated" do
      it "returns unauthorized" do
        post "/grammar_exams/submit",
             params: { level: 'A1', answers: answers }

        expect(response).to have_http_status(:found) # redirects to login
      end
    end

    context "when authenticated" do
      it "creates a grammar exam record" do
        expect {
          post "/grammar_exams/submit",
               params: { level: 'A1', answers: answers, time_spent_seconds: 1800 },
               headers: auth_headers(user)
        }.to change(GrammarExam, :count).by(1)

        expect(response).to have_http_status(:ok)
      end

      it "returns exam results" do
        post "/grammar_exams/submit",
             params: { level: 'A1', answers: answers },
             headers: auth_headers(user)

        json = JSON.parse(response.body)
        expect(json['success']).to be true
        expect(json['results']).to have_key('exam_id')
        expect(json['results']).to have_key('score')
        expect(json['results']).to have_key('correct_count')
        expect(json['results']).to have_key('passed')
        expect(json['results']).to have_key('category_breakdown')
      end

      it "tracks lesson completion for progress" do
        expect {
          post "/grammar_exams/submit",
               params: { level: 'A1', answers: answers },
               headers: auth_headers(user)
        }.to change(LessonCompletion, :count).by(1)

        completion = LessonCompletion.last
        expect(completion.module_type).to eq('grammar')
        expect(completion.lesson_id).to eq('A1_final_exam')
      end

      it "returns error with invalid level" do
        post "/grammar_exams/submit",
             params: { level: 'Z9', answers: answers },
             headers: auth_headers(user)

        expect(response).to have_http_status(:unprocessable_entity)
        json = JSON.parse(response.body)
        expect(json['error']).to be_present
      end

      it "returns error with empty answers" do
        post "/grammar_exams/submit",
             params: { level: 'A1', answers: [] },
             headers: auth_headers(user)

        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "GET /grammar_exams/:id/results" do
    let!(:exam) { create(:grammar_exam, user: user, level: 'A1', score: 85) }

    context "when not authenticated" do
      it "redirects to login" do
        get "/grammar_exams/#{exam.id}/results"
        expect(response).to have_http_status(:found)
        expect(response.location).to include(login_path)
      end
    end

    context "when authenticated" do
      it "renders the results page" do
        get "/grammar_exams/#{exam.id}/results",
            headers: auth_headers(user, inertia: true)

        expect(response).to have_http_status(:ok)
        expect_inertia.to render_component('Learning/GrammarExam/Results')
        expect_inertia.to include_props('exam', 'bestScore')
      end

      it "includes exam data in props" do
        get "/grammar_exams/#{exam.id}/results",
            headers: auth_headers(user, inertia: true)

        exam_props = inertia.props['exam']
        expect(exam_props['id']).to eq(exam.id)
        expect(exam_props['level']).to eq('A1')
        expect(exam_props['score']).to eq(85)
        expect(exam_props['passed']).to be true
      end

      it "returns 404 for non-existent exam" do
        get "/grammar_exams/99999/results",
            headers: auth_headers(user),
            as: :json

        expect(response).to have_http_status(:not_found)
      end

      it "does not allow viewing another user's exam" do
        other_user = create(:user)
        other_exam = create(:grammar_exam, user: other_user, level: 'A1')

        get "/grammar_exams/#{other_exam.id}/results",
            headers: auth_headers(user),
            as: :json

        expect(response).to have_http_status(:not_found)
      end
    end
  end
end
