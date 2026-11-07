import type { Metadata } from "next";
import Gallery from "@/components/galerie/Gallery";
import PageHero from "@/components/ui/PageHero";
import HeroCluster from "@/components/ui/HeroCluster";
import { getDict } from "@/i18n/dictionaries";
import { localeParam, pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMeta({ locale: await localeParam(params), page: "galerie", image: "/og/zencca-galerie.jpg" });
}

export default async function GaleriePage({ params }: Props) {
  const t = getDict(await localeParam(params)).galerie;
  return (
    <>
      <PageHero title={t.heroTitle} lead={t.heroLead} bg="#ebbfc6" ink="#4f121c" tint="#f7e2e3" layers={["#f7e2e3", "#a9bd6e"]} next="#f8ebd3">
        <HeroCluster items={["facadeTerrasse", "salonFresque", "gobeletIllustre"]} />
      </PageHero>
      <div className="bg-creme pt-10 lg:pt-14">
        <Gallery />
      </div>
    </>
  );
}
