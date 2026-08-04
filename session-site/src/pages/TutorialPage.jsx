import { Link } from 'react-router-dom';
import CopyPromptButton from '../components/CopyPromptButton';
import SiteHeader from '../components/SiteHeader';
import { BUILD_STEPS, COPILOT_BUILD_PROMPT, projects } from '../content';

export default function TutorialPage() {
  return (
    <main>
      <SiteHeader />
      <div className="mb-8 max-w-3xl space-y-3">
        <h1 className="font-display text-3xl font-bold text-white sm:text-4xl">Tutorial</h1>
        <p className="text-base leading-relaxed text-mist/75 sm:text-lg">
          Copy a Copilot-ready prompt, then follow the step-by-step guide. The session covers many
          builds — use any of them as your target product.
        </p>
      </div>

      <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr] xl:items-start">
        <section className="space-y-4 rounded-2xl border border-white/10 bg-panel/70 p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-lg font-semibold text-white">Copilot prompt</h2>
            <CopyPromptButton text={COPILOT_BUILD_PROMPT} />
          </div>
          <p className="text-sm text-mist/65">
            Paste into GitHub Copilot Chat / Agent, or use with Copilot CLI planning. Mentions every
            workshop build path so Copilot does not fixate on only Blog Tracker.
          </p>
          <pre className="max-h-[min(32rem,60vh)] overflow-auto rounded-xl border border-white/10 bg-ink/80 p-4 text-xs leading-relaxed text-mist/85 whitespace-pre-wrap sm:text-sm">
            {COPILOT_BUILD_PROMPT}
          </pre>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-lg font-semibold text-white">Step-by-step guide</h2>
          <ol className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
            {BUILD_STEPS.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-white/10 bg-panel/70 p-4 sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-bloom">
                  Step {index + 1}
                </p>
                <h3 className="mt-1 font-medium text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist/70">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <section className="mt-8 rounded-2xl border border-white/10 bg-panel/70 p-5 sm:p-6">
        <h2 className="font-display text-lg font-semibold text-white">Workshop builds to choose from</h2>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project) => (
            <li key={project.name} className="rounded-xl border border-white/10 bg-ink/40 px-3 py-3 text-sm">
              <p className="font-medium text-white">{project.name}</p>
              <p className="mt-1 font-mono text-[11px] text-bloom/80">{project.folder}</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-mist/65">
          Full cards with stacks and demos live on the{' '}
          <Link to="/projects" className="font-semibold text-glow hover:text-white">
            Projects
          </Link>{' '}
          page.
        </p>
      </section>
    </main>
  );
}
