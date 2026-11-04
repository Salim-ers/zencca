import type { StaticImageData } from "next/image";

import heroSakuraRue from "@/assets/photos/hero-sakura-rue.jpg";
import eauCocoMatcha from "@/assets/photos/eau-coco-matcha.jpg";
import raisinSalon from "@/assets/photos/raisin-salon.jpg";
import raisinDetail from "@/assets/photos/raisin-detail.jpg";
import oolongPecheRue from "@/assets/photos/oolong-peche-rue.jpg";
import lacteMousse from "@/assets/photos/lacte-mousse.jpg";
import gobeletIllustre from "@/assets/photos/gobelet-illustre.jpg";
import cocoLatteService from "@/assets/photos/coco-latte-service.jpg";
import toteBag from "@/assets/photos/tote-bag.jpg";
import thesFruitsDuo from "@/assets/photos/thes-fruits-duo.jpg";
import comptoirNeon from "@/assets/photos/comptoir-neon.jpg";
import salonFresque from "@/assets/photos/salon-fresque.jpg";
import facadeSoir from "@/assets/photos/facade-soir.jpg";
import facadeTerrasse from "@/assets/photos/facade-terrasse.jpg";
import facadeJour from "@/assets/photos/facade-jour.jpg";
import enseigne from "@/assets/photos/enseigne.jpg";
import offreMatin from "@/assets/photos/offre-matin.jpg";
import pCocoLatte from "@/assets/photos/p-coco-latte.jpg";
import pChocolatChaud from "@/assets/photos/p-chocolat-chaud.jpg";
import pMatchaLatte from "@/assets/photos/p-matcha-latte.jpg";
import pEauCocoMatcha from "@/assets/photos/p-eau-coco-matcha.jpg";
import pLattePistache from "@/assets/photos/p-latte-pistache.jpg";
import pEggTart from "@/assets/photos/p-egg-tart.jpg";

// Visuels de la carte : un gobelet par boisson, même cadrage et même fond que le menu en boutique
import carteMatchaLatte from "@/assets/photos/carte/matcha-latte.jpg";
import carteEauCocoMatcha from "@/assets/photos/carte/eau-coco-matcha.jpg";
import carteSakuraMatcha from "@/assets/photos/carte/sakura-matcha.jpg";
import carteOolongPeche from "@/assets/photos/carte/the-oolong-peche.jpg";
import carteCitronFrappe from "@/assets/photos/carte/the-vert-citron-frappe.jpg";
import carteRaisinFrais from "@/assets/photos/carte/the-au-raisin-frais.jpg";
import carteMangoPomelo from "@/assets/photos/carte/mango-pomelo-sago.jpg";
import carteMangoCocoBleu from "@/assets/photos/carte/mango-coco-bleu.jpg";
import carteBleuJasmin from "@/assets/photos/carte/the-au-lait-bleu-jasmin.jpg";
import carteLattePistache from "@/assets/photos/carte/latte-pistache.jpg";
import carteLaitPerles from "@/assets/photos/carte/lait-perles-sucre-brun.jpg";
import carteChocolatChaud from "@/assets/photos/carte/chocolat-chaud.jpg";
import carteTaroCoco from "@/assets/photos/carte/taro-coco-creme.jpg";
import cartePistacheJasmin from "@/assets/photos/carte/pistache-jasmin-coco.jpg";
import carteCafePistache from "@/assets/photos/carte/cafe-latte-pistache.jpg";
import carteCocoAmericano from "@/assets/photos/carte/coco-americano.jpg";
import carteCocoLatte from "@/assets/photos/carte/coco-latte.jpg";
import carteSmoothieMangue from "@/assets/photos/carte/smoothie-mangue-yaourt.jpg";
import carteSmoothiePeche from "@/assets/photos/carte/smoothie-peche-yaourt.jpg";
import carteSmoothieAvocat from "@/assets/photos/carte/smoothie-avocat-yaourt.jpg";

export type Photo = {
  src: StaticImageData;
  alt: string;
  /** Point focal CSS (object-position) */
  focus?: string;
  /** Point focal sur mobile si différent */
  focusMobile?: string;
};

export const photos = {
  heroSakuraRue: {
    src: heroSakuraRue,
    alt: "Un sakura matcha Zencca, couche de matcha sur lait rose, tenu dans une rue parisienne ensoleillée",
    focus: "50% 45%",
  },
  eauCocoMatcha: {
    src: eauCocoMatcha,
    alt: "Eau coco matcha Zencca : matcha vert sur eau de coco glacée, gobelet tenu sur fond ocre",
    focus: "40% 45%",
  },
  raisinSalon: {
    src: raisinSalon,
    alt: "Thé au raisin frais Zencca, granité rouge et pulpe dorée, devant la fresque bleue du salon",
    focus: "48% 50%",
  },
  raisinDetail: {
    src: raisinDetail,
    alt: "Gros plan sur les couches d'un thé au raisin frais Zencca : granité rouge marbré et pulpe de fruit",
    focus: "50% 45%",
  },
  oolongPecheRue: {
    src: oolongPecheRue,
    alt: "Thé glacé ambré Zencca avec une tranche d'agrume, tenu dans une rue pavée de Paris",
    focus: "52% 50%",
  },
  lacteMousse: {
    src: lacteMousse,
    alt: "Boisson lactée Zencca marbrée de caramel, couronnée de mousse et de gelée ambrée",
    focus: "50% 40%",
  },
  gobeletIllustre: {
    src: gobeletIllustre,
    alt: "Gobelet chaud Zencca illustré d'une femme et d'un perroquet rouge, posé au soleil sur une table en bois",
    focus: "50% 50%",
  },
  cocoLatteService: {
    src: cocoLatteService,
    alt: "Un barista Zencca verse un expresso sur du lait de coco glacé",
    focus: "50% 40%",
  },
  toteBag: {
    src: toteBag,
    alt: "Sac Zencca illustré d'un personnage au chapeau-montagne, tenu devant la porte en bois du salon",
    focus: "50% 50%",
  },
  thesFruitsDuo: {
    src: thesFruitsDuo,
    alt: "Deux thés aux fruits Zencca : l'un jaune au citron vert, l'autre rouge à la fraise",
    focus: "50% 50%",
  },
  comptoirNeon: {
    src: comptoirNeon,
    alt: "Le comptoir Zencca sous le néon « Une rencontre infusée dans le thé », murs ocre et sol en terrazzo",
    focus: "40% 40%",
  },
  salonFresque: {
    src: salonFresque,
    alt: "L'intérieur du salon Zencca : comptoir, plafond lumineux, banc en bois et grande fresque fleurie en arche",
    focus: "60% 50%",
  },
  facadeSoir: {
    src: facadeSoir,
    alt: "La façade Zencca au 20 rue Tiquetonne à la tombée du jour, enseigne « Salon de Thé 甄茶 » éclairée",
    focus: "50% 50%",
  },
  facadeTerrasse: {
    src: facadeTerrasse,
    alt: "La façade ocre de Zencca en journée avec ses chaises de terrasse et l'enseigne jaune",
    focus: "50% 55%",
  },
  facadeJour: {
    src: facadeJour,
    alt: "L'entrée du salon de thé Zencca, rue Tiquetonne, portes en bois ouvertes sur le comptoir",
    focus: "50% 50%",
  },
  enseigne: {
    src: enseigne,
    alt: "L'enseigne jaune Zencca avec sa mascotte, accrochée à la façade au-dessus du store « 甄茶 »",
    focus: "60% 45%",
  },
  offreMatin: {
    src: offreMatin,
    alt: "Visuel de l'offre du matin Zencca : boissons, chocolat chaud et egg tart",
    focus: "50% 50%",
  },
  pCocoLatte: { src: pCocoLatte, alt: "Coco latte Zencca, café marbré sur lait de coco", focus: "50% 50%" },
  pChocolatChaud: { src: pChocolatChaud, alt: "Chocolat chaud Zencca dans un gobelet illustré d'une grue", focus: "50% 50%" },
  pMatchaLatte: { src: pMatchaLatte, alt: "Matcha latte Zencca, matcha vert sur lait", focus: "50% 50%" },
  pEauCocoMatcha: { src: pEauCocoMatcha, alt: "Eau coco matcha Zencca", focus: "50% 50%" },
  pLattePistache: { src: pLattePistache, alt: "Latte pistache Zencca parsemé d'éclats de pistache", focus: "50% 50%" },
  pEggTart: { src: pEggTart, alt: "Egg tart dorée servie chez Zencca", focus: "50% 50%" },
  carteMatchaLatte: { src: carteMatchaLatte, alt: "Matcha latte Zencca : matcha vert intense qui se fond dans le lait, gobelet transparent", focus: "50% 50%" },
  carteEauCocoMatcha: { src: carteEauCocoMatcha, alt: "Eau coco matcha Zencca : matcha vert sur eau de coco glacée, gobelet transparent", focus: "50% 50%" },
  carteSakuraMatcha: { src: carteSakuraMatcha, alt: "Sakura matcha Zencca : couche de matcha vert sur lait de coco rose, gobelet transparent", focus: "50% 50%" },
  carteOolongPeche: { src: carteOolongPeche, alt: "Thé oolong pêche Zencca : thé orangé glacé, tranches d'orange contre la paroi", focus: "50% 50%" },
  carteCitronFrappe: { src: carteCitronFrappe, alt: "Thé vert citron frappé Zencca : thé doré, glaçons et quartier de citron", focus: "50% 50%" },
  carteRaisinFrais: { src: carteRaisinFrais, alt: "Thé au raisin frais Zencca : crème blanche, granité de raisin rouge et pulpe jaune", focus: "50% 50%" },
  carteMangoPomelo: { src: carteMangoPomelo, alt: "Mango pomelo sago Zencca : crème de coco, pomelo rose, perles de sagou et mangue", focus: "50% 50%" },
  carteMangoCocoBleu: { src: carteMangoCocoBleu, alt: "Mango coco bleu Zencca : couche bleu ciel, coco blanche et mangue jaune", focus: "50% 50%" },
  carteBleuJasmin: { src: carteBleuJasmin, alt: "Thé au lait bleu jasmin Zencca : thé au lait bleu pâle et glaçons, gobelet transparent", focus: "50% 50%" },
  carteLattePistache: { src: carteLattePistache, alt: "Latte pistache Zencca : crème de pistache beige fondant dans un lait blanc", focus: "50% 50%" },
  carteLaitPerles: { src: carteLaitPerles, alt: "Les deux gobelets chauds illustrés Zencca : femme au perroquet rouge et grue dans les bambous", focus: "50% 50%" },
  carteChocolatChaud: { src: carteChocolatChaud, alt: "Chocolat chaud Zencca dans le gobelet illustré d'une grue et de bambous", focus: "50% 50%" },
  carteTaroCoco: { src: carteTaroCoco, alt: "Taro coco Zencca : crème de taro violette marbrant un lait de coco blanc", focus: "50% 50%" },
  cartePistacheJasmin: { src: cartePistacheJasmin, alt: "Pistache jasmin coco Zencca : mousse beige mouchetée sur thé au jasmin doré", focus: "50% 50%" },
  carteCafePistache: { src: carteCafePistache, alt: "Café latte pistache Zencca : crème de pistache, café caramel et lait", focus: "50% 50%" },
  carteCocoAmericano: { src: carteCocoAmericano, alt: "Coco americano Zencca : café ambré sur glaçons et eau de coco claire", focus: "50% 50%" },
  carteCocoLatte: { src: carteCocoLatte, alt: "Coco latte Zencca : expresso sombre posé sur un lait de coco épais", focus: "50% 50%" },
  carteSmoothieMangue: { src: carteSmoothieMangue, alt: "Smoothie mangue yaourt Zencca : mangue dorée en spirale avec du yaourt blanc", focus: "50% 50%" },
  carteSmoothiePeche: { src: carteSmoothiePeche, alt: "Smoothie pêche yaourt Zencca : yaourt blanc marbré de pêche rose saumon", focus: "50% 50%" },
  carteSmoothieAvocat: { src: carteSmoothieAvocat, alt: "Smoothie avocat et yaourt Zencca : rubans d'avocat vert et de yaourt blanc", focus: "50% 50%" },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
