import { Link, NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/projects', label: 'Projects' },
  { to: '/tutorial', label: 'Tutorial' },
];

export default function SiteHeader() {
  return (
    <header className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-5 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
      <Link to="/" className="group flex items-center gap-3">
        <img
          src="/favicon.png"
          alt=""
          width={40}
          height={40}
          className="rounded-xl ring-1 ring-bloom/40 transition group-hover:ring-bloom/70"
        />
        <div>
          <p className="font-display text-lg font-semibold text-white">Copilot Hands-On</p>
          <p className="text-xs text-glow/70">Agentic workflows · CLI · prompts</p>
        </div>
      </Link>
      <nav className="flex flex-wrap gap-2" aria-label="Primary">
        {links.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `rounded-xl px-3.5 py-2 text-sm font-medium transition ${
                isActive
                  ? 'bg-bloom text-white'
                  : 'border border-white/15 text-mist/80 hover:border-bloom/50 hover:text-white'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
