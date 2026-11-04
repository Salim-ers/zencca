import type { PhotoKey } from "./images";

/**
 * ─────────────────────────────────────────────────────────────
 *  LA CARTE ZENCCA
 *  Source : photos de la carte affichée en boutique (deux versions)
 *  + visuel « offre du matin ». Les prix sont recopiés de la carte
 *  mais ne s'affichent que si SHOW_PRICES = true (data/site.ts).
 *  `aValider` signale une information partiellement lisible.
 * ─────────────────────────────────────────────────────────────
 */

export type Temp = "chaud" | "froid";

export type CategoryId = "matcha" | "thes" | "fruits" | "lactees" | "coco-cafe" | "smoothies" | "gourmandises";

export type Category = {
  id: CategoryId;
  label: string;
  cjk?: string;
  /** Phrase courte d'introduction */
  intro: string;
  color: string;
  tint: string;
  ink: string;
  collection: CollectionId;
};

export type CollectionId = "matcha" | "fruity" | "coco-cafe" | "signature";

export type Product = {
  slug: string;
  name: string;
  /** Nom tel qu'écrit sur la carte bilingue */
  cjk?: string;
  en?: string;
  category: CategoryId;
  description: string;
  temps?: Temp[];
  sizes: { ml: number; price?: number }[];
  isNew?: boolean;
  signature?: boolean;
  photo?: PhotoKey;
  /** Couches visibles de la boisson, du haut vers le bas */
  layers: string[];
  aValider?: string;
};

export const categories: Category[] = [
  {
    id: "matcha",
    label: "Matcha",
    cjk: "抹茶甄选",
    intro: "Le vert profond du matcha, posé en couche sur le lait, la coco ou le sakura.",
    color: "#a9bd6e",
    tint: "#e3e8c8",
    ink: "#33401a",
    collection: "matcha",
  },
  {
    id: "thes",
    label: "Thés frais",
    intro: "Thés glacés, agrumes et fruits : la fraîcheur en version simple.",
    color: "#f0a65a",
    tint: "#fbe2c3",
    ink: "#5a2c0b",
    collection: "fruity",
  },
  {
    id: "fruits",
    label: "Créations fruitées",
    cjk: "鲜果绵密",
    intro: "Mangue, pomelo, raisin : des couches de fruits frais, généreuses et colorées.",
    color: "#e5707d",
    tint: "#f8d9d9",
    ink: "#5b1520",
    collection: "fruity",
  },
  {
    id: "lactees",
    label: "Boissons lactées",
    intro: "Thés au lait, perles de tapioca et douceurs onctueuses, chaudes ou glacées.",
    color: "#d4a77a",
    tint: "#f3e3cf",
    ink: "#4a2a14",
    collection: "coco-cafe",
  },
  {
    id: "coco-cafe",
    label: "Coco & café",
    cjk: "椰咖特调",
    intro: "Le café rencontre le lait de coco, la pistache et le jasmin.",
    color: "#8a5a3c",
    tint: "#efe4d4",
    ink: "#3b2214",
    collection: "coco-cafe",
  },
  {
    id: "smoothies",
    label: "Smoothies au yaourt",
    cjk: "酸奶轻享",
    intro: "Fruits mixés et yaourt : épais, frais, tout en douceur.",
    color: "#f4c35e",
    tint: "#fbecc6",
    ink: "#5a3b05",
    collection: "fruity",
  },
  {
    id: "gourmandises",
    label: "À grignoter",
    intro: "Pour accompagner votre boisson.",
    color: "#e2a447",
    tint: "#f8e5c3",
    ink: "#4f300a",
    collection: "coco-cafe",
  },
];

const S = (a?: number, b?: number) =>
  b === undefined ? [{ ml: 500, price: a }] : [{ ml: 500, price: a }, { ml: 700, price: b }];

export const products: Product[] = [
  // ── Matcha
  {
    slug: "matcha-latte",
    name: "Matcha latte",
    cjk: "抹茶拿铁",
    category: "matcha",
    description: "Le classique : matcha vert intense posé sur un lait frais.",
    temps: ["chaud", "froid"],
    sizes: S(6.5, 7.5),
    isNew: true,
    photo: "carteMatchaLatte",
    layers: ["#7f9a3a", "#a9bd6e", "#f4f0e4"],
  },
  {
    slug: "eau-coco-matcha",
    name: "Eau coco matcha",
    cjk: "抹茶香水椰",
    en: "Matcha coconut",
    category: "matcha",
    description: "Matcha parfumé sur eau de coco glacée, tout en fraîcheur.",
    temps: ["froid"],
    sizes: S(6.9, 7.9),
    signature: true,
    photo: "carteEauCocoMatcha",
    layers: ["#8fab47", "#bcd08a", "#eef2dc"],
  },
  {
    slug: "sakura-matcha",
    name: "Sakura matcha",
    cjk: "樱之春",
    en: "Matcha with coconut milk and sakura",
    category: "matcha",
    description: "Matcha au lait de coco et fleur de cerisier : un vert vif sur un rose tendre.",
    temps: ["froid"],
    sizes: S(7.5, 8.5),
    signature: true,
    photo: "carteSakuraMatcha",
    layers: ["#86a43f", "#ebbfc6", "#f2c9d0"],
  },

  // ── Thés frais
  {
    slug: "the-oolong-peche",
    name: "Thé oolong à la pêche",
    cjk: "蜜桃乌龙茶",
    en: "Peach oolong tea",
    category: "thes",
    description: "Oolong infusé et pêche, servi bien frais avec une tranche d'agrume.",
    sizes: S(5.9, 6.9),
    photo: "carteOolongPeche",
    layers: ["#e98a2e", "#d4661c"],
  },
  {
    slug: "the-vert-citron-frappe",
    name: "Thé vert citron frappé",
    cjk: "手打柠檬茶",
    en: "Handmade lemon green tea",
    category: "thes",
    description: "Thé vert et citron frappés à la main, acidulé et désaltérant.",
    sizes: S(5.5, 6.5),
    photo: "carteCitronFrappe",
    layers: ["#f7d65a", "#efb93a"],
  },

  // ── Créations fruitées
  {
    slug: "the-au-raisin-frais",
    name: "Thé au raisin frais",
    cjk: "多肉葡萄",
    en: "Fresh grape tea",
    category: "fruits",
    description: "Granité de raisin rouge marbré au-dessus d'une pulpe de raisin frais.",
    temps: ["froid"],
    sizes: S(),
    signature: true,
    photo: "carteRaisinFrais",
    layers: ["#f6efe4", "#b8344a", "#e4b94a"],
    aValider: "Prix non lisibles sur la carte.",
  },
  {
    slug: "mango-pomelo-sago",
    name: "Mango pomelo sago",
    cjk: "杨枝甘露",
    category: "fruits",
    description: "Mangue, pomelo et perles de sagou : un grand classique, onctueux et fruité.",
    temps: ["froid"],
    sizes: S(),
    photo: "carteMangoPomelo",
    layers: ["#fbf0da", "#f4a63c", "#f7c25c"],
    aValider: "Prix non lisibles sur la carte.",
  },
  {
    slug: "mango-coco-bleu",
    name: "Mango coco bleu",
    en: "Mango blue coco",
    category: "fruits",
    description: "Une couche bleu pastel, de la coco et de la mangue : la plus photogénique.",
    temps: ["froid"],
    sizes: S(),
    photo: "carteMangoCocoBleu",
    layers: ["#8fb8dc", "#f5f1e8", "#f3be4a"],
    aValider: "Prix non lisibles sur la carte.",
  },

  // ── Boissons lactées
  {
    slug: "the-au-lait-signature",
    name: "Thé au lait signature",
    en: "Signature milk tea",
    category: "lactees",
    description: "Le thé au lait de la maison, rond et réconfortant.",
    sizes: S(6.5, 7.5),
    signature: true,
    photo: "carteTheAuLait",
    layers: ["#d9b58c", "#c89a6a"],
    aValider: "Nom partiellement visible sur la carte. Gobelet non visible non plus : visuel à comparer à la vraie boisson.",
  },
  {
    slug: "latte-pistache",
    name: "Latte pistache",
    category: "lactees",
    description: "Crème de pistache et lait, parsemé d'éclats de pistache.",
    sizes: S(7, 8),
    photo: "carteLattePistache",
    layers: ["#e6dcae", "#f4f0e2"],
    aValider: "Nom et prix partiellement visibles sur la carte.",
  },
  {
    slug: "lait-perles-sucre-brun",
    name: "Lait frais aux perles de tapioca, sucre brun",
    cjk: "黑糖珍珠鲜牛乳",
    en: "Brown sugar pearl fresh milk",
    category: "lactees",
    description: "Lait frais, perles de tapioca et sirop de sucre brun.",
    temps: ["chaud", "froid"],
    sizes: S(6.5, 7.5),
    photo: "carteLaitPerles",
    layers: ["#8a5226", "#efe2cf", "#3a2216"],
  },
  {
    slug: "chocolat-chaud",
    name: "Chocolat chaud",
    category: "lactees",
    description: "Un chocolat chaud généreux, servi dans un gobelet illustré.",
    temps: ["chaud"],
    sizes: [{ ml: 500 }],
    photo: "carteChocolatChaud",
    layers: ["#6b3a22", "#4d2716"],
    aValider: "Visible sur le visuel de l'offre du matin. Prix et formats à confirmer.",
  },

  // ── Coco & café
  {
    slug: "taro-coco-creme",
    name: "Taro coco crème",
    cjk: "芋泥厚椰乳",
    en: "Taro coconut cream foam",
    category: "coco-cafe",
    description: "Purée de taro violette et lait de coco épais, coiffés d'une mousse.",
    sizes: S(6.5, 7.5),
    signature: true,
    photo: "carteTaroCoco",
    layers: ["#c9b3de", "#f2ecf3", "#e7dcef"],
  },
  {
    slug: "pistache-jasmin-coco",
    name: "Pistache jasmin coco",
    cjk: "开心果茉莉椰",
    en: "Pistachio jasmine coconut",
    category: "coco-cafe",
    description: "Thé au jasmin, coco et pistache : floral et gourmand.",
    temps: ["froid"],
    sizes: S(6.9, 7.9),
    isNew: true,
    photo: "cartePistacheJasmin",
    layers: ["#f1e6c6", "#e9b64c", "#e2a43a"],
  },
  {
    slug: "cafe-latte-pistache",
    name: "Café latte pistache",
    cjk: "开心果咖啡拿铁",
    en: "Coffee pistachio latte",
    category: "coco-cafe",
    description: "Expresso, lait et crème de pistache, chaud ou glacé.",
    temps: ["chaud", "froid"],
    sizes: S(7.5, 8.5),
    isNew: true,
    signature: true,
    photo: "carteCafePistache",
    layers: ["#b48a5e", "#e6dcae", "#f4efe2"],
  },
  {
    slug: "coco-americano",
    name: "Coco americano",
    cjk: "椰香美式",
    category: "coco-cafe",
    description: "Un americano allongé à l'eau de coco, sur glace.",
    temps: ["froid"],
    sizes: S(6),
    isNew: true,
    photo: "carteCocoAmericano",
    layers: ["#7a3f1c", "#a8632e"],
  },
  {
    slug: "coco-latte",
    name: "Coco latte",
    cjk: "厚椰乳拿铁",
    en: "Coconut latte",
    category: "coco-cafe",
    description: "Expresso versé sur un lait de coco épais : deux couches, un contraste.",
    temps: ["froid"],
    sizes: S(6.5, 7.5),
    photo: "carteCocoLatte",
    layers: ["#6b3a1e", "#c68e5c", "#f6f1e6"],
  },

  // ── Smoothies
  {
    slug: "smoothie-mangue-yaourt",
    name: "Smoothie mangue yaourt",
    cjk: "芒果酸奶昔",
    category: "smoothies",
    description: "Mangue mixée et yaourt, épais et solaire.",
    temps: ["froid"],
    sizes: S(7.5, 8.5),
    photo: "carteSmoothieMangue",
    layers: ["#f6c453", "#f8e7b2", "#f7f1e1"],
  },
  {
    slug: "smoothie-peche-yaourt",
    name: "Smoothie pêche yaourt",
    cjk: "蜜桃酸奶昔",
    category: "smoothies",
    description: "Pêche et yaourt marbrés de rose pâle.",
    temps: ["froid"],
    sizes: S(7.5, 8.5),
    photo: "carteSmoothiePeche",
    layers: ["#f5c6b8", "#fbe9e2", "#f3b4a4"],
  },
  {
    slug: "smoothie-avocat-yaourt",
    name: "Smoothie avocat & yaourt",
    cjk: "牛油果酸奶奶昔",
    en: "Avocado yogurt smoothie",
    category: "smoothies",
    description: "Avocat et yaourt en spirales vertes, doux et rassasiant.",
    sizes: S(7.5, 8.5),
    photo: "carteSmoothieAvocat",
    layers: ["#9fbf5a", "#eef2dc", "#b7cf7c"],
  },

  // ── À grignoter
  {
    slug: "egg-tart",
    name: "Egg tart",
    category: "gourmandises",
    description: "Pâte feuilletée croustillante et crème dorée, légèrement caramélisée.",
    sizes: [],
    photo: "pEggTart",
    layers: ["#f1c35a", "#c7843a"],
    aValider: "Vue dans l'offre du matin. Prix à l'unité à confirmer.",
  },
];

export const supplements = {
  label: "Suppléments",
  items: ["Perles de tapioca", "Gelée de coco", "Perles éclatantes au litchi"],
  price: 0.5,
};

export const collections: {
  id: CollectionId;
  name: string;
  line: string;
  bg: string;
  ink: string;
  accent: string;
  products: string[];
}[] = [
  {
    id: "matcha",
    name: "Matcha",
    line: "Vert matcha et crème, en couches nettes.",
    bg: "#c6d394",
    ink: "#263211",
    accent: "#f4f0e4",
    products: ["sakura-matcha", "eau-coco-matcha", "matcha-latte"],
  },
  {
    id: "fruity",
    name: "Fruity",
    line: "Raisin, pêche, mangue : les couleurs vives des fruits frais.",
    bg: "#f3b4a7",
    ink: "#4f121c",
    accent: "#ffd21f",
    products: ["the-au-raisin-frais", "the-oolong-peche", "mango-coco-bleu"],
  },
  {
    id: "coco-cafe",
    name: "Coco & café",
    line: "Beige, chocolat et blanc coco : la douceur gourmande.",
    bg: "#e9dcc6",
    ink: "#3b2214",
    accent: "#8a5a3c",
    products: ["coco-latte", "cafe-latte-pistache", "latte-pistache"],
  },
  {
    id: "signature",
    name: "Signature",
    line: "Les créations qui racontent Zencca.",
    bg: "#e6b465",
    ink: "#2a1606",
    accent: "#ffd21f",
    products: ["sakura-matcha", "the-au-raisin-frais", "eau-coco-matcha", "taro-coco-creme"],
  },
];

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const categoryById = (id: CategoryId) => categories.find((c) => c.id === id)!;

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 }).format(n);
