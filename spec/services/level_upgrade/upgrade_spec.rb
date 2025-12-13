require 'rails_helper'

RSpec.describe LevelUpgrade::Upgrade, type: :service do
  let(:user) { create(:user) }
  let(:user_progress) { user.user_progress }

  describe '#execute' do
    context 'with eligible A1→A2 upgrade' do
      before do
        # Complete all A1 requirements
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

      it 'successfully upgrades user to A2' do
        outcome = described_class.run(user: user, to_level: 'A2')

        expect(outcome).to be_valid
        expect(outcome.result[:success]).to be true
        expect(outcome.result[:new_level]).to eq('A2')
        expect(outcome.result[:previous_level]).to eq('A1')
      end

      it 'updates user_progress level' do
        described_class.run(user: user, to_level: 'A2')

        user_progress.reload
        expect(user_progress.level).to eq('A2')
      end

      it 'awards achievement' do
        expect {
          described_class.run(user: user, to_level: 'A2')
        }.to change(Achievement, :count).by(1)

        achievement = Achievement.last
        expect(achievement.user).to eq(user)
        expect(achievement.achievement_type).to eq('level_upgrade_a2')
      end

      it 'returns achievement data' do
        outcome = described_class.run(user: user, to_level: 'A2')

        achievement_data = outcome.result[:achievement]
        expect(achievement_data).not_to be_nil
        expect(achievement_data[:type]).to eq('level_upgrade_a2')
        expect(achievement_data[:title]).to be_present
      end
    end

    context 'with ineligible upgrade attempt' do
      before do
        # Only 5 grammar lessons (need 14)
        5.times do |i|
          create(:lesson_completion, user: user, module_type: 'grammar', lesson_id: "a1_lesson_#{i + 1}")
        end
        # No exam
      end

      it 'returns invalid outcome' do
        outcome = described_class.run(user: user, to_level: 'A2')

        expect(outcome).not_to be_valid
        expect(outcome.errors.full_messages).to include(match(/not completed all requirements/i))
      end

      it 'does not update user level' do
        described_class.run(user: user, to_level: 'A2')

        user_progress.reload
        expect(user_progress.level).to eq('A1')
      end

      it 'does not award achievement' do
        expect {
          described_class.run(user: user, to_level: 'A2')
        }.not_to change(Achievement, :count)
      end
    end

    context 'with invalid level progression' do
      before do
        # Complete A1 requirements
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

      it 'rejects A1→B1 skip' do
        outcome = described_class.run(user: user, to_level: 'B1')

        expect(outcome).not_to be_valid
        expect(outcome.errors.full_messages).to include(match(/Invalid level progression/i))
      end

      it 'rejects downgrade A1→A1' do
        outcome = described_class.run(user: user, to_level: 'A1')

        expect(outcome).not_to be_valid
      end
    end

    context 'with all valid progressions' do
      it 'allows A2→B1' do
        user_progress.update!(level: 'A2')
        # Setup A2 completions
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
        create(:grammar_exam, user: user, level: 'A2', score: 80)

        outcome = described_class.run(user: user, to_level: 'B1')

        expect(outcome).to be_valid
        expect(outcome.result[:new_level]).to eq('B1')
      end

      it 'allows B1→B2' do
        user_progress.update!(level: 'B1')
        # Setup B1 completions
        11.times do |i|
          create(:lesson_completion, user: user, module_type: 'grammar', lesson_id: "b1_lesson_#{i + 1}")
        end
        10.times do |i|
          create(:lesson_completion, user: user, module_type: 'reading', lesson_id: "b1_reading_#{i + 1}")
        end
        2.times do |i|
          create(:lesson_completion, user: user, module_type: 'writing', lesson_id: "b1_writing_#{i + 1}")
        end
        2.times do |i|
          create(:lesson_completion, user: user, module_type: 'vocabulary', lesson_id: "b1_vocabulary_#{i + 1}")
        end
        create(:grammar_exam, user: user, level: 'B1', score: 75)

        outcome = described_class.run(user: user, to_level: 'B2')

        expect(outcome).to be_valid
        expect(outcome.result[:new_level]).to eq('B2')
      end

      it 'allows B2→C1' do
        user_progress.update!(level: 'B2')
        # Setup B2 completions
        8.times do |i|
          create(:lesson_completion, user: user, module_type: 'grammar', lesson_id: "b2_lesson_#{i + 1}")
        end
        10.times do |i|
          create(:lesson_completion, user: user, module_type: 'reading', lesson_id: "b2_reading_#{i + 1}")
        end
        2.times do |i|
          create(:lesson_completion, user: user, module_type: 'writing', lesson_id: "b2_writing_#{i + 1}")
        end
        create(:lesson_completion, user: user, module_type: 'vocabulary', lesson_id: "b2_vocabulary_1")
        create(:grammar_exam, user: user, level: 'B2', score: 85)

        outcome = described_class.run(user: user, to_level: 'C1')

        expect(outcome).to be_valid
        expect(outcome.result[:new_level]).to eq('C1')
      end
    end

    context 'with invalid to_level parameter' do
      it 'rejects invalid level code' do
        outcome = described_class.run(user: user, to_level: 'Z9')

        expect(outcome).not_to be_valid
        expect(outcome.errors.full_messages).to include('To level is not included in the list')
      end

      it 'rejects A1 as target level' do
        outcome = described_class.run(user: user, to_level: 'A1')

        expect(outcome).not_to be_valid
        expect(outcome.errors.full_messages).to include('To level is not included in the list')
      end
    end
  end
end
