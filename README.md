# Soc Ops

Soc Ops is a fast, in-person Social Bingo game and an agent-first VS Code lab.
You can use it in two ways:

- Play it as a mixer icebreaker: find people who match prompts and get 5 in a row.
- Build it as a hands-on Copilot lab: design, prompt, and ship with multiple agents.

[Start Setup](workshop/01-setup.md) · [Open Lab Guide](workshop/GUIDE.md)

---

## Why this project exists

Soc Ops helps teams practice modern development workflows in a project that is small, visual, and easy to iterate on.

- Real UI changes you can see immediately
- Prompt engineering in context, not in isolation
- Multi-agent workflows (design, generation, review, refactor)
- A complete path from local dev to GitHub Pages deployment

---

## Gameplay at a glance

1. Start a round and get a bingo board of social prompts.
2. Find people in the room who match each prompt.
3. Mark squares as you confirm matches.
4. Get 5 in a row to win.

---

## Workshop path

Follow the lab in order, or jump to a specific part:

| Part | Focus |
|------|-------|
| [**00**](workshop/00-overview.md) | Overview & Checklist |
| [**01**](workshop/01-setup.md) | Setup & Context Engineering |
| [**02**](workshop/02-design.md) | Design-First Frontend |
| [**03**](workshop/03-quiz-master.md) | Custom Quiz Master |
| [**04**](workshop/04-multi-agent.md) | Multi-Agent Development |

Need the full quick-reference version? See [workshop/GUIDE.md](workshop/GUIDE.md).

---

## Quick start

### Prerequisites

- [Node.js 22+](https://nodejs.org/)

### Run locally

```bash
npm install
npm run dev
```

Open the local Vite URL shown in terminal.

---

## Dev container and Codespaces

This repo includes `.devcontainer/devcontainer.json`.

- GitHub Codespaces: create a Codespace from your own repository.
- VS Code Dev Containers: clone locally, then run `Dev Containers: Reopen in Container`.
- GitHub Pages publishing is preconfigured for your own repository.

---

## Scripts

```bash
npm run dev    # start local development server
npm run build  # type-check and create production build
npm run test   # run unit tests
npm run lint   # run ESLint
```

---

## Deployment

Push to `main` to trigger GitHub Pages deployment (when Pages is enabled in your repo settings).

---

## Contributing

Contributions are welcome. Please review:

- [CONTRIBUTING.md](CONTRIBUTING.md)
- [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
- [SECURITY.md](SECURITY.md)
