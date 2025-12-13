// Grammar lessons for all CEFR levels (A1-C1)
// Based on comprehensive Kyrgyz grammar roadmap (Syntax + Morphology)

export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1'

export type LessonType = 'syntax' | 'morphology'

export interface GrammarLesson {
  id: string
  level: Level
  type: LessonType
  order: number
  title: {
    en: string
    ru: string
  }
  description: {
    en: string
    ru: string
  }
  content: {
    en: string
    ru: string
  }
  examples: Array<{
    kyrgyz: string
    translation: {
      en: string
      ru: string
    }
    explanation?: {
      en: string
      ru: string
    }
  }>
  exercises?: Array<{
    id: string
    question: {
      en: string
      ru: string
    }
    options: {
      en: string[]
      ru: string[]
    }
    correct: number
  }>
}

export const GRAMMAR_LESSONS: GrammarLesson[] = [
  // ===== A1 LEVEL - SYNTAX =====
  {
    id: 'a1_syn_1',
    level: 'A1',
    type: 'syntax',
    order: 1,
    title: {
      en: 'The Concept of a Sentence',
      ru: 'Понятие о предложении'
    },
    description: {
      en: 'Learn the basic structure of Kyrgyz sentences and key questions: Who? What? What is doing?',
      ru: 'Изучите базовую структуру кыргызских предложений и ключевые вопросы: Ким? Эмне? Эмне кылат?'
    },
    content: {
      en: 'A sentence is a group of words that expresses a complete thought. In Kyrgyz, every sentence answers basic questions:\n\n• **Ким?** (Who?) - asks about the subject\n• **Эмне?** (What?) - asks about the object\n• **Эмне кылат?** (What is doing?) - asks about the action\n\nThese three elements form the foundation of Kyrgyz sentences.',
      ru: 'Предложение - это группа слов, выражающая законченную мысль. В кыргызском языке каждое предложение отвечает на базовые вопросы:\n\n• **Ким?** (Кто?) - спрашивает о подлежащем\n• **Эмне?** (Что?) - спрашивает о дополнении\n• **Эмне кылат?** (Что делает?) - спрашивает о действии\n\nЭти три элемента формируют основу кыргызских предложений.'
    },
    examples: [
      {
        kyrgyz: 'Мен окуйм.',
        translation: {
          en: 'I read.',
          ru: 'Я читаю.'
        },
        explanation: {
          en: 'Ким? (Who?) - Мен (I). Эмне кылат? (What is doing?) - окуйм (read).',
          ru: 'Ким? (Кто?) - Мен (Я). Эмне кылат? (Что делает?) - окуйм (читаю).'
        }
      },
      {
        kyrgyz: 'Ал келди.',
        translation: {
          en: 'He/She came.',
          ru: 'Он/Она пришёл/пришла.'
        },
        explanation: {
          en: 'Ким? (Who?) - Ал (He/She). Эмне кылат? (What did?) - келди (came).',
          ru: 'Ким? (Кто?) - Ал (Он/Она). Эмне кылат? (Что сделал?) - келди (пришёл).'
        }
      },
      {
        kyrgyz: 'Китеп жакшы.',
        translation: {
          en: 'The book is good.',
          ru: 'Книга хорошая.'
        },
        explanation: {
          en: 'Эмне? (What?) - Китеп (book). Кандай? (How?) - жакшы (good).',
          ru: 'Эмне? (Что?) - Китеп (книга). Кандай? (Какая?) - жакшы (хорошая).'
        }
      }
    ]
  },

  {
    id: 'a1_syn_2',
    level: 'A1',
    type: 'syntax',
    order: 2,
    title: {
      en: 'Main Parts of a Sentence',
      ru: 'Главные члены предложения'
    },
    description: {
      en: 'Understand the subject and predicate - the two main parts of every sentence',
      ru: 'Поймите подлежащее и сказуемое - две главные части каждого предложения'
    },
    content: {
      en: 'Every Kyrgyz sentence has two main parts:\n\n**1. Subject (Баш мүчө)** - who or what the sentence is about\n• Answers the question: Ким? (Who?) or Эмне? (What?)\n• Usually a noun or pronoun\n\n**2. Predicate (Баяндооч)** - what the subject does or is\n• Answers: Эмне кылат? (What does?) or Кандай? (How is?)\n• Usually a verb or adjective',
      ru: 'Каждое кыргызское предложение имеет две главные части:\n\n**1. Подлежащее (Баш мүчө)** - о ком или о чём говорится в предложении\n• Отвечает на вопрос: Ким? (Кто?) или Эмне? (Что?)\n• Обычно существительное или местоимение\n\n**2. Сказуемое (Баяндооч)** - что делает или чем является подлежащее\n• Отвечает на: Эмне кылат? (Что делает?) или Кандай? (Какой?)\n• Обычно глагол или прилагательное'
    },
    examples: [
      {
        kyrgyz: 'Бала ойнойт.',
        translation: {
          en: 'The child plays.',
          ru: 'Ребёнок играет.'
        },
        explanation: {
          en: 'Subject: Бала (child). Predicate: ойнойт (plays).',
          ru: 'Подлежащее: Бала (ребёнок). Сказуемое: ойнойт (играет).'
        }
      },
      {
        kyrgyz: 'Күн жарык.',
        translation: {
          en: 'The sun is bright.',
          ru: 'Солнце яркое.'
        },
        explanation: {
          en: 'Subject: Күн (sun). Predicate: жарык (bright).',
          ru: 'Подлежащее: Күн (солнце). Сказуемое: жарык (яркое).'
        }
      },
      {
        kyrgyz: 'Мугалим окутат.',
        translation: {
          en: 'The teacher teaches.',
          ru: 'Учитель учит.'
        },
        explanation: {
          en: 'Subject: Мугалим (teacher). Predicate: окутат (teaches).',
          ru: 'Подлежащее: Мугалим (учитель). Сказуемое: окутат (учит).'
        }
      }
    ],
    exercises: [
      {
        id: 'a1_syn_2_ex1',
        question: {
          en: 'Identify the subject in: "Досум келди."',
          ru: 'Определите подлежащее в предложении: "Досум келди."'
        },
        options: {
          en: ['Досум (my friend)', 'келди (came)', 'both', 'neither'],
          ru: ['Досум (мой друг)', 'келди (пришёл)', 'оба', 'ни одно']
        },
        correct: 0
      },
      {
        id: 'a1_syn_2_ex2',
        question: {
          en: 'What is the predicate in: "Суу таза."?',
          ru: 'Что является сказуемым в предложении: "Суу таза."?'
        },
        options: {
          en: ['Суу (water)', 'таза (clean)', 'both', 'neither'],
          ru: ['Суу (вода)', 'таза (чистая)', 'оба', 'ни одно']
        },
        correct: 1
      }
    ]
  },

  {
    id: 'a1_syn_3',
    level: 'A1',
    type: 'syntax',
    order: 3,
    title: {
      en: 'Word Order in Kyrgyz',
      ru: 'Порядок слов в кыргызском языке'
    },
    description: {
      en: 'Master the SOV (Subject-Object-Verb) word order - the foundation of Kyrgyz syntax',
      ru: 'Освойте порядок SOV (Подлежащее-Дополнение-Сказуемое) - основу кыргызского синтаксиса'
    },
    content: {
      en: 'Kyrgyz follows a strict word order pattern:\n\n**Subject → Object → Verb**\n\n**CRITICAL RULE:** The verb (predicate) ALWAYS comes at the end of the sentence.\n\nThis is different from English (SVO) and Russian (flexible order). In Kyrgyz, changing the word order changes the emphasis, but the verb stays at the end.',
      ru: 'Кыргызский язык следует строгому порядку слов:\n\n**Подлежащее → Дополнение → Сказуемое**\n\n**ВАЖНОЕ ПРАВИЛО:** Глагол (сказуемое) ВСЕГДА стоит в конце предложения.\n\nЭто отличается от английского (SVO) и русского (гибкий порядок). В кыргызском языке изменение порядка слов меняет акцент, но глагол остаётся в конце.'
    },
    examples: [
      {
        kyrgyz: 'Мен китеп окуйм.',
        translation: {
          en: 'I read a book.',
          ru: 'Я читаю книгу.'
        },
        explanation: {
          en: 'Subject (Мен) → Object (китеп) → Verb (окуйм)',
          ru: 'Подлежащее (Мен) → Дополнение (китеп) → Сказуемое (окуйм)'
        }
      },
      {
        kyrgyz: 'Ал мектепке барат.',
        translation: {
          en: 'He/She goes to school.',
          ru: 'Он/Она идёт в школу.'
        },
        explanation: {
          en: 'Subject (Ал) → Object (мектепке) → Verb (барат)',
          ru: 'Подлежащее (Ал) → Дополнение (мектепке) → Сказуемое (барат)'
        }
      },
      {
        kyrgyz: 'Биз тамак жейбиз.',
        translation: {
          en: 'We eat food.',
          ru: 'Мы едим еду.'
        },
        explanation: {
          en: 'Subject (Биз) → Object (тамак) → Verb (жейбиз)',
          ru: 'Подлежащее (Биз) → Дополнение (тамак) → Сказуемое (жейбиз)'
        }
      }
    ],
    exercises: [
      {
        id: 'a1_syn_3_ex1',
        question: {
          en: 'Arrange in correct order: келет / Досум / эртең',
          ru: 'Расположите в правильном порядке: келет / Досум / эртең'
        },
        options: {
          en: ['Досум эртең келет', 'келет Досум эртең', 'эртең келет Досум', 'Досум келет эртең'],
          ru: ['Досум эртең келет', 'келет Досум эртең', 'эртең келет Досум', 'Досум келет эртең']
        },
        correct: 0
      }
    ]
  },

  {
    id: 'a1_syn_4',
    level: 'A1',
    type: 'syntax',
    order: 4,
    title: {
      en: 'Interrogative Sentences',
      ru: 'Вопросительные предложения'
    },
    description: {
      en: 'Learn how to ask questions using question words and the particle -бы/-би',
      ru: 'Научитесь задавать вопросы с помощью вопросительных слов и частицы -бы/-би'
    },
    content: {
      en: 'There are two ways to ask questions in Kyrgyz:\n\n**1. With Question Words:**\n• **Ким?** (Who?)\n• **Эмне?** (What?)\n• **Кайда?** (Where?)\n• **Качан?** (When?)\n• **Кандай?** (How? / What kind?)\n• **Канча?** (How much? / How many?)\n\n**2. With Particle -бы/-би:**\nAdd -бы/-би/-пы/-пи to the end of the word you want to emphasize.\n\n**Vowel Harmony:**\n• After a/о/у/ы → use -бы/-пы\n• After э/ө/ү/и → use -би/-пи',
      ru: 'В кыргызском языке есть два способа задать вопрос:\n\n**1. С вопросительными словами:**\n• **Ким?** (Кто?)\n• **Эмне?** (Что?)\n• **Кайда?** (Где? / Куда?)\n• **Качан?** (Когда?)\n• **Кандай?** (Как? / Какой?)\n• **Канча?** (Сколько?)\n\n**2. С частицей -бы/-би:**\nДобавьте -бы/-би/-пы/-пи в конец слова, которое хотите подчеркнуть.\n\n**Гармония гласных:**\n• После a/о/у/ы → используйте -бы/-пы\n• После э/ө/ү/и → используйте -би/-пи'
    },
    examples: [
      {
        kyrgyz: 'Ким келди?',
        translation: {
          en: 'Who came?',
          ru: 'Кто пришёл?'
        }
      },
      {
        kyrgyz: 'Сен эмне жейсиң?',
        translation: {
          en: 'What are you eating?',
          ru: 'Что ты ешь?'
        }
      },
      {
        kyrgyz: 'Сиз кайда барасыз?',
        translation: {
          en: 'Where are you going?',
          ru: 'Куда вы идёте?'
        }
      },
      {
        kyrgyz: 'Сен окуучубусуң?',
        translation: {
          en: 'Are you a student?',
          ru: 'Ты студент?'
        },
        explanation: {
          en: 'окуучу (student) + -бу (question particle) + -суң (you are)',
          ru: 'окуучу (студент) + -бу (вопросительная частица) + -суң (ты)'
        }
      },
      {
        kyrgyz: 'Ал үйдөбү?',
        translation: {
          en: 'Is he/she at home?',
          ru: 'Он/Она дома?'
        },
        explanation: {
          en: 'үй (home) + -дө (at) + -бү (question particle)',
          ru: 'үй (дом) + -дө (в/на) + -бү (вопросительная частица)'
        }
      }
    ],
    exercises: [
      {
        id: 'a1_syn_4_ex1',
        question: {
          en: 'How to ask "Are you going?" using барасың (you go)?',
          ru: 'Как спросить "Ты идёшь?" используя барасың (ты идёшь)?'
        },
        options: {
          en: ['Барасыңбы?', 'Барасыңба?', 'Барасың?', 'Барасыңды?'],
          ru: ['Барасыңбы?', 'Барасыңба?', 'Барасың?', 'Барасыңды?']
        },
        correct: 0
      },
      {
        id: 'a1_syn_4_ex2',
        question: {
          en: 'Which question word means "Where?"',
          ru: 'Какое вопросительное слово означает "Где?"'
        },
        options: {
          en: ['Ким', 'Кайда', 'Качан', 'Эмне'],
          ru: ['Ким', 'Кайда', 'Качан', 'Эмне']
        },
        correct: 1
      }
    ]
  },

  // ===== A1 LEVEL - MORPHOLOGY =====
  {
    id: 'a1_mor_1',
    level: 'A1',
    type: 'morphology',
    order: 5,
    title: {
      en: 'Kyrgyz Alphabet and Pronunciation',
      ru: 'Кыргызский алфавит и произношение'
    },
    description: {
      en: 'Master the Kyrgyz Cyrillic alphabet, pronunciation rules, and stress patterns',
      ru: 'Освойте кыргызский кириллический алфавит, правила произношения и ударения'
    },
    content: {
      en: 'The Kyrgyz alphabet has **36 letters** based on Cyrillic:\n\n**Unique Kyrgyz Letters:**\n• **Ң ң** - nasal "ng" sound (like in "sing")\n• **Ө ө** - rounded "o" (like German ö)\n• **Ү ү** - rounded "u" (like German ü)\n\n**Stress Rules:**\n• Stress usually falls on the **last syllable**\n• In words with suffixes, stress moves to the last syllable\n• Exception: some borrowed words keep original stress\n\n**Vowel Harmony:**\nKyrgyz has front and back vowels that must match within a word.',
      ru: 'Кыргызский алфавит содержит **36 букв** на основе кириллицы:\n\n**Уникальные кыргызские буквы:**\n• **Ң ң** - носовой звук "нг" (как в слове "sing")\n• **Ө ө** - огубленный "о" (как немецкий ö)\n• **Ү ү** - огубленный "у" (как немецкий ü)\n\n**Правила ударения:**\n• Ударение обычно падает на **последний слог**\n• В словах с суффиксами ударение переходит на последний слог\n• Исключение: некоторые заимствованные слова сохраняют оригинальное ударение\n\n**Гармония гласных:**\nВ кыргызском языке есть передние и задние гласные, которые должны совпадать в слове.'
    },
    examples: [
      {
        kyrgyz: 'Бала',
        translation: {
          en: 'Child',
          ru: 'Ребёнок'
        },
        explanation: {
          en: 'Stress on last syllable: ba-LA',
          ru: 'Ударение на последнем слоге: ба-ЛА'
        }
      },
      {
        kyrgyz: 'Көңүл',
        translation: {
          en: 'Attention / Heart',
          ru: 'Внимание / Сердце'
        },
        explanation: {
          en: 'Front vowels: ө-ү (both rounded)',
          ru: 'Передние гласные: ө-ү (обе огубленные)'
        }
      },
      {
        kyrgyz: 'Жаңы',
        translation: {
          en: 'New',
          ru: 'Новый'
        },
        explanation: {
          en: 'Contains ң (ng sound)',
          ru: 'Содержит ң (звук нг)'
        }
      }
    ]
  },

  {
    id: 'a1_mor_2',
    level: 'A1',
    type: 'morphology',
    order: 6,
    title: {
      en: 'Nouns: Number and Basic Cases',
      ru: 'Существительные: число и основные падежи'
    },
    description: {
      en: 'Learn plural forms and the five basic noun cases in Kyrgyz',
      ru: 'Изучите формы множественного числа и пять основных падежей существительных'
    },
    content: {
      en: '**Plural Forms:**\nAdd **-лар/-лер** or **-дар/-дер** or **-тар/-тер** depending on the last sound:\n• After vowels/voiced consonants: -лар/-лер\n• After voiced stops: -дар/-дер\n• After voiceless consonants: -тар/-тер\n\n**Five Basic Cases:**\n1. **Nominative (Атооч)** - base form (who/what)\n2. **Accusative (Табыш)** - direct object (-ды/-ни)\n3. **Dative (Барыш)** - to/toward (-га/-ге)\n4. **Locative (Жатыш)** - at/in (-да/-де)\n5. **Ablative (Чыгыш)** - from (-дан/-ден)',
      ru: '**Формы множественного числа:**\nДобавьте **-лар/-лер** или **-дар/-дер** или **-тар/-тер** в зависимости от последнего звука:\n• После гласных/звонких согласных: -лар/-лер\n• После звонких смычных: -дар/-дер\n• После глухих согласных: -тар/-тер\n\n**Пять основных падежей:**\n1. **Именительный (Атооч)** - базовая форма (кто/что)\n2. **Винительный (Табыш)** - прямое дополнение (-ды/-ни)\n3. **Дательный (Барыш)** - кому/к чему (-га/-ге)\n4. **Местный (Жатыш)** - где/в чём (-да/-де)\n5. **Исходный (Чыгыш)** - откуда (-дан/-ден)'
    },
    examples: [
      {
        kyrgyz: 'Китеп → Китептер',
        translation: {
          en: 'Book → Books',
          ru: 'Книга → Книги'
        },
        explanation: {
          en: 'After voiceless "п": add -тер',
          ru: 'После глухого "п": добавляем -тер'
        }
      },
      {
        kyrgyz: 'Үйгө барам',
        translation: {
          en: 'I go home (to home)',
          ru: 'Я иду домой (к дому)'
        },
        explanation: {
          en: 'Үй (home) + -гө (dative case)',
          ru: 'Үй (дом) + -гө (дательный падеж)'
        }
      },
      {
        kyrgyz: 'Мектепте окуйм',
        translation: {
          en: 'I study at school',
          ru: 'Я учусь в школе'
        },
        explanation: {
          en: 'Мектеп (school) + -те (locative case)',
          ru: 'Мектеп (школа) + -те (местный падеж)'
        }
      },
      {
        kyrgyz: 'Бишкектен келдим',
        translation: {
          en: 'I came from Bishkek',
          ru: 'Я приехал из Бишкека'
        },
        explanation: {
          en: 'Бишкек + -тен (ablative case)',
          ru: 'Бишкек + -тен (исходный падеж)'
        }
      }
    ],
    exercises: [
      {
        id: 'a1_mor_2_ex1',
        question: {
          en: 'What is the plural of "бала" (child)?',
          ru: 'Какое множественное число слова "бала" (ребёнок)?'
        },
        options: {
          en: ['балалар', 'баладар', 'балатар', 'балалер'],
          ru: ['балалар', 'баладар', 'балатар', 'балалер']
        },
        correct: 0
      },
      {
        id: 'a1_mor_2_ex2',
        question: {
          en: 'Add the dative case to "дүкөн" (shop): "I go to the shop"',
          ru: 'Добавьте дательный падеж к "дүкөн" (магазин): "Я иду в магазин"'
        },
        options: {
          en: ['дүкөнгө', 'дүкөндө', 'дүкөндөн', 'дүкөнду'],
          ru: ['дүкөнгө', 'дүкөндө', 'дүкөндөн', 'дүкөнду']
        },
        correct: 0
      }
    ]
  }

  // ... More lessons will be added for A2, B1, B2, C1 levels
]

export const getLessonsByLevel = (level: Level): GrammarLesson[] => {
  return GRAMMAR_LESSONS.filter(lesson => lesson.level === level).sort((a, b) => a.order - b.order)
}

export const getLessonsByType = (type: LessonType): GrammarLesson[] => {
  return GRAMMAR_LESSONS.filter(lesson => lesson.type === type).sort((a, b) => a.order - b.order)
}

export const getLessonById = (id: string): GrammarLesson | undefined => {
  return GRAMMAR_LESSONS.find(lesson => lesson.id === id)
}
