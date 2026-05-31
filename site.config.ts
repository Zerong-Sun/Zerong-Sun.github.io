export const site = {
  title: "Zerong' Notes",
  author: 'Zerong Sun',
  url: 'https://zerong-sun.github.io',
  description: 'Personal notes and essays',
  colors: { primary: '#FF884C', defaultMode: 'dark' as const },
  fonts: {
    chinese: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap',
    english: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
  },
  banner: {
    title: 'Stay Curious • Science • Discover World',
    subtitles: [
      'Boundaries exist to be tested, not accepted.',
      'Every failure is a step toward discovery.',
      'Design with purpose, explore with passion.',
    ],
    images: { light: '/images/back.jpg', dark: '/images/back-night.jpg' },
  },
  nav: [
    { label: 'Home', href: '/', icon: 'home' },
    { label: 'About', href: '/about/', icon: 'user' },
    { label: 'Notes', href: '/notes/', icon: 'notes' },
    { label: 'Contact', href: '/contact/', icon: 'mail' },
  ],
  social: {
    email: 'Zero.de.sun@outlook.com',
    rednote: 'https://www.xiaohongshu.com/user/profile/62b04442000000001b02a320',
  },
  footer: { start: '2022-08-17T11:45:14' },
  excerptLength: 200,
  friends: [
    {
      name: 'Jaredan Xiao',
      url: 'https://jaredanwolfgang.github.io/',
      avatar: 'https://jaredanwolfgang.github.io/images/avatar.jpg',
      bio: 'A Hufflepuff 🥏🧗🏋️💻🎵',
    },
    {
      name: 'Dragon Xiaoxingchen',
      url: 'https://xiaoxingchendragon.github.io/',
      avatar: 'https://jaredanwolfgang.github.io/images/avatars/xiaoxingchendragon.png',
      bio: '想成为旅行者, 将触摸和所见的全部 都原本, 珍重地接纳',
    },
    {
      name: 'Xiaoyun Liu',
      url: 'https://liuxy.space/',
      avatar: 'https://blogimg.liuxy.space/img/favicons/avatar.JPG',
      bio: 'Exploring the world through code and curiosity',
    },
  ],
} as const;
