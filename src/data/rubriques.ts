// Rubriques du site (décision du 30/10/2026). Le script d'import fait la correspondance
// avec les anciennes catégories WordPress.
export const rubriques = [
  { slug: 'rencontres', label: 'Rencontres', singulier: 'Rencontre', nav: true },
  { slug: 'geopolitique', label: 'Géopolitique', singulier: 'Géopolitique', nav: true },
  { slug: 'cyber', label: 'Cyber', singulier: 'Cyber', nav: true },
  { slug: 'entreprises', label: 'Entreprises', singulier: 'Entreprises', nav: true },
  { slug: 'sciences-sante', label: 'Sciences et santé', singulier: 'Sciences et santé', nav: true },
  { slug: 'livres', label: 'Livres', singulier: 'Livres', nav: true },
  { slug: 'coup-doeil', label: 'Autres formats', singulier: 'Autres formats', nav: true },
  { slug: 'divers', label: 'Divers', singulier: 'Divers', nav: false },
] as const;

export type Rubrique = (typeof rubriques)[number]['slug'];
export const slugsRubriques = rubriques.map((r) => r.slug) as [Rubrique, ...Rubrique[]];
export const rubrique = (slug: string) => rubriques.find((r) => r.slug === slug);
