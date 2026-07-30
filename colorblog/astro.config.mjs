import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://zerong-sun.github.io',
  output: 'static',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [tailwind({ applyBaseStyles: false })],
});
