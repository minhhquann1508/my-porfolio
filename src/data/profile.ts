export type Project = {
  id: string;
  level: string;
  name: string;
  fullName: string;
  role: string;
  company: string;
  period: string;
  // YYYY-MM; end omitted = ongoing
  start: string;
  end?: string;
  description: string;
  features: string[];
  stack: string[];
  metric?: { value: string; label: string };
};

export const profile = {
  name: "Nguyễn Minh Quân",
  title: "Software Engineer",
  location: "Ho Chi Minh City, VN",
  email: "minhhquann1508@gmail.com",
  github: "", // TODO: add GitHub URL
  linkedin: "", // TODO: add LinkedIn URL
  cv: "/CV_Nguyen_Minh_Quan.pdf",
  summary:
    "Software Engineer with 2+ years building scalable, high-performance systems across construction-tech (BIM/IFC), enterprise and e-learning platforms. I own the full cycle — database and backend architecture, CI/CD, code-quality infrastructure and security — and use AI coding assistants to ship faster without compromising quality.",
  stats: [
    { value: "2+", label: "years shipping" },
    { value: "1M+", label: "IFC elements / file" },
    { value: "10K+", label: "tasks / project" },
    { value: "5", label: "production systems" },
  ],
};

// Ordered bottom → top: each project is one storey of the building.
export const projects: Project[] = [
  {
    id: "pms",
    level: "L1",
    name: "PMS",
    fullName: "Project Management System",
    role: "Fullstack Developer",
    company: "TGL Solutions",
    period: "Dec 2024 — Present",
    start: "2024-12",
    description:
      "A construction project management platform (similar to Microsoft Project) for managing projects, materials and labor, with approval workflows for project managers.",
    features: [
      "AI-powered task estimation from 3D IFC models using Google Gemini",
      "Self-improving estimation: historical project data fed back to Gemini as RAG context",
      "Task-level inspection & sign-off workflow",
      "Multi-level approval workflows for project managers",
      "Material and labor management linked to tasks and schedules",
    ],
    stack: ["Laravel", "Next.js", "PostgreSQL", "Docker", "Nginx", "Gemini", "RAG"],
    metric: { value: "AI", label: "estimation from IFC" },
  },
  {
    id: "aicest",
    level: "L2",
    name: "AiCest",
    fullName: "Steel Structure Estimation from IFC",
    role: "Backend Developer",
    company: "TGL Solutions",
    period: "Dec 2024 — Present",
    start: "2024-12",
    description:
      "A quotation system for steel structure projects that performs quantity takeoff directly from 3D IFC models and generates cost quotations.",
    features: [
      "Quantity takeoff and analysis of 1,000,000+ elements in a single IFC file",
      "Low-latency, high-performance takeoff and quotation processing",
      "Streaming upload for very large IFC files",
      "Asynchronous processing pipeline with message queue and caching",
    ],
    stack: ["C#", ".NET", "RabbitMQ", "PostgreSQL", "Redis"],
    metric: { value: "1M+", label: "elements per file" },
  },
  {
    id: "wms",
    level: "L3",
    name: "WMS",
    fullName: "Work Management Module",
    role: "Backend Developer",
    company: "TGL Solutions",
    period: "Dec 2024 — Present",
    start: "2024-12",
    description:
      "A multi-tenant work management module shared across multiple products (including PMS), built for large-scale projects with 10,000+ tasks each.",
    features: [
      "Multi-tenant architecture — one module reused by many products",
      "Kanban & List views with drag-and-drop ordering via LexoRank",
      "Import/Export of MS Project (.mpp) and Excel files",
      "AI-generated construction Gantt charts from user prompts",
      "Modular, multi-platform design using Factory & Strategy patterns",
    ],
    stack: ["NestJS", "PostgreSQL", "Docker", "Generative AI"],
    metric: { value: "10K+", label: "tasks per project" },
  },
  {
    id: "newcad",
    level: "L4",
    name: "NewCAD Web",
    fullName: "Integrated Enterprise Suite",
    role: "Fullstack Developer",
    company: "TGL Solutions",
    period: "Dec 2024 — Present",
    start: "2024-12",
    description:
      "An integrated enterprise suite (CRM, SFA, EMS, LMS, IMS), refactored and modernized from a legacy system.",
    features: [
      "Refactored multi-module system — more maintainable, faster than legacy",
      "Application protection with a Web Application Firewall (WAF)",
      "Network security and server environment management with OPNsense",
    ],
    stack: ["Laravel", "Next.js", "WAF", "OPNsense"],
    metric: { value: "5", label: "modules modernized" },
  },
  {
    id: "lms",
    level: "L5",
    name: "LMS",
    fullName: "E-Learning Platform",
    role: "Fullstack Developer & Mentor",
    company: "My Vo Technology and Media",
    period: "Oct 2024 — Present",
    start: "2024-10",
    description:
      "An online learning platform where instructors upload and manage lectures and students watch lessons — built and operated end-to-end, plus mentoring students in web development.",
    features: [
      "Video upload and streaming via Bunny.net (Storage & Stream)",
      "Role-based permissions for instructors and students",
      "Content protection to prevent video source leaking",
      "Automated CI/CD deployment to VPS",
    ],
    stack: ["NestJS", "Next.js", "PostgreSQL", "Bunny.net", "CI/CD", "VPS"],
    metric: { value: "E2E", label: "built & operated" },
  },
];

export const skills = [
  { code: "A-01", category: "Languages", items: ["TypeScript", "C#", "PHP"] },
  { code: "A-02", category: "Frameworks", items: ["NestJS", ".NET", "Laravel", "Next.js", "Angular"] },
  {
    code: "S-01",
    category: "API & Architecture",
    items: ["REST", "GraphQL", "Multi-tenant", "Event-driven", "Micro-Frontend", "SOLID", "Design Patterns"],
  },
  { code: "S-02", category: "Data & Messaging", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "RabbitMQ"] },
  { code: "M-01", category: "DevOps", items: ["Git", "Docker", "GitLab CI/CD", "Nginx", "AWS", "Linux", "OPNsense"] },
  { code: "M-02", category: "Code Quality", items: ["SonarQube (self-hosted)", "Reusable CI templates", "Quality Gates"] },
  { code: "X-01", category: "AI-Assisted Dev", items: ["Claude Code", "OpenAI Codex"] },
];

export const achievements = [
  { stamp: "AWARD", title: "TGL Spot Award", detail: "Top-performing employee · Q3/2026" },
  { stamp: "GPA 3.7", title: "Software Engineering", detail: "FPT College · 3.7 / 4.0" },
  { stamp: "TOP 20", title: "FE Hackathon 2024", detail: "Top 20 teams" },
  { stamp: "TOP 100", title: "Spring 2024 Semester", detail: "Top 100 students" },
  { stamp: "DISTINCTION", title: "Cybersoft Academy", detail: "Graduated with distinction · Jan 2025" },
];

export const timeline = {
  from: "2024-09",
  to: "2026-12",
  today: "2026-11",
  companies: [
    { name: "TGL Solutions", start: "2024-12" },
    { name: "My Vo Technology and Media", start: "2024-10" },
  ],
  milestones: [
    { date: "2025-01", label: "Cybersoft · Distinction" },
    { date: "2026-09", label: "TGL Spot Award Q3" },
  ],
};

export const about = {
  photo: "/profile.jpg",
  greeting: "Hi, I'm Quân.",
  paragraphs: [
    "I'm a software engineer from Ho Chi Minh City who likes problems with real weight behind them.",
    "Most of my work lives where software meets construction: reading 3D IFC models with a million elements, turning them into steel quotations, scheduling projects with 10,000+ tasks, and teaching Gemini to estimate better with every project it sees.",
    "I care about the parts nobody demos — clean boundaries, queues that don't drop messages, CI that blocks a bad merge — because that's what keeps a system standing after launch. Outside the day job I mentor students starting out in web development, which keeps me honest about explaining the why, not just the how.",
  ],
  facts: [
    { k: "Based in", v: "Ho Chi Minh City, Vietnam" },
    { k: "Currently", v: "Fullstack / Backend @ TGL Solutions" },
    { k: "Also", v: "Fullstack Dev & Mentor @ My Vo" },
    { k: "Education", v: "Software Engineering · FPT College · GPA 3.7" },
    { k: "Pair-programs with", v: "Claude Code, OpenAI Codex" },
  ],
};

// Soft skills, framed as structural properties — each backed by evidence from real work
export const personalSkills = [
  {
    code: "P-01",
    property: "Load-bearing",
    title: "End-to-end ownership",
    description:
      "I take a feature from schema to production — database design, backend architecture, CI/CD, security and day-two operations — and stay accountable after it ships.",
    proof: "Built and operated the LMS end-to-end; secured NewCAD with WAF + OPNsense.",
  },
  {
    code: "P-02",
    property: "Knowledge transfer",
    title: "Mentoring & sharing",
    description:
      "I mentor students in web development: reviewing their code, explaining trade-offs, and helping them build habits that scale beyond the first project.",
    proof: "Mentor at My Vo Technology and Media since Oct 2024.",
  },
  {
    code: "P-03",
    property: "Tolerance ±0",
    title: "Quality & code discipline",
    description:
      "Quality shouldn't depend on someone remembering to check. I automate it — static analysis, quality gates and CI that scans every merge request.",
    proof: "Self-hosted SonarQube + reusable GitLab CI templates across frameworks.",
  },
  {
    code: "P-04",
    property: "Adaptive",
    title: "Fast learner, AI-amplified",
    description:
      "I switch between PHP, C# and TypeScript across parallel projects, and use AI assistants for generation, refactoring, review, tests and docs — to move faster without cutting corners.",
    proof: "GPA 3.7 · Top 20 FE Hackathon 2024 · TGL Spot Award Q3/2026.",
  },
];
