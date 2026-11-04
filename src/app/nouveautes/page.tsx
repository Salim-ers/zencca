import type { Metadata } from "next";
import Nouveautes from "@/components/offres/Nouveautes";
import PageHero from "@/components/ui/PageHero";
import HeroCluster from "@/components/ui/HeroCluster";
import { isOfferLive, offers } from "@/data/offers";
import { PREVIEW_DRAFTS } from "@/data/site";
import { pageMeta } from "@/lib/seo";

// Les offres datées se mettent à jour toutes les heures sans redéploiement
export const revalidate = 3600;

export const metadata: Metadata = pageMeta({
  title: "Nouveautés & offres",
  description: "Les nouvelles boissons Zencca (matcha latte, pistache jasmin coco, café latte pistache, coco americano) et les offres du salon de thé rue Tiquetonne.",
  path: "/nouveautes",
  image: "/og/zencca-nouveautes.jpg",
});

export default function NouveautesPage() {
  const live = offers.filter((o) => isOfferLive(o));
  const drafts = PREVIEW_DRAFTS ? offers.filter((o) => !isOfferLive(o)) : [];
  return (
    <>
      <PageHero
        title={["Nouveautés", "& offres"]}
        lead="Ce qui vient d'arriver au comptoir."
        bg="#ffd21f"
        ink="#201409"
        tint="#fbecc6"
        layers={["#fbecc6", "#ebbfc6"]}
        next="#fdf6ea"
        solidHeader
      >
        <HeroCluster items={["pLattePistache", "pMatchaLatte", "pEggTart"]} />
      </PageHero>
      <Nouveautes offers={live} drafts={drafts} />
    </>
  );
}
