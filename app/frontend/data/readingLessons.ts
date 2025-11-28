// Reading comprehension lessons for all CEFR levels (A1-C1)
// Based on comprehensive reading development plan

export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1'

export interface ReadingLesson {
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
  text: string // Kyrgyz text
  textType: {
    en: string
    ru: string
  }
  questions: Array<{
    id: string
    question: string // Kyrgyz question
    type: 'multiple_choice' | 'open_ended'
    options?: string[] // For multiple choice
    correct?: number // Index of correct answer for multiple choice
  }>
}

export const READING_LESSONS: ReadingLesson[] = [
  // ===== A1 LEVEL =====
  {
    id: 'a1_read_1',
    level: 'A1',
    order: 1,
    title: {
      en: 'Simple Descriptions',
      ru: 'Простые описания'
    },
    description: {
      en: 'Short descriptions of objects and people',
      ru: 'Короткие описания предметов и людей'
    },
    text: 'Бул китеп. Китеп кооз. Китеп столдо.',
    textType: {
      en: 'Simple description',
      ru: 'Простое описание'
    },
    questions: [
      {
        id: 'q1',
        question: 'Бул эмне?',
        type: 'multiple_choice',
        options: ['үй', 'китеп', 'стол'],
        correct: 1
      },
      {
        id: 'q2',
        question: 'Китеп кайда?',
        type: 'multiple_choice',
        options: ['үйдө', 'столдо', 'бакта'],
        correct: 1
      }
    ]
  },
  {
    id: 'a1_read_2',
    level: 'A1',
    order: 2,
    title: {
      en: 'About a Person',
      ru: 'О человеке'
    },
    description: {
      en: 'Simple description of a person',
      ru: 'Простое описание человека'
    },
    text: 'Бул Айда. Айда он жашта. Айда мектепте окуйт. Айданын макасы бар.',
    textType: {
      en: 'Personal description',
      ru: 'Описание человека'
    },
    questions: [
      {
        id: 'q1',
        question: 'Айданын жашы канча?',
        type: 'multiple_choice',
        options: ['беш', 'он', 'он беш'],
        correct: 1
      },
      {
        id: 'q2',
        question: 'Айда кайда окуйт?',
        type: 'multiple_choice',
        options: ['мектепте', 'үйдө', 'бакчада'],
        correct: 0
      },
      {
        id: 'q3',
        question: 'Айданын эмнеси бар?',
        type: 'multiple_choice',
        options: ['ити', 'макасы', 'коёну'],
        correct: 1
      }
    ]
  },

  // ===== A2 LEVEL =====
  {
    id: 'a2_read_1',
    level: 'A2',
    order: 1,
    title: {
      en: 'The Shepherd and the Wolf',
      ru: 'Чабан и волк'
    },
    description: {
      en: 'A simple folk tale about a shepherd',
      ru: 'Простая народная сказка о чабане'
    },
    text: 'Бир жолу бир чабан болгон. Анын үч койу бар болгон. Бир күнү бөрү келип, бир койду алып кеткен. Чабан кайгырган, бирок эки койу калган.',
    textType: {
      en: 'Folk tale excerpt',
      ru: 'Отрывок из сказки'
    },
    questions: [
      {
        id: 'q1',
        question: 'Чабандын канча койу болгон?',
        type: 'multiple_choice',
        options: ['эки', 'үч', 'төрт'],
        correct: 1
      },
      {
        id: 'q2',
        question: 'Ким койду алып кеткен?',
        type: 'multiple_choice',
        options: ['түлкү', 'бөрү', 'дөө'],
        correct: 1
      },
      {
        id: 'q3',
        question: 'Чабан эмне кылган?',
        type: 'multiple_choice',
        options: ['күлгөн', 'кайгырган', 'ырдаган'],
        correct: 1
      },
      {
        id: 'q4',
        question: 'Анын канча койу калган?',
        type: 'multiple_choice',
options: ['бир', 'эки', 'үч'],
        correct: 1
      },
      {
        id: 'q5',
        question: 'Текстте эмне жөнүндө айтылат?',
        type: 'multiple_choice',
        options: ['дөө жөнүндө', 'чабан жана бөрү жөнүндө', 'шаар жөнүндө'],
        correct: 1
      }
    ]
  },

  // ===== B1 LEVEL =====
  {
    id: 'b1_read_1',
    level: 'B1',
    order: 1,
    title: {
      en: 'Art Exhibition Opens',
      ru: 'Открытие художественной выставки'
    },
    description: {
      en: 'News article about a cultural event',
      ru: 'Новостная статья о культурном событии'
    },
    text: 'Кечээ Бишкекте "Кыргыз жери" көргөзмөсү ачылды. Көргөзмөгө ондон ашык жаш сүрөтчүлөр катышты. Алар өлкөбүздүн кооз жерлерин, улуттук салттарын сүрөткө тартышты. Көргөзмө бир айга чейин иштейт. Кире белек.',
    textType: {
      en: 'News article',
      ru: 'Новостная заметка'
    },
    questions: [
      {
        id: 'q1',
        question: 'Көргөзмө кайда ачылган?',
        type: 'multiple_choice',
        options: ['Ошто', 'Бишкекте', 'Жалал-Абадда'],
        correct: 1
      },
      {
        id: 'q2',
        question: 'Көргөзмөнүн аталышы эмне?',
        type: 'multiple_choice',
        options: ['"Кыргыз жери"', '"Кыргыз элинин салты"', '"Бишкек шаары"'],
        correct: 0
      },
      {
        id: 'q3',
        question: 'Кимдер катышкан?',
        type: 'multiple_choice',
        options: ['чоң сүрөтчүлөр', 'жаш сүрөтчүлөр', 'студенттер'],
        correct: 1
      },
      {
        id: 'q4',
        question: 'Сүрөтчүлөр эмнени сүрөткө тартышкан?',
        type: 'multiple_choice',
        options: ['адамдарды', 'жаныбарларды', 'кооз жерлерди жана салттарды'],
        correct: 2
      },
      {
        id: 'q5',
        question: 'Көргөзмө канча убакытка иштейт?',
        type: 'multiple_choice',
        options: ['бир жумага', 'бир айга', 'эки айга'],
        correct: 1
      },
      {
        id: 'q6',
        question: '"Кире белек" деген эмнени билдирет?',
        type: 'multiple_choice',
        options: ['киресадыгым', 'кире бериңиз', 'кире бербейт'],
        correct: 0
      }
    ]
  },

  // ===== B2 LEVEL =====
  {
    id: 'b2_read_1',
    level: 'B2',
    order: 1,
    title: {
      en: 'Technology and Society',
      ru: 'Технологии и общество'
    },
    description: {
      en: 'Article about modern technology impact',
      ru: 'Статья о влиянии современных технологий'
    },
    text: 'Заманбап технологиялар коомго терең таасир тийгизүүдө. Алар жашообузду жеңилдеткени менен, жаңы маселелерди пайда кылат. Мисалы, жаштардын виртуалдык дүйнөгө көп убакыт өткөрүшү алардын коомдо иш алып баруу жөндөмүнө терс таасирин тийгизиши мүмкүн. Ошондуктан, технология менен чыныгы жашоонун ортосунда тең салмактуулукту сактоо зарыл.',
    textType: {
      en: 'Analytical article',
      ru: 'Аналитическая статья'
    },
    questions: [
      {
        id: 'q1',
        question: 'Технологиялар коомго кандай таасир тийгизишет?',
        type: 'open_ended'
      },
      {
        id: 'q2',
        question: 'Автор кандай оң жана терс таасирлерди көрсөтөт?',
        type: 'open_ended'
      },
      {
        id: 'q3',
        question: '"Виртуалдык дүйнө" деген эмнени түшүнөсүз?',
        type: 'open_ended'
      },
      {
        id: 'q4',
        question: 'Автордун негизги идеясы эмне?',
        type: 'open_ended'
      },
      {
        id: 'q5',
        question: 'Сиз автор менен макулсузбу? Эмне үчүн?',
        type: 'open_ended'
      }
    ]
  },

  // ===== C1 LEVEL =====
  {
    id: 'c1_read_1',
    level: 'C1',
    order: 1,
    title: {
      en: 'Aitmatov\'s Literary Legacy',
      ru: 'Литературное наследие Айтматова'
    },
    description: {
      en: 'Literary essay about Chingiz Aitmatov',
      ru: 'Литературное эссе о Чингизе Айтматове'
    },
    text: 'Айтматовдун чыгармачылыгы фольклордук салттар менен заманбап прозанын уникалдуу айкалышы болуп саналат. Анын образдары жалпы адамзаттык мааниге ээ болуп, жалпы адамзаттык көйгөйлөрдү көтөрөт. "Кылым карытар бир күн" повестиндеги Эдигей жана "Ак кеме" деген жомок — бул адамзаттын тагдыры жөнүндөгү философиялык ой жүгүртүү. Автор аркылуу улуттук байлык дүйнөлүк маданияттын бөлүгүнө айланат.',
    textType: {
      en: 'Literary essay',
      ru: 'Литературное эссе'
    },
    questions: [
      {
        id: 'q1',
        question: 'Эсседе Айтматовдун чыгармачылыгы кандай сыпатталат?',
        type: 'open_ended'
      },
      {
        id: 'q2',
        question: '"Жалпы адамзаттык маани" деген эмнени түшүнөсүз? Тексттен мисал келтириңиз.',
        type: 'open_ended'
      },
      {
        id: 'q3',
        question: 'Автор "Ак кеме" дегенди эмне кылып түшүндүрөт?',
        type: 'open_ended'
      },
      {
        id: 'q4',
        question: 'Эсседеги негизги тезис кандай?',
        type: 'open_ended'
      },
      {
        id: 'q5',
        question: 'Сиздин оюңузда, эмне үчүн Айтматовдун чыгармалары дүйнөлүк деп эсептелет? Текстке таянып жооп бериңиз.',
        type: 'open_ended'
      }
    ]
  }
]

export function getLessonsByLevel(level: Level): ReadingLesson[] {
  return READING_LESSONS.filter(lesson => lesson.level === level)
}

export function getLessonById(id: string): ReadingLesson | undefined {
  return READING_LESSONS.find(lesson => lesson.id === id)
}

export function getAllLevels(): Level[] {
  return ['A1', 'A2', 'B1', 'B2', 'C1']
}
