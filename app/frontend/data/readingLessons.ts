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
  {
    id: 'a1_read_3',
    level: 'A1',
    order: 3,
    title: {
      en: 'My Family',
      ru: 'Моя семья'
    },
    description: {
      en: 'Simple text about family members',
      ru: 'Простой текст о членах семьи'
    },
    text: 'Менин үй-бүлөм чоң. Менин атам, апам, агам жана эжем бар. Атам иштейт. Апам үйдө. Агам окуйт. Эжем кичинекей.',
    textType: {
      en: 'Family description',
      ru: 'Описание семьи'
    },
    questions: [
      {
        id: 'q1',
        question: 'Үй-бүлө кандай?',
        type: 'multiple_choice',
        options: ['кичине', 'чоң', 'орто'],
        correct: 1
      },
      {
        id: 'q2',
        question: 'Кимдер бар?',
        type: 'multiple_choice',
        options: ['ата, апа, ага', 'ата, апа, эже, ага', 'ата жана апа гана'],
        correct: 1
      },
      {
        id: 'q3',
        question: 'Ким иштейт?',
        type: 'multiple_choice',
        options: ['апам', 'атам', 'агам'],
        correct: 1
      }
    ]
  },
  {
    id: 'a1_read_4',
    level: 'A1',
    order: 4,
    title: {
      en: 'In the Market',
      ru: 'На базаре'
    },
    description: {
      en: 'Simple shopping dialogue',
      ru: 'Простой диалог о покупках'
    },
    text: 'Бул базар. Базарда көп нерсе бар. Алма бар. Алма ширин. Нан бар. Нан жаңы. Сүт бар. Сүт таза.',
    textType: {
      en: 'Market description',
      ru: 'Описание базара'
    },
    questions: [
      {
        id: 'q1',
        question: 'Базарда эмне бар?',
        type: 'multiple_choice',
        options: ['кит��п', 'алма, нан, сүт', 'үй'],
        correct: 1
      },
      {
        id: 'q2',
        question: 'Алма кандай?',
        type: 'multiple_choice',
        options: ['ширин', 'ачуу', 'таттуу'],
        correct: 0
      },
      {
        id: 'q3',
        question: 'Нан кандай?',
        type: 'multiple_choice',
        options: ['эски', 'жаңы', 'суук'],
        correct: 1
      }
    ]
  },
  {
    id: 'a1_read_5',
    level: 'A1',
    order: 5,
    title: {
      en: 'The Weather Today',
      ru: 'Погода сегодня'
    },
    description: {
      en: 'Simple weather description',
      ru: 'Простое описание погоды'
    },
    text: 'Бүгүн жакшы күн. Асман ачык. Күн жылуу. Жел жок. Биз бакка барабыз.',
    textType: {
      en: 'Weather description',
      ru: 'Описание погоды'
    },
    questions: [
      {
        id: 'q1',
        question: 'Бүгүн кандай күн?',
        type: 'multiple_choice',
        options: ['жаман', 'жакшы', 'суук'],
        correct: 1
      },
      {
        id: 'q2',
        question: 'Күн кандай?',
        type: 'multiple_choice',
        options: ['суук', 'жылуу', 'ысык'],
        correct: 1
      },
      {
        id: 'q3',
        question: 'Биз кайда барабыз?',
        type: 'multiple_choice',
        options: ['үйгө', 'мектепке', 'бакка'],
        correct: 2
      }
    ]
  },
  {
    id: 'a1_read_6',
    level: 'A1',
    order: 6,
    title: {
      en: 'My Room',
      ru: 'Моя комната'
    },
    description: {
      en: 'Description of a room',
      ru: 'Описание комнаты'
    },
    text: 'Менин бөлмөм чоң. Бөлмөдө төшөк, стол жана орундук бар. Столдо китептер бар. Дубалда сүрөт бар. Бөлмө таза.',
    textType: {
      en: 'Room description',
      ru: 'Описание комнаты'
    },
    questions: [
      {
        id: 'q1',
        question: 'Бөлмө кандай?',
        type: 'multiple_choice',
        options: ['кичине', 'чоң', 'караңгы'],
        correct: 1
      },
      {
        id: 'q2',
        question: 'Бөлмөдө эмне бар?',
        type: 'multiple_choice',
        options: ['төшөк, стол, орундук', 'телевизор', 'ойноочуктар'],
        correct: 0
      },
      {
        id: 'q3',
        question: 'Дубалда эмне бар?',
        type: 'multiple_choice',
        options: ['китептер', 'сүрөт', 'саат'],
        correct: 1
      }
    ]
  },
  {
    id: 'a1_read_7',
    level: 'A1',
    order: 7,
    title: {
      en: 'Animals',
      ru: 'Животные'
    },
    description: {
      en: 'Simple text about animals',
      ru: 'Простой текст о животных'
    },
    text: 'Мен жаныбарларды жакшы көрөм. Менин итим бар. Анын аты Акбар. Акбар чоң. Акбар акылдуу. Акбар менен ойнойм.',
    textType: {
      en: 'Animal description',
      ru: 'Описание животного'
    },
    questions: [
      {
        id: 'q1',
        question: 'Менин эмнем бар?',
        type: 'multiple_choice',
        options: ['мышыгым', 'итим', 'куш��м'],
        correct: 1
      },
      {
        id: 'q2',
        question: 'Иттин аты эмне?',
        type: 'multiple_choice',
        options: ['Боз', 'Акбар', 'Көкжал'],
        correct: 1
      },
      {
        id: 'q3',
        question: 'Акбар кандай?',
        type: 'multiple_choice',
        options: ['кичине', 'чоң жана акылдуу', 'жаман'],
        correct: 1
      }
    ]
  },
  {
    id: 'a1_read_8',
    level: 'A1',
    order: 8,
    title: {
      en: 'My Day',
      ru: 'Мой день'
    },
    description: {
      en: 'Daily routine description',
      ru: 'Описание распорядка дня'
    },
    text: 'Мен эрте туром. Жууну��м. Тамак жейм. Мектепке барам. Мектепте окуйм. Үйгө келем. Эс алам.',
    textType: {
      en: 'Daily routine',
      ru: 'Распорядок дня'
    },
    questions: [
      {
        id: 'q1',
        question: 'Мен качан туром?',
        type: 'multiple_choice',
        options: ['кечинде', 'эрте', 'түштө'],
        correct: 1
      },
      {
        id: 'q2',
        question: 'Мен кайда барам?',
        type: 'multiple_choice',
        options: ['дүкөнгө', 'мектепке', 'паркка'],
        correct: 1
      },
      {
        id: 'q3',
        question: 'Үйдө эмне кылам?',
        type: 'multiple_choice',
        options: ['иштейм', 'окуйм', 'эс алам'],
        correct: 2
      }
    ]
  },
  {
    id: 'a1_read_9',
    level: 'A1',
    order: 9,
    title: {
      en: 'Colors',
      ru: 'Цвета'
    },
    description: {
      en: 'Simple text about colors',
      ru: 'Простой текст о цветах'
    },
    text: 'Асман көк. Чөп жашыл. Гүл кызыл. Кар ак. Түн караңгы. Мен түстөрдү жакшы көрөм.',
    textType: {
      en: 'Colors description',
      ru: 'Описание цветов'
    },
    questions: [
      {
        id: 'q1',
        question: 'Асман кандай?',
        type: 'multiple_choice',
        options: ['көк', 'жашыл', 'кара'],
        correct: 0
      },
      {
        id: 'q2',
        question: 'Эмне кызыл?',
        type: 'multiple_choice',
        options: ['чөп', 'гүл', 'кар'],
        correct: 1
      },
      {
        id: 'q3',
        question: 'Кар кандай?',
        type: 'multiple_choice',
        options: ['кара', 'ак', 'жашыл'],
        correct: 1
      }
    ]
  },
  {
    id: 'a1_read_10',
    level: 'A1',
    order: 10,
    title: {
      en: 'Numbers',
      ru: 'Числа'
    },
    description: {
      en: 'Simple counting text',
      ru: 'Простой текст о счёте'
    },
    text: 'Бир, эки, үч. Мен санай алам. Төрт, беш, алты. Санаган оңой. Жети, сегиз, тогуз, он. Мен он саны билем.',
    textType: {
      en: 'Numbers',
      ru: 'Числа'
    },
    questions: [
      {
        id: 'q1',
        question: 'Мен эмне кыла алам?',
        type: 'multiple_choice',
        options: ['жаза алам', 'санай алам', 'сүйлөй алам'],
        correct: 1
      },
      {
        id: 'q2',
        question: 'Эки саны бардыбы?',
        type: 'multiple_choice',
        options: ['ооба', 'жок', 'билбейм'],
        correct: 0
      },
      {
        id: 'q3',
        question: 'Мен канча саны билем?',
        type: 'multiple_choice',
        options: ['беш', 'он', 'жыйырма'],
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
  {
    id: 'a2_read_2',
    level: 'A2',
    order: 2,
    title: {
      en: 'The Fox and the Grapes',
      ru: 'Лиса и виноград'
    },
    description: {
      en: 'Classic fable about a fox',
      ru: 'Классическая басня о лисе'
    },
    text: 'Бир күнү ачка түлкү жолдо жүрүп баратып, жогорку агачта жүзүм көрдү. Жүзүм өтө кооз болучу. Түлкү секирип, жүзүмдү алууну аракеттенди. Бирок, ал жете албады. Көп аракеттенгенден кийин, түлкү "Жүзүм дагы да кычык экен" деп кеткен.',
    textType: {
      en: 'Fable',
      ru: 'Басня'
    },
    questions: [
      {
        id: 'q1',
        question: 'Түлкү эмне көрдү?',
        type: 'multiple_choice',
        options: ['алма', 'жүзүм', 'алмурут'],
        correct: 1
      },
      {
        id: 'q2',
        question: 'Жүзүм кайда болгон?',
        type: 'multiple_choice',
        options: ['жерде', 'агачта', 'үйдө'],
        correct: 1
      },
      {
        id: 'q3',
        question: 'Түлкү жүзүмдү ала алдыбы?',
        type: 'multiple_choice',
        options: ['ооба', 'жок', 'айтылбайт'],
        correct: 1
      },
      {
        id: 'q4',
        question: 'Түлкү эмне деди?',
        type: 'multiple_choice',
        options: ['"Жүзүм ширин экен"', '"Жүзүм кычык экен"', '"Жүзүм жок"'],
        correct: 1
      }
    ]
  },
  {
    id: 'a2_read_3',
    level: 'A2',
    order: 3,
    title: {
      en: 'A Visit to the Doctor',
      ru: 'Визит к врачу'
    },
    description: {
      en: 'Simple dialogue at a clinic',
      ru: 'Простой диалог в поликлинике'
    },
    text: 'Азамат ооруп калды. Ал дарыгерге барды. Дарыгер аны карап, "Сизде суук тийген. Үч күн үйдө жатыңыз. Дары ичиңиз. Ысык чай ичиңиз" деди. Азамат дарыканага барып, дары алды. Үч күндөн кийин ал согулду.',
    textType: {
      en: 'Health dialogue',
      ru: 'Диалог о здоровье'
    },
    questions: [
      {
        id: 'q1',
        question: 'Азамат эмне болду?',
        type: 'multiple_choice',
        options: ['ооруп калды', 'күлгөн', 'иштеген'],
        correct: 0
      },
      {
        id: 'q2',
        question: 'Дарыгер эмне айтты?',
        type: 'multiple_choice',
        options: ['иштегиле', 'үйдө жатыңыз', 'каникулга кетиңиз'],
        correct: 1
      },
      {
        id: 'q3',
        question: 'Азамат кайдан дары алды?',
        type: 'multiple_choice',
        options: ['дарыканадан', 'базардан', 'мектептен'],
        correct: 0
      },
      {
        id: 'q4',
        question: 'Качан согулду?',
        type: 'multiple_choice',
        options: ['бир күндөн кийин', 'эки күндөн кийин', 'үч күндөн кийин'],
        correct: 2
      }
    ]
  },
  {
    id: 'a2_read_4',
    level: 'A2',
    order: 4,
    title: {
      en: 'Seasons in Kyrgyzstan',
      ru: 'Времена года в Кыргызстане'
    },
    description: {
      en: 'Description of four seasons',
      ru: 'Описание четырёх сезонов'
    },
    text: 'Кыргызстанда төрт мезгил бар. Жазда ысык болот, адамдар көлдөргө барышат. Күздө жапырактар сарыйт, жемиштер бышат. Кышында кар жаат, балдар чаңгы тебишет. Жазда жаңы гүлдөр ачылат, аба жылыйт.',
    textType: {
      en: 'Descriptive text',
      ru: 'Описательный текст'
    },
    questions: [
      {
        id: 'q1',
        question: 'Кыргызстанда канча мезгил бар?',
        type: 'multiple_choice',
        options: ['үч', 'төрт', 'беш'],
        correct: 1
      },
      {
        id: 'q2',
        question: 'Жазда эмне болот?',
        type: 'multiple_choice',
        options: ['ысык болот', 'суук болот', 'кар жаат'],
        correct: 0
      },
      {
        id: 'q3',
        question: 'Кышында балдар эмне кылышат?',
        type: 'multiple_choice',
        options: ['сүзүшөт', 'чаңгы тебишет', 'велосипед тебишет'],
        correct: 1
      },
      {
        id: 'q4',
        question: 'Күздө эмне бышат?',
        type: 'multiple_choice',
        options: ['гүлдөр', 'жемиштер', 'чөптөр'],
        correct: 1
      }
    ]
  },
  {
    id: 'a2_read_5',
    level: 'A2',
    order: 5,
    title: {
      en: 'A Trip to Issyk-Kul',
      ru: 'Поездка на Иссык-Куль'
    },
    description: {
      en: 'Travel narrative',
      ru: 'Рассказ о путешествии'
    },
    text: 'Биздин үй-бүлө өткөн жазда Ысык-Көлгө барган. Биз автобус менен он саат жол жүрдүк. Көл абдан кооз болучу. Суу таза жана көк. Биз үч күн жээкте калдык. Балдар сууда сүзүшкөн, биз эс алдык. Бул өтө жакшы каникул болгон.',
    textType: {
      en: 'Travel story',
      ru: 'Рассказ о путешествии'
    },
    questions: [
      {
        id: 'q1',
        question: 'Алар качан Ысык-Көлгө барышкан?',
        type: 'multiple_choice',
        options: ['өткөн күзүндө', 'өткөн жазда', 'өткөн кышында'],
        correct: 1
      },
      {
        id: 'q2',
        question: 'Канча саат жол жүрүшкөн?',
        type: 'multiple_choice',
        options: ['беш', 'он', 'он беш'],
        correct: 1
      },
      {
        id: 'q3',
        question: 'Алар канча күн калышкан?',
        type: 'multiple_choice',
        options: ['бир күн', 'эки күн', 'үч күн'],
        correct: 2
      },
      {
        id: 'q4',
        question: 'Балдар эмне кылышкан?',
        type: 'multiple_choice',
        options: ['окушкан', 'сууда сүзүшкөн', 'ойношкон'],
        correct: 1
      }
    ]
  },
  {
    id: 'a2_read_6',
    level: 'A2',
    order: 6,
    title: {
      en: 'Traditional Kyrgyz Food',
      ru: 'Традиционная кыргызская еда'
    },
    description: {
      en: 'About national cuisine',
      ru: 'О национальной кухне'
    },
    text: 'Кыргыз тамагы өтө даамдуу. Эң белгилүү тамак - бешбармак. Аны эт жана кеспе менен жасашат. Дагы бир белгилүү тамак - лагман. Бул узун кеспе бар шорпо. Ашлан-фу муздак тамак. Аны жазда жегенди жакшы көрүшөт.',
    textType: {
      en: 'Cultural description',
      ru: 'Культурное описание'
    },
    questions: [
      {
        id: 'q1',
        question: 'Кыргыз тамагы кандай?',
        type: 'multiple_choice',
        options: ['даамдуу', 'жаман', 'даамсыз'],
        correct: 0
      },
      {
        id: 'q2',
        question: 'Эң белгилүү тамак кайсы?',
        type: 'multiple_choice',
        options: ['плов', 'бешбармак', 'борщ'],
        correct: 1
      },
      {
        id: 'q3',
        question: 'Лагман деген эмне?',
        type: 'multiple_choice',
        options: ['салат', 'узун кеспе бар шорпо', 'торт'],
        correct: 1
      },
      {
        id: 'q4',
        question: 'Качан ашлан-фуну жегенди жакшы көрүшөт?',
        type: 'multiple_choice',
        options: ['кышында', 'жазда', 'күздө'],
        correct: 1
      }
    ]
  },
  {
    id: 'a2_read_7',
    level: 'A2',
    order: 7,
    title: {
      en: 'The Lazy Boy',
      ru: 'Ленивый мальчик'
    },
    description: {
      en: 'Moral tale',
      ru: 'Поучительная сказка'
    },
    text: 'Эртеде бир жалкоо бала жашаган. Ал эч нерсе кылгысы келбей турган. Атасы "Бак казып бер" деген. Бала "Чарчадым" деп жаткан. Апасы "Анага жардам бер" деген. Бала "Билбейм" деп жооп берген. Бир күнү үйдө эч нерсе калбаган. Анда бала иштөөнү үйрөнгөн.',
    textType: {
      en: 'Moral tale',
      ru: 'Поучительная сказка'
    },
    questions: [
      {
        id: 'q1',
        question: 'Бала кандай болгон?',
        type: 'multiple_choice',
        options: ['тырыш', 'жалкоо', 'акылдуу'],
        correct: 1
      },
      {
        id: 'q2',
        question: 'Атасы эмне деген?',
        type: 'multiple_choice',
        options: ['окугула', 'бак казып бер', 'ойногула'],
        correct: 1
      },
      {
        id: 'q3',
        question: 'Эмне болгондо бала өзгөрдү?',
        type: 'multiple_choice',
        options: ['үйдө эч нерсе калбаганда', 'атасы ургандо', 'мектепке барганда'],
        correct: 0
      },
      {
        id: 'q4',
        question: 'Бала эмнени үйрөндү?',
        type: 'multiple_choice',
        options: ['окууну', 'иштөөнү', 'ойноону'],
        correct: 1
      }
    ]
  },
  {
    id: 'a2_read_8',
    level: 'A2',
    order: 8,
    title: {
      en: 'The New Student',
      ru: 'Новый ученик'
    },
    description: {
      en: 'School story',
      ru: 'Школьная история'
    },
    text: 'Биздин классга жаңы окуучу келди. Анын аты Нурбек. Ал Ош шаарынан көчүп келген. Биринчи күнү ал коркуп турду. Бирок биз аны жакшы кабыл алдык. Мен ага мектепти көрсөттүм. Азыр Нурбек менин эң жакын досум.',
    textType: {
      en: 'School narrative',
      ru: 'Школьный рассказ'
    },
    questions: [
      {
        id: 'q1',
        question: 'Жаңы окуучунун аты ким?',
        type: 'multiple_choice',
        options: ['Азамат', 'Нурбек', 'Бакыт'],
        correct: 1
      },
      {
        id: 'q2',
        question: 'Ал кайдан келген?',
        type: 'multiple_choice',
        options: ['Бишкектен', 'Ош шаарынан', 'Жалал-Абаддан'],
        correct: 1
      },
      {
        id: 'q3',
        question: 'Биринчи күнү ал кандай болгон?',
        type: 'multiple_choice',
        options: ['кубанычтуу', 'коркуп турган', 'ачуулуу'],
        correct: 1
      },
      {
        id: 'q4',
        question: 'Азыр Нурбек ким?',
        type: 'multiple_choice',
        options: ['мугалим', 'эң жакын дос', 'таанышпаган'],
        correct: 1
      }
    ]
  },
  {
    id: 'a2_read_9',
    level: 'A2',
    order: 9,
    title: {
      en: 'At the Post Office',
      ru: 'На почте'
    },
    description: {
      en: 'Practical dialogue',
      ru: 'Практический диалог'
    },
    text: 'Апам почтага барды. Ал конверт жана марка сатып алды. Атасына кат жазды. Катта "Саламатсызбы, ата! Биз жакшыбыз. Сиз кандайсыз? Жакында келебиз" деп жазган. Кийин ал катты почта кутусуна салды.',
    textType: {
      en: 'Practical dialogue',
      ru: 'Практический диалог'
    },
    questions: [
      {
        id: 'q1',
        question: 'Апам кайда барды?',
        type: 'multiple_choice',
        options: ['дүкөнгө', 'почтага', 'паркка'],
        correct: 1
      },
      {
        id: 'q2',
        question: 'Ал эмне сатып алды?',
        type: 'multiple_choice',
        options: ['китеп', 'конверт жана марка', 'тамак'],
        correct: 1
      },
      {
        id: 'q3',
        question: 'Ал кимге кат жазды?',
        type: 'multiple_choice',
        options: ['досуна', 'атасына', 'мугалимге'],
        correct: 1
      },
      {
        id: 'q4',
        question: 'Ал катты кайда салды?',
        type: 'multiple_choice',
        options: ['столго', 'сумкага', 'почта кутусуна'],
        correct: 2
      }
    ]
  },
  {
    id: 'a2_read_10',
    level: 'A2',
    order: 10,
    title: {
      en: 'My Hobby',
      ru: 'Моё хобби'
    },
    description: {
      en: 'Personal interests',
      ru: 'Личные интересы'
    },
    text: 'Менин хоббим - сүрөт тартуу. Мен жети жаштан бери сүрөт тартам. Адегенде түстүү калем менен тарткам. Азыр краска менен иштейм. Мен жаратылыштын кооздугун сүрөткө тартам: тоолорду, дарыяларды, гүлдөрдү. Келечекте сүрөтчү болгум келет.',
    textType: {
      en: 'Personal description',
      ru: 'Личное описание'
    },
    questions: [
      {
        id: 'q1',
        question: 'Анын хоббиси эмне?',
        type: 'multiple_choice',
        options: ['музыка', 'сүрөт тартуу', 'спорт'],
        correct: 1
      },
      {
        id: 'q2',
        question: 'Качандан бери сүрөт тартат?',
        type: 'multiple_choice',
        options: ['беш жаштан', 'жети жаштан', 'он жаштан'],
        correct: 1
      },
      {
        id: 'q3',
        question: 'Азыр эмне менен иштейт?',
        type: 'multiple_choice',
        options: ['түстүү калем', 'краска', 'уголь'],
        correct: 1
      },
      {
        id: 'q4',
        question: 'Ал эмне болгусу келет?',
        type: 'multiple_choice',
        options: ['мугалим', 'дарыгер', 'сүрөтчү'],
        correct: 2
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
  {
    id: 'b1_read_2',
    level: 'B1',
    order: 2,
    title: {
      en: 'Kyrgyz National Games',
      ru: 'Кыргызские национальные игры'
    },
    description: {
      en: 'Article about traditional sports',
      ru: 'Статья о традиционных видах спорта'
    },
    text: 'Кыргыз элинин улуттук оюндары көп кылымдар бою сакталып келген. Эң популярдуусу — улак тартыш. Бул оюнда ат минген эркектер улакты тартышып алышат. Дагы бир белгилүү оюн — эр энишуу. Бул күч-кубаттуулукту талап кылган спорт. Кыз куумай деген оюн жаш балдар арасында өтө жакшы көрүлөт. Бул оюндар биздин маданияттын маанилүү бөлүгү болуп эсептелет.',
    textType: {
      en: 'Cultural article',
      ru: 'Культурная статья'
    },
    questions: [
      {
        id: 'q1',
        question: 'Улуттук оюндар канча убакыттан бери сакталат?',
        type: 'multiple_choice',
        options: ['бир кылымдан', 'эки кылымдан', 'көп кылымдардан'],
        correct: 2
      },
      {
        id: 'q2',
        question: 'Эң популярдуу оюн кайсы?',
        type: 'multiple_choice',
        options: ['эр энишуу', 'улак тартыш', 'кыз куумай'],
        correct: 1
      },
      {
        id: 'q3',
        question: 'Улак тартышта эмне кылышат?',
        type: 'multiple_choice',
        options: ['жүгүрүшөт', 'улакты тартышат', 'ырдашат'],
        correct: 1
      },
      {
        id: 'q4',
        question: 'Эр энишуу кандай спорт?',
        type: 'multiple_choice',
        options: ['оңой', 'күч-кубаттуулукту талап кылган', 'акылдуулукту талап кылган'],
        correct: 1
      },
      {
        id: 'q5',
        question: 'Кыз куумай кимдер арасында популярдуу?',
        type: 'multiple_choice',
        options: ['жаш балдар', 'карылар', 'аялдар'],
        correct: 0
      },
      {
        id: 'q6',
        question: 'Бул оюндар эмнени билдирет?',
        type: 'multiple_choice',
        options: ['эч нерсени', 'маданияттын маанилүү бөлүгү', 'жаңы спорт'],
        correct: 1
      }
    ]
  },
  {
    id: 'b1_read_3',
    level: 'B1',
    order: 3,
    title: {
      en: 'Education Reform in Kyrgyzstan',
      ru: 'Реформа образования в Кыргызстане'
    },
    description: {
      en: 'News report about education changes',
      ru: 'Новостной репортаж об изменениях в образовании'
    },
    text: 'Билим берүү министрлиги жаңы реформаларды жарыялады. Мектептерде технологияларды колдонуу күчөтүлөт. Мугалимдер үчүн атайын тренингдер уюштурулат. Окуучулар критикалык ой жүгүртүү жана долбоорлук иштерге көбүрөөк катышышат. Эксперттердин пикири боюнча, бул өзгөрүүлөр билим берүүнүн сапатын жогорулатат. Реформа кийинки үч жылда ишке ашырылат.',
    textType: {
      en: 'News report',
      ru: 'Новостной репортаж'
    },
    questions: [
      {
        id: 'q1',
        question: 'Ким жаңы реформаларды жарыялады?',
        type: 'multiple_choice',
        options: ['президент', 'билим берүү министрлиги', 'мэр'],
        correct: 1
      },
      {
        id: 'q2',
        question: 'Мектептерде эмне күчөтүлөт?',
        type: 'multiple_choice',
        options: ['технологияларды колдонуу', 'спорт', 'музыка'],
        correct: 0
      },
      {
        id: 'q3',
        question: 'Мугалимдер үчүн эмне уюштурулат?',
        type: 'multiple_choice',
        options: ['каникул', 'тренингдер', 'экскурсия'],
        correct: 1
      },
      {
        id: 'q4',
        question: 'Окуучулар эмнеге көбүрөөк катышышат?',
        type: 'multiple_choice',
        options: ['спорттук оюндарга', 'критикалык ой жүгүртүү жана долбоорлорго', 'концерттерге'],
        correct: 1
      },
{
        id: 'q5',
        question: 'Бул өзгөрүүлөр эмнени жогорулатат?',
        type: 'multiple_choice',
        options: ['акча', 'билим берүүнүн сапатын', 'мектептин санын'],
        correct: 1
      },
      {
        id: 'q6',
        question: 'Реформа качан ишке ашырылат?',
        type: 'multiple_choice',
        options: ['бир жылда', 'эки жылда', 'үч жылда'],
        correct: 2
      }
    ]
  },
  {
    id: 'b1_read_4',
    level: 'B1',
    order: 4,
    title: {
      en: 'The Legend of Manas',
      ru: 'Легенда о Манасе'
    },
    description: {
      en: 'Traditional epic story',
      ru: 'Традиционный эпический рассказ'
    },
    text: '"Манас" эпосу кыргыз элинин эң чоң маданий мурасы. Бул эпоста Манас баатырдын жоокерчилиги, акылмандыгы жана элин коргоо үчүн күрөшү сүрөттөлөт. Эпос узундугу боюнча дүйнөдөгү эң чоң эпостордун бири болуп эсептелет. Манасчылар — атайын окумуштуулар — бул эпосту муундан-муунга өткөрүп келишкен. "Манас" кыргыз элинин руханий байлыгын жана тарыхый эсин чагылдырат.',
    textType: {
      en: 'Cultural text',
      ru: 'Культурный текст'
    },
    questions: [
      {
        id: 'q1',
        question: '"Манас" эмне болуп эсептелет?',
        type: 'multiple_choice',
        options: ['роман', 'эң чоң маданий мурас', 'кино'],
        correct: 1
      },
      {
        id: 'q2',
        question: 'Эпоста эмне сүрөттөлөт?',
        type: 'multiple_choice',
        options: ['сүйүү тарыхы', 'Манастын жоокерчилиги жана элин коргоосу', 'саякат'],
        correct: 1
      },
      {
        id: 'q3',
        question: 'Эпос дүйнөдө кандай?',
        type: 'multiple_choice',
        options: ['эң кичине', 'эң чоң эпостордун бири', 'орточо'],
        correct: 1
      },
      {
        id: 'q4',
        question: 'Манасчылар ким?',
        type: 'multiple_choice',
        options: ['жоокерлер', 'эпосту окумуштуулар', 'дарыгерлер'],
        correct: 1
      },
      {
        id: 'q5',
        question: 'Эпос эмнени чагылдырат?',
        type: 'multiple_choice',
        options: ['спортту', 'руханий байлыкты жана тарыхый эсти', 'технологияны'],
        correct: 1
      },
      {
        id: 'q6',
        question: 'Эпос кантип өткөрүлөт?',
        type: 'multiple_choice',
        options: ['китептен', 'манасчылар аркылуу муундан-муунга', 'интернеттен'],
        correct: 1
      }
    ]
  },
  {
    id: 'b1_read_5',
    level: 'B1',
    order: 5,
    title: {
      en: 'Eco-Tourism in Kyrgyzstan',
      ru: 'Экотуризм в Кыргызстане'
    },
    description: {
      en: 'Article about sustainable tourism',
      ru: 'Статья об устойчивом туризме'
    },
    text: 'Кыргызстан экотуризм үчүн уникалдуу мүмкүнчүлүктөрдү сунуштайт. Ички-Кёл айрыкча кызыктырат. Туристтер жаратылыштын таза кооздугун көрүп, үй-бүлөлөрдө жашап, улуттук тамактарды даамын татышат. Айыл жергесиндеги туризм жергиликтүү элге киреше алып келет. Эксперттер экотуризмди өнүктүрүү менен жергиликтүү маданиятты сактоого жана табияттын кооздугун келечек муундарга өткөрүүгө болот деп эсептешет.',
    textType: {
      en: 'Tourism article',
      ru: 'Туристическая статья'
    },
    questions: [
      {
        id: 'q1',
        question: 'Кыргызстан эмне үчүн уникалдуу мүмкүнчүлүктөрдү сунуштайт?',
        type: 'multiple_choice',
        options: ['спорт үчүн', 'экотуризм үчүн', 'бизнес үчүн'],
        correct: 1
      },
      {
        id: 'q2',
        question: 'Кайсы жер айрыкча кызыктырат?',
        type: 'multiple_choice',
        options: ['Бишкек', 'Ички-Кёл', 'Ош'],
        correct: 1
      },
      {
        id: 'q3',
        question: 'Туристтер кайда жашашат?',
        type: 'multiple_choice',
        options: ['мейманканаларда', 'үй-бүлөлөрдө', 'чатырларда'],
        correct: 1
      },
      {
        id: 'q4',
        question: 'Айыл жергесиндеги туризм эмне алып келет?',
        type: 'multiple_choice',
        options: ['көйгөйлөрдү', 'киреше алып келет', 'эч нерсени'],
        correct: 1
      },
      {
        id: 'q5',
        question: 'Экотуризмди өнүктүрүү эмнеге жардам берет?',
        type: 'multiple_choice',
        options: ['шаарларды курууга', 'маданиятты сактоого жана табиятты өткөрүүгө', 'фабрикаларды ачууга'],
        correct: 1
      },
      {
        id: 'q6',
        question: 'Туристтер эмнени даамын татышат?',
        type: 'multiple_choice',
        options: ['фаст-фуд', 'улуттук тамактар', 'европа тамактары'],
        correct: 1
      }
    ]
  },
  {
    id: 'b1_read_6',
    level: 'B1',
    order: 6,
    title: {
      en: 'Youth Employment Programs',
      ru: 'Программы занятости молодежи'
    },
    description: {
      en: 'Report on youth initiatives',
      ru: 'Отчет о молодежных инициативах'
    },
    text: 'Өкмөт жаштар үчүн жумуш менен камсыз кылуу программасын баштады. Программа жаш адамдарга кесиптик окутуу жана иш тажрыйбасын алуу мүмкүнчүлүгүн берет. Компаниялар жаш адамдарды интернге алууга кызыкдар. Программага катышкан жаштардын 70 пайызы туруктуу иштерди табышты. Бул инициатива экономикага оң таасирин тийгизип, жаштардын өз алдынча жашоого даярдыгын күчөтөт.',
    textType: {
      en: 'News report',
      ru: 'Новостной отчет'
    },
    questions: [
      {
        id: 'q1',
        question: 'Ким программаны баштады?',
        type: 'multiple_choice',
        options: ['компаниялар', 'өкмөт', 'студенттер'],
        correct: 1
      },
      {
        id: 'q2',
        question: 'Программа эмнени берет?',
        type: 'multiple_choice',
        options: ['акча', 'кесиптик окутуу жана иш тажрыйбасы', 'үй'],
        correct: 1
      },
      {
        id: 'q3',
        question: 'Компаниялар жаштарды кайдай алышат?',
        type: 'multiple_choice',
        options: ['алышпайт', 'интернге алууга кызыкдар', 'жумушка алышпайт'],
        correct: 1
      },
      {
        id: 'q4',
        question: 'Канча пайыз жаш туруктуу иш тапты?',
        type: 'multiple_choice',
        options: ['50%', '70%', '90%'],
        correct: 1
      },
      {
        id: 'q5',
        question: 'Программа экономикага кандай таасир тийгизет?',
        type: 'multiple_choice',
        options: ['терс', 'оң', 'эч кандай'],
        correct: 1
      },
      {
        id: 'q6',
        question: 'Программа жаштардын эмнесин күчөтөт?',
        type: 'multiple_choice',
        options: ['спорттук жөндөмүн', 'өз алдынча жашоого даярдыгын', 'музыкалык жөндөмүн'],
        correct: 1
      }
    ]
  },
  {
    id: 'b1_read_7',
    level: 'B1',
    order: 7,
    title: {
      en: 'Traditional Felt-Making Craft',
      ru: 'Традиционное ремесло изготовления войлока'
    },
    description: {
      en: 'Article about handicrafts',
      ru: 'Статья о ремеслах'
    },
    text: 'Кийиз басуу — кыргыздардын байыркы өнөрү. Бул процесс көп сааттык жумушту талап кылат. Адегенде жунду жууп, кургатып, андан кийин аны жайып, сабын менен суу куюшат. Бир топ адамдар бирге кийизди жыйып-жыйып басышат. Даяр болгон кийизден түрмө, шырдак жана башка буюмдарду жасашат. Азыркы учурда кийизчилик искусствосу жаш муунга өткөрүлүп жатат.',
    textType: {
      en: 'Cultural article',
      ru: 'Культурная статья'
    },
    questions: [
      {
        id: 'q1',
        question: 'Кийиз басуу эмне?',
        type: 'multiple_choice',
        options: ['жаңы өнөр', 'байыркы өнөр', 'чет өлкөлүк өнөр'],
        correct: 1
      },
      {
        id: 'q2',
        question: 'Процесс эмнени талап кылат?',
        type: 'multiple_choice',
        options: ['аз убакыт', 'көп сааттык жумушту', 'эч нерсени'],
        correct: 1
      },
      {
        id: 'q3',
        question: 'Биринчи эмне кылышат?',
        type: 'multiple_choice',
        options: ['жунду жууп кургатышат', 'сабын менен сууну куюшат', 'кийизди басышат'],
        correct: 0
      },
      {
        id: 'q4',
        question: 'Ким кийизди басат?',
        type: 'multiple_choice',
        options: ['бир адам', 'бир топ адамдар', 'машина'],
        correct: 1
      },
      {
        id: 'q5',
        question: 'Кийизден эмне жасашат?',
        type: 'multiple_choice',
        options: ['китеп', 'түрмө жана шырдак', 'кийим'],
        correct: 1
      },
      {
        id: 'q6',
        question: 'Азыр бул искусство кайда өткөрүлөт?',
        type: 'multiple_choice',
        options: ['жок болду', 'жаш муунга өткөрүлүп жатат', 'чет өлкөгө кетти'],
        correct: 1
      }
    ]
  },
  {
    id: 'b1_read_8',
    level: 'B1',
    order: 8,
    title: {
      en: 'Public Transportation Improvements',
      ru: 'Улучшение общественного транспорта'
    },
    description: {
      en: 'News about urban development',
      ru: 'Новости о городском развитии'
    },
    text: 'Бишкектин мэриясы коммуналдык транспортту жакшыртуу боюнча пландарды жарыялады. Жаңы автобустар сатып алынат, алар экологиялык таза болот. Троллейбус системасы кеңейтилет. Ошондой эле электрондук билеттер тутуму киргизилет. Бул өзгөрүүлөр кызматтын сапатын жогорулатып, шаардын абасын жакшыртат. Жергиликтүү тургундар бул жаңылыктарды ыраазычылык менен кабыл алышты.',
    textType: {
      en: 'News report',
      ru: 'Новостной репортаж'
    },
    questions: [
      {
        id: 'q1',
        question: 'Ким пландарды жарыялады?',
        type: 'multiple_choice',
        options: ['президент', 'Бишкектин мэриясы', 'министрлик'],
        correct: 1
      },
      {
        id: 'q2',
        question: 'Кандай автобустар сатып алынат?',
        type: 'multiple_choice',
        options: ['эски', 'экологиялык таза', 'чет өлкөлүк'],
        correct: 1
      },
      {
        id: 'q3',
        question: 'Троллейбус системасы менен эмне болот?',
        type: 'multiple_choice',
        options: ['жабылат', 'кеңейтилет', 'өзгөрбөйт'],
        correct: 1
      },
      {
        id: 'q4',
        question: 'Кандай тутум киргизилет?',
        type: 'multiple_choice',
        options: ['кагаз билеттер', 'электрондук билеттер', 'белек билеттер'],
        correct: 1
      },
      {
        id: 'q5',
        question: 'Бул өзгөрүүлөр эмнени жакшыртат?',
        type: 'multiple_choice',
        options: ['спортту', 'кызматтын сапатын жана шаардын абасын', 'музыканы'],
        correct: 1
      },
      {
        id: 'q6',
        question: 'Тургундар жаңылыктарды кантип кабыл алышты?',
        type: 'multiple_choice',
        options: ['ыраазычылык менен', 'начар', 'кызыкпады'],
        correct: 0
      }
    ]
  },
  {
    id: 'b1_read_9',
    level: 'B1',
    order: 9,
    title: {
      en: 'Mountain Climbing Safety',
      ru: 'Безопасность альпинизма'
    },
    description: {
      en: 'Safety guide for mountaineers',
      ru: 'Руководство по безопасности для альпинистов'
    },
    text: 'Кыргызстандын тоолору дүйнөдөгү альпинисттерди өзүнө тартат. Бирок тоого чыгуу коопсуз болушу үчүн даярдык керек. Адегенде медициналык текшерүүдөн өтүү милдеттүү. Кесипкөй жетекчилер менен жүрүү сунушталат. Атайын жабдуулар: аркан, ботинка, жылуу кийимдер зарыл. Аба ырайын текшерип туруу өтө маанилүү. Коопсуздук эрежелерин сактаган учурда, тоо саякаты унутулгус тажрыйба берет.',
    textType: {
      en: 'Guide article',
      ru: 'Статья-руководство'
    },
    questions: [
      {
        id: 'q1',
        question: 'Кыргызстандын тоолору кимди тартат?',
        type: 'multiple_choice',
        options: ['суучуларды', 'альпинисттерди', 'студенттерди'],
        correct: 1
      },
      {
        id: 'q2',
        question: 'Тоо коопсуз болушу үчүн эмне керек?',
        type: 'multiple_choice',
        options: ['даярдык', 'көп акча', 'жалгыз жүрүү'],
        correct: 0
      },
      {
        id: 'q3',
        question: 'Эмнеден өтүү милдеттүү?',
        type: 'multiple_choice',
        options: ['экзаменден', 'медициналык текшерүүдөн', 'курстан'],
        correct: 1
      },
      {
        id: 'q4',
        question: 'Ким менен жүрүү сунушталат?',
        type: 'multiple_choice',
        options: ['достор менен', 'кесипкөй жетекчилер менен', 'жалгыз'],
        correct: 1
      },
      {
        id: 'q5',
        question: 'Кандай жабдуулар зарыл?',
        type: 'multiple_choice',
        options: ['китептер', 'аркан, ботинка, жылуу кийимдер', 'телефон гана'],
        correct: 1
      },
      {
        id: 'q6',
        question: 'Коопсуздук эрежелерин сактаса эмне болот?',
        type: 'multiple_choice',
        options: ['коркунучтуу болот', 'унутулгус тажрыйба берет', 'эч нерсе өзгөрбөйт'],
        correct: 1
      }
    ]
  },
  {
    id: 'b1_read_10',
    level: 'B1',
    order: 10,
    title: {
      en: 'Kyrgyz Cuisine Goes International',
      ru: 'Кыргызская кухня выходит на международный уровень'
    },
    description: {
      en: 'Article about culinary trends',
      ru: 'Статья о кулинарных трендах'
    },
    text: 'Кыргыз тамактары эл аралык деңгээлде таанымалдуулукка ээ болууда. Бир нече кыргыз ашканалары чет өлкөлөрдө ачылды. Бешбармак, лагман жана самса туристтердин сүйүктүү тамактарына айланды. Кулинардык эксперттер кыргыз тамагынын уникалдуу даамын жана пайдалуулугун белгилешет. Ошондой эле улуттук тамактардын эл аралык фестивалдарга катышуусу өлкөбүздүн маданиятын жайылтууга жардам берүүдө.',
    textType: {
      en: 'Cultural news',
      ru: 'Культурные новости'
    },
    questions: [
      {
        id: 'q1',
        question: 'Кыргыз тамактары эмнеге ээ болууда?',
        type: 'multiple_choice',
        options: ['таанымалдуулукка', 'көйгөйгө', 'арзандыкка'],
        correct: 0
      },
      {
        id: 'q2',
        question: 'Кайда кыргыз ашканалары ачылды?',
        type: 'multiple_choice',
        options: ['айылдарда', 'чет өлкөлөрдө', 'тоолордо'],
        correct: 1
      },
      {
        id: 'q3',
        question: 'Туристтердин сүйүктүү тамактары кайсы?',
        type: 'multiple_choice',
        options: ['пицца', 'бешбармак, лагман, самса', 'бургер'],
        correct: 1
      },
      {
        id: 'q4',
        question: 'Эксперттер кыргыз тамагынын эмнесин белгилешет?',
        type: 'multiple_choice',
        options: ['баасын', 'уникалдуу даамын жана пайдалуулугун', 'түсүн'],
        correct: 1
      },
      {
        id: 'q5',
        question: 'Улуттук тамактар кайда катышат?',
        type: 'multiple_choice',
        options: ['эл аралык фестивалдарга', 'мектептерде', 'стадиондордо'],
        correct: 0
      },
      {
        id: 'q6',
        question: 'Бул эмнени жайылтууга жардам берет?',
        type: 'multiple_choice',
        options: ['спортту', 'өлкөнүн маданиятын', 'технологияны'],
        correct: 1
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
  {
    id: 'b2_read_2',
    level: 'B2',
    order: 2,
    title: {
      en: 'Climate Change and Central Asia',
      ru: 'Изменение климата и Центральная Азия'
    },
    description: {
      en: 'Environmental analysis',
      ru: 'Экологический анализ'
    },
    text: 'Климаттын өзгөрүшү Борбордук Азияга олуттуу таасирин тийгизүүдө. Кыргызстандын мөңгүлөрү жылдан-жылга эрип жатат, бул келечекте суу ресурстарынын кыскарышына алып келиши мүмкүн. Айыл чарбасы, өзгөчө дан өстүрүү, кургакчылыктан улам коркунучта. Эксперттердин пикири боюнча, бул глобалдык проблема жергиликтүү деңгээлде чечүүлөрдү талап кылат. Экологиялык билим берүү, жаңылануучу энергия булактарын колдонуу жана суу ресурстарын акылдуу башкаруу негизги чаралар болуп саналат.',
    textType: {
      en: 'Analytical article',
      ru: 'Аналитическая статья'
    },
    questions: [
      {
        id: 'q1',
        question: 'Климаттын өзгөрүшү Кыргызстанга кандай таасир тийгизүүдө?',
        type: 'open_ended'
      },
      {
        id: 'q2',
        question: 'Мөңгүлөрдүн эришинин кандай кесепеттери болушу мүмкүн?',
        type: 'open_ended'
      },
      {
        id: 'q3',
        question: 'Текстте кандай чечүүлөр сунушталат?',
        type: 'open_ended'
      },
      {
        id: 'q4',
        question: 'Эмне үчүн глобалдык проблема жергиликтүү чечүүлөрдү талап кылат?',
        type: 'open_ended'
      },
      {
        id: 'q5',
        question: 'Сиздин оюңузда, жергиликтүү коом климат өзгөрүшүнө каршы күрөштө кандай ролду ойнойт?',
        type: 'open_ended'
      }
    ]
  },
  {
    id: 'b2_read_3',
    level: 'B2',
    order: 3,
    title: {
      en: 'Language Preservation in Globalization',
      ru: 'Сохранение языка в условиях глобализации'
    },
    description: {
      en: 'Linguistic analysis',
      ru: 'Лингвистический анализ'
    },
    text: 'Глобалдашуу учурунда тилдик көп түрдүүлүктү сактоо маанилүү маселеге айланды. Кыргыз тили орус жана англис тилдеринин таасиринде болсо да, өзүнүн уникалдуулугун сактап калууда. Бирок жаш муун көбүнчө чет тилдерди артык көрөт, бул ата-бабалардын тилинин күчсүздөшүнө алып келиши мүмкүн. Тилди сактоо үчүн билим берүү системасында улуттук тилди бекемдөө, заманбап медиада колдонуу жана маданий аң-сезимди өркүндөтүү зарыл. Тил — элдин руханий мурасынын негизи.',
    textType: {
      en: 'Linguistic article',
      ru: 'Лингвистическая статья'
    },
    questions: [
      {
        id: 'q1',
        question: 'Глобалдашуу тилдерге кандай таасирин тийгизет?',
        type: 'open_ended'
      },
      {
        id: 'q2',
        question: 'Жаш муундун чет тилдерди артык көрүшүнүн себептери эмне болушу мүмкүн?',
        type: 'open_ended'
      },
      {
        id: 'q3',
        question: 'Автор тилди сактоо үчүн кандай чараларды сунуштайт?',
        type: 'open_ended'
      },
      {
        id: 'q4',
        question: '"Тил — элдин руханий мурасынын негизи" деген ойду түшүндүрүп бериңиз.',
        type: 'open_ended'
      },
      {
        id: 'q5',
        question: 'Сиздин оюңузда, ата мекендик тилди сактоо жана чет тилдерди үйрөнүү кандай тең салмактуулукта болушу керек?',
        type: 'open_ended'
      }
    ]
  },
  {
    id: 'b2_read_4',
    level: 'B2',
    order: 4,
    title: {
      en: 'Digital Economy Transformation',
      ru: 'Трансформация цифровой экономики'
    },
    description: {
      en: 'Economic analysis',
      ru: 'Экономический анализ'
    },
    text: 'Санариптик экономика Кыргызстанды өзгөртүүдө. Электрондук соода, онлайн банкинг жана фриланс өнүгүүдө. Пандемиядан кийин бизнестин көбү виртуалдык платформаларга көчтү. Бул жаңы мүмкүнчүлүктөрдү пайда кылгандыгы менен, санариптик сабаттуулуктун жоктугу экономикалык теңсиздикти күчөтүшү мүмкүн. Өкмөт санариптик билим берүүнү жана интернет инфраструктурасын өркүндөтүүгө инвестиция кылууда. Санариптик экономика келечектеги экономикалык өсүштүн негизи болуп калат.',
    textType: {
      en: 'Economic article',
      ru: 'Экономическая статья'
    },
    questions: [
      {
        id: 'q1',
        question: 'Санариптик экономика кандай салаларды камтыйт?',
        type: 'open_ended'
      },
      {
        id: 'q2',
        question: 'Пандемия бизнеске кандай таасирин тийгизди?',
        type: 'open_ended'
      },
      {
        id: 'q3',
        question: 'Санариптик сабаттуулуктун жоктугу кандай көйгөйлөргө алып келиши мүмкүн?',
        type: 'open_ended'
      },
      {
        id: 'q4',
        question: 'Өкмөт санариптик экономиканы колдоо үчүн эмне кылууда?',
        type: 'open_ended'
      },
      {
        id: 'q5',
        question: 'Сиздин оюңузда, санариптик экономика кандай артыкчылыктарды жана чектөөлөрдү алып келет?',
        type: 'open_ended'
      }
    ]
  },
  {
    id: 'b2_read_5',
    level: 'B2',
    order: 5,
    title: {
      en: 'Youth Migration: Challenges and Opportunities',
      ru: 'Миграция молодежи: вызовы и возможности'
    },
    description: {
      en: 'Social analysis',
      ru: 'Социальный анализ'
    },
    text: 'Жаштардын миграциясы Кыргызстан үчүн татаал сабак болуп калууда. Бир жагынан, жаштар чет өлкөлөрдө билим алып, тажрыйба топтошот. Экинчи жагынан, мээ агып кетүүсү өлкөнүн өнүгүшүнө терс таасир тийгизет. Көп жаштар эч качан кайтып келишпейт, бул өлкөнүн интеллектуалдык потенциалынын жоготулушуна алып келет. Бирок кээ бир жаштар жаңы билимдер менен кайтып келип, ишкердикти өнүктүрүшөт. Маселени чечүү үчүн өлкөдө жумуш мүмкүнчүлүктөрүн түзүү жана жаштарды колдоо программаларын иштеп чыгуу зарыл.',
    textType: {
      en: 'Social article',
      ru: 'Социальная статья'
    },
    questions: [
      {
        id: 'q1',
        question: 'Жаштардын миграциясынын оң жактары эмнеде?',
        type: 'open_ended'
      },
      {
        id: 'q2',
        question: '"Мээ агып кетүүсү" деген эмнени билдирет жана ал эмне үчүн көйгөй?',
        type: 'open_ended'
      },
      {
        id: 'q3',
        question: 'Кээ бир мигранттар өлкөгө кандай пайда алып келишет?',
        type: 'open_ended'
      },
      {
        id: 'q4',
        question: 'Автор миграция маселесин чечүү үчүн эмнелерди сунуштайт?',
        type: 'open_ended'
      },
      {
        id: 'q5',
        question: 'Сиздин оюңузда, кандай шарттар жаштарды өз өлкөсүндө калууга түрткү берет?',
        type: 'open_ended'
      }
    ]
  },
  {
    id: 'b2_read_6',
    level: 'B2',
    order: 6,
    title: {
      en: 'Social Media and Public Opinion',
      ru: 'Социальные сети и общественное мнение'
    },
    description: {
      en: 'Media analysis',
      ru: 'Медийный анализ'
    },
    text: 'Социалдык тармактар коомдук пикирди калыптандырууда чечүүчү ролду ойнойт. Алар маалыматты тез жайылтат, бирок дезинформациянын таралышына да алып келет. Кыргызстанда социалдык тармактар саясий дискурстун негизги платформасына айланды. Блогерлер жана инфлюенсерлер традициялык медиага караганда көбүрөөк таасир тийгизишет. Бирок фейк жаңылыктардын көбөйүшү жана манипуляциянын коркунучу коомдук аң-сезимдин өсүшүн талап кылат. Медиа сабаттуулук заманбап жарандын милдеттүү компетенциясына айланууда.',
    textType: {
      en: 'Media analysis',
      ru: 'Медийный анализ'
    },
    questions: [
      {
        id: 'q1',
        question: 'Социалдык тармактар коомдук пикирге кандай таасирин тийгизет?',
        type: 'open_ended'
      },
      {
        id: 'q2',
        question: 'Социалдык тармактардын кандай оң жана терс жактары бар?',
        type: 'open_ended'
      },
      {
        id: 'q3',
        question: 'Эмне үчүн блогерлер традициялык медиадан көп таасир тийгизишет?',
        type: 'open_ended'
      },
      {
        id: 'q4',
        question: '"Медиа сабаттуулук" деген түшүнүктү түшүндүрүп бериңиз.',
        type: 'open_ended'
      },
      {
        id: 'q5',
        question: 'Сиздин оюңузда, фейк жаңылыктарды кантип аныктоого болот?',
        type: 'open_ended'
      }
    ]
  },
  {
    id: 'b2_read_7',
    level: 'B2',
    order: 7,
    title: {
      en: 'Traditional vs Modern Medicine',
      ru: 'Традиционная и современная медицина'
    },
    description: {
      en: 'Healthcare discussion',
      ru: 'Обсуждение здравоохранения'
    },
    text: 'Заманбап медицина менен салттуу дарылоонун ортосундагы талаш улануудо. Кыргызстанда көптөгөн адамдар азырынча табигый дарылоо ыкмаларына ишенишет. Өсүмдүк дарылары, массаж жана башка салттуу ыкмалар муундардан-муунга өткөрүлүп келген. Бирок илимий медицина натыйжалуураак экенин далилдеп жатат. Эксперттердин пикири боюнча, эки системанын айкалышы эң жакшы чечим. Салттуу билимдерди сактоо менен бирге, заманбап илим-билимди колдонуу керек.',
    textType: {
      en: 'Healthcare article',
      ru: 'Медицинская статья'
    },
    questions: [
      {
        id: 'q1',
        question: 'Кыргызстанда салттуу дарылоо кандай колдонулат?',
        type: 'open_ended'
      },
      {
        id: 'q2',
        question: 'Эмне үчүн адамдар салттуу дарылоону артык көрүшөт?',
        type: 'open_ended'
      },
      {
        id: 'q3',
        question: 'Заманбап медицинанын артыкчылыгы эмнеде?',
        type: 'open_ended'
      },
      {
        id: 'q4',
        question: 'Эксперттер кандай чечимди сунуштайт?',
        type: 'open_ended'
      },
      {
        id: 'q5',
        question: 'Сиздин оюңузда, салттуу жана заманбап медицина кантип айкалышышы мүмкүн?',
type: 'open_ended'
      }
    ]
  },
  {
    id: 'b2_read_8',
    level: 'B2',
    order: 8,
    title: {
      en: 'Entrepreneurship and Innovation',
      ru: 'Предпринимательство и инновации'
    },
    description: {
      en: 'Business analysis',
      ru: 'Бизнес-анализ'
    },
    text: 'Ишкердик маданиятын өнүктүрүү Кыргызстандын экономикалык келечеги үчүн маанилүү. Стартаптар жана инновациялар жаштарга өз бизнесин баштоого мүмкүнчүлүк берет. Бирок каржылоонун жоктугу, бюрократия жана тажрыйба жетишсиздиги тоскоолдуктар болуп калууда. Ийгиликтүү ишкерлер үчүн стартап инкубаторлору жана акселераторлор түзүлүүдө. Дагы бир маанилүү фактор — ишкердикке болгон коомдук мамиленин өзгөрүшү. Ийгиликтүү ишкерлер жаштар үчүн үлгү болуп жатат.',
    textType: {
      en: 'Business article',
      ru: 'Бизнес-статья'
    },
    questions: [
      {
        id: 'q1',
        question: 'Эмне үчүн ишкердик маданиятын өнүктүрүү маанилүү?',
        type: 'open_ended'
      },
      {
        id: 'q2',
        question: 'Жаш ишкерлер кандай тоскоолдуктарга туш болушат?',
        type: 'open_ended'
      },
      {
        id: 'q3',
        question: 'Стартап инкубаторлору жана акселераторлор эмне кылышат?',
        type: 'open_ended'
      },
      {
        id: 'q4',
        question: 'Коомдук мамиленин өзгөрүшү эмне үчүн маанилүү?',
        type: 'open_ended'
      },
      {
        id: 'q5',
        question: 'Сиздин оюңузда, ийгиликтүү ишкер болуу үчүн кандай касиеттер керек?',
        type: 'open_ended'
      }
    ]
  },
  {
    id: 'b2_read_9',
    level: 'B2',
    order: 9,
    title: {
      en: 'Gender Equality in Modern Society',
      ru: 'Гендерное равенство в современном обществе'
    },
    description: {
      en: 'Social issue analysis',
      ru: 'Анализ социального вопроса'
    },
    text: 'Гендердик теңчилик маселеси Кыргызстанда актуалдуу бойдон калууда. Аялдар билим берүү жана ден соолук сактоо тармагында көп эмгектенсе да, саясат жана бизнесте жетишинче берилген эмес. Салттуу көз караштар аялдардын карьерасына тоскоолдуктарды түзөт. Бирок акырыңкы жылдардагы прогресс жүрөктөндүрөт. Көптөгөн аялдар өз бизнесин баштап, жетекчилик кызматтарды ээлеп жатышат. Гендердик теңчилик коомдун өнүгүшү жана модернизациясынын көрсөткүчү болуп саналат.',
    textType: {
      en: 'Social article',
      ru: 'Социальная статья'
    },
    questions: [
      {
        id: 'q1',
        question: 'Аялдар кайсы салаларда көбүрөөк эмгектенишет?',
        type: 'open_ended'
      },
      {
        id: 'q2',
        question: 'Аялдардын карьерасына кандай тоскоолдуктар бар?',
        type: 'open_ended'
      },
      {
        id: 'q3',
        question: 'Акырыңкы жылдарда кандай прогресс байкалат?',
        type: 'open_ended'
      },
      {
        id: 'q4',
        question: 'Эмне үчүн гендердик теңчилик коомдун өнүгүшүнүн көрсөткүчү?',
        type: 'open_ended'
      },
      {
        id: 'q5',
        question: 'Сиздин оюңузда, гендердик теңчиликке жетүү үчүн эмне кылуу керек?',
        type: 'open_ended'
      }
    ]
  },
  {
    id: 'b2_read_10',
    level: 'B2',
    order: 10,
    title: {
      en: 'Urban vs Rural Development',
      ru: 'Городское и сельское развитие'
    },
    description: {
      en: 'Development analysis',
      ru: 'Анализ развития'
    },
    text: 'Шаарлар менен айылдардын ортосундагы өнүгүү айырмасы Кыргызстандын негизги көйгөйлөрүнүн бири. Бишкекте жана башка ири шаарларда инфраструктура, билим берүү жана ден соолук сактоо тармактары жакшыраак өнүккөн. Айылдардын жаштары жумуш табуу жана билим алуу үчүн шаарларга көчүшөт. Бул процесс айылдардын социалдык-экономикалык кырдаалын начарлатат. Теңчиликтүү өнүгүүгө жетүү үчүн айыл жергесине инвестиция кылуу, заманбап технологияларды киргизүү жана жергиликтүү экономиканы өнүктүрүү зарыл.',
    textType: {
      en: 'Development article',
      ru: 'Статья о развитии'
    },
    questions: [
      {
        id: 'q1',
        question: 'Шаарлар менен айылдардын ортосундагы негизги айырмалар эмнеде?',
        type: 'open_ended'
      },
      {
        id: 'q2',
        question: 'Эмне үчүн айылдардын жаштары шаарларга көчүшөт?',
        type: 'open_ended'
      },
      {
        id: 'q3',
        question: 'Айылдардан шаарларга көчүү кандай кесепеттерге алып келет?',
        type: 'open_ended'
      },
      {
        id: 'q4',
        question: 'Теңчиликтүү өнүгүүгө жетүү үчүн эмнелер кылуу керек?',
        type: 'open_ended'
      },
      {
        id: 'q5',
        question: 'Сиздин оюңузда, айыл жергесинин өнүгүшү өлкө үчүн эмне үчүн маанилүү?',
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
