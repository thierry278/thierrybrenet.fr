import { getCollection } from 'astro:content';

// Articles publiés, du plus récent au plus ancien.
export async function articlesPublies() {
  const filtre = ({ data }: { data: { brouillon: boolean } }) => !data.brouillon;
  const tous = [...(await getCollection('articles', filtre)), ...(await getCollection('videos', filtre))];
  return tous.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const dateFr = (d: Date) =>
  d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
