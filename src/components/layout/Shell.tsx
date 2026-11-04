"use client";

import TransitionProvider from "@/components/transition/TransitionProvider";
import Header from "./Header";
import Footer from "./Footer";
import Loader from "./Loader";
import SmoothScroll from "./SmoothScroll";
import MobileActionBar from "./MobileActionBar";

export default function Shell({ children }: { children: React.ReactNode }) {
  return (
    <TransitionProvider>
      <Loader />
      <SmoothScroll />
      <Header />
      <main id="contenu" className="relative flex-1">
        {children}
      </main>
      <Footer />
      <MobileActionBar />
    </TransitionProvider>
  );
}
