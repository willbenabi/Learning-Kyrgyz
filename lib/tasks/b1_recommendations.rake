namespace :b1_recommendations do
  desc "Generate daily B1 recommendations from curated links"
  task generate: :environment do
    puts "🎬 Generating B1 recommendations for #{Date.current}..."

    # Curated resources with descriptions
    b1_resources = [
      {
        type: 'reading',
        resource_type: 'Story',
        title: 'Кыргызские народные сказки (аудио)',
        description: 'Коллекция народных сказок с аудиозаписями.',
        url: 'https://kyrgyz-audio.com/kyrgyz-el-zhomoktoru/'
      },
      {
        type: 'watching',
        resource_type: 'Video',
        title: 'Как найти друга и как его сберечь?',
        description: 'Познавательное видео о дружбе на кыргызском языке.',
        url: 'https://www.youtube.com/watch?v=uktTDHfspfY',
        thumbnail_url: 'https://i.ytimg.com/vi/uktTDHfspfY/mqdefault.jpg'
      },
      {
        type: 'watching',
        resource_type: 'Video',
        title: 'Грамматика: однородные члены предложения',
        description: 'Урок по синтаксису кыргызского языка.',
        url: 'https://www.youtube.com/watch?v=0NjBtUJ0dc0',
        thumbnail_url: 'https://i.ytimg.com/vi/0NjBtUJ0dc0/mqdefault.jpg'
      },
      {
        type: 'watching',
        resource_type: 'Video',
        title: 'Видео на тему "Описание"',
        description: 'Учитесь описывать предметы, людей и явления на кыргызском языке.',
        url: 'https://www.youtube.com/watch?v=rN2Nr_Vt_PE',
        thumbnail_url: 'https://i.ytimg.com/vi/rN2Nr_Vt_PE/mqdefault.jpg'
      },
      {
        type: 'listening',
        resource_type: 'Song',
        title: 'Песня "Мурас" (Наследие)',
        description: 'Красивая кыргызская песня о культурном наследии.',
        url: 'https://www.youtube.com/watch?v=7ALPIons9NU&list=RD7ALPIons9NU&start_radio=1',
        thumbnail_url: 'https://i.ytimg.com/vi/7ALPIons9NU/mqdefault.jpg'
      },
      {
        type: 'listening',
        resource_type: 'Song',
        title: 'Гимн Кыргызстана',
        description: 'Государственный гимн Кыргызской Республики.',
        url: 'https://www.youtube.com/watch?v=ZLrdXAnzzXM&list=RDZLrdXAnzzXM&start_radio=1',
        thumbnail_url: 'https://i.ytimg.com/vi/ZLrdXAnzzXM/mqdefault.jpg'
      },
      {
        type: 'listening',
        resource_type: 'Song',
        title: 'Песня "Молмолум"',
        description: 'Популярная современная кыргызская песня.',
        url: 'https://www.youtube.com/watch?v=DUWr3QxGgWo&list=RDDUWr3QxGgWo&start_radio=1',
        thumbnail_url: 'https://i.ytimg.com/vi/DUWr3QxGgWo/mqdefault.jpg'
      },
      {
        type: 'reading',
        resource_type: 'Article',
        title: 'Интересные факты о Кыргызстане',
        description: '50 интересных фактов о Кыргызстане на кыргызском языке.',
        url: 'https://nazarnews.org/posts/djn-zhnnd-50-kyizyiktuu-faktyilar'
      },
      {
        type: 'reading',
        resource_type: 'Book',
        title: 'Кыргызские народные сказки (книга PDF)',
        description: 'Сборник кыргызских народных сказок в PDF формате.',
        url: 'https://new.bizdin.kg/media/books/Kyrgyz-El-Zhomoktor-zhyinagy.pdf'
      }
    ]

    # Skip if recommendations already exist for today
    if DailyRecommendation.for_level_and_date('B1', Date.current).exists?
      puts "ℹ️  B1 recommendations already exist for today"
      return
    end

    # Create new recommendations (select 3 random from 9)
    selected = b1_resources.sample(3)
    created = 0

    selected.each do |resource|
      DailyRecommendation.create!(
        level: 'B1',
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

    puts "✅ Created #{created} B1 recommendations for #{Date.current}"
  end
end
