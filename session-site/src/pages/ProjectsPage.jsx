import SiteHeader from '../components/SiteHeader';
import { projects } from '../content';

export default function ProjectsPage() {
  return (
    <main>
      <SiteHeader />
      <div className="mb-8 max-w-3xl space-y-3">
        <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">All workshop projects</h1>
        <p className="text-mist/75">
          Copilot Hands-On produced multiple apps and kits — not just Blog Tracker. Explore each folder
          in the repo and use them as references for your own agentic builds.
        </p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <li
            key={project.name}
            className="flex h-full flex-col rounded-2xl border border-white/10 bg-panel/70 p-5"
          >
            <h2 className="font-display text-lg font-semibold text-white">{project.name}</h2>
            <p className="mt-1 font-mono text-xs text-bloom/80">{project.folder}</p>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-mist/70">{project.blurb}</p>
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
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex text-sm font-semibold text-glow hover:text-white"
              >
                Live demo →
              </a>
            ) : (
              <p className="mt-5 text-xs text-mist/45">See folder in repository</p>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
