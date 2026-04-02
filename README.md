# ArchAI 🏗

> AI-powered project structure generator CLI — scaffold production-grade backends and fullstack apps in seconds.

## Install

```bash
npm install -g arch-ai
# or
npx arch-ai init
```

## Usage

```bash
# Interactive project scaffolding (AI-assisted)
arch-ai init

# List all available templates & features
arch-ai list

# Show version
arch-ai --version
```

## Templates

| Template | Description |
|----------|-------------|
| `backend-mvp` | Minimal Express + TypeScript — perfect for APIs & MVPs |
| `backend-clean` | Clean Architecture — use-case driven, layered |
| `backend-microservice` | Modular event-driven microservice |
| `nextjs-basic` | Next.js 14 App Router + Tailwind CSS |
| `nextjs-ddd` | Next.js with Domain-Driven Design + server actions |
| `nextjs-saas` | Full SaaS boilerplate (auth + billing ready) |

## Features (add-ons)

| Feature | What's included |
|---------|----------------|
| `auth` | JWT middleware, AuthService, AuthController, routes |
| `ai` | Anthropic Claude client + streaming setup |
| `billing` | Stripe subscriptions + webhook handler |
| `email` | Resend transactional email service |
| `storage` | AWS S3 presigned URL upload service |
| `cache` | Redis caching layer via ioredis |
| `queue` | BullMQ background job queue |
| `websocket` | Socket.io real-time support |
| `testing` | Jest + Supertest config + example tests |
| `docker` | Multi-stage Dockerfile + docker-compose |
| `ci-cd` | GitHub Actions CI workflow |

## AI Suggestions

When you run `arch-ai init` and enable AI mode, ArchAI uses the **Anthropic Claude API** to:
1. Analyse your project idea
2. Recommend the best template
3. Suggest relevant features
4. Provide architecture notes

Set your API key to enable this:

```bash
export ANTHROPIC_API_KEY=your-key-here
```

Without an API key, AI suggestion gracefully falls back to manual selection.

## Development

```bash
git clone https://github.com/your-org/arch-ai
cd arch-ai
npm install
npm run dev -- init       # Run CLI in dev mode
npm run build             # Compile TypeScript
```

## Project Structure

```
src/
├── cli/                  # CLI entry & commands
│   ├── index.ts          # Commander program
│   └── commands/
│       └── init.command.ts
├── core/                 # Business logic
│   ├── init.ts           # Orchestrator
│   ├── generator.ts      # File/dir creator
│   ├── template.engine.ts
│   └── feature.engine.ts
├── ai/                   # AI integration
│   ├── ai.service.ts
│   ├── ai.prompts.ts
│   └── ai.parser.ts
├── config/               # Templates & features config
├── templates/            # Static template files
├── types/                # TypeScript types
├── utils/                # logger, spinner, file
└── constants/            # App-wide constants
```

---

_Made with ❤️ by ArchAI_