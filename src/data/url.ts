// Construit un lien qui respecte la base du site (adresse provisoire ou domaine).
export const url = (path = '') => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.replace(/^\//, '');
  return clean ? `${base}/${clean}${clean.endsWith('/') ? '' : '/'}` : `${base}/`;
};

export const lienArticle = (id: string) => url(`articles/${id}/`);
export const lienRubrique = (slug: string) => url(`rubriques/${slug}/`);
