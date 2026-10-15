import React, { useRef, useEffect } from 'react';
import { Github, Linkedin, CheckCircle2, User } from 'lucide-react';
import { personalProfile } from '../data/portfolioData';
import { gsap } from '../utils/gsapSetup';

export const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardColRef = useRef<HTMLDivElement | null>(null);
  const textColRef = useRef<HTMLDivElement | null>(null);
  const sageWashRef = useRef<HTMLDivElement | null>(null);
  const ochreWashRef = useRef<HTMLDivElement | null>(null);
  const compGridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Clean multi-directional parallax timeline
      const scrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // 1. Background Washes (Multi-directional):
      // Sage wash moves DOWN and RIGHT
      if (sageWashRef.current) {
        scrubTl.fromTo(
          sageWashRef.current,
          { y: -30, x: -20 },
          { y: 40, x: 30, ease: 'none' },
          0
        );
      }
      // Ochre wash moves UP and LEFT
      if (ochreWashRef.current) {
        scrubTl.fromTo(
          ochreWashRef.current,
          { y: 30, x: 20 },
          { y: -35, x: -25, ease: 'none' },
          0
        );
      }

      // 2. Profile Card (Left Column):
      // Moves DOWN and LEFT at gentle speed, staying grounded in intended layout
      if (cardColRef.current) {
        scrubTl.fromTo(
          cardColRef.current,
          { y: -15, x: 6 },
          { y: 20, x: -8, ease: 'none' },
          0
        );
      }

      // 3. Competency Cards (Right Column):
      // Alternating multi-directional shifts inside grid
      const compItems = compGridRef.current?.querySelectorAll<HTMLElement>('.comp-item');
      if (compItems && compItems.length > 0) {
        compItems.forEach((item, idx) => {
          const isEven = idx % 2 === 0;
          scrubTl.fromTo(
            item,
            {
              y: isEven ? 12 : -10,
              x: isEven ? -6 : 6,
            },
            {
              y: isEven ? -14 : 12,
              x: isEven ? 6 : -6,
              ease: 'none',
            },
            0
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      id="about"
      className="relative z-20 py-20 lg:py-28 bg-[#FBF9F5] overflow-hidden"
    >
      {/* Floating Sage & Ochre Watercolor Washes (Multi-directional Parallax) */}
      <div
        ref={sageWashRef}
        className="absolute top-1/4 -left-32 w-[600px] h-[450px] wash-sage rounded-full pointer-events-none will-change-transform"
        aria-hidden="true"
      />
      <div
        ref={ochreWashRef}
        className="absolute bottom-10 right-0 w-[500px] h-[400px] wash-ochre rounded-full pointer-events-none opacity-40 will-change-transform"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Tactile Paper Profile Card (5 cols) */}
          <div ref={cardColRef} className="lg:col-span-5 space-y-6 will-change-transform">
            <div className="rounded-2xl bg-[#FFFFFF] border border-[#E5DFD3] p-7 space-y-6 relative overflow-hidden shadow-paper-elevated hover:border-[#D4CBBC] transition-colors">
              {/* Art-Directed Watercolor Portrait Frame */}
              <div className="aspect-[4/3] rounded-xl bg-[#F7F4EE] border border-[#E5DFD3] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden group shadow-inner">
                {/* Organic pigment wash inside frame */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#2D5B88]/10 via-[#BA5A3A]/8 to-[#4D7266]/10" />

                <div className="p-4 rounded-full bg-[#FFFFFF] text-[#2D5B88] border border-[#E5DFD3] mb-3 shadow-sm relative z-10">
                  <User className="w-8 h-8" />
                </div>
                <div className="text-base font-bold text-[#1A1D20] font-serif relative z-10">
                  Navodya Manamendra
                </div>
                <div className="text-xs font-mono text-[#575D65] mt-0.5 relative z-10">
                  Software Engineer &amp; Full-Stack Developer
                </div>
                <div className="text-[11px] font-mono text-[#7E8590] mt-2 relative z-10">
                  ImageKit Profile Slot: Ready for Image URL
                </div>
              </div>

              {/* Quick Profile Identifiers */}
              <div className="space-y-3 text-xs font-mono">
                <div className="flex items-center justify-between pb-2 border-b border-[#E5DFD3]">
                  <span className="text-[#575D65]">Current Degree</span>
                  <span className="text-[#1A1D20] font-medium">BSc (Hons) IT @ SLIIT</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#E5DFD3]">
                  <span className="text-[#575D65]">Academic Year</span>
                  <span className="text-[#1A1D20] font-medium">Fourth Year</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#E5DFD3]">
                  <span className="text-[#575D65]">Location</span>
                  <span className="text-[#1A1D20] font-medium">Colombo, Sri Lanka</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#575D65]">Published Scholar</span>
                  <span className="text-[#BA5A3A] font-semibold">IEEE SCSE 2026 Author</span>
                </div>
              </div>

              {/* Social profiles & CV links */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={personalProfile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#1A1D20] bg-[#F7F4EE] hover:bg-[#EFEAE0] rounded-lg border border-[#E5DFD3] transition-colors shadow-sm"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalProfile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#1A1D20] bg-[#F7F4EE] hover:bg-[#EFEAE0] rounded-lg border border-[#E5DFD3] transition-colors shadow-sm"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
                <span className="text-xs font-mono text-[#7E8590] py-2 px-1">
                  CV: [Configurable via URL]
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Bio Narrative (7 cols) */}
          <div ref={textColRef} className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="text-xs font-mono text-[#2D5B88] tracking-wider uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#2D5B88]" aria-hidden="true" />
                <span>LAYER 02 // PROFESSIONAL IDENTITY</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1D20] tracking-tight font-serif">
                About Navodya
              </h2>
            </div>

            {/* Paragraphs with high editorial readability */}
            <div className="space-y-4 text-base text-[#575D65] leading-relaxed">
              {personalProfile.bioParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Core Architectural Tenets */}
            <div className="pt-6 border-t border-[#E5DFD3] space-y-4">
              <h3 className="text-sm font-mono text-[#1A1D20] uppercase tracking-wider font-semibold">
                Core Competencies &amp; Focus Areas
              </h3>
              <div ref={compGridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {personalProfile.coreCompetencies.map((comp) => (
                  <div
                    key={comp}
                    className="comp-item flex items-start gap-2.5 text-xs text-[#575D65] bg-[#FFFFFF] p-3 rounded-lg border border-[#E5DFD3] shadow-sm will-change-transform"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#4D7266] shrink-0 mt-0.5" />
                    <span className="text-[#1A1D20] font-medium">{comp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
