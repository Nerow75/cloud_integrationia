# Contexte du projet

Dashboard e-commerce « Nova Commerce », intégré à partir d'une maquette Figma.

## Stack

- HTML5 sémantique uniquement
- CSS natif (pas de Bootstrap, Tailwind, etc.)
- JavaScript vanilla

## Structure de fichiers

- index.html
- css/style.css (tokens dans `:root`, voir design-tokens.md)
- js/script.js
- assets/icons/
- design-tokens.md

## Règles

- Toujours sémantique (header, nav, main, aside, section, footer)
- Un seul h1 par page
- Mobile first : breakpoints à 768px et 1024px
- Composants interactifs accessibles au clavier
- Jamais de style inline
- Utiliser les variables CSS de design-tokens.md plutôt que des valeurs en dur
- Commentaires et textes en français
