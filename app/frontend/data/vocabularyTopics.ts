// Vocabulary topics for all CEFR levels (A1-C1)
// Based on comprehensive vocabulary learning plan

export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1'

export interface VocabularyWord {
  kyrgyz: string
  translation: {
    en: string
    ru: string
  }
  pronunciation?: string
  example?: {
    kyrgyz: string
    translation: {
      en: string
      ru: string
    }
  }
}

export interface VocabularyTopic {
  id: string
  level: Level
  order: number
  title: {
    en: string
    ru: string
  }
  description: {
    en: string
    ru: string
  }
  icon: string
  targetWords: number
  words: VocabularyWord[]
}

export const VOCABULARY_TOPICS: VocabularyTopic[] = [
  // ===== A1 LEVEL (500-600 words target) =====
  {
    id: 'a1_vocab_1',
    level: 'A1',
    order: 1,
    title: {
      en: 'Greetings & Introductions',
      ru: 'Приветствия и знакомство'
    },
    description: {
      en: 'Basic greetings, introductions, and polite phrases',
      ru: 'Базовые приветствия, представления и вежливые фразы'
    },
    icon: '👋',
    targetWords: 50,
    words: [
      {
        kyrgyz: 'салам',
        translation: { en: 'hello', ru: 'привет' },
        example: {
          kyrgyz: 'Салам! Кандайсың?',
          translation: { en: 'Hello! How are you?', ru: 'Привет! Как дела?' }
        }
      },
      {
        kyrgyz: 'саламатсызбы',
        translation: { en: 'hello (formal)', ru: 'здравствуйте' },
        example: {
          kyrgyz: 'Саламатсызбы, мугалим!',
          translation: { en: 'Hello, teacher!', ru: 'Здравствуйте, учитель!' }
        }
      },
      {
        kyrgyz: 'кош',
        translation: { en: 'goodbye', ru: 'до свидания' },
        example: {
          kyrgyz: 'Кош, эртең көрүшөбүз!',
          translation: { en: 'Goodbye, see you tomorrow!', ru: 'До свидания, увидимся завтра!' }
        }
      },
      {
        kyrgyz: 'рахмат',
        translation: { en: 'thank you', ru: 'спасибо' },
        example: {
          kyrgyz: 'Рахмат, сиз жакшы адамсыз!',
          translation: { en: 'Thank you, you are a good person!', ru: 'Спасибо, вы хороший человек!' }
        }
      },
      {
        kyrgyz: 'кечиресиз',
        translation: { en: 'excuse me/sorry', ru: 'извините' },
        example: {
          kyrgyz: 'Кечиресиз, мен кечиктим.',
          translation: { en: 'Sorry, I am late.', ru: 'Извините, я опоздал.' }
        }
      },
      {
        kyrgyz: 'ооба',
        translation: { en: 'yes', ru: 'да' }
      },
      {
        kyrgyz: 'жок',
        translation: { en: 'no', ru: 'нет' }
      },
      {
        kyrgyz: 'менин атым',
        translation: { en: 'my name is', ru: 'меня зовут' },
        example: {
          kyrgyz: 'Менин атым Айгүл.',
          translation: { en: 'My name is Aigul.', ru: 'Меня зовут Айгуль.' }
        }
      },
      {
        kyrgyz: 'кандайсыз',
        translation: { en: 'how are you', ru: 'как дела' }
      },
      {
        kyrgyz: 'жакшы',
        translation: { en: 'good/well', ru: 'хорошо' }
      }
    ]
  },
  {
    id: 'a1_vocab_2',
    level: 'A1',
    order: 2,
    title: {
      en: 'Family Members',
      ru: 'Члены семьи'
    },
    description: {
      en: 'Words for immediate family members',
      ru: 'Слова для ближайших родственников'
    },
    icon: '👨‍👩‍👧‍👦',
    targetWords: 20,
    words: [
      {
        kyrgyz: 'үй-бүлө',
        translation: { en: 'family', ru: 'семья' }
      },
      {
        kyrgyz: 'ата',
        translation: { en: 'father', ru: 'отец' }
      },
      {
        kyrgyz: 'апа',
        translation: { en: 'mother', ru: 'мать' }
      },
      {
        kyrgyz: 'ага',
        translation: { en: 'older brother', ru: 'старший брат' }
      },
      {
        kyrgyz: 'эже',
        translation: { en: 'older sister', ru: 'старшая сестра' }
      },
      {
        kyrgyz: 'ини',
        translation: { en: 'younger brother', ru: 'младший брат' }
      },
      {
        kyrgyz: 'сиңди',
        translation: { en: 'younger sister', ru: 'младшая сестра' }
      },
      {
        kyrgyz: 'чоң ата',
        translation: { en: 'grandfather', ru: 'дедушка' }
      },
      {
        kyrgyz: 'чоң эне',
        translation: { en: 'grandmother', ru: 'бабушка' }
      },
      {
        kyrgyz: 'бала',
        translation: { en: 'child', ru: 'ребенок' }
      }
    ]
  },
  {
    id: 'a1_vocab_3',
    level: 'A1',
    order: 3,
    title: {
      en: 'Numbers & Age',
      ru: 'Числа и возраст'
    },
    description: {
      en: 'Numbers 1-100 and talking about age',
      ru: 'Числа 1-100 и разговор о возрасте'
    },
    icon: '🔢',
    targetWords: 30,
    words: [
      {
        kyrgyz: 'бир',
        translation: { en: 'one', ru: 'один' }
      },
      {
        kyrgyz: 'эки',
        translation: { en: 'two', ru: 'два' }
      },
      {
        kyrgyz: 'үч',
        translation: { en: 'three', ru: 'три' }
      },
      {
        kyrgyz: 'төрт',
        translation: { en: 'four', ru: 'четыре' }
      },
      {
        kyrgyz: 'беш',
        translation: { en: 'five', ru: 'пять' }
      },
      {
        kyrgyz: 'алты',
        translation: { en: 'six', ru: 'шесть' }
      },
      {
        kyrgyz: 'жети',
        translation: { en: 'seven', ru: 'семь' }
      },
      {
        kyrgyz: 'сегиз',
        translation: { en: 'eight', ru: 'восемь' }
      },
      {
        kyrgyz: 'тогуз',
        translation: { en: 'nine', ru: 'девять' }
      },
      {
        kyrgyz: 'он',
        translation: { en: 'ten', ru: 'десять' }
      },
      {
        kyrgyz: 'жыйырма',
        translation: { en: 'twenty', ru: 'двадцать' }
      },
      {
        kyrgyz: 'жүз',
        translation: { en: 'hundred', ru: 'сто' }
      },
      {
        kyrgyz: 'жаш',
        translation: { en: 'age/year old', ru: 'лет/возраст' },
        example: {
          kyrgyz: 'Мен он беш жаштамын.',
          translation: { en: 'I am 15 years old.', ru: 'Мне 15 лет.' }
        }
      },
      {
        kyrgyz: 'канча',
        translation: { en: 'how much/how many', ru: 'сколько' }
      }
    ]
  },
  {
    id: 'a1_vocab_4',
    level: 'A1',
    order: 4,
    title: {
      en: 'Food & Drinks',
      ru: 'Еда и напитки'
    },
    description: {
      en: 'Basic food items and drinks',
      ru: 'Основные продукты питания и напитки'
    },
    icon: '🍽️',
    targetWords: 40,
    words: [
      {
        kyrgyz: 'тамак',
        translation: { en: 'food', ru: 'еда' }
      },
      {
        kyrgyz: 'нан',
        translation: { en: 'bread', ru: 'хлеб' }
      },
      {
        kyrgyz: 'ет',
        translation: { en: 'meat', ru: 'мясо' }
      },
      {
        kyrgyz: 'сүт',
        translation: { en: 'milk', ru: 'молоко' }
      },
      {
        kyrgyz: 'суу',
        translation: { en: 'water', ru: 'вода' }
      },
      {
        kyrgyz: 'шай',
        translation: { en: 'tea', ru: 'чай' }
      },
      {
        kyrgyz: 'кофе',
        translation: { en: 'coffee', ru: 'кофе' }
      },
      {
        kyrgyz: 'жемиш',
        translation: { en: 'fruit', ru: 'фрукт' }
      },
      {
        kyrgyz: 'жашылча',
        translation: { en: 'vegetable', ru: 'овощ' }
      },
      {
        kyrgyz: 'алма',
        translation: { en: 'apple', ru: 'яблоко' }
      },
      {
        kyrgyz: 'жакшы көрөм',
        translation: { en: 'I like', ru: 'я люблю' },
        example: {
          kyrgyz: 'Мен шай жакшы көрөм.',
          translation: { en: 'I like tea.', ru: 'Я люблю чай.' }
        }
      },
      {
        kyrgyz: 'жакпайм',
        translation: { en: 'I don\'t like', ru: 'мне не нравится' }
      }
    ]
  },

  // ===== A2 LEVEL (1000-1200 words target) =====
  {
    id: 'a2_vocab_1',
    level: 'A2',
    order: 1,
    title: {
      en: 'Health & Body',
      ru: 'Здоровье и тело'
    },
    description: {
      en: 'Body parts, symptoms, and health-related vocabulary',
      ru: 'Части тела, симптомы и лексика о здоровье'
    },
    icon: '🏥',
    targetWords: 50,
    words: [
      {
        kyrgyz: 'дене',
        translation: { en: 'body', ru: 'тело' }
      },
      {
        kyrgyz: 'баш',
        translation: { en: 'head', ru: 'голова' }
      },
      {
        kyrgyz: 'көз',
        translation: { en: 'eye', ru: 'глаз' }
      },
      {
        kyrgyz: 'кулак',
        translation: { en: 'ear', ru: 'ухо' }
      },
      {
        kyrgyz: 'мурун',
        translation: { en: 'nose', ru: 'нос' }
      },
      {
        kyrgyz: 'оозу',
        translation: { en: 'mouth', ru: 'рот' }
      },
      {
        kyrgyz: 'кол',
        translation: { en: 'hand/arm', ru: 'рука' }
      },
      {
        kyrgyz: 'бут',
        translation: { en: 'leg/foot', ru: 'нога' }
      },
      {
        kyrgyz: 'оорулуу',
        translation: { en: 'sick/painful', ru: 'больной' },
        example: {
          kyrgyz: 'Башым оорулуу.',
          translation: { en: 'My head hurts.', ru: 'У меня болит голова.' }
        }
      },
      {
        kyrgyz: 'дарыгер',
        translation: { en: 'doctor', ru: 'врач' }
      }
    ]
  },
  {
    id: 'a2_vocab_2',
    level: 'A2',
    order: 2,
    title: {
      en: 'Weather & Seasons',
      ru: 'Погода и времена года'
    },
    description: {
      en: 'Weather phenomena and seasons',
      ru: 'Погодные явления и сезоны'
    },
    icon: '🌤️',
    targetWords: 30,
    words: [
      {
        kyrgyz: 'аба ырайы',
        translation: { en: 'weather', ru: 'погода' }
      },
      {
        kyrgyz: 'жаз',
        translation: { en: 'summer', ru: 'лето' }
      },
      {
        kyrgyz: 'күз',
        translation: { en: 'autumn/fall', ru: 'осень' }
      },
      {
        kyrgyz: 'кыш',
        translation: { en: 'winter', ru: 'зима' }
      },
      {
        kyrgyz: 'жаз',
        translation: { en: 'spring', ru: 'весна' }
      },
      {
        kyrgyz: 'жамгыр',
        translation: { en: 'rain', ru: 'дождь' }
      },
      {
        kyrgyz: 'кар',
        translation: { en: 'snow', ru: 'снег' }
      },
      {
        kyrgyz: 'шамал',
        translation: { en: 'wind', ru: 'ветер' }
      },
      {
        kyrgyz: 'ысык',
        translation: { en: 'hot', ru: 'жарко' }
      },
      {
        kyrgyz: 'суук',
        translation: { en: 'cold', ru: 'холодно' }
      }
    ]
  },

  // ===== B1 LEVEL (2000-2200 words target) =====
  {
    id: 'b1_vocab_1',
    level: 'B1',
    order: 1,
    title: {
      en: 'Education & Learning',
      ru: 'Образование и учеба'
    },
    description: {
      en: 'School, university, and academic vocabulary',
      ru: 'Школа, университет и учебная лексика'
    },
    icon: '🎓',
    targetWords: 60,
    words: [
      {
        kyrgyz: 'билим',
        translation: { en: 'education/knowledge', ru: 'образование/знание' }
      },
      {
        kyrgyz: 'мектеп',
        translation: { en: 'school', ru: 'школа' }
      },
      {
        kyrgyz: 'университет',
        translation: { en: 'university', ru: 'университет' }
      },
      {
        kyrgyz: 'сабак',
        translation: { en: 'lesson', ru: 'урок' }
      },
      {
        kyrgyz: 'окуучу',
        translation: { en: 'student', ru: 'ученик' }
      },
      {
        kyrgyz: 'мугалим',
        translation: { en: 'teacher', ru: 'учитель' }
      },
      {
        kyrgyz: 'китеп',
        translation: { en: 'book', ru: 'книга' }
      },
      {
        kyrgyz: 'экзамен',
        translation: { en: 'exam', ru: 'экзамен' }
      },
      {
        kyrgyz: 'окуу',
        translation: { en: 'to study/read', ru: 'учиться/читать' }
      },
      {
        kyrgyz: 'үйрөнүү',
        translation: { en: 'to learn', ru: 'учить' }
      }
    ]
  },
  {
    id: 'b1_vocab_2',
    level: 'B1',
    order: 2,
    title: {
      en: 'Work & Career',
      ru: 'Работа и карьера'
    },
    description: {
      en: 'Job-related vocabulary and career terms',
      ru: 'Лексика о работе и карьерные термины'
    },
    icon: '💼',
    targetWords: 50,
    words: [
      {
        kyrgyz: 'иш',
        translation: { en: 'work/job', ru: 'работа' }
      },
      {
        kyrgyz: 'кызмат',
        translation: { en: 'position/service', ru: 'должность/служба' }
      },
      {
        kyrgyz: 'жумуш',
        translation: { en: 'employment', ru: 'занятость' }
      },
      {
        kyrgyz: 'акы',
        translation: { en: 'salary', ru: 'зарплата' }
      },
      {
        kyrgyz: 'кеңсе',
        translation: { en: 'office', ru: 'офис' }
      },
      {
        kyrgyz: 'иштөө',
        translation: { en: 'to work', ru: 'работать' }
      },
      {
        kyrgyz: 'карьера',
        translation: { en: 'career', ru: 'карьера' }
      }
    ]
  },

  // ===== B2 LEVEL (4000-4500 words target) =====
  {
    id: 'b2_vocab_1',
    level: 'B2',
    order: 1,
    title: {
      en: 'Politics & Society',
      ru: 'Политика и общество'
    },
    description: {
      en: 'Political systems, elections, and social issues',
      ru: 'Политические системы, выборы и социальные вопросы'
    },
    icon: '🏛️',
    targetWords: 80,
    words: [
      {
        kyrgyz: 'саясат',
        translation: { en: 'politics', ru: 'политика' }
      },
      {
        kyrgyz: 'өкмөт',
        translation: { en: 'government', ru: 'правительство' }
      },
      {
        kyrgyz: 'шайлоо',
        translation: { en: 'election', ru: 'выборы' }
      },
      {
        kyrgyz: 'демократия',
        translation: { en: 'democracy', ru: 'демократия' }
      },
      {
        kyrgyz: 'коом',
        translation: { en: 'society', ru: 'общество' }
      },
      {
        kyrgyz: 'укук',
        translation: { en: 'right/law', ru: 'право' }
      }
    ]
  },

  // ===== C1 LEVEL (6000-8000+ words target) =====
  {
    id: 'c1_vocab_1',
    level: 'C1',
    order: 1,
    title: {
      en: 'Academic & Literary Language',
      ru: 'Академический и литературный язык'
    },
    description: {
      en: 'Advanced academic and literary vocabulary',
      ru: 'Продвинутая академическая и литературная лексика'
    },
    icon: '📚',
    targetWords: 100,
    words: [
      {
        kyrgyz: 'илим',
        translation: { en: 'science', ru: 'наука' }
      },
      {
        kyrgyz: 'изилдөө',
        translation: { en: 'research', ru: 'исследование' }
      },
      {
        kyrgyz: 'адабият',
        translation: { en: 'literature', ru: 'литература' }
      },
      {
        kyrgyz: 'метафора',
        translation: { en: 'metaphor', ru: 'метафора' }
      },
      {
        kyrgyz: 'символ',
        translation: { en: 'symbol', ru: 'символ' }
      }
    ]
  }
]

export function getTopicsByLevel(level: Level): VocabularyTopic[] {
  return VOCABULARY_TOPICS.filter(topic => topic.level === level)
}

export function getTopicById(id: string): VocabularyTopic | undefined {
  return VOCABULARY_TOPICS.find(topic => topic.id === id)
}

export function getAllLevels(): Level[] {
  return ['A1', 'A2', 'B1', 'B2', 'C1']
}

export function getTotalWordsByLevel(level: Level): number {
  return getTopicsByLevel(level).reduce((sum, topic) => sum + topic.words.length, 0)
}
