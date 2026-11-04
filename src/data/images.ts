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
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
