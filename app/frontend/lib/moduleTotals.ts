// Module lesson totals by CEFR level
// Source: PRODUCT_SPEC.md and actual lesson data

export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1'
export type ModuleType = 'grammar' | 'reading' | 'writing' | 'vocabulary'

// Total lessons/items per module per level
export const MODULE_TOTALS_BY_LEVEL: Record<ModuleType, Record<Level, number>> = {
  grammar: {
    A1: 15, // 14 lessons + 1 final test
    A2: 12, // 11 lessons + 1 final test
    B1: 12, // 11 lessons + 1 final test
    B2: 9,  // 8 lessons + 1 final test
    C1: 9   // 8 lessons + 1 final test
  },
  reading: {
    A1: 10, // 10 texts
    A2: 10, // 10 texts
    B1: 10, // 10 texts
    B2: 10, // 10 texts
    C1: 10  // 10 texts
  },
  writing: {
    A1: 3, // 3 prompts
    A2: 2, // 2 prompts
    B1: 2, // 2 prompts
    B2: 2, // 2 prompts
    C1: 2  // 2 prompts
  },
  vocabulary: {
    A1: 4, // 4 topics
    A2: 2, // 2 topics
    B1: 2, // 2 topics
    B2: 1, // 1 topic
    C1: 1  // 1 topic
  }
}

// Get total lessons for a module at a specific level
export function getModuleTotal(moduleType: ModuleType, level: Level): number {
  return MODULE_TOTALS_BY_LEVEL[moduleType][level] || 0
}

// Get cumulative total lessons for a module up to and including a level
export function getCumulativeModuleTotal(moduleType: ModuleType, level: Level): number {
  const levels: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1']
  const levelIndex = levels.indexOf(level)

  if (levelIndex === -1) return 0

  let total = 0
  for (let i = 0; i <= levelIndex; i++) {
    total += MODULE_TOTALS_BY_LEVEL[moduleType][levels[i]]
  }

  return total
}

// Get total lessons across ALL levels for a module
export function getAllLevelsModuleTotal(moduleType: ModuleType): number {
  const levels: Level[] = ['A1', 'A2', 'B1', 'B2', 'C1']
  return levels.reduce((sum, level) => sum + MODULE_TOTALS_BY_LEVEL[moduleType][level], 0)
}

// Module display names and colors
export const MODULE_INFO = {
  grammar: {
    en: 'Grammar',
    ru: 'Грамматика',
    color: 'bg-blue-500'
  },
  reading: {
    en: 'Reading',
    ru: 'Чтение',
    color: 'bg-green-500'
  },
  writing: {
    en: 'Writing',
    ru: 'Письмо',
    color: 'bg-purple-500'
  },
  vocabulary: {
    en: 'Vocabulary',
    ru: 'Словарный запас',
    color: 'bg-orange-500'
  }
}
