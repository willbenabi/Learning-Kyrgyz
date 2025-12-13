// Writing prompts for all CEFR levels (A1-C1)
// Based on comprehensive writing skills development plan

export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1'

export interface WritingPrompt {
  id: string
  level: Level
  order: number
  title: {
    en: string
    ru: string
  }
  kyrgyzTitle: string
  description: {
    en: string
    ru: string
  }
  prompt: {
    en: string
    ru: string
  }
  guidelines: {
    en: string[]
    ru: string[]
  }
  wordBank?: string[] // For A1-A2 levels
  template?: {
    en: string
    ru: string
  } // For A1-A2 levels
  minWords: number
  evaluationCriteria: {
    en: string[]
    ru: string[]
  }
}

export const WRITING_PROMPTS: WritingPrompt[] = [
  // ===== A1 LEVEL =====
  {
    id: 'a1_write_1',
    level: 'A1',
    order: 1,
    title: {
      en: 'My Family',
      ru: 'Моя семья'
    },
    kyrgyzTitle: 'Менин үй-бүлөм',
    description: {
      en: 'Write 3-4 sentences about your family members',
      ru: 'Напиши 3-4 предложения о членах своей семьи'
    },
    prompt: {
      en: 'Write about your family. Who are your family members? What are their names?',
      ru: 'Напиши о своей семье. Кто члены твоей семьи? Как их зовут?'
    },
    guidelines: {
      en: [
        'Use simple sentences',
        'Include family member names',
        'Describe who they are (mother, father, brother, etc.)'
      ],
      ru: [
        'Используй простые предложения',
        'Укажи имена членов семьи',
        'Опиши, кто они (мать, отец, брат и т.д.)'
      ]
    },
    wordBank: ['атам', 'апам', 'агам', 'эжем', 'үй-бүлө', 'аты', 'жашайт', 'иштейт', 'окуйт'],
    template: {
      en: 'Менин атам ___. Ал ___. Менин апам ___.',
      ru: 'Менин атам ___. Ал ___. Менин апам ___.'
    },
    minWords: 20,
    evaluationCriteria: {
      en: [
        'Correct use of vocabulary',
        'Basic word order',
        'Subject-predicate agreement'
      ],
      ru: [
        'Правильное использование лексики',
        'Базовый порядок слов',
        'Согласование подлежащего и сказуемого'
      ]
    }
  },
  {
    id: 'a1_write_2',
    level: 'A1',
    order: 2,
    title: {
      en: 'My Favorite Food',
      ru: 'Моя любимая еда'
    },
    kyrgyzTitle: 'Менин сүйүктүү тамамым',
    description: {
      en: 'Write what you like to eat and drink',
      ru: 'Напиши, что ты любишь есть и пить'
    },
    prompt: {
      en: 'What is your favorite food? What do you like to eat and drink?',
      ru: 'Какая твоя любимая еда? Что ты любишь есть и пить?'
    },
    guidelines: {
      en: [
        'Name your favorite foods',
        'Say what you like and don\'t like',
        'Use simple present tense'
      ],
      ru: [
        'Назови любимые блюда',
        'Скажи, что тебе нравится и не нравится',
        'Используй простое настоящее время'
      ]
    },
    wordBank: ['жакшы көрөм', 'жакпайт', 'тамак', 'нан', 'шай', 'сүт', 'ет', 'жашылча', 'жемиш'],
    minWords: 20,
    evaluationCriteria: {
      en: [
        'Correct vocabulary usage',
        'Basic sentence structure',
        'Clear preferences stated'
      ],
      ru: [
        'Правильное использование словаря',
        'Базовая структура предложений',
        'Четко выраженные предпочтения'
      ]
    }
  },
  {
    id: 'a1_write_3',
    level: 'A1',
    order: 3,
    title: {
      en: 'My Day',
      ru: 'Мой день'
    },
    kyrgyzTitle: 'Менин күнүм',
    description: {
      en: 'Describe your daily routine in 4-5 sentences',
      ru: 'Опиши свой распорядок дня в 4-5 предложениях'
    },
    prompt: {
      en: 'What do you do every day? Describe your daily routine.',
      ru: 'Что ты делаешь каждый день? Опиши свой распорядок дня.'
    },
    guidelines: {
      en: [
        'Start with when you wake up',
        'Describe main activities',
        'End with when you sleep'
      ],
      ru: [
        'Начни с того, когда просыпаешься',
        'Опиши основные занятия',
        'Закончи, когда ложишься спать'
      ]
    },
    wordBank: ['туруп', 'ичем', 'барам', 'келем', 'окуйм', 'иштейм', 'уктайм', 'эртең менен', 'кечинде'],
    minWords: 25,
    evaluationCriteria: {
      en: [
        'Logical sequence of activities',
        'Correct verb forms',
        'Time expressions used'
      ],
      ru: [
        'Логическая последовательность действий',
        'Правильные формы глаголов',
        'Использование выражений времени'
      ]
    }
  },

  // ===== A2 LEVEL =====
  {
    id: 'a2_write_1',
    level: 'A2',
    order: 1,
    title: {
      en: 'Letter to a Friend',
      ru: 'Письмо другу'
    },
    kyrgyzTitle: 'Досума кат',
    description: {
      en: 'Write a short letter about your week',
      ru: 'Напиши короткое письмо о том, как прошла твоя неделя'
    },
    prompt: {
      en: 'Write a letter to your friend telling them about your week. What did you do? What was interesting?',
      ru: 'Напиши письмо другу о том, как прошла твоя неделя. Что ты делал? Что было интересного?'
    },
    guidelines: {
      en: [
        'Start with a greeting',
        'Describe 2-3 events from your week',
        'End with a closing phrase'
      ],
      ru: [
        'Начни с приветствия',
        'Опиши 2-3 события из твоей недели',
        'Закончи прощальной фразой'
      ]
    },
    template: {
      en: 'Салам [имя]! Мен сага менин жумам жөнүндө айтайын. Биринчи...',
      ru: 'Салам [имя]! Мен сага менин жумам жөнүндө айтайын. Биринчи...'
    },
    minWords: 50,
    evaluationCriteria: {
      en: [
        'Letter format (greeting, body, closing)',
        'Use of past tense',
        'Simple sentence connections'
      ],
      ru: [
        'Формат письма (приветствие, основная часть, завершение)',
        'Использование прошедшего времени',
        'Простые связи между предложениями'
      ]
    }
  },
  {
    id: 'a2_write_2',
    level: 'A2',
    order: 2,
    title: {
      en: 'What I Did Yesterday',
      ru: 'Что я делал вчера'
    },
    kyrgyzTitle: 'Кече эмне кылдым',
    description: {
      en: 'Write about your yesterday\'s activities',
      ru: 'Напиши о своих вчерашних занятиях'
    },
    prompt: {
      en: 'What did you do yesterday? Describe your activities from morning to evening.',
      ru: 'Что ты делал вчера? Опиши свои занятия с утра до вечера.'
    },
    guidelines: {
      en: [
        'Use past tense verbs',
        'Include specific times',
        'Describe at least 4-5 activities'
      ],
      ru: [
        'Используй глаголы в прошедшем времени',
        'Укажи конкретное время',
        'Опиши минимум 4-5 занятий'
      ]
    },
    minWords: 50,
    evaluationCriteria: {
      en: [
        'Correct past tense usage',
        'Chronological order',
        'Basic connectors (then, after, etc.)'
      ],
      ru: [
        'Правильное использование прошедшего времени',
        'Хронологический порядок',
        'Базовые связующие слова (потом, после и т.д.)'
      ]
    }
  },

  // ===== B1 LEVEL =====
  {
    id: 'b1_write_1',
    level: 'B1',
    order: 1,
    title: {
      en: 'Environmental Protection',
      ru: 'Об охране окружающей среды'
    },
    kyrgyzTitle: 'Жашыл чарба жөнүндө',
    description: {
      en: 'Why is it important to protect nature?',
      ru: 'Почему важно защищать природу?'
    },
    prompt: {
      en: 'Write about why environmental protection is important. What can people do to help?',
      ru: 'Напиши о том, почему важна охрана окружающей среды. Что люди могут делать для помощи?'
    },
    guidelines: {
      en: [
        'Explain the importance of nature',
        'Give 2-3 examples of environmental problems',
        'Suggest solutions',
        'Use paragraphs to organize ideas'
      ],
      ru: [
        'Объясни важность природы',
        'Приведи 2-3 примера экологических проблем',
        'Предложи решения',
        'Используй абзацы для организации идей'
      ]
    },
    minWords: 100,
    evaluationCriteria: {
      en: [
        'Paragraph structure',
        'Use of complex sentences',
        'Basic connectors (because, therefore, etc.)',
        'Clear argumentation'
      ],
      ru: [
        'Структура абзацев',
        'Использование сложных предложений',
        'Базовые связующие слова (потому что, поэтому и т.д.)',
        'Четкая аргументация'
      ]
    }
  },
  {
    id: 'b1_write_2',
    level: 'B1',
    order: 2,
    title: {
      en: 'An Interesting Event',
      ru: 'Интересное событие'
    },
    kyrgyzTitle: 'Бир окуя',
    description: {
      en: 'Describe an interesting event from your life',
      ru: 'Опиши интересное событие из своей жизни'
    },
    prompt: {
      en: 'Write about an interesting or memorable event from your life. When did it happen? What made it special?',
      ru: 'Напиши об интересном или памятном событии из твоей жизни. Когда это произошло? Что сделало его особенным?'
    },
    guidelines: {
      en: [
        'Set the scene (when, where)',
        'Describe what happened in sequence',
        'Explain why it was important to you',
        'Use descriptive language'
      ],
      ru: [
        'Задай обстановку (когда, где)',
        'Опиши, что произошло по порядку',
        'Объясни, почему это было важно для тебя',
        'Используй описательный язык'
      ]
    },
    minWords: 100,
    evaluationCriteria: {
      en: [
        'Narrative structure',
        'Use of past tenses',
        'Descriptive details',
        'Personal reflection'
      ],
      ru: [
        'Повествовательная структура',
        'Использование прошедших времен',
        'Описательные детали',
        'Личные размышления'
      ]
    }
  },

  // ===== B2 LEVEL =====
  {
    id: 'b2_write_1',
    level: 'B2',
    order: 1,
    title: {
      en: 'Modern Education Issues',
      ru: 'Современные проблемы образования'
    },
    kyrgyzTitle: 'Билим берүүнүн заманбап маселелери',
    description: {
      en: 'Discuss contemporary problems in education',
      ru: 'Обсуди современные проблемы в образовании'
    },
    prompt: {
      en: 'What are the main challenges facing education today? Analyze the problems and suggest possible solutions.',
      ru: 'Каковы основные проблемы, с которыми сталкивается образование сегодня? Проанализируй проблемы и предложи возможные решения.'
    },
    guidelines: {
      en: [
        'Introduce the topic with context',
        'Analyze 2-3 major problems',
        'Provide evidence or examples',
        'Propose realistic solutions',
        'Write a conclusion'
      ],
      ru: [
        'Введи тему с контекстом',
        'Проанализируй 2-3 основные проблемы',
        'Приведи доказательства или примеры',
        'Предложи реалистичные решения',
        'Напиши заключение'
      ]
    },
    minWords: 150,
    evaluationCriteria: {
      en: [
        'Logical structure',
        'Clear argumentation',
        'Style appropriateness',
        'Use of advanced vocabulary',
        'Coherent paragraphs'
      ],
      ru: [
        'Логическая структура',
        'Четкая аргументация',
        'Уместность стиля',
        'Использование продвинутой лексики',
        'Связные абзацы'
      ]
    }
  },
  {
    id: 'b2_write_2',
    level: 'B2',
    order: 2,
    title: {
      en: 'Technology\'s Impact on Society',
      ru: 'Влияние технологий на общество'
    },
    kyrgyzTitle: 'Технологиялык өнүгүүнүн коомго таасири',
    description: {
      en: 'Analyze how technology changes our lives',
      ru: 'Проанализируй, как технологии меняют нашу жизнь'
    },
    prompt: {
      en: 'How has modern technology changed society? Discuss both positive and negative impacts.',
      ru: 'Как современные технологии изменили общество? Обсуди как положительные, так и отрицательные последствия.'
    },
    guidelines: {
      en: [
        'Present a balanced view',
        'Discuss positive impacts',
        'Discuss negative impacts',
        'Use specific examples',
        'Draw a reasoned conclusion'
      ],
      ru: [
        'Представь сбалансированную точку зрения',
        'Обсуди положительные последствия',
        'Обсуди отрицательные последствия',
        'Используй конкретные примеры',
        'Сделай обоснованный вывод'
      ]
    },
    minWords: 150,
    evaluationCriteria: {
      en: [
        'Balanced argumentation',
        'Critical analysis',
        'Use of examples',
        'Logical flow',
        'Formal style'
      ],
      ru: [
        'Сбалансированная аргументация',
        'Критический анализ',
        'Использование примеров',
        'Логический поток',
        'Формальный стиль'
      ]
    }
  },

  // ===== C1 LEVEL =====
  {
    id: 'c1_write_1',
    level: 'C1',
    order: 1,
    title: {
      en: 'National Identity and Globalization',
      ru: 'Национальная идентичность и глобализация'
    },
    kyrgyzTitle: 'Улуттук идентичность жана глобалдашуу',
    description: {
      en: 'Analyze how globalization affects national identity',
      ru: 'Проанализируй, как глобализация влияет на национальную идентичность'
    },
    prompt: {
      en: 'In what ways does globalization challenge or strengthen national identity? Analyze this complex relationship with specific examples.',
      ru: 'Каким образом глобализация угрожает или укрепляет национальную идентичность? Проанализируй это сложное взаимодействие с конкретными примерами.'
    },
    guidelines: {
      en: [
        'Define key concepts',
        'Present multiple perspectives',
        'Use sophisticated argumentation',
        'Reference cultural examples',
        'Demonstrate nuanced understanding'
      ],
      ru: [
        'Определи ключевые концепции',
        'Представь множественные перспективы',
        'Используй сложную аргументацию',
        'Ссылайся на культурные примеры',
        'Продемонстрируй нюансированное понимание'
      ]
    },
    minWords: 250,
    evaluationCriteria: {
      en: [
        'Depth of analysis',
        'Stylistic mastery',
        'Grammatical accuracy',
        'Sophisticated vocabulary',
        'Coherent argumentation'
      ],
      ru: [
        'Глубина анализа',
        'Стилистическое мастерство',
        'Грамматическая точность',
        'Сложная лексика',
        'Связная аргументация'
      ]
    }
  },
  {
    id: 'c1_write_2',
    level: 'C1',
    order: 2,
    title: {
      en: 'Aitmatov\'s Literary Heritage',
      ru: 'Творческое наследие Айтматова'
    },
    kyrgyzTitle: 'Айтматовдун чыгармачылык мурасы',
    description: {
      en: 'Critical analysis of Aitmatov\'s works',
      ru: 'Критический анализ произведений Айтматова'
    },
    prompt: {
      en: 'Critically analyze Chingiz Aitmatov\'s contribution to world literature. What makes his works universal?',
      ru: 'Критически проанализируй вклад Чингиза Айтматова в мировую литературу. Что делает его произведения универсальными?'
    },
    guidelines: {
      en: [
        'Demonstrate literary knowledge',
        'Analyze specific works',
        'Discuss universal themes',
        'Consider cultural context',
        'Present original insights'
      ],
      ru: [
        'Продемонстрируй литературные знания',
        'Проанализируй конкретные произведения',
        'Обсуди универсальные темы',
        'Рассмотри культурный контекст',
        'Представь оригинальные идеи'
      ]
    },
    minWords: 250,
    evaluationCriteria: {
      en: [
        'Literary analysis depth',
        'Critical thinking',
        'Textual evidence',
        'Stylistic sophistication',
        'Original perspective'
      ],
      ru: [
        'Глубина литературного анализа',
        'Критическое мышление',
        'Текстовые доказательства',
        'Стилистическая сложность',
        'Оригинальная перспектива'
      ]
    }
  }
]

export function getPromptsByLevel(level: Level): WritingPrompt[] {
  return WRITING_PROMPTS.filter(prompt => prompt.level === level)
}

export function getPromptById(id: string): WritingPrompt | undefined {
  return WRITING_PROMPTS.find(prompt => prompt.id === id)
}

export function getAllLevels(): Level[] {
  return ['A1', 'A2', 'B1', 'B2', 'C1']
}
