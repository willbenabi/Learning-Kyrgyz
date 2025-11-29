// Comprehensive Grammar Lessons based on full curriculum
// Each topic from the grammar plan becomes a full lesson with theory, examples, and tests

export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1'
export type LessonCategory = 'syntax' | 'morphology' | 'final_test'

export interface GrammarLesson {
  id: string
  level: Level
  category: LessonCategory
  order: number
  title: {
    en: string
    ru: string
  }
  description: {
    en: string
    ru: string
  }
  theory: {
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
  vocabulary?: string[] // Optional word bank for the lesson
  quiz: Array<{
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
    explanation?: {
      en: string
      ru: string
    }
  }>
}

export const COMPREHENSIVE_GRAMMAR_LESSONS: GrammarLesson[] = [
  // ===== A1 LEVEL - SYNTAX =====
  {
    id: 'a1_syn_1',
    level: 'A1',
    category: 'syntax',
    order: 1,
    title: {
      en: 'Sentence and Phrase Concept',
      ru: 'Понятие о предложении и словосочетании'
    },
    description: {
      en: 'Understanding the difference between sentences and phrases in Kyrgyz',
      ru: 'Понимание разницы между предложениями и словосочетаниями в кыргызском языке'
    },
    theory: {
      en: `A **sentence** is a grammatical unit that expresses a complete thought. It must have a subject and a predicate.

A **phrase** is a combination of two or more words that does not express a complete thought and does not have a predicate.

**Key Differences:**
- Sentence: "Мен окуйм" (I read) - complete thought with subject "мен" and predicate "окуйм"
- Phrase: "жаңы китеп" (new book) - no predicate, incomplete thought

In Kyrgyz, every sentence must have a predicate (verb or noun in predicative form) at the end.`,
      ru: `**Предложение** — это грамматическая единица, которая выражает законченную мысль. Оно должно иметь подлежащее и сказуемое.

**Словосочетание** — это сочетание двух или более слов, которое не выражает законченную мысль и не имеет сказуемого.

**Ключевые различия:**
- Предложение: "Мен окуйм" (Я читаю) - законченная мысль с подлежащим "мен" и сказуемым "окуйм"
- Словосочетание: "жаңы китеп" (новая книга) - нет сказуемого, незаконченная мысль

В кыргызском языке каждое предложение должно иметь сказуемое (глагол или существительное в предикативной форме) в конце.`
    },
    examples: [
      {
        kyrgyz: 'Мен окуйм.',
        translation: {
          en: 'I read.',
          ru: 'Я читаю.'
        },
        explanation: {
          en: 'Complete sentence: subject (мен) + predicate (окуйм)',
          ru: 'Полное предложение: подлежащее (мен) + сказуемое (окуйм)'
        }
      },
      {
        kyrgyz: 'жаңы китеп',
        translation: {
          en: 'new book',
          ru: 'новая книга'
        },
        explanation: {
          en: 'Phrase: adjective + noun, no predicate',
          ru: 'Словосочетание: прилагательное + существительное, нет сказуемого'
        }
      },
      {
        kyrgyz: 'Үй чоң.',
        translation: {
          en: 'The house is big.',
          ru: 'Дом большой.'
        },
        explanation: {
          en: 'Sentence: subject (үй) + predicate (чоң)',
          ru: 'Предложение: подлежащее (үй) + сказуемое (чоң)'
        }
      }
    ],
    vocabulary: ['мен', 'окуйм', 'жаңы', 'китеп', 'үй', 'чоң'],
    quiz: [
      {
        id: 'q1',
        question: {
          en: 'Which of these is a complete sentence?',
          ru: 'Какое из этого является полным предложением?'
        },
        options: {
          en: ['кызыл алма', 'Мен барам', 'жакшы дос'],
          ru: ['кызыл алма', 'Мен барам', 'жакшы дос']
        },
        correct: 1,
        explanation: {
          en: '"Мен барам" is a complete sentence with subject and predicate',
          ru: '"Мен барам" - это полное предложение с подлежащим и сказуемым'
        }
      },
      {
        id: 'q2',
        question: {
          en: 'What is missing in "жаңы китеп"?',
          ru: 'Чего не хватает в "жаңы китеп"?'
        },
        options: {
          en: ['Subject', 'Predicate', 'Object'],
          ru: ['Подлежащего', 'Сказуемого', 'Дополнения']
        },
        correct: 1,
        explanation: {
          en: 'It lacks a predicate, making it a phrase, not a sentence',
          ru: 'Отсутствует сказуемое, поэтому это словосочетание, а не предложение'
        }
      },
      {
        id: 'q3',
        question: {
          en: 'Identify the phrase:',
          ru: 'Определите словосочетание:'
        },
        options: {
          en: ['Ал келди', 'чоң үй', 'Биз окуйбуз'],
          ru: ['Ал келди', 'чоң үй', 'Биз окуйбуз']
        },
        correct: 1
      }
    ]
  },

  {
    id: 'a1_syn_2',
    level: 'A1',
    category: 'syntax',
    order: 2,
    title: {
      en: 'Subject: Who? What?',
      ru: 'Подлежащее: Кто? Что?'
    },
    description: {
      en: 'Learning about the subject - the main actor in a sentence',
      ru: 'Изучение подлежащего - главного действующего лица в предложении'
    },
    theory: {
      en: `The **subject** (подлежащее) is the main member of a sentence that answers the questions:
- **Ким?** (Who?) - for people and animals
- **Эмне?** (What?) - for things and concepts

**Key points:**
- The subject usually comes at the beginning of the sentence
- It can be expressed by: nouns, pronouns, numerals
- The subject performs the action or is described by the predicate

**Common subjects:**
- Personal pronouns: мен (I), сен (you), ал (he/she), биз (we), силер (you plural), алар (they)
- Nouns: китеп (book), үй (house), мектеп (school)`,
      ru: `**Подлежащее** — это главный член предложения, который отвечает на вопросы:
- **Ким?** (Кто?) - для людей и животных
- **Эмне?** (Что?) - для вещей и понятий

**Ключевые моменты:**
- Подлежащее обычно стоит в начале предложения
- Может быть выражено: существительными, местоимениями, числительными
- Подлежащее выполняет действие или характеризуется сказуемым

**Распространенные подлежащие:**
- Личные местоимения: мен (я), сен (ты), ал (он/она), биз (мы), силер (вы), алар (они)
- Существительные: китеп (книга), үй (дом), мектеп (школа)`
    },
    examples: [
      {
        kyrgyz: 'Мен окуйм.',
        translation: {
          en: 'I read.',
          ru: 'Я читаю.'
        },
        explanation: {
          en: 'Subject: Мен (I) - answers "Ким?" (Who?)',
          ru: 'Подлежащее: Мен (я) - отвечает на "Ким?" (Кто?)'
        }
      },
      {
        kyrgyz: 'Китеп столдо.',
        translation: {
          en: 'The book is on the table.',
          ru: 'Книга на столе.'
        },
        explanation: {
          en: 'Subject: Китеп (book) - answers "Эмне?" (What?)',
          ru: 'Подлежащее: Китеп (книга) - отвечает на "Эмне?" (Что?)'
        }
      },
      {
        kyrgyz: 'Ал мектепте окуйт.',
        translation: {
          en: 'He/She studies at school.',
          ru: 'Он/Она учится в школе.'
        },
        explanation: {
          en: 'Subject: Ал (he/she) - pronoun acting as subject',
          ru: 'Подлежащее: Ал (он/она) - местоимение в роли подлежащего'
        }
      }
    ],
    vocabulary: ['мен', 'сен', 'ал', 'биз', 'китеп', 'үй', 'мектеп'],
quiz: [
      {
        id: 'q1',
        question: {
          en: 'Find the subject in: "Ал барат"',
          ru: 'Найдите подлежащее в: "Ал барат"'
        },
        options: {
          en: ['Ал', 'барат', 'no subject'],
          ru: ['Ал', 'барат', 'нет подлежащего']
        },
        correct: 0
      },
      {
        id: 'q2',
        question: {
          en: 'What question does the subject answer?',
          ru: 'На какой вопрос отвечает подлежащее?'
        },
        options: {
          en: ['Ким? Эмне?', 'Качан?', 'Кайда?'],
          ru: ['Ким? Эмне?', 'Качан?', 'Кайда?']
        },
        correct: 0
      },
      {
        id: 'q3',
        question: {
          en: 'In "Мектеп чоң", what is the subject?',
          ru: 'В "Мектеп чоң", что является подлежащим?'
        },
        options: {
          en: ['Мектеп', 'чоң', 'both'],
          ru: ['Мектеп', 'чоң', 'оба']
        },
        correct: 0
      }
    ]
  },

  {
    id: 'a1_syn_3',
    level: 'A1',
    category: 'syntax',
    order: 3,
    title: {
      en: 'Predicate: What does it do?',
      ru: 'Сказуемое: Что делает?'
    },
    description: {
      en: 'Understanding the predicate - the action or state in a sentence',
      ru: 'Понимание сказуемого - действия или состояния в предложении'
    },
    theory: {
      en: `The **predicate** (сказуемое) is the main member of a sentence that tells what the subject does or what state it's in.

**Key question:** Эмне кылат? (What does it do?)

**CRITICAL RULE:** In Kyrgyz, the predicate **ALWAYS** comes at the **END** of the sentence!

**Types of predicates:**
1. **Verbal predicate** (действие): окуйм (I read), келди (came), барат (goes)
2. **Nominal predicate** (состояние): жакшы (good), чоң (big), окуучу (student)

**Formation:**
- Verbs take personal endings: -м/-мын (I), -сың/-сыз (you), -т/-ат (he/she)
- Adjectives and nouns can act as predicates without changes`,
      ru: `**Сказуемое** — это главный член предложения, который сообщает, что делает подлежащее или в каком состоянии оно находится.

**Ключевой вопрос:** Эмне кылат? (Что делает?)

**КРИТИЧЕСКОЕ ПРАВИЛО:** В кыргызском языке сказуемое **ВСЕГДА** стоит в **КОНЦЕ** предложения!

**Типы сказуемых:**
1. **Глагольное сказуемое** (действие): окуйм (читаю), келди (пришёл), барат (идёт)
2. **Именное сказуемое** (состояние): жакшы (хороший), чоң (большой), окуучу (ученик)

**Образование:**
- Глаголы принимают личные окончания: -м/-мын (я), -сың/-сыз (ты/вы), -т/-ат (он/она)
- Прилагательные и существительные могут быть сказуемыми без изменений`
    },
    examples: [
      {
        kyrgyz: 'Мен окуйм.',
        translation: {
          en: 'I read.',
          ru: 'Я читаю.'
        },
        explanation: {
          en: 'Predicate: окуйм (read) - verbal predicate at the end',
          ru: 'Сказуемое: окуйм (читаю) - глагольное сказуемое в конце'
        }
      },
      {
        kyrgyz: 'Үй чоң.',
        translation: {
          en: 'The house is big.',
          ru: 'Дом большой.'
        },
        explanation: {
          en: 'Predicate: чоң (big) - nominal predicate (adjective)',
          ru: 'Сказуемое: чоң (большой) - именное сказуемое (прилагательное)'
        }
      },
      {
        kyrgyz: 'Ал мугалим.',
        translation: {
          en: 'He/She is a teacher.',
          ru: 'Он/Она учитель.'
        },
        explanation: {
          en: 'Predicate: мугалим (teacher) - nominal predicate (noun)',
          ru: 'Сказуемое: мугалим (учитель) - именное сказуемое (существительное)'
        }
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: {
          en: 'Where must the predicate be in Kyrgyz?',
          ru: 'Где должно стоять сказуемое в кыргызском языке?'
        },
        options: {
          en: ['At the beginning', 'In the middle', 'At the end'],
          ru: ['В начале', 'В середине', 'В конце']
        },
        correct: 2
      },
      {
        id: 'q2',
        question: {
          en: 'Find the predicate in: "Мен барам"',
          ru: 'Найдите сказуемое в: "Мен барам"'
        },
        options: {
          en: ['Мен', 'барам', 'no predicate'],
          ru: ['Мен', 'барам', 'нет сказуемого']
        },
        correct: 1
      },
      {
        id: 'q3',
        question: {
          en: 'In "Китеп жакшы", what type of predicate is "жакшы"?',
          ru: 'В "Китеп жакшы", какой тип сказуемого "жакшы"?'
        },
        options: {
          en: ['Verbal', 'Nominal', 'Neither'],
          ru: ['Глагольное', 'Именное', 'Ни то, ни другое']
        },
        correct: 1
      }
    ]
  },

  // A1 Syntax Lesson 4: Word Order
  {
    id: 'a1_syn_4',
    level: 'A1',
    category: 'syntax',
    order: 4,
    title: {
      en: 'Word Order in Sentences',
      ru: 'Порядок слов в предложении'
    },
    description: {
      en: 'Master the SOV (Subject-Object-Verb) word order pattern',
      ru: 'Освойте порядок слов SOV (Подлежащее-Дополнение-Сказуемое)'
    },
    theory: {
      en: `Kyrgyz follows a strict **SOV** (Subject-Object-Verb) word order:

**Pattern:** Subject → Object → Verb

**Critical Rules:**
1. The verb (predicate) ALWAYS comes LAST
2. The subject typically comes FIRST
3. Objects and other elements come BETWEEN subject and verb
4. This order is much more rigid than in English or Russian

**Example breakdown:**
- English: I read books (SVO)
- Russian: Я читаю книги (SVO, but flexible)
- Kyrgyz: Мен китептерди окуйм (SOV - strict!)

Changing this order changes emphasis or sounds unnatural.`,
      ru: `Кыргызский язык следует строгому порядку слов **SOV** (Подлежащее-Дополнение-Сказуемое):

**Шаблон:** Подлежащее → Дополнение → Глагол

**Критические правила:**
1. Глагол (сказуемое) ВСЕГДА стоит ПОСЛЕДНИМ
2. Подлежащее обычно стоит ПЕРВЫМ
3. Дополнения и другие элементы стоят МЕЖДУ подлежащим и глаголом
4. Этот порядок гораздо более жесткий, чем в английском или русском

**Разбор примера:**
- Английский: I read books (SVO)
- Русский: Я читаю книги (SVO, но гибкий)
- Кыргызский: Мен китептерди окуйм (SOV - строго!)

Изменение порядка меняет акцент или звучит неестественно.`
    },
    examples: [
      {
        kyrgyz: 'Мен китеп окуйм.',
        translation: {
          en: 'I read a book.',
          ru: 'Я читаю книгу.'
        },
        explanation: {
          en: 'S (Мен) → O (китеп) → V (окуйм)',
          ru: 'П (Мен) → Д (китеп) → С (окуйм)'
        }
      },
      {
        kyrgyz: 'Биз үйгө барабыз.',
        translation: {
          en: 'We go home.',
          ru: 'Мы идём домой.'
        },
        explanation: {
          en: 'S (Биз) → O (үйгө) → V (барабыз)',
          ru: 'П (Биз) → Д (үйгө) → С (барабыз)'
        }
      },
      {
        kyrgyz: 'Ал мектепте сабак окуйт.',
        translation: {
          en: 'He/She studies at school.',
          ru: 'Он/Она учится в школе.'
        },
        explanation: {
          en: 'S (Ал) → Place (мектепте) → O (сабак) → V (окуйт)',
          ru: 'П (Ал) → Место (мектепте) → Д (сабак) → С (окуйт)'
        }
      }
    ],
    vocabulary: ['мен', 'биз', 'ал', 'китеп', 'үйгө', 'мектепте', 'окуйм', 'барабыз'],
    quiz: [
      {
        id: 'q1',
        question: {
          en: 'Arrange correctly: келди / досум / бүгүн',
          ru: 'Расположите правильно: келди / досум / бүгүн'
        },
        options: {
          en: ['Досум бүгүн келди', 'келди досум бүгүн', 'бүгүн келди досум'],
          ru: ['Досум бүгүн келди', 'келди досум бүгүн', 'бүгүн келди досум']
        },
        correct: 0,
        explanation: {
          en: 'Subject (досум) → Time (бүгүн) → Verb (келди)',
          ru: 'Подлежащее (досум) → Время (бүгүн) → Глагол (келди)'
        }
      },
      {
        id: 'q2',
        question: {
          en: 'What comes last in Kyrgyz sentences?',
          ru: 'Что стоит последним в кыргызских предложениях?'
        },
        options: {
          en: ['Subject', 'Object', 'Verb'],
          ru: ['Подлежащее', 'Дополнение', 'Глагол']
        },
        correct: 2
      },
      {
        id: 'q3',
        question: {
          en: 'Fix the order: окуйм китеп мен',
          ru: 'Исправьте порядок: окуйм китеп мен'
        },
        options: {
          en: ['Мен китеп окуйм', 'Китеп мен окуйм', 'Окуйм мен китеп'],
          ru: ['Мен китеп окуйм', 'Китеп мен окуйм', 'Окуйм мен китеп']
        },
        correct: 0
      }
    ]
  },

  // A1 Syntax Lesson 5: Types of Sentences
  {
    id: 'a1_syn_5',
    level: 'A1',
    category: 'syntax',
    order: 5,
    title: {
      en: 'Types of Sentences by Purpose',
      ru: 'Типы предложений по цели высказывания'
    },
    description: {
      en: 'Learn declarative, interrogative, and exclamatory sentences',
      ru: 'Изучите повествовательные, вопросительные и восклицательные предложения'
    },
    theory: {
      en: `Sentences in Kyrgyz are classified by their communicative purpose:

**1. Declarative (повествовательные)** - Statement
- Simply states a fact or describes something
- Ends with a period (.)
- Example: Мен окуйм. (I read.)

**2. Interrogative (вопросительные)** - Question
- Asks a question
- Uses question words (ким, эмне, кайда, качан) OR particle -бы/-би
- Ends with question mark (?)
- Example: Сен окуйсуңбу? (Do you read?)

**3. Exclamatory (восклицательные)** - Exclamation
- Expresses strong emotion
- Ends with exclamation mark (!)
- Example: Кандай жакшы! (How good!)

**4. Imperative (побудительные)** - Command/Request
- Gives commands, requests, or advice
- Uses imperative verb forms
- Example: Кел! (Come!)`,
      ru: `Предложения в кыргызском языке классифицируются по коммуникативной цели:

**1. Повествовательные** - Утверждение
- Просто констатирует факт или описывает что-то
- Заканчивается точкой (.)
- Пример: Мен окуйм. (Я читаю.)

**2. Вопросительные** - Вопрос
- Задаёт вопрос
- Использует вопросительные слова (ким, эмне, кайда, качан) ИЛИ частицу -бы/-би
- Заканчивается вопросительным знаком (?)
- Пример: Сен окуйсуңбу? (Ты читаешь?)

**3. Восклицательные** - Восклицание
- Выражает сильную эмоцию
- Заканчивается восклицательным знаком (!)
- Пример: Кандай жакшы! (Как хорошо!)

**4. Побудительные** - Команда/Просьба
- Даёт команды, просьбы или советы
- Использует повелительные формы глаголов
- Пример: Кел! (Приди!)`
    },
    examples: [
      {
        kyrgyz: 'Мен үйдөмүн.',
        translation: {
          en: 'I am at home.',
          ru: 'Я дома.'
        },
        explanation: {
          en: 'Declarative - states a fact',
          ru: 'Повествовательное - констатирует факт'
        }
      },
      {
        kyrgyz: 'Сен кайдасың?',
        translation: {
          en: 'Where are you?',
          ru: 'Где ты?'
        },
        explanation: {
          en: 'Interrogative - asks question with "кайда"',
          ru: 'Вопросительное - задаёт вопрос со словом "кайда"'
        }
      },
      {
        kyrgyz: 'Кандай сулуу!',
        translation: {
          en: 'How beautiful!',
          ru: 'Как красиво!'
        },
        explanation: {
          en: 'Exclamatory - expresses emotion',
          ru: 'Восклицательное - выражает эмоцию'
        }
      },
      {
        kyrgyz: 'Китепти окугула!',
        translation: {
          en: 'Read the book!',
          ru: 'Читайте книгу!'
        },
        explanation: {
          en: 'Imperative - gives command',
          ru: 'Побудительное - даёт команду'
        }
      }
    ],
    quiz: [
      {
        id: 'q1',
        question: {
          en: 'What type is "Ал барды"?',
          ru: 'Какой тип предложения "Ал барды"?'
        },
        options: {
          en: ['Declarative', 'Interrogative', 'Exclamatory'],
          ru: ['Повествовательное', 'Вопросительное', 'Восклицательное']
        },
        correct: 0
      },
      {
        id: 'q2',
        question: {
          en: 'Identify: "Сен кимсиң?"',
          ru: 'Определите: "Сен кимсиң?"'
        },
        options: {
          en: ['Declarative', 'Interrogative', 'Imperative'],
          ru: ['Повествовательное', 'Вопросительное', 'Побудительное']
        },
        correct: 1
      },
      {
        id: 'q3',
        question: {
          en: 'What punctuation ends an exclamatory sentence?',
          ru: 'Какая пунктуация завершает восклицательное предложение?'
        },
        options: {
          en: ['. (period)', '? (question mark)', '! (exclamation mark)'],
          ru: ['. (точка)', '? (вопросительный знак)', '! (восклицательный знак)']
        },
        correct: 2
      }
    ]
  },

  // A1 Syntax Lesson 6: Secondary Parts of Sentence
  {
    id: 'a1_syn_6',
    level: 'A1',
    category: 'syntax',
    order: 6,
    title: {
      en: 'Secondary Parts of Sentence (Introduction)',
      ru: 'Второстепенные члены предложения (Введение)'
    },
    description: {
      en: 'Introduction to object, attribute, and adverbial modifiers',
      ru: 'Введение в дополнение, определение и обстоятельство'
    },
    theory: {
      en: `Besides the main parts (subject and predicate), sentences have **secondary parts** that add details:

**1. Object (Толуктооч)** - What/Whom?
- Answers: Кимди? Эмнени? (Whom? What?)
- Example: Мен **китепти** окуйм (I read **the book**)

**2. Attribute (Аныктооч)** - Which? What kind?
- Answers: Кандай? Канча? (What kind? How many?)
- Describes nouns
- Example: Мен **жаңы** китепти окуйм (I read a **new** book)

**3. Adverbial Modifier (Тактооч)** - Where? When? How?
- Answers: Кайда? Качан? Кандай? (Where? When? How?)
- Describes verbs
- Example: Мен **үйдө** окуйм (I read **at home**)

These parts expand simple sentences into more detailed ones.`,
      ru: `Кроме главных членов (подлежащего и сказуемого), в предложениях есть **второстепенные члены**, которые добавляют детали:

**1. Дополнение (Толуктооч)** - Что? Кого?
- Отвечает: Кимди? Эмнени? (Кого? Что?)
- Пример: Мен **китепти** окуйм (Я читаю **книгу**)

**2. Определение (Аныктооч)** - Какой? Сколько?
- Отвечает: Кандай? Канча? (Какой? Сколько?)
- Описывает существительные
- Пример: Мен **жаңы** китепти окуйм (Я читаю **новую** книгу)

**3. Обстоятельство (Тактооч)** - Где? Когда? Как?
- Отвечает: Кайда? Качан? Кандай? (Где? Когда? Как?)
- Описывает глаголы
- Пример: Мен **үйдө** окуйм (Я читаю **дома**)

Эти части расширяют простые предложения, делая их более подробными.`
    },
    examples: [
      {
        kyrgyz: 'Мен китепти окуйм.',
        translation: {
          en: 'I read a book.',
          ru: 'Я читаю книгу.'
        },
        explanation: {
          en: 'китепти - object (what I read)',
          ru: 'китепти - дополнение (что читаю)'
        }
      },
      {
        kyrgyz: 'Мен чоң үйдө жашайм.',
        translation: {
          en: 'I live in a big house.',
          ru: 'Я живу в большом доме.'
        },
        explanation: {
          en: 'чоң - attribute (describes house), үйдө - adverbial (where)',
          ru: 'чоң - определение (описывает дом), үйдө - обстоятельство (где)'
        }
      },
      {
        kyrgyz: 'Биз эртең мектепке барабыз.',
        translation: {
          en: 'We go to school tomorrow.',
          ru: 'Мы идём в школу завтра.'
        },
        explanation: {
          en: 'эртең - adverbial (when), мектепке - object (where to)',
          ru: 'эртең - обстоятельство (когда), мектепке - дополнение (куда)'
        }
      }
    ],
    vocabulary: ['китепти', 'үйдө', 'чоң', 'жаңы', 'эртең', 'мектепке'],
    quiz: [
      {
        id: 'q1',
        question: {
          en: 'In "Мен китепти окуйм", what is "китепти"?',
          ru: 'В "Мен китепти окуйм", что такое "китепти"?'
        },
        options: {
          en: ['Subject', 'Object', 'Attribute'],
          ru: ['Подлежащее', 'Дополнение', 'Определение']
        },
        correct: 1
      },
      {
        id: 'q2',
        question: {
          en: 'What does an attribute describe?',
          ru: 'Что описывает определение?'
        },
        options: {
          en: ['Verbs', 'Nouns', 'Adverbs'],
          ru: ['Глаголы', 'Существительные', 'Наречия']
        },
        correct: 1
      },
      {
        id: 'q3',
        question: {
          en: 'Find the adverbial: "Ал бүгүн келди"',
          ru: 'Найдите обстоятельство: "Ал бүгүн келди"'
        },
        options: {
          en: ['Ал', 'бүгүн', 'келди'],
          ru: ['Ал', 'бүгүн', 'келди']
        },
        correct: 1,
        explanation: {
          en: 'бүгүн (today) answers "when?" - adverbial of time',
          ru: 'бүгүн (сегодня) отвечает на "когда?" - обстоятельство времени'
        }
      }
    ]
  },

  // ===== A1 LEVEL - MORPHOLOGY =====

  // A1 Morphology Lesson 1: Parts of Speech
  {
    id: 'a1_mor_1',
    level: 'A1',
    category: 'morphology',
    order: 7,
    title: {
      en: 'Parts of Speech in Kyrgyz',
      ru: 'Части речи в кыргызском языке'
    },
    description: {
      en: 'Understanding the main categories of words',
      ru: 'Понимание основных категорий слов'
    },
    theory: {
      en: `Kyrgyz has several main **parts of speech** (сөз түркүмдөрү):

**1. Nouns (Зат атооч)** - Name things
- People: адам (person), бала (child)
- Things: китеп (book), үй (house)
- Concepts: сүйүү (love), билим (knowledge)

**2. Verbs (Этиш)** - Express actions
- окуу (to read), жазуу (to write), жүрүү (to walk)

**3. Adjectives (Сын атооч)** - Describe nouns
- жакшы (good), чоң (big), кызыл (red)

**4. Pronouns (Ат атооч)** - Replace nouns
- мен (I), сен (you), ал (he/she/it)

**5. Numerals (Сан атооч)** - Numbers
- бир (one), эки (two), үч (three)

**6. Adverbs (Тактооч сөз)** - Describe verbs
- жакшы (well), тез (quickly), жай (slowly)

Understanding parts of speech helps you build correct sentences.`,
      ru: `В кыргызском языке есть несколько основных **частей речи** (сөз түркүмдөрү):

**1. Существительные (Зат атооч)** - Называют предметы
- Люди: адам (человек), бала (ребёнок)
- Вещи: китеп (книга), үй (дом)
- Понятия: сүйүү (любовь), билим (знание)

**2. Глаголы (Этиш)** - Выражают действия
- окуу (читать), жазуу (писать), жүрүү (ходить)

**3. Прилагательные (Сын атооч)** - Описывают существительные
- жакшы (хороший), чоң (большой), кызыл (красный)

**4. Местоимения (Ат атооч)** - Заменяют существительные
- мен (я), сен (ты), ал (он/она/оно)

**5. Числительные (Сан атооч)** - Числа
- бир (один), эки (два), үч (три)

**6. Наречия (Тактооч сөз)** - Описывают глаголы
- жакшы (хорошо), тез (быстро), жай (медленно)

Понимание частей речи помогает строить правильные предложения.`
    },
    examples: [
      {
        kyrgyz: 'Бала китепти жакшы окуйт.',
        translation: {
          en: 'The child reads the book well.',
          ru: 'Ребёнок хорошо читает книгу.'
        },
        explanation: {
          en: 'Бала (noun), китепти (noun+case), жакшы (adverb), окуйт (verb)',
          ru: 'Бала (сущ.), китепти (сущ.+падеж), жакшы (нареч.), окуйт (глагол)'
        }
      },
      {
        kyrgyz: 'Мен чоң үйдө жашайм.',
        translation: {
          en: 'I live in a big house.',
          ru: 'Я живу в большом доме.'
        },
        explanation: {
          en: 'Мен (pronoun), чоң (adjective), үйдө (noun+case), жашайм (verb)',
          ru: 'Мен (мест.), чоң (прил.), үйдө (сущ.+падеж), жашайм (глагол)'
        }
      }
    ],
    vocabulary: ['китеп', 'үй', 'бала', 'адам', 'окуу', 'жазуу', 'чоң', 'жакшы', 'мен', 'сен'],
    quiz: [
      {
        id: 'q1',
        question: {
          en: 'What part of speech is "китеп"?',
          ru: 'Какая часть речи "китеп"?'
        },
        options: {
          en: ['Noun', 'Verb', 'Adjective'],
          ru: ['Существительное', 'Глагол', 'Прилагательное']
        },
        correct: 0
      },
      {
        id: 'q2',
        question: {
          en: 'What part of speech is "окуу"?',
          ru: 'Какая часть речи "окуу"?'
        },
        options: {
          en: ['Noun', 'Verb', 'Pronoun'],
          ru: ['Существительное', 'Глагол', 'Местоимение']
        },
        correct: 1
      },
      {
        id: 'q3',
        question: {
          en: 'Which describes nouns?',
          ru: 'Что описывает существительные?'
        },
        options: {
          en: ['Verbs', 'Adjectives', 'Adverbs'],
          ru: ['Глаголы', 'Прилагательные', 'Наречия']
        },
        correct: 1
      }
    ]
  },

  // A1 Morphology Lesson 2: Nouns - Number (Singular/Plural)
  {
    id: 'a1_mor_2',
    level: 'A1',
    category: 'morphology',
    order: 8,
    title: {
      en: 'Nouns: Singular and Plural',
      ru: 'Существительные: единственное и множественное число'
    },
    description: {
      en: 'Learn how to form plural nouns in Kyrgyz',
      ru: 'Научитесь образовывать множественное число существительных'
    },
    theory: {
      en: `Kyrgyz nouns have **singular** and **plural** forms.

**Plural Formation:**
Add one of these suffixes: **-лар/-лер**, **-дар/-дер**, **-тар/-тер**

**Rules (depends on last sound):**

**1. After vowels or voiced consonants (л, м, н, ң, й, р, у, ж, з):**
→ Add **-лар** (back vowels) or **-лер** (front vowels)
- үй → үйлөр (houses)
- кол → колдор (hands)

**2. After voiced stops (б, г, д):**
→ Add **-дар/-дер**
- эшик → эшиктер (doors)

**3. After voiceless consonants (к, п, т, ч, с, ш):**
→ Add **-тар/-тер**
- китеп → китептер (books)
- мектеп → мектептер (schools)

**Vowel Harmony:**
- Back vowels (а, о, у, ы) → -лар, -дар, -тар
- Front vowels (э, ө, ү, и) → -лер, -дер, -тер`,
      ru: `Кыргызские существительные имеют формы **единственного** и **множественного** числа.

**Образование множественного числа:**
Добавьте один из суффиксов: **-лар/-лер**, **-дар/-дер**, **-тар/-тер**

**Правила (зависит от последнего звука):**

**1. После гласных или звонких согласных (л, м, н, ң, й, р, у, ж, з):**
→ Добавьте **-лар** (задние гласные) или **-лер** (передние гласные)
- үй → үйлөр (дома)
- кол → колдор (руки)

**2. После звонких смычных (б, г, д):**
→ Добавьте **-дар/-дер**
- эшик → эшиктер (двери)

**3. После глухих согласных (к, п, т, ч, с, ш):**
→ Добавьте **-тар/-тер**
- китеп → китептер (книги)
- мектеп → мектептер (школы)

**Гармония гласных:**
- Задние гласные (а, о, у, ы) → -лар, -дар, -тар
- Передние гласные (э, ө, ү, и) → -лер, -дер, -тер`
    },
    examples: [
      {
        kyrgyz: 'китеп → китептер',
        translation: {
          en: 'book → books',
          ru: 'книга → книги'
        },
        explanation: {
          en: 'After voiceless "п": add -тер',
          ru: 'После глухого "п": добавляем -тер'
        }
      },
      {
        kyrgyz: 'үй → үйлөр',
        translation: {
          en: 'house → houses',
          ru: 'дом → дома'
        },
        explanation: {
          en: 'After vowel "й": add -лөр (front vowel harmony)',
          ru: 'После гласного "й": добавляем -лөр (передняя гармония)'
        }
      },
      {
        kyrgyz: 'бала → балдар',
        translation: {
          en: 'child → children',
          ru: 'ребёнок → дети'
        },
        explanation: {
          en: 'After voiced "л": add -дар',
          ru: 'После звонкого "л": добавляем -дар'
        }
      }
    ],
    vocabulary: ['китеп', 'үй', 'бала', 'мектеп', 'адам', 'кол', 'эшик'],
    quiz: [
      {
        id: 'q1',
        question: {
          en: 'Form plural: мектеп',
          ru: 'Образуйте множественное число: мектеп'
        },
        options: {
          en: ['мектептер', 'мектеплер', 'мектепдер'],
          ru: ['мектептер', 'мектеплер', 'мектепдер']
        },
        correct: 0,
        explanation: {
          en: 'After voiceless "п": add -тер',
          ru: 'После глухого "п": добавляем -тер'
        }
      },
      {
        id: 'q2',
        question: {
          en: 'Form plural: адам',
          ru: 'Образуйте множественное число: адам'
        },
        options: {
          en: ['адамдар', 'адамтар', 'адамлар'],
          ru: ['адамдар', 'адамтар', 'адамлар']
        },
        correct: 2,
        explanation: {
          en: 'After voiced "м": add -лар',
          ru: 'После звонкого "м": добавляем -лар'
        }
      },
      {
        id: 'q3',
        question: {
          en: 'Which is correctly formed?',
          ru: 'Какое образовано правильно?'
        },
        options: {
          en: ['колтор', 'колдор', 'коллар'],
          ru: ['колтор', 'колдор', 'коллар']
        },
        correct: 1
      }
    ]
  },

  // A1 Morphology Lesson 3: Nominative Case
  {
    id: 'a1_mor_3',
    level: 'A1',
    category: 'morphology',
    order: 9,
    title: {
      en: 'Nominative Case (Basic Form)',
      ru: 'Именительный падеж (Атооч жөндөмө)'
    },
    description: {
      en: 'The basic dictionary form of nouns',
      ru: 'Основная словарная форма существительных'
    },
    theory: {
      en: `The **Nominative Case** (Атооч жөндөмө) is the basic, unchanged form of nouns.

**Key Features:**
- This is the dictionary form (what you find in vocabulary lists)
- No suffix added
- Used for subjects (who/what performs the action)
- Answers questions: **Ким?** (Who?) **Эмне?** (What?)

**Usage:**
- As the subject of a sentence
- In predicate after "to be" verbs
- In direct address

**Example:**
- Nominative: китеп (book)
- Subject: Китеп столдо. (The book is on the table.)

All other cases add suffixes to this base form.`,
      ru: `**Именительный падеж** (Атооч жөндөмө) — это основная, неизменённая форма существительных.

**Ключевые особенности:**
- Это словарная форма (та, что в словарях)
- Без суффикса
- Используется для подлежащего (кто/что выполняет действие)
- Отвечает на вопросы: **Ким?** (Кто?) **Эмне?** (Что?)

**Использование:**
- В качестве подлежащего в предложении
- В сказуемом после глаголов "быть"
- При обращении

**Пример:**
- Именительный: китеп (книга)
- Подлежащее: Китеп столдо. (Книга на столе.)

Все остальные падежи добавляют суффиксы к этой базовой форме.`
    },
    examples: [
      {
        kyrgyz: 'Бала окуйт.',
        translation: {
          en: 'The child reads.',
          ru: 'Ребёнок читает.'
        },
        explanation: {
          en: 'Бала (child) - Nominative, subject of the sentence',
          ru: 'Бала (ребёнок) - Именительный падеж, подлежащее'
        }
      },
      {
        kyrgyz: 'Ал мугалим.',
        translation: {
          en: 'He/She is a teacher.',
          ru: 'Он/Она учитель.'
        },
        explanation: {
          en: 'Мугалим (teacher) - Nominative, in predicate',
          ru: 'Мугалим (учитель) - Именительный падеж, в сказуемом'
        }
      }
    ],
    vocabulary: ['бала', 'мугалим', 'китеп', 'үй', 'адам'],
    quiz: [
      {
        id: 'q1',
        question: {
          en: 'What case answers "Ким? Эмне?"?',
          ru: 'Какой падеж отвечает на "Ким? Эмне?"?'
        },
        options: {
          en: ['Nominative', 'Accusative', 'Dative'],
          ru: ['Именительный', 'Винительный', 'Дательный']
        },
        correct: 0
      },
      {
        id: 'q2',
        question: {
          en: 'Does Nominative case add any suffix?',
          ru: 'Добавляет ли именительный падеж суффикс?'
        },
        options: {
          en: ['Yes', 'No', 'Sometimes'],
          ru: ['Да', 'Нет', 'Иногда']
        },
        correct: 1
      },
      {
        id: 'q3',
        question: {
          en: 'In "Китеп жакшы", what case is "китеп"?',
          ru: 'В "Китеп жакшы", какой падеж у "китеп"?'
        },
        options: {
          en: ['Nominative', 'Accusative', 'Locative'],
          ru: ['Именительный', 'Винительный', 'Местный']
        },
        correct: 0
      }
    ]
  },

  // A1 Morphology Lesson 4: Accusative Case
  {
    id: 'a1_mor_4',
    level: 'A1',
    category: 'morphology',
    order: 10,
    title: {
      en: 'Accusative Case (Direct Object)',
      ru: 'Винительный падеж (Табыш жөндөмө)'
    },
    description: {
      en: 'Marking direct objects in sentences',
      ru: 'Обозначение прямых дополнений в предложениях'
    },
    theory: {
      en: `The **Accusative Case** (Табыш жөндөмө) marks direct objects.

**Suffixes:** -ны/-ни, -ды/-ди, -ты/-ти (depends on last sound)

**Rules:**
1. After vowels: **-ны/-ни**
   - баланы (the child-ACC)
2. After voiced consonants (л,м,н,ң,р,й,ж,з): **-ды/-ди**
   - китепти (the book-ACC)
3. After voiceless (к,п,т,ч,с,ш): **-ты/-ти**
   - үйдү (the house-ACC)

**Vowel Harmony:**
- Back vowels → -ны, -ды, -ты
- Front vowels → -ни, -ди, -ти

**Usage:** Shows what receives the action directly
- Answers: **Кимди?** (Whom?) **Эмнени?** (What?)

**Example:** Мен китепти окуйм (I read the book)`,
      ru: `**Винительный падеж** (Табыш жөндөмө) обозначает прямые дополнения.

**Суффиксы:** -ны/-ни, -ды/-ди, -ты/-ти (зависит от последнего звука)

**Правила:**
1. После гласных: **-ны/-ни**
   - баланы (ребёнка-ВИН)
2. После звонких согласных (л,м,н,ң,р,й,ж,з): **-ды/-ди**
   - китепти (книгу-ВИН)
3. После глухих (к,п,т,ч,с,ш): **-ты/-ти**
   - үйдү (дом-ВИН)

**Гармония гласных:**
- Задние гласные → -ны, -ды, -ты
- Передние гласные → -ни, -ди, -ти

**Использование:** Показывает, что непосредственно получает действие
- Отвечает: **Кимди?** (Кого?) **Эмнени?** (Что?)

**Пример:** Мен китепти окуйм (Я читаю книгу)`
    },
    examples: [
      {
        kyrgyz: 'Мен китепти окуйм.',
        translation: {
          en: 'I read the book.',
          ru: 'Я читаю книгу.'
        },
        explanation: {
          en: 'китепти - Accusative (direct object of reading)',
          ru: 'китепти - Винительный падеж (прямое дополнение)'
        }
      },
      {
        kyrgyz: 'Биз баланы көрдүк.',
        translation: {
          en: 'We saw the child.',
          ru: 'Мы видели ребёнка.'
        },
        explanation: {
          en: 'баланы - Accusative (whom we saw)',
          ru: 'баланы - Винительный падеж (кого видели)'
        }
      },
      {
        kyrgyz: 'Ал сүттү ичет.',
        translation: {
          en: 'He/She drinks milk.',
          ru: 'Он/Она пьёт молоко.'
        },
        explanation: {
          en: 'сүттү - Accusative (what is being drunk)',
          ru: 'сүттү - Винительный падеж (что пьют)'
        }
      }
    ],
    vocabulary: ['китепти', 'баланы', 'сүттү', 'тамакты', 'досту'],
    quiz: [
      {
        id: 'q1',
        question: {
          en: 'Form Accusative: китеп',
          ru: 'Образуйте винительный падеж: китеп'
        },
        options: {
          en: ['китепти', 'китепге', 'китепте'],
          ru: ['китепти', 'китепге', 'китепте']
        },
        correct: 0
      },
      {
        id: 'q2',
        question: {
          en: 'What question does Accusative answer?',
          ru: 'На какой вопрос отвечает винительный падеж?'
        },
        options: {
          en: ['Кимди? Эмнени?', 'Кимге? Эмнеге?', 'Кайда?'],
          ru: ['Кимди? Эмнени?', 'Кимге? Эмнеге?', 'Кайда?']
        },
        correct: 0
      },
      {
        id: 'q3',
        question: {
          en: 'In "Ал тамакты жейт", identify the Accusative:',
          ru: 'В "Ал тамакты жейт", определите винительный падеж:'
        },
        options: {
          en: ['Ал', 'тамакты', 'жейт'],
          ru: ['Ал', 'тамакты', 'жейт']
        },
        correct: 1
      }
    ]
  },

  // A1 Morphology Lesson 5: Dative Case
  {
    id: 'a1_mor_5',
    level: 'A1',
    category: 'morphology',
    order: 11,
    title: {
      en: 'Dative Case (To/Toward)',
      ru: 'Дательный падеж (Барыш жөндөмө)'
    },
    description: {
      en: 'Expressing direction and indirect objects',
      ru: 'Выражение направления и косвенных дополнений'
    },
    theory: {
      en: `The **Dative Case** (Барыш жөндөмө) expresses direction "to/toward".

**Suffixes:** -га/-ге, -ка/-ке (depends on last sound)

**Rules:**
1. After vowels and voiced consonants: **-га/-ге**
   - үйгө (to home)
   - адамга (to person)
2. After voiceless consonants: **-ка/-ке**
   - китепке (to book)

**Vowel Harmony:**
- Back vowels → -га, -ка
- Front vowels → -ге, -ке

**Usage:**
- Direction/destination: "to", "toward"
- Indirect object: "to someone"
- Time: "by when"

**Questions:** **Кимге?** (To whom?) **Эмнеге?** (To what?) **Качан?** (When?)

**Example:** Мен үйгө барам (I go home)`,
      ru: `**Дательный падеж** (Барыш жөндөмө) выражает направление "к/к кому".

**Суффиксы:** -га/-ге, -ка/-ке (зависит от последнего звука)

**Правила:**
1. После гласных и звонких согласных: **-га/-ге**
   - үйгө (домой)
   - адамга (человеку)
2. После глухих согласных: **-ка/-ке**
   - китепке (к книге)

**Гармония гласных:**
- Задние гласные → -га, -ка
- Передние гласные → -ге, -ке

**Использование:**
- Направление/место назначения: "к", "в"
- Косвенное дополнение: "кому-то"
- Время: "к какому времени"

**Вопросы:** **Кимге?** (Кому?) **Эмнеге?** (К чему?) **Качан?** (Когда?)

**Пример:** Мен үйгө барам (Я иду домой)`
    },
    examples: [
      {
        kyrgyz: 'Мен мектепке барам.',
        translation: {
          en: 'I go to school.',
          ru: 'Я иду в школу.'
        },
        explanation: {
          en: 'мектепке - Dative (direction "to school")',
          ru: 'мектепке - Дательный падеж (направление "в школу")'
        }
      },
      {
        kyrgyz: 'Биз досубузга барабыз.',
        translation: {
          en: 'We go to our friend.',
          ru: 'Мы идём к нашему другу.'
        },
        explanation: {
          en: 'досубузга - Dative (direction "to friend")',
          ru: 'досубузга - Дательный падеж (направление "к другу")'
        }
      },
      {
        kyrgyz: 'Ал балага китеп берди.',
        translation: {
          en: 'He/She gave a book to the child.',
          ru: 'Он/Она дал книгу ребёнку.'
        },
        explanation: {
          en: 'балага - Dative (indirect object "to child")',
          ru: 'балага - Дательный падеж (косвенное дополнение "ребёнку")'
        }
      }
    ],
    vocabulary: ['мектепке', 'үйгө', 'досубузга', 'балага', 'дүкөнгө'],
    quiz: [
      {
        id: 'q1',
        question: {
          en: 'Form Dative: үй',
          ru: 'Образуйте дательный падеж: үй'
        },
        options: {
          en: ['үйгө', 'үйдө', 'үйдү'],
          ru: ['үйгө', 'үйдө', 'үйдү']
        },
        correct: 0
      },
      {
        id: 'q2',
        question: {
          en: 'What does Dative express?',
          ru: 'Что выражает дательный падеж?'
        },
        options: {
          en: ['Direction/To', 'Location/At', 'From'],
          ru: ['Направление/К', 'Местоположение/В', 'Откуда']
        },
        correct: 0
      },
      {
        id: 'q3',
        question: {
          en: 'Form Dative: мектеп',
          ru: 'Образуйте дательный падеж: мектеп'
        },
        options: {
          en: ['мектепте', 'мектепке', 'мектепти'],
          ru: ['мектепте', 'мектепке', 'мектепти']
        },
        correct: 1,
        explanation: {
          en: 'After voiceless "п": add -ке',
          ru: 'После глухого "п": добавляем -ке'
        }
      }
    ]
  },

  // A1 Morphology Lesson 6: Locative Case
  {
    id: 'a1_mor_6',
    level: 'A1',
    category: 'morphology',
    order: 12,
    title: {
      en: 'Locative Case (At/In)',
      ru: 'Местный падеж (Жатыш жөндөмө)'
    },
    description: {
      en: 'Expressing location where something is',
      ru: 'Выражение местонахождения'
    },
    theory: {
      en: `The **Locative Case** (Жатыш жөндөмө) expresses static location "at/in".

**Suffixes:** -да/-де, -та/-те (depends on last sound)

**Rules:**
1. After vowels and voiced consonants: **-да/-де**
   - үйдө (at home)
   - столдо (on table)
2. After voiceless consonants: **-та/-те**
   - мектепте (at school)

**Vowel Harmony:**
- Back vowels → -да, -та
- Front vowels → -де, -те

**Usage:**
- Static location: "at", "in", "on"
- Time when: "in January", "on Monday"

**Questions:** **Кайда?** (Where?) **Качан?** (When?)

**Key Difference from Dative:**
- Dative = motion TO (үйгө барам - I go home)
- Locative = static AT (үйдө жашайм - I live at home)`,
      ru: `**Местный падеж** (Жатыш жөндөмө) выражает статичное местоположение "в/на".

**Суффиксы:** -да/-де, -та/-те (зависит от последнего звука)

**Правила:**
1. После гласных и звонких согласных: **-да/-де**
   - үйдө (дома)
   - столдо (на столе)
2. После глухих согласных: **-та/-те**
   - мектепте (в школе)

**Гармония гласных:**
- Задние гласные → -да, -та
- Передние гласные → -де, -те

**Использование:**
- Статичное местоположение: "в", "на", "у"
- Время когда: "в январе", "в понедельник"

**Вопросы:** **Кайда?** (Где?) **Качан?** (Когда?)

**Ключевое отличие от дательного:**
- Дательный = движение К (үйгө барам - иду домой)
- Местный = статично ГДЕ (үйдө жашайм - живу дома)`
    },
    examples: [
      {
        kyrgyz: 'Мен үйдөмүн.',
        translation: {
          en: 'I am at home.',
          ru: 'Я дома.'
        },
        explanation: {
          en: 'үйдө - Locative (static location)',
          ru: 'үйдө - Местный падеж (статичное местоположение)'
        }
      },
      {
        kyrgyz: 'Китеп столдо.',
        translation: {
          en: 'The book is on the table.',
          ru: 'Книга на столе.'
        },
        explanation: {
          en: 'столдо - Locative (where book is)',
          ru: 'столдо - Местный падеж (где книга)'
        }
      },
      {
        kyrgyz: 'Биз мектепте окуйбуз.',
        translation: {
          en: 'We study at school.',
          ru: 'Мы учимся в школе.'
        },
        explanation: {
          en: 'мектепте - Locative (where we study)',
          ru: 'мектепте - Местный падеж (где учимся)'
        }
      }
    ],
    vocabulary: ['үйдө', 'столдо', 'мектепте', 'дүкөндө', 'бакта'],
    quiz: [
      {
        id: 'q1',
        question: {
          en: 'Form Locative: үй',
          ru: 'Образуйте местный падеж: үй'
        },
        options: {
          en: ['үйдө', 'үйгө', 'үйдөн'],
          ru: ['үйдө', 'үйгө', 'үйдөн']
        },
        correct: 0
      },
      {
        id: 'q2',
        question: {
          en: 'What question does Locative answer?',
          ru: 'На какой вопрос отвечает местный падеж?'
        },
        options: {
          en: ['Кайда?', 'Кайдан?', 'Кайда?'],
          ru: ['Кайда? (Где?)', 'Кайдан? (Откуда?)', 'Качан?']
        },
        correct: 0
      },
      {
        id: 'q3',
        question: {
          en: 'Choose correct: "The book is __ school"',
          ru: 'Выберите правильное: "Книга __ школе"'
        },
        options: {
          en: ['мектепке', 'мектепте', 'мектептен'],
          ru: ['мектепке', 'мектепте', 'мектептен']
        },
        correct: 1
      }
    ]
  },

  // A1 Morphology Lesson 7: Ablative Case
  {
    id: 'a1_mor_7',
    level: 'A1',
    category: 'morphology',
    order: 13,
    title: {
      en: 'Ablative Case (From)',
      ru: 'Исходный падеж (Чыгыш жөндөмө)'
    },
    description: {
      en: 'Expressing origin and source',
      ru: 'Выражение происхождения и источника'
    },
    theory: {
      en: `The **Ablative Case** (Чыгыш жөндөмө) expresses origin "from".

**Suffixes:** -дан/-ден, -тан/-тен, -нан/-нен

**Rules:**
1. After voiced consonants: **-дан/-ден**
   - үйдөн (from home)
2. After voiceless consonants: **-тан/-тен**
   - мектептен (from school)
3. After vowels: **-нан/-нен**
   - баланан (from child)

**Vowel Harmony:**
- Back vowels → -дан, -тан, -нан
- Front vowels → -ден, -тен, -нен

**Usage:**
- Origin: "from" (place/person)
- Starting point
- Reason: "because of", "due to"
- Comparison: "than"

**Questions:** **Кайдан?** (From where?) **Кимден?** (From whom?)

**Example:** Мен Бишкектен келдим (I came from Bishkek)`,
      ru: `**Исходный падеж** (Чыгыш жөндөмө) выражает происхождение "откуда/от".

**Суффиксы:** -дан/-ден, -тан/-тен, -нан/-нен

**Правила:**
1. После звонких согласных: **-дан/-ден**
   - үйдөн (из дома)
2. После глухих согласных: **-тан/-тен**
   - мектептен (из школы)
3. После гласных: **-нан/-нен**
   - баланан (от ребёнка)

**Гармония гласных:**
- Задние гласные → -дан, -тан, -нан
- Передние гласные → -ден, -тен, -нен

**Использование:**
- Происхождение: "из/от" (место/человек)
- Начальная точка
- Причина: "из-за", "по причине"
- Сравнение: "чем"

**Вопросы:** **Кайдан?** (Откуда?) **Кимден?** (От кого?)

**Пример:** Мен Бишкектен келдим (Я приехал из Бишкека)`
    },
    examples: [
      {
        kyrgyz: 'Мен үйдөн чыктым.',
        translation: {
          en: 'I left from home.',
          ru: 'Я вышел из дома.'
        },
        explanation: {
          en: 'үйдөн - Ablative (from home)',
          ru: 'үйдөн - Исходный падеж (из дома)'
        }
      },
      {
        kyrgyz: 'Ал мектептен келди.',
        translation: {
          en: 'He/She came from school.',
          ru: 'Он/Она пришёл из школы.'
        },
        explanation: {
          en: 'мектептен - Ablative (from school)',
          ru: 'мектептен - Исходный падеж (из школы)'
        }
      },
      {
        kyrgyz: 'Биз досубуздан угдук.',
        translation: {
          en: 'We heard from our friend.',
          ru: 'Мы узнали от нашего друга.'
        },
        explanation: {
          en: 'досубуздан - Ablative (from friend)',
          ru: 'досубуздан - Исходный падеж (от друга)'
        }
      }
    ],
    vocabulary: ['үйдөн', 'мектептен', 'досубуздан', 'дүкөндөн', 'Бишкектен'],
    quiz: [
      {
        id: 'q1',
        question: {
          en: 'Form Ablative: үй',
          ru: 'Образуйте исходный падеж: үй'
        },
        options: {
          en: ['үйдөн', 'үйдө', 'үйгө'],
          ru: ['үйдөн', 'үйдө', 'үйгө']
        },
        correct: 0
      },
      {
        id: 'q2',
        question: {
          en: 'What does Ablative express?',
          ru: 'Что выражает исходный падеж?'
        },
        options: {
          en: ['Origin/From', 'Direction/To', 'Location/At'],
          ru: ['Происхождение/Откуда', 'Направление/Куда', 'Место/Где']
        },
        correct: 0
      },
      {
        id: 'q3',
        question: {
          en: 'Form Ablative: мектеп',
          ru: 'Образуйте исходный падеж: мектеп'
        },
        options: {
          en: ['мектептен', 'мектепте', 'мектепке'],
          ru: ['мектептен', 'мектепте', 'мектепке']
        },
        correct: 0,
        explanation: {
          en: 'After voiceless "п": add -тен',
          ru: 'После глухого "п": добавляем -тен'
        }
      }
    ]
  },

  // A1 Morphology Lesson 8: Personal Pronouns
  {
    id: 'a1_mor_8',
    level: 'A1',
    category: 'morphology',
    order: 14,
    title: {
      en: 'Personal Pronouns',
      ru: 'Личные местоимения'
    },
    description: {
      en: 'I, you, he/she, we, you (plural), they',
      ru: 'Я, ты, он/она, мы, вы, они'
    },
    theory: {
      en: `**Personal Pronouns** (Жактык ат атоочтор) replace names of people.

**Singular:**
- **мен** - I
- **сен** - you (informal, singular)
- **сиз** - you (formal, singular)
- **ал** - he/she/it

**Plural:**
- **биз** - we
- **силер** - you (informal, plural)
- **сиздер** - you (formal, plural)
- **алар** - they

**Usage Notes:**
- **сен** vs **сиз**: Use сиз for older people, strangers, formal situations
- **ал** is gender-neutral (no separate he/she/it)
- Pronouns follow same case rules as nouns

**Case Examples with "мен":**
- Nominative: мен (I)
- Accusative: мени (me)
- Dative: мага (to me)
- Locative: менде (at my place)
- Ablative: менден (from me)`,
      ru: `**Личные местоимения** (Жактык ат атоочтор) заменяют имена людей.

**Единственное число:**
- **мен** - я
- **сен** - ты (неформальное)
- **сиз** - Вы (формальное)
- **ал** - он/она/оно

**Множественное число:**
- **биз** - мы
- **силер** - вы (неформальное)
- **сиздер** - Вы (формальное)
- **алар** - они

**Примечания по использованию:**
- **сен** vs **сиз**: Используйте сиз для старших, незнакомых людей, формальных ситуаций
- **ал** не имеет грамматического рода
- Местоимения следуют тем же падежным правилам, что и существительные

**Примеры падежей с "мен":**
- Именительный: мен (я)
- Винительный: мени (меня)
- Дательный: мага (мне)
- Местный: менде (у меня)
- Исходный: менден (от меня)`
    },
    examples: [
      {
        kyrgyz: 'Мен окуйм. Сен окуйсуң.',
        translation: {
          en: 'I read. You read.',
          ru: 'Я читаю. Ты читаешь.'
        },
        explanation: {
          en: 'мен (I), сен (you) - Nominative forms',
          ru: 'мен (я), сен (ты) - именительные формы'
        }
      },
      {
        kyrgyz: 'Биз аны көрдүк.',
        translation: {
          en: 'We saw him/her.',
          ru: 'Мы видели его/её.'
        },
        explanation: {
          en: 'биз (we-NOM), аны (him/her-ACC)',
          ru: 'биз (мы-ИМ), аны (его/её-ВИН)'
        }
      },
      {
        kyrgyz: 'Ал мага китеп берди.',
        translation: {
          en: 'He/She gave me a book.',
          ru: 'Он/Она дал мне книгу.'
        },
        explanation: {
          en: 'мага (to me - Dative)',
          ru: 'мага (мне - Дательный)'
        }
      }
    ],
    vocabulary: ['мен', 'сен', 'сиз', 'ал', 'биз', 'силер', 'алар', 'мени', 'мага', 'менде'],
    quiz: [
      {
        id: 'q1',
        question: {
          en: 'What is "we" in Kyrgyz?',
          ru: 'Как будет "мы" по-кыргызски?'
        },
        options: {
          en: ['биз', 'силер', 'алар'],
          ru: ['биз', 'силер', 'алар']
        },
        correct: 0
      },
      {
        id: 'q2',
        question: {
          en: 'Which is formal "you"?',
          ru: 'Какое формальное "Вы"?'
        },
        options: {
          en: ['сен', 'сиз', 'силер'],
          ru: ['сен', 'сиз', 'силер']
        },
        correct: 1
      },
      {
        id: 'q3',
        question: {
          en: 'Does "ал" specify gender?',
          ru: 'Указывает ли "ал" на грамматический род?'
        },
        options: {
          en: ['Yes, it means only "he"', 'No, it can mean he/she/it', 'It means only animals'],
          ru: ['Да, только "он"', 'Нет, может быть он/она/оно', 'Только для животных']
        },
        correct: 1
      }
    ]
  }

  // Total A1 lessons: 14 (6 syntax + 8 morphology) ✓
  // Next: Create A1 Final Test with 30-35 questions
]

export function getLessonsByLevel(level: Level): GrammarLesson[] {
  return COMPREHENSIVE_GRAMMAR_LESSONS.filter(lesson => lesson.level === level)
}

export function getLessonById(id: string): GrammarLesson | undefined {
  return COMPREHENSIVE_GRAMMAR_LESSONS.find(lesson => lesson.id === id)
}

export function getSyntaxLessons(level: Level): GrammarLesson[] {
  return COMPREHENSIVE_GRAMMAR_LESSONS.filter(
    lesson => lesson.level === level && lesson.category === 'syntax'
  )
}

export function getMorphologyLessons(level: Level): GrammarLesson[] {
  return COMPREHENSIVE_GRAMMAR_LESSONS.filter(
    lesson => lesson.level === level && lesson.category === 'morphology'
  )
}

export function getFinalTest(level: Level): GrammarLesson | undefined {
  return COMPREHENSIVE_GRAMMAR_LESSONS.find(
    lesson => lesson.level === level && lesson.category === 'final_test'
  )
}
