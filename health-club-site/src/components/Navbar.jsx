import { useState } from 'react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Events', href: '#events' },
  { label: 'Organizers', href: '#organizers' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-[#ddd6fe]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <span className="font-bold text-xl text-[#6d28d9] tracking-tight">
              Bloom Health Club
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#6d28d9] hover:text-[#4c1d95] font-medium transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="ml-2 bg-[#7c3aed] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#6d28d9] transition-colors duration-200"
            >
              Join Us
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-[#7c3aed] focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#f5f3ff] border-t border-[#ddd6fe] px-4 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[#6d28d9] font-medium hover:text-[#4c1d95]"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-[#7c3aed] text-white px-4 py-2 rounded-full text-sm font-semibold text-center hover:bg-[#6d28d9]"
            onClick={() => setMenuOpen(false)}
          >
            Join Us
          </a>
        </div>
      )}
    </nav>
  );
}
