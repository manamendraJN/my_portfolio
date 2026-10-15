import React, { useRef, useEffect } from 'react';
import { Briefcase, GraduationCap, AlertCircle, Sparkles } from 'lucide-react';
import { experienceData, educationData } from '../data/portfolioData';
import { gsap } from '../utils/gsapSetup';

export const ExperienceEducation: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const timelineRailRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  const washRef = useRef<HTMLDivElement | null>(null);
  const acadRef = useRef<HTMLDivElement | null>(null);
  const engRef = useRef<HTMLDivElement | null>(null);

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

      // 1. Background Ochre Wash: Moves DOWN and LEFT
      if (washRef.current) {
        scrubTl.fromTo(
          washRef.current,
          { y: -35, x: 25 },
          { y: 45, x: -30, ease: 'none' },
          0
        );
      }

      // 2. Timeline Dynamic Progress Rail: Scroll-Linked Transform (scaleY: 0 -> 1)
      if (timelineRailRef.current && cardsRef.current) {
        gsap.fromTo(
          timelineRailRef.current,
          { scaleY: 0, transformOrigin: 'top' },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              end: 'bottom 60%',
              scrub: true,
            },
          }
        );
      }

      // 3. Experience Cards (Left Column, Multi-Directional Parallax):
      const items = cardsRef.current?.querySelectorAll<HTMLElement>('.timeline-card');
      if (items && items.length > 0) {
        items.forEach((item, idx) => {
          const isEven = idx % 2 === 0;
          scrubTl.fromTo(
            item,
            {
              y: isEven ? 16 : -14,
              x: isEven ? -8 : 8,
            },
            {
              y: isEven ? -16 : 14,
              x: isEven ? 8 : -8,
              ease: 'none',
            },
            0
          );
        });
      }

      // 4. Academic Foundation Card (Right Column, Top): Moves DOWN and RIGHT
      if (acadRef.current) {
        scrubTl.fromTo(
          acadRef.current,
          { y: -16, x: -8 },
          { y: 18, x: 10, ease: 'none' },
          0
        );
      }

      // 5. Engineering Approach Card (Right Column, Bottom): Moves UP and LEFT
      if (engRef.current) {
        scrubTl.fromTo(
          engRef.current,
          { y: 16, x: 8 },
          { y: -18, x: -10, ease: 'none' },
          0
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      id="experience"
      className="relative z-20 py-20 lg:py-28 bg-[#FBF9F5] overflow-hidden"
    >
      {/* Subtle ochre & sage watercolor wash behind timeline (Multi-directional Parallax) */}
      <div
        ref={washRef}
        className="absolute top-1/3 -right-24 w-[550px] h-[500px] wash-ochre rounded-full pointer-events-none will-change-transform opacity-70"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="space-y-3 max-w-3xl mb-16">
          <div className="text-xs font-mono text-[#C4883A] tracking-wider uppercase flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C4883A]" aria-hidden="true" />
            <span>LAYER 06 // CAREER &amp; ACADEMIC PROGRESSION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1D20] tracking-tight font-serif">
            Experience &amp; Education
          </h2>
          <p className="text-sm sm:text-base text-[#575D65]">
            Professional engagements in full-stack engineering and broadcast operations, alongside formal computing education at SLIIT.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Professional Experience (7 cols) with visual timeline rail */}
          <div className="lg:col-span-7 space-y-8 relative">
            <div className="flex items-center gap-2.5 pb-4 border-b border-[#E5DFD3]">
              <Briefcase className="w-4 h-4 text-[#C4883A]" />
              <h3 className="text-lg font-bold text-[#1A1D20] font-serif">
                Professional Experience
              </h3>
            </div>

            <div ref={cardsRef} className="relative pl-6 lg:pl-8 space-y-6">
              {/* Dynamic scroll-progress timeline rail */}
              <div
                className="absolute left-1.5 top-2 bottom-2 w-0.5 bg-[#E5DFD3]"
                aria-hidden="true"
              >
                <div
                  ref={timelineRailRef}
                  className="w-full h-full bg-gradient-to-b from-[#C4883A] to-[#BA5A3A] origin-top will-change-transform shadow-[0_0_8px_rgba(196,136,58,0.4)]"
                />
              </div>

              {experienceData.map((exp) => (
                <div
                  key={exp.id}
                  className={`timeline-card relative rounded-2xl p-6 transition-colors border shadow-paper hover:shadow-paper-elevated will-change-transform ${
                    exp.statusVerified
                      ? 'bg-white border-[#E5DFD3] hover:border-[#D4CBBC]'
                      : 'bg-white/60 border-dashed border-[#D4CBBC]'
                  }`}
                >
                  {/* Timeline node icon */}
                  <div
                    className="absolute -left-[27px] lg:-left-[35px] top-6 w-3.5 h-3.5 rounded-full bg-[#FBF9F5] border-2 border-[#C4883A]"
                    aria-hidden="true"
                  />

                  {/* Top metadata line */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#575D65] pb-3 border-b border-[#E5DFD3]">
                    <span className="text-[#C4883A] font-semibold">{exp.period}</span>
                    <span className="text-[#858D98]">{exp.employmentType}</span>
                  </div>

                  {/* Role & Organization */}
                  <div className="mt-4 space-y-1">
                    <h4 className="text-lg font-bold text-[#1A1D20] font-serif">
                      {exp.role}
                    </h4>
                    <div className="text-sm text-[#575D65] font-medium flex flex-wrap items-center gap-x-2">
                      <span className="text-[#1A1D20] font-semibold">{exp.organization}</span>
                      {exp.affiliationNote && (
                        <>
                          <span className="text-[#D4CBBC]" aria-hidden="true">·</span>
                          <span className="text-xs text-[#858D98]">{exp.affiliationNote}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Context notice for broadcast operations vs software */}
                  {!exp.isSoftwareRole && (
                    <div className="mt-3 text-[11px] font-mono text-[#575D65] bg-[#F7F4EE] px-3 py-1.5 rounded-lg border border-[#E5DFD3]">
                      Operational Scope: Satellite television advertisement playout &amp; mission-critical server operations.
                    </div>
                  )}

                  {/* Unconfirmed details alert notice */}
                  {!exp.statusVerified && (
                    <div className="mt-3 flex items-start gap-2 text-xs text-[#575D65] bg-[#F7F4EE] p-3 rounded-lg border border-[#E5DFD3]">
                      <AlertCircle className="w-4 h-4 text-[#C4883A] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[#1A1D20] font-semibold">Record pending verification:</span> Employment dates and verified technical outcomes for Heritage Crops Plantations are awaiting documentation.
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <p className="mt-4 text-xs sm:text-sm text-[#575D65] leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Skills list */}
                  <div className="mt-4 pt-3 border-t border-[#E5DFD3] flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono text-[#575D65]">
                    {exp.skills.map((skill, idx) => (
                      <React.Fragment key={skill}>
                        <span>{skill}</span>
                        {idx < exp.skills.length - 1 && (
                          <span className="text-[#D4CBBC]" aria-hidden="true">·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Academic Foundation (5 cols) (Multi-Directional Parallax) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-2.5 pb-4 border-b border-[#E5DFD3]">
              <GraduationCap className="w-4 h-4 text-[#2D5B88]" />
              <h3 className="text-lg font-bold text-[#1A1D20] font-serif">
                Academic Foundation
              </h3>
            </div>

            {/* Education Block (Moves DOWN and RIGHT) */}
            <div
              ref={acadRef}
              className="rounded-2xl bg-white border border-[#E5DFD3] p-6 lg:p-7 space-y-5 shadow-paper hover:shadow-paper-elevated transition-colors will-change-transform"
            >
              <div className="flex items-center justify-between text-xs font-mono text-[#575D65] pb-3 border-b border-[#E5DFD3]">
                <span className="text-[#2D5B88] font-semibold">{educationData.status}</span>
                <span className="text-[#858D98]">SLIIT</span>
              </div>

              <div>
                <h4 className="text-lg font-bold text-[#1A1D20] leading-snug font-serif">
                  {educationData.degree}
                </h4>
                <div className="text-xs sm:text-sm text-[#575D65] mt-1 font-medium">
                  {educationData.institution}
                </div>
                <div className="text-xs font-mono text-[#858D98] mt-1">
                  Specialization: {educationData.specialization}
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="text-xs font-mono text-[#858D98] uppercase tracking-wider">
                  Academic Focus &amp; Research
                </div>
                {educationData.notes.map((note, idx) => (
                  <p key={idx} className="text-xs text-[#575D65] leading-relaxed">
                    {note}
                  </p>
                ))}
              </div>

              <div className="pt-4 border-t border-[#E5DFD3] text-xs font-mono text-[#858D98]">
                Expected Graduation: <span className="text-[#1A1D20] font-semibold">{educationData.expectedGraduation}</span>
              </div>
            </div>

            {/* Academic Discipline Highlight Box (Moves UP and LEFT) */}
            <div
              ref={engRef}
              className="rounded-2xl bg-[#F7F4EE] border border-[#E5DFD3] p-6 space-y-4 shadow-paper will-change-transform"
            >
              <div className="text-xs font-mono text-[#2D5B88] uppercase tracking-wider font-semibold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#2D5B88]" />
                <span>Engineering Approach</span>
              </div>
              <p className="text-xs sm:text-sm text-[#575D65] leading-relaxed">
                Applying computer science fundamentals, data structures, and systematic testing to deliver verifiable, maintainable code rather than transient prototypes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
