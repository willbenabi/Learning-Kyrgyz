namespace :a2_recommendations do
  desc "Generate daily A2 recommendations from curated links"
  task generate: :environment do
    puts "🎬 Generating A2 recommendations for #{Date.current}..."

    # Curated resources with descriptions
    a2_resources = [
      {
        type: 'watching',
        resource_type: 'Story',
        title: 'Кыргызские народные сказки',
        description: 'Слушайте народные сказки на кыргызском языке. Простая лексика и увлекательный сюжет.',
        url: 'https://www.youtube.com/watch?v=p1DiDyel_MU',
        thumbnail_url: 'https://i.ytimg.com/vi/p1DiDyel_MU/mqdefault.jpg'
      },
      {
        type: 'watching',
        resource_type: 'Video',
        title: 'Пословицы и скороговорки',
        description: 'Изучайте кыргызские пословицы и тренируйте произношение через скороговорки.',
        url: 'https://www.youtube.com/watch?v=Pbv2gSRK_SI',
        thumbnail_url: 'https://i.ytimg.com/vi/Pbv2gSRK_SI/mqdefault.jpg'
      },
      {
        type: 'reading',
        resource_type: 'Website',
        title: 'Полезный сайт для изучения слов (50languages)',
        description: 'Интерактивный разговорник с базовыми фразами и словами.',
        url: 'https://www.50languages.com/em/learn/phrasebook-lessons/162/ky#'
      },
      {
        type: 'watching',
        resource_type: 'Video',
        title: 'Грамматика кыргызского языка - плейлист',
        description: 'Полный курс грамматики кыргызского языка в видеоформате.',
        url: 'https://www.youtube.com/playlist?list=PL735lKtYrX1Viacq5CDOi8Sanz9HVjyLK'
      },
      {
        type: 'reading',
        resource_type: 'Story',
        title: 'Сказка "Кичинекей жалбырак жөнүндө жомок"',
        description: 'Читайте кыргызскую сказку с аудио.',
        url: 'https://kyrgyz-audio.com/kichinekej-zhalbyrak-zhonyyndo-zhomok/'
      },
      {
        type: 'listening',
        resource_type: 'Song',
        title: 'Старинные кыргызские песни',
        description: 'Коллекция классических кыргызских песен.',
        url: 'https://kyrgyz-audio.com/eski-yrlar/'
      },
      {
        type: 'listening',
        resource_type: 'Song',
        title: 'Современная кыргызская музыка',
        description: 'Популярные кыргызские песни.',
        url: 'https://www.youtube.com/watch?v=sakI9YmvBpc',
        thumbnail_url: 'https://i.ytimg.com/vi/sakI9YmvBpc/mqdefault.jpg'
      },
      {
        type: 'listening',
        resource_type: 'Song',
        title: 'Песня "Эне тил" (Родной язык)',
        description: 'Красивая песня о родном языке.',
        url: 'https://www.youtube.com/watch?v=HpKnW_qCm_s&list=RDHpKnW_qCm_s&start_radio=1',
        thumbnail_url: 'https://i.ytimg.com/vi/HpKnW_qCm_s/mqdefault.jpg'
      },
      {
        type: 'watching',
        resource_type: 'Video',
        title: 'Грамматика: главные и второстепенные члены предложения',
        description: 'Урок по синтаксису кыргызского языка.',
        url: 'https://www.youtube.com/watch?v=7arLLmRZ3HE',
        thumbnail_url: 'https://i.ytimg.com/vi/7arLLmRZ3HE/mqdefault.jpg'
      },
      {
        type: 'watching',
        resource_type: 'Video',
        title: 'Здоровый образ жизни на кыргызском',
        description: 'Видео о здоровье и спорте на кыргызском языке.',
        url: 'https://www.youtube.com/watch?v=G8sSCUqMfqw',
        thumbnail_url: 'https://i.ytimg.com/vi/G8sSCUqMfqw/mqdefault.jpg'
      }
    ]

    # Skip if recommendations already exist for today
    if DailyRecommendation.for_level_and_date('A2', Date.current).exists?
      puts "ℹ️  A2 recommendations already exist for today"
      return
    end

    # Create new recommendations (select 3 random from 10)
    selected = a2_resources.sample(3)
    created = 0

    selected.each do |resource|
      DailyRecommendation.create!(
        level: 'A2',
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

    puts "✅ Created #{created} A2 recommendations for #{Date.current}"
  end
end
