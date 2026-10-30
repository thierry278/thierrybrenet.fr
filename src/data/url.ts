import { existsSync } from 'node:fs';

// Construit un lien qui respecte la base du site (adresse provisoire ou domaine).
export const url = (path = '') => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.replace(/^\//, '');
  return clean ? `${base}/${clean}${clean.endsWith('/') ? '' : '/'}` : `${base}/`;
};

// Mêmes adresses que l'ancien site : /article/<slug>/ et /infographie/<slug>/.
export const lienArticle = (a: { id: string; data: { type: string } }) => url(`${a.data.type}/${a.id}/`);
export const lienRubrique = (slug: string) => url(`rubriques/${slug}/`);

// Image de /uploads/ : renvoie son adresse seulement si le fichier est présent dans public/.
export const image = (chemin?: string) => {
  if (!chemin) return undefined;
  return existsSync(`public/uploads/${chemin}`)
    ? `${import.meta.env.BASE_URL.replace(/\/$/, '')}/uploads/${chemin}`
    : undefined;
};
