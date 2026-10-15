import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ProjectModal } from './components/ProjectModal';
import { SkillsSection } from './components/SkillsSection';
import { ResearchSection } from './components/ResearchSection';
import { ExperienceEducation } from './components/ExperienceEducation';
import { CertificatesSection } from './components/CertificatesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WatercolorWaterBackground } from './components/WatercolorWaterBackground';
import { Project } from './types/portfolio';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { useLayeredStacking } from './hooks/useLayeredStacking';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { scrollTo } = useSmoothScroll();

  // Activate clean paper sheet layer stacking
  useLayeredStacking();

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#1A1D20] selection:bg-[#E8DCC4] selection:text-[#1A1D20] overflow-x-clip font-sans relative">
      {/* Interactive Living Watercolor Water-Flow Background (ambient river + reactive ripple overlay) */}
      <WatercolorWaterBackground />

      {/* 3-Zone Top Navigation with Lenis smooth anchor scrolling */}
      <Navbar
        onContactClick={() => scrollTo('#contact')}
        onNavigate={(href) => scrollTo(href)}
      />

      <main id="main-content" className="relative z-10">
        {/* Layer 01: Introduction & Cinematic Hero (Kept completely untouched) */}
        <section
          id="layer-hero"
          className="cinematic-layer relative z-10 bg-[#F7F4EE]"
        >
          <Hero
            onExploreClick={() => scrollTo('#projects')}
            onResearchClick={() => scrollTo('#research')}
          />
        </section>

        {/* Layer 02: Identity & About (Slides directly on top of Layer 01) */}
        <section
          id="layer-about"
          className="cinematic-layer relative z-20 bg-[#FBF9F5] rounded-t-[32px] sm:rounded-t-[44px] border-t border-[#E5DFD3] shadow-paper-deck"
        >
          {/* Subtle warm terracotta watercolor hairline wash */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#BA5A3A]/30 to-transparent" />
          <AboutSection />
        </section>

        {/* Layer 03: Selected Work (Contains pinned project cards with overlapping layers) */}
        <section
          id="layer-projects"
          className="cinematic-layer relative z-30 bg-[#F7F4EE] rounded-t-[32px] sm:rounded-t-[44px] border-t border-[#E5DFD3] shadow-paper-deck"
        >
          {/* Subtle deep cobalt watercolor hairline wash */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#2D5B88]/30 to-transparent" />
          <ProjectsSection onSelectProject={(project) => setSelectedProject(project)} />
        </section>

        {/* Layer 04: Technical Capabilities */}
        <section
          id="layer-skills"
          className="cinematic-layer relative z-40 bg-[#FBF9F5] rounded-t-[32px] sm:rounded-t-[44px] border-t border-[#E5DFD3] shadow-paper-deck"
        >
          {/* Subtle sage green watercolor hairline wash */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#4D7266]/30 to-transparent" />
          <SkillsSection />
        </section>

        {/* Layer 05: Academic Research (IEEE SCSE 2026) */}
        <section
          id="layer-research"
          className="cinematic-layer relative z-50 bg-[#F7F4EE] rounded-t-[32px] sm:rounded-t-[44px] border-t border-[#E5DFD3] shadow-paper-deck"
        >
          {/* Subtle terracotta / umber watercolor hairline wash */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#BA5A3A]/35 to-transparent" />
          <ResearchSection />
        </section>

        {/* Layer 06: Career & Academic Progression Timeline */}
        <section
          id="layer-experience"
          className="cinematic-layer relative z-60 bg-[#FBF9F5] rounded-t-[32px] sm:rounded-t-[44px] border-t border-[#E5DFD3] shadow-paper-deck"
        >
          {/* Subtle ochre watercolor hairline wash */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C4883A]/35 to-transparent" />
          <ExperienceEducation />
        </section>

        {/* Layer 07: Verified Credentials & Certifications */}
        <section
          id="layer-certificates"
          className="cinematic-layer relative z-70 bg-[#F7F4EE] rounded-t-[32px] sm:rounded-t-[44px] border-t border-[#E5DFD3] shadow-paper-deck"
        >
          {/* Subtle cobalt watercolor hairline wash */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#2D5B88]/35 to-transparent" />
          <CertificatesSection />
        </section>

        {/* Layer 08: Initiate Dialogue / Contact & Footer */}
        <section
          id="layer-contact"
          className="cinematic-layer relative z-80 bg-[#FBF9F5] rounded-t-[32px] sm:rounded-t-[44px] border-t border-[#E5DFD3] shadow-paper-deck"
        >
          {/* Subtle rose / terracotta watercolor hairline wash */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#B86576]/35 to-transparent" />
          <ContactSection />
          <Footer />
        </section>
      </main>

      {/* Detailed Project Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
