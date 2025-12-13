require 'rails_helper'

RSpec.describe GrammarExamQuestion, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:level) }
    it { should validate_inclusion_of(:level).in_array(%w[A1 A2 B1 B2 C1]) }
    it { should validate_presence_of(:category) }
    it { should validate_inclusion_of(:category).in_array(%w[syntax morphology]) }
    it { should validate_presence_of(:question_text) }
    it { should validate_presence_of(:options) }
    it { should validate_presence_of(:correct_answer_index) }
    it { should validate_numericality_of(:correct_answer_index).only_integer.is_greater_than_or_equal_to(0).is_less_than_or_equal_to(3) }

    describe 'options validation' do
      it 'validates that options has 4 items for both en and ru' do
        question = build(:grammar_exam_question, options: {
          'en' => ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
          'ru' => ['Вариант 1', 'Вариант 2', 'Вариант 3', 'Вариант 4']
        })

        expect(question).to be_valid
      end

      it 'invalidates when en options has less than 4 items' do
        question = build(:grammar_exam_question, options: {
          'en' => ['Option 1', 'Option 2'],
          'ru' => ['Вариант 1', 'Вариант 2', 'Вариант 3', 'Вариант 4']
        })

        expect(question).not_to be_valid
        expect(question.errors[:options]).to include('must have 4 en options')
      end

      it 'invalidates when ru options has more than 4 items' do
        question = build(:grammar_exam_question, options: {
          'en' => ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
          'ru' => ['Вариант 1', 'Вариант 2', 'Вариант 3', 'Вариант 4', 'Вариант 5']
        })

        expect(question).not_to be_valid
        expect(question.errors[:options]).to include('must have 4 ru options')
      end
    end
  end

  describe 'scopes' do
    let!(:a1_syntax) { create(:grammar_exam_question, level: 'A1', category: 'syntax') }
    let!(:a1_morphology) { create(:grammar_exam_question, level: 'A1', category: 'morphology') }
    let!(:b1_syntax) { create(:grammar_exam_question, level: 'B1', category: 'syntax') }

    describe '.by_level' do
      it 'filters questions by level' do
        expect(GrammarExamQuestion.by_level('A1')).to contain_exactly(a1_syntax, a1_morphology)
        expect(GrammarExamQuestion.by_level('B1')).to contain_exactly(b1_syntax)
      end
    end

    describe '.by_category' do
      it 'filters questions by category' do
        expect(GrammarExamQuestion.by_category('syntax')).to contain_exactly(a1_syntax, b1_syntax)
        expect(GrammarExamQuestion.by_category('morphology')).to contain_exactly(a1_morphology)
      end
    end

    describe '.random_order' do
      it 'returns questions in random order' do
        questions = create_list(:grammar_exam_question, 10, level: 'A1')
        ordered_ids = GrammarExamQuestion.by_level('A1').order(:id).pluck(:id)
        random_ids = GrammarExamQuestion.by_level('A1').random_order.pluck(:id)

        # Very unlikely to be in same order if truly random
        expect(random_ids).not_to eq(ordered_ids)
      end
    end
  end

  describe '.generate_exam_questions' do
    before do
      create_list(:grammar_exam_question, 40, level: 'A1')
    end

    it 'returns exactly 35 random questions for the level' do
      questions = GrammarExamQuestion.generate_exam_questions('A1')
      expect(questions.count).to eq(35)
      expect(questions.map(&:level).uniq).to eq(['A1'])
    end

    it 'returns different questions on subsequent calls' do
      first_set = GrammarExamQuestion.generate_exam_questions('A1').pluck(:id)
      second_set = GrammarExamQuestion.generate_exam_questions('A1').pluck(:id)

      # Very unlikely to be identical if random
      expect(first_set).not_to eq(second_set)
    end
  end

  describe '#formatted_for_exam' do
    it 'returns a hash with question data formatted for exam display' do
      question = create(:grammar_exam_question,
        question_text: 'Мен ___ бараам.',
        options: {
          'en' => ['to school', 'to home', 'to work', 'to store'],
          'ru' => ['в школу', 'домой', 'на работу', 'в магазин']
        },
        correct_answer_index: 0,
        explanation: 'Test explanation',
        category: 'syntax'
      )

      formatted = question.formatted_for_exam

      expect(formatted).to eq({
        id: question.id,
        category: 'syntax',
        question: 'Мен ___ бараам.',
        options: {
          'en' => ['to school', 'to home', 'to work', 'to store'],
          'ru' => ['в школу', 'домой', 'на работу', 'в магазин']
        },
        correct_index: 0,
        explanation: 'Test explanation'
      })
    end
  end
end
