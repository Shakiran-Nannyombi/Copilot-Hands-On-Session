import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/events', label: 'Events' },
  { to: '/organizers', label: 'Organizers' },
  { to: '/about', label: 'About' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="bg-white shadow-sm border-b border-lavender-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <span className="text-xl font-bold text-lavender-700">
              Health<span className="text-lavender-400">Club</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  location.pathname === to
                    ? 'bg-lavender-100 text-lavender-700'
                    : 'text-lavender-600 hover:bg-lavender-50 hover:text-lavender-700'
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              to="/events/new"
              className="ml-4 px-5 py-2 bg-lavender-600 text-white rounded-full text-sm font-medium hover:bg-lavender-700 transition-colors shadow-sm"
            >
              + New Event
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden p-2 rounded-lg text-lavender-600 hover:bg-lavender-50"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-lavender-100 px-4 pb-4 pt-2 flex flex-col gap-1">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === to
                  ? 'bg-lavender-100 text-lavender-700'
                  : 'text-lavender-600 hover:bg-lavender-50'
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            to="/events/new"
            onClick={() => setMenuOpen(false)}
            className="mt-2 px-4 py-2 bg-lavender-600 text-white rounded-lg text-sm font-medium text-center hover:bg-lavender-700 transition-colors"
          >
            + New Event
          </Link>
        </div>
      )}
    </nav>
  );
}
