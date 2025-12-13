require 'rails_helper'

RSpec.describe LevelUpgrade::CheckEligibility, type: :service do
  let(:user) { create(:user) }
  let(:user_progress) { user.user_progress }

  describe '#execute' do
    context 'with A1 user who completed all requirements' do
      before do
        # Create 14 A1 grammar lessons
        14.times do |i|
          create(:lesson_completion, user: user, module_type: 'grammar', lesson_id: "a1_lesson_#{i + 1}")
        end

        # Create 10 A1 reading texts
        10.times do |i|
          create(:lesson_completion, user: user, module_type: 'reading', lesson_id: "a1_reading_#{i + 1}")
        end

        # Create 3 A1 writing prompts
        3.times do |i|
          create(:lesson_completion, user: user, module_type: 'writing', lesson_id: "a1_writing_#{i + 1}")
        end

        # Create 4 A1 vocabulary topics
        4.times do |i|
          create(:lesson_completion, user: user, module_type: 'vocabulary', lesson_id: "a1_vocabulary_#{i + 1}")
        end

        # Create passing grammar exam
        create(:grammar_exam, user: user, level: 'A1', score: 85)
      end

      it 'returns eligible true' do
        outcome = described_class.run(user: user, level: 'A1')

        expect(outcome).to be_valid
        expect(outcome.result[:eligible]).to be true
      end

      it 'returns correct current and next level' do
        outcome = described_class.run(user: user, level: 'A1')

        expect(outcome.result[:current_level]).to eq('A1')
        expect(outcome.result[:next_level]).to eq('A2')
      end

      it 'returns complete status for all modules' do
        outcome = described_class.run(user: user, level: 'A1')

        status = outcome.result[:completion_status]
        expect(status[:grammar][:complete]).to be true
        expect(status[:reading][:complete]).to be true
        expect(status[:writing][:complete]).to be true
        expect(status[:vocabulary][:complete]).to be true
      end

      it 'returns 100% overall percentage' do
        outcome = described_class.run(user: user, level: 'A1')

        expect(outcome.result[:overall_percentage]).to eq(100.0)
      end

      it 'counts exam as 15th lesson when passed' do
        outcome = described_class.run(user: user, level: 'A1')

        status = outcome.result[:completion_status][:grammar]
        expect(status[:completed]).to eq(15) # 14 lessons + 1 exam
        expect(status[:required]).to eq(15)
      end
    end

    context 'with A1 user who has not passed grammar exam' do
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

        # Failed exam (below 70%)
        create(:grammar_exam, user: user, level: 'A1', score: 65)
      end

      it 'returns eligible false' do
        outcome = described_class.run(user: user, level: 'A1')

        expect(outcome.result[:eligible]).to be false
      end

      it 'does not count exam when not passed' do
        outcome = described_class.run(user: user, level: 'A1')

        status = outcome.result[:completion_status][:grammar]
        expect(status[:completed]).to eq(14) # 14 lessons, exam not counted
        expect(status[:required]).to eq(15)
        expect(status[:complete]).to be false
      end
    end

    context 'with partially completed modules' do
      before do
        # Only 10 grammar lessons (need 14)
        10.times do |i|
          create(:lesson_completion, user: user, module_type: 'grammar', lesson_id: "a1_lesson_#{i + 1}")
        end

        # All reading (10/10)
        10.times do |i|
          create(:lesson_completion, user: user, module_type: 'reading', lesson_id: "a1_reading_#{i + 1}")
        end

        # No writing (0/3)
        # No vocabulary (0/4)

        create(:grammar_exam, user: user, level: 'A1', score: 75)
      end

      it 'returns eligible false' do
        outcome = described_class.run(user: user, level: 'A1')

        expect(outcome.result[:eligible]).to be false
      end

      it 'shows correct completion counts' do
        outcome = described_class.run(user: user, level: 'A1')

        status = outcome.result[:completion_status]
        expect(status[:grammar][:completed]).to eq(11) # 10 lessons + 1 exam
        expect(status[:grammar][:required]).to eq(15)
        expect(status[:reading][:completed]).to eq(10)
        expect(status[:reading][:required]).to eq(10)
        expect(status[:writing][:completed]).to eq(0)
        expect(status[:writing][:required]).to eq(3)
        expect(status[:vocabulary][:completed]).to eq(0)
        expect(status[:vocabulary][:required]).to eq(4)
      end

      it 'calculates correct overall percentage' do
        outcome = described_class.run(user: user, level: 'A1')

        # 11/15 + 10/10 + 0/3 + 0/4 = 21/32 = 65.6%
        expect(outcome.result[:overall_percentage]).to eq(65.6)
      end
    end

    context 'with C1 user (highest level)' do
      before do
        user_progress.update!(level: 'C1')
      end

      it 'returns eligible false' do
        outcome = described_class.run(user: user, level: 'C1')

        expect(outcome.result[:eligible]).to be false
      end

      it 'returns nil for next level' do
        outcome = described_class.run(user: user,level: 'C1')

        expect(outcome.result[:next_level]).to be_nil
      end
    end

    context 'with different level requirements' do
      before do
        user_progress.update!(level: 'A2')
        # A2 requirements: 11 grammar, 10 reading, 2 writing, 2 vocabulary
        11.times do |i|
          create(:lesson_completion, user: user, module_type: 'grammar', lesson_id: "a2_lesson_#{i + 1}")
        end
        10.times do |i|
          create(:lesson_completion, user: user, module_type: 'reading', lesson_id: "a2_reading_#{i + 1}")
        end
        2.times do |i|
          create(:lesson_completion, user: user, module_type: 'writing', lesson_id: "a2_writing_#{i + 1}")
        end
        2.times do |i|
          create(:lesson_completion, user: user, module_type: 'vocabulary', lesson_id: "a2_vocabulary_#{i + 1}")
        end
        create(:grammar_exam, user: user, level: 'A2', score: 90)
      end

      it 'returns eligible true for A2→B1 progression' do
        outcome = described_class.run(user: user, level: 'A2')

        expect(outcome.result[:eligible]).to be true
        expect(outcome.result[:current_level]).to eq('A2')
        expect(outcome.result[:next_level]).to eq('B1')
      end
    end

    context 'without specifying level (uses user progress level)' do
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
        create(:grammar_exam, user: user, level: 'A1', score: 80)
      end

      it 'uses user progress level' do
        outcome = described_class.run(user: user)

        expect(outcome.result[:current_level]).to eq('A1')
        expect(outcome.result[:eligible]).to be true
      end
    end

    context 'with invalid level' do
      it 'returns invalid outcome' do
        outcome = described_class.run(user: user, level: 'Z9')

        expect(outcome).not_to be_valid
        expect(outcome.errors.full_messages).to include('Level is not included in the list')
      end
    end
  end
end
