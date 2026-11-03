// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Domaine définitif depuis le 03/11/2026 (transfert Gandi terminé, DNS vers GitHub Pages).
// Anciennes adresses du site WordPress : redirigées vers les rubriques actuelles.
export default defineConfig({
  site: 'https://thierrybrenet.fr',
  base: '/',
  trailingSlash: 'always',
  redirects: {
    '/qualite/': '/rubriques/entreprises/',
    '/strategie/': '/rubriques/entreprises/',
    '/economie/': '/rubriques/entreprises/',
    '/portraits/': '/rubriques/rencontres/',
    '/cyber/': '/rubriques/cyber/',
  },
  integrations: [sitemap()],
});
