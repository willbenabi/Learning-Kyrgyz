// Bilingual placement test questions (Russian and English)
// Based on CEFR levels: A1, A2, B1, B2, C1

export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1'

export interface Question {
  id: string
  level: Level
  question: {
    en: string
    ru: string
  }
  options: {
    en: string[]
    ru: string[]
  }
  correct: number
}

export const PLACEMENT_TEST_QUESTIONS: Question[] = [
  // A1 Level (Beginner)
  {
    id: 'a1_1',
    level: 'A1',
    question: {
      en: 'What does "Салам" mean?',
      ru: 'Что означает "Салам"?'
    },
    options: {
      en: ['Hello', 'Goodbye', 'Thank you', 'Please'],
      ru: ['Здравствуйте', 'До свидания', 'Спасибо', 'Пожалуйста']
    },
    correct: 0
  },
  {
    id: 'a1_2',
    level: 'A1',
    question: {
      en: 'How do you say "Thank you" in Kyrgyz?',
      ru: 'Как сказать "Спасибо" по-кыргызски?'
    },
    options: {
      en: ['Рахмат', 'Кош', 'Жакшы', 'Ооба'],
      ru: ['Рахмат', 'Кош', 'Жакшы', 'Ооба']
    },
    correct: 0
  },
  {
    id: 'a1_3',
    level: 'A1',
    question: {
      en: 'What is the Kyrgyz word for "water"?',
      ru: 'Как будет "вода" по-кыргызски?'
    },
    options: {
      en: ['Тамак', 'Суу', 'Чай', 'Сүт'],
      ru: ['Тамак', 'Суу', 'Чай', 'Сүт']
    },
    correct: 1
  },
  {
    id: 'a1_4',
    level: 'A1',
    question: {
      en: '"Кандайсың?" means:',
      ru: '"Кандайсың?" означает:'
    },
    options: {
      en: ['How are you?', 'What is your name?', 'Where are you?', 'Who are you?'],
      ru: ['Как дела?', 'Как тебя зовут?', 'Где ты?', 'Кто ты?']
    },
    correct: 0
  },
  {
    id: 'a1_5',
    level: 'A1',
    question: {
      en: 'How do you say "yes" in Kyrgyz?',
      ru: 'Как сказать "да" по-кыргызски?'
    },
    options: {
      en: ['Жок', 'Ооба', 'Рахмат', 'Кош'],
      ru: ['Жок', 'Ооба', 'Рахмат', 'Кош']
    },
    correct: 1
  },

  // A2 Level (Elementary)
  {
    id: 'a2_1',
    level: 'A2',
    question: {
      en: 'Complete: "Мен ___ барам" (I am going to school)',
      ru: 'Дополните: "Мен ___ барам" (Я иду в школу)'
    },
    options: {
      en: ['мектепке', 'мектеп', 'мектептен', 'мектепти'],
      ru: ['мектепке', 'мектеп', 'мектептен', 'мектепти']
    },
    correct: 0
  },
  {
    id: 'a2_2',
    level: 'A2',
    question: {
      en: 'What is the plural form of "китеп" (book)?',
      ru: 'Какая форма множественного числа слова "китеп" (книга)?'
    },
    options: {
      en: ['китептер', 'китеп', 'китептен', 'китепке'],
      ru: ['китептер', 'китеп', 'китептен', 'китепке']
    },
    correct: 0
  },
  {
    id: 'a2_3',
    level: 'A2',
    question: {
      en: '"Мен бүгүн иштедим" means:',
      ru: '"Мен бүгүн иштедим" означает:'
    },
    options: {
      en: ['I will work today', 'I work today', 'I am working today', 'I worked today'],
      ru: ['Я буду работать сегодня', 'Я работаю сегодня', 'Я работаю сейчас', 'Я работал сегодня']
    },
    correct: 3
  },
  {
    id: 'a2_4',
    level: 'A2',
    question: {
      en: 'How do you say "I want to eat"?',
      ru: 'Как сказать "Я хочу есть"?'
    },
    options: {
      en: ['Мен тамак жегим келет', 'Мен тамак жедим', 'Мен тамак жейм', 'Мен тамак жеймин'],
      ru: ['Мен тамак жегим келет', 'Мен тамак жедим', 'Мен тамак жейм', 'Мен тамак жеймин']
    },
    correct: 0
  },
  {
    id: 'a2_5',
    level: 'A2',
    question: {
      en: 'What does "үй" mean?',
      ru: 'Что означает "үй"?'
    },
    options: {
      en: ['School', 'House', 'Street', 'City'],
      ru: ['Школа', 'Дом', 'Улица', 'Город']
    },
    correct: 1
  },

  // B1 Level (Intermediate)
  {
    id: 'b1_1',
    level: 'B1',
    question: {
      en: 'Which suffix indicates direction towards something?',
      ru: 'Какой суффикс указывает направление к чему-либо?'
    },
    options: {
      en: ['-ке/-ге', '-ден/-дан', '-да/-де', '-ны/-ну'],
      ru: ['-ке/-ге', '-ден/-дан', '-да/-де', '-ны/-ну']
    },
    correct: 0
  },
  {
    id: 'b1_2',
    level: 'B1',
    question: {
      en: 'Complete: "Эгер мен бай ___, үй алмакмын" (If I were rich, I would buy a house)',
      ru: 'Дополните: "Эгер мен бай ___, үй алмакмын" (Если бы я был богат, я бы купил дом)'
    },
    options: {
      en: ['болсом', 'болмок', 'болуп', 'болот'],
      ru: ['болсом', 'болмок', 'болуп', 'болот']
    },
    correct: 0
  },
  {
    id: 'b1_3',
    level: 'B1',
    question: {
      en: 'What is the passive form of "жаз" (write)?',
      ru: 'Какая пассивная форма глагола "жаз" (писать)?'
    },
    options: {
      en: ['жазыл', 'жазды', 'жазат', 'жазган'],
      ru: ['жазыл', 'жазды', 'жазат', 'жазган']
    },
    correct: 0
  },
  {
    id: 'b1_4',
    level: 'B1',
    question: {
      en: '"Окулган китеп" means:',
      ru: '"Окулган китеп" означает:'
    },
    options: {
      en: ['The book being read', 'The book that was read', 'The book to read', 'The reading book'],
      ru: ['Книга, которую читают', 'Книга, которую прочитали', 'Книга для чтения', 'Читающая книга']
    },
    correct: 1
  },
  {
    id: 'b1_5',
    level: 'B1',
    question: {
      en: 'Which ending shows possession in first person?',
      ru: 'Какое окончание показывает принадлежность в первом лице?'
    },
    options: {
      en: ['-м/-ым/-им', '-ң/-ың/-иң', '-сы/-си', '-быз/-биз'],
      ru: ['-м/-ым/-им', '-ң/-ың/-иң', '-сы/-си', '-быз/-биз']
    },
    correct: 0
  },

  // B2 Level (Upper Intermediate)
  {
    id: 'b2_1',
    level: 'B2',
    question: {
      en: 'Which form expresses "having done something"?',
      ru: 'Какая форма выражает "сделав что-то"?'
    },
    options: {
      en: ['-ып/-ип/-уп', '-ар/-ер/-ор', '-са/-се', '-ган/-ген'],
      ru: ['-ып/-ип/-уп', '-ар/-ер/-ор', '-са/-се', '-ган/-ген']
    },
    correct: 0
  },
  {
    id: 'b2_2',
    level: 'B2',
    question: {
      en: 'Complete the idiomatic expression: "Тилин ___ билбейт" (He doesn\'t know what to say)',
      ru: 'Дополните идиоматическое выражение: "Тилин ___ билбейт" (Он не знает, что сказать)'
    },
    options: {
      en: ['кайдан', 'качан', 'кантип', 'ким'],
      ru: ['кайдан', 'качан', 'кантип', 'ким']
    },
    correct: 0
  },
  {
    id: 'b2_3',
    level: 'B2',
    question: {
      en: 'What is the difference between "көргөн" and "көрүп жаткан"?',
      ru: 'В чем разница между "көргөн" и "көрүп жаткан"?'
    },
    options: {
      en: ['Past perfect vs present continuous', 'Simple past vs past continuous', 'Present perfect vs present continuous', 'Past vs future'],
      ru: ['Прошедшее совершенное и настоящее продолженное', 'Простое прошедшее и прошедшее продолженное', 'Настоящее совершенное и настоящее продолженное', 'Прошедшее и будущее']
    },
    correct: 0
  },
  {
    id: 'b2_4',
    level: 'B2',
    question: {
      en: 'Which suffix combination creates "supposedly/apparently"?',
      ru: 'Какая комбинация суффиксов создает значение "предположительно/по-видимому"?'
    },
    options: {
      en: ['-ган/-ген + экен', '-ып/-ип + жатат', '-мак/-мек + чы', '-са/-се + болот'],
      ru: ['-ган/-ген + экен', '-ып/-ип + жатат', '-мак/-мек + чы', '-са/-се + болот']
    },
    correct: 0
  },
  {
    id: 'b2_5',
    level: 'B2',
    question: {
      en: 'What does "болбосо" mean in conditional sentences?',
      ru: 'Что означает "болбосо" в условных предложениях?'
    },
    options: {
      en: ['Otherwise', 'Therefore', 'However', 'Moreover'],
      ru: ['Иначе', 'Поэтому', 'Однако', 'Более того']
    },
    correct: 0
  },

  // C1 Level (Advanced)
  {
    id: 'c1_1',
    level: 'C1',
    question: {
      en: 'Identify the correct usage of archaic/literary Kyrgyz:',
      ru: 'Определите правильное использование архаичного/литературного кыргызского:'
    },
    options: {
      en: ['"Келгинчи" instead of "Кел"', '"Барганчы" instead of "Барган"', '"Келе жаткан" instead of "Келген"', '"Баратканда" instead of "Барганда"'],
      ru: ['"Келгинчи" вместо "Кел"', '"Барганчы" вместо "Барган"', '"Келе жаткан" вместо "Келген"', '"Баратканда" вместо "Барганда"']
    },
    correct: 0
  },
  {
    id: 'c1_2',
    level: 'C1',
    question: {
      en: 'Complete the proverb: "Тилден ___, элден тайма"',
      ru: 'Дополните пословицу: "Тилден ___, элден тайма"'
    },
    options: {
      en: ['тайма', 'качма', 'кайтпа', 'чыкпа'],
      ru: ['тайма', 'качма', 'кайтпа', 'чыкпа']
    },
    correct: 0
  },
  {
    id: 'c1_3',
    level: 'C1',
    question: {
      en: 'Which phrase indicates subtle disagreement in formal speech?',
      ru: 'Какая фраза указывает на тонкое несогласие в формальной речи?'
    },
    options: {
      en: ['"Туура, бирок..."', '"Жок, ал туура эмес"', '"Макул эмесмин"', '"Ойлойм дейсизби"'],
      ru: ['"Туура, бирок..."', '"Жок, ал туура эмес"', '"Макул эмесмин"', '"Ойлойм дейсизби"']
    },
    correct: 0
  },
  {
    id: 'c1_4',
    level: 'C1',
    question: {
      en: 'What does "алып барууда" express in formal contexts?',
      ru: 'Что выражает "алып барууда" в формальных контекстах?'
    },
    options: {
      en: ['Ongoing process/development', 'Future intention', 'Past completed action', 'Conditional statement'],
      ru: ['Текущий процесс/развитие', 'Будущее намерение', 'Завершенное прошедшее действие', 'Условное заявление']
    },
    correct: 0
  },
  {
    id: 'c1_5',
    level: 'C1',
    question: {
      en: 'What is the formal way to express "according to"?',
      ru: 'Как формально выразить "согласно"?'
    },
    options: {
      en: ['боюнча', 'үчүн', 'менен', 'жөнүндө'],
      ru: ['боюнча', 'үчүн', 'менен', 'жөнүндө']
    },
    correct: 0
  }
]
