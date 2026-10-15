import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onContactClick: () => void;
  onNavigate?: (href: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onContactClick, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Projects', href: '#projects' },
    { label: 'Research', href: '#research' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Credentials', href: '#certificates' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(href);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#E5DFD3] py-3.5 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (onNavigate) onNavigate('#hero');
            else window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-lg lg:text-xl font-bold tracking-tight text-[#1A1D20] hover:text-[#2D5B88] transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 font-display"
        >
          <span>Navodya Manamendra</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#BA5A3A]/70" aria-hidden="true" />
        </a>

        {/* Zone 2: Navigation Links (Clean unboxed typography) */}
        <nav
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#575D65]"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="hover:text-[#1A1D20] transition-colors whitespace-nowrap shrink-0 py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action CTA */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <button
            onClick={onContactClick}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#2D5B88] hover:bg-[#23486c] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm hover:shadow"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#575D65] hover:text-[#1A1D20] transition-colors"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FBF9F5] border-b border-[#E5DFD3] px-6 py-5 space-y-4 shadow-lg">
          <nav className="flex flex-col space-y-3" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleLinkClick(e, link.href);
                }}
                className="text-sm font-medium text-[#575D65] hover:text-[#2D5B88] transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-[#E5DFD3]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onContactClick();
              }}
              className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-[#2D5B88] rounded-lg shadow-sm"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
