# ArchAI 🏗️

<div align="center">

![ArchAI Banner](https://img.shields.io/badge/ArchAI-Project%20Generator-7C3AED?style=for-the-badge&logo=node.js&logoColor=white)

**AI-powered project structure generator CLI**

[![NPM Version](https://img.shields.io/npm/v/@naymhdev/arch-ai?color=7C3AED&style=flat-square)](https://www.npmjs.com/package/@naymhdev/arch-ai)
[![NPM Downloads](https://img.shields.io/npm/dm/@naymhdev/arch-ai?color=06B6D4&style=flat-square)](https://www.npmjs.com/package/@naymhdev/arch-ai)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-brightgreen?style=flat-square&logo=node.js)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](https://github.com/naymHdev/arch-ai/pulls)

<br />

> Scaffold production-grade backend and fullstack projects in seconds.
> Describe your idea — AI picks the best template and features for you.

<br />

```bash
npx @naymhdev/arch-ai init
```

</div>

---

## 📖 Table of Contents

- [Why ArchAI?](#-why-archai)
- [Features](#-features)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Usage](#-usage)
- [Templates](#-templates)
- [Features (Add-ons)](#-features-add-ons)
- [AI Integration](#-ai-integration)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [Contributing](#-contributing)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## 🤔 Why ArchAI?

Every time you start a new project, you repeat the same boring setup:

```
❌ Create folders manually
❌ Copy-paste boilerplate from old projects
❌ Install the same packages every time
❌ Set up Express, middlewares, tsconfig again
❌ Wire up auth, docker, CI/CD from scratch
```

**ArchAI does all of this in under 10 seconds:**

```
✅ Describe your idea
✅ AI suggests the best template & features
✅ Full project structure generated instantly
✅ Boilerplate code ready to run
✅ All configs pre-wired
```

---

## ✨ Features

- 🤖 **AI-Powered Suggestions** — Describe your project idea, AI recommends the best template and features
- 🔄 **Regenerate with Feedback** — Don't like the suggestion? Give feedback and AI tries again (up to 3 times)
- 📦 **6 Production-Grade Templates** — Backend MVP, Clean Architecture, Microservice, Next.js Basic, DDD, SaaS
- ⚡ **11 Feature Add-ons** — Auth, AI, Billing, Email, Storage, Cache, Queue, WebSocket, Testing, Docker, CI/CD
- 🎯 **Interactive CLI** — Beautiful prompts with structure preview before generation
- 🔧 **TypeScript First** — Every generated file is fully typed
- 📋 **Structure Preview** — See exactly what will be created before confirming
- 🌈 **Multiple AI Providers** — Works with Groq (free), Anthropic Claude, or Google Gemini

---

## 🚀 Quick Start

```bash
# No installation needed
npx @naymhdev/arch-ai init
```

**Or install globally:**

```bash
npm install -g @naymhdev/arch-ai
arch-ai init
```

**You'll see an interactive prompt like this:**

```
  ╔═══════════════════════════════════╗
  ║      🏗  ArchAI — Project Init     ║
  ╚═══════════════════════════════════╝

  AI-powered project structure generator

? Project name: my-awesome-app
? Short description: A SaaS platform for pet adoption
? Use AI to suggest best template & features? Yes
? Describe your project idea: Pet adoption platform with shelters,
  user bookmarks, admin panel, and subscription plans

⏳ Consulting AI for best project structure...
✔ AI suggestion ready!

  Template:   Next.js SaaS — Full SaaS boilerplate
  Features:   auth, billing, email, storage, testing
  💡 A multi-role platform with subscriptions fits the SaaS template best.

? What would you like to do?
❯ ✅  Accept this suggestion
  🔄  Regenerate — give feedback to AI
  🖊️   Choose manually instead
```

---

## 📦 Installation

### Requirements

- **Node.js** >= 18
- **npm** / **pnpm** / **yarn** / **bun**

### Global Install

```bash
# npm
npm install -g @naymhdev/arch-ai

# pnpm
pnpm add -g @naymhdev/arch-ai

# yarn
yarn global add @naymhdev/arch-ai

# bun
bun add -g @naymhdev/arch-ai
```

### Without Install (npx)

```bash
npx @naymhdev/arch-ai init
```

---

## 🎯 Usage

### Commands

```bash
# Scaffold a new project (interactive)
arch-ai init

# List all available templates and features
arch-ai list

# Show version
arch-ai --version

# Show help
arch-ai --help
```

### `arch-ai init` — Step by Step

| Step | Prompt | Description |
|------|--------|-------------|
| 1 | Project name | Your project's directory name |
| 2 | Description | Short description (optional) |
| 3 | Use AI? | Enable AI-powered suggestions |
| 4 | Project idea | Describe what you're building |
| 5 | Template | Auto-suggested or manual pick |
| 6 | Features | Checkbox selection of add-ons |
| 7 | Package manager | npm / pnpm / yarn / bun |
| 8 | Output directory | Where to create the project |
| 9 | Preview + Confirm | See structure before generating |

---

## 🗂️ Templates

### Backend Templates

#### `backend-mvp` — Backend MVP
> Minimal Express + TypeScript backend. Perfect for REST APIs and quick prototypes.

```
my-project/
├── src/
│   ├── controllers/     # Route handlers
│   ├── services/        # Business logic
│   ├── routes/          # Express route definitions
│   ├── middlewares/     # Auth, validation, error handling
│   ├── utils/           # Shared utilities
│   ├── config/          # App configuration
│   ├── types/           # TypeScript types
│   ├── app.ts           # Express app setup
│   └── server.ts        # Server entry point
├── .env.example
├── package.json
└── tsconfig.json
```

**Best for:** Quick APIs, MVPs, solo projects, learning

---

#### `backend-clean` — Backend Clean Architecture
> Layered architecture with use-cases, repository pattern, and dependency injection.

```
my-project/
├── src/
│   ├── domain/
│   │   ├── entities/        # Core business objects
│   │   ├── repositories/    # Repository interfaces
│   │   └── use-cases/       # Application use cases
│   ├── infrastructure/
│   │   ├── database/        # DB adapters & migrations
│   │   └── repositories/    # Concrete implementations
│   ├── presentation/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── middlewares/
│   └── shared/              # Errors, types, utils
├── tests/
└── ...
```

**Best for:** Enterprise apps, team projects, complex business logic

---

#### `backend-microservice` — Backend Microservice
> Event-driven modular microservice with in-memory event bus.

```
my-project/
├── src/
│   ├── modules/
│   │   └── health/          # Self-contained feature module
│   ├── events/              # Event bus & handlers
│   ├── shared/              # Shared kernel
│   ├── app.ts
│   └── server.ts
├── Dockerfile
└── docker-compose.yml
```

**Best for:** Distributed systems, high-scale apps, modular teams

---

### Full-Stack Templates

#### `nextjs-basic` — Next.js Basic
> Next.js 14 App Router with Tailwind CSS and TypeScript.

```
my-project/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   └── api/health/route.ts
│   ├── components/
│   │   ├── ui/Button.tsx
│   │   └── layout/Navbar.tsx
│   ├── lib/utils.ts
│   └── types/index.ts
├── next.config.mjs
└── tailwind.config.ts
```

**Best for:** Websites, landing pages, portfolios, simple web apps

---

#### `nextjs-ddd` — Next.js DDD
> Next.js with Domain-Driven Design — server actions, feature modules, repository pattern.

```
my-project/
├── src/
│   ├── app/
│   │   ├── (auth)/          # Auth route group
│   │   ├── (dashboard)/     # Dashboard route group
│   │   └── api/             # API route handlers
│   ├── domain/
│   │   ├── entities/
│   │   ├── repositories/
│   │   └── use-cases/
│   ├── infrastructure/
│   │   └── repositories/
│   └── presentation/
│       ├── actions/         # Server actions
│       ├── components/
│       └── hooks/
└── ...
```

**Best for:** Complex web apps, rich domain logic, server actions

---

#### `nextjs-saas` — Next.js SaaS ⭐
> Full SaaS starter: landing page, auth, billing, dashboard, and Prisma ORM.

```
my-project/
├── src/
│   ├── app/
│   │   ├── (marketing)/     # Public landing & pricing pages
│   │   ├── (auth)/          # Login & register pages
│   │   ├── (dashboard)/     # Authenticated dashboard + sidebar
│   │   └── api/
│   │       └── webhooks/
│   │           └── stripe/  # Stripe webhook handler
│   ├── lib/
│   │   ├── auth.ts          # Session management
│   │   ├── stripe.ts        # Stripe client
│   │   └── utils.ts
│   └── ...
├── prisma/
│   └── schema.prisma        # User + Subscription models
└── .env.local.example
```

**Best for:** SaaS products, subscription apps, startup MVPs

---

## ⚡ Features (Add-ons)

Select any combination of features when running `arch-ai init`:

| Feature | What's Included | Key Packages |
|---------|----------------|--------------|
| `auth` | JWT middleware, AuthService, AuthController, routes | `jsonwebtoken`, `bcryptjs` |
| `ai` | Anthropic Claude client + streaming setup | `@anthropic-ai/sdk` |
| `billing` | Stripe subscriptions + webhook handler | `stripe` |
| `email` | Resend transactional email service | `resend` |
| `storage` | AWS S3 presigned URL upload service | `@aws-sdk/client-s3` |
| `cache` | Redis caching layer with TTL helpers | `ioredis` |
| `queue` | BullMQ background job processing | `bullmq` |
| `websocket` | Socket.io real-time support | `socket.io` |
| `testing` | Jest + Supertest config + example tests | `jest`, `supertest` |
| `docker` | Multi-stage Dockerfile + docker-compose | — |
| `ci-cd` | GitHub Actions CI workflow | — |

Each feature automatically:
- ✅ Injects the relevant boilerplate files
- ✅ Adds env variables to `.env.example`
- ✅ Lists the npm packages you need to install

---

## 🤖 AI Integration

ArchAI supports **3 AI providers**. Set any one API key to enable AI suggestions.

### Option 1 — Groq (Recommended, Free ✅)

The fastest inference engine. Best for CLI tools.

```bash
# Get free key at: https://console.groq.com
export GROQ_API_KEY=gsk_...
```

### Option 2 — Anthropic Claude

Highest quality suggestions.

```bash
# Get key at: https://console.anthropic.com
export ANTHROPIC_API_KEY=sk-ant-...
```

### Option 3 — Google Gemini

Generous free tier.

```bash
# Get free key at: https://aistudio.google.com
export GEMINI_API_KEY=AIza...
```

### Without AI

ArchAI works perfectly without any API key — it gracefully falls back to manual template and feature selection.

### AI Regeneration Feature

Don't like the AI suggestion? Give feedback and it will try again:

```
✔ AI suggestion ready!
  Template: backend-mvp
  Features: auth, docker

? What would you like to do?
❯ ✅  Accept this suggestion
  🔄  Regenerate — give feedback to AI   ← pick this
  🖊️   Choose manually instead

? What didn't you like? Tell AI what to change:
> "I need Next.js not Express, and add billing"

⏳ Regenerating suggestion (attempt 2/3)...
✔ New suggestion ready!
  Template: nextjs-saas
  Features: auth, billing, email
```

---

## 🗄️ Project Structure (ArchAI Source)

```
arch-ai/
├── src/
│   ├── cli/                      # CLI entry & commands
│   │   ├── index.ts              # Commander program entry
│   │   └── commands/
│   │       └── init.command.ts   # All Inquirer prompts + AI flow
│   │
│   ├── core/                     # Business logic
│   │   ├── init.ts               # Orchestrator
│   │   ├── generator.ts          # File & directory creator
│   │   ├── template.engine.ts    # In-memory boilerplate renderer
│   │   └── feature.engine.ts     # Feature file injector
│   │
│   ├── ai/                       # AI integration layer
│   │   ├── ai.service.ts         # API client (Groq/Claude/Gemini)
│   │   ├── ai.prompts.ts         # Prompt engineering
│   │   └── ai.parser.ts          # Response validation & parsing
│   │
│   ├── config/                   # App configuration
│   │   ├── templates.config.ts   # 6 template definitions
│   │   └── features.config.ts    # 11 feature definitions
│   │
│   ├── templates/                # Static template files
│   │   ├── backend-mvp/
│   │   ├── backend-clean/
│   │   ├── backend-microservice/
│   │   ├── nextjs-basic/
│   │   ├── nextjs-ddd/
│   │   └── nextjs-saas/
│   │
│   ├── types/index.ts            # Global TypeScript types
│   ├── utils/                    # logger, spinner, file helpers
│   └── constants/index.ts        # App-wide constants
│
├── dist/                         # Compiled output
├── package.json
└── tsconfig.json
```

---

## ⚙️ Configuration

### Environment Variables

ArchAI reads these from your shell environment or a `.env` file:

| Variable | Provider | Required |
|----------|----------|----------|
| `GROQ_API_KEY` | Groq | Optional |
| `ANTHROPIC_API_KEY` | Anthropic | Optional |
| `GEMINI_API_KEY` | Google | Optional |

At least one AI key is needed to use AI suggestions. Without any key, manual mode is used.

---

## 🤝 Contributing

Contributions are very welcome! Here's how to get started:

### 1. Fork & Clone

```bash
git clone https://github.com/naymHdev/arch-ai.git
cd arch-ai
npm install
```

### 2. Run in Development

```bash
npm run dev -- init
```

### 3. Build

```bash
npm run build
```

### 4. Project Areas to Contribute

| Area | Description |
|------|-------------|
| 🗂️ **New Templates** | Add new project templates (e.g., `fastify-api`, `remix-app`) |
| ⚡ **New Features** | Add new feature add-ons (e.g., `graphql`, `prisma`, `monitoring`) |
| 🤖 **AI Improvements** | Better prompts, new AI providers |
| 🐛 **Bug Fixes** | Fix issues, improve error messages |
| 📖 **Documentation** | Improve docs, add examples |
| 🧪 **Tests** | Add unit and integration tests |

### 5. Adding a New Template

**Step 1 — Add config** in `src/config/templates.config.ts`:
```typescript
'my-template': {
  id: 'my-template',
  name: 'My Template',
  description: 'Description of what this template does.',
  category: 'backend', // or 'fullstack'
  tags: ['express', 'typescript'],
  defaultFeatures: [],
  compatibleFeatures: ['auth', 'docker', 'testing'],
  structure: {
    // FolderNode tree
  }
}
```

**Step 2 — Add boilerplate files** in `src/templates/my-template/`

**Step 3 — Add renderers** in `src/core/template.engine.ts`

**Step 4 — Update types** in `src/types/index.ts`

### 6. Submit a PR

```bash
git checkout -b feat/my-new-template
git commit -m "feat: add my-template"
git push origin feat/my-new-template
```

Then open a Pull Request on GitHub!

### Code Style

- Use TypeScript for all new code
- Follow existing file naming conventions (`kebab-case.ts`)
- Add JSDoc comments for public methods
- Keep each file focused on a single responsibility

---

## 🗺️ Roadmap

| Feature | Status |
|---------|--------|
| 6 production templates | ✅ Done |
| 11 feature add-ons | ✅ Done |
| AI suggestions (Groq/Claude/Gemini) | ✅ Done |
| AI regenerate with feedback | ✅ Done |
| Structure preview | ✅ Done |
| `backend-modular` template | 🔄 In Progress |
| Prisma / Drizzle ORM feature | 📋 Planned |
| GraphQL feature add-on | 📋 Planned |
| `fastify-api` template | 📋 Planned |
| `remix-app` template | 📋 Planned |
| Plugin system for custom templates | 📋 Planned |
| Web UI (browser-based generator) | 💡 Idea |
| VS Code extension | 💡 Idea |

---

## 🐛 Common Issues

### `arch-ai: command not found`
```bash
# Reinstall globally
npm install -g @naymhdev/arch-ai

# Or use npx
npx @naymhdev/arch-ai init
```

### AI suggestions not working
```bash
# Check your key is set
echo $GROQ_API_KEY

# Set it temporarily
export GROQ_API_KEY=gsk_your_key_here

# Or add to your shell profile (~/.zshrc or ~/.bashrc)
echo 'export GROQ_API_KEY=gsk_your_key_here' >> ~/.zshrc
source ~/.zshrc
```

### `Directory already exists` error
```bash
# ArchAI won't overwrite existing directories
# Either delete the folder first or choose a different name
rm -rf my-project
arch-ai init
```

---

## 📊 Tech Stack

| Tool | Purpose |
|------|---------|
| [Node.js](https://nodejs.org) | Runtime |
| [TypeScript](https://typescriptlang.org) | Language |
| [Commander.js](https://github.com/tj/commander.js) | CLI framework |
| [Inquirer.js](https://github.com/SBoudrias/Inquirer.js) | Interactive prompts |
| [fs-extra](https://github.com/jprichardson/node-fs-extra) | File system operations |
| [Chalk](https://github.com/chalk/chalk) | Terminal colors |
| [Ora](https://github.com/sindresorhus/ora) | Loading spinners |
| [Groq SDK](https://console.groq.com) | AI inference (primary) |
| [Anthropic SDK](https://anthropic.com) | AI inference (alternative) |

---

## 📄 License

MIT © [naymHdev](https://github.com/naymHdev)

---

## 🙏 Acknowledgements

- Inspired by [create-t3-app](https://create.t3.gg/) and [create-next-app](https://nextjs.org/docs/app/api-reference/create-next-app)
- AI suggestions powered by [Groq](https://groq.com), [Anthropic](https://anthropic.com), and [Google Gemini](https://ai.google.dev)
- Built with ❤️ for the developer community

---

<div align="center">

**[NPM Package](https://www.npmjs.com/package/@naymhdev/arch-ai)** • **[GitHub](https://github.com/naymHdev/arch-ai)** • **[Report Bug](https://github.com/naymHdev/arch-ai/issues)** • **[Request Feature](https://github.com/naymHdev/arch-ai/issues)**

<br />

If ArchAI saved you time, please ⭐ the repo!

</div>