// Rubriques reprises de l'ancien site (catégories WordPress), plus les infographies.
export const rubriques = [
  { slug: 'rencontres', label: 'Rencontres', singulier: 'Rencontre', nav: true },
  { slug: 'geopolitique', label: 'Géopolitique', singulier: 'Géopolitique', nav: true },
  { slug: 'strategie', label: 'Stratégie', singulier: 'Stratégie', nav: true },
  { slug: 'cyber', label: 'Cyber', singulier: 'Cyber', nav: true },
  { slug: 'economie', label: 'Économie', singulier: 'Économie', nav: true },
  { slug: 'qualite', label: 'Qualité', singulier: 'Qualité', nav: true },
  { slug: 'sante', label: 'Santé', singulier: 'Santé', nav: true },
  { slug: 'sciences', label: 'Sciences', singulier: 'Sciences', nav: true },
  { slug: 'litterature', label: 'Littérature', singulier: 'Littérature', nav: true },
  { slug: 'le-temps-dun-cafe', label: "Le temps d'un café", singulier: "Le temps d'un café", nav: true },
  { slug: 'coup-doeil', label: "En un coup d'œil", singulier: "En un coup d'œil", nav: true },
  { slug: 'divers', label: 'Divers', singulier: 'Divers', nav: false },
] as const;

export type Rubrique = (typeof rubriques)[number]['slug'];
export const slugsRubriques = rubriques.map((r) => r.slug) as [Rubrique, ...Rubrique[]];
export const rubrique = (slug: string) => rubriques.find((r) => r.slug === slug);
