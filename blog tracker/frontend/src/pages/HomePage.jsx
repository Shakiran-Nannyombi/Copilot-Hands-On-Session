import { Link } from 'react-router-dom';
import SiteHeader from '../components/SiteHeader';
import { projects } from '../content';

export default function HomePage() {
  const featured = projects.slice(0, 4);

  return (
    <main>
      <SiteHeader />
      <section className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div className="space-y-5">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-bloom">Workshop hub</p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Build with GitHub Copilot — agentic mode &amp; CLI
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-mist/75 sm:text-lg">
            This session is more than one demo. Explore every workshop build, copy a ready Copilot
            prompt, and follow the step-by-step guide.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/tutorial"
              className="rounded-xl bg-bloom px-5 py-3 text-sm font-semibold text-white shadow-glow hover:bg-purple-500"
            >
              Open tutorial
            </Link>
            <Link
              to="/projects"
              className="rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-mist hover:border-bloom/50"
            >
              Browse all projects
            </Link>
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl border border-white/10 shadow-glow">
          <img src="/banner.png" alt="Copilot agentic workshop banner" className="h-full w-full object-cover" />
        </div>
      </section>

      <section className="mt-12 sm:mt-16">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold text-white">Session builds</h2>
            <p className="mt-1 text-sm text-mist/65">A sample of what the room shipped with Copilot.</p>
          </div>
          <Link to="/projects" className="text-sm font-medium text-glow hover:text-white">
            View all →
          </Link>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2">
          {featured.map((project) => (
            <li
              key={project.name}
              className="rounded-2xl border border-white/10 bg-panel/70 p-5 transition hover:border-bloom/40"
            >
              <h3 className="font-display text-lg font-semibold text-white">{project.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist/70">{project.blurb}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-grape/50 px-2.5 py-1 text-xs font-medium text-glow"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
