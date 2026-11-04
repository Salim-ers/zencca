import Mascot from "@/components/brand/Mascot";
import TransitionLink from "@/components/transition/TransitionLink";

export default function NotFound() {
  return (
    <section className="flex min-h-[90svh] items-center bg-creme pb-28 pt-32">
      <div className="wrap grid grid-cols-1 items-center gap-10 md:grid-cols-2">
        <div className="mx-auto w-[min(70vw,360px)]">
          <Mascot variant="mascot" liquid="#ebbfc6" level={0.15} followPointer decorative />
        </div>
        <div>
          <h1 className="font-display t-h1">Gobelet vide.</h1>
          <p className="t-lead mt-6 max-w-[26rem] text-brun">Cette page n&apos;existe pas ou a changé d&apos;adresse. La carte, elle, est toujours pleine.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <TransitionLink href="/la-carte" className="btn">Voir la carte</TransitionLink>
            <TransitionLink href="/" className="btn btn-ghost">Retour à l&apos;accueil</TransitionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
