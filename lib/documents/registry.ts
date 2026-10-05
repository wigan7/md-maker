import { DocumentTypeId } from '@/types/project';
import { ProjectContext } from '@/types/interview';

export interface DocumentTypeDefinition {
  id: DocumentTypeId;
  name: string;
  fileName: string;
  description: string;
  recommendedWith?: DocumentTypeId[];
  dependencies: DocumentTypeId[];
  requiredContext: (keyof ProjectContext)[];
  systemPrompt: string;
  userPromptTemplate: (context: ProjectContext, relatedDocs?: Partial<Record<DocumentTypeId, string>>) => string;
}

export const DOCUMENT_REGISTRY: Record<DocumentTypeId, DocumentTypeDefinition> = {
  PRD: {
    id: 'PRD',
    name: 'Product Requirements Document',
    fileName: 'PRD.md',
    description: 'Definisi visi produk, target persona pengguna, problem statement, fitur utama, dan kriteria sukses.',
    dependencies: [],
    recommendedWith: ['DESIGN', 'ARCHITECTURE'],
    requiredContext: ['projectName', 'description', 'problem', 'goals', 'users', 'features'],
    systemPrompt: `You are an elite Senior Product Architect and Technical Product Manager.
Generate a comprehensive, production-ready, and highly articulate Product Requirements Document (PRD.md) in pristine GitHub-flavored Markdown.

Structure of the PRD:
# [Project Name] - Product Requirements Document (PRD)

## 1. Executive Summary & Vision
- Vision Statement
- Core Value Proposition
- Target Market & Primary Outcomes

## 2. Problem Statement & User Pain Points
- The core problem(s) solved
- Why existing solutions fall short

## 3. Target Audience & User Personas
- Detailed personas with goals, workflows, and pain points

## 4. Goals & Non-Goals
- Primary Goals (KPIs / Success metrics)
- Explicit Non-Goals (Scope boundaries)

## 5. Feature Specifications & Requirements
Categorize features into:
- Must-Have (P0 / Core MVP)
- Should-Have (P1 / Phase 2)
- Could-Have (P2 / Future scope)
Each feature must specify: description, user story, and acceptance criteria.

## 6. Key User Journeys & Flows
- Step-by-step critical user journeys

## 7. Assumptions & Dependencies
- Strategic and technical assumptions
- External dependencies

Tone: Highly professional, structured, authoritative, and actionable. Do not output conversational filler.`,
    userPromptTemplate: (context) => `Create a comprehensive PRD.md for:
Project Name: ${context.projectName}
Description: ${context.description}
Problem: ${context.problem}
Goals: ${JSON.stringify(context.goals)}
Target Users: ${JSON.stringify(context.users)}
Personas: ${JSON.stringify(context.personas)}
Platforms: ${JSON.stringify(context.platforms)}
Features: ${JSON.stringify(context.features)}
User Flows: ${JSON.stringify(context.userFlows)}
Constraints: ${JSON.stringify(context.constraints)}
Assumptions: ${JSON.stringify(context.assumptions.filter(a => a.accepted).map(a => a.text))}
`
  },

  DESIGN: {
    id: 'DESIGN',
    name: 'Design & UI/UX Specification',
    fileName: 'DESIGN.md',
    description: 'Sistem desain, prinsip visual, tata letak antarmuka, micro-interactions, dan token estetika.',
    dependencies: ['PRD'],
    recommendedWith: ['PRD', 'ARCHITECTURE'],
    requiredContext: ['projectName', 'features', 'designPreferences'],
    systemPrompt: `You are a World-Class Principal UI/UX Designer and Design Systems Architect.
Generate an exquisite, highly detailed Design & UI/UX Specification document (DESIGN.md) in clean GitHub-flavored Markdown.

Structure of the DESIGN.md:
# [Project Name] - Design & UI/UX Specification

## 1. Design Philosophy & Creative Direction
- Core visual metaphors and aesthetic identity (e.g. Premium Translucent Glass, Minimalist, Material Depth)
- Guiding emotional tenets and ergonomic principles

## 2. Design System & Visual Tokens
- Color Palette (Neutrals, Primary Accents, Semantic states, Atmospheric lighting)
- Typography Hierarchy (Typeface scale, line-heights, weights)
- Elevation, Shadows, Borders & Surface Materials (Glass/Translucency tokens, blur radii)
- Spacing & Layout Grid (4px/8px modular scale, corner radii standards)

## 3. Component Architecture & UI Elements
- Navigation structures (App shell, floating menus, modals, sheets)
- Core Interactive controls (Buttons, inputs, segment controllers, cards)
- State visualizations (Empty states, loading skeleton, error toasts, success affirmations)

## 4. Key Screen Layouts & Wireframe Specs
- Layout breakdown for primary screens and workflows
- Responsive adaptation guidelines (Desktop, Tablet, Mobile)

## 5. Micro-Interactions & Motion Choreography
- Transition easing curves, spring physics, durations (150-300ms)
- State feedback animations and optical polish

## 6. Accessibility & Inclusivity (a11y)
- Contrast ratio standards (WCAG AAA/AA), focus indicators, keyboard traversal, touch targets (min 44x44px).

Do not output chat fluff. Output only pure, structured Markdown.`,
    userPromptTemplate: (context, relatedDocs) => `Create an exhaustive DESIGN.md for:
Project Name: ${context.projectName}
Description: ${context.description}
Design Preferences: ${JSON.stringify(context.designPreferences)}
Features: ${JSON.stringify(context.features)}
User Flows: ${JSON.stringify(context.userFlows)}
Platforms: ${JSON.stringify(context.platforms)}

${relatedDocs?.PRD ? `\n--- Context from PRD.md ---\n${relatedDocs.PRD.slice(0, 1500)}` : ''}`
  },

  ARCHITECTURE: {
    id: 'ARCHITECTURE',
    name: 'System Architecture & Tech Stack',
    fileName: 'ARCHITECTURE.md',
    description: 'Arsitektur sistem, pemilihan teknologi, data flow, protokol API, dan infrastruktur deployment.',
    dependencies: ['PRD'],
    recommendedWith: ['PRD', 'DATABASE'],
    requiredContext: ['projectName', 'technology', 'database', 'authentication', 'deployment'],
    systemPrompt: `You are a Principal Software Architect and Infrastructure Strategist.
Generate a comprehensive, production-grade Technical Architecture document (ARCHITECTURE.md) in Markdown.

Structure of ARCHITECTURE.md:
# [Project Name] - Technical Architecture Document

## 1. Architectural Vision & High-Level Topology
- System Overview & architectural pattern (e.g., Modular Monolith, Microservices, Event-Driven, Serverless)
- ASCII or Mermaid diagram of the end-to-end topology

## 2. Technology Stack & Decision Rationale
- Frontend Layer (Framework, Rendering strategy, State management)
- Backend & Compute Layer (API runtime, serverless functions, worker queues)
- Data Storage Layer (Primary database, Caching, Object storage)
- Authentication & Authorization strategy
- Third-party Integrations & external APIs

## 3. Data Flow & Communication Protocols
- Client-Server communication (REST, GraphQL, WebSockets, SSE)
- Request-response lifecycle
- Background processing and async event streams

## 4. Security & Compliance Architecture
- Secrets management & environment isolation
- CORS, Content Security Policy, rate limiting, and sanitization
- Data encryption in-transit and at-rest

## 5. Scalability, Resilience & Performance
- Caching strategy (Edge, Redis, Browser cache)
- Graceful degradation and retry mechanisms
- Performance budgets and Core Web Vitals targets

## 6. Infrastructure & CI/CD Deployment Pipeline
- Hosting environment (Vercel, AWS, Cloudflare, GCP)
- Automated testing, build pipeline, and blue-green/preview deployments
- Monitoring, logging, and observability (Sentry, OpenTelemetry, Logflare)

Ensure all architectural decisions strictly align with decisions made in related documents.`,
    userPromptTemplate: (context, relatedDocs) => `Create a rock-solid ARCHITECTURE.md for:
Project Name: ${context.projectName}
Tech Stack: ${JSON.stringify(context.technology)}
Database: ${context.database}
Auth: ${context.authentication}
Deployment: ${context.deployment}
Integrations: ${JSON.stringify(context.integrations)}
Security Considerations: ${JSON.stringify(context.security)}
Constraints: ${JSON.stringify(context.constraints)}

${relatedDocs?.PRD ? `\n--- Context from PRD.md ---\n${relatedDocs.PRD.slice(0, 1200)}` : ''}
${relatedDocs?.DESIGN ? `\n--- Context from DESIGN.md ---\n${relatedDocs.DESIGN.slice(0, 800)}` : ''}`
  },

  DATABASE: {
    id: 'DATABASE',
    name: 'Database Schema & Data Model',
    fileName: 'DATABASE.md',
    description: 'Skema database relasional/NoSQL, entitas, relasi ERD, indeks performa, dan strategi migrasi.',
    dependencies: ['ARCHITECTURE'],
    recommendedWith: ['ARCHITECTURE', 'PRD'],
    requiredContext: ['projectName', 'database', 'features'],
    systemPrompt: `You are a Principal Database Architect and Data Modeler.
Generate a complete, production-ready Database Architecture and Schema Specification (DATABASE.md) in GitHub-flavored Markdown.

Structure of DATABASE.md:
# [Project Name] - Database Schema & Data Model Specification

## 1. Database Engine & Modeling Philosophy
- Chosen Database Engine (e.g., PostgreSQL / Supabase / Prisma / MongoDB)
- Normalization level, data integrity mechanisms, and ACID compliance considerations

## 2. Entity Relationship Overview
- High-level relationship summary
- Mermaid ER diagram (\`\`\`mermaid erDiagram ... \`\`\`)

## 3. Detailed Table & Entity Schemas
For every table/collection:
- Column names, exact SQL/Schema types, constraints (PRIMARY KEY, NOT NULL, DEFAULT, UNIQUE)
- Foreign key relations and cascade behavior
- Explicit code block with DDL SQL or schema definitions

## 4. Indexing, Performance & Optimization
- B-Tree indexes, compound indexes, and unique constraints
- Query optimization considerations for frequent access patterns

## 5. Security & Access Rules
- Row-Level Security (RLS) policies or column-level permissions
- Soft-delete strategy, audit trails (created_at, updated_at, deleted_at)

## 6. Migration, Seeding & Backup Strategy
- Migration tool (Prisma, Drizzle, Flyway)
- Seed data considerations for development and automated backups

Strictly maintain naming conventions and referential consistency.`,
    userPromptTemplate: (context, relatedDocs) => `Create a detailed DATABASE.md for:
Project Name: ${context.projectName}
Database Selected: ${context.database}
Features to Support: ${JSON.stringify(context.features)}
Auth: ${context.authentication}

${relatedDocs?.ARCHITECTURE ? `\n--- Context from ARCHITECTURE.md ---\n${relatedDocs.ARCHITECTURE.slice(0, 1500)}` : ''}
${relatedDocs?.PRD ? `\n--- Context from PRD.md ---\n${relatedDocs.PRD.slice(0, 800)}` : ''}`
  },

  AGENTS: {
    id: 'AGENTS',
    name: 'AI Agents & LLM Guidelines',
    fileName: 'AGENTS.md',
    description: 'Instruksi sistem untuk AI coding agents, batas wewenang, konvensi kode, dan konteks proyek.',
    dependencies: ['ARCHITECTURE', 'PRD'],
    recommendedWith: ['PRD', 'ARCHITECTURE'],
    requiredContext: ['projectName', 'technology', 'features', 'constraints'],
    systemPrompt: `You are a Chief AI Systems Architect and Prompt Engineer.
Generate a comprehensive AGENTS.md document in Markdown designed to instruct and align AI Coding Agents (such as Antigravity, Cursor, Claude Code, GitHub Copilot).

Structure of AGENTS.md:
# [Project Name] - AI Coding Agent Guidelines & Rules (AGENTS.md)

## 1. Project Identity & Mission Statement
- Brief elevator pitch of what this project does and why it exists
- High-level directory organization and core domain rules

## 2. Architectural Commandments & Non-Negotiables
- Critical rules the agent MUST follow at all times
- Anti-patterns and banned libraries/approaches

## 3. Technology Stack & Coding Conventions
- Language versions, strict TypeScript guidelines
- Styling conventions, UI component patterns
- State management and API contract adherence

## 4. Tool Schemas & Function Calling Boundaries (If applicable)
- Guidelines on external API execution, file modification boundaries, and safety policies

## 5. Verification & Testing Playbook
- What commands the agent must run before declaring work complete (lint, typecheck, build, test)
- Definition of Done for any task

Ensure instructions are unambiguous, authoritative, and structured for maximum LLM adherence.`,
    userPromptTemplate: (context, relatedDocs) => `Create an AGENTS.md for:
Project Name: ${context.projectName}
Tech Stack: ${JSON.stringify(context.technology)}
Features: ${JSON.stringify(context.features)}
Constraints: ${JSON.stringify(context.constraints)}
Assumptions: ${JSON.stringify(context.assumptions.filter(a => a.accepted).map(a => a.text))}

${relatedDocs?.ARCHITECTURE ? `\n--- Context from ARCHITECTURE.md ---\n${relatedDocs.ARCHITECTURE.slice(0, 1200)}` : ''}
${relatedDocs?.PRD ? `\n--- Context from PRD.md ---\n${relatedDocs.PRD.slice(0, 800)}` : ''}`
  }
};