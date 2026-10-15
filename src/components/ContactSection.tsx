import React, { useState, useRef, useEffect } from 'react';
import { Send, Github, Linkedin, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { personalProfile } from '../data/portfolioData';
import { gsap } from '../utils/gsapSetup';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error' | 'info';
    text: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const cobaltWashRef = useRef<HTMLDivElement | null>(null);
  const leftColRef = useRef<HTMLDivElement | null>(null);
  const formBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const scrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
        },
      });

      // 1. Background Washes (Multi-Directional):
      // Terracotta wash moves DOWN and RIGHT
      if (glowRef.current) {
        scrubTl.fromTo(
          glowRef.current,
          { y: -30, x: -20 },
          { y: 40, x: 30, ease: 'none' },
          0
        );
      }
      // Cobalt wash moves UP and LEFT
      if (cobaltWashRef.current) {
        scrubTl.fromTo(
          cobaltWashRef.current,
          { y: 30, x: 20 },
          { y: -35, x: -25, ease: 'none' },
          0
        );
      }

      // 2. Left Column (Contact Narrative & Channels): Moves DOWN and LEFT
      if (leftColRef.current) {
        scrubTl.fromTo(
          leftColRef.current,
          { y: -15, x: 8 },
          { y: 18, x: -10, ease: 'none' },
          0
        );
      }

      // 3. Right Column (Contact Form Box): Moves UP and RIGHT (Opposing direction)
      if (formBoxRef.current) {
        scrubTl.fromTo(
          formBoxRef.current,
          { y: 18, x: -8 },
          { y: -20, x: 10, ease: 'none' },
          0
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatusMessage({
        type: 'error',
        text: 'Please provide your name, a valid email address, and message.',
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStatusMessage({
        type: 'success',
        text: 'Message received! In production, this routes to Navodya’s designated email endpoint. For immediate inquiries, connect directly on LinkedIn or inspect repositories on GitHub.',
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 400);
  };

  return (
    <div
      ref={sectionRef}
      id="contact"
      className="relative z-20 py-20 lg:py-28 bg-[#FBF9F5] overflow-hidden"
    >
      {/* Background watercolor washes (Multi-directional Parallax) */}
      <div
        ref={glowRef}
        className="absolute bottom-0 right-1/4 w-[650px] h-[450px] wash-terracotta rounded-full pointer-events-none will-change-transform opacity-70"
        aria-hidden="true"
      />
      <div
        ref={cobaltWashRef}
        className="absolute -top-20 left-10 w-[500px] h-[400px] wash-cobalt rounded-full pointer-events-none will-change-transform opacity-50"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Contact Narrative & Verified Channels (5 cols) (Moves DOWN and LEFT) */}
          <div ref={leftColRef} className="lg:col-span-5 space-y-8 will-change-transform">
            <div className="space-y-3">
              <div className="text-xs font-mono text-[#BA5A3A] tracking-wider uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#BA5A3A]" aria-hidden="true" />
                <span>LAYER 08 // INITIATE DIALOGUE</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1D20] tracking-tight font-serif">
                Get in Touch
              </h2>
              <p className="text-sm sm:text-base text-[#575D65]">
                Interested in discussing full-stack software development, AI/computer vision collaboration, or academic inquiries.
              </p>
            </div>

            {/* Direct Connect Options */}
            <div className="space-y-4 pt-2">
              <a
                href={personalProfile.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-white border border-[#E5DFD3] hover:border-[#2D5B88]/60 transition-colors group shadow-paper hover:shadow-paper-elevated"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-[#F7F4EE] text-[#2D5B88] border border-[#E5DFD3]">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#1A1D20]">
                      LinkedIn Profile
                    </div>
                    <div className="text-xs font-mono text-[#575D65]">
                      navodya-manamendra-35a309248
                    </div>
                  </div>
                </div>
                <span className="text-xs font-mono text-[#2D5B88] font-semibold group-hover:translate-x-1 transition-transform">
                  Connect &rarr;
                </span>
              </a>

              <a
                href={personalProfile.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-white border border-[#E5DFD3] hover:border-[#BA5A3A]/60 transition-colors group shadow-paper hover:shadow-paper-elevated"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-[#F7F4EE] text-[#BA5A3A] border border-[#E5DFD3]">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#1A1D20]">
                      GitHub Repositories
                    </div>
                    <div className="text-xs font-mono text-[#575D65]">
                      manamendraJN
                    </div>
                  </div>
                </div>
                <span className="text-xs font-mono text-[#BA5A3A] font-semibold group-hover:translate-x-1 transition-transform">
                  Inspect Code &rarr;
                </span>
              </a>

              {/* Direct email placeholder note */}
              <div className="p-4 rounded-xl bg-[#F7F4EE] border border-[#E5DFD3] space-y-1 shadow-paper">
                <div className="flex items-center gap-2 text-xs font-mono text-[#575D65] font-semibold">
                  <Mail className="w-4 h-4 text-[#C4883A]" />
                  <span>DIRECT EMAIL CONFIGURATION</span>
                </div>
                <div className="text-xs text-[#575D65] font-mono leading-relaxed">
                  Primary email is set to placeholder mode: <span className="text-[#1A1D20] font-semibold">{personalProfile.emailPlaceholder}</span>. Provide your preferred inbox in production config.
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form (7 cols) (Moves UP and RIGHT) */}
          <div ref={formBoxRef} className="lg:col-span-7 will-change-transform">
            <div className="rounded-2xl bg-white border border-[#E5DFD3] p-7 sm:p-9 space-y-6 shadow-paper-elevated">
              <div className="pb-4 border-b border-[#E5DFD3]">
                <h3 className="text-lg font-bold text-[#1A1D20] font-serif">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-[#575D65] mt-1">
                  Validated contact form with immediate client status feedback.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-mono text-[#575D65]">
                      Your Name <span className="text-[#BA5A3A]">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#FBF9F5] border border-[#E5DFD3] focus:border-[#2D5B88] focus:bg-white rounded-lg text-[#1A1D20] placeholder-[#858D98] outline-none transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-mono text-[#575D65]">
                      Email Address <span className="text-[#BA5A3A]">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#FBF9F5] border border-[#E5DFD3] focus:border-[#2D5B88] focus:bg-white rounded-lg text-[#1A1D20] placeholder-[#858D98] outline-none transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-xs font-mono text-[#575D65]">
                    Subject / Discussion Topic
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Full-Stack Opportunity / Research Discussion"
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#FBF9F5] border border-[#E5DFD3] focus:border-[#2D5B88] focus:bg-white rounded-lg text-[#1A1D20] placeholder-[#858D98] outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-mono text-[#575D65]">
                    Message <span className="text-[#BA5A3A]">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your note here..."
                    className="w-full px-4 py-2.5 text-xs sm:text-sm bg-[#FBF9F5] border border-[#E5DFD3] focus:border-[#2D5B88] focus:bg-white rounded-lg text-[#1A1D20] placeholder-[#858D98] outline-none transition-colors resize-none"
                    required
                  />
                </div>

                {statusMessage && (
                  <div
                    className={`p-3.5 rounded-lg text-xs leading-relaxed flex items-start gap-2.5 ${
                      statusMessage.type === 'success'
                        ? 'bg-[#4D7266]/10 text-[#2B463D] border border-[#4D7266]/30'
                        : 'bg-[#BA5A3A]/10 text-[#7D341D] border border-[#BA5A3A]/30'
                    }`}
                  >
                    {statusMessage.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#4D7266]" />
                    ) : (
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#BA5A3A]" />
                    )}
                    <span>{statusMessage.text}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-white bg-[#BA5A3A] hover:bg-[#a34b2f] disabled:opacity-60 rounded-lg shadow-paper hover:shadow-paper-elevated transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Validating...' : 'Submit Message'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
