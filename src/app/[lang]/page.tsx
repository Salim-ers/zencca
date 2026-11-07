import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import Creations from "@/components/home/Creations";
import Saveurs from "@/components/home/Saveurs";
import Signature from "@/components/home/Signature";
import Salon from "@/components/home/Salon";
import InstagramWall from "@/components/home/InstagramWall";
import Visit from "@/components/home/Visit";
import { localeParam, pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMeta({ locale: await localeParam(params), page: "home", absoluteTitle: true });
}

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
