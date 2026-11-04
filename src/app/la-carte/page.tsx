import type { Metadata } from "next";
import { Suspense } from "react";
import MenuExplorer from "@/components/carte/MenuExplorer";
import PageHero from "@/components/ui/PageHero";
import HeroCluster from "@/components/ui/HeroCluster";
import { pageMeta } from "@/lib/seo";
import { products } from "@/data/products";

export const metadata: Metadata = pageMeta({
  title: "La carte : matcha, bubble tea, fruits frais et coco",
  description:
    "La carte Zencca : matcha latte, sakura matcha, eau coco matcha, thé au raisin frais, mango pomelo sago, coco latte, smoothies au yaourt. Salon de thé rue Tiquetonne, Paris 2e.",
  path: "/la-carte",
  image: "/og/zencca-carte.jpg",
});

export default function CartePage() {
  return (
    <>
      <PageHero
        title={["Toute", "la carte"]}
        lead={`${products.length} boissons et gourmandises, du matcha aux fruits frais. Choisissez un univers, ouvrez une boisson.`}
        bg="#dfe5c3"
        ink="#263211"
        layers={["#a9bd6e", "#ebbfc6"]}
        next="#fdf6ea"
      >
        <HeroCluster items={["raisinDetail", "heroSakuraRue", "pCocoLatte"]} />
      </PageHero>
      <div className="bg-papier pt-10 lg:pt-16">
        <Suspense fallback={<div className="min-h-[60vh]" />}>
          <MenuExplorer />
        </Suspense>
        <div className="wrap pb-24">
          <p className="max-w-[40rem] text-[0.95rem] text-brun/80">
            La carte affichée au comptoir fait foi : certaines boissons varient selon les saisons et les arrivages.
          </p>
        </div>
      </div>
    </>
  );
}
