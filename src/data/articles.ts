import { getCollection } from 'astro:content';

// Articles publiés, du plus récent au plus ancien.
export async function articlesPublies() {
  const tous = await getCollection('articles', ({ data }) => !data.brouillon);
  return tous.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const dateFr = (d: Date) =>
  d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
