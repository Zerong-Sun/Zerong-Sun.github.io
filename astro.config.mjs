import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://zerong-sun.github.io',
  base: '/',
  output: 'static',
  trailingSlash: 'always',
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'vitesse-dark',
      },
    },
  },
  integrations: [tailwind({ applyBaseStyles: false })],
});
