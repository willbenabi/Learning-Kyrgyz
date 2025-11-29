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
  },

  // ===== A1 LEVEL - FINAL TEST =====
  {
    id: 'a1_final_test',
    level: 'A1',
    category: 'final_test',
    order: 15,
    title: {
      en: 'A1 Level Final Test',
      ru: 'Финальный тест уровня A1'
    },
    description: {
      en: 'Comprehensive test covering all A1 grammar topics',
      ru: 'Комплексный тест по всем темам грамматики уровня A1'
    },
    theory: {
      en: `This final test covers all topics from A1 level:

**Syntax (6 topics):**
- Sentence and phrase concepts
- Subjects (Who? What?)
- Predicates (What does it do?)
- Word order (SOV pattern)
- Types of sentences
- Secondary parts of sentence

**Morphology (8 topics):**
- Parts of speech
- Singular and plural formation
- Nominative case (basic form)
- Accusative case (direct object)
- Dative case (to/toward)
- Locative case (at/in)
- Ablative case (from)
- Personal pronouns

Complete all 35 questions to demonstrate your A1 level mastery of Kyrgyz grammar.`,
      ru: `Этот финальный тест охватывает все темы уровня A1:

**Синтаксис (6 тем):**
- Понятие о предложении и словосочетании
- Подлежащее (Кто? Что?)
- Сказуемое (Что делает?)
- Порядок слов (модель SOV)
- Типы предложений
- Второстепенные члены предложения

**Морфология (8 тем):**
- Части речи
- Образование единственного и множественного числа
- Именительный падеж (основная форма)
- Винительный падеж (прямое дополнение)
- Дательный падеж (к/кому)
- Местный падеж (в/на)
- Исходный падеж (из/от)
- Личные местоимения

Ответьте на все 35 вопросов, чтобы продемонстрировать владение кыргызской грамматикой на уровне A1.`
    },
    examples: [],
    quiz: [
      // Syntax Questions (15 questions)
      {
        id: 'q1',
        question: {
          en: 'Which of the following is a complete sentence?',
          ru: 'Какое из следующих является полным предложением?'
        },
        options: {
          en: ['жаңы китеп', 'Бала окуйт', 'чоң үй', 'кызыл алма'],
          ru: ['жаңы китеп', 'Бала окуйт', 'чоң үй', 'кызыл алма']
        },
        correct: 1,
        explanation: {
          en: '"Бала окуйт" is a complete sentence with subject and predicate. Others are just phrases.',
          ru: '"Бала окуйт" - полное предложение с подлежащим и сказуемым. Остальные - словосочетания.'
        }
      },
      {
        id: 'q2',
        question: {
          en: 'What is the subject in: "Китеп столдо жатат"?',
          ru: 'Что является подлежащим в: "Китеп столдо жатат"?'
        },
        options: {
          en: ['Китеп', 'столдо', 'жатат', 'no subject'],
          ru: ['Китеп', 'столдо', 'жатат', 'нет подлежащего']
        },
        correct: 0,
        explanation: {
          en: 'Китеп (book) is the subject - answers "What?"',
          ru: 'Китеп (книга) - подлежащее, отвечает на "Что?"'
        }
      },
      {
        id: 'q3',
        question: {
          en: 'Identify the predicate in: "Мен мектепте окуйм"',
          ru: 'Определите сказуемое в: "Мен мектепте окуйм"'
        },
        options: {
          en: ['Мен', 'мектепте', 'окуйм', 'no predicate'],
          ru: ['Мен', 'мектепте', 'окуйм', 'нет сказуемого']
        },
        correct: 2,
        explanation: {
          en: 'окуйм (I study) is the predicate - verb at the end',
          ru: 'окуйм (учусь) - сказуемое, глагол в конце'
        }
      },
      {
        id: 'q4',
        question: {
          en: 'Arrange in correct Kyrgyz word order: келди / досум / кечээ',
          ru: 'Расположите в правильном порядке слов: келди / досум / кечээ'
        },
        options: {
          en: ['Досум кечээ келди', 'келди досум кечээ', 'кечээ келди досум', 'Досум келди кечээ'],
          ru: ['Досум кечээ келди', 'келди досум кечээ', 'кечээ келди досум', 'Досум келди кечээ']
        },
        correct: 0,
        explanation: {
          en: 'Subject (досум) → Time (кечээ) → Verb (келди) follows SOV pattern',
          ru: 'Подлежащее (досум) → Время (кечээ) → Глагол (келди) следует схеме SOV'
        }
      },
      {
        id: 'q5',
        question: {
          en: 'Where must the verb be in Kyrgyz sentences?',
          ru: 'Где должен стоять глагол в кыргызских предложениях?'
        },
        options: {
          en: ['At the beginning', 'In the middle', 'At the end', 'Anywhere'],
          ru: ['В начале', 'В середине', 'В конце', 'Где угодно']
        },
        correct: 2,
        explanation: {
          en: 'Kyrgyz follows SOV order - verb ALWAYS at the end',
          ru: 'Кыргызский следует порядку SOV - глагол ВСЕГДА в конце'
        }
      },
      {
        id: 'q6',
        question: {
          en: 'What type of sentence is "Сен кимсиң?"',
          ru: 'Какой тип предложения "Сен кимсиң?"'
        },
        options: {
          en: ['Declarative', 'Interrogative', 'Exclamatory', 'Imperative'],
          ru: ['Повествовательное', 'Вопросительное', 'Восклицательное', 'Побудительное']
        },
        correct: 1,
        explanation: {
          en: 'Interrogative - asks "Who are you?"',
          ru: 'Вопросительное - спрашивает "Кто ты?"'
        }
      },
      {
        id: 'q7',
        question: {
          en: 'Identify the sentence type: "Кандай сулуу!"',
          ru: 'Определите тип предложения: "Кандай сулуу!"'
        },
        options: {
          en: ['Declarative', 'Interrogative', 'Exclamatory', 'Imperative'],
          ru: ['Повествовательное', 'Вопросительное', 'Восклицательное', 'Побудительное']
        },
        correct: 2,
        explanation: {
          en: 'Exclamatory - expresses emotion "How beautiful!"',
          ru: 'Восклицательное - выражает эмоцию "Как красиво!"'
        }
      },
      {
        id: 'q8',
        question: {
          en: 'In "Мен жаңы китепти окуйм", what is "жаңы"?',
          ru: 'В "Мен жаңы китепти окуйм", что такое "жаңы"?'
        },
        options: {
          en: ['Subject', 'Object', 'Attribute', 'Predicate'],
          ru: ['Подлежащее', 'Дополнение', 'Определение', 'Сказуемое']
        },
        correct: 2,
        explanation: {
          en: 'жаңы (new) is an attribute - describes the noun китеп',
          ru: 'жаңы (новый) - определение, описывает существительное китеп'
        }
      },
      {
        id: 'q9',
        question: {
          en: 'Find the object in: "Биз досубузду көрдүк"',
          ru: 'Найдите дополнение в: "Биз досубузду көрдүк"'
        },
        options: {
          en: ['Биз', 'досубузду', 'көрдүк', 'no object'],
          ru: ['Биз', 'досубузду', 'көрдүк', 'нет дополнения']
        },
        correct: 1,
        explanation: {
          en: 'досубузду (our friend-ACC) is the object - answers "Whom?"',
          ru: 'досубузду (нашего друга) - дополнение, отвечает на "Кого?"'
        }
      },
      {
        id: 'q10',
        question: {
          en: 'In "Ал эртең келет", what is "эртең"?',
          ru: 'В "Ал эртең келет", что такое "эртең"?'
        },
        options: {
          en: ['Subject', 'Object', 'Adverbial modifier', 'Predicate'],
          ru: ['Подлежащее', 'Дополнение', 'Обстоятельство', 'Сказуемое']
        },
        correct: 2,
        explanation: {
          en: 'эртең (tomorrow) is adverbial - answers "When?"',
          ru: 'эртең (завтра) - обстоятельство, отвечает на "Когда?"'
        }
      },
      {
        id: 'q11',
        question: {
          en: 'What element is missing in "жакшы дос"?',
          ru: 'Какой элемент отсутствует в "жакшы дос"?'
        },
        options: {
          en: ['Subject', 'Predicate', 'Object', 'Nothing - complete'],
          ru: ['Подлежащее', 'Сказуемое', 'Дополнение', 'Ничего - полное']
        },
        correct: 1,
        explanation: {
          en: 'No predicate - this is a phrase, not a sentence',
          ru: 'Нет сказуемого - это словосочетание, а не предложение'
        }
      },
      {
        id: 'q12',
        question: {
          en: 'Fix word order: окуйм / китептерди / мен',
          ru: 'Исправьте порядок слов: окуйм / китептерди / мен'
        },
        options: {
          en: ['Мен китептерди окуйм', 'Окуйм мен китептерди', 'Китептерди мен окуйм', 'Мен окуйм китептерди'],
          ru: ['Мен китептерди окуйм', 'Окуйм мен китептерди', 'Китептерди мен окуйм', 'Мен окуйм китептерди']
        },
        correct: 0,
        explanation: {
          en: 'Correct SOV: Subject (Мен) → Object (китептерди) → Verb (окуйм)',
          ru: 'Правильный SOV: Подлежащее (Мен) → Дополнение (китептерди) → Глагол (окуйм)'
        }
      },
      {
        id: 'q13',
        question: {
          en: 'Which shows static location?',
          ru: 'Что показывает статичное местоположение?'
        },
        options: {
          en: ['Мен үйгө барам', 'Мен үйдөмүн', 'Мен үйдөн чыктым', 'Мен үйдү көрдүм'],
          ru: ['Мен үйгө барам', 'Мен үйдөмүн', 'Мен үйдөн чыктым', 'Мен үйдү көрдүм']
        },
        correct: 1,
        explanation: {
          en: 'үйдөмүн (at home) - Locative case shows static location',
          ru: 'үйдөмүн (дома) - Местный падеж показывает статичное местоположение'
        }
      },
      {
        id: 'q14',
        question: {
          en: 'In "Кел!", what type is this sentence?',
          ru: 'В "Кел!", какой тип предложения?'
        },
        options: {
          en: ['Declarative', 'Interrogative', 'Exclamatory', 'Imperative'],
          ru: ['Повествовательное', 'Вопросительное', 'Восклицательное', 'Побудительное']
        },
        correct: 3,
        explanation: {
          en: 'Imperative - gives command "Come!"',
          ru: 'Побудительное - даёт команду "Приди!"'
        }
      },
      {
        id: 'q15',
        question: {
          en: 'Find adverbial: "Мен бүгүн мектепте окуйм"',
          ru: 'Найдите обстоятельство: "Мен бүгүн мектепте окуйм"'
        },
        options: {
          en: ['Only бүгүн', 'Only мектепте', 'Both бүгүн and мектепте', 'None'],
          ru: ['Только бүгүн', 'Только мектепте', 'И бүгүн и мектепте', 'Нет']
        },
        correct: 2,
        explanation: {
          en: 'Both бүгүн (when?) and мектепте (where?) are adverbials',
          ru: 'И бүгүн (когда?) и мектепте (где?) являются обстоятельствами'
        }
      },

      // Morphology Questions (20 questions)
      {
        id: 'q16',
        question: {
          en: 'What part of speech is "окуу"?',
          ru: 'Какая часть речи "окуу"?'
        },
        options: {
          en: ['Noun', 'Verb', 'Adjective', 'Adverb'],
          ru: ['Существительное', 'Глагол', 'Прилагательное', 'Наречие']
        },
        correct: 1,
        explanation: {
          en: 'окуу is a verb - "to read/study"',
          ru: 'окуу - глагол - "читать/учиться"'
        }
      },
      {
        id: 'q17',
        question: {
          en: 'Form plural: китеп',
          ru: 'Образуйте множественное число: китеп'
        },
        options: {
          en: ['китептер', 'китеплер', 'китепдер', 'китеплар'],
          ru: ['китептер', 'китеплер', 'китепдер', 'китеплар']
        },
        correct: 0,
        explanation: {
          en: 'After voiceless "п": add -тер (front vowel harmony)',
          ru: 'После глухого "п": добавляем -тер (передняя гармония)'
        }
      },
      {
        id: 'q18',
        question: {
          en: 'Form plural: үй',
          ru: 'Образуйте множественное число: үй'
        },
        options: {
          en: ['үйлөр', 'үйдөр', 'үйтөр', 'үйлер'],
          ru: ['үйлөр', 'үйдөр', 'үйтөр', 'үйлер']
        },
        correct: 0,
        explanation: {
          en: 'After vowel "й": add -лөр (front vowel harmony)',
          ru: 'После гласного "й": добавляем -лөр (передняя гармония)'
        }
      },
      {
        id: 'q19',
        question: {
          en: 'Which case answers "Ким? Эмне?"?',
          ru: 'Какой падеж отвечает на "Ким? Эмне?"?'
        },
        options: {
          en: ['Nominative', 'Accusative', 'Dative', 'Locative'],
          ru: ['Именительный', 'Винительный', 'Дательный', 'Местный']
        },
        correct: 0,
        explanation: {
          en: 'Nominative case answers "Who? What?"',
          ru: 'Именительный падеж отвечает на "Кто? Что?"'
        }
      },
      {
        id: 'q20',
        question: {
          en: 'Form Accusative: бала',
          ru: 'Образуйте винительный падеж: бала'
        },
        options: {
          en: ['баланы', 'балага', 'балада', 'баланан'],
          ru: ['баланы', 'балага', 'балада', 'баланан']
        },
        correct: 0,
        explanation: {
          en: 'After vowel "а": add -ны (back vowel harmony)',
          ru: 'После гласной "а": добавляем -ны (задняя гармония)'
        }
      },
      {
        id: 'q21',
        question: {
          en: 'What does Accusative case mark?',
          ru: 'Что обозначает винительный падеж?'
        },
        options: {
          en: ['Subject', 'Direct object', 'Location', 'Origin'],
          ru: ['Подлежащее', 'Прямое дополнение', 'Место', 'Происхождение']
        },
        correct: 1,
        explanation: {
          en: 'Accusative marks direct objects (Кимди? Эмнени?)',
          ru: 'Винительный падеж обозначает прямые дополнения (Кого? Что?)'
        }
      },
      {
        id: 'q22',
        question: {
          en: 'Form Dative: мектеп',
          ru: 'Образуйте дательный падеж: мектеп'
        },
        options: {
          en: ['мектепке', 'мектепте', 'мектепти', 'мектептен'],
          ru: ['мектепке', 'мектепте', 'мектепти', 'мектептен']
        },
        correct: 0,
        explanation: {
          en: 'After voiceless "п": add -ке',
          ru: 'После глухого "п": добавляем -ке'
        }
      },
      {
        id: 'q23',
        question: {
          en: 'What does Dative case express?',
          ru: 'Что выражает дательный падеж?'
        },
        options: {
          en: ['Static location', 'Direction/To', 'Origin/From', 'Direct object'],
          ru: ['Статичное место', 'Направление/К', 'Происхождение/От', 'Прямое дополнение']
        },
        correct: 1,
        explanation: {
          en: 'Dative expresses direction "to/toward" (Кимге? Эмнеге?)',
          ru: 'Дательный выражает направление "к/кому" (Кому? К чему?)'
        }
      },
      {
        id: 'q24',
        question: {
          en: 'Form Locative: үй',
          ru: 'Образуйте местный падеж: үй'
        },
        options: {
          en: ['үйдө', 'үйгө', 'үйдү', 'үйдөн'],
          ru: ['үйдө', 'үйгө', 'үйдү', 'үйдөн']
        },
        correct: 0,
        explanation: {
          en: 'After voiced "й": add -дө',
          ru: 'После звонкого "й": добавляем -дө'
        }
      },
      {
        id: 'q25',
        question: {
          en: 'Choose correct: "I am __ school"',
          ru: 'Выберите правильное: "Я __ школе"'
        },
        options: {
          en: ['мектепке', 'мектепте', 'мектептен', 'мектепти'],
          ru: ['мектепке', 'мектепте', 'мектептен', 'мектепти']
        },
        correct: 1,
        explanation: {
          en: 'Locative -те for static location "at school"',
          ru: 'Местный падеж -те для статичного места "в школе"'
        }
      },
      {
        id: 'q26',
        question: {
          en: 'Form Ablative: үй',
          ru: 'Образуйте исходный падеж: үй'
        },
        options: {
          en: ['үйдөн', 'үйдө', 'үйгө', 'үйдү'],
          ru: ['үйдөн', 'үйдө', 'үйгө', 'үйдү']
        },
        correct: 0,
        explanation: {
          en: 'After voiced "й": add -дөн',
          ru: 'После звонкого "й": добавляем -дөн'
        }
      },
      {
        id: 'q27',
        question: {
          en: 'What does Ablative express?',
          ru: 'Что выражает исходный падеж?'
        },
        options: {
          en: ['Direction to', 'Static location', 'Origin/From', 'Direct object'],
          ru: ['Направление к', 'Статичное место', 'Происхождение/Откуда', 'Прямое дополнение']
        },
        correct: 2,
        explanation: {
          en: 'Ablative expresses origin "from" (Кайдан? Кимден?)',
          ru: 'Исходный выражает происхождение "откуда/от" (Откуда? От кого?)'
        }
      },
      {
        id: 'q28',
        question: {
          en: 'What is "we" in Kyrgyz?',
          ru: 'Как будет "мы" по-кыргызски?'
        },
        options: {
          en: ['мен', 'сен', 'биз', 'силер'],
          ru: ['мен', 'сен', 'биз', 'силер']
        },
        correct: 2,
        explanation: {
          en: 'биз = we',
          ru: 'биз = мы'
        }
      },
      {
        id: 'q29',
        question: {
          en: 'Which is formal "you" (singular)?',
          ru: 'Какое формальное "Вы" (единственное число)?'
        },
        options: {
          en: ['сен', 'сиз', 'силер', 'сиздер'],
          ru: ['сен', 'сиз', 'силер', 'сиздер']
        },
        correct: 1,
        explanation: {
          en: 'сиз = formal you (singular)',
          ru: 'сиз = формальное Вы (единственное число)'
        }
      },
      {
        id: 'q30',
        question: {
          en: 'Does "ал" specify gender?',
          ru: 'Указывает ли "ал" на род?'
        },
        options: {
          en: ['Yes, only masculine', 'Yes, only feminine', 'No, gender-neutral', 'Only for animals'],
          ru: ['Да, только мужской', 'Да, только женский', 'Нет, без рода', 'Только для животных']
        },
        correct: 2,
        explanation: {
          en: 'ал is gender-neutral - can mean he/she/it',
          ru: 'ал не имеет рода - может означать он/она/оно'
        }
      },
      {
        id: 'q31',
        question: {
          en: 'Form plural: адам',
          ru: 'Образуйте множественное число: адам'
        },
        options: {
          en: ['адамлар', 'адамдар', 'адамтар', 'адамлер'],
          ru: ['адамлар', 'адамдар', 'адамтар', 'адамлер']
        },
        correct: 0,
        explanation: {
          en: 'After voiced "м": add -лар',
          ru: 'После звонкого "м": добавляем -лар'
        }
      },
      {
        id: 'q32',
        question: {
          en: 'Choose direction: "I go __ home"',
          ru: 'Выберите направление: "Я иду __ домой"'
        },
        options: {
          en: ['үйдө', 'үйгө', 'үйдөн', 'үйдү'],
          ru: ['үйдө', 'үйгө', 'үйдөн', 'үйдү']
        },
        correct: 1,
        explanation: {
          en: 'Dative -гө for direction "to home"',
          ru: 'Дательный -гө для направления "домой"'
        }
      },
      {
        id: 'q33',
        question: {
          en: 'What part of speech is "жакшы"?',
          ru: 'Какая часть речи "жакшы"?'
        },
        options: {
          en: ['Noun', 'Verb', 'Adjective', 'Pronoun'],
          ru: ['Существительное', 'Глагол', 'Прилагательное', 'Местоимение']
        },
        correct: 2,
        explanation: {
          en: 'жакшы is an adjective - "good"',
          ru: 'жакшы - прилагательное - "хороший"'
        }
      },
      {
        id: 'q34',
        question: {
          en: 'Form Ablative: мектеп',
          ru: 'Образуйте исходный падеж: мектеп'
        },
        options: {
          en: ['мектептен', 'мектепте', 'мектепке', 'мектепти'],
          ru: ['мектептен', 'мектепте', 'мектепке', 'мектепти']
        },
        correct: 0,
        explanation: {
          en: 'After voiceless "п": add -тен',
          ru: 'После глухого "п": добавляем -тен'
        }
      },
      {
        id: 'q35',
        question: {
          en: 'Complete the case series for "дос" (friend): дос → досту → ___',
          ru: 'Завершите падежный ряд для "дос" (друг): дос → досту → ___'
        },
        options: {
          en: ['досто (Locative)', 'доско (Dative)', 'досдо (Locative)', 'достон (Ablative)'],
          ru: ['досто (Местный)', 'доско (Дательный)', 'досдо (Местный)', 'достон (Исходный)']
        },
        correct: 2,
        explanation: {
          en: 'After voiced "с": Locative uses -до → досдо',
          ru: 'После звонкого "с": Местный падеж использует -до → досдо'
        }
      }
    ]
  },

  // ===== A2 LEVEL - SYNTAX LESSONS =====
  {
    id: 'a2_syntax_01',
    level: 'A2',
    category: 'syntax',
    order: 1,
    title: {
      en: 'Complex Sentences with Conjunctions',
      ru: 'Сложные предложения с союзами'
    },
    description: {
      en: 'Learn to connect simple sentences using Kyrgyz conjunctions',
      ru: 'Научитесь соединять простые предложения с помощью кыргызских союзов'
    },
    theory: {
      en: `In Kyrgyz, complex sentences are formed by joining simple sentences with conjunctions (союздар - soyzdar).

**Common Coordinating Conjunctions:**
- **жана** (jana) - and
- **бирок** (birok) - but
- **же** (je) - or
- **анан** (anan) - then, and then

**Subordinating Conjunctions:**
- **анткени** (antkeni) - because
- **эгерде** (egerde) - if
- **ошондуктан** (oshonduktan) - therefore

**Word Order in Complex Sentences:**
The verb still comes at the end of each clause. When using conjunctions, the pattern is:
Subject → Object → Verb + Conjunction + Subject → Object → Verb

**Example:**
Мен китеп окудум **жана** досум келди.
(I read a book **and** my friend came.)`,
      ru: `В кыргызском языке сложные предложения образуются путём соединения простых предложений союзами (союздар - soyzdar).

**Основные сочинительные союзы:**
- **жана** (jana) - и
- **бирок** (birok) - но
- **же** (je) - или
- **анан** (anan) - затем, и затем

**Подчинительные союзы:**
- **анткени** (antkeni) - потому что
- **эгерде** (egerde) - если
- **ошондуктан** (oshonduktan) - поэтому

**Порядок слов в сложных предложениях:**
Глагол всё ещё стоит в конце каждого придаточного.При использовании союзов схема:
Подлежащее → Дополнение → Глагол + Союз + Подлежащее → Дополнение → Глагол

**Пример:**
Мен китеп окудум **жана** досум келди.
(Я прочитал книгу **и** мой друг пришёл.)`
    },
    examples: [
      {
        kyrgyz: 'Ал мектепке барды жана окуду.',
        translation: {
          en: 'He went to school and studied.',
          ru: 'Он пошёл в школу и учился.'
        },
        explanation: {
          en: 'Two independent clauses joined by "жана" (and)',
          ru: 'Два независимых предложения, соединённых союзом "жана" (и)'
        }
      },
      {
        kyrgyz: 'Мен барамын, бирок сен калгын.',
        translation: {
          en: 'I will go, but you stay.',
          ru: 'Я пойду, но ты оставайся.'
        },
        explanation: {
          en: 'Contrasting clauses with "бирок" (but)',
          ru: 'Противопоставление с союзом "бирок" (но)'
        }
      },
      {
        kyrgyz: 'Биз үйдө калдык, анткени жамгыр жаады.',
        translation: {
          en: 'We stayed at home because it rained.',
          ru: 'Мы остались дома, потому что шёл дождь.'
        },
        explanation: {
          en: 'Subordinate clause showing reason with "анткени" (because)',
          ru: 'Придаточное предложение причины с союзом "анткени" (потому что)'
        }
      }
    ],
    vocabulary: ['жана', 'бирок', 'же', 'анан', 'анткени', 'эгерде', 'ошондуктан'],
    quiz: [
      {
        id: 'q1',
        question: {
          en: 'Which conjunction means "but" in Kyrgyz?',
          ru: 'Какой союз означает "но" в кыргызском языке?'
        },
        options: {
          en: ['жана', 'бирок', 'же', 'анан'],
          ru: ['жана', 'бирок', 'же', 'анан']
        },
        correct: 1,
        explanation: {
          en: 'бирок means "but" - used for contrast',
          ru: 'бирок означает "но" - используется для противопоставления'
        }
      },
      {
        id: 'q2',
        question: {
          en: 'Connect the sentences: "Мен барам" + "Сен кал"',
          ru: 'Соедините предложения: "Мен барам" + "Сен кал"'
        },
        options: {
          en: ['Мен барам жана сен кал', 'Мен барам, бирок сен кал', 'Мен барам же сен кал', 'Мен барам анткени сен кал'],
          ru: ['Мен барам жана сен кал', 'Мен барам, бирок сен кал', 'Мен барам же сен кал', 'Мен барам анткени сен кал']
        },
        correct: 1,
        explanation: {
          en: 'Use "бирок" (but) for contrast: I go, but you stay',
          ru: 'Используйте "бирок" (но) для противопоставления: Я иду, но ты оставайся'
        }
      },
      {
        id: 'q3',
        question: {
          en: 'What does "анткени" mean?',
          ru: 'Что означает "анткени"?'
        },
        options: {
          en: ['and', 'but', 'because', 'or'],
          ru: ['и', 'но', 'потому что', 'или']
        },
        correct: 2,
        explanation: {
          en: 'анткени means "because" - introduces reason',
          ru: 'анткени означает "потому что" - вводит причину'
        }
      }
    ]
  },

  // A2 - Additional Syntax Lessons
  {
    id: 'a2_syntax_02',
    level: 'A2',
    category: 'syntax',
    order: 2,
    title: { en: 'Subordinate Clauses with -гандан кийин', ru: 'Придаточные предложения с -гандан кийин' },
    description: { en: 'Express "after" actions using temporal clauses', ru: 'Выражение действий "после" с помощью временных придаточных' },
    theory: {
      en: `The construction **-гандан кийин** (after doing) creates temporal subordinate clauses.\n\n**Formation:** Verb stem + ган/ген/кан/кен + дан/ден кийин\n\n**Example:** Мен тамак жегенден кийин эс алам. (After I eat, I rest.)`,
      ru: `Конструкция **-гандан кийин** (после того как) создаёт временные придаточные предложения.\n\n**Образование:** Основа глагола + ган/ген/кан/кен + дан/ден кийин\n\n**Пример:** Мен тамак жегенден кийин эс алам. (После того как я ем, я отдыхаю.)`
    },
    examples: [
      { kyrgyz: 'Ал иштегенден кийин үйгө барат.', translation: { en: 'After working, he goes home.', ru: 'После работы он идёт домой.' } },
      { kyrgyz: 'Биз окуганд��н кийин ойнойбуз.', translation: { en: 'After studying, we play.', ru: 'После учёбы мы играем.' } }
    ],
    vocabulary: ['кийин', 'жегенден', 'иштегенден', 'окугандан'],
    quiz: [
      { id: 'q1', question: { en: 'How do you say "after eating"?', ru: 'Как сказать "после еды"?' }, options: { en: ['жегенден кийин', 'жеп кийин', 'жейм кийин', 'жейт кийин'], ru: ['жегенден кийин', 'жеп кийин', 'жейм кийин', 'жейт кийин'] }, correct: 0 },
      { id: 'q2', question: { en: 'What does "иштегенден кийин" mean?', ru: 'Что означает "иштегенден кийин"?' }, options: { en: ['before working', 'after working', 'while working', 'without working'], ru: ['перед работой', 'после работы', 'во время работы', 'без работы'] }, correct: 1 }
    ]
  },

  {
    id: 'a2_syntax_03',
    level: 'A2',
    category: 'syntax',
    order: 3,
    title: { en: 'Purpose Clauses with -уу үчүн', ru: 'Придаточные цели с -уу үчүн' },
    description: { en: 'Express purpose using "in order to" constructions', ru: 'Выражение цели с помощью конструкций "для того чтобы"' },
    theory: {
      en: `The suffix **-уу үчүн** expresses purpose (in order to).\n\n**Formation:** Verb stem + уу/үү үчүн\n\n**Example:** Мен китеп окуу үчүн китепканага бардым. (I went to the library to read books.)`,
      ru: `Суффикс **-уу үчүн** выражает цель (для того чтобы).\n\n**Образование:** Основа глагола + уу/үү үчүн\n\n**Пример:** Мен китеп окуу үчүн китепканага бардым. (Я пошёл в библиотеку, чтобы читать книги.)`
    },
    examples: [
      { kyrgyz: 'Ал үйрөнүү үчүн мектепке барат.', translation: { en: 'He goes to school to learn.', ru: 'Он ходит в школу, чтобы учиться.' } },
      { kyrgyz: 'Биз көрүү үчүн келдик.', translation: { en: 'We came to see.', ru: 'Мы пришли, чтобы увидеть.' } }
    ],
    vocabulary: ['үчүн', 'окуу', 'үйрөнүү', 'көрүү'],
    quiz: [
      { id: 'q1', question: { en: 'What does "-уу үчүн" express?', ru: 'Что выражает "-уу үчүн"?' }, options: { en: ['time', 'purpose', 'condition', 'result'], ru: ['время', 'цель', 'условие', 'результат'] }, correct: 1 },
      { id: 'q2', question: { en: 'Form: "to study" + purpose', ru: 'Образуйте: "учиться" + цель' }, options: { en: ['окуу үчүн', 'окудум үчүн', 'окуйм үчүн', 'окуп үчүн'], ru: ['окуу үчүн', 'окудум үчүн', 'окуйм үчүн', 'окуп үчүн'] }, correct: 0 }
    ]
  },

  {
    id: 'a2_syntax_04',
    level: 'A2',
    category: 'syntax',
    order: 4,
    title: { en: 'Comparative Sentences', ru: 'Сравнительные предложения' },
    description: { en: 'Compare objects and actions using comparative constructions', ru: 'Сравнение объектов и действий с помощью сравнительных конструкций' },
    theory: {
      en: `Kyrgyz uses the Ablative case + adjective for comparisons.\n\n**Pattern:** X-дан/ден + adjective\n\n**Example:** Бул китеп ал китептен кызыктуу. (This book is more interesting than that book.)`,
      ru: `Кыргызский использует исходный падеж + прилагательное для сравнений.\n\n**Схема:** X-дан/ден + прилагательное\n\n**Пример:** Бул китеп ал китептен кызыктуу. (Эта книга интереснее той книги.)`
    },
    examples: [
      { kyrgyz: 'Ал мендеп чоң.', translation: { en: 'He is bigger than me.', ru: 'Он больше меня.' } },
      { kyrgyz: 'Бул үйдөн ал үй жакшы.', translation: { en: 'That house is better than this house.', ru: 'Тот дом лучше этого дома.' } }
    ],
    vocabulary: ['кызыктуу', 'чоң', 'жакшы', 'тездеп'],
    quiz: [
      { id: 'q1', question: { en: 'Which case is used for comparison?', ru: 'Какой падеж используется для сравнения?' }, options: { en: ['Nominative', 'Accusative', 'Ablative', 'Dative'], ru: ['Именительный', 'Винительный', 'Исходный', 'Дательный'] }, correct: 2 },
      { id: 'q2', question: { en: 'Say "bigger than this"', ru: 'Скажите "больше этого"' }, options: { en: ['будан чоң', 'булду чоң', 'булга чоң', 'булдо чоң'], ru: ['будан чоң', 'булду чоң', 'булга чоң', 'булдо чоң'] }, correct: 0 }
    ]
  },

  // A2 - Morphology Lessons
  {
    id: 'a2_morph_01',
    level: 'A2',
    category: 'morphology',
    order: 5,
    title: { en: 'Past Tense Formation', ru: 'Образование прошедшего времени' },
    description: { en: 'Form past tense verbs with -ды/-ди/-ты/-ти', ru: 'Образование глаголов прошедшего времени с -ды/-ди/-ты/-ти' },
    theory: {
      en: `Past tense is formed by adding **-ды/-ди/-ты/-ти/-дү/-ду/-тү/-ту** + personal endings.\n\n**After voiced consonants:** -ды/-ди/-дү/-ду\n**After voiceless consonants:** -ты/-ти/-тү/-ту\n\n**Example:** бар (go) → бардым (I went)`,
      ru: `Прошедшее время образуется добавлением **-ды/-ди/-ты/-ти/-дү/-ду/-тү/-ту** + личные окончания.\n\n**После звонких согласных:** -ды/-ди/-дү/-ду\n**После глухих согласных:** -ты/-ти/-тү/-ту\n\n**Пример:** бар (идти) → бардым (я пошёл)`
    },
    examples: [
      { kyrgyz: 'Мен барды��. (бар + дым)', translation: { en: 'I went.', ru: 'Я пошёл.' } },
      { kyrgyz: 'Сен окудуң. (оку + дуң)', translation: { en: 'You read.', ru: 'Ты прочитал.' } },
      { kyrgyz: 'Ал келди. (кел + ди)', translation: { en: 'He came.', ru: 'Он пришёл.' } }
    ],
    vocabulary: ['бардым', 'окудум', 'келдим', 'жаздым'],
    quiz: [
      { id: 'q1', question: { en: 'Form past tense: кел (come) + I', ru: 'Образуйте прошедшее время: кел (приходить) + я' }, options: { en: ['келдим', 'келтим', 'келдым', 'келтым'], ru: ['келдим', 'келтим', 'келдым', 'келтым'] }, correct: 0 },
      { id: 'q2', question: { en: 'Which suffix after voiced consonants?', ru: 'Какой суффикс после звонких согласных?' }, options: { en: ['-ты', '-ди', '-ти', '-дү'], ru: ['-ты', '-ди', '-ти', '-дү'] }, correct: 1 },
      { id: 'q3', question: { en: 'What does "бардым" mean?', ru: 'Что означает "бардым"?' }, options: { en: ['I go', 'I went', 'I will go', 'I am going'], ru: ['я иду', 'я пошёл', 'я пойду', 'я иду (сейчас)'] }, correct: 1 }
    ]
  },

  {
    id: 'a2_morph_02',
    level: 'A2',
    category: 'morphology',
    order: 6,
    title: { en: 'Future Tense Formation', ru: 'Образование будущего времени' },
    description: { en: 'Express future actions with -ат/-эт/-от/-өт', ru: 'Выражение будущих действий с -ат/-эт/-от/-өт' },
    theory: {
      en: `Future tense uses **-ат/-эт/-от/-өт** (back/front vowel harmony) + personal endings.\n\n**Example:** бар (go) → барат (goes, will go)`,
      ru: `Будущее время использует **-ат/-эт/-от/-өт** (задняя/передняя гармония) + личные окончания.\n\n**Пример:** бар (идти) → барат (идёт, пойдёт)`
    },
    examples: [
      { kyrgyz: 'Мен барамын.', translation: { en: 'I will go.', ru: 'Я пойду.' } },
      { kyrgyz: 'Сен окуйсуң.', translation: { en: 'You will read.', ru: 'Ты будешь читать.' } },
      { kyrgyz: 'Ал келет.', translation: { en: 'He will come.', ru: 'Он придёт.' } }
    ],
    vocabulary: ['барамын', 'окуйм', 'келем', 'жазам'],
    quiz: [
      { id: 'q1', question: { en: 'Form future: бар (go) + he/she', ru: 'Образуйте будущее: бар (идти) + он/она' }, options: { en: ['барат', 'бардым', 'барды', 'барып'], ru: ['барат', 'бардым', 'барды', 'барып'] }, correct: 0 },
      { id: 'q2', question: { en: 'What does "келем" mean?', ru: 'Что означает "келем"?' }, options: { en: ['I came', 'I come', 'I will come', 'come!'], ru: ['я пришёл', 'я прихожу', 'я приду', 'приди!'] }, correct: 2 }
    ]
  },

  {
    id: 'a2_morph_03',
    level: 'A2',
    category: 'morphology',
    order: 7,
    title: { en: 'Possessive Suffixes', ru: 'Притяжательные суффиксы' },
    description: { en: 'Express possession with personal suffixes', ru: 'Выражение принадлежности с помощью личных суффиксов' },
    theory: {
      en: `Possessive suffixes attach to nouns to show ownership.\n\n**Singular:** -м (my), -ң (your), -сы/-си (his/her)\n**Plural:** -быз/-биз (our), -ңар/-ңер (your), -сы/-си (their)\n\n**Example:** китеп (book) → китебим (my book)`,
      ru: `Притяжательные суффиксы присоединяются к существительным для обозначения принадлежности.\n\n**Единственное:** -м (мой), -ң (твой), -сы/-си (его/её)\n**Множественное:** -быз/-биз (наш), -ңар/-ңер (ваш), -сы/-си (их)\n\n**Пример:** китеп (книга) → китебим (моя книга)`
    },
    examples: [
      { kyrgyz: 'менин китебим', translation: { en: 'my book', ru: 'моя книга' } },
      { kyrgyz: 'сенин үйүң', translation: { en: 'your house', ru: 'твой дом' } },
      { kyrgyz: 'анын досу', translation: { en: 'his/her friend', ru: 'его/её друг' } }
    ],
    vocabulary: ['китебим', 'үйүң', 'досу', 'атам'],
    quiz: [
      { id: 'q1', question: { en: 'Say "my house" (үй)', ru: 'Скажите "мой дом" (үй)' }, options: { en: ['үйүм', 'үйүң', 'үйү', 'үйүбүз'], ru: ['үйүм', 'үйүң', 'үйү', 'үйүбүз'] }, correct: 0 },
      { id: 'q2', question: { en: 'What suffix means "your" (singular)?', ru: 'Какой суффикс означает "твой"?' }, options: { en: ['-м', '-ң', '-сы', '-быз'], ru: ['-м', '-ң', '-сы', '-быз'] }, correct: 1 }
    ]
  },

  {
    id: 'a2_morph_04',
    level: 'A2',
    category: 'morphology',
    order: 8,
    title: { en: 'Genitive Case', ru: 'Родительный падеж' },
    description: { en: 'Express ownership with -нын/-нин/-дын/-дин', ru: 'Выражение принадлежности с -нын/-нин/-дын/-дин' },
    theory: {
      en: `Genitive case shows possession (of, 's).\n\n**After vowels:** -нын/-нин/-нун/-нүн\n**After voiced consonants:** -дын/-дин/-дун/-дүн\n**After voiceless consonants:** -тын/-тин/-тун/-түн\n\n**Example:** бала (child) → баланын (of the child)`,
      ru: `Родительный падеж показывает принадлежность.\n\n**После гласных:** -нын/-нин/-нун/-нүн\n**После звонких согласных:** -дын/-дин/-дун/-дүн\n**После глухих согласных:** -тын/-тин/-тун/-түн\n\n**Пример:** бала (ребёнок) → баланын (ребёнка)`
    },
    examples: [
      { kyrgyz: 'баланын китеби', translation: { en: "child's book", ru: 'книга ребёнка' } },
      { kyrgyz: 'мектептин окуучусу', translation: { en: "school's student", ru: 'ученик школы' } }
    ],
    vocabulary: ['баланын', 'мектептин', 'үйдүн', 'китептин'],
    quiz: [
      { id: 'q1', question: { en: 'Form genitive: бала (child)', ru: 'Образуйте родительный падеж: бала (ребёнок)' }, options: { en: ['баланын', 'балага', 'балада', 'баланы'], ru: ['баланын', 'балага', 'балада', 'баланы'] }, correct: 0 },
      { id: 'q2', question: { en: 'What does genitive case express?', ru: 'Что выражает родительный падеж?' }, options: { en: ['direction', 'location', 'possession', 'direct object'], ru: ['направление', 'место', 'принадлежность', 'прямое дополнение'] }, correct: 2 }
    ]
  },

  {
    id: 'a2_morph_05',
    level: 'A2',
    category: 'morphology',
    order: 9,
    title: { en: 'Instrumental Case', ru: 'Творительный падеж' },
    description: { en: 'Express means/instrument with -менен/-мен', ru: 'Выражение средства/инструмента с -менен/-мен' },
    theory: {
      en: `Instrumental case shows the means or instrument (with, by means of).\n\n**Suffix:** -менен/-мен (with)\n\n**Example:** калем менен жазуу (to write with a pen)`,
      ru: `Творительный падеж показывает средство или инструмент (с помощью, при помощи).\n\n**Суффикс:** -менен/-мен (с)\n\n**Пример:** калем менен жазуу (писать ручкой)`
    },
    examples: [
      { kyrgyz: 'Мен калем менен жазам.', translation: { en: 'I write with a pen.', ru: 'Я пишу ручкой.' } },
      { kyrgyz: 'Биз дос менен барабыз.', translation: { en: 'We go with a friend.', ru: 'Мы идём с другом.' } }
    ],
    vocabulary: ['менен', 'калем', 'дос менен', 'китеп менен'],
    quiz: [
      { id: 'q1', question: { en: 'What does "-менен" mean?', ru: 'Что означает "-менен"?' }, options: { en: ['to', 'from', 'with', 'in'], ru: ['к', 'от', 'с', 'в'] }, correct: 2 },
      { id: 'q2', question: { en: 'Say "with a pen" (калем)', ru: 'Скажите "ручкой" (калем)' }, options: { en: ['калемге', 'калемди', 'калем менен', 'калемден'], ru: ['калемге', 'калемди', 'калем менен', 'калемден'], }, correct: 2 }
    ]
  },

  {
    id: 'a2_morph_06',
    level: 'A2',
    category: 'morphology',
    order: 10,
    title: { en: 'Present Continuous Tense', ru: 'Настоящее длительное время' },
    description: { en: 'Express ongoing actions with -п жатам', ru: 'Выражение текущих действий с -п жатам' },
    theory: {
      en: `Present continuous (right now) uses **-п жат- + personal endings**.\n\n**Example:** окуп жатам (I am reading right now)`,
      ru: `Настоящее длительное (прямо сейчас) использует **-п жат- + личные окончания**.\n\n**Пример:** окуп жатам (я читаю прямо сейчас)`
    },
    examples: [
      { kyrgyz: 'Мен окуп жатам.', translation: { en: 'I am reading.', ru: 'Я читаю (сейчас).' } },
      { kyrgyz: 'Ал жазып жатат.', translation: { en: 'He is writing.', ru: 'Он пишет (сейчас).' } }
    ],
    vocabulary: ['жатам', 'окуп жатам', 'жазып жатам', 'иштеп жатам'],
    quiz: [
      { id: 'q1', question: { en: 'Form present continuous: оку (read) + I', ru: 'Образуйте настоящее длительное: оку (читать) + я' }, options: { en: ['окуп жатам', 'окудум', 'окуйм', 'окуам'], ru: ['окуп жатам', 'окудум', 'окуйм', 'окуам'] }, correct: 0 },
      { id: 'q2', question: { en: 'What does "жазып жатам" mean?', ru: 'Что означает "жазып жатам"?' }, options: { en: ['I wrote', 'I write', 'I am writing', 'I will write'], ru: ['я написал', 'я пишу (обычно)', 'я пишу (сейчас)', 'я напишу'] }, correct: 2 }
    ]
  },

  {
    id: 'a2_morph_07',
    level: 'A2',
    category: 'morphology',
    order: 11,
    title: { en: 'Verb Negation', ru: 'Отрицание глаголов' },
    description: { en: 'Form negative verbs with -ба/-бе/-па/-пе', ru: 'Образование отрицательных глаголов с -ба/-бе/-па/-пе' },
    theory: {
      en: `Negative verbs use **-ба/-бе/-па/-пе** (don't) before the verb.\n\n**After voiced:** -ба/-бе\n**After voiceless:** -па/-пе\n\n**Example:** барба (don't go), жазба (don't write)`,
      ru: `Отрицательные глаголы используют **-ба/-бе/-па/-пе** (не) перед глаголом.\n\n**После звонких:** -ба/-бе\n**После глухих:** -па/-пе\n\n**Пример:** барба (не ходи), жазба (не пиши)`
    },
    examples: [
      { kyrgyz: 'Мен барбаймын.', translation: { en: "I don't go.", ru: 'Я не хожу.' } },
      { kyrgyz: 'Ал окубайт.', translation: { en: "He doesn't read.", ru: 'Он не читает.' } }
    ],
    vocabulary: ['барбаймын', 'окубайм', 'жазбайм', 'келбейм'],
    quiz: [
      { id: 'q1', question: { en: 'Form negative: бар (go) + don\'t', ru: 'Образуйте отрицание: бар (ходить) + не' }, options: { en: ['барба', 'барпа', 'барма', 'барна'], ru: ['барба', 'барпа', 'барма', 'барна'] }, correct: 0 },
      { id: 'q2', question: { en: 'What does "окубайм" mean?', ru: 'Что означает "окубайм"?' }, options: { en: ['I read', "I don't read", 'I will read', 'read!'], ru: ['я читаю', 'я не читаю', 'я прочитаю', 'читай!'] }, correct: 1 }
    ]
  },

  // ===== A2 LEVEL - FINAL TEST =====
  {
    id: 'a2_final_test',
    level: 'A2',
    category: 'final_test',
    order: 12,
    title: { en: 'A2 Level Final Test', ru: 'Финальный тест уровня A2' },
    description: { en: 'Comprehensive test covering all A2 grammar topics', ru: 'Комплексный тест по всем темам грамматики уровня A2' },
    theory: {
      en: `This final test covers all A2 topics: complex sentences, temporal/purpose clauses, comparisons, past/future tense, possessive suffixes, genitive/instrumental cases, present continuous, and negation.`,
      ru: `Этот финальный тест охватывает все темы A2: сложные предложения, временные/целевые придаточные, сравнения, прошедшее/будущее время, притяжательные суффиксы, родительный/творительный падежи, настоящее длительное и отрицание.`
    },
    examples: [],
    quiz: [
      { id: 'q1', question: { en: 'Which conjunction means "but"?', ru: 'Какой союз означает "но"?' }, options: { en: ['жана', 'бирок', 'же', 'анан'], ru: ['жана', 'бирок', 'же', 'анан'] }, correct: 1, explanation: { en: 'бирок = but', ru: 'бирок = но' } },
      { id: 'q2', question: { en: 'Say "after eating"', ru: 'Скажите "после еды"' }, options: { en: ['жегенден кийин', 'жеп кийин', 'жейм кийин', 'жеген үчүн'], ru: ['жегенден кийин', 'жеп кийин', 'жейм кийин', 'жеген үчүн'] }, correct: 0, explanation: { en: 'Use -гандан кийин for "after"', ru: 'Используйте -гандан кийин для "после"' } },
      { id: 'q3', question: { en: 'What does "-уу үчүн" express?', ru: 'Что выражает "-уу үчүн"?' }, options: { en: ['time', 'purpose', 'condition', 'result'], ru: ['время', 'цель', 'условие', 'результат'] }, correct: 1, explanation: { en: '-уу үчүн = in order to', ru: '-уу үчүн = для того чтобы' } },
      { id: 'q4', question: { en: 'Say "bigger than me"', ru: 'Скажите "больше меня"' }, options: { en: ['мендеп чоң', 'менден чоң', 'менге чоң', 'мени чоң'], ru: ['мендеп чоң', 'менден чоң', 'менге чоң', 'мени чоң'] }, correct: 1, explanation: { en: 'Use Ablative -ден for comparison', ru: 'Используйте исходный падеж -ден для сравнения' } },
      { id: 'q5', question: { en: 'Form past tense: кел + I', ru: 'Образуйте прошедшее время: кел + я' }, options: { en: ['келдим', 'келтим', 'келем', 'келат'], ru: ['келдим', 'келтим', 'келем', 'келат'] }, correct: 0, explanation: { en: 'Past: кел + дим = келдим', ru: 'Прошедшее: кел + дим = келдим' } },
      { id: 'q6', question: { en: 'Form future: бар + he/she', ru: 'Образуйте будущее: бар + он/она' }, options: { en: ['барат', 'бардым', 'барды', 'барып'], ru: ['барат', 'бардым', 'барды', 'барып'] }, correct: 0, explanation: { en: 'Future: бар + ат = барат', ru: 'Будущее: бар + ат = барат' } },
      { id: 'q7', question: { en: 'Say "my book" (китеп)', ru: 'Скажите "моя книга" (китеп)' }, options: { en: ['китебим', 'китебиң', 'китеби', 'китебибиз'], ru: ['китебим', 'китебиң', 'китеби', 'китебибиз'] }, correct: 0, explanation: { en: 'Possessive: китеп + им = китебим', ru: 'Притяжательное: китеп + им = китебим' } },
      { id: 'q8', question: { en: 'What suffix means "your" (sg)?', ru: 'Какой суффикс означает "твой"?' }, options: { en: ['-м', '-ң', '-сы', '-быз'], ru: ['-м', '-ң', '-сы', '-быз'] }, correct: 1, explanation: { en: '-ң = your (singular)', ru: '-ң = твой' } },
      { id: 'q9', question: { en: 'Form genitive: бала', ru: 'Образуйте родительный падеж: бала' }, options: { en: ['баланын', 'балага', 'балада', 'баланы'], ru: ['баланын', 'балага', 'балада', 'баланы'] }, correct: 0, explanation: { en: 'Genitive: бала + нын = баланын', ru: 'Родительный: бала + нын = баланын' } },
      { id: 'q10', question: { en: 'What does genitive express?', ru: 'Что выражает родительный падеж?' }, options: { en: ['direction', 'location', 'possession', 'object'], ru: ['направление', 'место', 'принадлежность', 'объект'] }, correct: 2, explanation: { en: 'Genitive = possession (of)', ru: 'Родительный = принадлежность (чей)' } },
      { id: 'q11', question: { en: 'Say "with a pen" (калем)', ru: 'Скажите "ручкой" (калем)' }, options: { en: ['калемге', 'калемди', 'калем менен', 'калемден'], ru: ['калемге', 'калемди', 'калем менен', 'калемден'] }, correct: 2, explanation: { en: 'Instrumental: менен = with', ru: 'Творительный: менен = с помощью' } },
      { id: 'q12', question: { en: 'What does "-менен" mean?', ru: 'Что означает "-менен"?' }, options: { en: ['to', 'from', 'with', 'in'], ru: ['к', 'от', 'с', 'в'] }, correct: 2, explanation: { en: '-менен = with/by means of', ru: '-менен = с/при помощи' } },
      { id: 'q13', question: { en: 'Form present continuous: оку + I', ru: 'Образуйте настоящее длительное: оку + я' }, options: { en: ['окуп жатам', 'окудум', 'окуйм', 'окуам'], ru: ['окуп жатам', 'окудум', 'окуйм', 'окуам'] }, correct: 0, explanation: { en: 'Present continuous: -п жатам', ru: 'Настоящее длительное: -п жатам' } },
      { id: 'q14', question: { en: 'What does "жазып жатам" mean?', ru: 'Что означает "жазып жатам"?' }, options: { en: ['I wrote', 'I write (habitual)', 'I am writing (now)', 'I will write'], ru: ['я написал', 'я пишу (обычно)', 'я пишу (сейчас)', 'я напишу'] }, correct: 2, explanation: { en: '-п жатам = doing right now', ru: '-п жатам = делаю прямо сейчас' } },
      { id: 'q15', question: { en: 'Form negative: бар + don\'t', ru: 'Образуйте отрицание: бар + не' }, options: { en: ['барба', 'барпа', 'барма', 'барна'], ru: ['барба', 'барпа', 'барма', 'барна'] }, correct: 0, explanation: { en: 'Negative: бар + ба = барба', ru: 'Отрицание: бар + ба = барба' } },
      { id: 'q16', question: { en: 'What does "окубайм" mean?', ru: 'Что означает "окубайм"?' }, options: { en: ['I read', "I don't read", 'I will read', 'read!'], ru: ['я читаю', 'я не читаю', 'я прочитаю', 'читай!'] }, correct: 1, explanation: { en: '-байм = don\'t (1st person)', ru: '-байм = не (1-е лицо)' } },
      { id: 'q17', question: { en: 'Connect: "I go" + "you stay" (contrast)', ru: 'Соедините: "Я иду" + "ты остаёшься" (противопоставление)' }, options: { en: ['Мен барам жана сен кал', 'Мен барам, бирок сен кал', 'Мен барам же сен кал', 'Мен барам анткени сен кал'], ru: ['Мен барам жана сен кал', 'Мен барам, бирок сен кал', 'Мен барам же сен кал', 'Мен барам анткени сен кал'] }, correct: 1, explanation: { en: 'Use бирок for contrast', ru: 'Используйте бирок для противопоставления' } },
      { id: 'q18', question: { en: 'What does "анткени" mean?', ru: 'Что означает "анткени"?' }, options: { en: ['and', 'but', 'because', 'or'], ru: ['и', 'но', 'потому что', 'или'] }, correct: 2, explanation: { en: 'анткени = because', ru: 'анткени = потому что' } },
      { id: 'q19', question: { en: 'Say "to learn" (purpose)', ru: 'Скажите "чтобы учиться"' }, options: { en: ['үйрөнүү үчүн', 'үйрөнгөндөн кийин', 'үйрөнүп', 'үйрөнөм'], ru: ['үйрөнүү үчүн', 'үйрөнгөндөн кийин', 'үйрөнүп', 'үйрөнөм'] }, correct: 0, explanation: { en: '-уу үчүн = in order to', ru: '-уу үчүн = для того чтобы' } },
      { id: 'q20', question: { en: 'Which case for comparison?', ru: 'Какой падеж для сравнения?' }, options: { en: ['Nominative', 'Accusative', 'Ablative', 'Dative'], ru: ['Именительный', 'Винительный', 'Исходный', 'Дательный'] }, correct: 2, explanation: { en: 'Ablative (-дан/-ден) for comparison', ru: 'Исходный (-дан/-ден) для сравнения' } },
      { id: 'q21', question: { en: 'Say "after working"', ru: 'Скажите "после работы"' }, options: { en: ['иштегенден кийин', 'иштеп кийин', 'иштейм кийин', 'иштеген үчүн'], ru: ['иштегенден кийин', 'иштеп кийин', 'иштейм кийин', 'иштеген үчүн'] }, correct: 0, explanation: { en: '-ганден кийин = after doing', ru: '-гандан кийин = после того как' } },
      { id: 'q22', question: { en: 'Form past: оку + you (sg)', ru: 'Образуйте прошедшее: оку + ты' }, options: { en: ['окудум', 'окудуң', 'окуду', 'окудук'], ru: ['окудум', 'окудуң', 'окуду', 'окудук'] }, correct: 1, explanation: { en: 'Past 2nd sg: -дуң', ru: 'Прошедшее 2-е ед.: -дуң' } },
      { id: 'q23', question: { en: 'Say "I will come"', ru: 'Скажите "я приду"' }, options: { en: ['келем', 'келдим', 'келди', 'келип'], ru: ['келем', 'келдим', 'келди', 'келип'] }, correct: 0, explanation: { en: 'Future 1st sg: келем', ru: 'Будущее 1-е ед.: келем' } },
      { id: 'q24', question: { en: 'Say "your house" (үй)', ru: 'Скажите "твой дом" (үй)' }, options: { en: ['үйүм', 'үйүң', 'үйү', 'үйүбүз'], ru: ['үйүм', 'үйүң', 'үйү', 'үйүбүз'] }, correct: 1, explanation: { en: 'Possessive 2nd sg: -үң', ru: 'Притяжательное 2-е ед.: -үң' } },
      { id: 'q25', question: { en: 'Say "of the school" (мектеп)', ru: 'Скажите "школы" (род. падеж, мектеп)' }, options: { en: ['мектептин', 'мектепке', 'мектепте', 'мектепти'], ru: ['мектептин', 'мектепке', 'мектепте', 'мектепти'] }, correct: 0, explanation: { en: 'Genitive: -тин after voiceless', ru: 'Родительный: -тин после глухих' } },
      { id: 'q26', question: { en: 'Say "with a friend" (дос)', ru: 'Скажите "с другом" (дос)' }, options: { en: ['досго', 'досту', 'дос менен', 'достон'], ru: ['досго', 'досту', 'дос менен', 'достон'] }, correct: 2, explanation: { en: 'Instrumental: менен', ru: 'Творительный: менен' } },
      { id: 'q27', question: { en: 'Say "I am reading" (now)', ru: 'Скажите "я читаю" (сейчас)' }, options: { en: ['окуп жатам', 'окудум', 'окуйм', 'окуам'], ru: ['окуп жатам', 'окудум', 'окуйм', 'окуам'] }, correct: 0, explanation: { en: 'Present continuous: -п жатам', ru: 'Настоящее длительное: -п жатам' } },
      { id: 'q28', question: { en: 'Say "I don\'t write"', ru: 'Скажите "я не пишу"' }, options: { en: ['жазбаймын', 'жазамын', 'жаздым', 'жазып'], ru: ['жазбаймын', 'жазамын', 'жаздым', 'жазып'] }, correct: 0, explanation: { en: 'Negative: жаз + ба + ймын', ru: 'Отрицание: жаз + ба + ймын' } },
      { id: 'q29', question: { en: 'Choose: "I go AND he stays"', ru: 'Выберите: "Я иду И он остаётся"' }, options: { en: ['Мен барам жана ал калат', 'Мен барам бирок ал калат', 'Мен барам же ал калат', 'Мен барам анткени ал калат'], ru: ['Мен барам жана ал калат', 'Мен барам бирок ал калат', 'Мен барам же ал калат', 'Мен барам анткени ал калат'] }, correct: 0, explanation: { en: 'жана = and', ru: 'жана = и' } },
      { id: 'q30', question: { en: 'Say "better than that"', ru: 'Скажите "лучше того"' }, options: { en: ['андан жакшы', 'анга жакшы', 'анда жакшы', 'аны жакшы'], ru: ['андан жакшы', 'анга жакшы', 'анда жакшы', 'аны жакшы'] }, correct: 0, explanation: { en: 'Ablative -дан for comparison', ru: 'Исходный -дан для сравнения' } },
      { id: 'q31', question: { en: 'Form: "after coming"', ru: 'Образуйте: "после прихода"' }, options: { en: ['келгенден кийин', 'келип кийин', 'келем кийин', 'келген үчүн'], ru: ['келгенден кийин', 'келип кийин', 'келем кийин', 'келген үчүн'] }, correct: 0, explanation: { en: '-ганден кийин = after', ru: '-гандан кийин = после' } },
      { id: 'q32', question: { en: 'Say "to see" (purpose)', ru: 'Скажите "чтобы увидеть"' }, options: { en: ['көрүү үчүн', 'көргөндөн кийин', 'көрүп', 'көрөм'], ru: ['көрүү үчүн', 'көргөндөн кийин', 'көрүп', 'көрөм'] }, correct: 0, explanation: { en: '-уу үчүн = to/in order to', ru: '-уу үчүн = чтобы' } },
      { id: 'q33', question: { en: 'Past tense marker after voiced?', ru: 'Маркер прошедшего времени после звонких?' }, options: { en: ['-ты/-ти', '-ды/-ди', '-т', '-д'], ru: ['-ты/-ти', '-ды/-ди', '-т', '-д'] }, correct: 1, explanation: { en: '-ды/-ди after voiced', ru: '-ды/-ди после звонких' } },
      { id: 'q34', question: { en: 'Say "our book"', ru: 'Скажите "наша книга"' }, options: { en: ['китебим', 'китебиң', 'китебибиз', 'китебиңер'], ru: ['китебим', 'китебиң', 'китебибиз', 'китебиңер'] }, correct: 2, explanation: { en: 'Possessive 1st pl: -быз/-биз', ru: 'Притяжательное 1-е мн.: -быз/-биз' } },
      { id: 'q35', question: { en: 'Complete: кел + negative + I', ru: 'Завершите: кел + отрицание + я' }, options: { en: ['келбеймин', 'келемин', 'келдим', 'келип'], ru: ['келбеймин', 'келемин', 'келдим', 'келип'] }, correct: 0, explanation: { en: 'Negative: кел + бе + ймин', ru: 'Отрицание: кел + бе + ймин' } }
    ]
  }

  // Total: A1 (14 lessons + 1 final test), A2 (11 lessons + 1 final test) ✓
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
