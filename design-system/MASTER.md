# Navodya Manamendra Portfolio — Master Design System
**Project Slug**: `navodya-manamendra-portfolio`  
**Theme**: Dark Cinematic Engineering & Editorial Intelligence  
**Target Viewport**: 1440px Desktop Baseline with Fluid Mobile Adaptation  
**Audience**: Engineering hiring teams, technical leads, academic collaborators, enterprise clients  

---

## 1. Design Direction & Aesthetic Philosophy

The visual language balances **dark cinematic atmosphere** with **rigorous engineering clarity**:
- **Cinematic Atmosphere**: Deep obsidian background, graphite layered surfaces, subtle atmospheric grain, and high-impact editorial typography.
- **Electric Accent**: High-voltage electric lime (`#C5FF4A`) used with extreme discipline (10% budget) exclusively for primary action triggers, focal links, and active states.
- **Zero-Pill Discipline**: Metadata (technologies, dates, categories, DOIs) is presented as clean, unboxed typography separated by subtle typographic bullets (`·` or `/`), completely eliminating generic AI pill badges.
- **No Pseudo-Technical Clutter**: Prohibits mechanical `// 01` comment headings, fake compiler telemetry, fabricated scores, or decorative pulsing dots.

---

## 2. Color System & 60-30-10 Distribution

| Tier | Token | Value | Semantic Role |
| :--- | :--- | :--- | :--- |
| **60% Canvas** | `bg-obsidian` | `#090A0C` | Deep cinematic background; foundation of all viewports |
| **30% Structure** | `bg-graphite` | `#14161A` | Secondary container surface, section cards, modals |
| | `bg-graphite-elevated` | `#1C1F26` | Elevated cards, hovering surfaces, interactive trays |
| | `border-graphite` | `#242933` | Hairline container dividers (1px solid, single elevation) |
| | `text-primary` | `#F4F3EE` | High-contrast editorial headers and primary body text |
| | `text-muted` | `#939BA8` | Readable secondary copy, descriptions, and list items |
| | `text-subtle` | `#5B6375` | Quiet technical labels, dates, DOIs, and captions |
| **10% Accent** | `accent-lime` | `#C5FF4A` | Primary CTAs, active indicator rings, link hover states |
| | `accent-glow` | `rgba(197, 255, 74, 0.12)` | Subtle focal ambient wash and highlight borders |

---

## 3. Typography Hierarchy & Rules

| Role | Font Family | Size / Leading / Tracking | Example Usage |
| :--- | :--- | :--- | :--- |
| **Hero Display** | `Outfit` (sans-serif) | `clamp(2.5rem, 5vw, 4.25rem)` / `1.05` / `-0.03em` | Primary Hero Statement |
| **Section Title** | `Outfit` (sans-serif) | `clamp(1.75rem, 3vw, 2.75rem)` / `1.15` / `-0.025em` | "Selected Works", "Research" |
| **Card Header** | `Outfit` (sans-serif) | `1.25rem – 1.5rem` / `1.2` / `-0.02em` | Project and Experience Titles |
| **Body Prose** | `Plus Jakarta Sans` | `0.9375rem – 1.0625rem` / `1.65` / `normal` | Bios, problem statements, descriptions |
| **Metadata & Code**| `JetBrains Mono` | `0.75rem – 0.8125rem` / `1.4` / `tabular-nums` | Tech stacks, dates, DOIs, metrics |

### Typographic Restraints:
- `text-wrap: balance` on all major headlines to eradicate orphan words.
- All numbers and dates rendered with `tabular-nums` for optical alignment.
- No all-caps shouting or low-opacity watermark text behind headings.

---

## 4. Top Bar Contract (1-Row, 3-Zone Architecture)

```
[ ZONE 1: BRAND ]               [ ZONE 2: NAVIGATION ]               [ ZONE 3: PRIMARY ACTION ]
Navodya Manamendra       Projects · Research · Experience · Skills            Get in Touch
(Single text wordmark)         (4 single-line links, nowrap)             (1 high-intent CTA)
```
- **Zone 1 (Brand)**: Single clean text element in `Outfit`, `whitespace-nowrap shrink-0`.
- **Zone 2 (Links)**: 4–5 concise links with hover underlines and active indicators.
- **Zone 3 (CTA)**: Single primary button styled in `#C5FF4A` with dark text.
- **Mobile Rule**: Mobile navigation collapses into a slide-over panel that never exceeds 15% sticky viewport coverage when docked.

---

## 5. Layout Architecture & Component Specifications

1. **Cinematic Hero**:
   - Split layout: Left column contains high-impact editorial headline, concise intro bio, and dual action links (View Projects / Read Research).
   - Right column: High-fidelity interactive visual container highlighting the dual core competencies: Full-Stack Engineering & Computer Vision.
   - Full-width metric/discipline anchor row below the split: `4 Full-Stack Projects` · `1 IEEE SCSE 2026 Paper` · `SLIIT IT Honours` · `AWS Graduate`.

2. **Selected Projects Showcase**:
   - Interactive category filter (All, Full-Stack, Computer Vision & AI, Enterprise / Systems, Collaboration).
   - Rich project cards featuring problem statement, personal contribution, technical stack (unboxed monospace), and functional demo/repository links.
   - Project modal case-study view allowing deep inspection of features, architecture, and reported outcomes.

3. **Featured Academic Research (IEEE SCSE 2026)**:
   - Dedicated spotlight layout for "Temporal Personal Fashion AI System with Multi-Component Integration".
   - Clear distinction of Navodya's individual contribution: Dual-View Anthropometric Measurement System (EfficientNet-B3).
   - Verified metadata: DOI `10.1109/SCSE70081.2026.11499770`, ISBN `979-8-3315-4791-2`, Supervisor `Mr. S M B Harshanath`.
   - Architectural flow diagram explaining the deep learning pipeline.

4. **Experience & Education Timeline**:
   - Accurate portrayal of Dialog Axiata PLC (Broadcast Operations & Playout, through Sara Creation) — explicitly distinguished from software engineering.
   - Department of Agrarian Development Full-Stack Internship.
   - Transparent placeholder callout for Heritage Crops Plantations (pending detail confirmation).
   - SLIIT BSc (Hons) in Information Technology degree block.

5. **Technical Skills Taxonomy**:
   - Categorized grid without fabricated percentage bars or vanity ratings.
   - Categories: Languages, Frontend, Backend, Mobile, Databases, AI/ML, Application Tech, Tools/DevOps, Cloud, Design.

6. **Certificates Gallery**:
   - Card grid with issuer, category, credential ID, and active external verification links (Credly, HackerRank, SLIIT, SoloLearn).
   - ImageKit placeholder slots with clean art-directed fallback framing.

7. **Contact & Professional Links**:
   - Real working links to GitHub and LinkedIn.
   - Functional contact message form with client-side validation and clear confirmation feedback.
   - Transparent placeholders for direct email and CV download.

---

## 6. Motion & Interaction Budget

- **GSAP & ScrollTrigger**: Section reveals with subtle translateY (15px) and opacity fade. Refresh triggers on resize.
- **Motion for React**: Micro-interactions, modal overlays, tab switching, and mobile drawer transitions.
- **Latency**: All feedback settles within 150–200ms using `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Accessibility**: All animations automatically disabled if `prefers-reduced-motion` is detected.
