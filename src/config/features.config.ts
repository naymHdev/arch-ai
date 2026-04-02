import { FeatureConfig, FeatureId } from "../types";

// ─────────────────────────────────────────────
// Features Configuration
// ─────────────────────────────────────────────

export const FEATURES: Record<FeatureId, FeatureConfig> = {
  auth: {
    id: "auth",
    name: "Authentication",
    description: "JWT-based auth with refresh tokens, guards, and user model.",
    dependencies: ["jsonwebtoken", "bcryptjs"],
    devDependencies: ["@types/jsonwebtoken", "@types/bcryptjs"],
    envVars: [
      {
        key: "JWT_SECRET",
        value: "your-super-secret-key",
        comment: "JWT signing secret",
      },
      { key: "JWT_EXPIRES_IN", value: "7d" },
      { key: "JWT_REFRESH_SECRET", value: "your-refresh-secret" },
    ],
    files: [
      {
        path: "src/middlewares/auth.middleware.ts",
        template: "auth-middleware",
      },
      { path: "src/services/auth.service.ts", template: "auth-service" },
      {
        path: "src/controllers/auth.controller.ts",
        template: "auth-controller",
      },
      { path: "src/routes/auth.routes.ts", template: "auth-routes" },
    ],
  },

  ai: {
    id: "ai",
    name: "AI Integration",
    description:
      "Anthropic Claude or OpenAI API client with streaming support.",
    dependencies: ["@anthropic-ai/sdk"],
    devDependencies: [],
    envVars: [
      {
        key: "ANTHROPIC_API_KEY",
        value: "your-anthropic-api-key",
        comment: "Get from console.anthropic.com",
      },
      { key: "AI_MODEL", value: "claude-sonnet-4-20250514" },
    ],
    files: [{ path: "src/services/ai.service.ts", template: "ai-service" }],
  },

  billing: {
    id: "billing",
    name: "Billing (Stripe)",
    description:
      "Stripe integration with webhook handling, subscriptions, and plans.",
    dependencies: ["stripe"],
    devDependencies: ["@types/stripe"],
    envVars: [
      {
        key: "STRIPE_SECRET_KEY",
        value: "sk_test_...",
        comment: "Stripe secret key",
      },
      { key: "STRIPE_WEBHOOK_SECRET", value: "whsec_..." },
      { key: "STRIPE_PRICE_ID", value: "price_..." },
    ],
    files: [
      { path: "src/services/stripe.service.ts", template: "stripe-service" },
      { path: "src/routes/billing.routes.ts", template: "billing-routes" },
    ],
  },

  email: {
    id: "email",
    name: "Email (Resend)",
    description: "Transactional email via Resend with typed templates.",
    dependencies: ["resend"],
    devDependencies: [],
    envVars: [
      {
        key: "RESEND_API_KEY",
        value: "re_...",
        comment: "Get from resend.com",
      },
      { key: "EMAIL_FROM", value: "noreply@yourapp.com" },
    ],
    files: [
      { path: "src/services/email.service.ts", template: "email-service" },
    ],
  },

  storage: {
    id: "storage",
    name: "File Storage (S3)",
    description: "AWS S3 / compatible storage with presigned URL support.",
    dependencies: ["@aws-sdk/client-s3", "@aws-sdk/s3-request-presigner"],
    devDependencies: [],
    envVars: [
      { key: "AWS_ACCESS_KEY_ID", value: "your-access-key" },
      { key: "AWS_SECRET_ACCESS_KEY", value: "your-secret" },
      { key: "AWS_REGION", value: "us-east-1" },
      { key: "S3_BUCKET_NAME", value: "your-bucket" },
    ],
    files: [
      { path: "src/services/storage.service.ts", template: "storage-service" },
    ],
  },

  cache: {
    id: "cache",
    name: "Cache (Redis)",
    description: "Redis caching layer with TTL, invalidation helpers.",
    dependencies: ["ioredis"],
    devDependencies: ["@types/ioredis"],
    envVars: [{ key: "REDIS_URL", value: "redis://localhost:6379" }],
    files: [{ path: "src/utils/cache.ts", template: "cache-util" }],
  },

  queue: {
    id: "queue",
    name: "Job Queue (BullMQ)",
    description: "Background job processing with BullMQ and Redis.",
    dependencies: ["bullmq"],
    devDependencies: [],
    envVars: [{ key: "REDIS_URL", value: "redis://localhost:6379" }],
    files: [{ path: "src/queues/index.ts", template: "queue-index" }],
  },

  websocket: {
    id: "websocket",
    name: "WebSocket (Socket.io)",
    description: "Real-time bidirectional communication via Socket.io.",
    dependencies: ["socket.io"],
    devDependencies: ["@types/socket.io"],
    envVars: [{ key: "WS_CORS_ORIGIN", value: "http://localhost:3000" }],
    files: [{ path: "src/websocket/index.ts", template: "websocket-index" }],
  },

  testing: {
    id: "testing",
    name: "Testing (Jest)",
    description: "Jest + Supertest configuration with example tests.",
    dependencies: [],
    devDependencies: [
      "jest",
      "ts-jest",
      "@types/jest",
      "supertest",
      "@types/supertest",
    ],
    envVars: [],
    files: [
      { path: "jest.config.ts", template: "jest-config" },
      { path: "src/__tests__/app.test.ts", template: "app-test" },
    ],
  },

  docker: {
    id: "docker",
    name: "Docker",
    description: "Multi-stage Dockerfile and docker-compose.yml.",
    dependencies: [],
    devDependencies: [],
    envVars: [],
    files: [
      { path: "Dockerfile", template: "dockerfile" },
      { path: "docker-compose.yml", template: "docker-compose" },
      { path: ".dockerignore", template: "dockerignore" },
    ],
  },

  "ci-cd": {
    id: "ci-cd",
    name: "CI/CD (GitHub Actions)",
    description: "GitHub Actions workflow for lint, test, and build.",
    dependencies: [],
    devDependencies: [],
    envVars: [],
    files: [{ path: ".github/workflows/ci.yml", template: "github-ci" }],
  },
};
