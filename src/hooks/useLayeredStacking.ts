import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '../utils/gsapSetup';

export function useLayeredStacking() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const heroLayer = document.getElementById('layer-hero');
    const aboutLayer = document.getElementById('layer-about');

    if (!heroLayer || !aboutLayer) return;

    const ctx = gsap.context(() => {
      // Pin hero layer cleanly in place so Layer 02 (About) slides directly over it
      // Eliminates destructive 3D rotations, scales, and conflicting pinSpacing that caused sinking
      ScrollTrigger.create({
        trigger: heroLayer,
        start: 'top top',
        endTrigger: aboutLayer,
        end: 'top top',
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        id: 'pin-hero-layer',
      });
    });

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, []);
}
