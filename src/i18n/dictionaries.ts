import type { Locale } from "./routes";

/**
 * Textes de l'interface. Le français fait référence ; l'anglais doit avoir
 * exactement les mêmes clés (TypeScript le vérifie). Les contenus éditables
 * (boissons, photos, offres, horaires) restent dans src/data/.
 */
const fr = {
  meta: {
    siteTitle: "Zencca — Salon de thé, matcha & bubble tea, rue Tiquetonne, Paris 2e",
    titleTemplate: "%s — Zencca, salon de thé Paris 2e",
    keywords: ["Zencca", "salon de thé Paris 2", "bubble tea Paris 2", "matcha Paris 2", "rue Tiquetonne", "Châtelet", "Étienne Marcel"],
    ogAlt: "Zencca, salon de thé rue Tiquetonne à Paris",
    ogLocale: "fr_FR",
    pages: {
      home: {
        title: "Zencca — Salon de thé, matcha & bubble tea, rue Tiquetonne, Paris 2e",
        description:
          "Zencca, salon de thé au 20 rue Tiquetonne (Paris 2e) : matcha, bubble teas, thés aux fruits frais et créations coco & café, près d'Étienne Marcel et Châtelet.",
      },
      carte: {
        title: "La carte : matcha, bubble tea, fruits frais et coco",
        description:
          "La carte Zencca : matcha latte, sakura matcha, eau coco matcha, thé au raisin frais, mango pomelo sago, coco latte, smoothies au yaourt. Salon de thé rue Tiquetonne, Paris 2e.",
      },
      galerie: {
        title: "Galerie : boissons, salon et ambiance",
        description:
          "Les photos de Zencca : sakura matcha, thé au raisin frais, coco latte, la façade ocre et la fresque du salon de thé rue Tiquetonne.",
      },
      univers: {
        title: "Notre univers : le salon de thé Zencca, rue Tiquetonne",
        description:
          "L'univers Zencca : un salon de thé ocre rue Tiquetonne, une mascotte qui boit à la paille, du matcha, des fruits frais et des créations coco & café.",
      },
      nouveautes: {
        title: "Nouveautés & offres",
        description:
          "Les nouvelles boissons Zencca (matcha latte, pistache jasmin coco, café latte pistache, coco americano) et les offres du salon de thé rue Tiquetonne.",
      },
      visite: {
        title: "Nous trouver : 20 rue Tiquetonne, Paris 2e",
        description:
          "Zencca, salon de thé au 20 rue Tiquetonne, 75002 Paris, près des métros Étienne Marcel et Sentier et de Châtelet – Les Halles. Horaires, itinéraire et carte.",
      },
      notFound: { title: "Page introuvable", description: "Cette page n'existe pas ou a changé d'adresse." },
    },
  },
  common: {
    skip: "Aller au contenu",
    homeAria: "Zencca, retour à l'accueil",
    mainNav: "Navigation principale",
    footerNav: "Pied de page",
    mobileNav: "Menu mobile",
    menu: "Menu",
    close: "Fermer",
    visit: "Nous rendre visite",
    directions: "Itinéraire",
    findUs: "Nous trouver",
    theMenu: "La carte",
    seeMap: "Voir la carte",
    newBadge: "Nouveau",
    seeSheet: "Voir la fiche",
    teaHouse: "Salon de Thé",
    lang: { label: "EN", name: "English", aria: "English version", target: "en" as Locale },
  },
  footer: {
    mascotAria: "Faire boire la mascotte Zencca",
    headline: "Passez nous voir rue Tiquetonne.",
    address: "Adresse",
    explore: "Explorer",
    follow: "Suivre",
    officialSite: "Site officiel",
  },
  hero: {
    title: ["Une rencontre infusée", "dans le thé."],
    cupsAria: "Quelques boissons de la carte",
    cupAria: (name: string) => `${name} : voir la fiche`,
    tagline: "Des créations gourmandes, colorées et pleines de douceur, au cœur de Paris.",
    discover: "Découvrir la carte",
  },
  creations: {
    title: ["Nos", "créations"],
    lead: "Matcha, fruits frais, coco et café. Chaque boisson se construit en couches, et chacune a sa couleur.",
    seeAll: "Voir toute la carte",
    seeDrink: "Voir la boisson",
    supplements: "En 500 ml ou 700 ml, avec perles de tapioca, gelée de coco ou perles éclatantes au litchi.",
  },
  saveurs: {
    srTitle: "Les saveurs Zencca : matcha, coco et fruits",
    chapters: [
      { word: "Matcha", line: "Un vert franc, battu puis posé en couche sur le lait ou l'eau de coco.", cta: "Les boissons matcha" },
      { word: "Coco", line: "Lait de coco épais, mousse légère, café versé à la dernière seconde.", cta: "Les boissons coco" },
      { word: "Fruits", line: "Raisin, pêche, mangue : des fruits frais, en granité, en pulpe ou en morceaux.", cta: "Les boissons fruits" },
    ],
  },
  signature: {
    srTitle: "La signature Zencca",
    lead: "La phrase brille au-dessus du comptoir. Ici, le thé sert de point de rencontre : entre une pause et une gourmandise, entre la rue Tiquetonne et des saveurs venues d'Asie.",
    bag: "Le sac illustré",
    mural: "La fresque du salon",
  },
  salon: {
    title: ["Le salon", "de thé"],
    lead: "Au 20 rue Tiquetonne : une façade ocre, des arches, un sol en terrazzo et une grande fresque bleue.",
    cta: "Découvrir notre univers",
    captions: [
      "La façade ocre et ses chaises de terrasse",
      "L'enseigne jaune, repère de la rue",
      "Plafond lumineux, banc en bois et fresque fleurie",
      "Portes en bois grandes ouvertes sur le comptoir",
    ],
  },
  instagram: {
    title: "Le salon, au fil des jours sur Instagram",
    lead: "Nouvelles boissons, saisons, coulisses du comptoir.",
    aria: (handle: string) => `Voir le compte Instagram ${handle} (nouvel onglet)`,
    follow: "Suivre sur Instagram",
  },
  visit: {
    nearby: "à deux pas d'Étienne Marcel et de Châtelet.",
  },
  carte: {
    heroTitle: ["Toute", "la carte"],
    heroLead: (n: number) => `${n} boissons et gourmandises, du matcha aux fruits frais. Choisissez un univers, ouvrez une boisson.`,
    disclaimer: "La carte affichée au comptoir fait foi : certaines boissons varient selon les saisons et les arrivages.",
    filtersAria: "Catégories de la carte",
    all: "Toute la carte",
    news: "Nouveautés",
    newsIntro: "Les dernières arrivées sur la carte.",
    signatures: "Signatures",
    signaturesIntro: "Les créations qui racontent Zencca.",
    visualAria: (name: string) => `Couleurs de la boisson ${name}`,
    sizesAria: "Formats et prix",
    tempsAria: "Températures",
    hot: "Chaud",
    cold: "Froid",
    size: "Format",
    sheetClose: "Fermer la fiche",
    prev: "Boisson précédente",
    next: "Boisson suivante",
    addOns: (list: string, price: string) => `À ajouter : ${list.toLowerCase()}${price ? ` (${price})` : ""}.`,
    taste: "Venir la goûter",
  },
  galerie: {
    heroTitle: ["La", "galerie"],
    heroLead: "Les boissons, le salon et les petits détails, en grand.",
    filterAria: "Filtrer la galerie",
    all: "Tout voir",
    enlarge: (caption: string) => `Agrandir : ${caption}`,
    lightbox: "Photo agrandie",
    prev: "Photo précédente",
    next: "Photo suivante",
  },
  univers: {
    heroTitle: ["Notre", "univers"],
    heroLead: "Un néon, une façade ocre, une mascotte et beaucoup de couleurs. Bienvenue chez Zencca.",
    conceptTitle: ["Un salon de thé,", "tout en couleurs"],
    conceptLead:
      "Matcha, bubble teas, thés aux fruits frais, smoothies au yaourt et créations coco & café. On passe pour une boisson à emporter, on reste pour la pause.",
    strata: [
      { label: "Thé", note: "oolong, jasmin, thé vert" },
      { label: "Matcha", note: "battu, en couche" },
      { label: "Fruits frais", note: "raisin, pêche, mangue" },
      { label: "Coco", note: "lait, eau, gelée" },
      { label: "Lait & mousse", note: "pour finir en douceur" },
    ],
    mascotTitle: ["La", "mascotte"],
    mascotLead:
      "Une petite fille aux couettes, une boisson à la paille. On la retrouve sur l'enseigne jaune, sur chaque gobelet, sur la plaque de la porte et sur le rideau du comptoir.",
    mascotSip: "Lui offrir une gorgée",
    mascotAria: "Faire boire la mascotte",
    worldsTitle: ["Sept univers,", "une même douceur"],
    shopTitle: ["La", "boutique"],
    shopLead:
      "Une façade ocre et un store prune, des portes en bois, des arches à l'intérieur, un sol en terrazzo et une grande fresque fleurie derrière une grille de métal.",
    shopCaptions: ["Le comptoir, le banc en bois et la fresque", "L'entrée, rue Tiquetonne", "L'enseigne jaune"],
    stayTitle: ["Sur place", "ou à emporter"],
    stayLead:
      "Quelques chaises en terrasse aux beaux jours, des gobelets illustrés pour les boissons chaudes et un sac Zencca pour repartir les mains pleines.",
  },
  nouveautes: {
    heroTitle: ["Nouveautés", "& offres"],
    heroLead: "Ce qui vient d'arriver au comptoir.",
    newsTitle: ["Nouvelles", "sur la carte"],
    offersTitle: ["Les offres", "du moment"],
    noOffer: "Pas d'offre en cours pour le moment.",
    noOfferLead: "Les offres et les nouvelles boissons sont annoncées en premier sur Instagram.",
    follow: (handle: string) => `Suivre ${handle}`,
    draft: "Brouillon, non publié",
    from: (d: string) => `Du ${d}`,
    until: (d: string) => `jusqu'au ${d}`,
    enjoy: "En profiter en boutique",
  },
  visite: {
    title: ["20 rue", "Tiquetonne"],
    googleDirections: "Itinéraire Google Maps",
    appleMaps: "Ouvrir dans Plans",
    mapSection: "Carte et accès",
    hours: "Horaires",
    access: "Accès",
    follow: "Nous suivre",
    officialSite: (label: string) => `Site officiel et compte client : ${label}`,
    hoursCaption: "Horaires d'ouverture",
    today: "Aujourd'hui",
    closed: "Fermé",
    openUntil: (t: string) => `Ouvert jusqu'à ${t}`,
    closedOpens: (when: string, t: string) => `Fermé, ouvre ${when} à ${t}`,
    whenToday: "aujourd'hui",
    whenTomorrow: "demain",
    whenDay: (day: string) => day.toLowerCase(),
    mapTitle: "Carte Google Maps : Zencca, 20 rue Tiquetonne, 75002 Paris",
    mapHeading: "Zencca, 20 rue Tiquetonne",
    mapConsent: "La carte interactive est fournie par Google Maps, qui peut déposer des cookies. Elle ne se charge qu'après votre accord.",
    mapShow: "Afficher la carte",
    mapOpen: "Ouvrir Google Maps",
  },
  notFound: {
    title: "Gobelet vide.",
    lead: "Cette page n'existe pas ou a changé d'adresse. La carte, elle, est toujours pleine.",
    seeMenu: "Voir la carte",
    home: "Retour à l'accueil",
  },
};

export type Dict = typeof fr;

const en: Dict = {
  meta: {
    siteTitle: "Zencca — Tea house, matcha & bubble tea, rue Tiquetonne, Paris 2nd",
    titleTemplate: "%s — Zencca, tea house in Paris 2nd",
    keywords: ["Zencca", "tea house Paris", "bubble tea Paris", "matcha Paris", "rue Tiquetonne", "Châtelet", "Étienne Marcel"],
    ogAlt: "Zencca, a tea house on rue Tiquetonne in Paris",
    ogLocale: "en_GB",
    pages: {
      home: {
        title: "Zencca — Tea house, matcha & bubble tea, rue Tiquetonne, Paris 2nd",
        description:
          "Zencca, a tea house at 20 rue Tiquetonne (Paris 2nd): matcha, bubble tea, fresh fruit teas and coconut & coffee creations, near Étienne Marcel and Châtelet.",
      },
      carte: {
        title: "Menu: matcha, bubble tea, fresh fruit and coconut",
        description:
          "The Zencca menu: matcha latte, sakura matcha, matcha coconut water, fresh grape tea, mango pomelo sago, coconut latte, yogurt smoothies. Tea house on rue Tiquetonne, Paris 2nd.",
      },
      galerie: {
        title: "Gallery: drinks, tea house and atmosphere",
        description:
          "Photos of Zencca: sakura matcha, fresh grape tea, coconut latte, the ochre shopfront and the mural of the tea house on rue Tiquetonne.",
      },
      univers: {
        title: "Our world: the Zencca tea house on rue Tiquetonne",
        description:
          "The world of Zencca: an ochre tea house on rue Tiquetonne, a mascot sipping through a straw, matcha, fresh fruit and coconut & coffee creations.",
      },
      nouveautes: {
        title: "What's new & offers",
        description:
          "New Zencca drinks (matcha latte, pistachio jasmine coconut, pistachio coffee latte, coco americano) and the latest offers from the tea house on rue Tiquetonne.",
      },
      visite: {
        title: "Find us: 20 rue Tiquetonne, Paris 2nd",
        description:
          "Zencca, a tea house at 20 rue Tiquetonne, 75002 Paris, near Étienne Marcel and Sentier metro stations and Châtelet – Les Halles. Opening hours, directions and map.",
      },
      notFound: { title: "Page not found", description: "This page doesn't exist or has moved." },
    },
  },
  common: {
    skip: "Skip to content",
    homeAria: "Zencca, back to the home page",
    mainNav: "Main navigation",
    footerNav: "Footer",
    mobileNav: "Mobile menu",
    menu: "Menu",
    close: "Close",
    visit: "Visit us",
    directions: "Directions",
    findUs: "Find us",
    theMenu: "Menu",
    seeMap: "View the map",
    newBadge: "New",
    seeSheet: "View details",
    teaHouse: "Salon de Thé",
    lang: { label: "FR", name: "Français", aria: "Version française", target: "fr" },
  },
  footer: {
    mascotAria: "Give the Zencca mascot a sip",
    headline: "Come and see us on rue Tiquetonne.",
    address: "Address",
    explore: "Explore",
    follow: "Follow",
    officialSite: "Official website",
  },
  hero: {
    title: ["A meeting", "steeped in tea."],
    cupsAria: "A few drinks from the menu",
    cupAria: (name: string) => `${name}: view details`,
    tagline: "Indulgent, colourful and gentle creations, in the heart of Paris.",
    discover: "Explore the menu",
  },
  creations: {
    title: ["Our", "creations"],
    lead: "Matcha, fresh fruit, coconut and coffee. Every drink is built in layers, and each one has its own colour.",
    seeAll: "See the full menu",
    seeDrink: "See the drink",
    supplements: "In 500 ml or 700 ml, with tapioca pearls, coconut jelly or lychee popping boba.",
  },
  saveurs: {
    srTitle: "Zencca flavours: matcha, coconut and fruit",
    chapters: [
      { word: "Matcha", line: "A bold green, whisked then layered over milk or coconut water.", cta: "Matcha drinks" },
      { word: "Coconut", line: "Thick coconut milk, light foam, coffee poured at the very last second.", cta: "Coconut drinks" },
      { word: "Fruit", line: "Grape, peach, mango: fresh fruit, as slush, pulp or pieces.", cta: "Fruit drinks" },
    ],
  },
  signature: {
    srTitle: "The Zencca signature",
    lead: "The phrase glows above the counter: “a meeting steeped in tea”. Here, tea is where things come together: a break and a treat, rue Tiquetonne and flavours from Asia.",
    bag: "The illustrated bag",
    mural: "The tea house mural",
  },
  salon: {
    title: ["The tea", "house"],
    lead: "At 20 rue Tiquetonne: an ochre shopfront, arches, a terrazzo floor and a large blue mural.",
    cta: "Discover our world",
    captions: [
      "The ochre shopfront and its terrace chairs",
      "The yellow sign, a landmark on the street",
      "Glowing ceiling, wooden bench and floral mural",
      "Wooden doors wide open onto the counter",
    ],
  },
  instagram: {
    title: "The tea house, day by day on Instagram",
    lead: "New drinks, seasons, behind the counter.",
    aria: (handle: string) => `See the ${handle} Instagram account (new tab)`,
    follow: "Follow on Instagram",
  },
  visit: {
    nearby: "a stone's throw from Étienne Marcel and Châtelet.",
  },
  carte: {
    heroTitle: ["The full", "menu"],
    heroLead: (n: number) => `${n} drinks and treats, from matcha to fresh fruit. Pick a world, open a drink.`,
    disclaimer: "The menu at the counter is the reference: some drinks vary with the seasons and deliveries.",
    filtersAria: "Menu categories",
    all: "Full menu",
    news: "New",
    newsIntro: "The latest arrivals on the menu.",
    signatures: "Signatures",
    signaturesIntro: "The creations that tell the Zencca story.",
    visualAria: (name: string) => `Colours of the ${name}`,
    sizesAria: "Sizes and prices",
    tempsAria: "Temperatures",
    hot: "Hot",
    cold: "Iced",
    size: "Size",
    sheetClose: "Close the details",
    prev: "Previous drink",
    next: "Next drink",
    addOns: (list: string, price: string) => `Add-ons: ${list.toLowerCase()}${price ? ` (${price})` : ""}.`,
    taste: "Come and taste it",
  },
  galerie: {
    heroTitle: ["The", "gallery"],
    heroLead: "The drinks, the tea house and the little details, up close.",
    filterAria: "Filter the gallery",
    all: "See all",
    enlarge: (caption: string) => `Enlarge: ${caption}`,
    lightbox: "Enlarged photo",
    prev: "Previous photo",
    next: "Next photo",
  },
  univers: {
    heroTitle: ["Our", "world"],
    heroLead: "A neon sign, an ochre shopfront, a mascot and lots of colour. Welcome to Zencca.",
    conceptTitle: ["A tea house", "full of colour"],
    conceptLead:
      "Matcha, bubble tea, fresh fruit teas, yogurt smoothies and coconut & coffee creations. Drop in for a drink to go, stay for the break.",
    strata: [
      { label: "Tea", note: "oolong, jasmine, green tea" },
      { label: "Matcha", note: "whisked, layered" },
      { label: "Fresh fruit", note: "grape, peach, mango" },
      { label: "Coconut", note: "milk, water, jelly" },
      { label: "Milk & foam", note: "for a gentle finish" },
    ],
    mascotTitle: ["The", "mascot"],
    mascotLead:
      "A little girl with pigtails and a drink with a straw. You'll find her on the yellow sign, on every cup, on the door plate and on the counter curtain.",
    mascotSip: "Give her a sip",
    mascotAria: "Make the mascot take a sip",
    worldsTitle: ["Seven worlds,", "the same sweetness"],
    shopTitle: ["The", "shop"],
    shopLead:
      "An ochre shopfront and a plum awning, wooden doors, arches inside, a terrazzo floor and a large floral mural behind a metal grille.",
    shopCaptions: ["The counter, the wooden bench and the mural", "The entrance, rue Tiquetonne", "The yellow sign"],
    stayTitle: ["Stay in", "or take away"],
    stayLead:
      "A few terrace chairs on sunny days, illustrated cups for hot drinks and a Zencca bag to leave with your hands full.",
  },
  nouveautes: {
    heroTitle: ["What's new", "& offers"],
    heroLead: "Just arrived at the counter.",
    newsTitle: ["New", "on the menu"],
    offersTitle: ["Current", "offers"],
    noOffer: "No offers running at the moment.",
    noOfferLead: "Offers and new drinks are announced first on Instagram.",
    follow: (handle: string) => `Follow ${handle}`,
    draft: "Draft, not published",
    from: (d: string) => `From ${d}`,
    until: (d: string) => `until ${d}`,
    enjoy: "Enjoy it in store",
  },
  visite: {
    title: ["20 rue", "Tiquetonne"],
    googleDirections: "Google Maps directions",
    appleMaps: "Open in Apple Maps",
    mapSection: "Map and access",
    hours: "Opening hours",
    access: "Getting here",
    follow: "Follow us",
    officialSite: (label: string) => `Official website and customer account: ${label}`,
    hoursCaption: "Opening hours",
    today: "Today",
    closed: "Closed",
    openUntil: (t: string) => `Open until ${t}`,
    closedOpens: (when: string, t: string) => `Closed, opens ${when} at ${t}`,
    whenToday: "today",
    whenTomorrow: "tomorrow",
    whenDay: (day: string) => `on ${day}`,
    mapTitle: "Google Maps: Zencca, 20 rue Tiquetonne, 75002 Paris",
    mapHeading: "Zencca, 20 rue Tiquetonne",
    mapConsent: "The interactive map is provided by Google Maps, which may set cookies. It only loads once you agree.",
    mapShow: "Show the map",
    mapOpen: "Open Google Maps",
  },
  notFound: {
    title: "Empty cup.",
    lead: "This page doesn't exist or has moved. The menu, on the other hand, is always full.",
    seeMenu: "See the menu",
    home: "Back to home",
  },
};

export const dictionaries: Record<Locale, Dict> = { fr, en };
export const getDict = (locale: Locale) => dictionaries[locale];
