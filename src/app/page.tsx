import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Creations from "@/components/home/Creations";
import Saveurs from "@/components/home/Saveurs";
import Signature from "@/components/home/Signature";
import Salon from "@/components/home/Salon";
import InstagramWall from "@/components/home/InstagramWall";
import Visit from "@/components/home/Visit";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Zencca — Salon de thé, matcha & bubble tea, rue Tiquetonne, Paris 2e",
    description:
      "Zencca, salon de thé au 20 rue Tiquetonne (Paris 2e) : matcha, bubble teas, thés aux fruits frais et créations coco & café, près d'Étienne Marcel et Châtelet.",
    path: "/",
  }),
  title: { absolute: "Zencca — Salon de thé, matcha & bubble tea, rue Tiquetonne, Paris 2e" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Creations />
      <Saveurs />
      <Signature />
      <Salon />
      <InstagramWall />
      <Visit />
    </>
  );
}
