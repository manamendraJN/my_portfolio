import React, { useRef, useEffect } from 'react';
import { ArrowDown, Github, Linkedin, Sparkles, Terminal, Cpu, GitCommit, CheckCircle2, Code2 } from 'lucide-react';
import { personalProfile } from '../data/portfolioData';
import { gsap } from '../utils/gsapSetup';

interface HeroProps {
  onExploreClick?: () => void;
  onResearchClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onResearchClick }) => {
  const heroRef = useRef<HTMLDivElement | null>(null);

  // Parallax layer refs
  const scrollBgRef = useRef<HTMLDivElement | null>(null);
  const scrollMidRef = useRef<HTMLDivElement | null>(null);
  const scrollFgRef = useRef<HTMLDivElement | null>(null);

  // Hero Coding Parallax Layer Refs
  const codingContainerRef = useRef<HTMLDivElement | null>(null);
  const mainEditorRef = useRef<HTMLDivElement | null>(null);
  const terminalPanelRef = useRef<HTMLDivElement | null>(null);
  const telemetryCardRef = useRef<HTMLDivElement | null>(null);
  const gitBadgeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !heroRef.current) return;

    // Single unified scroll-driven parallax timeline
    // ONLY the 4 requested scroll-driven effects:
    // 1. Multi-Layer Parallax
    // 2. Multi-Directional Parallax
    // 3. Scroll-Linked Transforms
    // 4. Pinned / Overlapping Parallax Layers
    // Hero text stays completely stable (no scroll movement applied to text)
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // 1. Deep Background Layer: Gentle vertical parallax
      if (scrollBgRef.current) {
        scrollTl.to(
          scrollBgRef.current,
          { y: -60, ease: 'none' },
          0
        );
      }

      // 2. Midground Organic Lines: Multi-directional parallax (moves up and slightly left)
      if (scrollMidRef.current) {
        scrollTl.to(
          scrollMidRef.current,
          { y: -100, x: -35, ease: 'none' },
          0
        );
      }

      // 3. Hero Coding Interface Layers (Multi-Layer, Multi-Directional & Scroll-Linked Transforms):
      // Main Code Editor Window: moves vertically with scroll-linked 3D perspective rotation
      if (mainEditorRef.current) {
        scrollTl.to(
          mainEditorRef.current,
          {
            y: -65,
            rotateX: -4,
            rotateY: 3,
            scale: 1.02,
            ease: 'none',
          },
          0
        );
      }

      // Floating Terminal Panel: Multi-directional parallax (moves up and right at accelerated speed)
      if (terminalPanelRef.current) {
        scrollTl.to(
          terminalPanelRef.current,
          {
            y: -115,
            x: 45,
            rotateZ: 3.5,
            ease: 'none',
          },
          0
        );
      }

      // Floating Telemetry Diagnostic Card: Multi-directional parallax (moves up and left)
      if (telemetryCardRef.current) {
        scrollTl.to(
          telemetryCardRef.current,
          {
            y: -50,
            x: -35,
            rotateZ: -2.5,
            scale: 1.03,
            ease: 'none',
          },
          0
        );
      }

      // Floating Git / Deployment Badge: Multi-directional parallax (moves down and right)
      if (gitBadgeRef.current) {
        scrollTl.to(
          gitBadgeRef.current,
          {
            y: 45,
            x: 30,
            rotateZ: 2,
            ease: 'none',
          },
          0
        );
      }

      // 4. Foreground Droplets & Spatter: Fastest multi-directional parallax
      if (scrollFgRef.current) {
        scrollTl.to(
          scrollFgRef.current,
          {
            y: -160,
            x: 50,
            ease: 'none',
          },
          0
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={heroRef}
      id="hero"
      className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-paper-grain flex flex-col justify-between perspective-1400 transform-style-3d select-text"
      style={{
        perspective: '1400px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* =========================================================================
          LAYER 1: DEEP BACKGROUND (Distant Washes, Horizon Line Art & Coordinate Grid)
          Scroll Parallax Speed: ~0.2x
         ========================================================================= */}
      <div
        ref={scrollBgRef}
        className="absolute inset-0 pointer-events-none will-change-transform transform-style-3d"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Soft atmospheric watercolor pigment washes */}
        <div
          className="absolute top-1/6 -left-28 w-[720px] h-[540px] wash-cobalt rounded-full pointer-events-none opacity-85"
          aria-hidden="true"
        />
        <div
          className="absolute -top-24 -right-16 w-[680px] h-[600px] wash-terracotta rounded-full pointer-events-none opacity-75"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-6 left-1/4 w-[560px] h-[460px] wash-sage rounded-full pointer-events-none opacity-65"
          aria-hidden="true"
        />
        <div
          className="absolute top-1/2 right-1/4 w-[420px] h-[340px] wash-ochre rounded-full pointer-events-none opacity-40"
          aria-hidden="true"
        />

        {/* Distant Painted Scenery: Layered Watercolor Landscape Silhouette & Mountain Ridge */}
        <div className="absolute inset-0 flex items-end justify-center pointer-events-none opacity-30">
          <svg
            className="w-full h-72 sm:h-96 object-cover"
            viewBox="0 0 1440 380"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="hillCobaltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2D5B88" stopOpacity="0.22" />
                <stop offset="45%" stopColor="#4D7266" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#F7F4EE" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="hillSageGrad" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#BA5A3A" stopOpacity="0.16" />
                <stop offset="50%" stopColor="#C4883A" stopOpacity="0.09" />
                <stop offset="100%" stopColor="#F7F4EE" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            <path
              d="M -60 260 C 140 210, 320 280, 520 230 C 720 180, 940 250, 1140 200 C 1300 160, 1420 220, 1500 240 L 1500 380 L -60 380 Z"
              fill="url(#hillCobaltGrad)"
            />
            <path
              d="M -40 300 C 180 260, 360 320, 600 270 C 840 220, 1060 290, 1260 250 C 1380 230, 1460 280, 1500 290 L 1500 380 L -40 380 Z"
              fill="url(#hillSageGrad)"
            />

            {/* Fine technical coordinate markings on distant paper canvas */}
            <g opacity="0.35" stroke="#858D98" strokeWidth="0.75" strokeDasharray="3 5">
              <line x1="100" y1="120" x2="1340" y2="120" />
              <line x1="280" y1="40" x2="280" y2="280" />
              <line x1="1160" y1="60" x2="1160" y2="300" />
            </g>

            <text x="100" y="112" fill="#858D98" fontSize="9" fontFamily="monospace" opacity="0.5">
              6.9147° N, 79.9729° E · SLIIT COMPUTING
            </text>
            <text x="1160" y="112" fill="#858D98" fontSize="9" fontFamily="monospace" opacity="0.5">
              IEEE SCSE 2026 · RESEARCH SECTOR 01
            </text>
          </svg>
        </div>
      </div>

      {/* =========================================================================
          LAYER 2: MIDGROUND (Organic Watercolor Ribbons & Botanical Curves)
          Multi-Directional Parallax: translates (x: -35px, y: -100px)
         ========================================================================= */}
      <div
        ref={scrollMidRef}
        className="absolute inset-0 pointer-events-none will-change-transform transform-style-3d"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M -100 200 C 300 130, 620 370, 1180 230 C 1460 160, 1680 320, 2000 210"
            stroke="#BA5A3A"
            strokeWidth="1.2"
            strokeDasharray="4 6"
          />
          <path
            d="M 80 470 C 440 500, 780 360, 1260 430 C 1580 470, 1820 400, 2100 450"
            stroke="#2D5B88"
            strokeWidth="1"
            strokeDasharray="5 7"
          />
          <path
            d="M 200 120 C 500 80, 800 220, 1100 140 C 1400 60, 1650 180, 1900 100"
            stroke="#4D7266"
            strokeWidth="0.8"
            strokeDasharray="2 6"
          />
        </svg>

        {/* Botanical leaf accent sprig on the left */}
        <div className="absolute top-28 left-6 sm:left-12 opacity-50 hidden md:block pointer-events-none">
          <svg width="120" height="240" viewBox="0 0 120 240" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M 20 230 Q 50 150 70 30" stroke="#4D7266" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
            <ellipse cx="65" cy="40" rx="18" ry="9" transform="rotate(-35 65 40)" fill="#4D7266" fillOpacity="0.18" />
            <ellipse cx="38" cy="85" rx="16" ry="8" transform="rotate(25 38 85)" fill="#2D5B88" fillOpacity="0.14" />
            <ellipse cx="68" cy="120" rx="20" ry="10" transform="rotate(-30 68 120)" fill="#4D7266" fillOpacity="0.16" />
          </svg>
        </div>
      </div>

      {/* =========================================================================
          LAYER 3: MAIN COMPOSITE (Editorial Content & Hero Coding Parallax Interface)
          - Left Column: Hero Text (Completely stable in intended position, no drift)
          - Right Column: Cinematic Multi-Layer Coding Parallax Rig
         ========================================================================= */}
      <div className="w-full relative z-20 my-auto pointer-events-auto">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* -------------------------------------------------------------------
                LEFT COLUMN: EDITORIAL CONTENT (Completely Stable, High Readability)
               ------------------------------------------------------------------- */}
            <div className="lg:col-span-6 space-y-7">
              {/* Kicker with warm terracotta dot */}
              <div className="flex items-center gap-2.5 text-xs font-mono text-[#575D65] tracking-wider uppercase select-none">
                <span className="w-2.5 h-2.5 rounded-full bg-[#BA5A3A] shadow-xs" aria-hidden="true" />
                <span className="font-semibold text-[#1A1D20]">Navodya Manamendra</span>
                <span aria-hidden="true" className="text-[#D4CBBC]">·</span>
                <span className="text-[#2D5B88] font-bold">Software Engineer</span>
                <span aria-hidden="true" className="text-[#D4CBBC]">·</span>
                <span>SLIIT IT Honours</span>
              </div>

              {/* Main Editorial Headline */}
              <h1 className="text-3xl sm:text-5xl xl:text-6xl font-bold tracking-tight text-[#1A1D20] leading-[1.1] [text-wrap:balance] font-serif">
                Engineering software. Exploring intelligence.{' '}
                <span className="brush-stroke-underline">
                  <span className="relative z-10">
                    Building what matters.
                  </span>
                </span>
              </h1>

              {/* Lead Narrative */}
              <p className="text-base sm:text-lg text-[#575D65] leading-relaxed font-normal">
                Passionate Full-Stack Developer and Software Engineer pursuing a BSc (Hons) in Information Technology at SLIIT. Focused on practical business architectures, computer vision applications, and peer-reviewed deep learning research.
              </p>

              {/* Action Buttons & Verified Profiles */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={onExploreClick}
                  className="group relative px-6 py-3.5 text-xs sm:text-sm font-semibold text-white bg-[#2D5B88] hover:bg-[#23486c] rounded-xl transition-all whitespace-nowrap shadow-sm hover:shadow-md cursor-pointer overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span>Explore Projects</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </button>

                <button
                  onClick={onResearchClick}
                  className="px-6 py-3.5 text-xs sm:text-sm font-medium text-[#1A1D20] bg-[#FFFFFF] hover:bg-[#F3EFE6] border border-[#E5DFD3] rounded-xl transition-colors whitespace-nowrap cursor-pointer shadow-sm hover:border-[#D4CBBC] flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#BA5A3A]" />
                  <span>IEEE SCSE 2026 Publication</span>
                </button>

                {/* Verified External Links */}
                <div className="flex items-center gap-2.5">
                  <a
                    href={personalProfile.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 text-[#575D65] hover:text-[#1A1D20] bg-[#FFFFFF] border border-[#E5DFD3] rounded-xl hover:border-[#D4CBBC] transition-colors shadow-sm cursor-pointer"
                    aria-label="Navodya Manamendra GitHub Profile"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={personalProfile.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 text-[#575D65] hover:text-[#1A1D20] bg-[#FFFFFF] border border-[#E5DFD3] rounded-xl hover:border-[#D4CBBC] transition-colors shadow-sm cursor-pointer"
                    aria-label="Navodya Manamendra LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------------
                RIGHT COLUMN: CINEMATIC HERO CODING PARALLAX INTERFACE
                - Overlapping dark code editor
                - Syntax-highlighted Python/PyTorch computer vision code
                - Floating terminal execution output panel
                - Floating real-time telemetry card
                - Floating git deployment chip
               ------------------------------------------------------------------- */}
            <div
              ref={codingContainerRef}
              className="lg:col-span-6 relative mt-6 lg:mt-0 perspective-1000 transform-style-3d select-none"
              style={{ perspective: '1200px' }}
            >
              {/* Subtle ambient watercolor halo behind code editor */}
              <div
                className="absolute -inset-4 bg-gradient-to-tr from-[#2D5B88]/20 via-[#BA5A3A]/15 to-[#4D7266]/20 rounded-3xl blur-2xl opacity-60 pointer-events-none"
                aria-hidden="true"
              />

              {/* 1. MAIN CODE EDITOR WINDOW (Primary Layer, Scroll-Linked Transforms & Parallax) */}
              <div
                ref={mainEditorRef}
                className="relative z-20 rounded-2xl bg-[#12161A] border border-[#2D333B] shadow-[0_25px_60px_-15px_rgba(20,15,10,0.35)] overflow-hidden will-change-transform transform-style-3d text-xs font-mono"
                style={{
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'center center',
                }}
              >
                {/* Editor Title Bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-[#1A1F26] border-b border-[#2D333B]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                    <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                    <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
                    <div className="ml-3 flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#12161A] text-[11px] text-[#A8B2C1] border border-[#2D333B]">
                      <Code2 className="w-3 h-3 text-[#5CB9C6]" />
                      <span>scse_dual_view_extractor.py</span>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 text-[10px] text-[#6E7687]">
                    <span className="px-1.5 py-0.5 rounded bg-[#21262D] text-[#8B949E]">Python 3.11</span>
                    <span>UTF-8</span>
                  </div>
                </div>

                {/* Editor Code Content with High-Fidelity Syntax Highlighting */}
                <div className="p-4 sm:p-5 text-[11px] sm:text-xs leading-relaxed overflow-x-hidden font-mono bg-[#12161A]/95 text-[#D1D5DB]">
                  <div className="space-y-1">
                    <p className="text-[#6E7687] italic"># IEEE SCSE 2026 Published Architecture</p>
                    <p className="text-[#6E7687] italic"># Dual-view anthropometric keypoint regression</p>
                    <p>
                      <span className="text-[#BA5A3A] font-semibold">import</span>{' '}
                      <span className="text-[#E5C07B]">torch</span>
                      <span className="text-[#858D98]">,</span>{' '}
                      <span className="text-[#E5C07B]">torch.nn</span>{' '}
                      <span className="text-[#BA5A3A]">as</span>{' '}
                      <span className="text-[#E5C07B]">nn</span>
                    </p>
                    <p>
                      <span className="text-[#BA5A3A] font-semibold">from</span>{' '}
                      <span className="text-[#61AFEF]">torchvision.models</span>{' '}
                      <span className="text-[#BA5A3A]">import</span>{' '}
                      <span className="text-[#5CB9C6]">efficientnet_b3</span>
                    </p>
                    <p className="h-1.5" />
                    <p>
                      <span className="text-[#BA5A3A] font-semibold">class</span>{' '}
                      <span className="text-[#61AFEF] font-bold">DualViewExtractor</span>
                      <span className="text-[#858D98]">(</span>
                      <span className="text-[#E5C07B]">nn.Module</span>
                      <span className="text-[#858D98]">):</span>
                    </p>
                    <p className="pl-4">
                      <span className="text-[#BA5A3A] font-semibold">def</span>{' '}
                      <span className="text-[#5CB9C6]">__init__</span>
                      <span className="text-[#858D98]">(self, landmarks: </span>
                      <span className="text-[#C4883A]">int = 32</span>
                      <span className="text-[#858D98]">):</span>
                    </p>
                    <p className="pl-8 text-[#A8B2C1]">
                      self.backbone = <span className="text-[#5CB9C6]">efficientnet_b3</span>(pretrained=<span className="text-[#BA5A3A]">True</span>).features
                    </p>
                    <p className="pl-8 text-[#A8B2C1]">
                      self.pool = nn.<span className="text-[#5CB9C6]">AdaptiveAvgPool2d</span>((<span className="text-[#C4883A]">1, 1</span>))
                    </p>
                    <p className="pl-8 text-[#A8B2C1]">
                      self.cross_attn = nn.<span className="text-[#5CB9C6]">MultiheadAttention</span>(embed_dim=<span className="text-[#C4883A]">1536</span>, num_heads=<span className="text-[#C4883A]">8</span>)
                    </p>
                    <p className="pl-8 text-[#A8B2C1]">
                      self.regressor = nn.<span className="text-[#5CB9C6]">Linear</span>(<span className="text-[#C4883A]">1536 * 2</span>, landmarks * <span className="text-[#C4883A]">3</span>)
                    </p>
                    <p className="h-1.5" />
                    <p className="pl-4">
                      <span className="text-[#BA5A3A] font-semibold">def</span>{' '}
                      <span className="text-[#5CB9C6]">forward</span>
                      <span className="text-[#858D98]">(self, front_view, side_view):</span>
                    </p>
                    <p className="pl-8 text-[#A8B2C1]">
                      f_feat = self.pool(self.backbone(front_view)).<span className="text-[#5CB9C6]">flatten</span>(<span className="text-[#C4883A]">1</span>)
                    </p>
                    <p className="pl-8 text-[#A8B2C1]">
                      s_feat = self.pool(self.backbone(side_view)).<span className="text-[#5CB9C6]">flatten</span>(<span className="text-[#C4883A]">1</span>)
                    </p>
                    <p className="pl-8 text-[#98C379]">
                      <span className="text-[#BA5A3A]">return</span> self.regressor(torch.<span className="text-[#5CB9C6]">cat</span>([f_feat, s_feat], dim=<span className="text-[#C4883A]">1</span>))
                    </p>
                  </div>
                </div>

                {/* Editor Footer Status Line */}
                <div className="flex items-center justify-between px-4 py-2 bg-[#1A1F26] border-t border-[#2D333B] text-[10px] text-[#8B949E]">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[#27C93F]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F]" />
                      PyTorch 2.3 Ready
                    </span>
                    <span>Spaces: 4</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GitCommit className="w-3 h-3 text-[#BA5A3A]" />
                    <span>scse-2026-eval</span>
                  </div>
                </div>
              </div>

              {/* 2. FLOATING TERMINAL OUTPUT PANEL (Multi-Directional Parallax: Translates Up & Right) */}
              <div
                ref={terminalPanelRef}
                className="absolute -top-6 -right-2 sm:-right-6 w-64 sm:w-72 rounded-xl bg-[#0D1117]/95 border border-[#30363D] shadow-[0_20px_45px_-10px_rgba(0,0,0,0.5)] p-3 text-[10px] sm:text-[11px] font-mono text-[#C9D1D9] z-30 will-change-transform pointer-events-none"
                style={{
                  transform: 'translate3d(0, 0, 30px)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#21262D]">
                  <div className="flex items-center gap-1.5 text-[#58A6FF]">
                    <Terminal className="w-3.5 h-3.5" />
                    <span className="font-semibold text-white">scse_eval.zsh</span>
                  </div>
                  <span className="text-[9px] text-[#7EE787] bg-[#238636]/20 px-1.5 py-0.2 rounded border border-[#238636]/40">
                    PASSED
                  </span>
                </div>
                <div className="space-y-1 text-[#8B949E]">
                  <p className="text-white font-medium">
                    <span className="text-[#7EE787]">$</span> python -m scse.eval
                  </p>
                  <p className="text-[#79C0FF]">
                    [LOAD] EfficientNet-B3 (12.2M)
                  </p>
                  <p className="text-[#FFA657]">
                    [GPU] Latency: 11.8ms · FP16
                  </p>
                  <p className="text-[#7EE787] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 inline text-[#7EE787]" />
                    <span>Accuracy: 98.4% (SCSE 2026)</span>
                  </p>
                </div>
              </div>

              {/* 3. FLOATING SYSTEM TELEMETRY CARD (Multi-Directional Parallax: Translates Up & Left) */}
              <div
                ref={telemetryCardRef}
                className="absolute -bottom-6 -left-2 sm:-left-6 w-60 sm:w-68 rounded-xl bg-[#161B22]/95 border border-[#30363D] shadow-[0_20px_45px_-10px_rgba(0,0,0,0.5)] p-3.5 text-xs font-mono z-30 will-change-transform pointer-events-none"
                style={{
                  transform: 'translate3d(0, 0, 40px)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#21262D]">
                  <div className="flex items-center gap-1.5 text-[#FFA657]">
                    <Cpu className="w-3.5 h-3.5" />
                    <span className="font-semibold text-white text-[11px]">SCSE TELEMETRY</span>
                  </div>
                  <span className="text-[9px] font-semibold text-[#58A6FF]">
                    VERIFIED
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div className="p-1.5 rounded bg-[#0D1117] border border-[#21262D]">
                    <div className="text-[#8B949E]">FIT ACCURACY</div>
                    <div className="text-sm font-bold text-[#7EE787] font-mono">98.4%</div>
                  </div>
                  <div className="p-1.5 rounded bg-[#0D1117] border border-[#21262D]">
                    <div className="text-[#8B949E]">INFERENCE</div>
                    <div className="text-sm font-bold text-[#79C0FF] font-mono">11.8ms</div>
                  </div>
                  <div className="p-1.5 rounded bg-[#0D1117] border border-[#21262D]">
                    <div className="text-[#8B949E]">LANDMARKS</div>
                    <div className="text-sm font-bold text-white font-mono">32 Points</div>
                  </div>
                  <div className="p-1.5 rounded bg-[#0D1117] border border-[#21262D]">
                    <div className="text-[#8B949E]">BACKBONE</div>
                    <div className="text-sm font-bold text-[#FFA657] font-mono">EffNet-B3</div>
                  </div>
                </div>
              </div>

              {/* 4. FLOATING GIT DEPLOYMENT CHIP (Multi-Directional Parallax: Translates Down & Right) */}
              <div
                ref={gitBadgeRef}
                className="absolute bottom-2 right-2 sm:right-6 rounded-lg bg-[#21262D]/95 border border-[#30363D] px-3 py-1.5 text-[10px] font-mono text-[#C9D1D9] shadow-lg flex items-center gap-2 z-30 will-change-transform pointer-events-none"
                style={{
                  transform: 'translate3d(0, 0, 50px)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <GitCommit className="w-3 h-3 text-[#27C93F]" />
                <span>commit 7f3b89a · scse:main</span>
              </div>
            </div>

          </div>

          {/* Full-Width Discipline Anchor Row Below Narrative */}
          <div className="mt-12 lg:mt-16 pt-8 border-t border-[#E5DFD3] grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5DFD3] shadow-sm hover:border-[#D4CBBC] transition-colors">
              <div className="text-2xl lg:text-3xl font-extrabold text-[#1A1D20] font-mono tabular-nums">
                05
              </div>
              <div className="text-xs text-[#575D65] mt-1 font-medium">
                Software Systems Built
              </div>
              <div className="text-[11px] font-mono text-[#7E8590] mt-0.5">
                MERN · Python · Spring Boot
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5DFD3] shadow-sm hover:border-[#D4CBBC] transition-colors">
              <div className="text-2xl lg:text-3xl font-extrabold text-[#BA5A3A] font-mono tabular-nums">
                01
              </div>
              <div className="text-xs text-[#575D65] mt-1 font-medium">
                IEEE Published Research
              </div>
              <div className="text-[11px] font-mono text-[#7E8590] mt-0.5">
                SCSE 2026 · Computer Vision
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5DFD3] shadow-sm hover:border-[#D4CBBC] transition-colors">
              <div className="text-2xl lg:text-3xl font-extrabold text-[#2D5B88] font-mono tabular-nums">
                09
              </div>
              <div className="text-xs text-[#575D65] mt-1 font-medium">
                Technical Credentials
              </div>
              <div className="text-[11px] font-mono text-[#7E8590] mt-0.5">
                AWS · HackerRank · SoloLearn
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5DFD3] shadow-sm hover:border-[#D4CBBC] transition-colors">
              <div className="text-2xl lg:text-3xl font-extrabold text-[#1A1D20] font-mono tabular-nums">
                SLIIT
              </div>
              <div className="text-xs text-[#575D65] mt-1 font-medium">
                BSc (Hons) IT Undergraduate
              </div>
              <div className="text-[11px] font-mono text-[#7E8590] mt-0.5">
                Colombo, Sri Lanka
              </div>
            </div>
          </div>

          {/* Clean Scroll prompt without unnecessary animations */}
          <div className="mt-8 flex items-center justify-between text-xs font-mono text-[#7E8590]">
            <button
              onClick={onExploreClick}
              className="flex items-center gap-2 hover:text-[#2D5B88] transition-colors cursor-pointer"
              aria-label="Scroll to projects showcase"
            >
              <span>SCROLL TO DISCOVER</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>

            <div className="hidden sm:flex items-center gap-2 text-[10px] text-[#7E8590] bg-[#FFFFFF] border border-[#E5DFD3] px-3 py-1 rounded-full shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D5B88]" />
              <span>SCROLL-LINKED PARALLAX RIG</span>
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================================
          LAYER 4: FOREGROUND (Translucent Droplets, Watercolor Caustic Rings & Spatter)
          Multi-Directional Parallax: translates (x: 50px, y: -160px)
         ========================================================================= */}
      <div
        ref={scrollFgRef}
        className="absolute inset-0 pointer-events-none will-change-transform transform-style-3d overflow-hidden"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Floating Translucent Pigment Orb 1: Cobalt with specular highlight (Top Left) */}
        <div
          className="absolute top-1/5 left-1/12 w-14 h-14 rounded-full pointer-events-none will-change-transform"
          style={{
            background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.85) 0%, rgba(45,91,136,0.28) 40%, rgba(45,91,136,0.10) 70%, transparent 100%)',
            boxShadow: '0 8px 24px -4px rgba(45,91,136,0.22)',
          }}
          aria-hidden="true"
        />

        {/* Floating Translucent Pigment Orb 2: Terracotta Warm Sunburst (Bottom Right) */}
        <div
          className="absolute bottom-1/4 right-1/10 w-20 h-20 rounded-full pointer-events-none will-change-transform hidden sm:block"
          style={{
            background: 'radial-gradient(circle at 40% 30%, rgba(255,255,255,0.9) 0%, rgba(186,90,58,0.25) 45%, rgba(186,90,58,0.08) 75%, transparent 100%)',
            boxShadow: '0 12px 30px -6px rgba(186,90,58,0.20)',
          }}
          aria-hidden="true"
        />

        {/* Floating Translucent Pigment Orb 3: Sage Drop (Mid-Right) */}
        <div
          className="absolute top-2/5 right-1/4 w-10 h-10 rounded-full pointer-events-none will-change-transform"
          style={{
            background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.85) 0%, rgba(77,114,102,0.30) 45%, rgba(77,114,102,0.08) 80%, transparent 100%)',
            boxShadow: '0 6px 18px -3px rgba(77,114,102,0.18)',
          }}
          aria-hidden="true"
        />

        {/* Floating Watercolor Caustic Ring */}
        <div
          className="absolute top-1/3 left-1/3 w-32 h-32 rounded-full border border-[#2D5B88]/15 pointer-events-none will-change-transform hidden lg:block"
          style={{
            boxShadow: 'inset 0 0 16px rgba(45,91,136,0.08), 0 0 20px rgba(45,91,136,0.06)',
            transform: 'rotate(-15deg)',
          }}
          aria-hidden="true"
        />

        {/* Fine Crystalline Watercolor Spatter Particles */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="160" cy="180" r="2.5" fill="#BA5A3A" fillOpacity="0.4" />
          <circle cx="175" cy="195" r="1.5" fill="#BA5A3A" fillOpacity="0.3" />
          <circle cx="980" cy="220" r="3" fill="#2D5B88" fillOpacity="0.35" />
          <circle cx="1005" cy="245" r="1.8" fill="#2D5B88" fillOpacity="0.25" />
          <circle cx="340" cy="620" r="2.8" fill="#4D7266" fillOpacity="0.3" />
          <circle cx="1200" cy="480" r="3.2" fill="#C4883A" fillOpacity="0.35" />
        </svg>
      </div>
    </div>
  );
};
