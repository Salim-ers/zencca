import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Univers from "@/components/univers/Univers";
import { InfuseImage } from "@/components/ui/motion";
import { photos } from "@/data/images";
import { getDict } from "@/i18n/dictionaries";
import { localeParam, pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMeta({ locale: await localeParam(params), page: "univers", image: "/og/zencca-univers.jpg" });
}

export default async function UniversPage({ params }: Props) {
  const t = getDict(await localeParam(params)).univers;
  return (
    <>
      <PageHero title={t.heroTitle} cjk="甄茶" lead={t.heroLead} bg="#e6b465" ink="#2a1606" tint="#f1d29b" layers={["#f1d29b", "#ebbfc6"]} next="#fdf6ea">
        <InfuseImage
          photo={photos.comptoirNeon}
          sizes="(min-width: 1024px) 30vw, 80vw"
          shape="tuile"
          trigger="reveal"
          eager
          className="mx-auto aspect-[3/4] w-[78%] sm:w-[60%] lg:w-full"
        />
      </PageHero>
      <Univers />
    </>
  );
}
