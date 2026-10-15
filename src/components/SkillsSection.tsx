import React, { useRef, useEffect } from 'react';
import { skillGroupsData } from '../data/portfolioData';
import { gsap } from '../utils/gsapSetup';

export const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const sageWashRef = useRef<HTMLDivElement | null>(null);
  const ochreWashRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const scrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // 1. Background Washes (Multi-directional):
      if (sageWashRef.current) {
        scrubTl.fromTo(
          sageWashRef.current,
          { y: -30, x: -20 },
          { y: 40, x: 25, ease: 'none' },
          0
        );
      }
      if (ochreWashRef.current) {
        scrubTl.fromTo(
          ochreWashRef.current,
          { y: 30, x: 20 },
          { y: -35, x: -20, ease: 'none' },
          0
        );
      }

      // 2. Skill Cards Grid (Multi-directional across columns & rows):
      const cards = gridRef.current?.querySelectorAll<HTMLElement>('.skill-card');
      if (cards && cards.length > 0) {
        cards.forEach((card, idx) => {
          // Predefined controlled multi-directional vectors
          const vectors = [
            { fromY: 16, toY: -16, fromX: 8, toX: -8 },   // Card 0: Up & Left
            { fromY: -14, toY: 14, fromX: -8, toX: 8 },   // Card 1: Down & Right
            { fromY: 14, toY: -14, fromX: -8, toX: 8 },   // Card 2: Up & Right
            { fromY: -12, toY: 12, fromX: 6, toX: -6 },   // Card 3: Down & Left
            { fromY: 12, toY: -12, fromX: -6, toX: 6 },   // Card 4: Up & Right
            { fromY: -14, toY: 14, fromX: -8, toX: 8 },   // Card 5: Down & Right
          ];
          const v = vectors[idx % vectors.length];

          scrubTl.fromTo(
            card,
            { y: v.fromY, x: v.fromX },
            { y: v.toY, x: v.toX, ease: 'none' },
            0
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getMarkerColor = (idx: number) => {
    const markers = ['bg-[#2D5B88]', 'bg-[#BA5A3A]', 'bg-[#4D7266]', 'bg-[#C4883A]', 'bg-[#B86576]'];
    return markers[idx % markers.length];
  };

  return (
    <div
      ref={sectionRef}
      id="skills"
      className="relative z-20 py-20 lg:py-28 bg-[#F7F4EE] overflow-hidden"
    >
      {/* Background Washes for Multi-Layer Depth */}
      <div
        ref={sageWashRef}
        className="absolute top-1/6 -left-28 w-[550px] h-[450px] wash-sage rounded-full pointer-events-none opacity-50 will-change-transform"
        aria-hidden="true"
      />
      <div
        ref={ochreWashRef}
        className="absolute bottom-1/6 -right-24 w-[500px] h-[400px] wash-ochre rounded-full pointer-events-none opacity-40 will-change-transform"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl mb-14">
          <div className="text-xs font-mono text-[#4D7266] tracking-wider uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#4D7266]" aria-hidden="true" />
            <span>LAYER 04 // TECHNICAL REPERTOIRE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1D20] tracking-tight font-serif">
            Technical Capabilities
          </h2>
          <p className="text-sm sm:text-base text-[#575D65]">
            Full-stack languages, backend frameworks, computer vision libraries, and cloud infrastructure organized by domain without arbitrary vanity percentage meters.
          </p>
        </div>

        {/* Categorized Skills Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {skillGroupsData.map((group, groupIdx) => (
            <div
              key={group.category}
              className="skill-card rounded-2xl bg-[#FFFFFF] border border-[#E5DFD3] p-6 space-y-4 hover:border-[#D4CBBC] transition-colors shadow-paper hover:shadow-paper-elevated will-change-transform"
            >
              {/* Category Title */}
              <div className="flex items-center justify-between pb-3 border-b border-[#E5DFD3]">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${getMarkerColor(groupIdx)}`} aria-hidden="true" />
                  <h3 className="text-sm font-bold text-[#1A1D20] tracking-tight">
                    {group.category}
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-[#7E8590]">
                  {group.skills.length} skills
                </span>
              </div>

              {/* Skills Typographic List */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-mono text-[#575D65]">
                {group.skills.map((skill, idx) => (
                  <React.Fragment key={skill}>
                    <span className="text-[#1A1D20] font-medium hover:text-[#2D5B88] transition-colors">
                      {skill}
                    </span>
                    {idx < group.skills.length - 1 && (
                      <span className="text-[#D4CBBC]" aria-hidden="true">/</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
