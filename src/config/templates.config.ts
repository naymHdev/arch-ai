import { TemplateConfig, TemplateId } from "../types";

// ─────────────────────────────────────────────
// Templates Configuration
// ─────────────────────────────────────────────

export const TEMPLATES: Record<TemplateId, TemplateConfig> = {
  "backend-modular": {
    id: "backend-modular",
    name: "Backend Modular",
    description:
      "Feature-based modular architecture — production grade with role-based auth.",
    category: "backend",
    tags: ["express", "typescript", "modular", "rbac", "production"],
    defaultFeatures: ["auth", "testing", "docker"],
    compatibleFeatures: [
      "auth",
      "email",
      "storage",
      "cache",
      "queue",
      "testing",
      "docker",
      "ci-cd",
    ],
    structure: {
      name: "root",
      type: "dir",
      children: [
        {
          name: "src",
          type: "dir",
          children: [
            {
              name: "modules",
              type: "dir",
              description: "Feature modules",
              children: [
                {
                  name: "auth",
                  type: "dir",
                  children: [
                    { name: "auth.controller.ts", type: "file" },
                    { name: "auth.service.ts", type: "file" },
                    { name: "auth.routes.ts", type: "file" },
                    { name: "auth.validation.ts", type: "file" },
                    { name: "auth.interface.ts", type: "file" },
                  ],
                },
                {
                  name: "user",
                  type: "dir",
                  children: [
                    { name: "user.controller.ts", type: "file" },
                    { name: "user.service.ts", type: "file" },
                    { name: "user.routes.ts", type: "file" },
                    { name: "user.model.ts", type: "file" },
                    { name: "user.validation.ts", type: "file" },
                    { name: "user.interface.ts", type: "file" },
                  ],
                },
                {
                  name: "admin",
                  type: "dir",
                  children: [
                    { name: "admin.controller.ts", type: "file" },
                    { name: "admin.routes.ts", type: "file" },
                    { name: "admin.validation.ts", type: "file" },
                  ],
                },
              ],
            },
            {
              name: "middlewares",
              type: "dir",
              children: [
                { name: "auth.ts", type: "file" },
                { name: "validateRequest.ts", type: "file" },
                { name: "globalErrorHandler.ts", type: "file" },
                { name: "notFound.ts", type: "file" },
              ],
            },
            {
              name: "utils",
              type: "dir",
              children: [
                { name: "catchAsync.ts", type: "file" },
                { name: "sendResponse.ts", type: "file" },
                { name: "AppError.ts", type: "file" },
              ],
            },
            {
              name: "routes",
              type: "dir",
              children: [
                {
                  name: "index.ts",
                  type: "file",
                  description: "All module routes registered here",
                },
              ],
            },
            { name: "config", type: "dir" },
            { name: "interface", type: "dir" },
            { name: "app.ts", type: "file" },
            { name: "server.ts", type: "file" },
          ],
        },
        { name: ".env.example", type: "file" },
        { name: "package.json", type: "file" },
        { name: "tsconfig.json", type: "file" },
      ],
    },
  },

  "backend-mvp": {
    id: "backend-mvp",
    name: "Backend MVP",
    description:
      "Minimal Express + TypeScript backend. Perfect for APIs and MVPs.",
    category: "backend",
    tags: ["express", "typescript", "rest-api", "mvc"],
    defaultFeatures: [],
    compatibleFeatures: [
      "auth",
      "ai",
      "billing",
      "email",
      "storage",
      "cache",
      "queue",
      "testing",
      "docker",
      "ci-cd",
    ],
    structure: {
      name: "root",
      type: "dir",
      children: [
        {
          name: "src",
          type: "dir",
          children: [
            { name: "controllers", type: "dir", description: "Route handlers" },
            { name: "services", type: "dir", description: "Business logic" },
            {
              name: "routes",
              type: "dir",
              description: "Express route definitions",
            },
            {
              name: "middlewares",
              type: "dir",
              description: "Express middlewares",
            },
            { name: "utils", type: "dir", description: "Shared utilities" },
            { name: "config", type: "dir", description: "App configuration" },
            { name: "types", type: "dir", description: "TypeScript types" },
            { name: "app.ts", type: "file", description: "Express app setup" },
            {
              name: "server.ts",
              type: "file",
              description: "Server entry point",
            },
          ],
        },
        { name: ".env.example", type: "file" },
        { name: "package.json", type: "file" },
        { name: "tsconfig.json", type: "file" },
        { name: "README.md", type: "file" },
      ],
    },
  },

  "backend-clean": {
    id: "backend-clean",
    name: "Backend Clean Architecture",
    description:
      "Layered architecture with use-cases, repositories, and dependency injection.",
    category: "backend",
    tags: ["express", "typescript", "clean-arch", "use-cases", "ddd"],
    defaultFeatures: ["testing"],
    compatibleFeatures: [
      "auth",
      "ai",
      "billing",
      "email",
      "cache",
      "queue",
      "testing",
      "docker",
      "ci-cd",
    ],
    structure: {
      name: "root",
      type: "dir",
      children: [
        {
          name: "src",
          type: "dir",
          children: [
            {
              name: "domain",
              type: "dir",
              children: [
                {
                  name: "entities",
                  type: "dir",
                  description: "Core business entities",
                },
                {
                  name: "repositories",
                  type: "dir",
                  description: "Repository interfaces",
                },
                {
                  name: "use-cases",
                  type: "dir",
                  description: "Application use cases",
                },
              ],
            },
            {
              name: "infrastructure",
              type: "dir",
              children: [
                {
                  name: "database",
                  type: "dir",
                  description: "DB adapters & migrations",
                },
                {
                  name: "repositories",
                  type: "dir",
                  description: "Concrete repo implementations",
                },
                {
                  name: "external",
                  type: "dir",
                  description: "Third-party adapters",
                },
              ],
            },
            {
              name: "presentation",
              type: "dir",
              children: [
                { name: "controllers", type: "dir" },
                { name: "routes", type: "dir" },
                { name: "middlewares", type: "dir" },
                { name: "validators", type: "dir" },
              ],
            },
            {
              name: "shared",
              type: "dir",
              description: "Shared types, errors, utils",
            },
            { name: "app.ts", type: "file" },
            { name: "server.ts", type: "file" },
          ],
        },
        { name: "tests", type: "dir" },
        { name: ".env.example", type: "file" },
        { name: "package.json", type: "file" },
        { name: "tsconfig.json", type: "file" },
      ],
    },
  },

  "backend-microservice": {
    id: "backend-microservice",
    name: "Backend Microservice",
    description: "Event-driven modular microservice with message bus support.",
    category: "backend",
    tags: ["express", "typescript", "microservice", "events", "modular"],
    defaultFeatures: ["docker", "testing"],
    compatibleFeatures: [
      "auth",
      "cache",
      "queue",
      "websocket",
      "testing",
      "docker",
      "ci-cd",
    ],
    structure: {
      name: "root",
      type: "dir",
      children: [
        {
          name: "src",
          type: "dir",
          children: [
            {
              name: "modules",
              type: "dir",
              description: "Feature modules",
              children: [
                {
                  name: "health",
                  type: "dir",
                  description: "Health-check module (example)",
                },
              ],
            },
            {
              name: "events",
              type: "dir",
              description: "Event bus & handlers",
            },
            { name: "shared", type: "dir", description: "Shared kernel" },
            { name: "app.ts", type: "file" },
            { name: "server.ts", type: "file" },
          ],
        },
        { name: "docker-compose.yml", type: "file" },
        { name: "Dockerfile", type: "file" },
        { name: ".env.example", type: "file" },
        { name: "package.json", type: "file" },
      ],
    },
  },

  "nextjs-basic": {
    id: "nextjs-basic",
    name: "Next.js Basic",
    description: "Next.js 14 with App Router, Tailwind CSS, and TypeScript.",
    category: "fullstack",
    tags: ["nextjs", "typescript", "tailwind", "app-router"],
    defaultFeatures: [],
    compatibleFeatures: [
      "auth",
      "ai",
      "billing",
      "email",
      "storage",
      "testing",
      "docker",
      "ci-cd",
    ],
    structure: {
      name: "root",
      type: "dir",
      children: [
        {
          name: "src",
          type: "dir",
          children: [
            {
              name: "app",
              type: "dir",
              children: [
                { name: "layout.tsx", type: "file" },
                { name: "page.tsx", type: "file" },
                { name: "globals.css", type: "file" },
              ],
            },
            {
              name: "components",
              type: "dir",
              description: "Reusable UI components",
            },
            { name: "lib", type: "dir", description: "Utilities and helpers" },
            { name: "types", type: "dir" },
          ],
        },
        { name: "public", type: "dir" },
        { name: ".env.local.example", type: "file" },
        { name: "package.json", type: "file" },
        { name: "tailwind.config.ts", type: "file" },
        { name: "next.config.mjs", type: "file" },
      ],
    },
  },

  "nextjs-ddd": {
    id: "nextjs-ddd",
    name: "Next.js DDD",
    description:
      "Next.js with Domain-Driven Design — server actions, feature modules, repository pattern.",
    category: "fullstack",
    tags: ["nextjs", "typescript", "ddd", "server-actions", "feature-based"],
    defaultFeatures: ["auth", "testing"],
    compatibleFeatures: [
      "auth",
      "ai",
      "billing",
      "email",
      "storage",
      "cache",
      "testing",
      "docker",
      "ci-cd",
    ],
    structure: {
      name: "root",
      type: "dir",
      children: [
        {
          name: "src",
          type: "dir",
          children: [
            {
              name: "app",
              type: "dir",
              children: [
                {
                  name: "(auth)",
                  type: "dir",
                  description: "Auth route group",
                },
                {
                  name: "(dashboard)",
                  type: "dir",
                  description: "Dashboard route group",
                },
                { name: "api", type: "dir", description: "API route handlers" },
                { name: "layout.tsx", type: "file" },
                { name: "page.tsx", type: "file" },
              ],
            },
            {
              name: "domain",
              type: "dir",
              children: [
                { name: "entities", type: "dir" },
                { name: "repositories", type: "dir" },
                { name: "use-cases", type: "dir" },
              ],
            },
            {
              name: "infrastructure",
              type: "dir",
              children: [
                {
                  name: "db",
                  type: "dir",
                  description: "Prisma / Drizzle setup",
                },
                { name: "repositories", type: "dir" },
              ],
            },
            {
              name: "presentation",
              type: "dir",
              children: [
                { name: "components", type: "dir" },
                { name: "hooks", type: "dir" },
                { name: "actions", type: "dir", description: "Server actions" },
              ],
            },
            { name: "lib", type: "dir" },
          ],
        },
        { name: ".env.local.example", type: "file" },
        { name: "package.json", type: "file" },
        { name: "next.config.mjs", type: "file" },
        { name: "tailwind.config.ts", type: "file" },
      ],
    },
  },

  "nextjs-saas": {
    id: "nextjs-saas",
    name: "Next.js SaaS",
    description:
      "Full SaaS starter: auth, billing, dashboard, and team management ready.",
    category: "fullstack",
    tags: ["nextjs", "typescript", "saas", "stripe", "auth", "tailwind"],
    defaultFeatures: ["auth", "billing", "email", "testing"],
    compatibleFeatures: [
      "auth",
      "ai",
      "billing",
      "email",
      "storage",
      "cache",
      "testing",
      "docker",
      "ci-cd",
    ],
    structure: {
      name: "root",
      type: "dir",
      children: [
        {
          name: "src",
          type: "dir",
          children: [
            {
              name: "app",
              type: "dir",
              children: [
                {
                  name: "(marketing)",
                  type: "dir",
                  description: "Public landing pages",
                },
                { name: "(auth)", type: "dir", description: "Auth pages" },
                {
                  name: "(dashboard)",
                  type: "dir",
                  description: "Authenticated dashboard",
                },
                {
                  name: "api",
                  type: "dir",
                  description: "API routes (webhooks, etc.)",
                },
              ],
            },
            { name: "components", type: "dir" },
            {
              name: "lib",
              type: "dir",
              description: "auth, stripe, db clients",
            },
            { name: "hooks", type: "dir" },
            { name: "types", type: "dir" },
          ],
        },
        {
          name: "prisma",
          type: "dir",
          description: "Prisma schema & migrations",
        },
        { name: ".env.local.example", type: "file" },
        { name: "package.json", type: "file" },
        { name: "next.config.mjs", type: "file" },
      ],
    },
  },
};
