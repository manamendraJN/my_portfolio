import React, { useState } from 'react';
import { ExternalLink, Github, ArrowUpRight, Layers } from 'lucide-react';
import { projectsData } from '../data/portfolioData';
import { Project } from '../types/portfolio';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Full-Stack',
    'Computer Vision & AI',
    'Enterprise / Systems',
    'Collaboration',
  ];

  const filteredProjects = activeCategory === 'All'
    ? projectsData
    : projectsData.filter((p) => p.category === activeCategory);

  // Artistic watercolor wash palette for projects
  const getProjectWash = (index: number) => {
    const washes = [
      'from-[#2D5B88]/15 via-[#2D5B88]/5 to-transparent',
      'from-[#BA5A3A]/15 via-[#BA5A3A]/5 to-transparent',
      'from-[#4D7266]/15 via-[#4D7266]/5 to-transparent',
      'from-[#C4883A]/15 via-[#C4883A]/5 to-transparent',
      'from-[#B86576]/15 via-[#B86576]/5 to-transparent',
    ];
    return washes[index % washes.length];
  };

  const getProjectAccent = (category: string) => {
    switch (category) {
      case 'Computer Vision & AI':
        return 'text-[#BA5A3A] bg-[#BA5A3A]/10 border-[#BA5A3A]/20';
      case 'Enterprise / Systems':
        return 'text-[#2D5B88] bg-[#2D5B88]/10 border-[#2D5B88]/20';
      case 'Collaboration':
        return 'text-[#4D7266] bg-[#4D7266]/10 border-[#4D7266]/20';
      default:
        return 'text-[#C4883A] bg-[#C4883A]/10 border-[#C4883A]/20';
    }
  };

  return (
    <div id="projects" className="py-20 lg:py-28 bg-[#F7F4EE]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#E5DFD3]">
          <div className="space-y-2">
            <div className="text-xs font-mono text-[#2D5B88] tracking-wider uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2D5B88]" aria-hidden="true" />
              <span>LAYER 03 // ARTISANAL PROJECT GALLERY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1D20] tracking-tight font-serif">
              Selected Works
            </h2>
            <p className="text-sm sm:text-base text-[#575D65] max-w-xl">
              Each project panel stacks progressively on fine cotton paper as you scroll, revealing system architectures and verified outcomes.
            </p>
          </div>

          {/* Interactive Filter Segmented Controls */}
          <div className="flex items-center flex-wrap gap-1.5 p-1.5 bg-[#FFFFFF] rounded-xl border border-[#E5DFD3] shadow-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#F7F4EE] text-[#2D5B88] font-semibold border border-[#E5DFD3] shadow-xs'
                    : 'text-[#575D65] hover:text-[#1A1D20]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Pinned Sections with Overlapping Parallax Layers (Tactile Paper Deck) */}
        <div className="relative pt-12 space-y-12 lg:space-y-16">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="sticky transition-all duration-200"
              style={{
                top: `clamp(75px, ${72 + index * 18}px, 155px)`,
                zIndex: 10 + index,
              }}
            >
              <div className="rounded-2xl bg-[#FFFFFF] border border-[#E5DFD3] shadow-paper-elevated p-7 sm:p-9 lg:p-10 transition-colors hover:border-[#D4CBBC] relative overflow-hidden group">
                {/* Top Accent Hairline with watercolor wash gradient */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#2D5B88]/30 to-transparent" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left 7 cols: Content & Storytelling */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-3 text-xs font-mono text-[#575D65]">
                      <span className="text-[#2D5B88] font-semibold">
                        DECK SHEET 0{index + 1}
                      </span>
                      <span aria-hidden="true" className="text-[#D4CBBC]">·</span>
                      <span className={`px-2 py-0.5 rounded text-[11px] ${getProjectAccent(project.category)}`}>
                        {project.category}
                      </span>
                      {project.reportedOutcome && (
                        <>
                          <span aria-hidden="true" className="text-[#D4CBBC]">·</span>
                          <span className="text-[#7E8590]">Verified Outcome</span>
                        </>
                      )}
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-[#1A1D20] font-serif">
                      {project.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#575D65] leading-relaxed">
                      {project.shortDescription}
                    </p>

                    {/* Specific Contribution Box with warm paper surface */}
                    <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#E5DFD3] space-y-1 shadow-inner">
                      <div className="text-[10px] font-mono text-[#BA5A3A] uppercase tracking-wider font-semibold">
                        My Engineering Contribution
                      </div>
                      <p className="text-xs text-[#1A1D20] leading-relaxed">
                        {project.myContribution}
                      </p>
                    </div>

                    {/* Tech Stack (Unboxed monospace text) */}
                    <div className="pt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-mono text-[#575D65]">
                      {project.technologies.map((tech, idx) => (
                        <React.Fragment key={tech}>
                          <span className="text-[#1A1D20] font-medium">{tech}</span>
                          {idx < project.technologies.length - 1 && (
                            <span className="text-[#D4CBBC]" aria-hidden="true">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Right 5 cols: Organic Watercolor Masked Frame with Inner Depth */}
                  <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-4">
                    <div className="h-56 sm:h-64 rounded-xl bg-[#F7F4EE] border border-[#E5DFD3] p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group-hover:border-[#D4CBBC] transition-colors shadow-paper">
                      {/* Layered watercolor wash overlay inside frame */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${getProjectWash(index)} pointer-events-none`} />

                      {/* Hand-drawn organic border shape */}
                      <div className="p-3.5 rounded-full bg-[#FFFFFF] text-[#2D5B88] border border-[#E5DFD3] mb-3 group-hover:scale-105 transition-transform duration-300 shadow-sm relative z-10">
                        <Layers className="w-6 h-6" />
                      </div>
                      <div className="text-sm font-bold text-[#1A1D20] font-serif relative z-10">
                        {project.name} Interface
                      </div>
                      <div className="text-xs font-mono text-[#575D65] mt-1 relative z-10">
                        {project.category}
                      </div>
                      <div className="text-[10px] font-mono text-[#7E8590] mt-2 relative z-10">
                        ImageKit Slot: Verified Layout
                      </div>
                    </div>

                    {project.reportedOutcome && (
                      <div className="p-3.5 rounded-lg bg-[#FBF9F5] border border-[#E5DFD3] text-xs text-[#575D65] shadow-xs">
                        <span className="text-[#BA5A3A] font-semibold">Reported Outcome: </span>
                        {project.reportedOutcome}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="mt-6 pt-5 border-t border-[#E5DFD3] flex flex-wrap items-center justify-between gap-4">
                  <button
                    onClick={() => onSelectProject(project)}
                    className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#2D5B88] hover:bg-[#23486c] rounded-lg transition-colors cursor-pointer shadow-sm hover:shadow"
                  >
                    <span>Inspect Case Study &amp; Architecture</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-4">
                    {project.repositoryUrl && (
                      <a
                        href={project.repositoryUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-xs font-mono text-[#575D65] hover:text-[#1A1D20] transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span>Repository</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-xs font-mono text-[#BA5A3A] font-semibold hover:underline transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
