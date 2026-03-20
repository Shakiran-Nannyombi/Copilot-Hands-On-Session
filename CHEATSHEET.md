# ⚡ Copilot CLI Quick-Start Cheat Sheet

```text
#############################################################
#                                                           #
# ██████╗ ██████╗  ██████╗ ██╗██████╗  ██████╗ ██╗     ██╗ #
# ██╔══██╗██╔══██╗██╔═══██╗██║██╔══██╗██╔═══██╗██║     ██║ #
# ██████╔╝██████╔╝██║   ██║██║██████╔╝██║   ██║██║     ██║ #
# ██╔═══╝ ██╔═══╝ ██║   ██║██║██╔═══╝ ██║   ██║██║     ██║ #
# ██║     ██║     ╚██████╔╝██║██║     ╚██████╔╝███████╗██║ #
# ╚═╝     ╚═╝      ╚═════╝ ╚═╝╚═╝      ╚═════╝ ╚══════╝╚═╝ #
#                                                           #
# ⚡ GitHub Copilot CLI – Agentic Mode ⚡                  #
#############################################################
```

This cheat sheet covers the **top 5 commands** to get started with Copilot CLI in agentic mode.

---

## 1. Ask – Quick Q&A

Run simple queries directly in terminal.

```bash
copilot ask "Summarize the benefits of agentic AI"
```

---

## 2. Generate – Create Structured Outputs

Produce formatted content like outlines, slides, or docs.

```bash
copilot generate "Create a 3-slide outline on Copilot agentic workflows"
```

---

## 3. Plan – Multi-Step Task Setup

Define a task with context and constraints.

```bash
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
```

---

## 4. Run – Execute the Plan

Carry out the steps Copilot planned.

```bash
copilot run
```

---

## 5. Refine – Improve or Extend Outputs

Iterate on existing files or outputs.

```bash
copilot refine "Add a function that prints 'Hello Copilot!' in main.py"
```

---

## 🎯 Pro Tips

- Always define **who, what, why, where** in prompts.  
- Use `plan → run → refine` as your workflow loop.  
- Keep prompts clear and constraints explicit.  
- Combine with GitHub CLI (`gh`) for repo management.

---

Happy building with Copilot CLI 🚀
