// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Adresse provisoire : https://thierry278.github.io/thierrybrenet.fr/
// Au branchement du domaine : site = 'https://thierrybrenet.fr', base = '/'.
export default defineConfig({
  site: 'https://thierry278.github.io',
  base: '/thierrybrenet.fr',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
