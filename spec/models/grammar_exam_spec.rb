require 'rails_helper'

RSpec.describe GrammarExam, type: :model do
  describe 'associations' do
    it { should belong_to(:user) }
  end

  describe 'validations' do
    it { should validate_presence_of(:level) }
    it { should validate_inclusion_of(:level).in_array(%w[A1 A2 B1 B2 C1]) }
    it { should validate_presence_of(:score) }
    it { should validate_numericality_of(:score).only_integer.is_greater_than_or_equal_to(0).is_less_than_or_equal_to(100) }
    it { should validate_presence_of(:attempted_at) }
    it { should validate_presence_of(:answers) }
    it { should validate_numericality_of(:time_spent_seconds).only_integer.is_greater_than_or_equal_to(0).allow_nil }
  end

  describe 'scopes' do
    let(:user) { create(:user) }
    let!(:exam1) { create(:grammar_exam, user: user, level: 'A1', score: 85, attempted_at: 1.day.ago) }
    let!(:exam2) { create(:grammar_exam, user: user, level: 'A1', score: 92, attempted_at: Time.current) }
    let!(:exam3) { create(:grammar_exam, user: user, level: 'B1', score: 65, attempted_at: 2.days.ago) }

    describe '.recent' do
      it 'orders exams by attempted_at descending' do
        expect(GrammarExam.recent.pluck(:id)).to eq([exam2.id, exam1.id, exam3.id])
      end
    end

    describe '.by_level' do
      it 'filters exams by level' do
        expect(GrammarExam.by_level('A1')).to contain_exactly(exam1, exam2)
        expect(GrammarExam.by_level('B1')).to contain_exactly(exam3)
      end
    end

    describe '.passing' do
      it 'returns exams with score >= 70%' do
        expect(GrammarExam.passing).to contain_exactly(exam1, exam2)
      end
    end
  end

  describe '.best_score_for_user' do
    let(:user) { create(:user) }

    context 'when user has exams' do
      before do
        create(:grammar_exam, user: user, level: 'A1', score: 75)
        create(:grammar_exam, user: user, level: 'A1', score: 92)
        create(:grammar_exam, user: user, level: 'A1', score: 68)
      end

      it 'returns the highest score for the level' do
        expect(GrammarExam.best_score_for_user(user.id, 'A1')).to eq(92)
      end
    end

    context 'when user has no exams for level' do
      it 'returns 0' do
        expect(GrammarExam.best_score_for_user(user.id, 'B2')).to eq(0)
      end
    end
  end

  describe '.attempt_count_for_user' do
    let(:user) { create(:user) }

    it 'returns the number of attempts for a level' do
      create_list(:grammar_exam, 3, user: user, level: 'A1')
      create_list(:grammar_exam, 2, user: user, level: 'B1')

      expect(GrammarExam.attempt_count_for_user(user.id, 'A1')).to eq(3)
      expect(GrammarExam.attempt_count_for_user(user.id, 'B1')).to eq(2)
      expect(GrammarExam.attempt_count_for_user(user.id, 'C1')).to eq(0)
    end
  end

  describe '#passed?' do
    it 'returns true when score is >= 70' do
      exam = build(:grammar_exam, score: 70)
      expect(exam.passed?).to be true

      exam = build(:grammar_exam, score: 85)
      expect(exam.passed?).to be true
    end

    it 'returns false when score is < 70' do
      exam = build(:grammar_exam, score: 69)
      expect(exam.passed?).to be false

      exam = build(:grammar_exam, score: 50)
      expect(exam.passed?).to be false
    end
  end

  describe '#category_breakdown' do
    it 'calculates correct/total for each category' do
      exam = create(:grammar_exam, answers: [
        { 'category' => 'syntax', 'correct' => true },
        { 'category' => 'syntax', 'correct' => false },
        { 'category' => 'syntax', 'correct' => true },
        { 'category' => 'morphology', 'correct' => true },
        { 'category' => 'morphology', 'correct' => true }
      ])

      breakdown = exam.category_breakdown

      expect(breakdown['syntax']).to eq({ correct: 2, total: 3 })
      expect(breakdown['morphology']).to eq({ correct: 2, total: 2 })
    end

    it 'returns empty hash when answers is not an array' do
      exam = build(:grammar_exam, answers: {})
      expect(exam.category_breakdown).to eq({})
    end
  end

  describe '#incorrect_answers' do
    it 'returns only incorrect answers' do
      exam = create(:grammar_exam, answers: [
        { 'question_id' => 1, 'correct' => true },
        { 'question_id' => 2, 'correct' => false },
        { 'question_id' => 3, 'correct' => false },
        { 'question_id' => 4, 'correct' => true }
      ])

      incorrect = exam.incorrect_answers

      expect(incorrect.length).to eq(2)
      expect(incorrect.map { |a| a['question_id'] }).to eq([2, 3])
    end

    it 'returns empty array when answers is not an array' do
      exam = build(:grammar_exam, answers: {})
      expect(exam.incorrect_answers).to eq([])
    end
  end
end
