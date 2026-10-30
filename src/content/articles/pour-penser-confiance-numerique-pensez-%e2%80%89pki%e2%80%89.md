---
title: "Pour penser confiance numérique, pensez « PKI »"
dek: "Au-delà de l’engouement de mobinautes pour certaines applis cryptées, les entreprises ont de réels besoins de sécurisation de leurs échanges. Pour elles, existe un système qui se résume en 3 lettres, PKI. Malheureusement, derrière l’acronyme, les explications manquent. Voici quelques clés de compréhension"
accroche: "L'économie n'est rien sans confiance. N'hésitez à penser \"confiance numérique et \"PKI\""
rubrique: economie
type: article
date: 2021-01-29
minutes: 2
une: false
brouillon: false
image: "2021/03/cle-pki-icp.png"
image_pano: ""
ancienne_url: "https://www.thierrybrenet.fr/article/pour-penser-confiance-numerique-pensez-%e2%80%89pki%e2%80%89/"
hashtags: ["Sécurité"]
---

## **Commençons par un exemple**

Imaginons un cadre qui négocie un contrat pour son entreprise. Pour ce faire, il a besoin d’échanger avec plusieurs de ses collègues, d’un côté sur des questions tarifaires et, de l’autre, sur des aspects techniques ayant trait à une technologie sensible mise au point par son entreprise. Dernier détail, notre homme est en déplacement en Asie.

Il va évidemment utiliser une solution de cryptage pour adresser ses questions à ses collègues. Pour autant, comment s’assurer qu’un hackeur ne s’est pas infiltré dans la conversation et ne la détourne pas pour modifier certaines questions, voire certaines réponses ? Comment s’assurer enfin que la réponse reçue de Paul émane bien de… Paul ?

## **Besoins de confiance, confidentialité et authenticité**

L’exemple que je prends ici n’a rien d’extraordinaire et les risques évoqués ne relèvent pas de la science-fiction.

Aujourd’hui, en effet, au-delà des hackeurs isolés et voulant faire un coup d’éclat depuis le fond du garage de papa et maman, certains pays ont développé des unités de cyberespionnage avec les moyens que l’on imagine.

Face à de telles réalités, nombre d’entreprises sont à la recherche de solutions de protection contre ce risque cyber qui, si l’on revient à notre exemple, empile trois types de besoins. Il y a, pour commencer, celui de la stricte confidentialité des échanges (**pas d’écoute**), celui visant à s’assurer que les questions posées et les réponses fournies n’ont pas été détournées pour les modifier (**souci d’authenticité**). Enfin, reste la question d’**usurpation d’identité** au sein du groupe.

## **La solution ? Des clés ‘‘intelligentes’’ !**

Nous connaissons tous dans nos jobs la question des autorisations données aux salariés et qui permet de définir avec précision qui a accès à quoi.

Ici, il s’agit d’une infrastructure dénommée « infrastructure à clé publique » (ICP) ou « Public Key infrastructure » (PKI) qui va être mobilisée.

Reprenons l’exemple de notre commercial et faisons simple.

Il est doté de deux ‘‘clés liées’’. L’une lui est personnelle et l’autre est (dite) publique, ce qui signifie qu’il va pouvoir la donner à ses interlocuteurs.

De la sorte, lorsqu’il voudra communiquer avec eux, il utilisera sa clé qui cryptera ses messages.

Ceux-ci arrivés à destination pourront être décryptés grâce à la clé publique en possession de ses interlocuteurs. Si, par malheur, un hackeur a détourné un message de notre commercial et réussi à le modifier, avant de le renvoyer à son destinataire prévu, celui-ci ne pourra pas l’ouvrir avec la clé publique qui lui a été remise.

Simple, non ?
