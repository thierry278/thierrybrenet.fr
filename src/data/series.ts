import { getCollection } from 'astro:content';

// Séries d'articles : un identifiant (champ `serie` de l'en-tête) et un numéro d'épisode (`rang`).
export const series: Record<string, { titre: string }> = {
  'hopital-ordinaire': { titre: 'Plongée dans le quotidien d’un hôpital ordinaire' },
};

type Entree = { id: string; data: { serie?: string; rang?: number; brouillon: boolean; type: string; title: string } };

export async function episodes(serie: string) {
  const liste = (await getCollection('articles', ({ data }) => !data.brouillon && data.serie === serie)) as Entree[];
  return liste.sort((a, b) => (a.data.rang ?? 0) - (b.data.rang ?? 0));
}

// Dans les listes (accueil, sommaire, rubriques), une série ne forme qu'une seule carte :
// elle prend la place de son épisode le plus récent et renvoie vers l'épisode 1.
export async function regrouper<T extends Entree>(liste: T[]): Promise<T[]> {
  const vus = new Set<string>();
  const sortie: T[] = [];
  for (const a of liste) {
    const s = a.data.serie;
    if (!s) { sortie.push(a); continue; }
    if (vus.has(s)) continue;
    vus.add(s);
    const eps = await episodes(s);
    sortie.push((eps.find((e) => e.data.rang === 1) as T) ?? a);
  }
  return sortie;
}
