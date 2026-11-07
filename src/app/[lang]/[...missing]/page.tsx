import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDict } from "@/i18n/dictionaries";
import { localeParam } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { title, description } = getDict(await localeParam(params)).meta.pages.notFound;
  return { title, description, robots: { index: false, follow: true } };
}

/** Toute adresse inconnue affiche la page 404 dans la langue du visiteur, avec l'en-tête et le pied de page. */
export default function Missing() {
  notFound();
}
