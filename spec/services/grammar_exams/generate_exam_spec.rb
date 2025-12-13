require 'rails_helper'

RSpec.describe GrammarExams::GenerateExam, type: :service do
  describe '#execute' do
    context 'when level is valid' do
      before do
        create_list(:grammar_exam_question, 40, level: 'A1')
      end

      it 'returns 35 random questions for the level' do
        outcome = described_class.run(level: 'A1')

        expect(outcome).to be_valid
        expect(outcome.result).to be_an(Array)
        expect(outcome.result.length).to eq(35)
      end

      it 'returns questions with correct format' do
        outcome = described_class.run(level: 'A1')
        question = outcome.result.first

        expect(question).to have_key(:id)
        expect(question).to have_key(:category)
        expect(question).to have_key(:question)
        expect(question).to have_key(:options)
        expect(question[:options]).to have_key('en')
        expect(question[:options]).to have_key('ru')
      end

      it 'returns different question sets on subsequent calls' do
        first_outcome = described_class.run(level: 'A1')
        second_outcome = described_class.run(level: 'A1')

        first_ids = first_outcome.result.map { |q| q[:id] }
        second_ids = second_outcome.result.map { |q| q[:id] }

        # Very unlikely to be identical if random
        expect(first_ids).not_to eq(second_ids)
      end
    end

    context 'when level is invalid' do
      it 'returns an invalid outcome with error' do
        outcome = described_class.run(level: 'Z9')

        expect(outcome).not_to be_valid
        expect(outcome.errors.full_messages).to include('Level is not included in the list')
      end
    end

    context 'when there are not enough questions' do
      before do
        create_list(:grammar_exam_question, 10, level: 'B1') # Only 10 questions
      end

      it 'returns an invalid outcome with error message' do
        outcome = described_class.run(level: 'B1')

        expect(outcome).not_to be_valid
        expect(outcome.errors.full_messages).to include('Not enough questions available for B1 level')
      end
    end

    context 'when level is missing' do
      it 'returns an invalid outcome' do
        outcome = described_class.run(level: nil)

        expect(outcome).not_to be_valid
      end
    end
  end
end
