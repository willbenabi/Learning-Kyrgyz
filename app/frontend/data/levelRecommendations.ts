// Level-based recommendations for Kyrgyz learning with specific resources

export type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

export interface ResourceItem {
  title: {
    en: string
    ru: string
  }
  description: {
    en: string
    ru: string
  }
  url: string
  imageUrl?: string
  type: 'video' | 'article' | 'book' | 'song' | 'podcast' | 'film' | 'news'
}

export interface LevelRecommendations {
  level: Level
  description: {
    en: string
    ru: string
  }
  listening: ResourceItem[]
  reading: ResourceItem[]
  watching: ResourceItem[]
}

export const RECOMMENDATIONS: Record<Level, LevelRecommendations> = {
  A1: {
    level: 'A1',
    description: {
      en: 'At this level, you understand simple phrases and can talk about yourself and daily life.',
      ru: 'На этом уровне вы понимаете простые фразы и можете рассказать о себе и повседневной жизни.'
    },
    listening: [
      {
        title: {
          en: 'Children\'s Songs - "Керемет көч" Soundtrack',
          ru: 'Детские песни - Саундтрек "Керемет көч"'
        },
        description: {
          en: 'Simple songs with repetitive phrases and clear pronunciation',
          ru: 'Простые песни с повторяющимися фразами и четким произношением'
        },
        url: 'https://www.youtube.com/watch?v=keremet',
        imageUrl: 'https://i.ytimg.com/vi/keremet/maxresdefault.jpg',
        type: 'song'
      },
      {
        title: {
          en: 'Basic Kyrgyz Dialogues',
          ru: 'Базовые диалоги на кыргызском'
        },
        description: {
          en: 'Slow dialogues about greetings, introductions, and daily life',
          ru: 'Медленные диалоги о приветствиях, знакомстве и повседневной жизни'
        },
        url: 'https://www.youtube.com/c/LearnKyrgyz',
        type: 'podcast'
      },
      {
        title: {
          en: 'Kyrgyz Audio Dictionary',
          ru: 'Кыргызский аудиословарь'
        },
        description: {
          en: 'Essential vocabulary with native pronunciation',
          ru: 'Основная лексика с носительским произношением'
        },
        url: 'https://forvo.com/languages/ky/',
        type: 'podcast'
      }
    ],
    reading: [
      {
        title: {
          en: '"Чыңгыз Айтматов" - Simple Stories for Children',
          ru: '"Чыңгыз Айтматов" - Простые рассказы для детей'
        },
        description: {
          en: 'Illustrated children\'s stories adapted for beginners',
          ru: 'Иллюстрированные детские рассказы, адаптированные для начинающих'
        },
        url: 'https://kitep.kg/children',
        imageUrl: 'https://kitep.kg/images/children-books.jpg',
        type: 'book'
      },
      {
        title: {
          en: 'Simple Kyrgyz Signs and Labels',
          ru: 'Простые кыргызские вывески и надписи'
        },
        description: {
          en: 'Common signs you see in stores, streets, and public places',
          ru: 'Распространенные вывески в магазинах, на улицах и в общественных местах'
        },
        url: 'https://www.kg/daily-kyrgyz',
        type: 'article'
      },
      {
        title: {
          en: 'Kyrgyz Fairy Tales - "Эртегилер"',
          ru: 'Кыргызские сказки - "Эртегилер"'
        },
        description: {
          en: 'Short traditional tales with simple language',
          ru: 'Короткие традиционные сказки с простым языком'
        },
        url: 'https://kg.wikipedia.org/wiki/Кыргыз_эртегилери',
        type: 'book'
      }
    ],
    watching: [
      {
        title: {
          en: '"Керемет көч" - Cartoon Series',
          ru: '"Керемет көч" - Мультсериал'
        },
        description: {
          en: 'Popular Kyrgyz cartoon with simple dialogue and clear speech',
          ru: 'Популярный кыргызский мультфильм с простыми диалогами и четкой речью'
        },
        url: 'https://www.youtube.com/watch?v=keremet_koc',
        imageUrl: 'https://i.ytimg.com/vi/keremet/hqdefault.jpg',
        type: 'video'
      },
      {
        title: {
          en: 'Kyrgyz Cooking Videos',
          ru: 'Кыргызские кулинарные видео'
        },
        description: {
          en: 'Learn to cook while learning Kyrgyz - simple vocabulary about food',
          ru: 'Учитесь готовить и учить кыргызский - простая лексика о еде'
        },
        url: 'https://www.youtube.com/c/KyrgyzCooking',
        type: 'video'
      },
      {
        title: {
          en: 'Learn Kyrgyz with Beginner Lessons',
          ru: 'Учите кыргызский язык - уроки для начинающих'
        },
        description: {
          en: 'Step-by-step video lessons for absolute beginners',
          ru: 'Пошаговые видеоуроки для абсолютных новичков'
        },
        url: 'https://www.youtube.com/c/KyrgyzLessons',
        type: 'video'
      }
    ]
  },
  A2: {
    level: 'A2',
    description: {
      en: 'At this level, you can communicate in simple everyday situations and understand basic information on familiar topics.',
      ru: 'На этом уровне вы можете общаться в простых бытовых ситуациях и понимать основную информацию по знакомым темам.'
    },
    listening: [
      {
        title: {
          en: 'Kyrgyz Folk Tales - Audio Collection',
          ru: 'Кыргызские народные сказки - Аудио коллекция'
        },
        description: {
          en: 'Traditional stories narrated with clear pronunciation',
          ru: 'Традиционные истории с четким произношением'
        },
        url: 'https://www.storytel.com/kg/kyrgyz-tales',
        type: 'podcast'
      },
      {
        title: {
          en: 'Азаттык Radio - Simple News',
          ru: 'Радио Азаттык - Простые новости'
        },
        description: {
          en: 'Daily news in simplified Kyrgyz with clear vocabulary',
          ru: 'Ежедневные новости на упрощенном кыргызском языке'
        },
        url: 'https://www.azattyk.org/',
        type: 'news'
      },
      {
        title: {
          en: 'Kyrgyz Pop Songs with Lyrics',
          ru: 'Кыргызские поп-песни с текстами'
        },
        description: {
          en: 'Modern Kyrgyz music with clear lyrics for learning',
          ru: 'Современная кыргызская музыка с понятными текстами для изучения'
        },
        url: 'https://music.youtube.com/kyrgyz-pop',
        type: 'song'
      }
    ],
    reading: [
      {
        title: {
          en: 'Kaktus Media - Culture Articles',
          ru: 'Kaktus Media - Статьи о культуре'
        },
        description: {
          en: 'Short articles about Kyrgyz culture, traditions, and history',
          ru: 'Короткие статьи о кыргызской культуре, традициях и истории'
        },
        url: 'https://kaktus.media/doc/culture',
        imageUrl: 'https://kaktus.media/static/og-image.jpg',
        type: 'article'
      },
      {
        title: {
          en: 'Чыңгыз Айтматов - "Белый пароход" (adapted)',
          ru: 'Чыңгыз Айтматов - "Белый пароход" (адаптировано)'
        },
        description: {
          en: 'Simplified version of the classic Kyrgyz novel',
          ru: 'Упрощенная версия классического кыргызского романа'
        },
        url: 'https://kitep.kg/aitmatov-adapted',
        type: 'book'
      },
      {
        title: {
          en: 'Kyrgyz Social Media - Instagram Posts',
          ru: 'Кыргызские соцсети - Посты в Instagram'
        },
        description: {
          en: 'Follow popular Kyrgyz accounts with simple everyday language',
          ru: 'Следите за популярными кыргызскими аккаунтами с простым повседневным языком'
        },
        url: 'https://www.instagram.com/explore/tags/кыргызча/',
        type: 'article'
      }
    ],
    watching: [
      {
        title: {
          en: '"Кел, сүйүүбүз!" - Romantic Comedy',
          ru: '"Кел, сүйүүбүз!" - Романтическая комедия'
        },
        description: {
          en: 'Light Kyrgyz family film with everyday dialogue',
          ru: 'Легкий кыргызский семейный фильм с повседневными диалогами'
        },
        url: 'https://www.youtube.com/kyrgyz-films',
        imageUrl: 'https://i.ytimg.com/vi/kyrgyz-romance/maxresdefault.jpg',
        type: 'film'
      },
      {
        title: {
          en: 'Kyrgyzstan Travel Documentaries',
          ru: 'Документальные фильмы о Кыргызстане'
        },
        description: {
          en: 'Short documentaries about Kyrgyz nature and traditions',
          ru: 'Короткие документальные фильмы о природе и традициях Кыргызстана'
        },
        url: 'https://www.youtube.com/c/KyrgyzstanTravel',
        type: 'video'
      },
      {
        title: {
          en: 'Kyrgyz Vlogs - Daily Life',
          ru: 'Кыргызские влоги - Повседневная жизнь'
        },
        description: {
          en: 'Vlogs about life in Kyrgyzstan with simple conversation',
          ru: 'Влоги о жизни в Кыргызстане с простой беседой'
        },
        url: 'https://www.youtube.com/results?search_query=кыргызстан+влог',
        type: 'video'
      }
    ]
  },
  B1: {
    level: 'B1',
    description: {
      en: 'You feel comfortable in most everyday situations and understand more complex texts.',
      ru: 'Вы свободно чувствуете себя в большинстве бытовых ситуаций и понимаете более сложные тексты.'
    },
    listening: [
      {
        title: {
          en: 'Биринчи радио - Morning Programs',
          ru: 'Биринчи радио - Утренние программы'
        },
        description: {
          en: 'Live radio discussions about culture, travel, and daily topics',
          ru: 'Живые радиодискуссии о культуре, путешествиях и повседневных темах'
        },
        url: 'https://birinchi.kg/',
        type: 'podcast'
      },
      {
        title: {
          en: 'Kyrgyz Travel Podcasts',
          ru: 'Подкасты о путешествиях по Кыргызстану'
        },
        description: {
          en: 'Medium-complexity podcasts about traveling in Kyrgyzstan',
          ru: 'Подкасты средней сложности о путешествиях по Кыргызстану'
        },
        url: 'https://open.spotify.com/show/kyrgyz-travel',
        type: 'podcast'
      },
      {
        title: {
          en: 'Чыңгыз Айтматов Audiobooks',
          ru: 'Аудиокниги Чыңгыз Айтматов'
        },
        description: {
          en: 'Stories and novellas by the famous Kyrgyz writer',
          ru: 'Рассказы и повести знаменитого кыргызского писателя'
        },
        url: 'https://www.storytel.com/kg/aitmatov',
        type: 'podcast'
      }
    ],
    reading: [
      {
        title: {
          en: '24.kg - News Portal',
          ru: '24.kg - Новостной портал'
        },
        description: {
          en: 'Daily news, interviews, and cultural reviews in Kyrgyz',
          ru: 'Ежедневные новости, интервью и культурные обзоры на кыргызском'
        },
        url: 'https://24.kg/',
        imageUrl: 'https://24.kg/static/og-image.jpg',
        type: 'news'
      },
      {
        title: {
          en: 'Kasym Tynystanov - Short Stories',
          ru: 'Касым Тыныстанов - Короткие рассказы'
        },
        description: {
          en: 'Classic Kyrgyz short stories with rich vocabulary',
          ru: 'Классические кыргызские рассказы с богатой лексикой'
        },
        url: 'https://kitep.kg/tynystanov',
        type: 'book'
      },
      {
        title: {
          en: 'Kyrgyzstan.kg - Information Portal',
          ru: 'Kyrgyzstan.kg - Информационный портал'
        },
        description: {
          en: 'Comprehensive information about Kyrgyzstan in Kyrgyz',
          ru: 'Всеобъемлющая информация о Кыргызстане на кыргызском'
        },
        url: 'https://www.kyrgyzstan.kg/',
        type: 'article'
      }
    ],
    watching: [
      {
        title: {
          en: '"Курманжан Датка" - Historical Drama',
          ru: '"Курманжан Датка" - Исторический драматический фильм'
        },
        description: {
          en: 'Epic film about the queen of the Alai Kyrgyz',
          ru: 'Эпический фильм о королеве алайских кыргызов'
        },
        url: 'https://www.youtube.com/watch?v=kurmanjan-datka',
        imageUrl: 'https://i.ytimg.com/vi/kurmanjan/maxresdefault.jpg',
        type: 'film'
      },
      {
        title: {
          en: 'KTRK - National TV News',
          ru: 'КТРК - Новости национального телевидения'
        },
        description: {
          en: 'Daily news broadcasts with standard Kyrgyz language',
          ru: 'Ежедневные новостные выпуски на стандартном кыргызском языке'
        },
        url: 'https://www.ktrk.kg/',
        type: 'news'
      },
      {
        title: {
          en: 'Kyrgyz Documentary Series',
          ru: 'Кыргызские документальные сериалы'
        },
        description: {
          en: 'Cultural and educational programs about Kyrgyz heritage',
          ru: 'Культурно-образовательные программы о кыргызском наследии'
        },
        url: 'https://www.youtube.com/c/KyrgyzDocumentaries',
        type: 'video'
      }
    ]
  },
  B2: {
    level: 'B2',
    description: {
      en: 'You understand main ideas of complex texts and can express your viewpoint accurately.',
      ru: 'Вы понимаете основные идеи сложных текстов и можете точно выражать свою точку зрения.'
    },
    listening: [
      {
        title: {
          en: 'Азаттык - Discussion Programs',
          ru: 'Азаттык - Дискуссионные передачи'
        },
        description: {
          en: 'Debates and discussions on current affairs and politics',
          ru: 'Дебаты и дискуссии о текущих событиях и политике'
        },
        url: 'https://www.azattyk.org/podcasts',
        type: 'podcast'
      },
      {
        title: {
          en: 'Academic Lectures - KNU',
          ru: 'Академические лекции - КНУ'
        },
        description: {
          en: 'University lectures by Kyrgyz-speaking professors',
          ru: 'Университетские лекции кыргызскоязычных профессоров'
        },
        url: 'https://www.university.kg/lectures',
        type: 'podcast'
      },
      {
        title: {
          en: 'Чыңгыз Айтматов - Complete Audiobooks',
          ru: 'Чыңгыз Айтматов - Полные аудиокниги'
        },
        description: {
          en: 'Full versions of classic Kyrgyz literature',
          ru: 'Полные версии классической кыргызской литературы'
        },
        url: 'https://www.storytel.com/kg/aitmatov-full',
        type: 'podcast'
      }
    ],
    reading: [
      {
        title: {
          en: 'Чыңгыз Айтматов - "Джамиля"',
          ru: 'Чыңгыз Айтматов - "Джамиля"'
        },
        description: {
          en: 'One of the most celebrated works of Kyrgyz literature',
          ru: 'Одно из самых известных произведений кыргызской литературы'
        },
        url: 'https://kitep.kg/aitmatov-jamilya',
        imageUrl: 'https://kitep.kg/images/jamilya-cover.jpg',
        type: 'book'
      },
      {
        title: {
          en: 'Kloop.kg - Analytical Articles',
          ru: 'Kloop.kg - Аналитические статьи'
        },
        description: {
          en: 'In-depth articles on society, culture, and science',
          ru: 'Углубленные статьи о обществе, культуре и науке'
        },
        url: 'https://kloop.kg/',
        type: 'article'
      },
      {
        title: {
          en: 'Kyrgyz Scientific Journals',
          ru: 'Кыргызские научные журналы'
        },
        description: {
          en: 'Popular science articles on various topics',
          ru: 'Научно-популярные статьи по различным темам'
        },
        url: 'https://science.kg/journals',
        type: 'article'
      }
    ],
    watching: [
      {
        title: {
          en: '"Heavenly Nomadic" - Historical Epic',
          ru: '"Небесный кочевник" - Исторический эпос'
        },
        description: {
          en: 'Dramatic historical film about Kyrgyz heritage',
          ru: 'Драматический исторический фильм о кыргызском наследии'
        },
        url: 'https://www.youtube.com/watch?v=heavenly-nomadic',
        imageUrl: 'https://i.ytimg.com/vi/nomadic/maxresdefault.jpg',
        type: 'film'
      },
      {
        title: {
          en: 'Kyrgyzstan Nature Documentaries',
          ru: 'Документальные фильмы о природе Кыргызстана'
        },
        description: {
          en: 'Professional documentaries about Kyrgyz culture and landscapes',
          ru: 'Профессиональные документальные фильмы о кыргызской культуре и ландшафтах'
        },
        url: 'https://www.youtube.com/c/KyrgyzstanNature',
        type: 'video'
      },
      {
        title: {
          en: 'Political Debates and Analysis',
          ru: 'Политические дебаты и анализ'
        },
        description: {
          en: 'Complex discussions on current affairs and policy',
          ru: 'Сложные дискуссии о текущих событиях и политике'
        },
        url: 'https://www.youtube.com/c/KyrgyzDebates',
        type: 'video'
      }
    ]
  },
  C1: {
    level: 'C1',
    description: {
      en: 'You easily understand long complex texts and express thoughts fluently.',
      ru: 'Вы легко понимаете длинные сложные тексты и свободно выражаете мысли.'
    },
    listening: [
      {
        title: {
          en: 'Academic Seminars - Kyrgyz Universities',
          ru: 'Академические семинары - Кыргызские университеты'
        },
        description: {
          en: 'Advanced lectures on linguistics, history, and philosophy',
          ru: 'Продвинутые лекции по лингвистике, истории и философии'
        },
        url: 'https://www.university.kg/seminars',
        type: 'podcast'
      },
      {
        title: {
          en: 'Kyrgyz Radio Plays',
          ru: 'Кыргызские радиоспектакли'
        },
        description: {
          en: 'Literary readings and theatrical radio performances',
          ru: 'Литературные чтения и театральные радиопостановки'
        },
        url: 'https://birinchi.kg/radio-plays',
        type: 'podcast'
      },
      {
        title: {
          en: 'Expert Panel Discussions',
          ru: 'Экспертные панельные дискуссии'
        },
        description: {
          en: 'High-level discussions with academics and specialists',
          ru: 'Дискуссии высокого уровня с учеными и специалистами'
        },
        url: 'https://www.azattyk.org/expert-talks',
        type: 'podcast'
      }
    ],
    reading: [
      {
        title: {
          en: 'Манас Эпосу - Complete Epic',
          ru: 'Эпос Манас - Полная версия'
        },
        description: {
          en: 'The legendary Kyrgyz epic poem in its full form',
          ru: 'Легендарная кыргызская эпическая поэма в полной версии'
        },
        url: 'https://manas.kg/epic-full',
        imageUrl: 'https://manas.kg/images/manas-epic.jpg',
        type: 'book'
      },
      {
        title: {
          en: 'Kyrgyz Academic Research',
          ru: 'Кыргызские научные исследования'
        },
        description: {
          en: 'Scholarly articles and research papers in Kyrgyz',
          ru: 'Научные статьи и исследования на кыргызском языке'
        },
        url: 'https://science.kg/research',
        type: 'article'
      },
      {
        title: {
          en: 'Legal Documents and Official Texts',
          ru: 'Юридические документы и официальные тексты'
        },
        description: {
          en: 'Laws, regulations, and formal government documents',
          ru: 'Законы, регламенты и официальные государственные документы'
        },
        url: 'https://www.gov.kg/documents',
        type: 'article'
      }
    ],
    watching: [
      {
        title: {
          en: '"Ак кеме" (The White Steamship) - 1976',
          ru: '"Ак кеме" (Белый пароход) - 1976'
        },
        description: {
          en: 'Classic Soviet-Kyrgyz film based on Aitmatov\'s novel',
          ru: 'Классический советско-кыргызский фильм по роману Айтматова'
        },
        url: 'https://www.youtube.com/watch?v=ak-keme',
        imageUrl: 'https://i.ytimg.com/vi/ak-keme/maxresdefault.jpg',
        type: 'film'
      },
      {
        title: {
          en: '"Первый учитель" (The First Teacher) - 1965',
          ru: '"Первый учитель" - 1965'
        },
        description: {
          en: 'Iconic Kyrgyz film about education in early Soviet era',
          ru: 'Культовый кыргызский фильм об образовании в ранний советский период'
        },
        url: 'https://www.youtube.com/watch?v=first-teacher',
        imageUrl: 'https://i.ytimg.com/vi/first-teacher/maxresdefault.jpg',
        type: 'film'
      },
      {
        title: {
          en: 'Kyrgyz National Theater Recordings',
          ru: 'Записи Кыргызского национального театра'
        },
        description: {
          en: 'Professional theater performances in Kyrgyz',
          ru: 'Профессиональные театральные постановки на кыргызском'
        },
        url: 'https://www.theater.kg/recordings',
        type: 'video'
      }
    ]
  },
  C2: {
    level: 'C2',
    description: {
      en: 'At this level, you understand virtually everything heard or read and express yourself with maximum precision.',
      ru: 'На этом уровне вы понимаете практически всё — услышанное или прочитанное — и выражаетесь максимально точно.'
    },
    listening: [
      {
        title: {
          en: 'Kyrgyz Dialects and Regional Variations',
          ru: 'Кыргызские диалекты и региональные вариации'
        },
        description: {
          en: 'Recordings of different Kyrgyz dialects across regions',
          ru: 'Записи различных кыргызских диалектов в разных регионах'
        },
        url: 'https://www.linguistics.kg/dialects',
        type: 'podcast'
      },
      {
        title: {
          en: 'Complex Political Debates',
          ru: 'Сложные политические дебаты'
        },
        description: {
          en: 'Fast-paced discussions on advanced topics with multiple speakers',
          ru: 'Быстрые дискуссии на сложные темы с несколькими спикерами'
        },
        url: 'https://www.azattyk.org/debates',
        type: 'podcast'
      },
      {
        title: {
          en: 'Kyrgyz Poetry Readings',
          ru: 'Чтение кыргызской поэзии'
        },
        description: {
          en: 'Performances of classical and modern Kyrgyz poetry',
          ru: 'Исполнение классической и современной кыргызской поэзии'
        },
        url: 'https://poetry.kg/readings',
        type: 'podcast'
      }
    ],
    reading: [
      {
        title: {
          en: 'Old Kyrgyz Texts (Arabic Script)',
          ru: 'Старые кыргызские тексты (арабская графика)'
        },
        description: {
          en: 'Historical texts in traditional Arabic-based script',
          ru: 'Исторические тексты на традиционной арабской графике'
        },
        url: 'https://archive.kg/old-texts',
        type: 'book'
      },
      {
        title: {
          en: 'Kyrgyz Literary Criticism',
          ru: 'Кыргызская литературная критика'
        },
        description: {
          en: 'Academic analysis of Kyrgyz literature and theory',
          ru: 'Академический анализ кыргызской литературы и теории'
        },
        url: 'https://literature.kg/criticism',
        type: 'article'
      },
      {
        title: {
          en: 'Philosophical Works in Kyrgyz',
          ru: 'Философские произведения на кыргызском'
        },
        description: {
          en: 'Complex philosophical and historical texts',
          ru: 'Сложные философские и исторические тексты'
        },
        url: 'https://philosophy.kg/works',
        type: 'book'
      }
    ],
    watching: [
      {
        title: {
          en: 'Kyrgyz Film Festival Cinema',
          ru: 'Фестивальное кыргызское кино'
        },
        description: {
          en: 'Award-winning auteur films from Kyrgyz directors',
          ru: 'Награжденные авторские фильмы кыргызских режиссеров'
        },
        url: 'https://www.kff.kg/films',
        imageUrl: 'https://kff.kg/images/festival-poster.jpg',
        type: 'film'
      },
      {
        title: {
          en: 'Live Parliamentary Broadcasts',
          ru: 'Прямые трансляции из парламента'
        },
        description: {
          en: 'Complex political discussions and legislative sessions',
          ru: 'Сложные политические дискуссии и законодательные сессии'
        },
        url: 'https://www.parliament.kg/live',
        type: 'video'
      },
      {
        title: {
          en: 'Experimental Theater Performances',
          ru: 'Экспериментальные театральные постановки'
        },
        description: {
          en: 'Avant-garde and experimental Kyrgyz theater',
          ru: 'Авангардный и экспериментальный кыргызский театр'
        },
        url: 'https://www.theater.kg/experimental',
        type: 'video'
      }
    ]
  }
}

export function getRecommendationsForLevel(level: Level, language: 'en' | 'ru' = 'en'): LevelRecommendations {
  const recommendations = RECOMMENDATIONS[level]
  return recommendations
}
