(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';

  if (!hasGSAP || reducedMotion) {
    document.body.classList.add('motion-ready');
    return;
  }

  const gsap = window.gsap;
  const ScrollTrigger = window.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);

  let lenis;
  if (typeof window.Lenis !== 'undefined') {
    lenis = new window.Lenis({
      duration: 1.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  const mm = gsap.matchMedia();
  mm.add('(min-width: 901px)', () => {
    const track = document.querySelector('.horizontal-track');
    const scene = document.querySelector('.pin-scene');

    if (track && scene) {
      gsap.to(track, {
        xPercent: -35,
        ease: 'none',
        scrollTrigger: {
          trigger: scene,
          start: 'top center',
          end: '+=500',
          scrub: true,
          pin: scene,
        },
      });
    }
  });

  gsap.from('.hero .reveal-up', {
    y: 32,
    opacity: 0,
    duration: 0.9,
    stagger: 0.12,
    ease: 'power3.out',
  });

  gsap.utils.toArray('.section .reveal-up').forEach((element) => {
    gsap.from(element, {
      opacity: 0,
      y: 22,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 88%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  window.addEventListener('resize', () => ScrollTrigger.refresh());
  document.body.classList.add('motion-ready');
})();
