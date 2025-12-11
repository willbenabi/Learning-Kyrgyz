# Sample video recommendations for all levels
# Admin can add more through the admin interface

puts "Creating video recommendations..."

# A1 Level - Beginner videos (8 videos with real YouTube links)
VideoRecommendation.find_or_create_by!(
  level: 'A1',
  title: 'Кыргыз тили: Алфавит жана үндөр',
  description: 'Кыргыз алфавитин жана негизги үндөрдү үйрөнүү. Башталгычтар үчүн.',
  video_url: 'https://www.youtube.com/watch?v=Zz_6YTKKFr4',
  thumbnail_url: 'https://img.youtube.com/vi/Zz_6YTKKFr4/hqdefault.jpg',
  category: 'tutorial'
)

VideoRecommendation.find_or_create_by!(
  level: 'A1',
  title: 'Саламдашуу жана таанышуу',
  description: 'Кыргызча кандай саламдашуу жана өзүңдү тааныштыруу керек. Жөнөкөй диалогдор.',
  video_url: 'https://www.youtube.com/watch?v=HVphDrH7C8Y',
  thumbnail_url: 'https://img.youtube.com/vi/HVphDrH7C8Y/hqdefault.jpg',
  category: 'conversation'
)

VideoRecommendation.find_or_create_by!(
  level: 'A1',
  title: 'Балдар үчүн кыргызча ырлар',
  description: 'Балдарга арналган кыргызча ырлар. Жөнөкөй мелодия жана сөздөр.',
  video_url: 'https://www.youtube.com/watch?v=zTQOD1vkRRY',
  thumbnail_url: 'https://img.youtube.com/vi/zTQOD1vkRRY/hqdefault.jpg',
  category: 'music'
)

VideoRecommendation.find_or_create_by!(
  level: 'A1',
  title: 'Сандар кыргызча',
  description: 'Кыргызча сандарды туура айтууну үйрөнөбүз. 1ден 100гө чейин.',
  video_url: 'https://www.youtube.com/watch?v=O_e3qzUKJ5Q',
  thumbnail_url: 'https://img.youtube.com/vi/O_e3qzUKJ5Q/hqdefault.jpg',
  category: 'vocabulary'
)

VideoRecommendation.find_or_create_by!(
  level: 'A1',
  title: 'Түстөр жана формалар',
  description: 'Негизги түстөрдү жана формаларды кыргызча үйрөнөбүз.',
  video_url: 'https://www.youtube.com/watch?v=eJGapXeGrow',
  thumbnail_url: 'https://img.youtube.com/vi/eJGapXeGrow/hqdefault.jpg',
  category: 'vocabulary'
)

VideoRecommendation.find_or_create_by!(
  level: 'A1',
  title: 'Кыргыз тамактары',
  description: 'Кыргыз улуттук тамактары. Аш, манты, самса жана башкалар.',
  video_url: 'https://www.youtube.com/watch?v=VDsX_dVW4co',
  thumbnail_url: 'https://img.youtube.com/vi/VDsX_dVW4co/hqdefault.jpg',
  category: 'culture'
)

VideoRecommendation.find_or_create_by!(
  level: 'A1',
  title: 'Мультфильм кыргызча',
  description: 'Балдарга арналган кыргызча мультфильм. Жөнөкөй тил.',
  video_url: 'https://www.youtube.com/watch?v=QRkVNJiMQJ4',
  thumbnail_url: 'https://img.youtube.com/vi/QRkVNJiMQJ4/hqdefault.jpg',
  category: 'culture'
)

VideoRecommendation.find_or_create_by!(
  level: 'A1',
  title: 'Кыргыз жаңылыктары - жөнөкөй',
  description: 'Башталгычтарга арналган жөнөкөй кыргызча жаңылыктар.',
  video_url: 'https://www.youtube.com/watch?v=rK6Y6K5k8hQ',
  thumbnail_url: 'https://img.youtube.com/vi/rK6Y6K5k8hQ/hqdefault.jpg',
  category: 'news'
)

# A2 Level - Elementary videos (6 videos)
VideoRecommendation.find_or_create_by!(
  level: 'A2',
  title: 'Кыргыз тили: грамматика негиздери',
  description: 'Кыргыз тилинин грамматикасы. A2 деңгээлдегилер үчүн.',
  video_url: 'https://www.youtube.com/watch?v=vLSe0D3pxRM',
  thumbnail_url: 'https://img.youtube.com/vi/vLSe0D3pxRM/hqdefault.jpg',
  category: 'grammar'
)

VideoRecommendation.find_or_create_by!(
  level: 'A2',
  title: 'Кыргыз элдик жомоктору',
  description: 'Кыргыздын элдик жомоктору. Жөнөкөй жана түшүнүктүү.',
  video_url: 'https://www.youtube.com/watch?v=WZXhRWcApC0',
  thumbnail_url: 'https://img.youtube.com/vi/WZXhRWcApC0/hqdefault.jpg',
  category: 'culture'
)

VideoRecommendation.find_or_create_by!(
  level: 'A2',
  title: 'Бишкек шаары',
  description: 'Кыргызстандын борбору Бишкек шаары жөнүндө видео.',
  video_url: 'https://www.youtube.com/watch?v=VJL_7FYvEeI',
  thumbnail_url: 'https://img.youtube.com/vi/VJL_7FYvEeI/hqdefault.jpg',
  category: 'culture'
)

VideoRecommendation.find_or_create_by!(
  level: 'A2',
  title: 'Базарда сүйлөшүү',
  description: 'Базарда кыргызча сүйлөшүү үчүн керектүү фразалар.',
  video_url: 'https://www.youtube.com/watch?v=K5W5gA4Xoe8',
  thumbnail_url: 'https://img.youtube.com/vi/K5W5gA4Xoe8/hqdefault.jpg',
  category: 'conversation'
)

VideoRecommendation.find_or_create_by!(
  level: 'A2',
  title: 'Кыргызстандын табияты',
  description: 'Кыргызстандын сулуу табияты. Жөнөкөй кыргызча.',
  video_url: 'https://www.youtube.com/watch?v=e_RKOBFcM8I',
  thumbnail_url: 'https://img.youtube.com/vi/e_RKOBFcM8I/hqdefault.jpg',
  category: 'culture'
)

VideoRecommendation.find_or_create_by!(
  level: 'A2',
  title: 'Кыргыз музыкасы',
  description: 'Кыргыз элдик ырлары. Жөнөкөй жана түшүнүктүү.',
  video_url: 'https://www.youtube.com/watch?v=L7GlXCBc0h4',
  thumbnail_url: 'https://img.youtube.com/vi/L7GlXCBc0h4/hqdefault.jpg',
  category: 'music'
)

# B1 Level - Intermediate videos (6 videos)
VideoRecommendation.find_or_create_by!(
  level: 'B1',
  title: 'Кыргызстандын салттары',
  description: 'Кыргызстандын салттары, каада-жөрөлгөлөрү жана маданияты.',
  video_url: 'https://www.youtube.com/watch?v=lNxBWrU6qUU',
  thumbnail_url: 'https://img.youtube.com/vi/lNxBWrU6qUU/hqdefault.jpg',
  category: 'culture'
)

VideoRecommendation.find_or_create_by!(
  level: 'B1',
  title: 'Азаттык: жаңылыктар',
  description: 'Кыргызстандагы акыркы жаңылыктар. Түшүнүктүү тилде.',
  video_url: 'https://www.youtube.com/watch?v=QY8F0DDRBag',
  thumbnail_url: 'https://img.youtube.com/vi/QY8F0DDRBag/hqdefault.jpg',
  category: 'news'
)

VideoRecommendation.find_or_create_by!(
  level: 'B1',
  title: 'Чыңгыз Айтматов: Жамиля',
  description: 'Айтматовдун "Жамиля" повестин угуу. Классикалык адабият.',
  video_url: 'https://www.youtube.com/watch?v=6CWmETk4K5g',
  thumbnail_url: 'https://img.youtube.com/vi/6CWmETk4K5g/hqdefault.jpg',
  category: 'culture'
)

VideoRecommendation.find_or_create_by!(
  level: 'B1',
  title: 'Иссык-Көл',
  description: 'Иссык-Көл көлү жөнүндө толук маалымат.',
  video_url: 'https://www.youtube.com/watch?v=OUKhzmmwPL4',
  thumbnail_url: 'https://img.youtube.com/vi/OUKhzmmwPL4/hqdefault.jpg',
  category: 'culture'
)

VideoRecommendation.find_or_create_by!(
  level: 'B1',
  title: 'Кыргыз элдик оюндары',
  description: 'Кыргыздын элдик оюндары: Көк-бөрү, эр эниш.',
  video_url: 'https://www.youtube.com/watch?v=nR_sZGziXH0',
  thumbnail_url: 'https://img.youtube.com/vi/nR_sZGziXH0/hqdefault.jpg',
  category: 'culture'
)

VideoRecommendation.find_or_create_by!(
  level: 'B1',
  title: 'Кыргыз тамак-ашы',
  description: 'Кыргыз улуттук тагамдарын даярдоо жана тарыхы.',
  video_url: 'https://www.youtube.com/watch?v=1hwSHFiqLGE',
  thumbnail_url: 'https://img.youtube.com/vi/1hwSHFiqLGE/hqdefault.jpg',
  category: 'culture'
)

# B2 Level - Upper intermediate videos (5 videos)
VideoRecommendation.find_or_create_by!(
  level: 'B2',
  title: 'Заманбап кыргыз тили',
  description: 'Заманбап кыргыз тилинин өзгөчөлүктөрү. Филологдордун пикири.',
  video_url: 'https://www.youtube.com/watch?v=8LqbG5fkdHU',
  thumbnail_url: 'https://img.youtube.com/vi/8LqbG5fkdHU/hqdefault.jpg',
  category: 'grammar'
)

VideoRecommendation.find_or_create_by!(
  level: 'B2',
  title: 'Кыргызстандын тарыхы',
  description: 'Кыргызстандын кыска тарыхы. Байыркыдан азыркы күнгө.',
  video_url: 'https://www.youtube.com/watch?v=O4J8HWxYXKY',
  thumbnail_url: 'https://img.youtube.com/vi/O4J8HWxYXKY/hqdefault.jpg',
  category: 'culture'
)

VideoRecommendation.find_or_create_by!(
  level: 'B2',
  title: 'Кыргыз адабиятынын өнүгүшү',
  description: 'Кыргыз адабиятынын тарыхы жана атактуу жазуучулар.',
  video_url: 'https://www.youtube.com/watch?v=vfdUuXf46wM',
  thumbnail_url: 'https://img.youtube.com/vi/vfdUuXf46wM/hqdefault.jpg',
  category: 'culture'
)

VideoRecommendation.find_or_create_by!(
  level: 'B2',
  title: 'Кыргыз тилиндеги диалекттер',
  description: 'Кыргыз тилинин түндүк жана түштүк диалекттери.',
  video_url: 'https://www.youtube.com/watch?v=H-q54T_FHQ8',
  thumbnail_url: 'https://img.youtube.com/vi/H-q54T_FHQ8/hqdefault.jpg',
  category: 'grammar'
)

VideoRecommendation.find_or_create_by!(
  level: 'B2',
  title: 'Кыргыз театрлору',
  description: 'Кыргызстандагы театр искусствосу жана спектаклдар.',
  video_url: 'https://www.youtube.com/watch?v=TddXv4l7xvo',
  thumbnail_url: 'https://img.youtube.com/vi/TddXv4l7xvo/hqdefault.jpg',
  category: 'culture'
)

# C1 Level - Advanced videos (5 videos)
VideoRecommendation.find_or_create_by!(
  level: 'C1',
  title: 'Манас дастаны',
  description: 'Манас дастанынын тил өзгөчөлүктөрү. Терең талдоо.',
  video_url: 'https://www.youtube.com/watch?v=6J7rX_Z1BaU',
  thumbnail_url: 'https://img.youtube.com/vi/6J7rX_Z1BaU/hqdefault.jpg',
  category: 'culture'
)

VideoRecommendation.find_or_create_by!(
  level: 'C1',
  title: 'Чыңгыз Айтматов: философия',
  description: 'Айтматовдун чыгармаларындагы философиялык ой-толгонуулар.',
  video_url: 'https://www.youtube.com/watch?v=C8LgJ-yZkAs',
  thumbnail_url: 'https://img.youtube.com/vi/C8LgJ-yZkAs/hqdefault.jpg',
  category: 'culture'
)

VideoRecommendation.find_or_create_by!(
  level: 'C1',
  title: 'Кыргыз тил илими',
  description: 'Кыргыз тил илиминин негиздери жана изилдөө.',
  video_url: 'https://www.youtube.com/watch?v=lQx5i_837B0',
  thumbnail_url: 'https://img.youtube.com/vi/lQx5i_837B0/hqdefault.jpg',
  category: 'grammar'
)

VideoRecommendation.find_or_create_by!(
  level: 'C1',
  title: 'Кыргыз элинин этнографиясы',
  description: 'Кыргыз элинин этнографиялык өзгөчөлүктөрү.',
  video_url: 'https://www.youtube.com/watch?v=IiBdS72NQGo',
  thumbnail_url: 'https://img.youtube.com/vi/IiBdS72NQGo/hqdefault.jpg',
  category: 'culture'
)

VideoRecommendation.find_or_create_by!(
  level: 'C1',
  title: 'Акындык өнөр',
  description: 'Кыргыздын акындык өнөрү жана анын өнүгүшү.',
  video_url: 'https://www.youtube.com/watch?v=xCe6NObTddQ',
  thumbnail_url: 'https://img.youtube.com/vi/xCe6NObTddQ/hqdefault.jpg',
  category: 'culture'
)

puts "✓ Created #{VideoRecommendation.count} video recommendations"
