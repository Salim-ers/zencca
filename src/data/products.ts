import type { PhotoKey } from "./images";
import type { Locale } from "@/i18n/routes";
import type { L } from "@/i18n/text";

/**
 * ─────────────────────────────────────────────────────────────
 *  LA CARTE ZENCCA
 *  Source : photos de la carte affichée en boutique (deux versions)
 *  + visuel « offre du matin ». Prix, codes et noms suivent la version
 *  aux codes Z1 à Z19. Les boissons présentes uniquement sur l'autre
 *  version, datée de juin 2026, n'ont pas de code.
 *  Les noms anglais sont ceux de la carte bilingue ; chaque texte est
 *  écrit en français (fr) et en anglais (en).
 *  `aValider` signale une information à confirmer.
 * ─────────────────────────────────────────────────────────────
 */

export type Temp = "chaud" | "froid";

export type CategoryId = "matcha" | "thes" | "fruits" | "lactees" | "coco-cafe" | "smoothies" | "gourmandises";

export type Category = {
  id: CategoryId;
  label: L;
  /** Titre de la section sur le menu */
  title: L;
  /** false : le menu n'écrit ce titre que dans une langue (pas de sous-titre dans l'autre) */
  bilingual?: false;
  cjk?: string;
  /** Phrase courte d'introduction */
  intro: L;
  color: string;
  tint: string;
  ink: string;
};

export type Product = {
  slug: string;
  /** Repère du menu, dans le triangle au coin de la case */
  code?: string;
  /** Nom tel qu'écrit sur la carte bilingue */
  name: L;
  /** false : la carte ne donne pas l'autre nom (pas de sous-titre) */
  bilingual?: false;
  cjk?: string;
  category: CategoryId;
  description: L;
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
    label: { fr: "Matcha", en: "Matcha" },
    title: { fr: "Sélection matcha", en: "Matcha selection" },
    cjk: "抹茶甄选",
    intro: {
      fr: "Le vert profond du matcha, posé en couche sur le lait, la coco ou le sakura.",
      en: "The deep green of matcha, layered over milk, coconut or sakura.",
    },
    color: "#a9bd6e",
    tint: "#e3e8c8",
    ink: "#33401a",
  },
  {
    id: "thes",
    label: { fr: "Thés frais", en: "Fresh teas" },
    title: { fr: "Sélection de thé frais", en: "Crisp tea selection" },
    cjk: "清萃鲜茶",
    intro: {
      fr: "Thés glacés, agrumes et fruits : la fraîcheur en version simple.",
      en: "Iced teas, citrus and fruit: freshness, kept simple.",
    },
    color: "#f0a65a",
    tint: "#fbe2c3",
    ink: "#5a2c0b",
  },
  {
    id: "fruits",
    label: { fr: "Créations fruitées", en: "Fruit creations" },
    title: { fr: "Créations fruitées", en: "Fresh fruit blends" },
    cjk: "鲜果绵密",
    intro: {
      fr: "Mangue, pomelo, raisin : des couches de fruits frais, généreuses et colorées.",
      en: "Mango, pomelo, grape: generous, colourful layers of fresh fruit.",
    },
    color: "#e5707d",
    tint: "#f8d9d9",
    ink: "#5b1520",
  },
  {
    id: "lactees",
    label: { fr: "Créations lactées", en: "Creamy creations" },
    title: { fr: "Créations lactées", en: "Creamy blends" },
    cjk: "乳感特调",
    intro: {
      fr: "Thés au lait, perles de tapioca et douceurs onctueuses, chaudes ou glacées.",
      en: "Milk teas, tapioca pearls and creamy treats, hot or iced.",
    },
    color: "#d4a77a",
    tint: "#f3e3cf",
    ink: "#4a2a14",
  },
  {
    id: "coco-cafe",
    label: { fr: "Coco & café", en: "Coconut & coffee" },
    title: { fr: "Créations café & coco", en: "Coconut coffee creations" },
    cjk: "椰咖特调",
    intro: {
      fr: "Le café rencontre le lait de coco, la pistache et le jasmin.",
      en: "Coffee meets coconut milk, pistachio and jasmine.",
    },
    color: "#8a5a3c",
    tint: "#efe4d4",
    ink: "#3b2214",
  },
  {
    id: "smoothies",
    label: { fr: "Smoothies au yaourt", en: "Yogurt smoothies" },
    title: { fr: "Sélection smoothie yaourt", en: "Yogurt delight smoothie" },
    cjk: "酸奶轻享",
    intro: {
      fr: "Fruits mixés et yaourt : épais, frais, tout en douceur.",
      en: "Blended fruit and yogurt: thick, fresh and gentle.",
    },
    color: "#f4c35e",
    tint: "#fbecc6",
    ink: "#5a3b05",
  },
  {
    id: "gourmandises",
    label: { fr: "À grignoter", en: "Snacks" },
    title: { fr: "À grignoter", en: "Something to nibble" },
    bilingual: false,
    intro: { fr: "Pour accompagner votre boisson.", en: "To go with your drink." },
    color: "#e2a447",
    tint: "#f8e5c3",
    ink: "#4f300a",
  },
];

const S = (a?: number, b?: number) =>
  b === undefined ? [{ ml: 500, price: a }] : [{ ml: 500, price: a }, { ml: 700, price: b }];

export const products: Product[] = [
  // ── Matcha
  {
    slug: "matcha-latte",
    code: "Z5",
    name: { fr: "Matcha latte", en: "Matcha latte" },
    cjk: "抹茶拿铁",
    category: "matcha",
    description: {
      fr: "Le classique : matcha vert intense posé sur un lait frais.",
      en: "The classic: intense green matcha layered over fresh milk.",
    },
    temps: ["chaud", "froid"],
    sizes: S(6.5, 7.5),
    isNew: true,
    photo: "carteMatchaLatte",
    layers: ["#7f9a3a", "#a9bd6e", "#f4f0e4"],
  },
  {
    slug: "eau-coco-matcha",
    code: "Z6",
    name: { fr: "Eau coco matcha", en: "Matcha coconut" },
    cjk: "抹茶香水椰",
    category: "matcha",
    description: {
      fr: "Matcha parfumé sur eau de coco glacée, tout en fraîcheur.",
      en: "Fragrant matcha over iced coconut water, crisp and refreshing.",
    },
    temps: ["froid"],
    sizes: S(6.9, 7.9),
    signature: true,
    photo: "carteEauCocoMatcha",
    layers: ["#8fab47", "#bcd08a", "#eef2dc"],
  },
  {
    slug: "sakura-matcha",
    code: "Z7",
    name: { fr: "Sakura matcha", en: "Matcha sakura" },
    cjk: "樱之春",
    category: "matcha",
    description: {
      fr: "Matcha au lait de coco et fleur de cerisier : un vert vif sur un rose tendre.",
      en: "Matcha with coconut milk and cherry blossom: bright green over soft pink.",
    },
    temps: ["froid"],
    sizes: S(7.5, 8.5),
    signature: true,
    photo: "carteSakuraMatcha",
    layers: ["#86a43f", "#ebbfc6", "#f2c9d0"],
  },

  // ── Thés frais
  {
    slug: "the-oolong-peche",
    code: "Z11",
    name: { fr: "Thé oolong pêche", en: "Peach oolong tea" },
    cjk: "蜜桃乌龙茶",
    category: "thes",
    description: {
      fr: "Oolong infusé et pêche, servi bien frais avec une tranche d'agrume.",
      en: "Brewed oolong and peach, served well chilled with a slice of citrus.",
    },
    temps: ["froid"],
    sizes: S(5.9, 6.9),
    photo: "carteOolongPeche",
    layers: ["#e98a2e", "#d4661c"],
  },
  {
    slug: "the-vert-citron-frappe",
    code: "Z12",
    name: { fr: "Thé vert citron frappé", en: "Handmade lemon green tea" },
    cjk: "手打柠檬茶",
    category: "thes",
    description: {
      fr: "Thé vert et citron frappés à la main, acidulé et désaltérant.",
      en: "Green tea and lemon shaken by hand, tangy and thirst-quenching.",
    },
    temps: ["froid"],
    sizes: S(5.5, 6.5),
    photo: "carteCitronFrappe",
    layers: ["#f7d65a", "#efb93a"],
  },

  // ── Créations fruitées
  {
    slug: "mango-pomelo-sago",
    code: "Z8",
    name: { fr: "Mango pomelo sago", en: "Mango pomelo sago" },
    cjk: "杨枝甘露",
    category: "fruits",
    description: {
      fr: "Mangue, pomelo et perles de sagou : un grand classique, onctueux et fruité.",
      en: "Mango, pomelo and sago pearls: a great classic, creamy and fruity.",
    },
    temps: ["froid"],
    sizes: S(7.8, 8.8),
    photo: "carteMangoPomelo",
    layers: ["#fbf0da", "#f4a63c", "#f7c25c"],
  },
  {
    slug: "mango-coco-bleu",
    code: "Z9",
    name: { fr: "Mango coco bleu", en: "Mango blue coco" },
    cjk: "茫茫椰海",
    category: "fruits",
    description: {
      fr: "Une couche bleu pastel, de la coco et de la mangue : la plus photogénique.",
      en: "A pastel blue layer, coconut and mango: the most photogenic of them all.",
    },
    temps: ["froid"],
    sizes: S(7.3, 8.3),
    photo: "carteMangoCocoBleu",
    layers: ["#8fb8dc", "#f5f1e8", "#f3be4a"],
    aValider: "Nom chinois écrit 茫茫椰海 sur le menu Z1-Z19 et 芒芒椰海 sur celui de juin 2026.",
  },
  {
    slug: "the-au-raisin-frais",
    code: "Z10",
    name: { fr: "Thé au raisin frais", en: "Fresh grape tea" },
    cjk: "多肉葡萄",
    category: "fruits",
    description: {
      fr: "Granité de raisin rouge marbré au-dessus d'une pulpe de raisin frais.",
      en: "Marbled red grape slush over fresh grape pulp.",
    },
    temps: ["froid"],
    sizes: S(7.5, 8.5),
    signature: true,
    photo: "carteRaisinFrais",
    layers: ["#f6efe4", "#b8344a", "#e4b94a"],
  },

  // ── Créations lactées
  {
    slug: "the-au-lait-bleu-jasmin",
    code: "Z1",
    name: { fr: "Thé au lait bleu jasmin", en: "Jasmine bleu milk tea" },
    cjk: "茉莉奶蓝",
    category: "lactees",
    description: {
      fr: "Thé au lait parfumé au jasmin, d'un bleu tout en douceur.",
      en: "Jasmine-scented milk tea in a gentle shade of blue.",
    },
    temps: ["chaud", "froid"],
    sizes: S(6, 7),
    isNew: true,
    photo: "carteBleuJasmin",
    layers: ["#a9d0e6", "#bcdcee"],
  },
  {
    slug: "latte-pistache",
    code: "Z2",
    name: { fr: "Latte pistache", en: "Pistachio latte" },
    cjk: "开心果拿铁",
    category: "lactees",
    description: {
      fr: "Crème de pistache posée sur un lait frais, chaud ou glacé.",
      en: "Pistachio cream over fresh milk, hot or iced.",
    },
    temps: ["chaud", "froid"],
    sizes: S(7, 8),
    isNew: true,
    photo: "carteLattePistache",
    layers: ["#cdb18a", "#f4f0e2"],
  },
  {
    slug: "the-au-lait-signature",
    code: "Z3",
    name: { fr: "Thé au lait signature", en: "Signature milk tea" },
    cjk: "招牌奶茶",
    category: "lactees",
    description: {
      fr: "Le thé au lait de la maison, rond et réconfortant.",
      en: "The house milk tea, smooth and comforting.",
    },
    temps: ["chaud", "froid"],
    sizes: S(6.5, 7.5),
    signature: true,
    photo: "carteLaitPerles",
    layers: ["#d9b58c", "#c89a6a"],
  },
  {
    slug: "lait-perles-sucre-brun",
    code: "Z4",
    name: { fr: "Lait frais aux perles de tapioca, sucre brun", en: "Fresh milk brown sugar" },
    cjk: "黑糖珍珠鲜牛乳",
    category: "lactees",
    description: {
      fr: "Lait frais, perles de tapioca et sirop de sucre brun.",
      en: "Fresh milk, tapioca pearls and brown sugar syrup.",
    },
    temps: ["chaud", "froid"],
    sizes: S(6.5, 7.5),
    photo: "carteLaitPerles",
    layers: ["#8a5226", "#efe2cf", "#3a2216"],
  },
  {
    slug: "lait-the-yingjiu",
    name: { fr: "Lait frais au thé Yingjiu", en: "Fresh milk Yingjiu tea" },
    cjk: "英九鲜牛乳",
    category: "lactees",
    description: {
      fr: "Lait frais et thé Yingjiu, chaud ou glacé.",
      en: "Fresh milk and Yingjiu tea, hot or iced.",
    },
    temps: ["chaud", "froid"],
    sizes: S(6.5, 7.5),
    photo: "carteLaitPerles",
    layers: ["#d9b58c", "#efe2cf"],
    aValider: "Uniquement sur le menu de juin 2026, absent du menu Z1-Z19 : à confirmer.",
  },
  {
    slug: "chocolat-chaud",
    name: { fr: "Chocolat chaud", en: "Hot chocolate" },
    bilingual: false,
    category: "lactees",
    description: {
      fr: "Un chocolat chaud généreux, servi dans un gobelet illustré.",
      en: "A generous hot chocolate, served in an illustrated cup.",
    },
    temps: ["chaud"],
    sizes: [{ ml: 500 }],
    photo: "carteChocolatChaud",
    layers: ["#6b3a22", "#4d2716"],
    aValider: "Visible sur le visuel de l'offre du matin. Prix et formats à confirmer.",
  },

  // ── Coco & café
  {
    slug: "pistache-jasmin-coco",
    code: "Z15",
    name: { fr: "Pistache jasmin coco", en: "Pistachio jasmine coconut" },
    cjk: "开心果茉莉椰",
    category: "coco-cafe",
    description: {
      fr: "Thé au jasmin, coco et pistache : floral et gourmand.",
      en: "Jasmine tea, coconut and pistachio: floral and indulgent.",
    },
    temps: ["froid"],
    sizes: S(6.9, 7.9),
    isNew: true,
    photo: "cartePistacheJasmin",
    layers: ["#f1e6c6", "#e9b64c", "#e2a43a"],
  },
  {
    slug: "cafe-latte-pistache",
    code: "Z16",
    name: { fr: "Café latte pistache", en: "Coffee pistachio latte" },
    cjk: "开心果咖啡拿铁",
    category: "coco-cafe",
    description: {
      fr: "Expresso, lait et crème de pistache, chaud ou glacé.",
      en: "Espresso, milk and pistachio cream, hot or iced.",
    },
    temps: ["chaud", "froid"],
    sizes: S(7.5, 8.5),
    isNew: true,
    signature: true,
    photo: "carteCafePistache",
    layers: ["#b48a5e", "#e6dcae", "#f4efe2"],
  },
  {
    slug: "coco-americano",
    code: "Z17",
    name: { fr: "Coco américano", en: "Coco americano" },
    cjk: "椰香美式",
    category: "coco-cafe",
    description: {
      fr: "Un americano allongé à l'eau de coco, sur glace.",
      en: "An americano lengthened with coconut water, over ice.",
    },
    temps: ["froid"],
    sizes: S(6),
    isNew: true,
    photo: "carteCocoAmericano",
    layers: ["#7a3f1c", "#a8632e"],
  },
  {
    slug: "coco-latte",
    code: "Z18",
    name: { fr: "Coco latte", en: "Coconut latte" },
    cjk: "厚椰乳拿铁",
    category: "coco-cafe",
    description: {
      fr: "Expresso versé sur un lait de coco épais : deux couches, un contraste.",
      en: "Espresso poured over thick coconut milk: two layers, one contrast.",
    },
    temps: ["froid"],
    sizes: S(6.5, 7.5),
    photo: "carteCocoLatte",
    layers: ["#6b3a1e", "#c68e5c", "#f6f1e6"],
  },
  {
    slug: "taro-coco-creme",
    code: "Z19",
    name: { fr: "Taro coco", en: "Taro coconut cream foam" },
    cjk: "芋泥厚椰乳",
    category: "coco-cafe",
    description: {
      fr: "Purée de taro violette et lait de coco épais, coiffés d'une mousse.",
      en: "Purple taro purée and thick coconut milk, topped with foam.",
    },
    temps: ["froid"],
    sizes: S(6.5, 7.5),
    signature: true,
    photo: "carteTaroCoco",
    layers: ["#c9b3de", "#f2ecf3", "#e7dcef"],
  },

  // ── Smoothies
  {
    slug: "smoothie-mangue-yaourt",
    code: "Z13",
    name: { fr: "Smoothie mangue yaourt", en: "Mango yogurt smoothie" },
    cjk: "芒果酸奶昔",
    category: "smoothies",
    description: {
      fr: "Mangue mixée et yaourt, épais et solaire.",
      en: "Blended mango and yogurt, thick and sunny.",
    },
    temps: ["froid"],
    sizes: S(7.5, 8.5),
    photo: "carteSmoothieMangue",
    layers: ["#f6c453", "#f8e7b2", "#f7f1e1"],
  },
  {
    slug: "smoothie-peche-yaourt",
    code: "Z14",
    name: { fr: "Smoothie pêche yaourt", en: "Peach yogurt smoothie" },
    cjk: "蜜桃酸奶昔",
    category: "smoothies",
    description: {
      fr: "Pêche et yaourt marbrés de rose pâle.",
      en: "Peach and yogurt, marbled with pale pink.",
    },
    temps: ["froid"],
    sizes: S(7.5, 8.5),
    photo: "carteSmoothiePeche",
    layers: ["#f5c6b8", "#fbe9e2", "#f3b4a4"],
  },
  {
    slug: "smoothie-avocat-yaourt",
    name: { fr: "Smoothie avocat & yaourt", en: "Avocado yogurt smoothie" },
    cjk: "牛油果酸奶奶昔",
    category: "smoothies",
    description: {
      fr: "Avocat et yaourt en spirales vertes, doux et rassasiant.",
      en: "Avocado and yogurt in green swirls, mellow and satisfying.",
    },
    sizes: S(7.5, 8.5),
    photo: "carteSmoothieAvocat",
    layers: ["#9fbf5a", "#eef2dc", "#b7cf7c"],
    aValider: "Uniquement sur le menu de juin 2026, absent du menu Z1-Z19 : à confirmer.",
  },

  // ── À grignoter
  {
    slug: "egg-tart",
    name: { fr: "Egg tart", en: "Egg tart" },
    bilingual: false,
    category: "gourmandises",
    description: {
      fr: "Pâte feuilletée croustillante et crème dorée, légèrement caramélisée.",
      en: "Crisp puff pastry and a golden custard, lightly caramelised.",
    },
    sizes: [],
    photo: "pEggTart",
    layers: ["#f1c35a", "#c7843a"],
    aValider: "Vue dans l'offre du matin. Prix à l'unité à confirmer.",
  },
];

export const supplements = {
  label: { fr: "Suppléments", en: "Add-on options" } satisfies L,
  items: [
    { fr: "Perles de tapioca", en: "Tapioca pearls" },
    { fr: "Gelée de coco", en: "Coconut jelly" },
    { fr: "Perles éclatantes au litchi", en: "Lychee popping boba" },
  ] satisfies L[],
  cjk: { label: "加购选项", items: ["珍珠", "椰果", "荔枝爆爆珠"] },
  price: 0.5,
};

export const productBySlug = (slug: string) => products.find((p) => p.slug === slug);
export const categoryById = (id: CategoryId) => categories.find((c) => c.id === id)!;

const other = (l: Locale): Locale => (l === "fr" ? "en" : "fr");
const same = (a: string, b: string) => a.localeCompare(b, undefined, { sensitivity: "base" }) === 0;

/** Le nom de l'autre langue, en sous-titre comme sur la carte bilingue (rien s'il est identique). */
export function altName(p: Product, locale: Locale): string | null {
  if (p.bilingual === false || same(p.name.fr, p.name.en)) return null;
  return p.name[other(locale)];
}
export function altTitle(c: Category, locale: Locale): string | null {
  if (c.bilingual === false || same(c.title.fr, c.title.en)) return null;
  return c.title[other(locale)];
}
export const otherLocale = other;

const priceFormats = {
  fr: new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 }),
  en: new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", minimumFractionDigits: 2 }),
};
export const formatPrice = (n: number, locale: Locale) => priceFormats[locale].format(n);
