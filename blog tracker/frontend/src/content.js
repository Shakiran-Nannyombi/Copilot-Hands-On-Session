export const projects = [
  {
    name: 'Health Club Site',
    folder: 'health-club-site/',
    blurb: 'React + Vite wellness hub for community events, organizers, gallery, and contact — lavender theme.',
    stack: ['React', 'Vite', 'Tailwind'],
    demo: 'https://shakiran-nannyombi.github.io/Copilot-Hands-On-Session/',
  },
  {
    name: 'Health Club App',
    folder: 'health-club-app/',
    blurb: 'Companion React app for browsing events, organizers, and creating new wellness activities.',
    stack: ['React', 'Vite'],
    demo: null,
  },
  {
    name: "Let's Eat",
    folder: 'lets-Eat/',
    blurb: 'Full-stack restaurant menu designer with multi-restaurant CRUD, categories, and a Vue UI over Flask.',
    stack: ['Vue 3', 'Flask', 'Python'],
    demo: null,
  },
  {
    name: 'Blog Tracker',
    folder: 'blog tracker/',
    blurb: 'Track blog series, topics, deadlines, and Notion reminders — Vue frontend + FastAPI backend.',
    stack: ['Vue 3', 'FastAPI', 'Tailwind'],
    demo: null,
  },
  {
    name: 'Event Management',
    folder: 'Event-management/',
    blurb: 'Campus event system with QR attendance, logistics checklists, feedback, analytics, web + mobile.',
    stack: ['React', 'Expo', 'Node'],
    demo: null,
  },
  {
    name: 'QR App',
    folder: 'qr-app/',
    blurb: 'Lightweight QR-focused workshop demo for scanning and check-in style flows.',
    stack: ['HTML', 'CSS', 'JS'],
    demo: null,
  },
  {
    name: 'Prompt Template Kit',
    folder: 'Prompt-template-kit/',
    blurb: 'Reusable Copilot prompts for project init, docs, tests, research, enhancements, and automation.',
    stack: ['Prompts', 'CLI'],
    demo: null,
  },
  {
    name: 'Training Deck',
    folder: 'CopilotHands-OnTrainingDeck/',
    blurb: 'Session slide decks covering Copilot agentic workflows and CLI hands-on practice.',
    stack: ['Workshop', 'Slides'],
    demo: null,
  },
];

export const COPILOT_BUILD_PROMPT = `You are helping me run a GitHub Copilot Hands-On Session workshop build.

## Goal
Use GitHub Copilot (agentic chat / Copilot CLI) to create a small but real project end-to-end, then iterate with structured prompts.

## Context
- Who: developers learning Copilot agentic workflows and Copilot CLI
- What: a working mini-product with README, runnable code, and clear next steps
- Why: practice prompt structure (who/what/why/where + constraints) and iteration
- Where: local workshop environment, then optional Vercel / GitHub Pages deploy

## Constraints
- Prefer a modern web stack (React+Vite or Vue+Vite) unless I specify otherwise
- Keep the first version small and demoable in under 15 minutes of runtime setup
- Include a README with setup, scripts, and a short “what Copilot generated” section
- Use accessible UI and a coherent color theme
- Do not invent secrets; use .env.example for any config

## Build options (pick one if I don’t specify)
1) Health Club Site — community events + organizers pages
2) Restaurant Menu Designer — restaurants + menu items CRUD
3) Blog Tracker — series/topics/deadlines list with filters
4) Event Management lite — events list + QR check-in mock
5) Prompt Kit site — browse/copy workshop prompt templates

## Process to follow
1. Restate the chosen product in 5 bullets
2. Scaffold the project
3. Implement core screens/features
4. Add polish (empty states, validation, responsive layout)
5. Write README + run instructions
6. Suggest 3 follow-up Copilot prompts for iteration

Start by asking which option I want (or invent a close variant), then execute.`;

export const BUILD_STEPS = [
  {
    title: 'Set up Copilot CLI / Agent',
    body: 'Install GitHub CLI, run gh auth login, then copilot init (or open Copilot Chat / Agent in your editor).',
  },
  {
    title: 'Pick a workshop build',
    body: 'Choose Health Club, Let’s Eat, Blog Tracker, Event Management, QR App, or Prompt Kit — or invent a close variant.',
  },
  {
    title: 'Write a structured prompt',
    body: 'Include who / what / why / where plus constraints. Copy the prompt on this page or templates from Prompt-template-kit/.',
  },
  {
    title: 'Scaffold with Copilot',
    body: 'Ask Copilot to create the project in an empty folder (or use copilot plan + copilot run). Review files before continuing.',
  },
  {
    title: 'Implement the core loop',
    body: 'Ship the main user flow first (list → detail → create/update). Keep scope tight so the demo stays reliable.',
  },
  {
    title: 'Iterate with refine prompts',
    body: 'Use follow-ups for validation, empty states, tests, and docs. Prefer small, reviewable diffs each turn.',
  },
  {
    title: 'Document and demo',
    body: 'Add README setup steps, run the app, and walk the room through the agentic workflow you used.',
  },
  {
    title: 'Optional deploy',
    body: 'Deploy a frontend to Vercel or GitHub Pages. Keep secrets in env vars; never commit API keys.',
  },
];
