import type { Metadata } from "next";
import { Suspense } from "react";
import MenuExplorer from "@/components/carte/MenuExplorer";
import PageHero from "@/components/ui/PageHero";
import HeroCluster from "@/components/ui/HeroCluster";
import { getDict } from "@/i18n/dictionaries";
import { localeParam, pageMeta } from "@/lib/seo";
import { products } from "@/data/products";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMeta({ locale: await localeParam(params), page: "carte", image: "/og/zencca-carte.jpg" });
}

export default async function CartePage({ params }: Props) {
  const t = getDict(await localeParam(params)).carte;
  return (
    <>
      <PageHero title={t.heroTitle} lead={t.heroLead(products.length)} bg="#dfe5c3" ink="#263211" layers={["#a9bd6e", "#ebbfc6"]} next="#fdf6ea">
        <HeroCluster items={["raisinDetail", "heroSakuraRue", "pCocoLatte"]} />
      </PageHero>
      <div className="bg-papier pt-10 lg:pt-16">
        <Suspense fallback={<div className="min-h-[60vh]" />}>
          <MenuExplorer />
        </Suspense>
        <div className="wrap pb-24">
          <p className="max-w-[40rem] text-[0.95rem] text-brun/80">{t.disclaimer}</p>
        </div>
      </div>
    </>
  );
}
