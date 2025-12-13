require 'rails_helper'

RSpec.describe GrammarExams::SubmitExam, type: :service do
  let(:user) { create(:user) }
  let!(:questions) do
    (1..35).map do |i|
      create(:grammar_exam_question,
        level: 'A1',
        category: i <= 20 ? 'syntax' : 'morphology',
        correct_answer_index: 0
      )
    end
  end

  describe '#execute' do
    context 'with valid params and all correct answers' do
      let(:answers) do
        questions.map { |q| { question_id: q.id, selected_index: 0 } }
      end

      it 'creates a grammar exam record' do
        expect {
          described_class.run(user: user, level: 'A1', answers: answers, time_spent_seconds: 1800)
        }.to change(GrammarExam, :count).by(1)
      end

      it 'calculates score correctly (100%)' do
        outcome = described_class.run(user: user, level: 'A1', answers: answers, time_spent_seconds: 1800)

        expect(outcome).to be_valid
        expect(outcome.result[:score]).to eq(100)
        expect(outcome.result[:correct_count]).to eq(35)
        expect(outcome.result[:passed]).to be true
      end

      it 'saves graded answers with correct format' do
        outcome = described_class.run(user: user, level: 'A1', answers: answers)

        graded = outcome.result[:graded_answers]
        expect(graded.length).to eq(35)
        expect(graded.all? { |a| a[:correct] }).to be true
      end
    end

    context 'with partially correct answers (71% passing)' do
      let(:answers) do
        questions.map.with_index { |q, i| { question_id: q.id, selected_index: i < 25 ? 0 : 1 } }
      end

      it 'calculates score correctly (71%)' do
        outcome = described_class.run(user: user, level: 'A1', answers: answers)

        expect(outcome).to be_valid
        expect(outcome.result[:score]).to eq(71)
        expect(outcome.result[:correct_count]).to eq(25)
        expect(outcome.result[:passed]).to be true
      end

      it 'marks correct and incorrect answers properly' do
        outcome = described_class.run(user: user, level: 'A1', answers: answers)

        graded = outcome.result[:graded_answers]
        expect(graded.take(25).all? { |a| a[:correct] }).to be true
        expect(graded.drop(25).all? { |a| !a[:correct] }).to be true
      end
    end

    context 'with failing score (69%)' do
      let(:answers) do
        questions.map.with_index { |q, i| { question_id: q.id, selected_index: i < 24 ? 0 : 1 } }
      end

      it 'calculates score correctly (69%)' do
        outcome = described_class.run(user: user, level: 'A1', answers: answers)

        expect(outcome).to be_valid
        expect(outcome.result[:score]).to eq(69)
        expect(outcome.result[:correct_count]).to eq(24)
        expect(outcome.result[:passed]).to be false
      end
    end

    context 'with time spent' do
      let(:answers) do
        questions.map { |q| { question_id: q.id, selected_index: 0 } }
      end

      it 'saves time spent in the exam record' do
        outcome = described_class.run(user: user, level: 'A1', answers: answers, time_spent_seconds: 2400)

        exam = GrammarExam.last
        expect(exam.time_spent_seconds).to eq(2400)
      end
    end

    context 'without time spent' do
      let(:answers) do
        questions.map { |q| { question_id: q.id, selected_index: 0 } }
      end

      it 'allows nil time_spent_seconds' do
        outcome = described_class.run(user: user, level: 'A1', answers: answers)

        expect(outcome).to be_valid
        exam = GrammarExam.last
        expect(exam.time_spent_seconds).to be_nil
      end
    end

    context 'with category breakdown' do
      let(:answers) do
        questions.map.with_index { |q, i| { question_id: q.id, selected_index: i < 15 ? 0 : 1 } }
      end

      it 'returns category breakdown in results' do
        outcome = described_class.run(user: user, level: 'A1', answers: answers)

        breakdown = outcome.result[:category_breakdown]
        # First 20 are syntax, 15 correct from first 15
        expect(breakdown['syntax'][:total]).to eq(20)
        expect(breakdown['syntax'][:correct]).to eq(15)
        # Last 15 are morphology, all incorrect (indexes 15-34 have wrong answer)
        expect(breakdown['morphology'][:total]).to eq(15)
        expect(breakdown['morphology'][:correct]).to eq(0)
      end
    end

    context 'with invalid level' do
      let(:answers) do
        questions.take(35).map { |q| { question_id: q.id, selected_index: 0 } }
      end

      it 'returns an invalid outcome' do
        outcome = described_class.run(user: user, level: 'Z9', answers: answers)

        expect(outcome).not_to be_valid
        expect(outcome.errors.full_messages).to include('Level is not included in the list')
      end
    end

    context 'with missing user' do
      let(:answers) do
        questions.take(35).map { |q| { question_id: q.id, selected_index: 0 } }
      end

      it 'returns an invalid outcome' do
        outcome = described_class.run(user: nil, level: 'A1', answers: answers)

        expect(outcome).not_to be_valid
      end
    end

    context 'with wrong number of answers' do
      it 'returns an invalid outcome for too few answers' do
        answers = questions.take(10).map { |q| { question_id: q.id, selected_index: 0 } }
        outcome = described_class.run(user: user, level: 'A1', answers: answers)

        expect(outcome).not_to be_valid
        expect(outcome.errors.full_messages).to include('Answers must contain exactly 35 answers')
      end

      it 'returns an invalid outcome for too many answers' do
        # Create 40 questions
        extra_questions = create_list(:grammar_exam_question, 5, level: 'A1')
        all_questions = questions + extra_questions
        answers = all_questions.map { |q| { question_id: q.id, selected_index: 0 } }

        outcome = described_class.run(user: user, level: 'A1', answers: answers)

        expect(outcome).not_to be_valid
        expect(outcome.errors.full_messages).to include('Answers must contain exactly 35 answers')
      end
    end

    context 'with question IDs that do not exist' do
      let(:answers) do
        (1..35).map { |i| { question_id: 9999 + i, selected_index: 0 } }
      end

      it 'raises error when all questions are missing' do
        expect {
          described_class.run(user: user, level: 'A1', answers: answers)
        }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end
  end
end
