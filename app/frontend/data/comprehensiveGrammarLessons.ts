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
  },

  // ===== B1 LEVEL - SYNTAX & MORPHOLOGY LESSONS =====
  {
    id: 'b1_lesson_01',
    level: 'B1',
    category: 'syntax',
    order: 1,
    title: { en: 'Conditional Sentences (Real Conditions)', ru: 'Условные предложения (реальные условия)' },
    description: { en: 'Express real conditions with эгер...болсо', ru: 'Выражение реальных условий с эгер...болсо' },
    theory: {
      en: `Real conditional sentences use **эгер** (if) + condition + **болсо** (if it is).\n\n**Pattern:** Эгер + [condition] + болсо, [result].\n\n**Example:** Эгер жамгыр жааса, мен үйдө калам. (If it rains, I will stay home.)`,
      ru: `Реальные условные предложения используют **эгер** (если) + условие + **болсо** (если будет).\n\n**Схема:** Эгер + [условие] + болсо, [результат].\n\n**Пример:** Эгер жамгыр жааса, мен үйдө калам. (Если пойдёт дождь, я останусь дома.)`
    },
    examples: [
      { kyrgyz: 'Эгер убакыт болсо, мен келем.', translation: { en: 'If I have time, I will come.', ru: 'Если будет время, я приду.' } },
      { kyrgyz: 'Эгер сен окусаң, сен билесиң.', translation: { en: 'If you study, you will know.', ru: 'Если ты будешь учиться, ты будешь знать.' } }
    ],
    vocabulary: ['эгер', 'болсо', 'жааса', 'убакыт'],
    quiz: [
      { id: 'q1', question: { en: 'What does "эгер...болсо" mean?', ru: 'Что означает "эгер...болсо"?' }, options: { en: ['because...therefore', 'if...then', 'when...then', 'although...but'], ru: ['потому что...поэтому', 'если...то', 'когда...то', 'хотя...но'] }, correct: 1 },
      { id: 'q2', question: { en: 'Complete: "If it rains, I stay home"', ru: 'Завершите: "Если дождь, я дома"' }, options: { en: ['Жамгыр жааса, үйдө калам', 'Эгер жамгыр жааса, үйдө калам', 'Жамгыр жаады, үйдө калдым', 'Жамгыр жап жатса, үйдө калам'], ru: ['Жамгыр жааса, үйдө калам', 'Эгер жамгыр жааса, үйдө калам', 'Жамгыр жаады, үйдө калдым', 'Жамгыр жап жатса, үйдө калам'] }, correct: 1 }
    ]
  },

  {
    id: 'b1_lesson_02',
    level: 'B1',
    category: 'morphology',
    order: 2,
    title: { en: 'Modal Verbs (керек, мүмкүн, тийиш)', ru: 'Модальные глаголы (керек, мүмкүн, тийиш)' },
    description: { en: 'Express necessity, possibility, and obligation', ru: 'Выражение необходимости, возможности и обязательства' },
    theory: {
      en: `Modal constructions express necessity, possibility, and obligation.\n\n**керек** = need to, must\n**мүмкүн** = possible, can\n**тийиш** = should, ought to\n\n**Pattern:** Verb-уу/үү + modal word\n\n**Examples:**\n- Мен баруу керек. (I need to go.)\n- Сен окуу мүмкүн. (You can study.)\n- Биз иштөө тийиш. (We should work.)`,
      ru: `Модальные конструкции выражают необходимость, возможность и обязательство.\n\n**керек** = нужно, должен\n**мүмкүн** = возможно, можно\n**тийиш** = следует, должен\n\n**Схема:** Глагол-уу/үү + модальное слово\n\n**Примеры:**\n- Мен баруу керек. (Мне нужно идти.)\n- Сен окуу мүмкүн. (Ты можешь учиться.)\n- Биз иштөө тийиш. (Нам следует работать.)`
    },
    examples: [
      { kyrgyz: 'Мага келүү керек.', translation: { en: 'I must come.', ru: 'Мне нужно прийти.' } },
      { kyrgyz: 'Бул иштөө мүмкүн.', translation: { en: 'This can work.', ru: 'Это может работать.' } },
      { kyrgyz: 'Силер аракет кылуу тийиш.', translation: { en: 'You should try.', ru: 'Вам следует попробовать.' } }
    ],
    vocabulary: ['керек', 'мүмкүн', 'тийиш', 'аракет'],
    quiz: [
      { id: 'q1', question: { en: 'Which modal means "must/need to"?', ru: 'Какое модальное слово означает "должен/нужно"?' }, options: { en: ['керек', 'мүмкүн', 'тийиш', 'болот'], ru: ['керек', 'мүмкүн', 'тийиш', 'болот'] }, correct: 0 },
      { id: 'q2', question: { en: 'Say "I can go"', ru: 'Скажите "я могу пойти"' }, options: { en: ['Мен баруу керек', 'Мен баруу мүмкүн', 'Мен баруу тийиш', 'Мен барам'], ru: ['Мен баруу керек', 'Мен баруу мүмкүн', 'Мен баруу тийиш', 'Мен барам'] }, correct: 1 }
    ]
  },

  {
    id: 'b1_lesson_03',
    level: 'B1',
    category: 'morphology',
    order: 3,
    title: { en: 'Perfect Tense (-ган/-ген)', ru: 'Перфектное время (-ган/-ген)' },
    description: { en: 'Express completed actions and experiences', ru: 'Выражение завершённых действий и опыта' },
    theory: {
      en: `Perfect tense uses **-ган/-ген/-кан/-кен** to express completed actions.\n\n**Formation:** Verb stem + ган/ген/кан/кен + personal endings\n\n**Example:** Мен барганмын. (I have been/gone.)`,
      ru: `Перфектное время использует **-ган/-ген/-кан/-кен** для выражения завершённых действий.\n\n**Образование:** Основа глагола + ган/ген/кан/кен + личные окончания\n\n**Пример:** Мен барганмын. (Я ходил/был.)`
    },
    examples: [
      { kyrgyz: 'Мен бул китепти окуганмын.', translation: { en: 'I have read this book.', ru: 'Я читал эту книгу.' } },
      { kyrgyz: 'Сен Бишкекте болгонсуңбу?', translation: { en: 'Have you been to Bishkek?', ru: 'Ты был в Бишкеке?' } }
    ],
    vocabulary: ['барганмын', 'окуганмын', 'болгонсуң', 'көргөнмүн'],
    quiz: [
      { id: 'q1', question: { en: 'Form perfect: бар + I', ru: 'Образуйте перфект: бар + я' }, options: { en: ['барганмын', 'бардым', 'барам', 'барат'], ru: ['барганмын', 'бардым', 'барам', 'барат'] }, correct: 0 },
      { id: 'q2', question: { en: 'What does "-ган/-ген" express?', ru: 'Что выражает "-ган/-ген"?' }, options: { en: ['future action', 'completed action/experience', 'continuous action', 'habitual action'], ru: ['будущее действие', 'завершённое действие/опыт', 'длительное действие', 'обычное действие'] }, correct: 1 }
    ]
  },

  {
    id: 'b1_lesson_04',
    level: 'B1',
    category: 'syntax',
    order: 4,
    title: { en: 'Relative Clauses with -ган/-ген', ru: 'Относительные придаточные с -ган/-ген' },
    description: { en: 'Describe nouns with participial clauses', ru: 'Описание существительных с помощью причастных оборотов' },
    theory: {
      en: `Relative clauses use participial forms to modify nouns.\n\n**Pattern:** [Subject + Object + Verb-ган/ген] + Noun\n\n**Example:** Мен окуган китеп. (The book that I read.)`,
      ru: `Относительные придаточные используют причастные формы для определения существительных.\n\n**Схема:** [Подлежащее + Дополнение + Глагол-ган/ген] + Существительное\n\n**Пример:** Мен окуган китеп. (Книга, которую я прочитал.)`
    },
    examples: [
      { kyrgyz: 'Мен көргөн адам', translation: { en: 'The person whom I saw', ru: 'Человек, которого я видел' } },
      { kyrgyz: 'Ал жазган макала', translation: { en: 'The article that he wrote', ru: 'Статья, которую он написал' } }
    ],
    vocabulary: ['көргөн', 'жазган', 'айткан', 'келген'],
    quiz: [
      { id: 'q1', question: { en: 'Say "the book that I bought"', ru: 'Скажите "книга, которую я купил"' }, options: { en: ['Мен сатып алган китеп', 'Китепти сатып алдым', 'Сатып алам китеп', 'Китеп сатып алам'], ru: ['Мен сатып алган китеп', 'Китепти сатып алдым', 'Сатып алам китеп', 'Китеп сатып алам'] }, correct: 0 },
      { id: 'q2', question: { en: 'Where does the participle go?', ru: 'Куда ставится причастие?' }, options: { en: ['after the noun', 'before the noun', 'at sentence end', 'at sentence start'], ru: ['после существительного', 'перед существительным', 'в конце предложения', 'в начале предложения'] }, correct: 1 }
    ]
  },

  {
    id: 'b1_lesson_05',
    level: 'B1',
    category: 'morphology',
    order: 5,
    title: { en: 'Passive Voice (-ыл/-ил)', ru: 'Страдательный залог (-ыл/-ил)' },
    description: { en: 'Express actions done to the subject', ru: 'Выражение действий, совершаемых над подлежащим' },
    theory: {
      en: `Passive voice uses **-ыл/-ил/-ул/-үл** to show action done to subject.\n\n**Formation:** Verb stem + ыл/ил/ул/үл\n\n**Example:** жаз (write) → жазыл (be written)`,
      ru: `Страдательный залог использует **-ыл/-ил/-ул/-үл** для действий над подлежащим.\n\n**Образование:** Основа глагола + ыл/ил/ул/үл\n\n**Пример:** жаз (писать) → жазыл (быть написанным)`
    },
    examples: [
      { kyrgyz: 'Китеп жазылды.', translation: { en: 'The book was written.', ru: 'Книга была написана.' } },
      { kyrgyz: 'Үй курулат.', translation: { en: 'The house is being built.', ru: 'Дом строится.' } }
    ],
    vocabulary: ['жазылды', 'курулат', 'ачылды', 'жабылды'],
    quiz: [
      { id: 'q1', question: { en: 'Form passive: жаз (write)', ru: 'Образуйте страдательный залог: жаз (писать)' }, options: { en: ['жазыл', 'жазба', 'жазуу', 'жазып'], ru: ['жазыл', 'жазба', 'жазуу', 'жазып'] }, correct: 0 },
      { id: 'q2', question: { en: 'What does passive voice show?', ru: 'Что показывает страдательный залог?' }, options: { en: ['who does action', 'action done to subject', 'future action', 'completed action'], ru: ['кто делает действие', 'действие над подлежащим', 'будущее действие', 'завершённое действие'] }, correct: 1 }
    ]
  },

  {
    id: 'b1_lesson_06',
    level: 'B1',
    category: 'morphology',
    order: 6,
    title: { en: 'Causative Voice (-т/-тыр/-дыр)', ru: 'Побудительный залог (-т/-тыр/-дыр)' },
    description: { en: 'Express causing someone to do something', ru: 'Выражение побуждения кого-то сделать что-то' },
    theory: {
      en: `Causative voice uses suffixes to show making/causing someone to act.\n\n**Suffixes:** -т, -тыр/-тир, -дыр/-дир, -гыз/-гиз\n\n**Example:** жаз (write) → жаздыр (make someone write)`,
      ru: `Побудительный залог использует суффиксы для побуждения кого-то к действию.\n\n**Суффиксы:** -т, -тыр/-тир, -дыр/-дир, -гыз/-гиз\n\n**Пример:** жаз (писать) → жаздыр (заставить писать)`
    },
    examples: [
      { kyrgyz: 'Мен балага китеп окутам.', translation: { en: 'I make the child read a book.', ru: 'Я заставляю ребёнка читать книгу.' } },
      { kyrgyz: 'Ал үйдү куруптур.', translation: { en: 'He has the house built.', ru: 'Он строит дом (через других).' } }
    ],
    vocabulary: ['окутам', 'жаздырам', 'куруптурам', 'иштетем'],
    quiz: [
      { id: 'q1', question: { en: 'Form causative: оку (read)', ru: 'Образуйте побудительный залог: оку (читать)' }, options: { en: ['окут', 'окуп', 'окуу', 'окул'], ru: ['окут', 'окуп', 'окуу', 'окул'] }, correct: 0 },
      { id: 'q2', question: { en: 'What does causative voice mean?', ru: 'Что означает побудительный залог?' }, options: { en: ['I do it myself', 'I make someone do it', 'someone does it to me', 'we do it together'], ru: ['я делаю сам', 'я заставляю кого-то делать', 'кто-то делает мне', 'мы делаем вместе'] }, correct: 1 }
    ]
  },

  {
    id: 'b1_lesson_07',
    level: 'B1',
    category: 'syntax',
    order: 7,
    title: { en: 'Reported Speech (-арын/-ерин айтты)', ru: 'Косвенная речь (-арын/-ерин айтты)' },
    description: { en: 'Report what someone said', ru: 'Передача чужих слов' },
    theory: {
      en: `Reported speech uses **-арын/-ерин/орун/өрүн + деп/айтты**.\n\n**Pattern:** [Subject] [quote] + деп айтты/деди\n\n**Example:** Ал келерин айтты. (He said he would come.)`,
      ru: `Косвенная речь использует **-арын/-ерин/орун/өрүн + деп/айтты**.\n\n**Схема:** [Подлежащее] [цитата] + деп айтты/деди\n\n**Пример:** Ал келерин айтты. (Он сказал, что придёт.)`
    },
    examples: [
      { kyrgyz: 'Ал окуарын айтты.', translation: { en: 'He said he would study.', ru: 'Он сказал, что будет учиться.' } },
      { kyrgyz: 'Биз барганыбызды айттык.', translation: { en: 'We said we had gone.', ru: 'Мы сказали, что ходили.' } }
    ],
    vocabulary: ['деп', 'айтты', 'сурады', 'жооп берди'],
    quiz: [
      { id: 'q1', question: { en: 'Say "He said he would go"', ru: 'Скажите "Он сказал, что пойдёт"' }, options: { en: ['Ал барарын айтты', 'Ал барды деди', 'Ал барат айтты', 'Ал барам деп'], ru: ['Ал барарын айтты', 'Ал барды деди', 'Ал барат айтты', 'Ал барам деп'] }, correct: 0 },
      { id: 'q2', question: { en: 'Which word introduces reported speech?', ru: 'Какое слово вводит косвенную речь?' }, options: { en: ['жана', 'деп', 'менен', 'үчүн'], ru: ['жана', 'деп', 'менен', 'үчүн'] }, correct: 1 }
    ]
  },

  {
    id: 'b1_lesson_08',
    level: 'B1',
    category: 'morphology',
    order: 8,
    title: { en: 'Reciprocal Voice (-ш/-иш)', ru: 'Взаимный залог (-ш/-иш)' },
    description: { en: 'Express mutual actions', ru: 'Выражение взаимных действий' },
    theory: {
      en: `Reciprocal voice uses **-ш/-иш/-уш/-үш** for mutual actions.\n\n**Example:** көр (see) → көрүш (see each other)`,
      ru: `Взаимный залог использует **-ш/-иш/-уш/-үш** для взаимных действий.\n\n**Пример:** көр (видеть) → көрүш (видеться)`
    },
    examples: [
      { kyrgyz: 'Биз көрүштүк.', translation: { en: 'We saw each other.', ru: 'Мы виделись.' } },
      { kyrgyz: 'Алар сүйлөшүшөт.', translation: { en: 'They talk to each other.', ru: 'Они разговаривают друг с другом.' } }
    ],
    vocabulary: ['көрүш', 'сүйлөш', 'жардамдаш', 'баарлаш'],
    quiz: [
      { id: 'q1', question: { en: 'Form reciprocal: көр (see)', ru: 'Образуйте взаимный залог: көр (видеть)' }, options: { en: ['көрүш', 'көрүл', 'көрсөт', 'көрбө'], ru: ['көрүш', 'көрүл', 'көрсөт', 'көрбө'] }, correct: 0 },
      { id: 'q2', question: { en: 'What does reciprocal voice show?', ru: 'Что показывает взаимный залог?' }, options: { en: ['one-way action', 'mutual action', 'passive action', 'causative action'], ru: ['одностороннее действие', 'взаимное действие', 'страдательное действие', 'побудительное действие'] }, correct: 1 }
    ]
  },

  {
    id: 'b1_lesson_09',
    level: 'B1',
    category: 'morphology',
    order: 9,
    title: { en: 'Reflexive Voice (-н/-ын/-ин)', ru: 'Возвратный залог (-н/-ын/-ин)' },
    description: { en: 'Express actions done to oneself', ru: 'Выражение действий, направленных на себя' },
    theory: {
      en: `Reflexive voice uses **-н/-ын/-ин/-ун/-үн** for self-directed actions.\n\n**Example:** жуу (wash) → жуун (wash oneself)`,
      ru: `Возвратный залог использует **-н/-ын/-ин/-ун/-үн** для действий, направленных на себя.\n\n**Пример:** жуу (мыть) → жуун (умываться)`
    },
    examples: [
      { kyrgyz: 'Мен жуунам.', translation: { en: 'I wash myself.', ru: 'Я умываюсь.' } },
      { kyrgyz: 'Ал кийинет.', translation: { en: 'He/she dresses.', ru: 'Он/она одевается.' } }
    ],
    vocabulary: ['жуунам', 'кийинем', 'тарамын', 'даярданам'],
    quiz: [
      { id: 'q1', question: { en: 'Form reflexive: жуу (wash)', ru: 'Образуйте возвратный залог: жуу (мыть)' }, options: { en: ['жуун', 'жуул', 'жуут', 'жууш'], ru: ['жуун', 'жуул', 'жуут', 'жууш'] }, correct: 0 },
      { id: 'q2', question: { en: 'What does reflexive voice show?', ru: 'Что показывает возвратный залог?' }, options: { en: ['action to others', 'action to oneself', 'mutual action', 'caused action'], ru: ['действие на других', 'действие на себя', 'взаимное действие', 'побуждённое действие'] }, correct: 1 }
    ]
  },

  {
    id: 'b1_lesson_10',
    level: 'B1',
    category: 'syntax',
    order: 10,
    title: { en: 'Concessive Clauses (-са да/се де)', ru: 'Уступительные придаточные (-са да/се де)' },
    description: { en: 'Express "although/even though"', ru: 'Выражение "хотя/несмотря на"' },
    theory: {
      en: `Concessive clauses use **-са/-се + да/де** for "although/even though".\n\n**Pattern:** Verb-са/се да/де, [result]\n\n**Example:** Жаада болсо да, мен барам. (Even though it's raining, I'll go.)`,
      ru: `Уступительные придаточные используют **-са/-се + да/де** для "хотя/несмотря на".\n\n**Схема:** Глагол-са/се да/де, [результат]\n\n**Пример:** Жаада болсо да, мен барам. (Хотя дождь, я пойду.)`
    },
    examples: [
      { kyrgyz: 'Чарчасам да, иштейм.', translation: { en: 'Although I\'m tired, I work.', ru: 'Хотя я устал, я работаю.' } },
      { kyrgyz: 'Акчасы жок болсо да, ал сатып алды.', translation: { en: 'Even though he had no money, he bought it.', ru: 'Хотя у него не было денег, он купил.' } }
    ],
    vocabulary: ['болсо да', 'барса да', 'келсе де', 'окуса да'],
    quiz: [
      { id: 'q1', question: { en: 'What does "-са да" mean?', ru: 'Что означает "-са да"?' }, options: { en: ['because', 'although', 'therefore', 'when'], ru: ['потому что', 'хотя', 'поэтому', 'когда'] }, correct: 1 },
      { id: 'q2', question: { en: 'Say "even though it\'s cold"', ru: 'Скажите "хотя холодно"' }, options: { en: ['Суук болсо да', 'Суук болгондо', 'Суук үчүн', 'Суук менен'], ru: ['Суук болсо да', 'Суук болгондо', 'Суук үчүн', 'Суук менен'] }, correct: 0 }
    ]
  },

  {
    id: 'b1_lesson_11',
    level: 'B1',
    category: 'morphology',
    order: 11,
    title: { en: 'Desiderative Mood (-гым/-гим келет)', ru: 'Желательное наклонение (-гым/-гим келет)' },
    description: { en: 'Express desires and wishes', ru: 'Выражение желаний и стремлений' },
    theory: {
      en: `Desiderative mood uses **-гым/-гим/-кым/-ким + келет** for "want to".\n\n**Pattern:** Verb stem + гым/гим келет\n\n**Example:** Мен баргым келет. (I want to go.)`,
      ru: `Желательное наклонение использует **-гым/-гим/-кым/-ким + келет** для "хочу".\n\n**Схема:** Основа глагола + гым/гим келет\n\n**Пример:** Мен баргым келет. (Я хочу пойти.)`
    },
    examples: [
      { kyrgyz: 'Мага окугум келет.', translation: { en: 'I want to study.', ru: 'Я хочу учиться.' } },
      { kyrgyz: 'Сага эмне кылгың келет?', translation: { en: 'What do you want to do?', ru: 'Что ты хочешь делать?' } }
    ],
    vocabulary: ['баргым келет', 'окугум келет', 'жегим келет', 'уктагым келет'],
    quiz: [
      { id: 'q1', question: { en: 'Form desiderative: бар (go)', ru: 'Образуйте желательное: бар (идти)' }, options: { en: ['баргым келет', 'барамын', 'бардым', 'барууну каалайм'], ru: ['баргым келет', 'барамын', 'бардым', 'барууну каалайм'] }, correct: 0 },
      { id: 'q2', question: { en: 'What does "-гым келет" express?', ru: 'Что выражает "-гым келет"?' }, options: { en: ['obligation', 'desire/want', 'ability', 'permission'], ru: ['обязательство', 'желание/хотение', 'способность', 'разрешение'] }, correct: 1 }
    ]
  },

  // ===== B1 LEVEL - FINAL TEST =====
  {
    id: 'b1_final_test',
    level: 'B1',
    category: 'final_test',
    order: 12,
    title: { en: 'B1 Level Final Test', ru: 'Финальный тест уровня B1' },
    description: { en: 'Comprehensive test covering all B1 grammar topics', ru: 'Комплексный тест по всем темам грамматики уровня B1' },
    theory: {
      en: `This final test covers all B1 topics: conditional sentences, modal verbs, perfect tense, relative clauses, passive/causative/reciprocal/reflexive voices, reported speech, concessive clauses, and desiderative mood.`,
      ru: `Этот финальный тест охватывает все темы B1: условные предложения, модальные глаголы, перфектное время, относительные придаточные, страдательный/побудительный/взаимный/возвратный залоги, косвенную речь, уступительные придаточные и желательное наклонение.`
    },
    examples: [],
    quiz: [
      // Conditionals (3 questions)
      { id: 'q1', question: { en: 'What does "эгер...болсо" mean?', ru: 'Что означает "эгер...болсо"?' }, options: { en: ['because...therefore', 'if...then', 'when...then', 'although...but'], ru: ['потому что...поэтому', 'если...то', 'когда...то', 'хотя...но'] }, correct: 1, explanation: { en: 'эгер...болсо = if...then (real conditions)', ru: 'эгер...болсо = если...то (реальные условия)' } },
      { id: 'q2', question: { en: 'Complete: "If it rains, I stay home"', ru: 'Завершите: "Если дождь, я дома"' }, options: { en: ['Жамгыр жааса, үйдө калам', 'Эгер жамгыр жааса, үйдө калам', 'Жамгыр жаады, үйдө калдым', 'Жамгыр жап жатса, үйдө калам'], ru: ['Жамгыр жааса, үйдө калам', 'Эгер жамгыр жааса, үйдө калам', 'Жамгыр жаады, үйдө калдым', 'Жамгыр жап жатса, үйдө калам'] }, correct: 1, explanation: { en: 'Use эгер + condition + болсо', ru: 'Используйте эгер + условие + болсо' } },
      { id: 'q3', question: { en: 'Real condition marker in Kyrgyz?', ru: 'Маркер реального условия в кыргызском?' }, options: { en: ['анткени', 'эгер...болсо', 'менен', '-са да'], ru: ['анткени', 'эгер...болсо', 'менен', '-са да'] }, correct: 1, explanation: { en: 'эгер...болсо = if (real condition)', ru: 'эгер...болсо = если (реальное условие)' } },

      // Modal Verbs (3 questions)
      { id: 'q4', question: { en: 'Which modal means "must/need to"?', ru: 'Какое модальное слово означает "должен/нужно"?' }, options: { en: ['керек', 'мүмкүн', 'тийиш', 'болот'], ru: ['керек', 'мүмкүн', 'тийиш', 'болот'] }, correct: 0, explanation: { en: 'керек = must/need to', ru: 'керек = должен/нужно' } },
      { id: 'q5', question: { en: 'Say "I can go"', ru: 'Скажите "я могу пойти"' }, options: { en: ['Мен баруу керек', 'Мен баруу мүмкүн', 'Мен баруу тийиш', 'Мен барам'], ru: ['Мен баруу керек', 'Мен баруу мүмкүн', 'Мен баруу тийиш', 'Мен барам'] }, correct: 1, explanation: { en: 'мүмкүн = possible/can', ru: 'мүмкүн = возможно/можно' } },
      { id: 'q6', question: { en: 'What does "тийиш" express?', ru: 'Что выражает "тийиш"?' }, options: { en: ['necessity', 'possibility', 'obligation/should', 'desire'], ru: ['необходимость', 'возможность', 'обязательство/следует', 'желание'] }, correct: 2, explanation: { en: 'тийиш = should/ought to', ru: 'тийиш = следует/должен' } },

      // Perfect Tense (3 questions)
      { id: 'q7', question: { en: 'Form perfect: бар + I', ru: 'Образуйте перфект: бар + я' }, options: { en: ['барганмын', 'бардым', 'барам', 'барат'], ru: ['барганмын', 'бардым', 'барам', 'барат'] }, correct: 0, explanation: { en: 'Perfect: бар + ган + мын', ru: 'Перфект: бар + ган + мын' } },
      { id: 'q8', question: { en: 'What does "-ган/-ген" express?', ru: 'Что выражает "-ган/-ген"?' }, options: { en: ['future action', 'completed action/experience', 'continuous action', 'habitual action'], ru: ['будущее действие', 'завершённое действие/опыт', 'длительное действие', 'обычное действие'] }, correct: 1, explanation: { en: '-ган/-ген = completed/experienced', ru: '-ган/-ген = завершённое/испытанное' } },
      { id: 'q9', question: { en: 'Say "Have you been to Bishkek?"', ru: 'Скажите "Ты был в Бишкеке?"' }, options: { en: ['Сен Бишкекте болгонсуңбу?', 'Сен Бишкекте болдуңбу?', 'Сен Бишкекте боласыңбы?', 'Сен Бишкекке барасыңбы?'], ru: ['Сен Бишкекте болгонсуңбу?', 'Сен Бишкекте болдуңбу?', 'Сен Бишкекте боласыңбы?', 'Сен Бишкекке барасыңбы?'] }, correct: 0, explanation: { en: 'Perfect asks about experience', ru: 'Перфект спрашивает об опыте' } },

      // Relative Clauses (3 questions)
      { id: 'q10', question: { en: 'Say "the book that I bought"', ru: 'Скажите "книга, которую я купил"' }, options: { en: ['Мен сатып алган китеп', 'Китепти сатып алдым', 'Сатып алам китеп', 'Китеп сатып алам'], ru: ['Мен сатып алган китеп', 'Китепти сатып алдым', 'Сатып алам китеп', 'Китеп сатып алам'] }, correct: 0, explanation: { en: 'Participle + noun pattern', ru: 'Схема причастие + существительное' } },
      { id: 'q11', question: { en: 'Where does the participle go?', ru: 'Куда ставится причастие?' }, options: { en: ['after the noun', 'before the noun', 'at sentence end', 'at sentence start'], ru: ['после существительного', 'перед существительным', 'в конце предложения', 'в начале предложения'] }, correct: 1, explanation: { en: 'Participle modifies noun from left', ru: 'Причастие определяет существительное слева' } },
      { id: 'q12', question: { en: 'Say "the person whom I saw"', ru: 'Скажите "человек, которого я видел"' }, options: { en: ['Мен көргөн адам', 'Адамды көрдүм', 'Көрөм адам', 'Адам мени көрдү'], ru: ['Мен көргөн адам', 'Адамды көрдүм', 'Көрөм адам', 'Адам мени көрдү'] }, correct: 0, explanation: { en: 'Subject + verb-ган + noun', ru: 'Подлежащее + глагол-ган + существительное' } },

      // Passive Voice (3 questions)
      { id: 'q13', question: { en: 'Form passive: жаз (write)', ru: 'Образуйте страдательный залог: жаз (писать)' }, options: { en: ['жазыл', 'жазба', 'жазуу', 'жазып'], ru: ['жазыл', 'жазба', 'жазуу', 'жазып'] }, correct: 0, explanation: { en: 'Passive: verb + ыл/ил', ru: 'Страдательный: глагол + ыл/ил' } },
      { id: 'q14', question: { en: 'What does passive voice show?', ru: 'Что показывает страдательный залог?' }, options: { en: ['who does action', 'action done to subject', 'future action', 'completed action'], ru: ['кто делает действие', 'действие над подлежащим', 'будущее действие', 'завершённое действие'] }, correct: 1, explanation: { en: 'Passive = action done TO subject', ru: 'Страдательный = действие НАД подлежащим' } },
      { id: 'q15', question: { en: 'Say "The book was written"', ru: 'Скажите "Книга была написана"' }, options: { en: ['Китеп жазылды', 'Китепти жаздым', 'Китеп жазат', 'Китепти жазыл'], ru: ['Китеп жазылды', 'Китепти жаздым', 'Китеп жазат', 'Китепти жазыл'] }, correct: 0, explanation: { en: 'жазыл + past = was written', ru: 'жазыл + прошедшее = была написана' } },

      // Causative Voice (3 questions)
      { id: 'q16', question: { en: 'Form causative: оку (read)', ru: 'Образуйте побудительный залог: оку (читать)' }, options: { en: ['окут', 'окуп', 'окуу', 'окул'], ru: ['окут', 'окуп', 'окуу', 'окул'] }, correct: 0, explanation: { en: 'Causative: verb + т/тыр/дыр', ru: 'Побудительный: глагол + т/тыр/дыр' } },
      { id: 'q17', question: { en: 'What does causative voice mean?', ru: 'Что означает побудительный залог?' }, options: { en: ['I do it myself', 'I make someone do it', 'someone does it to me', 'we do it together'], ru: ['я делаю сам', 'я заставляю кого-то делать', 'кто-то делает мне', 'мы делаем вместе'] }, correct: 1, explanation: { en: 'Causative = make/have someone do', ru: 'Побудительный = заставить кого-то делать' } },
      { id: 'q18', question: { en: 'Say "I make the child read"', ru: 'Скажите "Я заставляю ребёнка читать"' }, options: { en: ['Мен балага китеп окутам', 'Мен балага китеп окуйм', 'Мен бала менен окуйм', 'Мен баланы окуп жатам'], ru: ['Мен балага китеп окутам', 'Мен балага китеп окуйм', 'Мен бала менен окуйм', 'Мен баланы окуп жатам'] }, correct: 0, explanation: { en: 'окут = cause to read', ru: 'окут = заставить читать' } },

      // Reported Speech (3 questions)
      { id: 'q19', question: { en: 'Say "He said he would go"', ru: 'Скажите "Он сказал, что пойдёт"' }, options: { en: ['Ал барарын айтты', 'Ал барды деди', 'Ал барат айтты', 'Ал барам деп'], ru: ['Ал барарын айтты', 'Ал барды деди', 'Ал барат айтты', 'Ал барам деп'] }, correct: 0, explanation: { en: 'Reported: -арын/-ерин + айтты', ru: 'Косвенная: -арын/-ерин + айтты' } },
      { id: 'q20', question: { en: 'Which word introduces reported speech?', ru: 'Какое слово вводит косвенную речь?' }, options: { en: ['жана', 'деп', 'менен', 'үчүн'], ru: ['жана', 'деп', 'менен', 'үчүн'] }, correct: 1, explanation: { en: 'деп = said/that (reporting)', ru: 'деп = сказал/что (передача)' } },
      { id: 'q21', question: { en: 'Say "She said she studied"', ru: 'Скажите "Она сказала, что училась"' }, options: { en: ['Ал окуганын айтты', 'Ал окуду деди', 'Ал окуйт айтты', 'Ал окуп жатат деп'], ru: ['Ал окуганын айтты', 'Ал окуду деди', 'Ал окуйт айтты', 'Ал окуп жатат деп'] }, correct: 0, explanation: { en: 'Perfect in reported: -ганын', ru: 'Перфект в косвенной: -ганын' } },

      // Reciprocal Voice (2 questions)
      { id: 'q22', question: { en: 'Form reciprocal: көр (see)', ru: 'Образуйте взаимный залог: көр (видеть)' }, options: { en: ['көрүш', 'көрүл', 'көрсөт', 'көрбө'], ru: ['көрүш', 'көрүл', 'көрсөт', 'көрбө'] }, correct: 0, explanation: { en: 'Reciprocal: verb + ш/иш', ru: 'Взаимный: глагол + ш/иш' } },
      { id: 'q23', question: { en: 'What does reciprocal voice show?', ru: 'Что показывает взаимный залог?' }, options: { en: ['one-way action', 'mutual action', 'passive action', 'causative action'], ru: ['одностороннее действие', 'взаимное действие', 'страдательное действие', 'побудительное действие'] }, correct: 1, explanation: { en: 'Reciprocal = each other', ru: 'Взаимный = друг друга' } },

      // Reflexive Voice (2 questions)
      { id: 'q24', question: { en: 'Form reflexive: жуу (wash)', ru: 'Образуйте возвратный залог: жуу (мыть)' }, options: { en: ['жуун', 'жуул', 'жуут', 'жууш'], ru: ['жуун', 'жуул', 'жуут', 'жууш'] }, correct: 0, explanation: { en: 'Reflexive: verb + н/ын/ин', ru: 'Возвратный: глагол + н/ын/ин' } },
      { id: 'q25', question: { en: 'What does reflexive voice show?', ru: 'Что показывает возвратный залог?' }, options: { en: ['action to others', 'action to oneself', 'mutual action', 'caused action'], ru: ['действие на других', 'действие на себя', 'взаимное действие', 'побуждённое действие'] }, correct: 1, explanation: { en: 'Reflexive = to oneself', ru: 'Возвратный = на себя' } },

      // Concessive Clauses (3 questions)
      { id: 'q26', question: { en: 'What does "-са да" mean?', ru: 'Что означает "-са да"?' }, options: { en: ['because', 'although', 'therefore', 'when'], ru: ['потому что', 'хотя', 'поэтому', 'когда'] }, correct: 1, explanation: { en: '-са да = although/even though', ru: '-са да = хотя/несмотря на' } },
      { id: 'q27', question: { en: 'Say "even though it\'s cold"', ru: 'Скажите "хотя холодно"' }, options: { en: ['Суук болсо да', 'Суук болгондо', 'Суук үчүн', 'Суук менен'], ru: ['Суук болсо да', 'Суук болгондо', 'Суук үчүн', 'Суук менен'] }, correct: 0, explanation: { en: 'Concessive: -са/-се + да/де', ru: 'Уступительное: -са/-се + да/де' } },
      { id: 'q28', question: { en: 'Complete: "Although I\'m tired, I work"', ru: 'Завершите: "Хотя я устал, я работаю"' }, options: { en: ['Чарчасам да, иштейм', 'Чарчадым, иштейм', 'Чарчаймын, иштейм', 'Чарчап жатам, иштейм'], ru: ['Чарчасам да, иштейм', 'Чарчадым, иштейм', 'Чарчаймын, иштейм', 'Чарчап жатам, иштейм'] }, correct: 0, explanation: { en: 'Use -сам да for concession', ru: 'Используйте -сам да для уступки' } },

      // Desiderative Mood (3 questions)
      { id: 'q29', question: { en: 'Form desiderative: бар (go)', ru: 'Образуйте желательное: бар (идти)' }, options: { en: ['баргым келет', 'барамын', 'бардым', 'барууну каалайм'], ru: ['баргым келет', 'барамын', 'бардым', 'барууну каалайм'] }, correct: 0, explanation: { en: 'Desiderative: verb + гым/гим келет', ru: 'Желательное: глагол + гым/гим келет' } },
      { id: 'q30', question: { en: 'What does "-гым келет" express?', ru: 'Что выражает "-гым келет"?' }, options: { en: ['obligation', 'desire/want', 'ability', 'permission'], ru: ['обязательство', 'желание/хотение', 'способность', 'разрешение'] }, correct: 1, explanation: { en: '-гым келет = want to', ru: '-гым келет = хочу' } },
      { id: 'q31', question: { en: 'Say "I want to study"', ru: 'Скажите "Я хочу учиться"' }, options: { en: ['Мага окугум келет', 'Мен окуйм', 'Мен окудум', 'Мен окуу керек'], ru: ['Мага окугум келет', 'Мен окуйм', 'Мен окудум', 'Мен окуу керек'] }, correct: 0, explanation: { en: 'Desiderative: мага + verb-гум келет', ru: 'Желательное: мага + глагол-гум келет' } },

      // Mixed Review (4 questions)
      { id: 'q32', question: { en: 'Which is passive?', ru: 'Какой является страдательным?' }, options: { en: ['жазыл (be written)', 'жаздыр (make write)', 'жазыш (write together)', 'жазуун (write for self)'], ru: ['жазыл (быть написанным)', 'жаздыр (заставить писать)', 'жазыш (писать вместе)', 'жазуун (писать для себя)'] }, correct: 0, explanation: { en: '-ыл/-ил = passive voice', ru: '-ыл/-ил = страдательный залог' } },
      { id: 'q33', question: { en: 'Choose modal for "should"', ru: 'Выберите модальное для "следует"' }, options: { en: ['керек (must)', 'мүмкүн (can)', 'тийиш (should)', 'каалайм (want)'], ru: ['керек (должен)', 'мүмкүн (можно)', 'тийиш (следует)', 'каалайм (хочу)'] }, correct: 2, explanation: { en: 'тийиш = should/ought to', ru: 'тийиш = следует/должен' } },
      { id: 'q34', question: { en: 'Perfect tense marker?', ru: 'Маркер перфектного времени?' }, options: { en: ['-ды/-ди (past)', '-ган/-ген (perfect)', '-ат/-эт (future)', '-п жатам (continuous)'], ru: ['-ды/-ди (прошедшее)', '-ган/-ген (перфект)', '-ат/-эт (будущее)', '-п жатам (длительное)'] }, correct: 1, explanation: { en: '-ган/-ген = perfect/experience', ru: '-ган/-ген = перфект/опыт' } },
      { id: 'q35', question: { en: 'Say "We saw each other"', ru: 'Скажите "Мы виделись"' }, options: { en: ['Биз көрүштүк', 'Биз көрдүк', 'Биз көрбөдүк', 'Биз көрсөттүк'], ru: ['Биз көрүштүк', 'Биз көрдүк', 'Биз көрбөдүк', 'Биз көрсөттүк'] }, correct: 0, explanation: { en: 'Reciprocal: көрүш + past', ru: 'Взаимный: көрүш + прошедшее' } }
    ]
  },

  // ===== B2 LEVEL - SYNTAX & MORPHOLOGY LESSONS =====
  {
    id: 'b2_lesson_01',
    level: 'B2',
    category: 'syntax',
    order: 1,
    title: { en: 'Complex Conditional Sentences (Unreal Conditions)', ru: 'Сложные условные предложения (нереальные условия)' },
    description: { en: 'Express hypothetical and contrary-to-fact conditions', ru: 'Выражение гипотетических и противоречащих фактам условий' },
    theory: {
      en: `Unreal/hypothetical conditionals express situations contrary to reality.\\n\\n**Pattern:** Эгер + [past/perfect] + болсо, [would/could result]\\n\\n**Example:** Эгер акчам болсо, үй сатып алмакмын. (If I had money, I would buy a house.)\\n\\nUse past tense in condition clause even though referring to present/future unreal situation.`,
      ru: `Нереальные/гипотетические условные предложения выражают ситуации, противоречащие реальности.\\n\\n**Схема:** Эгер + [прошедшее/перфект] + болсо, [результат с бы]\\n\\n**Пример:** Эгер акчам болсо, үй сатып алмакмын. (Если бы у меня были деньги, я бы купил дом.)\\n\\nИспользуйте прошедшее время в условии, даже если речь о настоящем/будущем нереальном.`
    },
    examples: [
      { kyrgyz: 'Эгер сен келген болсоң, мен сага жардам бермекмин.', translation: { en: 'If you had come, I would have helped you.', ru: 'Если бы ты пришёл, я бы тебе помог.' } },
      { kyrgyz: 'Эгер убакыт болсо, саякат кылмакпын.', translation: { en: 'If I had time, I would travel.', ru: 'Если бы было время, я бы путешествовал.' } }
    ],
    vocabulary: ['болсо', 'болгон болсо', 'макмын', 'мекмин'],
    quiz: [
      { id: 'q1', question: { en: 'How to express "would" in Kyrgyz?', ru: 'Как выразить "бы" в кыргызском?' }, options: { en: ['Use -макмын/-мекмин', 'Use -ат/-эт', 'Use -ды/-ди', 'Use -ган/-ген'], ru: ['Используйте -макмын/-мекмин', 'Используйте -ат/-эт', 'Используйте -ды/-ди', 'Используйте -ган/-ген'] }, correct: 0 },
      { id: 'q2', question: { en: 'Which tense in unreal condition?', ru: 'Какое время в нереальном условии?' }, options: { en: ['future', 'present', 'past', 'imperative'], ru: ['будущее', 'настоящее', 'прошедшее', 'повелительное'] }, correct: 2 }
    ]
  },

  {
    id: 'b2_lesson_02',
    level: 'B2',
    category: 'morphology',
    order: 2,
    title: { en: 'Evidentiality (-птыр/-пт��р)', ru: 'Пересказывательность (-птыр/-птир)' },
    description: { en: 'Report information from secondhand sources', ru: 'Передача информации из вторичных источников' },
    theory: {
      en: `Evidential mood marks information the speaker learned from others (hearsay).\\n\\n**Suffix:** -птыр/-птир (or -пт��р after vowels)\\n\\n**Example:** Ал келиптир. (He came, they say / I heard he came.)\\n\\nThis is different from direct past (-ды/-ди) which implies firsthand knowledge.`,
      ru: `Пересказывательное наклонение обозначает информацию, которую говорящий узнал от других (слухи).\\n\\n**Суффикс:** -птыр/-птир (или -птир после гласных)\\n\\n**Пример:** Ал келиптир. (Он пришёл, говорят / Я слышал, что он пришёл.)\\n\\nЭто отличается от прямого прошедшего (-ды/-ди), которое подразумевает личное знание.`
    },
    examples: [
      { kyrgyz: 'Жамгыр жаап жатыптыр.', translation: { en: 'It is raining, I heard.', ru: 'Дождь идёт, говорят.' } },
      { kyrgyz: 'Ал бай болуптур.', translation: { en: 'He became rich, they say.', ru: 'Он стал богатым, говорят.' } }
    ],
    vocabulary: ['келиптир', 'барыптыр', 'жаап жатыптыр', 'болуптур'],
    quiz: [
      { id: 'q1', question: { en: 'What does -птыр/-птир mark?', ru: 'Что обозначает -птыр/-птир?' }, options: { en: ['firsthand knowledge', 'secondhand information', 'future action', 'command'], ru: ['личное знание', 'информация из вторых рук', 'будущее действие', 'команда'] }, correct: 1 },
      { id: 'q2', question: { en: 'Say "He left, I heard"', ru: 'Скажите "Он ушёл, говорят"' }, options: { en: ['Ал кетти', 'Ал кетиптир', 'Ал кетет', 'Ал кетсин'], ru: ['Ал кетти', 'Ал кетиптир', 'Ал кетет', 'Ал кетсин'] }, correct: 1 }
    ]
  },

  {
    id: 'b2_lesson_03',
    level: 'B2',
    category: 'morphology',
    order: 3,
    title: { en: 'Presumptive Mood (-ар/-ер экен)', ru: 'Предположительное наклонение (-ар/-ер экен)' },
    description: { en: 'Express assumptions and inferences', ru: 'Выражение предположений и выводов' },
    theory: {
      en: `Presumptive mood expresses speaker's inference or assumption based on evidence.\\n\\n**Pattern:** Verb + ар/ер экен\\n\\n**Example:** Ал келер экен. (He will probably come / It seems he'll come.)\\n\\nUse when you conclude something from signs/evidence but didn't witness it directly.`,
      ru: `Предположительное наклонение выражает вывод или предположение говорящего на основе свидетельств.\\n\\n**Схема:** Глагол + ар/ер экен\\n\\n**Пример:** Ал келер экен. (Он, вероятно, придёт / Похоже, он придёт.)\\n\\nИспользуется, когда вы делаете вывод из признаков/свидетельств, но не наблюдали напрямую.`
    },
    examples: [
      { kyrgyz: 'Ал ооруп калган экен.', translation: { en: 'He seems to have gotten sick.', ru: 'Он, похоже, заболел.' } },
      { kyrgyz: 'Жамгыр жааган экен.', translation: { en: 'It appears it rained.', ru: 'Похоже, дождь прошёл.' } }
    ],
    vocabulary: ['экен', 'калган экен', 'жааган экен', 'болгон экен'],
    quiz: [
      { id: 'q1', question: { en: 'What does "экен" express?', ru: 'Что выражает "экен"?' }, options: { en: ['certainty', 'inference/assumption', 'command', 'desire'], ru: ['уверенность', 'вывод/предположение', 'команда', 'желание'] }, correct: 1 },
      { id: 'q2', question: { en: 'Say "It seems he left"', ru: 'Скажите "Похоже, он ушёл"' }, options: { en: ['Ал кетти', 'Ал кеткен экен', 'Ал кетсин', 'Ал кетет'], ru: ['Ал кетти', 'Ал кеткен экен', 'Ал кетсин', 'Ал кетет'] }, correct: 1 }
    ]
  },

  {
    id: 'b2_lesson_04',
    level: 'B2',
    category: 'syntax',
    order: 4,
    title: { en: 'Complex Temporal Clauses', ru: 'Сложные временные придаточные' },
    description: { en: 'Express complex time relationships between actions', ru: 'Выражение сложных временных отношений между действиями' },
    theory: {
      en: `Beyond simple "after" (-гандан кийин), Kyrgyz has multiple temporal constructions:\\n\\n**-ганча / -генче** = while, during\\n**-ганда / -генде** = when (at the moment)\\n**-ганга чейин** = until, before\\n\\n**Example:** Мен иштеп жатканда, ал келди. (While I was working, he came.)`,
      ru: `Кроме простого "после" (-гандан кийин), в кыргызском есть множество временных конструкций:\\n\\n**-ганча / -генче** = пока, в течение\\n**-ганда / -генде** = когда (в момент)\\n**-ганга чейин** = до, прежде чем\\n\\n**Пример:** Мен иштеп жатканда, ал келди. (Пока я работал, он пришёл.)`
    },
    examples: [
      { kyrgyz: 'Мен үйгө келгенче, тамак жасап койдум.', translation: { en: 'Before coming home, I prepared food.', ru: 'Перед тем как прийти домой, я приготовил еду.' } },
      { kyrgyz: 'Окуп жатканда, үн чыкпа.', translation: { en: 'Don\'t make noise while studying.', ru: 'Не шуми, пока учишься.' } }
    ],
    vocabulary: ['жатканда', 'келгенче', 'чейин', 'учурунда'],
    quiz: [
      { id: 'q1', question: { en: 'What does "-ганда/-генде" mean?', ru: 'Что означает "-ганда/-генде"?' }, options: { en: ['after', 'when/while', 'because', 'if'], ru: ['после', 'когда/пока', 'потому что', 'если'] }, correct: 1 },
      { id: 'q2', question: { en: 'Say "while working"', ru: 'Скажите "пока работаю"' }, options: { en: ['иштеп жатканда', 'иштегенден кийин', 'иштөө үчүн', 'иштеген экен'], ru: ['иштеп жатканда', 'иштегенден кийин', 'иштөө үчүн', 'иштеген экен'] }, correct: 0 }
    ]
  },

  {
    id: 'b2_lesson_05',
    level: 'B2',
    category: 'morphology',
    order: 5,
    title: { en: 'Optative Mood (-гай/-гей/-кай/-кей)', ru: 'Желательное наклонение (-гай/-гей/-кай/-кей)' },
    description: { en: 'Express wishes and hopes', ru: 'Выражение пожеланий и надежд' },
    theory: {
      en: `Optative mood expresses wishes, hopes, or prayers (may/let).\\n\\n**Suffixes:** -гай/-гей/-кай/-кей (vowel harmony)\\n\\n**Example:** Ал келгей! (May he come! / Let him come!)\\n\\nUsed for blessings, wishes, and polite commands about third person.`,
      ru: `Желательное наклонение выражает желания, надежды или молитвы (пусть/да).\\n\\n**Суффиксы:** -гай/-гей/-кай/-кей (гармония гласных)\\n\\n**Пример:** Ал келгей! (Пусть он придёт! / Да придёт он!)\\n\\nИспользуется для благословений, пожеланий и вежливых команд о третьем лице.`
    },
    examples: [
      { kyrgyz: 'Кудай жардам бергей!', translation: { en: 'May God help!', ru: 'Да поможет Бог!' } },
      { kyrgyz: 'Бардыгы жакшы болгой.', translation: { en: 'May everything be well.', ru: 'Пусть всё будет хорошо.' } }
    ],
    vocabulary: ['келгей', 'болгой', 'жакшылыкты каалагай', 'бергей'],
    quiz: [
      { id: 'q1', question: { en: 'What does optative mood express?', ru: 'Что выражает желательное наклонение?' }, options: { en: ['facts', 'wishes/hopes', 'assumptions', 'commands'], ru: ['факты', 'желания/надежды', 'предположения', 'команды'] }, correct: 1 },
      { id: 'q2', question: { en: 'Say "May he succeed"', ru: 'Скажите "Пусть он добьётся успеха"' }, options: { en: ['Ал ийгиликтүү болот', 'Ал ийгиликтүү болгой', 'Ал ийгиликтүү болду', 'Ал ийгиликтүү болсун'], ru: ['Ал ийгиликтүү болот', 'Ал ийгиликтүү болгой', 'Ал ийгиликтүү болду', 'Ал ийгиликтүү болсун'] },correct: 1 }
    ]
  },

  {
    id: 'b2_lesson_06',
    level: 'B2',
    category: 'syntax',
    order: 6,
    title: { en: 'Correlative Conjunctions', ru: 'Парные союзы' },
    description: { en: 'Use paired conjunctions for complex relationships', ru: 'Использование парных союзов для сложных отношений' },
    theory: {
      en: `Correlative conjunctions work in pairs to show relationships:\\n\\n**бирок...ошого карабастан** = but...nevertheless\\n**же...же** = either...or\\n**да...да** = both...and\\n\\n**Example:** Мен да, сен да барабыз. (Both you and I will go.)`,
      ru: `Парные союзы работают в паре для выражения отношений:\\n\\n**бирок...ошого карабастан** = но...тем не менее\\n**же...же** = либо...либо\\n**да...да** = и...и (оба)\\n\\n**Пример:** Мен да, сен да барабыз. (И ты, и я пойдём.)`
    },
    examples: [
      { kyrgyz: 'Же бүгүн, же эртең барабыз.', translation: { en: 'We\'ll go either today or tomorrow.', ru: 'Мы пойдём либо сегодня, либо завтра.' } },
      { kyrgyz: 'Ал да, мен да окуйбуз.', translation: { en: 'Both he and I study.', ru: 'И он, и я учимся.' } }
    ],
    vocabulary: ['же...же', 'да...да', 'карабастан', 'ошого'],
    quiz: [
      { id: 'q1', question: { en: 'Which means "both...and"?', ru: 'Что означает "и...и"?' }, options: { en: ['же...же', 'да...да', 'эмес...эмес', 'же...болбосо'], ru: ['же...же', 'да...да', 'эмес...эмес', 'же...болбосо'] }, correct: 1 },
      { id: 'q2', question: { en: 'Say "either this or that"', ru: 'Скажите "либо это, либо то"' }, options: { en: ['Бул да, ал да', 'Же бул, же ал', 'Бул жана ал', 'Бул бирок ал'], ru: ['Бул да, ал да', 'Же бул, же ал', 'Бул жана ал', 'Бул бирок ал'] }, correct: 1 }
    ]
  },

  {
    id: 'b2_lesson_07',
    level: 'B2',
    category: 'morphology',
    order: 7,
    title: { en: 'Verbal Adverbs (Converbs)', ru: 'Деепричастия (Конвербы)' },
    description: { en: 'Form adverbial clauses with converb constructions', ru: 'Образование обстоятельственных оборотов с конвербами' },
    theory: {
      en: `Converbs (verbal adverbs) connect actions showing manner, time, or cause:\\n\\n**-п/-ип/-уп/-үп** = and (simultaneous)\\n**-а/-е/-й (while)** = continuous action\\n**-ып/-ип + auxiliary** = various aspects\\n\\n**Example:** Күлүп сүйлөдү. (He spoke laughing / while laughing.)`,
      ru: `Конвербы (деепричастия) связывают действия, показывая способ, время или причину:\\n\\n**-п/-ип/-уп/-үп** = и (одновременно)\\n**-а/-е/-й (пока)** = длительное действие\\n**-ып/-ип + вспомогательный** = различные аспекты\\n\\n**Пример:** Күлүп сүйлөдү. (Он говорил смеясь / пока смеялся.)`
    },
    examples: [
      { kyrgyz: 'Үйгө келип, эс алдым.', translation: { en: 'Having come home, I rested.', ru: 'Придя домой, я отдохнул.' } },
      { kyrgyz: 'Жүгүрө келди.', translation: { en: 'He came running.', ru: 'Он прибежал (пришёл бегом).' } }
    ],
    vocabulary: ['келип', 'барып', 'жүгүрө', 'күлүп'],
    quiz: [
      { id: 'q1', question: { en: 'What does -п/-ип converb show?', ru: 'Что показывает конверб -п/-ип?' }, options: { en: ['simultaneous action', 'future action', 'passive voice', 'question'], ru: ['одновременное действие', 'будущее действие', 'страдательный залог', 'вопрос'] }, correct: 0 },
      { id: 'q2', question: { en: 'Say "reading, I learned"', ru: 'Скажите "читая, я узнал"' }, options: { en: ['Окуп билдим', 'Окуйм билдим', 'Окуду билдим', 'Окуган билдим'], ru: ['Окуп билдим', 'Окуйм билдим', 'Окуду билдим', 'Окуган билдим'] }, correct: 0 }
    ]
  },

  {
    id: 'b2_lesson_08',
    level: 'B2',
    category: 'syntax',
    order: 8,
    title: { en: 'Nominalized Clauses', ru: 'Субстантивированные придаточные' },
    description: { en: 'Turn clauses into noun phrases', ru: 'Превращение придаточных в именные обороты' },
    theory: {
      en: `Nominalization turns verb phrases into noun phrases that can take case markers:\\n\\n**-уу/-үү** = infinitive/gerund form\\n**-ган/-ген + case** = completed action as noun\\n\\n**Example:** Окуу мага жагат. (Studying pleases me / I like studying.)\\n\\nСен келгениңе кубандым. (I'm happy at your coming / that you came.)`,
      ru: `Субстантивация превращает глагольные обороты в именные, которые могут принимать падежные окончания:\\n\\n**-уу/-үү** = инфинитив/герундий\\n**-ган/-ген + падеж** = завершённое действие как существительное\\n\\n**Пример:** Окуу мага жагат. (Учёба мне нравится / Я люблю учиться.)\\n\\nСен келгениңе кубандым. (Я рад твоему приходу / что ты пришёл.)`
    },
    examples: [
      { kyrgyz: 'Жүрүү пайдалуу.', translation: { en: 'Walking is useful.', ru: 'Ходьба полезна.' } },
      { kyrgyz: 'Анын баргандыгын угдум.', translation: { en: 'I heard (the fact) that he left.', ru: 'Я слышал (о том), что он ушёл.' } }
    ],
    vocabulary: ['окуу', 'жүрүү', 'келгениңе', 'баргандыгын'],
    quiz: [
      { id: 'q1', question: { en: 'What does -уу/-үү create?', ru: 'Что создаёт -уу/-үү?' }, options: { en: ['past tense', 'noun from verb', 'question', 'passive voice'], ru: ['прошедшее время', 'существительное из глагола', 'вопрос', 'страдательный залог'] }, correct: 1 },
      { id: 'q2', question: { en: 'Say "I like reading"', ru: 'Скажите "Мне нравится читать"' }, options: { en: ['Окуу мага жагат', 'Окуйм мага жагат', 'Окудум мага жагат', 'Окуган мага жагат'], ru: ['Окуу мага жагат', 'Окуйм мага жагат', 'Окудум мага жагат', 'Окуган мага жагат'] }, correct: 0 }
    ]
  }

  // Total: A1 (14 + 1 test), A2 (11 + 1 test), B1 (11 + 1 test) ✓, B2 (8 lessons, test pending)
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
