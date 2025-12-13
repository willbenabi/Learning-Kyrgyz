namespace :a1_recommendations do
  desc "Generate daily A1 recommendations from curated YouTube links"
  task generate: :environment do
    puts "🎬 Generating A1 recommendations for #{Date.current}..."

    # YouTube links with descriptions
    a1_resources = [
      {
        type: 'listening',
        resource_type: 'Story',
        title: 'Аудио сказки на кыргызском языке',
        description: 'Идеально для начинающих! Слушайте простые кыргызские сказки перед сном.',
        url: 'https://www.youtube.com/watch?v=ijK0fOrCQfQ',
        thumbnail_url: 'https://i.ytimg.com/vi/ijK0fOrCQfQ/mqdefault.jpg'
      },
      {
        type: 'watching',
        resource_type: 'Song',
        title: 'Кыргызский алфавит в песне',
        description: 'Запоминающаяся мелодия поможет быстро выучить все буквы кыргызского алфавита.',
        url: 'https://www.youtube.com/watch?v=qWRJ59G7a0s',
        thumbnail_url: 'https://i.ytimg.com/vi/qWRJ59G7a0s/mqdefault.jpg'
      },
      {
        type: 'watching',
        resource_type: 'Film',
        title: 'Мультфильм "Манас" на кыргызском',
        description: 'Познакомьтесь с кыргызским эпосом через мультфильм с простыми диалогами.',
        url: 'https://www.youtube.com/watch?v=BuqbhMco6cU',
        thumbnail_url: 'https://i.ytimg.com/vi/BuqbhMco6cU/mqdefault.jpg'
      },
      {
        type: 'watching',
        resource_type: 'Series',
        title: 'Сериал "Козулар" - забавные истории',
        description: 'Увлекательные короткие истории на простом кыргызском языке.',
        url: 'https://www.youtube.com/playlist?list=PL7SUs-CR73bA6ZxAz4D6p9LkRmyUouoy2',
        thumbnail_url: 'https://i.ytimg.com/vi/Kozular/mqdefault.jpg'
      },
      {
        type: 'watching',
        resource_type: 'Game',
        title: 'Загадки на кыргызском',
        description: 'Развивайте логику и расширяйте словарный запас через традиционные кыргызские загадки.',
        url: 'https://www.youtube.com/playlist?list=PLxaYXv_lS6skxGMdPWRxbIGguSIpf__jl'
      },
      {
        type: 'watching',
        resource_type: 'Video',
        title: 'Урок фонетики кыргызского языка',
        description: 'Научитесь правильно произносить все звуки кыргызского языка.',
        url: 'https://www.youtube.com/watch?v=jnHyVHr3c8Y',
        thumbnail_url: 'https://i.ytimg.com/vi/jnHyVHr3c8Y/mqdefault.jpg'
      },
      {
        type: 'watching',
        resource_type: 'Video',
        title: 'Изучение алфавита с примерами',
        description: 'Визуальное запоминание букв с примерами слов.',
        url: 'https://www.youtube.com/watch?v=-w2bm3-6BFQ',
        thumbnail_url: 'https://i.ytimg.com/vi/-w2bm3-6BFQ/mqdefault.jpg'
      },
      {
        type: 'watching',
        resource_type: 'Video',
        title: 'Цвета на кыргызском языке',
        description: 'Выучите названия всех основных цветов с примерами использования.',
        url: 'https://www.youtube.com/watch?v=4T1h5A_vapQ',
        thumbnail_url: 'https://i.ytimg.com/vi/4T1h5A_vapQ/mqdefault.jpg'
      },
      {
        type: 'watching',
        resource_type: 'Video',
        title: 'Числа на кыргызском (1-100)',
        description: 'Научитесь считать от 1 до 100 на кыргызском языке.',
        url: 'https://www.youtube.com/watch?v=gDFzZ_5zgPk',
        thumbnail_url: 'https://i.ytimg.com/vi/gDFzZ_5zgPk/mqdefault.jpg'
      }
    ]

    # Skip if recommendations already exist for today
    if DailyRecommendation.for_level_and_date('A1', Date.current).exists?
      puts "ℹ️  A1 recommendations already exist for today"
      return
    end

    # Create new recommendations (select 3 random from 9)
    selected = a1_resources.sample(3)
    created = 0

    selected.each do |resource|
      DailyRecommendation.create!(
        level: 'A1',
        date: Date.current,
        content_type: resource[:type],
        resource_type: resource[:resource_type],
        title: resource[:title],
        description: resource[:description],
        url: resource[:url],
        thumbnail_url: resource[:thumbnail_url],
        generated_by_ai: false
      )
      created += 1
    end

    puts "✅ Created #{created} A1 recommendations for #{Date.current}"
  end
end
