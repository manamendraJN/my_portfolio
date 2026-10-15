import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, AlertCircle } from 'lucide-react';
import { Project } from '../types/portfolio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/40 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#FBF9F5] border border-[#E5DFD3] rounded-2xl shadow-paper-elevated overflow-y-auto my-auto p-6 sm:p-8 text-[#1A1D20]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#575D65] hover:text-[#1A1D20] hover:bg-[#EFEAE0] rounded-lg border border-transparent hover:border-[#E5DFD3] transition-colors cursor-pointer"
          aria-label="Close project modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Name */}
        <div className="space-y-2 pr-10">
          <div className="text-xs font-mono text-[#2D5B88] tracking-wider uppercase font-semibold">
            {project.category}
          </div>
          <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-bold text-[#1A1D20] font-serif">
            {project.name}
          </h2>
          <p className="text-sm sm:text-base text-[#575D65] leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        {/* Visual Frame / Watercolor Paper Placeholder */}
        <div className="mt-6 rounded-xl bg-[#F7F4EE] border border-[#E5DFD3] p-6 relative overflow-hidden shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-r from-[#2D5B88]/10 via-[#BA5A3A]/8 to-transparent pointer-events-none" />
          <div className="flex flex-col items-center justify-center py-6 text-center space-y-2 relative z-10">
            <div className="text-xs font-mono text-[#575D65]">
              ARTWORK &amp; IMAGE CONTAINER
            </div>
            <div className="text-sm font-bold text-[#1A1D20] font-serif">
              {project.name} Architecture Interface
            </div>
            <div className="text-xs text-[#7E8590] font-mono max-w-md">
              Configured ImageKit slot: <span className="text-[#2D5B88]">placeholder mode</span>. Direct production screenshots will render seamlessly on tactile cotton paper.
            </div>
          </div>
        </div>

        {/* Case Study Details Grid */}
        <div className="mt-8 space-y-6 divide-y divide-[#E5DFD3]">
          {/* Problem & Objective */}
          <div className="pt-2 space-y-2">
            <h3 className="text-xs font-mono uppercase text-[#7E8590] tracking-wider font-semibold">
              Problem &amp; Objective
            </h3>
            <p className="text-sm text-[#1A1D20] leading-relaxed">
              {project.problem}
            </p>
          </div>

          {/* Personal Contribution */}
          <div className="pt-6 space-y-2">
            <h3 className="text-xs font-mono uppercase text-[#BA5A3A] tracking-wider font-semibold">
              My Specific Contribution
            </h3>
            <p className="text-sm text-[#1A1D20] leading-relaxed">
              {project.myContribution}
            </p>
          </div>

          {/* Core Features */}
          <div className="pt-6 space-y-3">
            <h3 className="text-xs font-mono uppercase text-[#7E8590] tracking-wider font-semibold">
              System Features &amp; Engineering Scope
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[#575D65]">
                  <CheckCircle2 className="w-4 h-4 text-[#4D7266] shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reported Outcome if present */}
          {project.reportedOutcome && (
            <div className="pt-6 space-y-2">
              <h3 className="text-xs font-mono uppercase text-[#7E8590] tracking-wider font-semibold">
                Reported Project Outcome
              </h3>
              <div className="p-3.5 rounded-lg bg-[#FFFFFF] border border-[#E5DFD3] flex items-start gap-3 shadow-sm">
                <AlertCircle className="w-4 h-4 text-[#BA5A3A] shrink-0 mt-0.5" />
                <p className="text-xs text-[#575D65] leading-relaxed">
                  <span className="text-[#1A1D20] font-semibold">Outcome note:</span> {project.reportedOutcome}
                </p>
              </div>
            </div>
          )}

          {/* Technology Stack */}
          <div className="pt-6 space-y-3">
            <h3 className="text-xs font-mono uppercase text-[#7E8590] tracking-wider font-semibold">
              Technologies &amp; Architecture
            </h3>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-mono text-[#575D65]">
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
        </div>

        {/* Action Buttons: Repository & Live Demo */}
        <div className="mt-8 pt-6 border-t border-[#E5DFD3] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {project.repositoryUrl && (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#1A1D20] bg-[#FFFFFF] hover:bg-[#EFEAE0] border border-[#E5DFD3] rounded-lg transition-colors shadow-sm"
              >
                <Github className="w-4 h-4" />
                <span>View GitHub Repository</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#BA5A3A] hover:bg-[#a84e31] rounded-lg transition-colors shadow-sm"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Launch Live Demo</span>
              </a>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-medium text-[#575D65] hover:text-[#1A1D20] transition-colors cursor-pointer"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
