import type { Metadata } from "next";
import Nouveautes from "@/components/offres/Nouveautes";
import PageHero from "@/components/ui/PageHero";
import HeroCluster from "@/components/ui/HeroCluster";
import { isOfferLive, offers } from "@/data/offers";
import { PREVIEW_DRAFTS } from "@/data/site";
import { getDict } from "@/i18n/dictionaries";
import { localeParam, pageMeta } from "@/lib/seo";

// Les offres datées se mettent à jour toutes les heures sans redéploiement
export const revalidate = 3600;

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMeta({ locale: await localeParam(params), page: "nouveautes", image: "/og/zencca-nouveautes.jpg" });
}

export default async function NouveautesPage({ params }: Props) {
  const t = getDict(await localeParam(params)).nouveautes;
  const live = offers.filter((o) => isOfferLive(o));
  const drafts = PREVIEW_DRAFTS ? offers.filter((o) => !isOfferLive(o)) : [];
  return (
    <>
      <PageHero title={t.heroTitle} lead={t.heroLead} bg="#ffd21f" ink="#201409" tint="#fbecc6" layers={["#fbecc6", "#ebbfc6"]} next="#fdf6ea" solidHeader>
        <HeroCluster items={["pLattePistache", "pMatchaLatte", "pEggTart"]} />
      </PageHero>
      <Nouveautes offers={live} drafts={drafts} />
    </>
  );
}
