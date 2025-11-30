export interface ExtendedTestQuestion {
  id: number
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1'
  question: string // Question text in Kyrgyz
  options: {
    en: string[]
    ru: string[]
  }
  correctAnswer: number // 0-3 index
  instruction?: {
    en: string
    ru: string
  }
}

export const EXTENDED_PLACEMENT_TEST: ExtendedTestQuestion[] = [
  // A1 Level (Questions 1-8)
  {
    id: 1,
    level: 'A1',
    question: 'Салам! Менин атым Айгүл. Сенин атың ким?',
    options: {
      en: ['I am fine.', 'My name is Azamat.', 'This is a book.', 'Yes, thank you.'],
      ru: ['Мен жакшымын.', 'Менин атым Азамат.', 'Бул китеп.', 'Ооба, рахмат.']
    },
    correctAnswer: 1,
    instruction: {
      en: 'Choose the correct answer',
      ru: 'Выберите правильный ответ'
    }
  },
  {
    id: 2,
    level: 'A1',
    question: 'Бул эмне?',
    options: {
      en: ['This is an apple.', 'This is big.', 'This is here.', 'This is not.'],
      ru: ['Бул алма.', 'Бул чоң.', 'Бул жерде.', 'Бул эмес.']
    },
    correctAnswer: 0
  },
  {
    id: 3,
    level: 'A1',
    question: 'Мен Кыргызстандан ______.',
    options: {
      en: ['барам', 'келем', 'болом', 'жашайм'],
      ru: ['барам', 'келем', 'болом', 'жашайм']
    },
    correctAnswer: 2
  },
  {
    id: 4,
    level: 'A1',
    question: 'Беш + үч = ?',
    options: {
      en: ['Жети', 'Тогуз', 'Сегиз', 'Он'],
      ru: ['Жети', 'Тогуз', 'Сегиз', 'Он']
    },
    correctAnswer: 2
  },
  {
    id: 5,
    level: 'A1',
    question: 'Какое значение слова "Рахмат"?',
    options: {
      en: ['Hello', 'Sorry', 'Good', 'Thank you'],
      ru: ['Привет', 'Простите', 'Хорошо', 'Спасибо']
    },
    correctAnswer: 3
  },
  {
    id: 6,
    level: 'A1',
    question: 'Мен ______ студентмин.',
    options: {
      en: ['чоң', 'билбейм', 'жакшы', 'бир'],
      ru: ['чоң', 'билбейм', 'жакшы', 'бир']
    },
    correctAnswer: 2,
    instruction: {
      en: 'Complete the sentence',
      ru: 'Дополните предложение'
    }
  },
  {
    id: 7,
    level: 'A1',
    question: 'Какой перевод слова "Кызыл"?',
    options: {
      en: ['Blue', 'Green', 'Yellow', 'Red'],
      ru: ['Синий', 'Зеленый', 'Желтый', 'Красный']
    },
    correctAnswer: 3
  },
  {
    id: 8,
    level: 'A1',
    question: 'Как переводится слово "Эртең"?',
    options: {
      en: ['Today', 'Tomorrow', 'Yesterday', 'Now'],
      ru: ['Сегодня', 'Завтра', 'Вчера', 'Сейчас']
    },
    correctAnswer: 1
  },

  // A2 Level (Questions 9-16)
  {
    id: 9,
    level: 'A2',
    question: 'Кечээ мен базарга ______ жана нан _______.',
    options: {
      en: ['бардым / сатып алдым', 'барам / сатып алам', 'барып / сатып ал', 'барган / сатып алган'],
      ru: ['бардым / сатып алдым', 'барам / сатып алам', 'барып / сатып ал', 'барган / сатып алган']
    },
    correctAnswer: 0
  },
  {
    id: 10,
    level: 'A2',
    question: 'Менин апамдын аты Айгүл. Ал ______ мугалим.',
    options: {
      en: ['жакшы', 'жакшынакай', 'жакшылык', 'жакшыраак'],
      ru: ['жакшы', 'жакшынакай', 'жакшылык', 'жакшыраак']
    },
    correctAnswer: 0
  },
  {
    id: 11,
    level: 'A2',
    question: 'Биз кечинде чай ______.',
    options: {
      en: ['ич', 'ичебиз', 'ичти', 'ичкен'],
      ru: ['ич', 'ичебиз', 'ичти', 'ичкен']
    },
    correctAnswer: 1
  },
  {
    id: 12,
    level: 'A2',
    question: 'Как переводится слово "Үй-бүлө"?',
    options: {
      en: ['Friends', 'Relatives', 'Family', 'Neighbors'],
      ru: ['Друзья', 'Родственники', 'Семья', 'Соседи']
    },
    correctAnswer: 2
  },
  {
    id: 13,
    level: 'A2',
    question: 'Кыргызстанда төрт мезгил бар: жаз, жай, күз жана ______.',
    options: {
      en: ['күн', 'түн', 'ай', 'кыш'],
      ru: ['күн', 'түн', 'ай', 'кыш']
    },
    correctAnswer: 3
  },
  {
    id: 14,
    level: 'A2',
    question: 'Мен китеп окуганды ______.',
    options: {
      en: ['жактырбайм', 'жакшы көрөм', 'жактырды', 'жакшы көрбөйт'],
      ru: ['жактырбайм', 'жакшы көрөм', 'жактырды', 'жакшы көрбөйт']
    },
    correctAnswer: 1
  },
  {
    id: 15,
    level: 'A2',
    question: 'Азыр саат канча?',
    options: {
      en: ['Мен жакшымын.', 'Саат беш.', 'Бул жерде.', 'Ооба, келем.'],
      ru: ['Мен жакшымын.', 'Саат беш.', 'Бул жерде.', 'Ооба, келем.']
    },
    correctAnswer: 1,
    instruction: {
      en: 'Give the correct answer to the question',
      ru: 'Дайте правильный ответ на вопрос'
    }
  },
  {
    id: 16,
    level: 'A2',
    question: 'Мен эртең Бишкекке барам, ______ ал жакта досторум бар.',
    options: {
      en: ['анткени', 'бирок', 'же', 'жана'],
      ru: ['анткени', 'бирок', 'же', 'жана']
    },
    correctAnswer: 0
  },

  // B1 Level (Questions 17-24)
  {
    id: 17,
    level: 'B1',
    question: 'Эгерде аба ырайы жакшы болсо, биз тоого _______.',
    options: {
      en: ['барабыз', 'бармакпыз', 'барышыбыз керек', 'барганбыз'],
      ru: ['барабыз', 'бармакпыз', 'барышыбыз керек', 'барганбыз']
    },
    correctAnswer: 0
  },
  {
    id: 18,
    level: 'B1',
    question: 'Кыргыз элинин байыркы салттары көп. В этом предложении слово "байыркы" какое имеет значение?',
    options: {
      en: ['New', 'Old', 'Modern', 'Interesting'],
      ru: ['Жаңы', 'Эски', 'Заманбап', 'Кызыктуу']
    },
    correctAnswer: 1
  },
  {
    id: 19,
    level: 'B1',
    question: 'Ал кечээ кечинде китеп ______ уктап калды.',
    options: {
      en: ['окуп', 'окуган', 'окуйт', 'окуса'],
      ru: ['окуп', 'окуган', 'окуйт', 'окуса']
    },
    correctAnswer: 0
  },
  {
    id: 20,
    level: 'B1',
    question: '"Манас" эпосу кыргыз элинин ______ мурасы болуп саналат.',
    options: {
      en: ['материалдык', 'табигый', 'руханий', 'экономикалык'],
      ru: ['материалдык', 'табигый', 'руханий', 'экономикалык']
    },
    correctAnswer: 2
  },
  {
    id: 21,
    level: 'B1',
    question: 'Мен сага жардам бере аламбы?',
    options: {
      en: ['Ооба, жардам бер.', 'Жок, рахмат, өзүм жасайм.', 'Жардам берчи.', 'Мен жардам берем.'],
      ru: ['Ооба, жардам бер.', 'Жок, рахмат, өзүм жасайм.', 'Жардам берчи.', 'Мен жардам берем.']
    },
    correctAnswer: 3,
    instruction: {
      en: 'Choose the incorrect answer',
      ru: 'Выберите неправильный ответ'
    }
  },
  {
    id: 22,
    level: 'B1',
    question: 'Биздин айылда жайкысын аба ырайы абдан ______ болот.',
    options: {
      en: ['суук', 'ысык', 'жаанчыл', 'шамалдуу'],
      ru: ['суук', 'ысык', 'жаанчыл', 'шамалдуу']
    },
    correctAnswer: 1
  },
  {
    id: 23,
    level: 'B1',
    question: 'Кыргызстандын борбору Бишкек шаарында ______.',
    options: {
      en: ['жайгашкан', 'жайгашат', 'жайгашты', 'жайгашмак'],
      ru: ['жайгашкан', 'жайгашат', 'жайгашты', 'жайгашмак']
    },
    correctAnswer: 1
  },
  {
    id: 24,
    level: 'B1',
    question: 'Кыргыздын улуттук суусундугу - кымыз. В этом предложении слово "улуттук" какое имеет значение?',
    options: {
      en: ['Public / Social', 'Local', 'National', 'Regional'],
      ru: ['Общественное', 'Местное', 'Национальное', 'Региональное']
    },
    correctAnswer: 2
  },

  // B2 Level (Questions 25-32)
  {
    id: 25,
    level: 'B2',
    question: 'Кыргыз элинин меймандостугу дүйнөгө белгилүү. В этом предложении слово "меймандостугу" какое имеет значение?',
    options: {
      en: ['Generosity', 'Friendship', 'Hospitality', 'Charity'],
      ru: ['Жоомарттык', 'Достук', 'Конок тосуучулук', 'Кайрымдуулук']
    },
    correctAnswer: 2
  },
  {
    id: 26,
    level: 'B2',
    question: 'Ал өзүнүн пикирин ______ айтты, ошондуктан баары аны түшүндү.',
    options: {
      en: ['ачык-айкын', 'бүдөмүк', 'кыскача', 'узун'],
      ru: ['ачык-айкын', 'бүдөмүк', 'кыскача', 'узун']
    },
    correctAnswer: 0
  },
  {
    id: 27,
    level: 'B2',
    question: 'Кыргызстандын тоолорунда сейрек кездешүүчү жаныбарлар ______.',
    options: {
      en: ['жашайт', 'жашаган', 'жашап жатат', 'жашашы мүмкүн эмес'],
      ru: ['жашайт', 'жашаган', 'жашап жатат', 'жашашы мүмкүн эмес']
    },
    correctAnswer: 0
  },
  {
    id: 28,
    level: 'B2',
    question: 'Кыргыздын салттуу үйлөнүү тоюнда көптөгөн ырым-жырымдар ______.',
    options: {
      en: ['аткарылган', 'аткарат', 'аткарылат', 'аткарылбайт'],
      ru: ['аткарылган', 'аткарат', 'аткарылат', 'аткарылбайт']
    },
    correctAnswer: 2
  },
  {
    id: 29,
    level: 'B2',
    question: 'Анын айткандарына караганда, ал бул маселенин ______ жакшы билет.',
    options: {
      en: ['үстүртөн', 'тереңин', 'сыртын', 'башын'],
      ru: ['үстүртөн', 'тереңин', 'сыртын', 'башын']
    },
    correctAnswer: 1
  },
  {
    id: 30,
    level: 'B2',
    question: 'Кыргыз элинин тарыхында көптөгөн баатырлар ______.',
    options: {
      en: ['болгон', 'болуп жатат', 'боло элек', 'болмок'],
      ru: ['болгон', 'болуп жатат', 'боло элек', 'болмок']
    },
    correctAnswer: 0
  },
  {
    id: 31,
    level: 'B2',
    question: 'Кыргыз тилинин байлыгын жана кооздугун сактоо ар бирибиздин ______.',
    options: {
      en: ['мүмкүнчүлүгүбүз', 'укугубуз', 'каалообуз', 'милдетибиз'],
      ru: ['мүмкүнчүлүгүбүз', 'укугубуз', 'каалообуз', 'милдетибиз']
    },
    correctAnswer: 3
  },
  {
    id: 32,
    level: 'B2',
    question: 'Анын айткан сөздөрү мени абдан ______.',
    options: {
      en: ['таң калтырмак', 'таң калтырат', 'таң калтырды', 'таң калтырбайт'],
      ru: ['таң калтырмак', 'таң калтырат', 'таң калтырды', 'таң калтырбайт']
    },
    correctAnswer: 2
  },

  // C1 Level (Questions 33-40)
  {
    id: 33,
    level: 'C1',
    question: 'Кыргыз элинин улуттук оюндарынын бири болгон көк бөрү ______ кылымдар бою сакталып келет.',
    options: {
      en: ['муундан муунга', 'улам-улам', 'кээде-кээде', 'дайыма'],
      ru: ['муундан муунга', 'улам-улам', 'кээде-кээде', 'дайыма']
    },
    correctAnswer: 0
  },
  {
    id: 34,
    level: 'C1',
    question: 'Анын чечкиндүүлүгү жана туруктуулугу ______ максатына жетүүгө жардам берди.',
    options: {
      en: ['карабастан', 'аркасында', 'болбосо', 'болгондо'],
      ru: ['карабастан', 'аркасында', 'болбосо', 'болгондо']
    },
    correctAnswer: 1
  },
  {
    id: 35,
    level: 'C1',
    question: 'Кыргызстандын жаратылышынын кооздугу адамды ______.',
    options: {
      en: ['кайдыгер калтырбайт эле', 'кайдыгер калтырат', 'кайдыгер калтырган', 'кайдыгер калтырбайт'],
      ru: ['кайдыгер калтырбайт эле', 'кайдыгер калтырат', 'кайдыгер калтырган', 'кайдыгер калтырбайт']
    },
    correctAnswer: 3
  },
  {
    id: 36,
    level: 'C1',
    question: 'Кыргыздын салттуу кол өнөрчүлүгүндөгү оймо-чиймелердин ар биринин өзүнчө ______ бар.',
    options: {
      en: ['себеби', 'максаты', 'мааниси', 'натыйжасы'],
      ru: ['себеби', 'максаты', 'мааниси', 'натыйжасы']
    },
    correctAnswer: 2
  },
  {
    id: 37,
    level: 'C1',
    question: 'Кыргыз тилинин грамматикалык өзгөчөлүктөрүн терең ______ үчүн көп эмгек талап кылынат.',
    options: {
      en: ['түшүнсө', 'түшүнбөө', 'түшүнгөн', 'түшүнүү'],
      ru: ['түшүнсө', 'түшүнбөө', 'түшүнгөн', 'түшүнүү']
    },
    correctAnswer: 3
  },
  {
    id: 38,
    level: 'C1',
    question: 'Кыргыз элинин тарыхындагы оор сыноолорго карабастан, алар өзүнүн ______ сактап калышты.',
    options: {
      en: ['тилин жана маданиятын', 'экономикасын', 'саясатын', 'географиясын'],
      ru: ['тилин жана маданиятын', 'экономикасын', 'саясатын', 'географиясын']
    },
    correctAnswer: 0
  },
  {
    id: 39,
    level: 'C1',
    question: 'Анын айткан сөздөрү менин оюмду ______.',
    options: {
      en: ['өзгөртмөк', 'өзгөртпөдү', 'өзгөрттү', 'өзгөртүп жатат'],
      ru: ['өзгөртмөк', 'өзгөртпөдү', 'өзгөрттү', 'өзгөртүп жатат']
    },
    correctAnswer: 2
  },
  {
    id: 40,
    level: 'C1',
    question: 'Кыргыздын улуттук кийимдеринин ар биринин өзүнчө ______ жана тарыхы бар.',
    options: {
      en: ['стили', 'өзгөчөлүгү', 'максаты', 'функциясы'],
      ru: ['стили', 'өзгөчөлүгү', 'максаты', 'функциясы']
    },
    correctAnswer: 1
  }
]

// Determine level based on test results
export function determineLevel(answers: number[]): 'A1' | 'A2' | 'B1' | 'B2' | 'C1' {
  // Count correct answers by level
  const correctByLevel = {
    A1: 0,
    A2: 0,
    B1: 0,
    B2: 0,
    C1: 0
  }

  answers.forEach((answer, index) => {
    const question = EXTENDED_PLACEMENT_TEST[index]
    if (answer === question.correctAnswer) {
      correctByLevel[question.level]++
    }
  })

  // Determine the highest level passed (≥5 correct answers out of 8)
  const threshold = 5
  let highestLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' = 'A1'

  if (correctByLevel.C1 >= threshold) {
    highestLevel = 'C1'
  } else if (correctByLevel.B2 >= threshold) {
    highestLevel = 'C1' // Start learning at C1 if passed B2
  } else if (correctByLevel.B1 >= threshold) {
    highestLevel = 'B2' // Start learning at B2 if passed B1
  } else if (correctByLevel.A2 >= threshold) {
    highestLevel = 'B1' // Start learning at B1 if passed A2
  } else if (correctByLevel.A1 >= threshold) {
    highestLevel = 'A2' // Start learning at A2 if passed A1
  }

  return highestLevel
}

// Calculate detailed scores by level
export function calculateDetailedScores(answers: number[]): Record<string, { correct: number, total: number, percentage: number }> {
  const scoresByLevel: Record<string, { correct: number, total: number }> = {
    A1: { correct: 0, total: 8 },
    A2: { correct: 0, total: 8 },
    B1: { correct: 0, total: 8 },
    B2: { correct: 0, total: 8 },
    C1: { correct: 0, total: 8 }
  }

  answers.forEach((answer, index) => {
    const question = EXTENDED_PLACEMENT_TEST[index]
    if (answer === question.correctAnswer) {
      scoresByLevel[question.level].correct++
    }
  })

  // Convert to percentages
  const detailedScores: Record<string, { correct: number, total: number, percentage: number }> = {}
  Object.entries(scoresByLevel).forEach(([level, scores]) => {
    detailedScores[level] = {
      ...scores,
      percentage: Math.round((scores.correct / scores.total) * 100)
    }
  })

  return detailedScores
}
