# Sample video recommendations for all levels
# Admin can add more through the admin interface

puts "Creating video recommendations..."

# A1 Level - Beginner videos
VideoRecommendation.find_or_create_by!(
  level: 'A1',
  title: 'Кыргыз алфавити жана тыбыштар',
  description: 'Кыргыз алфавитин жана негизги тыбыштарды үйрөнүү. Башталгычтар үчүн жөнөкөй сабак.',
  video_url: 'https://www.youtube.com/watch?v=example1',
  thumbnail_url: 'https://img.youtube.com/vi/example1/hqdefault.jpg',
  category: 'tutorial'
)

VideoRecommendation.find_or_create_by!(
  level: 'A1',
  title: 'Саламдашуу жана таанышуу',
  description: 'Кыргызча кандай саламдашуу жана өзүңдү тааныштыруу керек экенин үйрөнөбүз.',
  video_url: 'https://www.youtube.com/watch?v=example2',
  thumbnail_url: 'https://img.youtube.com/vi/example2/hqdefault.jpg',
  category: 'conversation'
)

# A2 Level - Elementary videos
VideoRecommendation.find_or_create_by!(
  level: 'A2',
  title: 'Күнүмдүк диалогдор: дүкөндө',
  description: 'Дүкөндө кыргызча сүйлөшүү үчүн пайдалуу сөздөр жана сүйлөмдөр.',
  video_url: 'https://www.youtube.com/watch?v=example3',
  thumbnail_url: 'https://img.youtube.com/vi/example3/hqdefault.jpg',
  category: 'conversation'
)

# B1 Level - Intermediate videos  
VideoRecommendation.find_or_create_by!(
  level: 'B1',
  title: 'Кыргызстандын маданияты',
  description: 'Кыргызстандын салттары, каада-жөрөлгөлөрү жана маданияты жөнүндө кызыктуу маалымат.',
  video_url: 'https://www.youtube.com/watch?v=example4',
  thumbnail_url: 'https://img.youtube.com/vi/example4/hqdefault.jpg',
  category: 'culture'
)

# B2 Level - Upper intermediate videos
VideoRecommendation.find_or_create_by!(
  level: 'B2',
  title: 'Азыркы күндүн кыргыз тили',
  description: 'Заманбап кыргыз тилинин өзгөчөлүктөрү жана жаңы сөздөр.',
  video_url: 'https://www.youtube.com/watch?v=example5',
  thumbnail_url: 'https://img.youtube.com/vi/example5/hqdefault.jpg',
  category: 'grammar'
)

# C1 Level - Advanced videos
VideoRecommendation.find_or_create_by!(
  level: 'C1',
  title: 'Манас дастаны: адабий талдоо',
  description: 'Манас дастанынын тил өзгөчөлүктөрү жана адабий маани-мазмуну.',
  video_url: 'https://www.youtube.com/watch?v=example6',
  thumbnail_url: 'https://img.youtube.com/vi/example6/hqdefault.jpg',
  category: 'culture'
)

puts "✓ Created #{VideoRecommendation.count} video recommendations"
