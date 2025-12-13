module LevelUpgrade
  class CheckEligibility < ActiveInteraction::Base
    object :user, class: User
    string :level, default: nil

    validates :level, inclusion: { in: %w[A1 A2 B1 B2 C1] }, allow_nil: true

    def execute
      current_level = level || user.user_progress&.level || 'A1'

      # C1 is the highest level - cannot upgrade
      return ineligible_result(current_level, nil) if current_level == 'C1'

      next_level = determine_next_level(current_level)
      requirements = level_requirements(current_level)

      completion_status = check_module_completions(current_level, requirements)

      all_complete = completion_status.values.all? { |status| status[:complete] }

      {
        eligible: all_complete,
        current_level: current_level,
        next_level: next_level,
        completion_status: completion_status,
        overall_percentage: calculate_overall_percentage(completion_status)
      }
    end

    private

    def determine_next_level(current_level)
      levels = %w[A1 A2 B1 B2 C1]
      current_index = levels.index(current_level)
      return nil if current_index.nil? || current_index >= levels.length - 1

      levels[current_index + 1]
    end

    def level_requirements(level)
      {
        'A1' => { grammar: 15, reading: 10, writing: 3, vocabulary: 4 },
        'A2' => { grammar: 12, reading: 10, writing: 2, vocabulary: 2 },
        'B1' => { grammar: 12, reading: 10, writing: 2, vocabulary: 2 },
        'B2' => { grammar: 9, reading: 10, writing: 2, vocabulary: 1 },
        'C1' => { grammar: 9, reading: 10, writing: 2, vocabulary: 1 }
      }[level] || {}
    end

    def check_module_completions(level, requirements)
      level_prefix = level.downcase

      {
        grammar: check_grammar_completion(level_prefix, requirements[:grammar]),
        reading: check_module_completion('reading', level_prefix, requirements[:reading]),
        writing: check_module_completion('writing', level_prefix, requirements[:writing]),
        vocabulary: check_module_completion('vocabulary', level_prefix, requirements[:vocabulary])
      }
    end

    def check_grammar_completion(level_prefix, required_count)
      # Count completed grammar lessons for this level
      completed_lessons = user.lesson_completions
        .where(module_type: 'grammar')
        .where('lesson_id LIKE ?', "#{level_prefix}_%")
        .count

      # Check if user passed the final exam (score >= 70)
      # If passed, count it as an additional completed lesson
      passed_exam = user.grammar_exams
        .where(level: level_prefix.upcase)
        .where('score >= ?', 70)
        .exists?

      total_completed = passed_exam ? completed_lessons + 1 : completed_lessons

      {
        completed: total_completed,
        required: required_count,
        complete: total_completed >= required_count
      }
    end

    def check_module_completion(module_type, level_prefix, required_count)
      completed = user.lesson_completions
        .where(module_type: module_type)
        .where('lesson_id LIKE ?', "#{level_prefix}_%")
        .count

      {
        completed: completed,
        required: required_count,
        complete: completed >= required_count
      }
    end

    def calculate_overall_percentage(completion_status)
      total_required = 0
      total_completed = 0

      completion_status.each do |_module, status|
        total_required += status[:required]
        total_completed += [status[:completed], status[:required]].min
      end

      return 0 if total_required.zero?

      ((total_completed.to_f / total_required) * 100).round(1)
    end

    def ineligible_result(current_level, next_level)
      {
        eligible: false,
        current_level: current_level,
        next_level: next_level,
        completion_status: {},
        overall_percentage: 100
      }
    end
  end
end
