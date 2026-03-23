# Copilot Hands-On Training

![GitHub Copilot agent interface showing agentic workflow capabilities with modern design elements and gradient styling](./assets/agent.png)

## Welcome to the **Copilot Hands-On Training Repository**.  

This repo is designed to help developers and learners explore **GitHub Copilot’s agentic mode** and **Copilot CLI** in a practical, hands-on way.

---

## 🚀 What You’ll Learn

- How Copilot goes beyond Q&A into **agentic workflows**
- Using **Copilot CLI** to create, refine, and automate projects
- Best practices for writing structured prompts
- Iterating on outputs to build real-world deliverables

---

## Repository Structure

- **CopilotHands-OnTraining/** → Workshop materials and examples
- **Prompt-template-kit/** → Reusable prompt templates for projects
- **health-club-site/** → React health club website (deployed on GitHub Pages)
- **lets-Eat/** → Full-stack restaurant menu app (Vue + Python Flask)
- **.github/** → GitHub workflows and automation

---

## 🌐 Live Demo

**Health Club Site**: [https://shakiran-nannyombi.github.io/Copilot-Hands-On-Session/](https://shakiran-nannyombi.github.io/Copilot-Hands-On-Session/)

The health club site is automatically deployed to GitHub Pages using GitHub Actions. Any changes pushed to the `health-club-site/` folder will trigger an automatic rebuild and deployment.

---

## 🛠 Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/copilot-hands-on.git
cd copilot-hands-on
```

### 2. Install GitHub CLI

Follow [GitHub CLI installation guide](https://cli.github.com/).

### 3. Authenticate

```bash
gh auth login
```

### 4. Initialize Copilot CLI

```bash
copilot init
```

---

## Hands-On Workflow

### Create a Project in an Empty Folder

```bash
mkdir demo-project
cd demo-project
copilot plan "
Task: Create a starter project in Python
Title: Build Demo Project
Context:
- Who: Developers learning Copilot CLI
- What: A simple Python app with README
- Why: To demonstrate Copilot’s project creation
- Where: Workshop environment
Constraints:
- Keep it minimal and easy to run
"
copilot run
```

👉 Copilot will generate files like `README.md`, `main.py`, and `requirements.txt`.

---

## Prompt Kit

Use the templates in `Prompt-template-kit/` to:

- Initialize projects
- Generate documentation
- Add tests
- Automate workflows
- Build presentations

---

## Tips

- Always define **who, what, why, where** in prompts
- Iterate with `copilot refine` to improve outputs
- Use GitHub CLI (`gh`) alongside Copilot for repo management

---

## 🚀 GitHub Pages Deployment

This repository includes an automated GitHub Pages deployment workflow for the health club site.

### How It Works

1. **Automatic Deployment**: Any push to `main` that modifies the `health-club-site/` folder triggers a build
2. **Manual Deployment**: Trigger manually via the Actions tab → "Deploy Health Club Site to GitHub Pages" → "Run workflow"
3. **Build Process**: Uses GitHub Actions to build the React app with Vite and deploy to Pages

### Deployment Configuration

- **Workflow File**: `.github/workflows/deploy-health-club.yml`
- **Build Tool**: Vite with React
- **Node Version**: 20
- **Base Path**: `/Copilot-Hands-On-Session/` (configured in `vite.config.js`)

### Enabling GitHub Pages (Already Done)

GitHub Pages is already enabled for this repository using GitHub Actions as the source. To enable it for a new repo:

```bash
# Enable GitHub Pages programmatically
gh api \
  --method POST \
  -H "Accept: application/vnd.github+json" \
  /repos/OWNER/REPO/pages \
  -f "build_type=workflow"
```

Or manually:
1. Go to **Settings** → **Pages**
2. Under "Build and deployment", set **Source** to "GitHub Actions"

### Updating the Deployed Site

```bash
# Make changes to health-club-site files
cd health-club-site
npm run dev  # Test locally

# Commit and push
git add .
git commit -m "Update health club site"
git push origin main

# GitHub Actions will automatically rebuild and deploy
```

### Monitoring Deployments

```bash
# View recent workflow runs
gh run list --workflow="deploy-health-club.yml" --limit 5

# Watch a specific deployment
gh run watch <run-id>
```

For more details, see [health-club-site/DEPLOYMENT.md](health-club-site/DEPLOYMENT.md)

---

## Contributing

Pull requests are welcome!  
If you have new prompt templates or workflow ideas, add them to the `Prompt-template-kit/` folder.

---

## License

MIT License

---

✨ This README gives your repo a professional look, guides users step-by-step, and makes the **agentic vibe** clear.  
