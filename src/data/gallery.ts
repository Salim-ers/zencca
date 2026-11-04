import type { PhotoKey } from "./images";

export type GalleryCategory = "boissons" | "salon" | "ambiance";

export const galleryCategories: { id: GalleryCategory; label: string }[] = [
  { id: "boissons", label: "Nos boissons" },
  { id: "salon", label: "Notre salon" },
  { id: "ambiance", label: "Notre ambiance" },
];

/**
 * Ordre = ordre d'affichage. `span` règle la composition éditoriale :
 * "tall" (portrait haut), "wide" (double colonne), "std".
 */
export const gallery: { photo: PhotoKey; category: GalleryCategory; caption: string; span: "tall" | "wide" | "std" }[] = [
  { photo: "facadeSoir", category: "salon", caption: "La façade au 20 rue Tiquetonne, le soir", span: "tall" },
  { photo: "heroSakuraRue", category: "boissons", caption: "Sakura matcha", span: "std" },
  { photo: "raisinSalon", category: "boissons", caption: "Thé au raisin frais devant la fresque", span: "wide" },
  { photo: "comptoirNeon", category: "salon", caption: "Le comptoir et son néon", span: "std" },
  { photo: "eauCocoMatcha", category: "boissons", caption: "Eau coco matcha", span: "tall" },
  { photo: "gobeletIllustre", category: "ambiance", caption: "Les gobelets illustrés", span: "std" },
  { photo: "salonFresque", category: "salon", caption: "La fresque et le banc en bois", span: "wide" },
  { photo: "cocoLatteService", category: "boissons", caption: "Le service d'un coco latte", span: "std" },
  { photo: "enseigne", category: "ambiance", caption: "L'enseigne jaune", span: "tall" },
  { photo: "thesFruitsDuo", category: "boissons", caption: "Thés aux fruits", span: "std" },
  { photo: "facadeTerrasse", category: "salon", caption: "La terrasse rue Tiquetonne", span: "std" },
  { photo: "toteBag", category: "ambiance", caption: "Le sac illustré Zencca", span: "tall" },
  { photo: "oolongPecheRue", category: "boissons", caption: "Thé glacé à emporter dans le quartier", span: "std" },
  { photo: "lacteMousse", category: "boissons", caption: "Boisson lactée et mousse", span: "wide" },
  { photo: "facadeJour", category: "salon", caption: "Les portes en bois, grandes ouvertes", span: "std" },
  { photo: "raisinDetail", category: "boissons", caption: "Les couches du thé au raisin frais", span: "tall" },
];
