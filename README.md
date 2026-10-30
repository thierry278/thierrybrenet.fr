# thierrybrenet.fr
Site de Thierry Brenet — rédacteur et journaliste indépendant

Site statique généré avec Astro et publié automatiquement sur GitHub Pages à chaque modification de la branche `main`.

## Où sont les choses

- `src/content/articles/` : un fichier Markdown par article. L'en-tête (titre, chapô, rubrique, date…) est entre les deux lignes `---`.
- `src/data/rubriques.ts` : la liste des rubriques et celles qui apparaissent dans le menu.
- `src/styles/revue.css` : la mise en page (maquette « revue-incisive »).

## Publier un article

Ajouter un fichier `.md` dans `src/content/articles/` avec cet en-tête :

```
---
title: "Titre"
dek: "Chapô"
rubrique: rencontres   # rencontres, geopolitique, cyber, sciences, cimes, coup-doeil, ecrire
format: Entretien
date: 2026-11-05
minutes: 8
une: false             # true pour entrer dans le vivier de la une
---
```

Le site se régénère tout seul en une à deux minutes.
