// Level-based recommendations for Kyrgyz learning

export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

export interface Recommendation {
  category: 'listening' | 'reading' | 'watching'
  items: string[]
}

export interface LevelRecommendations {
  level: Level
  description: {
    en: string
    ru: string
  }
  listening: {
    en: string[]
    ru: string[]
  }
  reading: {
    en: string[]
    ru: string[]
  }
  watching: {
    en: string[]
    ru: string[]
  }
}

export const RECOMMENDATIONS: Record<Level, LevelRecommendations> = {
  A1: {
    level: 'A1',
    description: {
      en: 'At this level, you understand simple phrases and can talk about yourself and daily life.',
      ru: 'На этом уровне вы понимаете простые фразы и можете рассказать о себе и повседневной жизни.'
    },
    listening: {
      en: [
        'Children\'s songs with simple words and repetitive phrases (e.g., songs from "Кереме

т көч" cartoon)',
        'Slow short dialogues: greetings, introductions, simple questions',
        'Audio dictionaries with daily basic vocabulary'
      ],
      ru: [
        'Детские песни: простые слова и повторяющиеся фразы (например, песни из мультфильма «Керемет көч»)',
        'Медленные короткие диалоги: приветствия, знакомство, простые вопросы',
        'Аудиословари: ежедневная базовая лексика'
      ]
    },
    reading: {
      en: [
        'Illustrated children\'s books',
        'Short, simple stories (5-10 sentences)',
        'Simple signs and labels: in stores, on streets'
      ],
      ru: [
        'Иллюстрированные детские книги',
        'Короткие, простые рассказы (5–10 предложений)',
        'Простые надписи и вывески: в магазинах, на улицах'
      ]
    },
    watching: {
      en: [
        '"Керемет көч" cartoon',
        'Short videos with simple plots (e.g., cooking videos)',
        'Kyrgyz language learning videos'
      ],
      ru: [
        'Мультфильм «Керемет көч»',
        'Короткие видеоролики с простым сюжетом: например, видео о приготовлении еды',
        'Обучающие ролики по кыргызскому языку'
      ]
    }
  },
  A2: {
    level: 'A2',
    description: {
      en: 'At this level, you can communicate in simple everyday situations and understand basic information on familiar topics.',
      ru: 'На этом уровне вы можете общаться в простых бытовых ситуациях и понимать основную информацию по знакомым темам.'
    },
    listening: {
      en: [
        'Simple audiobooks: adapted fairy tales',
        'Short news with simplified vocabulary',
        'Kyrgyz songs with clear lyrics'
      ],
      ru: [
        'Простые аудиокниги: адаптированные сказки',
        'Короткие новости с упрощённой лексикой',
        'Кыргызские песни с понятным текстом'
      ]
    },
    reading: {
      en: [
        'Adapted texts: simplified versions of classic excerpts',
        'Short articles about culture and history',
        'Social media posts and blogs with simple vocabulary'
      ],
      ru: [
        'Адаптированные тексты: упрощённые версии отрывков классики',
        'Короткие статьи о культуре, истории',
        'Посты и блоги в соцсетях с простой лексикой'
      ]
    },
    watching: {
      en: [
        'Kyrgyz family movies or adapted versions',
        'Short documentaries',
        'Simple vlogs in Kyrgyz'
      ],
      ru: [
        'Кыргызские семейные фильмы или адаптированные версии',
        'Короткие документальные ролики',
        'Простые влоги на кыргызском языке'
      ]
    }
  },
  B1: {
    level: 'B1',
    description: {
      en: 'You feel comfortable in most everyday situations and understand more complex texts.',
      ru: 'Вы свободно чувствуете себя в большинстве бытовых ситуаций и понимаете более сложные тексты.'
    },
    listening: {
      en: [
        'Kyrgyz radio programs',
        'Medium-level podcasts: culture, travel',
        'Audiobooks: stories, novellas'
      ],
      ru: [
        'Программы на кыргызском радио',
        'Подкасты среднего уровня сложности: культура, путешествия',
        'Аудиокниги: рассказы, повести'
      ]
    },
    reading: {
      en: [
        'Newspapers and magazines: interviews, news, cultural reviews',
        'Short stories by Kyrgyz writers',
        'Informational websites about Kyrgyzstan'
      ],
      ru: [
        'Газеты и журналы: интервью, новости, культурные обзоры',
        'Короткие рассказы кыргызских писателей',
        'Информационные сайты о Кыргызстане'
      ]
    },
    watching: {
      en: [
        'Kyrgyz films and TV series',
        'News broadcasts',
        'Cultural and educational programs'
      ],
      ru: [
        'Кыргызские фильмы и сериалы',
        'Новостные выпуски',
        'Культурно-познавательные программы'
      ]
    }
  },
  B2: {
    level: 'B2',
    description: {
      en: 'You understand main ideas of complex texts and can express your viewpoint accurately.',
      ru: 'Вы понимаете основные идеи сложных текстов и можете точно выражать свою точку зрения.'
    },
    listening: {
      en: [
        'Discussion programs on radio and TV',
        'Lectures and presentations by Kyrgyz-speaking experts',
        'Full audiobook versions of Kyrgyz classics'
      ],
      ru: [
        'Дискуссионные передачи на радио и ТВ',
        'Лекции и презентации кыргызскоязычных специалистов',
        'Полные версии аудиокниг кыргызской классики'
      ]
    },
    reading: {
      en: [
        'Classic Kyrgyz literature',
        'Popular science articles on various topics',
        'Analytical materials on news portals'
      ],
      ru: [
        'Классическая кыргызская литература',
        'Научно-популярные статьи по разным темам',
        'Аналитические материалы на новостных порталах'
      ]
    },
    watching: {
      en: [
        'Fiction, dramatic, and historical films',
        'Documentaries about culture and nature',
        'Debates and analytical programs'
      ],
      ru: [
        'Художественные, драматические и исторические фильмы',
        'Документальные фильмы о культуре и природе',
        'Дебаты и аналитические передачи'
      ]
    }
  },
  C1: {
    level: 'C1',
    description: {
      en: 'You easily understand long complex texts and express thoughts fluently.',
      ru: 'Вы легко понимаете длинные сложные тексты и свободно выражаете мысли.'
    },
    listening: {
      en: [
        'Academic lectures and seminars',
        'Radio plays and literary readings',
        'Expert discussions'
      ],
      ru: [
        'Академические лекции и семинары',
        'Радиоспектакли и литературные чтения',
        'Экспертные дискуссии'
      ]
    },
    reading: {
      en: [
        'All genres of Kyrgyz literature: novels, poetry, dramas',
        'Scientific research and articles',
        'Legal and official documents'
      ],
      ru: [
        'Все жанры кыргызской литературы: романы, поэзия, драмы',
        'Научные исследования и статьи',
        'Юридические и официальные документы'
      ]
    },
    watching: {
      en: [
        'Classic Kyrgyz films: "Ак кеме", "Первый учитель", "Красное яблоко"',
        'Deeply analytical TV programs',
        'Video recordings of theater performances'
      ],
      ru: [
        'Классические кыргызские фильмы: «Ак кеме», «Первый учитель», «Красное яблоко»',
        'Глубоко аналитические телепередачи',
        'Видео-записи театральных постановок'
      ]
    }
  },
  C2: {
    level: 'C2',
    description: {
      en: 'At this level, you understand virtually everything heard or read and express yourself with maximum precision.',
      ru: 'На этом уровне вы понимаете практически всё — услышанное или прочитанное — и выражаетесь максимально точно.'
    },
    listening: {
      en: [
        'Different dialects of Kyrgyz',
        'Fast and complex discussions',
        'Poetry readings'
      ],
      ru: [
        'Разные диалекты кыргызского языка',
        'Быстрые и сложные дискуссии',
        'Чтение поэзии'
      ]
    },
    reading: {
      en: [
        'Old Kyrgyz texts (Arabic or Latin script)',
        'Literary criticism and theory',
        'Philosophical and historical works in Kyrgyz'
      ],
      ru: [
        'Старые кыргызские тексты (арабская или латинская графика)',
        'Литературная критика и теория',
        'Философские, исторические произведения на кыргызском языке'
      ]
    },
    watching: {
      en: [
        'Film festival movies, auteur cinema',
        'Live broadcasts with complex discussions',
        'All formats of theater performances'
      ],
      ru: [
        'Фильмы с кинофестивалей, авторское кино',
        'Прямые эфиры со сложными обсуждениями',
        'Все форматы театральных постановок'
      ]
    }
  }
}

export function getRecommendationsForLevel(level: Level, language: 'en' | 'ru' = 'en'): LevelRecommendations {
  const recommendations = RECOMMENDATIONS[level]
  return recommendations
}
