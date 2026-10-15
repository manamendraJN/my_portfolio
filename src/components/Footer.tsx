import React from 'react';
import { ArrowUp, Github, Linkedin } from 'lucide-react';
import { personalProfile } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-[#E5DFD3] bg-[#EFEAE0] text-[#575D65]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Quiet Brand & Copyright */}
        <div className="space-y-1 text-center md:text-left">
          <div className="text-sm font-bold text-[#1A1D20] font-serif">
            Navodya Manamendra
          </div>
          <div className="text-xs font-mono text-[#858D98]">
            Software Engineer &amp; Full-Stack Developer · Colombo, Sri Lanka
          </div>
        </div>

        {/* Center: Essential Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono">
          <a href="#projects" className="hover:text-[#2D5B88] transition-colors">
            Projects
          </a>
          <a href="#research" className="hover:text-[#2D5B88] transition-colors">
            Research
          </a>
          <a href="#experience" className="hover:text-[#2D5B88] transition-colors">
            Experience
          </a>
          <a href="#skills" className="hover:text-[#2D5B88] transition-colors">
            Skills
          </a>
          <a href="#certificates" className="hover:text-[#2D5B88] transition-colors">
            Credentials
          </a>
        </div>

        {/* Right: Social Links & Back to Top */}
        <div className="flex items-center gap-4">
          <a
            href={personalProfile.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2 bg-white rounded-lg border border-[#E5DFD3] text-[#575D65] hover:text-[#2D5B88] hover:border-[#2D5B88] transition-colors shadow-sm"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={personalProfile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2 bg-white rounded-lg border border-[#E5DFD3] text-[#575D65] hover:text-[#2D5B88] hover:border-[#2D5B88] transition-colors shadow-sm"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <button
            onClick={scrollToTop}
            className="p-2 text-[#575D65] hover:text-[#BA5A3A] bg-white border border-[#E5DFD3] hover:border-[#BA5A3A] rounded-lg transition-colors cursor-pointer shadow-sm"
            aria-label="Scroll back to top of page"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
