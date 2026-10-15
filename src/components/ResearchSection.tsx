import React, { useRef, useEffect } from 'react';
import { ExternalLink, BookOpen, Award } from 'lucide-react';
import { researchPublication } from '../data/portfolioData';
import { gsap } from '../utils/gsapSetup';

export const ResearchSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const pipelineRef = useRef<HTMLDivElement | null>(null);
  const citationRef = useRef<HTMLDivElement | null>(null);
  const contributionRef = useRef<HTMLDivElement | null>(null);
  const svgMeshRef = useRef<SVGSVGElement | null>(null);
  const hologramBoxRef = useRef<HTMLDivElement | null>(null);
  const washRef = useRef<HTMLDivElement | null>(null);

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

      // 1. Background Cobalt Wash: Moves DOWN and RIGHT
      if (washRef.current) {
        scrubTl.fromTo(
          washRef.current,
          { y: -35, x: -25 },
          { y: 45, x: 30, ease: 'none' },
          0
        );
      }

      // 2. Right Column Cards (Multi-directional Parallax in Opposing Directions):
      // Pipeline card moves UP and LEFT
      if (pipelineRef.current) {
        scrubTl.fromTo(
          pipelineRef.current,
          { y: 20, x: 10 },
          { y: -22, x: -12, ease: 'none' },
          0
        );
      }
      // Citation card moves DOWN and RIGHT
      if (citationRef.current) {
        scrubTl.fromTo(
          citationRef.current,
          { y: -18, x: -8 },
          { y: 20, x: 10, ease: 'none' },
          0
        );
      }

      // 3. Individual Contribution Spotlight (Inside Left Card):
      // Moves DOWN and LEFT
      if (contributionRef.current) {
        scrubTl.fromTo(
          contributionRef.current,
          { y: -8, x: 6 },
          { y: 10, x: -6, ease: 'none' },
          0
        );
      }

      // 4. Optical Extractor Diagram Box: Scroll-Linked 3D Rotation (Controlled tilt)
      if (hologramBoxRef.current) {
        scrubTl.fromTo(
          hologramBoxRef.current,
          { rotateY: -4, rotateX: 2.5 },
          { rotateY: 4, rotateX: -2.5, ease: 'none' },
          0
        );
      }

      // 5. Scroll-Linked Measurement Lines & Nodes
      if (svgMeshRef.current) {
        const lines = svgMeshRef.current.querySelectorAll('.measure-line');
        const nodes = svgMeshRef.current.querySelectorAll('.keypoint-node');

        scrubTl.fromTo(
          lines,
          { strokeDashoffset: 40 },
          { strokeDashoffset: 0, ease: 'none' },
          0
        );

        scrubTl.fromTo(
          nodes,
          { scale: 0.85, transformOrigin: 'center' },
          { scale: 1.15, ease: 'none' },
          0
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      id="research"
      className="relative z-20 py-20 lg:py-28 bg-[#FBF9F5] overflow-hidden"
    >
      {/* Background Soft Cobalt Watercolor Wash (Multi-directional Parallax) */}
      <div
        ref={washRef}
        className="absolute -top-32 right-1/4 w-[650px] h-[400px] wash-cobalt rounded-full pointer-events-none opacity-60 will-change-transform"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl mb-14">
          <div className="text-xs font-mono text-[#BA5A3A] tracking-wider uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#BA5A3A]" aria-hidden="true" />
            <span>LAYER 05 // PEER-REVIEWED PUBLICATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1D20] tracking-tight font-serif">
            Academic Research
          </h2>
          <p className="text-sm sm:text-base text-[#575D65]">
            Published scholarly contributions bridging computer vision, neural feature extraction, and automated anthropometric garment fit recommendation.
          </p>
        </div>

        {/* Featured Research Banner Card on Tactile Cotton Paper */}
        <div
          ref={cardRef}
          className="rounded-2xl bg-[#FFFFFF] border border-[#E5DFD3] p-7 sm:p-10 lg:p-12 relative overflow-hidden shadow-paper-elevated hover:border-[#D4CBBC] transition-colors"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left 7 cols: Paper Summary & Contribution */}
            <div className="lg:col-span-7 space-y-6">
              {/* Publication metadata line */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-[#575D65]">
                <span className="text-[#2D5B88] font-semibold">{researchPublication.conferenceShort}</span>
                <span aria-hidden="true" className="text-[#D4CBBC]">·</span>
                <span>{researchPublication.heldDate}</span>
                <span aria-hidden="true" className="text-[#D4CBBC]">·</span>
                <span>{researchPublication.location}</span>
              </div>

              {/* Title */}
              <h3 className="text-2xl sm:text-3xl font-bold text-[#1A1D20] leading-snug font-serif">
                {researchPublication.title}
              </h3>

              {/* Conference citation */}
              <p className="text-xs sm:text-sm text-[#575D65] leading-relaxed">
                Presented and published in the proceedings of the <span className="text-[#1A1D20] font-medium">{researchPublication.conference}</span>. Supervised by <span className="text-[#1A1D20] font-medium">{researchPublication.supervisor}</span> at the Sri Lanka Institute of Information Technology (SLIIT).
              </p>

              {/* Distinct Individual Contribution Spotlight (Multi-directional Parallax) */}
              <div
                ref={contributionRef}
                className="rounded-xl bg-[#FBF9F5] border border-[#E5DFD3] p-5 space-y-3 shadow-inner will-change-transform"
              >
                <div className="flex items-center gap-2 text-xs font-mono text-[#BA5A3A] uppercase tracking-wider font-semibold">
                  <Award className="w-4 h-4" />
                  <span>Individual Module Contribution</span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-[#1A1D20] font-serif">
                  {researchPublication.myContributionTitle}
                </h4>
                <p className="text-xs sm:text-sm text-[#575D65] leading-relaxed">
                  {researchPublication.myContributionSummary}
                </p>
              </div>

              {/* Optical Extractor Diagram with Scroll-Linked 3D Transform */}
              <div
                ref={hologramBoxRef}
                className="p-4 rounded-xl bg-[#F7F4EE] border border-[#E5DFD3] space-y-3 shadow-paper will-change-transform"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="flex items-center justify-between text-xs font-mono text-[#575D65]">
                  <span className="text-[#2D5B88] font-semibold">Dual-View Optical Diagram</span>
                  <span>EfficientNet-B3 Backbone</span>
                </div>
                <div className="h-40 w-full flex items-center justify-center">
                  <svg
                    ref={svgMeshRef}
                    viewBox="0 0 360 140"
                    className="w-full h-full"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M0 35 H360 M0 70 H360 M0 105 H360 M60 0 V140 M120 0 V140 M180 0 V140 M240 0 V140 M300 0 V140"
                      stroke="#EFEAE0"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                    />
                    {/* Front Silhouette (Cobalt ink) */}
                    <circle cx="100" cy="30" r="10" stroke="#2D5B88" strokeWidth="1.8" />
                    <line x1="100" y1="40" x2="100" y2="85" stroke="#2D5B88" strokeWidth="1.8" />
                    <line x1="75" y1="50" x2="125" y2="50" stroke="#2D5B88" strokeWidth="1.8" />
                    <line x1="75" y1="50" x2="68" y2="90" stroke="#575D65" strokeWidth="1.5" />
                    <line x1="125" y1="50" x2="132" y2="90" stroke="#575D65" strokeWidth="1.5" />
                    <line x1="100" y1="85" x2="88" y2="130" stroke="#2D5B88" strokeWidth="1.8" />
                    <line x1="100" y1="85" x2="112" y2="130" stroke="#2D5B88" strokeWidth="1.8" />

                    {/* Measurement bounding lines (Terracotta) */}
                    <line
                      className="measure-line"
                      x1="65"
                      y1="50"
                      x2="135"
                      y2="50"
                      stroke="#BA5A3A"
                      strokeWidth="1.5"
                      strokeDasharray="4 2"
                    />
                    <line
                      className="measure-line"
                      x1="80"
                      y1="75"
                      x2="120"
                      y2="75"
                      stroke="#BA5A3A"
                      strokeWidth="1.5"
                      strokeDasharray="4 2"
                    />
                    <line
                      className="measure-line"
                      x1="68"
                      y1="130"
                      x2="132"
                      y2="130"
                      stroke="#BA5A3A"
                      strokeWidth="1.5"
                      strokeDasharray="4 2"
                    />

                    {/* Side Sagittal Silhouette (Sage ink) */}
                    <circle cx="260" cy="30" r="10" stroke="#4D7266" strokeWidth="1.8" />
                    <path d="M258 40 Q266 65 260 85 Q254 110 262 130" stroke="#4D7266" strokeWidth="1.8" />
                    <line x1="260" y1="50" x2="272" y2="80" stroke="#575D65" strokeWidth="1.5" />

                    {/* Nodes with watercolor pigment colors */}
                    <circle className="keypoint-node" cx="100" cy="50" r="3" fill="#BA5A3A" />
                    <circle className="keypoint-node" cx="75" cy="50" r="2.8" fill="#2D5B88" />
                    <circle className="keypoint-node" cx="125" cy="50" r="2.8" fill="#2D5B88" />
                    <circle className="keypoint-node" cx="100" cy="85" r="2.8" fill="#2D5B88" />
                    <circle className="keypoint-node" cx="260" cy="50" r="3" fill="#BA5A3A" />
                    <circle className="keypoint-node" cx="260" cy="85" r="2.8" fill="#4D7266" />
                  </svg>
                </div>
              </div>

              {/* Project Context */}
              <div className="text-xs text-[#575D65] space-y-1.5 pt-1">
                <div className="font-mono text-[11px] text-[#7E8590] uppercase tracking-wider font-semibold">
                  Research Collaboration Context
                </div>
                <p className="leading-relaxed">
                  {researchPublication.groupContext}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href={researchPublication.publicationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#2D5B88] hover:bg-[#23486c] rounded-lg transition-colors shadow-sm hover:shadow"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Access IEEE Xplore Publication</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Right 5 cols: Architecture Breakdown & Floating Citation Card (Multi-Directional Parallax) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              {/* Architecture Blueprint Container (Moves UP and LEFT) */}
              <div
                ref={pipelineRef}
                className="rounded-xl bg-[#FBF9F5] border border-[#E5DFD3] p-5 space-y-4 will-change-transform shadow-inner"
              >
                <div className="flex items-center justify-between text-xs font-mono text-[#575D65] pb-3 border-b border-[#E5DFD3]">
                  <span>SYSTEM ARCHITECTURE</span>
                  <span className="text-[#2D5B88] font-semibold">4-STAGE PIPELINE</span>
                </div>

                <div className="space-y-3">
                  {researchPublication.architectureDetails.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs text-[#575D65]">
                      <span className="font-mono text-[#BA5A3A] font-bold text-xs shrink-0">
                        0{idx + 1}.
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bibliographic Citation Data (Moves DOWN and RIGHT) */}
              <div
                ref={citationRef}
                className="rounded-xl bg-[#FFFFFF] border border-[#E5DFD3] p-5 space-y-3 text-xs font-mono will-change-transform shadow-paper"
              >
                <div className="text-[11px] text-[#7E8590] uppercase tracking-wider font-semibold">
                  Bibliographic Identifiers
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#E5DFD3]">
                  <span className="text-[#575D65]">DOI</span>
                  <a
                    href={researchPublication.publicationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#2D5B88] font-semibold hover:underline underline-offset-2 transition-colors"
                  >
                    {researchPublication.doi}
                  </a>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#E5DFD3]">
                  <span className="text-[#575D65]">ISBN</span>
                  <span className="text-[#1A1D20] font-medium">{researchPublication.isbn}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-[#E5DFD3]">
                  <span className="text-[#575D65]">Conference</span>
                  <span className="text-[#1A1D20] font-medium">IEEE SCSE 2026</span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="text-[#575D65]">Institution</span>
                  <span className="text-[#1A1D20] font-medium">SLIIT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
