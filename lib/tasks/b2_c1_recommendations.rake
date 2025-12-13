namespace :b2_c1_recommendations do
  desc "Generate daily B2 and C1 recommendations from curated links"
  task generate: :environment do
    puts "🎬 Generating B2 and C1 recommendations for #{Date.current}..."

    # Curated resources suitable for both B2 and C1 levels
    advanced_resources = [
      {
        type: 'reading',
        resource_type: 'Article',
        title: 'Новости Кыргызстана (Sputnik)',
        description: 'Актуальные новости Кыргызстана и мира.',
        url: 'https://sputnik.kg/news/'
      },
      {
        type: 'watching',
        resource_type: 'Series',
        title: 'Сериал "Мурас" (плейлист)',
        description: 'Популярный кыргызский сериал о семейных традициях и культурном наследии.',
        url: 'https://www.youtube.com/playlist?list=PLKaleKo5i2XSNhuuZomz-sLzr_gIr4BO6'
      },
      {
        type: 'watching',
        resource_type: 'Series',
        title: 'Сериал "Контора"',
        description: 'Кыргызская комедия о жизни офисных работников.',
        url: 'https://www.youtube.com/watch?v=50TJffdMlLE',
        thumbnail_url: 'https://i.ytimg.com/vi/50TJffdMlLE/mqdefault.jpg'
      },
      {
        type: 'watching',
        resource_type: 'Film',
        title: 'Фильм "Полчан"',
        description: 'Кыргызский художественный фильм.',
        url: 'https://www.youtube.com/watch?v=xxEZPQ42P_A',
        thumbnail_url: 'https://i.ytimg.com/vi/xxEZPQ42P_A/mqdefault.jpg'
      },
      {
        type: 'watching',
        resource_type: 'Film',
        title: 'Фильм "Полчан 2"',
        description: 'Продолжение популярного фильма.',
        url: 'https://www.youtube.com/watch?v=UylgevQs8q0',
        thumbnail_url: 'https://i.ytimg.com/vi/UylgevQs8q0/mqdefault.jpg'
      },
      {
        type: 'watching',
        resource_type: 'Film',
        title: 'Фильм "Ханбийке"',
        description: 'Исторический фильм о знаменитой кыргызской правительнице.',
        url: 'https://www.youtube.com/watch?v=T0fL8C52Kpw',
        thumbnail_url: 'https://i.ytimg.com/vi/T0fL8C52Kpw/mqdefault.jpg'
      },
      {
        type: 'watching',
        resource_type: 'Series',
        title: 'Сериал "Келинка" (плейлист)',
        description: 'Популярный семейный сериал на кыргызском языке.',
        url: 'https://www.youtube.com/playlist?list=PL1qZ9EkahwvvxqKp6yiYZpSNlokw6F-iM'
      },
      {
        type: 'watching',
        resource_type: 'Series',
        title: 'Сериал "Шерине"',
        description: 'Кыргызский сериал с интересным сюжетом.',
        url: 'https://www.youtube.com/watch?v=ecY2_Piw6zM',
        thumbnail_url: 'https://i.ytimg.com/vi/ecY2_Piw6zM/mqdefault.jpg'
      },
      {
        type: 'reading',
        resource_type: 'Book',
        title: 'Произведения Чынгыза Айтматова',
        description: 'Классическая кыргызская литература от всемирно известного писателя.',
        url: 'https://loveread.ec/books.php?id_author=34'
      },
      {
        type: 'reading',
        resource_type: 'Book',
        title: 'Эпос "Манас"',
        description: 'Великий кыргызский эпос - основа национальной культуры и литературы.',
        url: 'https://eposmanas.ru/manas_kg/-446/-465/'
      },
      {
        type: 'reading',
        resource_type: 'Book',
        title: 'Стихи Алыкула Осмонова',
        description: 'Поэзия выдающегося кыргызского поэта.',
        url: 'https://vostoka.ucoz.com/publ/1-1-0-2993'
      },
      {
        type: 'watching',
        resource_type: 'Film',
        title: 'Фильм "Буйиш"',
        description: 'Кыргызский фильм о семейных ценностях и традициях.',
        url: 'https://www.youtube.com/watch?v=xf8nAVyheis',
        thumbnail_url: 'https://i.ytimg.com/vi/xf8nAVyheis/mqdefault.jpg'
      },
      {
        type: 'reading',
        resource_type: 'Website',
        title: 'Электронная библиотека Okuma.kg',
        description: 'Большая коллекция кыргызских книг онлайн.',
        url: 'https://www.okuma.kg/'
      }
    ]

    created_b2 = 0
    created_c1 = 0

    # Generate for B2 level
    unless DailyRecommendation.for_level_and_date('B2', Date.current).exists?
      selected_b2 = advanced_resources.sample(3)
      selected_b2.each do |resource|
        DailyRecommendation.create!(
          level: 'B2',
          date: Date.current,
          content_type: resource[:type],
          resource_type: resource[:resource_type],
          title: resource[:title],
          description: resource[:description],
          url: resource[:url],
          thumbnail_url: resource[:thumbnail_url],
          generated_by_ai: false
        )
        created_b2 += 1
      end
      puts "✅ Created #{created_b2} B2 recommendations for #{Date.current}"
    else
      puts "ℹ️  B2 recommendations already exist for today"
    end

    # Generate for C1 level
    unless DailyRecommendation.for_level_and_date('C1', Date.current).exists?
      selected_c1 = advanced_resources.sample(3)
      selected_c1.each do |resource|
        DailyRecommendation.create!(
          level: 'C1',
          date: Date.current,
          content_type: resource[:type],
          resource_type: resource[:resource_type],
          title: resource[:title],
          description: resource[:description],
          url: resource[:url],
          thumbnail_url: resource[:thumbnail_url],
          generated_by_ai: false
        )
        created_c1 += 1
      end
      puts "✅ Created #{created_c1} C1 recommendations for #{Date.current}"
    else
      puts "ℹ️  C1 recommendations already exist for today"
    end

    puts "🎉 Total created: B2 (#{created_b2}) + C1 (#{created_c1})"
  end
end
