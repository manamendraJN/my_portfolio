import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink, Award, ShieldCheck } from 'lucide-react';
import { certificatesData } from '../data/portfolioData';
import { gsap, ScrollTrigger } from '../utils/gsapSetup';

export const CertificatesSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const washRef = useRef<HTMLDivElement | null>(null);

  const categories = [
    'All',
    'Academic Research',
    'AI & Machine Learning',
    'Cloud & Architecture',
    'Software Engineering',
  ];

  const filteredCerts = filter === 'All'
    ? certificatesData
    : certificatesData.filter((c) => c.category === filter);

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

      // 1. Background Cobalt Wash: Moves UP and RIGHT
      if (washRef.current) {
        scrubTl.fromTo(
          washRef.current,
          { y: 30, x: -20 },
          { y: -35, x: 25, ease: 'none' },
          0
        );
      }

      // 2. Certificate Cards Grid (Multi-Directional across columns):
      const cards = gridRef.current?.querySelectorAll<HTMLElement>('.cert-card');
      if (cards && cards.length > 0) {
        cards.forEach((card, idx) => {
          const colMod = idx % 3;
          // Column 0 moves UP & LEFT, Column 1 moves DOWN & RIGHT, Column 2 moves UP & RIGHT
          const fromY = colMod === 1 ? -14 : 16;
          const toY = colMod === 1 ? 16 : -16;
          const fromX = colMod === 0 ? 8 : -8;
          const toX = colMod === 0 ? -8 : 8;

          scrubTl.fromTo(
            card,
            { y: fromY, x: fromX },
            { y: toY, x: toX, ease: 'none' },
            0
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [filter]);

  const getBadgeColor = (category: string) => {
    switch (category) {
      case 'Academic Research':
        return 'text-[#BA5A3A] bg-[#BA5A3A]/10 border-[#BA5A3A]/20';
      case 'AI & Machine Learning':
        return 'text-[#2D5B88] bg-[#2D5B88]/10 border-[#2D5B88]/20';
      case 'Cloud & Architecture':
        return 'text-[#C4883A] bg-[#C4883A]/10 border-[#C4883A]/20';
      default:
        return 'text-[#4D7266] bg-[#4D7266]/10 border-[#4D7266]/20';
    }
  };

  return (
    <div
      ref={sectionRef}
      id="certificates"
      className="relative z-20 py-20 lg:py-28 bg-[#F7F4EE] overflow-hidden"
    >
      {/* Gentle cobalt watercolor wash (Multi-directional Parallax) */}
      <div
        ref={washRef}
        className="absolute top-1/4 -left-28 w-[550px] h-[500px] wash-cobalt rounded-full pointer-events-none opacity-60 will-change-transform"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#E5DFD3]">
          <div className="space-y-2">
            <div className="text-xs font-mono text-[#2D5B88] tracking-wider uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2D5B88]" aria-hidden="true" />
              <span>LAYER 07 // VERIFIED CREDENTIALS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1D20] tracking-tight font-serif">
              Credentials &amp; Certifications
            </h2>
            <p className="text-sm sm:text-base text-[#575D65] max-w-xl">
              Authentic industry and academic credentials with direct verification links across cloud architecture, AI algorithms, and software fundamentals.
            </p>
          </div>

          {/* Category filter tabs */}
          <div className="flex items-center flex-wrap gap-1.5 p-1.5 bg-[#EFEAE0] rounded-xl border border-[#E5DFD3]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setFilter(cat);
                  setTimeout(() => ScrollTrigger.refresh(), 100);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  filter === cat
                    ? 'bg-white text-[#2D5B88] font-semibold shadow-sm border border-[#E5DFD3]'
                    : 'text-[#575D65] hover:text-[#1A1D20]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Certificate Cards Grid (Multi-directional Parallax) */}
        <div
          ref={gridRef}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              className="cert-card flex flex-col justify-between rounded-2xl bg-white border border-[#E5DFD3] hover:border-[#D4CBBC] p-6 transition-colors shadow-paper hover:shadow-paper-elevated will-change-transform"
            >
              <div className="space-y-4">
                {/* Certificate Seal Frame */}
                <div className="h-36 rounded-xl bg-[#FBF9F5] border border-[#E5DFD3] p-4 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                  <div className={`p-2.5 rounded-full border mb-2 ${getBadgeColor(cert.category)}`}>
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-semibold text-[#1A1D20] max-w-[200px] truncate font-serif">
                    {cert.issuer}
                  </div>
                  <div className="text-[11px] font-mono text-[#858D98]">
                    {cert.category}
                  </div>
                  <div className="absolute bottom-1.5 right-2 text-[9px] font-mono text-[#858D98]">
                    ImageKit Slot: Verified
                  </div>
                </div>

                {/* Metadata Line */}
                <div className="flex items-center justify-between text-xs font-mono text-[#575D65]">
                  <span className="text-[#2D5B88] font-semibold">{cert.issuer}</span>
                  {cert.dateAwarded && <span>{cert.dateAwarded}</span>}
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-[#1A1D20] leading-snug font-serif">
                  {cert.title}
                </h3>

                {/* Description */}
                {cert.description && (
                  <p className="text-xs text-[#575D65] leading-relaxed">
                    {cert.description}
                  </p>
                )}

                {/* Credential ID */}
                {cert.credentialId && (
                  <div className="text-[11px] font-mono text-[#858D98] truncate bg-[#F7F4EE] px-2.5 py-1 rounded border border-[#E5DFD3]">
                    ID: {cert.credentialId}
                  </div>
                )}
              </div>

              {/* Card Footer: Verification Link */}
              <div className="mt-6 pt-4 border-t border-[#E5DFD3] flex items-center justify-between">
                {cert.verificationUrl ? (
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#2D5B88] hover:text-[#1E3F61] hover:underline underline-offset-2 transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#2D5B88]" />
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-xs font-mono text-[#858D98]">
                    Verification Link: Pending Input
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
