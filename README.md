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
- **.github/** → GitHub workflows and automation

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

## Contributing

Pull requests are welcome!  
If you have new prompt templates or workflow ideas, add them to the `Prompt-template-kit/` folder.

---

## License

MIT License

---

✨ This README gives your repo a professional look, guides users step-by-step, and makes the **agentic vibe** clear.  
