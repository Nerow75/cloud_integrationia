# Design tokens : Nova Commerce

Valeurs relevées dans les maquettes Figma (desktop 1440px, tablette 820px, mobile 375px).
Le fichier Figma ne définit pas de variables : ces tokens sont tirés des calques et déclarés dans `css/style.css` (`:root`).

## Couleurs

### Fonds et surfaces

| Token | Valeur | Usage |
|---|---|---|
| `--c-bg` | `#f5f7fb` | Fond de page, en-tête de tableau, champ de recherche |
| `--c-surface` | `#ffffff` | Cartes, barre du haut |
| `--c-sidebar` | `#0d1b32` | Barre latérale |
| `--c-sidebar-card` | `#162a48` | Carte « Besoin d'aide ? » |
| `--c-sidebar-chip` | `#264468` | Pastille de l'icône d'aide, bouton d'aide compact |

### Texte

| Token | Valeur | Usage |
|---|---|---|
| `--c-text` | `#162033` | Texte principal, titres, montants |
| `--c-text-muted` | `#64748b` | Sous-titres, libellés, e-mails, en-têtes de colonnes |
| `--c-text-faint` | `#94a3b8` | Axes du graphique, placeholder |
| `--c-sidebar-text` | `#91a0b8` | Liens inactifs de la barre latérale |

### Marque

| Token | Valeur | Usage |
|---|---|---|
| `--c-primary` | `#2563eb` | Logo, courbe, liens, icônes des indicateurs |
| `--c-primary-strong` | `#1d4ed8` | Lien de navigation actif, initiales de l'avatar utilisateur |
| `--c-primary-soft` | `#eff6ff` | Fond des icônes d'indicateurs |

### Bordures

| Token | Valeur | Usage |
|---|---|---|
| `--c-border` | `#e4e9f1` | Bordure des cartes, boutons, champ de recherche |
| `--c-divider` | `#edf0f5` | Séparateurs des lignes du tableau |
| `--c-grid` | `#e8edf5` | Grille du graphique |

### Statuts

| Statut | Texte | Fond |
|---|---|---|
| Succès (Livrée, hausse) | `--c-success` `#15803d` | `--c-success-soft` `#ecfdf3` |
| Attente (En préparation) | `--c-warning` `#b45309` | `--c-warning-soft` `#fff7e6` |
| Erreur (Annulée, baisse) | `--c-danger` `#dc2626` | `--c-danger-soft` `#fef2f2` |

### Avatars clients

Initiales en `#162033`, fond selon le client :

| Classe | Fond |
|---|---|
| `.avatar--blue` | `#dce8ff` |
| `.avatar--green` | `#e7f8ee` |
| `.avatar--pink` | `#fbe7f2` |
| `.avatar--orange` | `#fff0d9` |
| `.avatar--purple` | `#e9e4ff` |
| `.avatar--teal` | `#dff6f5` |
| `.avatar--beige` | `#f4e8db` |

## Typographie

Police : **Inter** (Google Fonts), repli `"Segoe UI", system-ui, sans-serif`.
Interlignes de la maquette (taille / interligne) : 10/12, 12/15, 14/17, 18/22, 25/30, 30/36, soit le `line-height: normal` d'Inter (environ 1.2).
Seule exception : le texte de la carte d'aide (`1.45`, 12/17).

| Élément | Desktop / tablette | Mobile | Graisse |
|---|---|---|---|
| Titre de page (`h1`) | 30px | 23px | 400 |
| Indicateur (valeur) | 25px | 25px | 400 |
| Titre de carte (`h2`) | 18px | 16px | 700 |
| Logo « N » | 18px | 18px | 800 |
| Nom de marque | 18px | 17px (« Nova ») | 400 |
| Texte courant, liens de nav | 14px | 14px | 400 / 500 inactif |
| Nom du client | 14px | 11px | 600 |
| Montant | 14px | 11px | 400 |
| Sous-titres, légende, e-mail | 12px | 12px | 400 |
| Badge, en-tête de colonne, axes | 10px | 10px | 400 / 700 colonnes |

## Espacements

| Contexte | Desktop | Tablette | Mobile |
|---|---|---|---|
| Marge du contenu (`--main-pad`) | 32 32 48 | 24 24 40 | 24 16 32 |
| Écart entre blocs | 24px | 24px | 20px |
| Écart entre indicateurs | 16px | 16px | 12px |
| Padding des cartes indicateurs | 20px | 20px | 20px |
| Padding de la carte graphique | 24px | 24px | 16px |
| Padding horizontal du tableau | 24px | 24px | 12px |

Écarts internes courants : 2px, 3px, 4px, 6px, 8px, 12px, 16px, 32px.

## Formes et effets

| Token | Valeur | Usage |
|---|---|---|
| `--radius` | `12px` | Cartes, carte d'aide |
| `--radius-sm` | `8px` | Boutons, liens de nav, icônes, recherche |
| (raccourci clavier) | `6px` | Touche « ⌘K » de la recherche |
| (badge, avatar) | `999px` | Pastilles rondes |
| `--shadow` | `0 4px 16px rgba(22, 32, 51, .05)` | Cartes (Figma : alpha 0.051) |

## Dimensions

| Token / élément | Desktop | Tablette | Mobile |
|---|---|---|---|
| `--sidebar-w` | 240px | 72px | tiroir 240px |
| `--topbar-h` | 80px | 80px | 68px |
| Champ de recherche | 380 × 42px | 292 × 42px | dépliable |
| Lien de navigation | 44px de haut | 44px | 44px |
| Carte indicateur | 126px de haut | 126px | 126px |
| Hauteur du tracé (`--plot-h`) | 218px | 218px | 160px |
| Ligne du tableau | 66px | 66px | 62px |
| Avatar client | 36px | 36px | 30px |
| Avatar utilisateur, notifications | 38px | 38px | 38px |
| Pastille d'icône (indicateurs, aide) | 32px | 32px | 32px |
| Bouton période / support | 34px de haut | 34px | masqué / tiroir |

### Icônes

| Contexte | Taille |
|---|---|
| Navigation | 19px |
| Notifications | 18px |
| Recherche, aide | 17px |
| Indicateurs, calendrier | 16px |
| Repère de légende | 8px (rond) |

## Points de rupture

| Nom | Largeur |
|---|---|
| Mobile (styles de base) | < 768px |
| Tablette | `min-width: 768px` |
| Desktop | `min-width: 1024px` |

Les 4 indicateurs passent sur une rangée via une container query quand `main` fait au moins 1040px de contenu (soit environ 1344px d'écran) ; en dessous, 2 colonnes.
