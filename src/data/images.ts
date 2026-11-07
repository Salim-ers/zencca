import type { StaticImageData } from "next/image";
import type { L } from "@/i18n/text";

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
  /** Texte alternatif, en français et en anglais */
  alt: L;
  /** Point focal CSS (object-position) */
  focus?: string;
  /** Point focal sur mobile si différent */
  focusMobile?: string;
};

export const photos = {
  heroSakuraRue: {
    src: heroSakuraRue,
    alt: { fr: "Un sakura matcha Zencca, couche de matcha sur lait rose, tenu dans une rue parisienne ensoleillée", en: "A Zencca sakura matcha, a layer of matcha over pink milk, held up in a sunny Paris street" },
    focus: "50% 45%",
  },
  eauCocoMatcha: {
    src: eauCocoMatcha,
    alt: { fr: "Eau coco matcha Zencca : matcha vert sur eau de coco glacée, gobelet tenu sur fond ocre", en: "Zencca matcha coconut water: green matcha over iced coconut water, cup held against an ochre wall" },
    focus: "40% 45%",
  },
  raisinSalon: {
    src: raisinSalon,
    alt: { fr: "Thé au raisin frais Zencca, granité rouge et pulpe dorée, devant la fresque bleue du salon", en: "Zencca fresh grape tea, red slush and golden pulp, in front of the tea house's blue mural" },
    focus: "48% 50%",
  },
  raisinDetail: {
    src: raisinDetail,
    alt: { fr: "Gros plan sur les couches d'un thé au raisin frais Zencca : granité rouge marbré et pulpe de fruit", en: "Close-up of the layers of a Zencca fresh grape tea: marbled red slush and fruit pulp" },
    focus: "50% 45%",
  },
  oolongPecheRue: {
    src: oolongPecheRue,
    alt: { fr: "Thé glacé ambré Zencca avec une tranche d'agrume, tenu dans une rue pavée de Paris", en: "An amber Zencca iced tea with a slice of citrus, held up in a cobbled Paris street" },
    focus: "52% 50%",
  },
  lacteMousse: {
    src: lacteMousse,
    alt: { fr: "Boisson lactée Zencca marbrée de caramel, couronnée de mousse et de gelée ambrée", en: "A Zencca milk drink marbled with caramel, crowned with foam and amber jelly" },
    focus: "50% 40%",
  },
  gobeletIllustre: {
    src: gobeletIllustre,
    alt: { fr: "Gobelet chaud Zencca illustré d'une femme et d'un perroquet rouge, posé au soleil sur une table en bois", en: "A hot Zencca cup illustrated with a woman and a red parrot, in the sun on a wooden table" },
    focus: "50% 50%",
  },
  cocoLatteService: {
    src: cocoLatteService,
    alt: { fr: "Un barista Zencca verse un expresso sur du lait de coco glacé", en: "A Zencca barista pours an espresso over iced coconut milk" },
    focus: "50% 40%",
  },
  toteBag: {
    src: toteBag,
    alt: { fr: "Sac Zencca illustré d'un personnage au chapeau-montagne, tenu devant la porte en bois du salon", en: "A Zencca bag illustrated with a mountain-hat character, held in front of the tea house's wooden door" },
    focus: "50% 50%",
  },
  thesFruitsDuo: {
    src: thesFruitsDuo,
    alt: { fr: "Deux thés aux fruits Zencca : l'un jaune au citron vert, l'autre rouge à la fraise", en: "Two Zencca fruit teas: one yellow with lime, the other red with strawberry" },
    focus: "50% 50%",
  },
  comptoirNeon: {
    src: comptoirNeon,
    alt: { fr: "Le comptoir Zencca sous le néon « Une rencontre infusée dans le thé », murs ocre et sol en terrazzo", en: "The Zencca counter under the neon sign “Une rencontre infusée dans le thé”, ochre walls and terrazzo floor" },
    focus: "40% 40%",
  },
  salonFresque: {
    src: salonFresque,
    alt: { fr: "L'intérieur du salon Zencca : comptoir, plafond lumineux, banc en bois et grande fresque fleurie en arche", en: "Inside the Zencca tea house: counter, glowing ceiling, wooden bench and a large arched floral mural" },
    focus: "60% 50%",
  },
  facadeSoir: {
    src: facadeSoir,
    alt: { fr: "La façade Zencca au 20 rue Tiquetonne à la tombée du jour, enseigne « Salon de Thé 甄茶 » éclairée", en: "The Zencca shopfront at 20 rue Tiquetonne at dusk, its “Salon de Thé 甄茶” sign lit up" },
    focus: "50% 50%",
  },
  facadeTerrasse: {
    src: facadeTerrasse,
    alt: { fr: "La façade ocre de Zencca en journée avec ses chaises de terrasse et l'enseigne jaune", en: "Zencca's ochre shopfront by day, with its terrace chairs and yellow sign" },
    focus: "50% 55%",
  },
  facadeJour: {
    src: facadeJour,
    alt: { fr: "L'entrée du salon de thé Zencca, rue Tiquetonne, portes en bois ouvertes sur le comptoir", en: "The entrance of the Zencca tea house on rue Tiquetonne, wooden doors open onto the counter" },
    focus: "50% 50%",
  },
  enseigne: {
    src: enseigne,
    alt: { fr: "L'enseigne jaune Zencca avec sa mascotte, accrochée à la façade au-dessus du store « 甄茶 »", en: "The yellow Zencca sign and its mascot, hanging on the shopfront above the “甄茶” awning" },
    focus: "60% 45%",
  },
  offreMatin: {
    src: offreMatin,
    alt: { fr: "Visuel de l'offre du matin Zencca : boissons, chocolat chaud et egg tart", en: "Zencca morning deal: drinks, hot chocolate and an egg tart" },
    focus: "50% 50%",
  },
  pCocoLatte: { src: pCocoLatte, alt: { fr: "Coco latte Zencca, café marbré sur lait de coco", en: "Zencca coconut latte, coffee marbled over coconut milk" }, focus: "50% 50%" },
  pChocolatChaud: { src: pChocolatChaud, alt: { fr: "Chocolat chaud Zencca dans un gobelet illustré d'une grue", en: "Zencca hot chocolate in a cup illustrated with a crane" }, focus: "50% 50%" },
  pMatchaLatte: { src: pMatchaLatte, alt: { fr: "Matcha latte Zencca, matcha vert sur lait", en: "Zencca matcha latte, green matcha over milk" }, focus: "50% 50%" },
  pEauCocoMatcha: { src: pEauCocoMatcha, alt: { fr: "Eau coco matcha Zencca", en: "Zencca matcha coconut water" }, focus: "50% 50%" },
  pLattePistache: { src: pLattePistache, alt: { fr: "Latte pistache Zencca parsemé d'éclats de pistache", en: "Zencca pistachio latte sprinkled with crushed pistachios" }, focus: "50% 50%" },
  pEggTart: { src: pEggTart, alt: { fr: "Egg tart dorée servie chez Zencca", en: "A golden egg tart served at Zencca" }, focus: "50% 50%" },
  carteMatchaLatte: { src: carteMatchaLatte, alt: { fr: "Matcha latte Zencca : matcha vert intense qui se fond dans le lait, gobelet transparent", en: "Zencca matcha latte: intense green matcha melting into milk, clear cup" }, focus: "50% 50%" },
  carteEauCocoMatcha: { src: carteEauCocoMatcha, alt: { fr: "Eau coco matcha Zencca : matcha vert sur eau de coco glacée, gobelet transparent", en: "Zencca matcha coconut water: green matcha over iced coconut water, clear cup" }, focus: "50% 50%" },
  carteSakuraMatcha: { src: carteSakuraMatcha, alt: { fr: "Sakura matcha Zencca : couche de matcha vert sur lait de coco rose, gobelet transparent", en: "Zencca sakura matcha: a layer of green matcha over pink coconut milk, clear cup" }, focus: "50% 50%" },
  carteOolongPeche: { src: carteOolongPeche, alt: { fr: "Thé oolong pêche Zencca : thé orangé glacé, tranches d'orange contre la paroi", en: "Zencca peach oolong tea: iced orange tea, orange slices against the side of the cup" }, focus: "50% 50%" },
  carteCitronFrappe: { src: carteCitronFrappe, alt: { fr: "Thé vert citron frappé Zencca : thé doré, glaçons et quartier de citron", en: "Zencca hand-shaken lemon green tea: golden tea, ice and a lemon wedge" }, focus: "50% 50%" },
  carteRaisinFrais: { src: carteRaisinFrais, alt: { fr: "Thé au raisin frais Zencca : crème blanche, granité de raisin rouge et pulpe jaune", en: "Zencca fresh grape tea: white cream, red grape slush and yellow pulp" }, focus: "50% 50%" },
  carteMangoPomelo: { src: carteMangoPomelo, alt: { fr: "Mango pomelo sago Zencca : crème de coco, pomelo rose, perles de sagou et mangue", en: "Zencca mango pomelo sago: coconut cream, pink pomelo, sago pearls and mango" }, focus: "50% 50%" },
  carteMangoCocoBleu: { src: carteMangoCocoBleu, alt: { fr: "Mango coco bleu Zencca : couche bleu ciel, coco blanche et mangue jaune", en: "Zencca mango blue coco: a sky-blue layer, white coconut and yellow mango" }, focus: "50% 50%" },
  carteBleuJasmin: { src: carteBleuJasmin, alt: { fr: "Thé au lait bleu jasmin Zencca : thé au lait bleu pâle et glaçons, gobelet transparent", en: "Zencca jasmine blue milk tea: pale blue milk tea and ice, clear cup" }, focus: "50% 50%" },
  carteLattePistache: { src: carteLattePistache, alt: { fr: "Latte pistache Zencca : crème de pistache beige fondant dans un lait blanc", en: "Zencca pistachio latte: beige pistachio cream melting into white milk" }, focus: "50% 50%" },
  carteLaitPerles: { src: carteLaitPerles, alt: { fr: "Les deux gobelets chauds illustrés Zencca : femme au perroquet rouge et grue dans les bambous", en: "The two illustrated Zencca hot cups: a woman with a red parrot, and a crane among bamboo" }, focus: "50% 50%" },
  carteChocolatChaud: { src: carteChocolatChaud, alt: { fr: "Chocolat chaud Zencca dans le gobelet illustré d'une grue et de bambous", en: "Zencca hot chocolate in the cup illustrated with a crane and bamboo" }, focus: "50% 50%" },
  carteTaroCoco: { src: carteTaroCoco, alt: { fr: "Taro coco Zencca : crème de taro violette marbrant un lait de coco blanc", en: "Zencca taro coconut: purple taro cream marbling white coconut milk" }, focus: "50% 50%" },
  cartePistacheJasmin: { src: cartePistacheJasmin, alt: { fr: "Pistache jasmin coco Zencca : mousse beige mouchetée sur thé au jasmin doré", en: "Zencca pistachio jasmine coconut: speckled beige foam over golden jasmine tea" }, focus: "50% 50%" },
  carteCafePistache: { src: carteCafePistache, alt: { fr: "Café latte pistache Zencca : crème de pistache, café caramel et lait", en: "Zencca pistachio coffee latte: pistachio cream, caramel-coloured coffee and milk" }, focus: "50% 50%" },
  carteCocoAmericano: { src: carteCocoAmericano, alt: { fr: "Coco americano Zencca : café ambré sur glaçons et eau de coco claire", en: "Zencca coco americano: amber coffee over ice and clear coconut water" }, focus: "50% 50%" },
  carteCocoLatte: { src: carteCocoLatte, alt: { fr: "Coco latte Zencca : expresso sombre posé sur un lait de coco épais", en: "Zencca coconut latte: dark espresso resting on thick coconut milk" }, focus: "50% 50%" },
  carteSmoothieMangue: { src: carteSmoothieMangue, alt: { fr: "Smoothie mangue yaourt Zencca : mangue dorée en spirale avec du yaourt blanc", en: "Zencca mango yogurt smoothie: golden mango swirled with white yogurt" }, focus: "50% 50%" },
  carteSmoothiePeche: { src: carteSmoothiePeche, alt: { fr: "Smoothie pêche yaourt Zencca : yaourt blanc marbré de pêche rose saumon", en: "Zencca peach yogurt smoothie: white yogurt marbled with salmon-pink peach" }, focus: "50% 50%" },
  carteSmoothieAvocat: { src: carteSmoothieAvocat, alt: { fr: "Smoothie avocat et yaourt Zencca : rubans d'avocat vert et de yaourt blanc", en: "Zencca avocado yogurt smoothie: ribbons of green avocado and white yogurt" }, focus: "50% 50%" },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
