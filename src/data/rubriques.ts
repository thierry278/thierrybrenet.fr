export const rubriques = [
  { slug: 'rencontres', label: 'Rencontres', singulier: 'Rencontre', nav: true },
  { slug: 'geopolitique', label: 'Géopolitique', singulier: 'Géopolitique', nav: true },
  { slug: 'cyber', label: 'Cyber', singulier: 'Cyber', nav: true },
  { slug: 'sciences', label: 'Sciences', singulier: 'Sciences', nav: true },
  { slug: 'cimes', label: 'Cimes', singulier: 'Cimes', nav: true },
  { slug: 'coup-doeil', label: "En un coup d'œil", singulier: "En un coup d'œil", nav: true },
  { slug: 'ecrire', label: 'Écrire', singulier: 'Écrire', nav: false },
] as const;

export const rubrique = (slug: string) => rubriques.find((r) => r.slug === slug);
