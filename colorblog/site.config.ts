export const site = {
  author: 'Zerong Sun',
  authorZh: '孙泽荣',
  url: 'https://zerong-sun.github.io',
  defaultLocale: 'zh' as const,

  hero: {
    photo: '/images/covers/2026-03-06-tanzania-kilimanjaro.jpg',
    location: 'Kilimanjaro',
    date: '2026.03',
  },

  categories: [
    { id: 'food', icon: '◎', color: 'mustard', href: '/notes/category/food/' },
    { id: 'travel', icon: '→', color: 'sky', href: '/notes/category/travel/' },
    { id: 'cooking', icon: '⌂', color: 'moss', href: '/notes/category/cooking/' },
    { id: 'essay', icon: '✎', color: 'lilac', href: '/notes/category/essay/' },
  ] as const,

  tagColors: {
    travel: 'sky',
    food: 'mustard',
    cooking: 'moss',
    essay: 'lilac',
    research: 'brick',
    note: 'lilac',
    美食: 'mustard',
    香料: 'moss',
    潮汕: 'sky',
    广东: 'coral',
    香港: 'brick',
    中亚: 'teal',
    乌兹别克斯坦: 'teal',
    坦桑尼亚: 'sky',
    非洲: 'moss',
    history: 'brick',
    neuroscience: 'teal',
  } as Record<string, string>,

  now: {
    reading: 'Protein design papers & travel writing',
    making: 'Spice handbook notes & this site',
    listening: 'City ambient playlists',
    visited: 'Central Asia, East Africa, South China coast',
    learning: 'De novo protein design workflows',
  },

  photos: [
    { src: '/images/covers/2025-05-23-nepal-kathmandu-mbc.jpg', location: 'Nepal', date: '2024.10', alt: 'MBC trail' },
    { src: '/images/covers/2025-10-07-uzbekistan-tandir-kebab.jpg', location: 'Uzbekistan', date: '2025.10', alt: 'Tandir kebab' },
    { src: '/images/covers/2026-03-06-tanzania-kilimanjaro.jpg', location: 'Tanzania', date: '2026.03', alt: 'Kilimanjaro' },
    { src: '/images/covers/2026-01-10-sham-tseng-yue-kee-roast-goose.jpg', location: 'Hong Kong', date: '2026.01', alt: 'Roast goose' },
    { src: '/images/covers/2025-05-23-shantou-chi-chi-chi.jpg', location: 'Shantou', date: '2025.05', alt: 'Chi chi chi' },
    { src: '/images/covers/2025-05-23-byd-cairo.jpg', location: 'Cairo', date: '2025.05', alt: 'BYD taxi' },
  ],

  timeline: [
    { year: '2022', title: 'Started undergraduate at SUSTech', place: 'Shenzhen' },
    { year: '2024', title: 'UC Berkeley BISP semester', place: 'Berkeley' },
    { year: '2024', title: 'Neuro-inspired materials & protein design labs', place: 'SUSTech / JHU' },
    { year: '2025', title: 'Central Asia travel & food notes', place: 'Uzbekistan' },
    { year: '2026', title: 'Kilimanjaro trek & spice handbook', place: 'Tanzania' },
  ],

  interests: [
    { label: 'Research', labelZh: '研究', color: 'brick' },
    { label: 'Food', labelZh: '美食', color: 'mustard' },
    { label: 'Travel', labelZh: '旅行', color: 'sky' },
    { label: 'Cooking', labelZh: '做饭', color: 'moss' },
    { label: 'Design', labelZh: '设计', color: 'lilac' },
    { label: 'Outdoors', labelZh: '户外', color: 'teal' },
  ],

  footer: { start: 2022 },

  social: {
    email: 'Zero.de.sun@outlook.com',
    github: 'https://github.com/zerong-sun',
    rednote: 'https://www.xiaohongshu.com/user/profile/62b04442000000001b02a320',
  },
} as const;

export type SiteConfig = typeof site;
