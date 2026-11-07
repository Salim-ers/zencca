import type { PhotoKey } from "./images";
import type { L } from "@/i18n/text";

export type GalleryCategory = "boissons" | "salon" | "ambiance";

export const galleryCategories: { id: GalleryCategory; label: L }[] = [
  { id: "boissons", label: { fr: "Nos boissons", en: "Our drinks" } },
  { id: "salon", label: { fr: "Notre salon", en: "The tea house" } },
  { id: "ambiance", label: { fr: "Notre ambiance", en: "The atmosphere" } },
];

/**
 * Ordre = ordre d'affichage. `span` règle la composition éditoriale :
 * "tall" (portrait haut), "wide" (double colonne), "std".
 */
export const gallery: { photo: PhotoKey; category: GalleryCategory; caption: L; span: "tall" | "wide" | "std" }[] = [
  { photo: "facadeSoir", category: "salon", caption: { fr: "La façade au 20 rue Tiquetonne, le soir", en: "The shopfront at 20 rue Tiquetonne, in the evening" }, span: "tall" },
  { photo: "heroSakuraRue", category: "boissons", caption: { fr: "Sakura matcha", en: "Sakura matcha" }, span: "std" },
  { photo: "raisinSalon", category: "boissons", caption: { fr: "Thé au raisin frais devant la fresque", en: "Fresh grape tea in front of the mural" }, span: "wide" },
  { photo: "comptoirNeon", category: "salon", caption: { fr: "Le comptoir et son néon", en: "The counter and its neon sign" }, span: "std" },
  { photo: "eauCocoMatcha", category: "boissons", caption: { fr: "Eau coco matcha", en: "Matcha coconut water" }, span: "tall" },
  { photo: "gobeletIllustre", category: "ambiance", caption: { fr: "Les gobelets illustrés", en: "The illustrated cups" }, span: "std" },
  { photo: "salonFresque", category: "salon", caption: { fr: "La fresque et le banc en bois", en: "The mural and the wooden bench" }, span: "wide" },
  { photo: "cocoLatteService", category: "boissons", caption: { fr: "Le service d'un coco latte", en: "Serving a coconut latte" }, span: "std" },
  { photo: "enseigne", category: "ambiance", caption: { fr: "L'enseigne jaune", en: "The yellow sign" }, span: "tall" },
  { photo: "thesFruitsDuo", category: "boissons", caption: { fr: "Thés aux fruits", en: "Fruit teas" }, span: "std" },
  { photo: "facadeTerrasse", category: "salon", caption: { fr: "La terrasse rue Tiquetonne", en: "The terrace on rue Tiquetonne" }, span: "std" },
  { photo: "toteBag", category: "ambiance", caption: { fr: "Le sac illustré Zencca", en: "The illustrated Zencca bag" }, span: "tall" },
  { photo: "oolongPecheRue", category: "boissons", caption: { fr: "Thé glacé à emporter dans le quartier", en: "Iced tea to take around the neighbourhood" }, span: "std" },
  { photo: "lacteMousse", category: "boissons", caption: { fr: "Boisson lactée et mousse", en: "Milk drink and foam" }, span: "wide" },
  { photo: "facadeJour", category: "salon", caption: { fr: "Les portes en bois, grandes ouvertes", en: "The wooden doors, wide open" }, span: "std" },
  { photo: "raisinDetail", category: "boissons", caption: { fr: "Les couches du thé au raisin frais", en: "The layers of the fresh grape tea" }, span: "tall" },
];
