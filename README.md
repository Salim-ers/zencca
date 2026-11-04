# Zencca — site vitrine

Site vitrine immersif du salon de thé **Zencca**, 20 rue Tiquetonne, 75002 Paris.
Projet indépendant du site existant zencca.com (aucune connexion, inscription, panier ni paiement).

## Démarrer

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Node 20.9+ requis. Déploiement : importer le dossier dans Vercel (framework détecté automatiquement).

### Variables d'environnement (facultatives)

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL publique (canonical, sitemap, Open Graph, JSON-LD). Défaut : `https://zencca.vercel.app` |
| `NEXT_PUBLIC_PREVIEW_DRAFTS` | `true` pour afficher les offres non publiées avec un bandeau « Brouillon » (aperçu interne) |

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 · GSAP + ScrollTrigger (séquences au défilement) · Motion (filtres, fiches, lightbox, menu) · Lenis (défilement doux desktop) · next/image (AVIF/WebP, flou de chargement).

## Où modifier le contenu

Tout le contenu éditable est centralisé dans `src/data/` :

| Fichier | Contenu |
| --- | --- |
| `site.ts` | Adresse, horaires, accès métro, Instagram, lien zencca.com, **`SHOW_PRICES`** |
| `products.ts` | Boissons, catégories, collections, suppléments, prix |
| `offers.ts` | Offres et événements (`active`, `validFrom`, `validUntil`, prix, photo) |
| `gallery.ts` | Photos de la galerie, catégories, légendes, composition |
| `images.ts` | Photos importées + textes alternatifs + point focal |

- **Prix** : recopiés de la carte en boutique, masqués tant que `SHOW_PRICES = false`.
- **Retirer une offre** : `active: false` dans `offers.ts`. Les dates sont vérifiées automatiquement (page régénérée toutes les heures).
- **Ajouter une boisson** : ajouter une entrée dans `products.ts` (photo facultative : sans photo, un visuel graphique de ses couches de couleur s'affiche).
- **Ajouter une photo** : déposer le fichier dans `src/assets/photos/`, l'importer dans `images.ts`.

## Structure

```
src/
  app/                 routes (accueil, la-carte, notre-univers, galerie, nouveautes, nous-trouver),
                       sitemap, robots, manifest, icônes
  assets/photos/       photographies fournies (optimisées à la volée par next/image)
    carte/             visuels des boissons générés par IA d'après le menu en boutique (même cadrage, même fond)
    comptoir/          les mêmes gobelets détourés, pour le hero de l'accueil
  components/
    brand/             logo vectorisé (tracé fidèle du PNG fourni) + mascotte animée
    layout/            header, menu mobile, footer, écran d'intro, barre d'action mobile
    transition/        transitions entre pages (couches de couleur + titre)
    home/ carte/ galerie/ univers/ offres/ location/   sections de pages
    ui/                primitives d'animation (InfuseImage, RevealText, Parallax, Magnetic…)
  data/                contenu éditable
  lib/                 GSAP, Lenis, horaires (heure de Paris), SEO
  fonts/               Fraunces, Figtree, sous-ensemble Noto Serif SC (caractères de la carte)
```

## Accessibilité & mouvement

- `prefers-reduced-motion` : intro raccourcie, pas d'épinglage ni de parallaxe, transitions de page remplacées par une navigation directe.
- Navigation clavier complète, focus visible, pièges de focus dans le menu, la fiche boisson et la lightbox (Échap pour fermer, flèches pour naviguer).
- Google Maps se charge uniquement après accord du visiteur.

## Informations à valider avant mise en ligne

Voir les champs `aValider` dans `src/data/`. En résumé : prix, offre du matin, horaires (relevés sur la fiche Google), coordonnées GPS, stations de métro, fidélité des visuels de `carte/` aux vraies boissons, lien vers zencca.com, URL définitive du site.
