# Sample video recommendations for all levels
# Admin can add more through the admin interface

puts "Creating video recommendations..."

# A1 Level - Beginner videos (10 videos)
VideoRecommendation.find_or_create_by!(
  level: 'A1',
  title: 'Кыргыз тили: Алфавит жана тыбыштар',
  description: 'Кыргыз алфавитин жана негизги тыбыштарды үйрөнүү. Башталгычтар үчүн жөнөкөй сабак.',
  video_url: 'https://www.youtube.com/watch?v=7ghhRHRP6t4',
  thumbnail_url: 'https://img.youtube.com/vi/7ghhRHRP6t4/hqdefault.jpg',
  category: 'tutorial'
)

VideoRecommendation.find_or_create_by!(
  level: 'A1',
  title: 'Саламдашуу жана таанышуу сөздөрү',
  description: 'Кыргызча кандай саламдашуу жана өзүңдү тааныштыруу керектигин үйрөнөбүз. Күнүмдүк керектүү сөздөр.',
  video_url: 'https://www.youtube.com/watch?v=VrI-zzDiSSs',
  thumbnail_url: 'https://img.youtube.com/vi/VrI-zzDiSSs/hqdefault.jpg',
  category: 'conversation'
)

VideoRecommendation.find_or_create_by!(
  level: 'A1',
  title: 'Сандар: 1ден 100гө чейин',
  description: 'Кыргызча сандарды айтууну үйрөнөбүз. Жөнөкөй жана түшүнүктүү түрдө.',
  video_url: 'https://www.youtube.com/watch?v=KpE-z4hGCxA',
  thumbnail_url: 'https://img.youtube.com/vi/KpE-z4hGCxA/hqdefault.jpg',
  category: 'vocabulary'
)

VideoRecommendation.find_or_create_by!(
  level: 'A1',
  title: 'Үй-бүлө мүчөлөрү: атамекелер',
  description: 'Үй-бүлө мүчөлөрүнүн аттарын кыргызча үйрөнөбүз. Ата-эне, агай-ини тууганы.',
  video_url: 'https://www.youtube.com/watch?v=8m8UqK3jc2U',
  thumbnail_url: 'https://img.youtube.com/vi/8m8UqK3jc2U/hqdefault.jpg',
  category: 'vocabulary'
)

VideoRecommendation.find_or_create_by!(
  level: 'A1',
  title: 'Түстөр жана формалар',
  description: 'Негизги түстөрдү жана формаларды кыргызча үйрөнөбүз. Балдарга да, чоңдорго да.',
  video_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  thumbnail_url: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
  category: 'vocabulary'
)

VideoRecommendation.find_or_create_by!(
  level: 'A1',
  title: 'Күндөр жана айлар',
  description: 'Жуманын күндөрү жана жылдын айларын кыргызча айтууну үйрөнөбүз.',
  video_url: 'https://www.youtube.com/watch?v=JGwWNGJdvx8',
  thumbnail_url: 'https://img.youtube.com/vi/JGwWNGJdvx8/hqdefault.jpg',
  category: 'vocabulary'
)

VideoRecommendation.find_or_create_by!(
  level: 'A1',
  title: 'Жөнөкөй сүйлөмдөр түзүү',
  description: 'Кыргызча жөнөкөй сүйлөмдөрдү түзүүнү үйрөнөбүз. Башталгычтарга ыңгайлуу.',
  video_url: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
  thumbnail_url: 'https://img.youtube.com/vi/3JZ_D3ELwOQ/hqdefault.jpg',
  category: 'grammar'
)

VideoRecommendation.find_or_create_by!(
  level: 'A1',
  title: 'Күнүмдүк керектүү сөздөр',
  description: 'Күн сайын колдонулган эң негизги кыргызча сөздөр жана айтылыштар.',
  video_url: 'https://www.youtube.com/watch?v=yxs2SInMLDQ',
  thumbnail_url: 'https://img.youtube.com/vi/yxs2SInMLDQ/hqdefault.jpg',
  category: 'vocabulary'
)

VideoRecommendation.find_or_create_by!(
  level: 'A1',
  title: 'Кыргыз тамактары',
  description: 'Кыргыз тамактарынын аттарын үйрөнөбүз. Аш, манты, самса жана башкалар.',
  video_url: 'https://www.youtube.com/watch?v=qeMFqkcPYcg',
  thumbnail_url: 'https://img.youtube.com/vi/qeMFqkcPYcg/hqdefault.jpg',
  category: 'vocabulary'
)

VideoRecommendation.find_or_create_by!(
  level: 'A1',
  title: 'Керемет көч мультфильми',
  description: 'Балдарга арналган кыргызча мультфильм. Жөнөкөй тил жана түшүнүктүү сюжет.',
  video_url: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
  thumbnail_url: 'https://img.youtube.com/vi/5qap5aO4i9A/hqdefault.jpg',
  category: 'culture'
)

# A2 Level - Elementary videos (10 videos)
VideoRecommendation.find_or_create_by!(
  level: 'A2',
  title: 'Дүкөндө: сатып алуу диалогу',
  description: 'Дүкөндө кыргызча сүйлөшүү үчүн пайдалуу сөздөр жана сүйлөмдөр. Практикалык мисалдар.',
  video_url: 'https://www.youtube.com/watch?v=2vjPBrBU-TM',
  thumbnail_url: 'https://img.youtube.com/vi/2vjPBrBU-TM/hqdefault.jpg',
  category: 'conversation'
)

VideoRecommendation.find_or_create_by!(
  level: 'A2',
  title: 'Ооруканада: дарыгерге баруу',
  description: 'Ооруканада кыргызча кандай сүйлөшүү керектигин үйрөнөбүз. Пайдалуу фразалар.',
  video_url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
  thumbnail_url: 'https://img.youtube.com/vi/9bZkp7q19f0/hqdefault.jpg',
  category: 'conversation'
)

VideoRecommendation.find_or_create_by!(
  level: 'A2',
  title: 'Транспортто: жол сураш',
  description: 'Шаарда жол сурашуу жана транспортко түшүү үчүн керектүү сөздөр.',
  video_url: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
  thumbnail_url: 'https://img.youtube.com/vi/kJQP7kiw5Fk/hqdefault.jpg',
  category: 'conversation'
)

VideoRecommendation.find_or_create_by!(
  level: 'A2',
  title: 'Кыргыз элдик жомоктору',
  description: 'Кыргыздын көркөм элдик жомоктору. Жөнөкөй тилде айтылган.',
  video_url: 'https://www.youtube.com/watch?v=GtL1huin9EY',
  thumbnail_url: 'https://img.youtube.com/vi/GtL1huin9EY/hqdefault.jpg',
  category: 'culture'
)

VideoRecommendation.find_or_create_by!(
  level: 'A2',
  title: 'Мезгил түрлөрү: өткөн, учур, келер',
  description: 'Кыргыз тилиндеги өткөн, учур жана келер мезгилдерди үйрөнөбүз.',
  video_url: 'https://www.youtube.com/watch?v=djV11Xbc914',
  thumbnail_url: 'https://img.youtube.com/vi/djV11Xbc914/hqdefault.jpg',
  category: 'grammar'
)

VideoRecommendation.find_or_create_by!(
  level: 'A2',
  title: 'Ресторанда тамак заказ кылуу',
  description: 'Ресторанда кыргызча тамак заказ кылуу үчүн керектүү диалогдор.',
  video_url: 'https://www.youtube.com/watch?v=lXMskKTw3Bc',
  thumbnail_url: 'https://img.youtube.com/vi/lXMskKTw3Bc/hqdefault.jpg',
  category: 'conversation'
)

VideoRecommendation.find_or_create_by!(
  level: 'A2',
  title: 'Кыргызстандын табияты',
  description: 'Кыргызстандын сулуу табияты жөнүндө жөнөкөй кыргызча видео.',
  video_url: 'https://www.youtube.com/watch?v=450p7goxZqg',
  thumbnail_url: 'https://img.youtube.com/vi/450p7goxZqg/hqdefault.jpg',
  category: 'culture'
)

VideoRecommendation.find_or_create_by!(
  level: 'A2',
  title: 'Кесиптер жана жумуштар',
  description: 'Ар кандай кесиптердин аттарын кыргызча үйрөнөбүз.',
  video_url: 'https://www.youtube.com/watch?v=fC7oUOUEEi4',
  thumbnail_url: 'https://img.youtube.com/vi/fC7oUOUEEi4/hqdefault.jpg',
  category: 'vocabulary'
)

VideoRecommendation.find_or_create_by!(
  level: 'A2',
  title: 'Досторго чакыруу',
  description: 'Досторду конокко чакыруу жана саламдашуу диалогдору.',
  video_url: 'https://www.youtube.com/watch?v=3Qp1aLd6zQk',
  thumbnail_url: 'https://img.youtube.com/vi/3Qp1aLd6zQk/hqdefault.jpg',
  category: 'conversation'
)

VideoRecommendation.find_or_create_by!(
  level: 'A2',
  title: 'Кыргыз музыкасы: элдик ырлар',
  description: 'Кыргыз элдик ырларынын коллекциясы. Жөнөкөй жана түшүнүктүү сөздөр.',
  video_url: 'https://www.youtube.com/watch?v=l3yAx2uCoHs',
  thumbnail_url: 'https://img.youtube.com/vi/l3yAx2uCoHs/hqdefault.jpg',
  category: 'music'
)

# B1 Level - Intermediate videos (8 videos)
VideoRecommendation.find_or_create_by!(
  level: 'B1',
  title: 'Кыргызстандын салттары жана маданияты',
  description: 'Кыргызстандын салттары, каада-жөрөлгөлөрү жана маданияты жөнүндө кызыктуу маалымат.',
  video_url: 'https://www.youtube.com/watch?v=vxqSw2bzJio',
  thumbnail_url: 'https://img.youtube.com/vi/vxqSw2bzJio/hqdefault.jpg',
  category: 'culture'
)

VideoRecommendation.find_or_create_by!(
  level: 'B1',
  title: 'Азаттык радиосу: жаңылыктар',
  description: 'Кыргызстандагы акыркы жаңылыктар жана окуялар. Түшүнүктүү тилде.',
  video_url: 'https://www.youtube.com/watch?v=YV4oYkIeGJc',
  thumbnail_url: 'https://img.youtube.com/vi/YV4oYkIeGJc/hqdefault.jpg',
  category: 'news'
)

VideoRecommendation.find_or_create_by!(
  level: 'B1',
  title: 'Чыңгыз Айтматов: Жамиля повести',
  description: 'Айтматовдун "Жамиля" повестинин аудиокитеби. Классикалык адабият.',
  video_url: 'https://www.youtube.com/watch?v=lOfZLb33uCg',
  thumbnail_url: 'https://img.youtube.com/vi/lOfZLb33uCg/hqdefault.jpg',
  category: 'culture'
)

VideoRecommendation.find_or_create_by!(
  level: 'B1',
  title: 'Кыргыз тилинин грамматикасы',
  description: 'Кыргыз тилинин татаал грамматикалык эрежелери. Орто деңгээлдеги окуучуларга.',
  video_url: 'https://www.youtube.com/watch?v=PTceU5kdr1c',
  thumbnail_url: 'https://img.youtube.com/vi/PTceU5kdr1c/hqdefault.jpg',
  category: 'grammar'
)

VideoRecommendation.find_or_create_by!(
  level: 'B1',
  title: 'Бишкек шаары: саякат',
  description: 'Бишкек шаарынын кызыктуу жерлерин кыргызча баяндаган видео.',
  video_url: 'https://www.youtube.com/watch?v=5G3cH6_zN9I',
  thumbnail_url: 'https://img.youtube.com/vi/5G3cH6_zN9I/hqdefault.jpg',
  category: 'culture'
)

VideoRecommendation.find_or_create_by!(
  level: 'B1',
  title: 'Иссык-Көл: табигый кереметтер',
  description: 'Иссык-Көл көлү жөнүндө толук маалымат кыргыз тилинде.',
  video_url: 'https://www.youtube.com/watch?v=R18Gi8Cd1tQ',
  thumbnail_url: 'https://img.youtube.com/vi/R18Gi8Cd1tQ/hqdefault.jpg',
  category: 'culture'
)

VideoRecommendation.find_or_create_by!(
  level: 'B1',
  title: 'Кыргыз элдик оюндары',
  description: 'Кыргыздын элдик оюндары: Көк-бөрү, эр эниш жана башкалар.',
  video_url: 'https://www.youtube.com/watch?v=nR_sZGziXH0',
  thumbnail_url: 'https://img.youtube.com/vi/nR_sZGziXH0/hqdefault.jpg',
  category: 'culture'
)

VideoRecommendation.find_or_create_by!(
  level: 'B1',
  title: 'Кыргыз тамак-ашы: улуттук тагамдар',
  description: 'Кыргыз улуттук тагамдарын даярдоо жана алардын тарыхы.',
  video_url: 'https://www.youtube.com/watch?v=1hwSHFiqLGE',
  thumbnail_url: 'https://img.youtube.com/vi/1hwSHFiqLGE/hqdefault.jpg',
  category: 'culture'
)

# B2 Level - Upper intermediate videos (6 videos)
VideoRecommendation.find_or_create_by!(
  level: 'B2',
  title: 'Заманбап кыргыз тили',
  description: 'Заманбап кыргыз тилинин өзгөчөлүктөрү жана жаңы сөздөр. Филологдордун пикири.',
  video_url: 'https://www.youtube.com/watch?v=pGN1na3F5do',
  thumbnail_url: 'https://img.youtube.com/vi/pGN1na3F5do/hqdefault.jpg',
  category: 'grammar'
)

VideoRecommendation.find_or_create_by!(
  level: 'B2',
  title: 'Кыргызстандын тарыхы',
  description: 'Кыргызстандын кыска тарыхы. Байыркы доордон азыркы күнгө чейин.',
  video_url: 'https://www.youtube.com/watch?v=5qzJxY2eiPE',
  thumbnail_url: 'https://img.youtube.com/vi/5qzJxY2eiPE/hqdefault.jpg',
  category: 'culture'
)

VideoRecommendation.find_or_create_by!(
  level: 'B2',
  title: 'Кыргыз адабиятынын өнүгүшү',
  description: 'Кыргыз адабиятынын тарыхы жана атактуу жазуучулар.',
  video_url: 'https://www.youtube.com/watch?v=qxPQhik9YKs',
  thumbnail_url: 'https://img.youtube.com/vi/qxPQhik9YKs/hqdefault.jpg',
  category: 'culture'
)

VideoRecommendation.find_or_create_by!(
  level: 'B2',
  title: 'Кыргыз тилиндеги диалекттер',
  description: 'Кыргыз тилинин түндүк жана түштүк диалекттеринин айырмалары.',
  video_url: 'https://www.youtube.com/watch?v=H-q54T_FHQ8',
  thumbnail_url: 'https://img.youtube.com/vi/H-q54T_FHQ8/hqdefault.jpg',
  category: 'grammar'
)

VideoRecommendation.find_or_create_by!(
  level: 'B2',
  title: 'Кыргызстандын экономикасы',
  description: 'Кыргызстандын экономикалык абалы жана перспективалары жөнүндө талкуу.',
  video_url: 'https://www.youtube.com/watch?v=TcPXXwGZxvg',
  thumbnail_url: 'https://img.youtube.com/vi/TcPXXwGZxvg/hqdefault.jpg',
  category: 'news'
)

VideoRecommendation.find_or_create_by!(
  level: 'B2',
  title: 'Кыргыз театрлору',
  description: 'Кыргызстандагы театр искусствосу жана атактуу спектаклдар.',
  video_url: 'https://www.youtube.com/watch?v=TddXv4l7xvo',
  thumbnail_url: 'https://img.youtube.com/vi/TddXv4l7xvo/hqdefault.jpg',
  category: 'culture'
)

# C1 Level - Advanced videos (6 videos)
VideoRecommendation.find_or_create_by!(
  level: 'C1',
  title: 'Манас дастаны: адабий талдоо',
  description: 'Манас дастанынын тил өзгөчөлүктөрү жана адабий маани-мазмуну. Терең талдоо.',
  video_url: 'https://www.youtube.com/watch?v=6J7rX_Z1BaU',
  thumbnail_url: 'https://img.youtube.com/vi/6J7rX_Z1BaU/hqdefault.jpg',
  category: 'culture'
)

VideoRecommendation.find_or_create_by!(
  level: 'C1',
  title: 'Чыңгыз Айтматов: философиялык ой-толгонуулар',
  description: 'Айтматовдун чыгармаларындагы философиялык көз карашы.',
  video_url: 'https://www.youtube.com/watch?v=f53VSjy3Y-c',
  thumbnail_url: 'https://img.youtube.com/vi/f53VSjy3Y-c/hqdefault.jpg',
  category: 'culture'
)

VideoRecommendation.find_or_create_by!(
  level: 'C1',
  title: 'Кыргыз тил илими',
  description: 'Кыргыз тил илиминин негиздери жана изилдөө методдору.',
  video_url: 'https://www.youtube.com/watch?v=lQx5i_837B0',
  thumbnail_url: 'https://img.youtube.com/vi/lQx5i_837B0/hqdefault.jpg',
  category: 'grammar'
)

VideoRecommendation.find_or_create_by!(
  level: 'C1',
  title: 'Төө баатыр: эл аралык конференция',
  description: 'Төө баатырдын чыгармачылыгы боюнча илимий конференциянын жазуусу.',
  video_url: 'https://www.youtube.com/watch?v=cEfZZZg7GIM',
  thumbnail_url: 'https://img.youtube.com/vi/cEfZZZg7GIM/hqdefault.jpg',
  category: 'culture'
)

VideoRecommendation.find_or_create_by!(
  level: 'C1',
  title: 'Кыргыз элинин этнографиясы',
  description: 'Кыргыз элинин этнографиялык өзгөчөлүктөрү жана маданий мурасы.',
  video_url: 'https://www.youtube.com/watch?v=IiBdS72NQGo',
  thumbnail_url: 'https://img.youtube.com/vi/IiBdS72NQGo/hqdefault.jpg',
  category: 'culture'
)

VideoRecommendation.find_or_create_by!(
  level: 'C1',
  title: 'Көкөй тестибеков: акындык өнөр',
  description: 'Кыргыздын акындык өнөрү жана анын өнүгүү жолдору.',
  video_url: 'https://www.youtube.com/watch?v=xCe6NObTddQ',
  thumbnail_url: 'https://img.youtube.com/vi/xCe6NObTddQ/hqdefault.jpg',
  category: 'culture'
)

puts "✓ Created #{VideoRecommendation.count} video recommendations"
