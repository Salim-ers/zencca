"use client";

import Mascot from "@/components/brand/Mascot";
import TransitionLink from "@/components/transition/TransitionLink";
import { useT } from "@/i18n/client";

export default function NotFound() {
  const t = useT().notFound;
  return (
    <section className="flex min-h-[90svh] items-center bg-creme pb-28 pt-32">
      <div className="wrap grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div className="mx-auto w-[min(70vw,360px)]">
          <Mascot variant="mascot" liquid="#ebbfc6" level={0.15} followPointer decorative />
        </div>
        <div>
          <h1 className="font-display t-h1">{t.title}</h1>
          <p className="t-lead mt-6 max-w-[26rem] text-brun">{t.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <TransitionLink href="/la-carte" className="btn">
              {t.seeMenu}
            </TransitionLink>
            <TransitionLink href="/" className="btn btn-ghost">
              {t.home}
            </TransitionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
