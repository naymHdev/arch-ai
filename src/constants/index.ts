export const VERSION = "1.0.0";
export const CLI_NAME = "arch-ai";
export const TEMPLATES_DIR = "templates";

export const COLORS = {
  primary: "#7C3AED",
  secondary: "#06B6D4",
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",
  muted: "#6B7280",
} as const;

export const TEMPLATE_LABELS: Record<string, string> = {
  "backend-mvp": "Backend MVP — Express + TypeScript starter",
  "backend-clean":
    "Backend Clean Arch — Layered architecture (use-case driven)",
  "backend-microservice": "Backend Microservice — Modular, event-driven design",
  "nextjs-basic": "Next.js Basic — App router + Tailwind CSS",
  "nextjs-ddd": "Next.js DDD — Domain-Driven Design with server actions",
  "nextjs-saas": "Next.js SaaS — Full SaaS boilerplate (auth + billing ready)",
};

export const FEATURE_LABELS: Record<string, string> = {
  auth: "Authentication — JWT / session-based auth",
  ai: "AI Integration — OpenAI / Claude API setup",
  billing: "Billing — Stripe integration",
  email: "Email — Nodemailer / Resend setup",
  storage: "Storage — S3 / Cloudinary file upload",
  cache: "Cache — Redis caching layer",
  queue: "Job Queue — Bull/BullMQ background jobs",
  websocket: "WebSocket — Real-time support via Socket.io",
  testing: "Testing — Jest + Supertest setup",
  docker: "Docker — Dockerfile + docker-compose",
  "ci-cd": "CI/CD — GitHub Actions workflow",
};

export const DEFAULT_ENV_CONTENT = `# ArchAI Generated Environment Variables
NODE_ENV=development
PORT=3000
`;
