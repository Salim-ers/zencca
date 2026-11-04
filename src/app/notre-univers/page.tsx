import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Univers from "@/components/univers/Univers";
import { InfuseImage } from "@/components/ui/motion";
import { photos } from "@/data/images";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Notre univers : le salon de thé Zencca, rue Tiquetonne",
  description:
    "L'univers Zencca : un salon de thé ocre rue Tiquetonne, une mascotte qui boit à la paille, du matcha, des fruits frais et des créations coco & café.",
  path: "/notre-univers",
  image: "/og/zencca-univers.jpg",
});

export default function UniversPage() {
  return (
    <>
      <PageHero
        title={["Notre", "univers"]}
        cjk="甄茶"
        lead="Un néon, une façade ocre, une mascotte et beaucoup de couleurs. Bienvenue chez Zencca."
        bg="#e6b465"
        ink="#2a1606"
        tint="#f1d29b"
        layers={["#f1d29b", "#ebbfc6"]}
        next="#fdf6ea"
      >
        <InfuseImage
          photo={photos.comptoirNeon}
          sizes="(min-width: 1024px) 30vw, 80vw"
          shape="tuile"
          trigger="reveal"
          priority
          className="mx-auto aspect-[3/4] w-[78%] sm:w-[60%] lg:w-full"
        />
      </PageHero>
      <Univers />
    </>
  );
}
