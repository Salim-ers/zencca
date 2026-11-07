"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  gsap.defaults({ ease: "power3.out", duration: 0.9 });
  ScrollTrigger.config({ ignoreMobileResize: true });
  // Après un blocage, les animations reprennent en douceur au lieu de sauter d'un coup
  gsap.ticker.lagSmoothing(200, 33);
}

export { gsap, ScrollTrigger, useGSAP };
