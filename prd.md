Anda adalah senior full-stack engineer, product architect, AI application engineer, dan award-winning UI/UX designer.

Bangun aplikasi web bernama **MD Maker** — AI-powered Markdown Specification Generator untuk membantu pengguna membuat dokumen:

- PRD.md
- DESIGN.md
- AGENTS.md
- ARCHITECTURE.md
- DATABASE.md

Aplikasi menggunakan **DeepSeek API** sebagai AI engine untuk melakukan interview adaptif sebelum menghasilkan dokumen.

---

# CORE PRODUCT CONCEPT

MD Maker bukan sekadar Markdown editor.

MD Maker adalah:

**AI Product Architect + Requirements Interviewer + Markdown Document Generator.**

Alur utama:

User memiliki ide aplikasi
↓
Memilih dokumen yang dibutuhkan
↓
AI melakukan interview
↓
AI memahami kebutuhan
↓
AI membangun structured project context
↓
AI mendeteksi informasi yang masih kurang
↓
AI melakukan clarification
↓
User melakukan review
↓
AI menghasilkan Markdown
↓
User dapat edit / preview / regenerate / download

Pengalaman pengguna harus terasa seperti berbicara dengan seorang **senior software architect yang sangat pintar**, bukan mengisi formulir teknis.

---

# ⚠️ DESIGN DIRECTION — PRIORITAS TERTINGGI

Tampilan aplikasi HARUS memiliki visual identity yang sangat kuat:

## "Premium iOS-inspired Transparent Glass UI"

Bayangkan perpaduan:

- Apple design language
- iOS Control Center
- visionOS
- macOS translucent panels
- modern AI applications
- premium productivity tools

Tetapi jangan melakukan copy-paste desain Apple secara literal.

Tujuannya adalah menciptakan **produk original dengan kualitas visual setara aplikasi premium Apple**.

---

# VISUAL PRINCIPLES

Prioritaskan:

### 1. Extreme cleanliness

UI harus sangat clean.

Jangan memenuhi layar dengan:

- card berlebihan
- border berlebihan
- icon berlebihan
- text berlebihan
- dashboard widgets yang tidak diperlukan
- tabel yang padat

Gunakan whitespace sebagai elemen desain utama.

---

### 2. Glassmorphism yang elegan

Gunakan translucent glass panels.

Karakteristik:

- semi-transparent surfaces
- backdrop blur
- subtle border
- soft highlight
- subtle inner glow
- layered depth
- soft shadows
- translucent navigation
- floating panels

Glass harus terasa:

**premium, subtle, sophisticated**

BUKAN:

- neon gaming UI
- cyberpunk
- overly colorful glassmorphism
- excessive blur
- glossy plastic

---

# GLASS SYSTEM

Gunakan beberapa tingkat material.

### Glass Primary

Untuk panel utama:

```text
background:
rgba(255,255,255,0.55)

backdrop-filter:
blur(24px) saturate(150%)

border:
1px solid rgba(255,255,255,0.35)

shadow:
very soft and diffuse
```

Sesuaikan opacity untuk dark mode.

---

### Glass Secondary

Untuk panel kecil:

```text
rgba(255,255,255,0.35)
blur(18px)
```

---

### Floating Glass

Untuk:

- dialogs
- command palette
- AI question card
- dropdown
- tooltip

Gunakan material yang lebih translucent.

---

# BACKGROUND

Jangan menggunakan background putih polos.

Gunakan background yang sangat subtle.

Contoh:

light mode:

- warm white
- very light gray
- subtle blue/indigo atmospheric gradient

dark mode:

- near-black
- graphite
- subtle indigo/blue atmospheric glow

Tambahkan **very subtle blurred gradient blobs** di background.

Contoh:

```text
large blurred blue/indigo glow
+
soft purple glow
+
neutral background
```

Opacity harus rendah.

Background tidak boleh mengganggu readability.

---

# COLOR SYSTEM

Gunakan warna yang restrained.

Base:

- white
- off-white
- graphite
- black
- gray

Accent:

- subtle blue
- indigo
- violet

Gunakan accent hanya untuk:

- primary CTA
- active state
- AI indicator
- progress
- important interaction

Jangan membuat setiap elemen berwarna.

---

# TYPOGRAPHY

Gunakan font modern seperti:

**Inter / SF Pro-like system font**

Jika platform memungkinkan, gunakan system font stack:

```css
-apple-system,
BlinkMacSystemFont,
"SF Pro Display",
"SF Pro Text",
Inter,
system-ui,
sans-serif
```

Typography harus:

- clean
- highly readable
- spacious
- restrained

Gunakan hierarchy yang kuat.

Hindari heading terlalu besar seperti landing page template.

---

# CORNER RADIUS

Gunakan generous rounded corners.

Contoh:

- buttons: 12–16px
- inputs: 14–18px
- cards: 20–28px
- major panels: 28–32px
- floating surfaces: 24–32px

Namun jangan membuat semua elemen terlihat seperti bubble.

---

# SHADOWS

Gunakan shadow yang sangat subtle.

Contoh konsep:

```text
large blur
low opacity
high spread
```

Hindari:

- dark heavy shadows
- hard shadows
- obvious elevation

Depth harus berasal dari:

**transparency + blur + border + lighting**

bukan dari shadow berat.

---

# BORDERS

Border sangat subtle.

Gunakan:

```text
rgba(255,255,255,0.25)
```

atau equivalent dark-mode border.

Jangan memberikan border tebal pada semua komponen.

---

# ICONOGRAPHY

Gunakan icon style:

- thin
- simple
- geometric
- consistent

Gunakan Lucide atau icon library modern yang setara.

Jangan menggunakan emoji sebagai icon UI.

---

# ANIMATION

Motion harus terasa seperti iOS.

Gunakan:

- spring-like easing
- 150–300ms transitions
- subtle scale
- fade
- blur transition
- slide

Contoh:

Button hover:

scale(1.01)

Card hover:

translateY(-1px)

Dialog:

fade + scale 0.98 → 1

Jangan menggunakan:

- bouncing animation
- excessive parallax
- spinning decorations
- flashy effects

---

# MICRO INTERACTION

Perhatikan detail kecil.

Contoh:

Saat AI sedang berpikir:

glass AI indicator:

● Thinking...

dengan subtle animated glow.

Saat jawaban tersimpan:

✓ Saved

muncul sebentar kemudian fade.

Saat document selesai:

subtle success animation.

Semua motion harus understated.

---

# APPLICATION SHELL

Jangan membuat sidebar dashboard tradisional yang besar.

Gunakan **floating translucent navigation**.

Desktop:

```text
                 MD Maker
      ┌──────────────────────────────┐
      │  Projects   Workspace   ...   │
      └──────────────────────────────┘

              Main Content
```

Atau floating sidebar yang sangat tipis.

Navigation harus terasa seperti bagian dari glass environment.

---

# LANDING / HOME

Home screen sangat minimal.

Contoh:

```text
                    MD Maker

       Turn your idea into
       production-ready specifications.

       [ Create New Project ]

       Your Projects

       ┌───────────────────────────────┐
       │ Mukti Adventure               │
       │ 5 documents · Updated today   │
       └───────────────────────────────┘
```

Jangan membuat landing page marketing yang panjang.

Aplikasi adalah productivity tool.

---

# CREATE PROJECT

Gunakan centered glass modal / glass sheet.

Judul:

**Create a new project**

Input:

Project name

Description

Kemudian:

**What documents do you need?**

Gunakan elegant selectable glass pills/cards:

```text
┌──────────┐ ┌──────────┐
│ PRD      │ │ DESIGN   │
│ Product  │ │ UI/UX    │
└──────────┘ └──────────┘

┌──────────┐ ┌──────────┐
│ AGENTS   │ │ ARCH     │
│ AI rules │ │ Technical│
└──────────┘ └──────────┘

┌─────────────────────────┐
│ DATABASE                │
│ Data model              │
└─────────────────────────┘
```

Selected state:

- subtle accent background
- thin glowing border
- checkmark

Tidak perlu checkbox HTML besar.

---

# DOCUMENT SELECTION

Tambahkan:

**Select all**

dan:

**Recommended**

Jika user memilih PRD + Architecture, AI dapat memberikan informasi:

"Architecture will use decisions from your PRD."

Gunakan tooltip/info kecil.

---

# AI INTERVIEW EXPERIENCE

Ini adalah halaman terpenting.

Jangan membuatnya seperti chat application biasa.

Jangan gunakan tampilan:

User bubble kanan
AI bubble kiri
User bubble kanan
AI bubble kiri

Sebagai gantinya gunakan **AI Architect Canvas**.

Layout:

```text
        Project: Mukti Adventure

       ┌─────────────────────────────┐
       │                             │
       │   Let's understand your     │
       │   project.                  │
       │                             │
       │   What problem should       │
       │   your application solve?   │
       │                             │
       │   ┌───────────────────────┐ │
       │   │ Your answer...        │ │
       │   └───────────────────────┘ │
       │                             │
       │              Continue →     │
       └─────────────────────────────┘

       Project Understanding
       ● ● ● ○ ○ ○ ○
```

Question card harus menjadi fokus utama.

Gunakan glass panel besar dengan whitespace luas.

---

# AI AVATAR / INDICATOR

Jangan menggunakan robot/cartoon avatar.

Gunakan abstract AI indicator.

Contoh:

small translucent orb

atau:

soft gradient glowing circle.

Sangat minimal.

---

# QUESTION TYPES

AI dapat menghasilkan:

### Text

textarea glass.

### Single Choice

floating glass options.

### Multiple Choice

glass selection cards.

### Number

minimal numeric input.

### Yes/No

segmented control.

### Long Description

large glass textarea.

UI question harus menyesuaikan jenis jawaban.

---

# INTERVIEW PROGRESS

Jangan gunakan progress bar yang terlihat seperti loading website.

Gunakan subtle progress indicator.

Contoh:

```text
Understanding your project

● ● ● ● ○ ○ ○

Features
██████████░░ 78%
```

Atau gunakan kategori:

```text
Project ✓
Users ✓
Features ✓
Design ●
Technology ○
Data ○
```

Gunakan accent yang sangat subtle.

---

# INTERVIEW SUMMARY

Setelah interview selesai:

```text
              Your project is understood.

        ┌─────────────────────────────┐
        │ Project                     │
        │ Mukti Adventure             │
        │                             │
        │ Target users                │
        │ Elementary students         │
        │                             │
        │ Platform                    │
        │ Web                         │
        └─────────────────────────────┘
```

Kemudian:

**AI assumptions**

gunakan compact glass cards.

---

# DOCUMENT GENERATION

Saat generating:

Jangan menampilkan spinner biasa.

Buat pengalaman:

```text
Generating your workspace

        ◌

PRD                 ✓
DESIGN              ●
ARCHITECTURE        ○
DATABASE            ○
AGENTS              ○
```

Gunakan subtle animation.

Setelah selesai:

**Your specification is ready.**

---

# DOCUMENT WORKSPACE

Ini adalah UI paling kompleks.

Gunakan:

```text
┌──────────────────────────────────────────────────────────┐
│ MD Maker                     PRD.md        ⋯             │
├─────────────┬─────────────────────────┬─────────────────┤
│ Documents   │ Markdown                │ Preview         │
│             │                         │                 │
│ ● PRD       │ # Product Requirements  │ Product         │
│ ○ DESIGN    │                         │ Requirements    │
│ ○ AGENTS    │ ## Overview             │                 │
│ ○ ARCH      │                         │ Overview        │
│ ○ DATABASE  │                         │                 │
└─────────────┴─────────────────────────┴─────────────────┘
```

Tetapi seluruh interface harus tetap translucent dan lightweight.

---

# DOCUMENT SIDEBAR

Sidebar harus tipis.

Jangan gunakan card besar untuk setiap dokumen.

Gunakan:

```text
DOCUMENTS

◉ PRD.md
○ DESIGN.md
○ AGENTS.md
○ ARCHITECTURE.md
○ DATABASE.md
```

Status:

✓ complete
● generating
○ not generated

---

# MARKDOWN EDITOR

Gunakan editor dengan:

- monospace
- syntax highlighting subtle
- line numbers optional
- clean cursor
- no excessive UI chrome

Jangan membuat editor terlihat seperti IDE penuh.

---

# PREVIEW

Markdown preview harus sangat clean.

Typography seperti modern documentation website.

Gunakan:

- proper heading hierarchy
- comfortable line height
- readable content width
- code blocks
- tables
- lists
- blockquotes

---

# TOP TOOLBAR

Toolbar sangat minimal:

```text
PRD.md

Edit   Preview

          Copy   Download   ⋯
```

Jangan memenuhi toolbar dengan puluhan button.

Actions sekunder masuk ke menu `⋯`.

---

# REGENERATE

Saat regenerate:

Gunakan glass sheet:

**Improve this document**

Textarea:

"What would you like to change?"

Examples:

"Make the architecture simpler."

"Add role-based access."

"Make the design more mobile friendly."

Button:

**Regenerate**

---

# COMMAND PALETTE

Tambahkan optional command palette:

`⌘ K`

atau

`Ctrl K`

Glass modal.

Actions:

- New Project
- Open Project
- Generate Documents
- Search Documents
- Toggle Dark Mode
- Download Project

Command palette harus terlihat seperti premium macOS/iOS interface.

---

# DARK MODE

Dark mode bukan sekadar:

background black
+
white card.

Gunakan:

- deep graphite
- translucent black glass
- subtle blue/indigo atmospheric glow
- white text with hierarchy
- low-opacity borders

Dark mode harus sangat premium.

---

# LIGHT MODE

Light mode:

- warm white / soft gray
- translucent white glass
- subtle blue/indigo glow
- dark graphite typography

Jangan menggunakan pure #FFFFFF untuk seluruh UI.

---

# RESPONSIVE DESIGN

Desktop:

three-panel workspace.

Tablet:

two-panel.

Mobile:

single-panel.

Pada mobile:

Documents
↓
Editor / Preview tabs
↓
Floating action button / bottom toolbar

Glass surfaces harus tetap nyaman digunakan pada layar kecil.

---

# DO NOT

Sangat penting:

JANGAN membuat:

- generic Bootstrap dashboard
- generic SaaS template
- colorful dashboard
- excessive gradients
- neon UI
- cyberpunk
- excessive glassmorphism
- huge shadows
- thick borders
- excessive cards
- giant sidebar
- emoji icons
- cartoon AI robot
- unnecessary illustrations
- noisy background
- excessive animations
- excessive badges
- excessive statistics
- fake analytics dashboard

MD Maker harus terlihat seperti:

**premium AI productivity tool**

bukan:

**admin dashboard template.**

---

# DESIGN QUALITY BAR

Setiap halaman harus terasa:

**"Less, but better."**

Jika sebuah elemen tidak membantu user:

hapus.

Jika sebuah border tidak diperlukan:

hapus.

Jika sebuah card tidak diperlukan:

hapus.

Jika sebuah button bisa menjadi icon:

pertimbangkan icon.

Jika whitespace dapat meningkatkan hierarchy:

gunakan whitespace.

---

# DEEPSEEK API

Gunakan DeepSeek API sebagai AI provider.

API key:

DEEPSEEK_API_KEY

Jangan expose API key ke client.

Semua request melalui server.

Buat abstraction:

```text
AIProvider
   ↓
DeepSeekProvider
```

Agar provider dapat diganti di masa depan.

---

# AI INTERVIEW

DeepSeek harus:

1. memahami project
2. memahami selected documents
3. membuat structured context
4. mendeteksi missing information
5. bertanya secara adaptive
6. menghindari pertanyaan duplikat
7. meminta clarification jika ambigu
8. menentukan kapan informasi cukup
9. menghasilkan assumptions jika diperlukan

Jangan langsung generate Markdown sebelum interview selesai.

---

# DOCUMENT TYPES

Implementasikan:

PRD.md
DESIGN.md
AGENTS.md
ARCHITECTURE.md
DATABASE.md

Gunakan registry architecture:

```text
DocumentType
├── name
├── fileName
├── description
├── requiredContext
├── optionalContext
├── dependencies
├── generatorPrompt
└── validationRules
```

Dengan demikian nantinya mudah menambahkan:

API.md
TESTING.md
SECURITY.md
DEPLOYMENT.md
GAME_DESIGN.md
CONTENT.md
COMPONENTS.md
ROUTES.md

---

# DOCUMENT CONSISTENCY

Pastikan:

PRD
↓
DESIGN
↓
ARCHITECTURE
↓
DATABASE
↓
AGENTS

saling konsisten.

Jangan sampai:

PRD:
Supabase

ARCHITECTURE:
Firebase

DATABASE:
MongoDB

AGENTS:
PostgreSQL

Jika terjadi konflik, explicit user decision adalah sumber kebenaran tertinggi.

---

# STRUCTURED PROJECT CONTEXT

Jangan menyimpan interview hanya sebagai transcript.

Gunakan structured object:

```ts
projectContext = {
  projectName,
  description,
  problem,
  goals,
  users,
  personas,
  platforms,
  features,
  userFlows,
  designPreferences,
  technology,
  authentication,
  database,
  integrations,
  security,
  deployment,
  constraints,
  assumptions
}
```

Context harus terus diperbarui setelah setiap jawaban.

---

# DOCUMENT EDITOR

User dapat:

- edit
- preview
- copy
- download
- regenerate
- regenerate with feedback
- restore previous version

---

# VERSIONING

Setiap regeneration membuat version baru.

Contoh:

PRD.md

v1
v2
v3

User dapat restore version lama.

---

# EXPORT

Individual:

Download PRD.md

Download DESIGN.md

Download AGENTS.md

Download ARCHITECTURE.md

Download DATABASE.md

All:

```text
project-name/
├── PRD.md
├── DESIGN.md
├── AGENTS.md
├── ARCHITECTURE.md
└── DATABASE.md
```

Download sebagai ZIP.

---

# SECURITY

Wajib:

- API key server-side
- environment variables
- input validation
- Markdown sanitization
- safe rendering
- protected API routes
- rate limiting jika memungkinkan
- safe error handling
- no secrets in source code

---

# ERROR HANDLING

Jika DeepSeek gagal:

Jangan kehilangan interview.

Simpan state terlebih dahulu.

Tampilkan:

"Something went wrong. Your progress is safe."

Actions:

Retry

Continue Later

---

# PERFORMANCE

Jangan terus mengirim transcript penuh ke DeepSeek.

Gunakan:

- structured context
- summarized context
- incremental updates
- context compression

Jika conversation panjang, lakukan summarization.

---

# MVP

Phase 1:

- project creation
- document selection
- DeepSeek API
- AI interview
- structured context
- PRD generator
- Markdown editor
- Markdown preview
- copy
- download

Phase 2:

- DESIGN
- AGENTS
- ARCHITECTURE
- DATABASE
- consistency checking
- assumptions

Phase 3:

- project persistence
- versioning
- regenerate with feedback
- ZIP export
- authentication
- command palette
- advanced interview

Namun architecture harus memungkinkan seluruh Phase 2 dan Phase 3 ditambahkan tanpa rewrite besar.

---

# TECH STACK

Gunakan stack modern yang stabil.

Recommended:

Next.js
React
TypeScript
Tailwind CSS
shadcn/ui atau equivalent
DeepSeek API
PostgreSQL/Supabase

Gunakan system font.

Gunakan Lucide icons atau equivalent.

Jangan menambahkan library hanya demi efek visual.

---

# CODE QUALITY

Pisahkan:

```text
app/
components/
lib/
  ai/
  prompts/
  documents/
  database/
  validation/
  markdown/
types/
schemas/
```

Jangan membuat satu file dengan ribuan baris.

Gunakan reusable components.

Gunakan TypeScript strict mode.

---

# IMPORTANT EXECUTION RULE

Jangan hanya membuat mockup.

Implementasikan aplikasi yang benar-benar berfungsi.

DeepSeek harus benar-benar terhubung.

AI interview harus benar-benar berjalan.

Markdown generation harus benar-benar menggunakan hasil interview.

Editor harus benar-benar dapat diedit.

Preview harus benar-benar merender Markdown.

Download harus benar-benar menghasilkan file.

---

# BEFORE CODING

Sebelum menulis code:

1. Analisis requirement.
2. Tentukan architecture.
3. Tentukan data model.
4. Tentukan AI pipeline.
5. Tentukan prompt architecture.
6. Tentukan component architecture.
7. Tentukan folder structure.
8. Tentukan implementation plan.

Kemudian implementasikan.

---

# AFTER CODING

Jalankan:

- TypeScript check
- lint
- tests
- build

Perbaiki seluruh error.

Jangan meninggalkan broken build.

---

# FINAL ACCEPTANCE CRITERIA

Aplikasi selesai jika:

✓ Project dapat dibuat.

✓ User dapat memilih dokumen.

✓ User dapat memilih kombinasi dokumen apa pun.

✓ AI melakukan adaptive interview.

✓ AI tidak mengulang pertanyaan yang sudah terjawab.

✓ Structured context dibuat.

✓ AI dapat meminta clarification.

✓ AI assumptions ditampilkan.

✓ User dapat menerima/menolak assumptions.

✓ User dapat generate dokumen.

✓ PRD.md benar-benar dibuat.

✓ DESIGN.md benar-benar dibuat.

✓ AGENTS.md benar-benar dibuat.

✓ ARCHITECTURE.md benar-benar dibuat.

✓ DATABASE.md benar-benar dibuat.

✓ Dokumen konsisten.

✓ Markdown dapat diedit.

✓ Markdown dapat dipreview.

✓ Markdown dapat dicopy.

✓ Markdown dapat didownload.

✓ Regeneration bekerja.

✓ Versioning tersedia.

✓ DeepSeek API key aman.

✓ Error tidak menghapus progress.

✓ Responsive.

✓ Dark mode.

✓ Light mode.

✓ Glass UI terasa premium.

✓ Tidak terlihat seperti template dashboard generik.

✓ Tidak ada fitur utama yang hanya berupa mockup.

---

# FINAL DESIGN DIRECTIVE

Jika harus memilih antara:

**lebih banyak fitur visual**

dan

**lebih sedikit elemen tetapi jauh lebih elegan**

selalu pilih:

**lebih sedikit elemen + lebih elegan.**

MD Maker harus memberikan kesan pertama:

> "Ini aplikasi AI premium yang dibuat dengan sangat detail."

Bukan:

> "Ini template dashboard yang diberi glassmorphism."

Gunakan prinsip:

**Clarity > Decoration**

**Whitespace > More Components**

**Subtlety > Effects**

**Hierarchy > Complexity**

**Function > Ornament**

**Premium > Flashy**

Bangun aplikasi secara nyata, bukan sekadar desain konsep.