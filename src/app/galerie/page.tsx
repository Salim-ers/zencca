import type { Metadata } from "next";
import Gallery from "@/components/galerie/Gallery";
import PageHero from "@/components/ui/PageHero";
import HeroCluster from "@/components/ui/HeroCluster";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Galerie : boissons, salon et ambiance",
  description: "Les photos de Zencca : sakura matcha, thé au raisin frais, coco latte, la façade ocre et la fresque du salon de thé rue Tiquetonne.",
  path: "/galerie",
  image: "/og/zencca-galerie.jpg",
});

export default function GaleriePage() {
  return (
    <>
      <PageHero
        title={["La", "galerie"]}
        lead="Les boissons, le salon et les petits détails, en grand."
        bg="#ebbfc6"
        ink="#4f121c"
        tint="#f7e2e3"
        layers={["#f7e2e3", "#a9bd6e"]}
        next="#f8ebd3"
      >
        <HeroCluster items={["facadeTerrasse", "salonFresque", "gobeletIllustre"]} />
      </PageHero>
      <div className="bg-creme pt-10 lg:pt-14">
        <Gallery />
      </div>
    </>
  );
}
