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
rubrique: rencontres   # rencontres, geopolitique, cyber, entreprises, sciences-sante, livres, coup-doeil, divers
format: Entretien
date: 2026-11-05
minutes: 8
une: false             # true pour entrer dans le vivier de la une
image: "2026/11/mon-visuel.jpg"   # fichier à déposer dans public/uploads/2026/11/
---
```

Le site se régénère tout seul en une à deux minutes.

## Pense-bête : le bon format des visuels

- **Dimensions : 1200 × 627 px** (ratio 1,91:1), en JPEG ou PNG. C'est le même fichier pour la carte du site, l'en-tête de l'article et l'aperçu LinkedIn.
- **Sujet centré verticalement**, texte et éléments importants à l'intérieur d'un cadre de sécurité de 1000 × 500 px (marges de 100 px à gauche et à droite, 63 px en haut et en bas). Ces marges sont une précaution, pas une norme LinkedIn.
- À ce format exact, rien n'est recadré. Les visuels d'un autre format sont rognés au centre sur les cartes : le haut et le bas disparaissent.
- **Gabarit** : `gabarit-visuel-1200x627.png` (calque à poser dans Canva ou Photoshop, à supprimer avant l'export).
- **Dans l'en-tête de l'article** : `image: "2026/11/nom-du-fichier.jpg"`, le fichier étant dans `public/uploads/2026/11/`. Le champ `vignette` n'est utile que si l'image de l'article n'est pas en 1200 × 627 : il pointe alors vers une version recadrée, par exemple `vignettes/nom.jpg` (c'est le cas de 41 articles).
- **Infographies** : `image` = l'infographie entière, `vignette` = une accroche en 1200 × 627 (titre en haut).
