# prdmaker 🚀
### AI-Powered Markdown Specification Generator & Architect
**by [wigan7](https://github.com/wigan7)**

**prdmaker** is an AI-powered software specification engine that interviews developers and product teams, structures project context across 17 architectural dimensions, and crafts production-ready markdown documents:

- **PRD.md** (Product Requirements Document)
- **DESIGN.md** (Design & UI/UX Specification)
- **ARCHITECTURE.md** (System Architecture & Tech Stack)
- **DATABASE.md** (Database Schema & Data Model)
- **AGENTS.md** (AI Coding Agent Rules & Guidelines)

---

## 💎 Features

- **Adaptive AI Discovery Interview**: Context-aware questioning powered by DeepSeek API with dynamic question types (single/multi-choice, yes/no, number, text, textarea).
- **Zero Data Loss**: Persistent browser storage via Zustand ensures interview progress and drafts are safe even across page reloads or API interruptions.
- **Architectural Assumptions Review**: Inspect, accept, or reject AI assumptions before generating specifications.
- **Sequential Context Inheritance**: Subsequent documents inherit decisions from upstream documents (e.g. Database & Architecture align with PRD tech decisions).
- **Responsive 3-Panel Workspace**:
  - Thin Translucent Document Sidebar with status badges
  - Real-time Markdown Editor with live statistics
  - GitHub-flavored Markdown Preview with code highlighting
- **Version History & Iterative Regeneration**: "Improve this document" modal with feedback prompts, incremental versioning (`v1`, `v2`), and instant rollback.
- **Cross-Document Consistency Audit**: Verifies alignment and detects conflicting decisions across all documents.
- **Exporting Options**: One-click Copy, Single `.md` file download, or bundled `.zip` archive.
- **Command Palette (`⌘K` / `Ctrl+K`)**: Rapid navigation and actions.
- **Premium iOS-inspired Transparent Glass UI**: Multi-tier glassmorphism, ambient floating gradient mesh, custom vector SVG logo, and subtle spring micro-interactions.

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure DeepSeek API Key
Add your DeepSeek API key in `.env.local`:
```env
DEEPSEEK_API_KEY=your_deepseek_api_key_here
DEEPSEEK_BASE_URL=https://api.deepseek.com
DEEPSEEK_MODEL=deepseek-chat
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 👤 Author
Crafted by **[wigan7](https://github.com/wigan7)** on GitHub.