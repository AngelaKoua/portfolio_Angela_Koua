# Portfolio floral : la branche qui pousse

Portfolio interactif en Next.js (App Router, TypeScript), thème **Lavande & eucalyptus**.

Une branche fleurie se dessine à l’arrivée sur la page, puis une tige descend le long du jardin de projets : chaque projet est un bourgeon que le visiteur fait éclore d’un clic. La tige plonge ensuite dans la terre pour la section « À propos », et une graine germe au moment du contact.

## Démarrer

Il te faut Node.js 20.9 ou plus récent.

```bash
npm install
npm run dev
```

Ouvre ensuite http://localhost:3000.

Pour une version de production :

```bash
npm run build
npm start
```

## Personnaliser

**Ton contenu** se trouve dans un seul fichier : `content/portfolio.ts`. Remplace tous les textes entre crochets (prénom, métier, projets, présentation, email, réseaux).

**Les images des projets** vont dans `public/projects/`. Indique ensuite le chemin dans le projet concerné :

```ts
image: "/projects/mon-projet.jpg",
imageAlt: "Page d’accueil du site réalisé pour la boulangerie Dupont",
```

Sans image, la carte affiche une petite branche fleurie à la place.

**Ton CV** se dépose dans `public/cv.pdf`. Pour masquer le bouton, mets `cvUrl: ""`.

**Les couleurs** sont réunies dans `lib/theme.ts`. Les neuf palettes proposées y sont déjà prêtes : pour changer toute l’ambiance du site, il suffit de modifier une ligne.

```ts
export const activePalette: Palette = palettes.lavandeEucalyptus;
// par exemple : palettes.botaniqueSombre, palettes.cerisierVermillon...
```

Les couleurs secondaires (textes discrets, fond du jardin, terre, cartes) sont calculées automatiquement à partir de la palette.

**Les polices** (Cormorant Garamond, Jost et Caveat) sont chargées dans `app/layout.tsx` avec `next/font`, sans requête externe côté visiteur.

## Structure

```
app/
  layout.tsx          polices, couleurs du thème, métadonnées
  page.tsx            assemblage des sections
  globals.css         styles partagés, boutons, animations botaniques
components/
  BotanicalDefs.tsx   formes réutilisables : feuilles, fleur, bourgeon
  Header.tsx          logo et navigation
  Hero.tsx            haut de page
  HeroBranch.tsx      la grande branche qui se dessine
  FallingPetals.tsx   pétales qui tombent
  Garden.tsx          le jardin de projets (état d’éclosion)
  GardenRow.tsx       un tronçon de tige avec son bourgeon
  ProjectCard.tsx     la carte façon herbier
  About.tsx           les racines et la présentation
  Contact.tsx         la graine et le contact
  Footer.tsx
  Reveal.tsx          lance les animations à l’apparition
content/portfolio.ts  tout le texte du site
hooks/useInView.ts    détection de l’entrée dans l’écran
lib/theme.ts          palettes et calcul des couleurs
```

## Accessibilité

Les animations sont désactivées si le visiteur a activé « réduire les animations » sur son appareil. Les bourgeons sont de vrais boutons utilisables au clavier, l’éclosion d’un projet est annoncée aux lecteurs d’écran, et un lien d’évitement permet d’aller directement au contenu. Sur téléphone, la tige centrale laisse place à une ligne verte sur le côté pour garder les cartes lisibles.

## Mettre en ligne

Le plus simple est Vercel : pousse le projet sur GitHub, importe-le sur vercel.com, et le site est en ligne en quelques minutes. Netlify ou tout hébergeur compatible Node.js fonctionnent aussi.
