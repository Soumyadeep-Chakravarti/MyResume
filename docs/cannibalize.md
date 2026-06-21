# Cannibalization Report

> Generated from a full file-by-file audit of `src/` (56 files).
> Labels: **KEEP** · **MOVE** · **REWRITE** · **EXTRACT DATA FROM** · **MINE FOR PATTERNS** · **DELETE NOW** · **DELETE AFTER EXTRACTION**
>
> High-risk migrations are marked with ⚠.

---

## Target Skeleton

Before any extraction, create this structure:

```
src/
  content/
    profile.ts
    projects.ts
    skills.ts
    links.ts
  data/
    github/
      github.types.ts
      github.client.ts
      github.cache.ts
      github.projects.ts
  experience/
    animation/
      AnimationEngine.ts
    runtime/
      Heartbeat.ts
    sim/
      SimulationDirector.ts
      PhysicsWorkerClient.ts
      workers/
        physics.worker.ts
    input/
      ScrollService.ts
      PointerService.ts
  ui/
    primitives/
      Box.tsx
      Center.tsx
      Stack.tsx
      Text.tsx
    overlays/
      Overlay.tsx
    hooks/
      useMediaQuery.ts
      usePointer.ts
  state/
    theme.ts
    environment.ts
  types/
    content.ts
    simulation.ts
    input.ts
    theme.ts
    environment.ts
  labs/
    rain-testing/
      RainCanvas.tsx
      rain.frag
```

---

## Root / Shell

| File | Lines | Verdict | Target | Rationale |
|---|---|---|---|---|
| `src/index.tsx` | 16 | **KEEP** | — | Clean Solid entry point. Mounts app, imports CSS. No changes needed. |
| `src/App.tsx` | 22 | **REWRITE** | `src/App.tsx` | Currently a hybrid shell with duplicate `id="root"` (bug), empty heartbeat callback, and placeholder `<h1>`. Should become `<ThemeProvider><ExperienceRoot /></ThemeProvider>`. |
| `src/index.css` | 1 | **REWRITE** | `src/index.css` | Single `@import 'tailwindcss'`. Merge `styles/global.css` into this file. This becomes the single global CSS entry. |
| `src/styles/global.css` | 20 | **DELETE AFTER EXTRACTION** | — | Merge contents into `index.css`, then delete. |

---

## Routes

| File | Lines | Verdict | Target | Rationale |
|---|---|---|---|---|
| `src/routes/index.tsx` | 10 | **DELETE NOW** | — | Placeholder stub. Never imported. No router wired. |

---

## Context

| File | Lines | Verdict | Target | Rationale |
|---|---|---|---|---|
| `src/context/ThemeContext.tsx` | 27 | **REWRITE** | `src/state/theme.ts` | `useTheme` exported but never called. Only supports light/dark — too simple. **Do not overload with atmospheric state.** Split into `state/theme.ts` (UI light/dark) and `state/environment.ts` (storm/sunrise/mist). |

---

## Types

| File | Lines | Verdict | Target | Rationale |
|---|---|---|---|---|
| `src/types/index.ts` | 11 | **DELETE NOW** | — | Barrel. Kill to avoid hiding ownership. |
| `src/types/engine.ts` | 34 | **MOVE + SPLIT** | `src/types/simulation.ts` | Well-designed discriminated union. But "engine" is too vague. Split into `simulation.ts` (physics messages) and `experience.ts` (experience modes). |
| `src/types/interactions.ts` | 10 | **REWRITE / EXPAND** | `src/types/input.ts` | `Coordinates` and `ScrollState` are dead — exported but never imported. Rewrite with actual input domain types: pointer state, scroll metrics, input events. |
| `src/types/theme.ts` | 7 | **REWRITE / SPLIT** | `src/types/theme.ts` + `src/types/environment.ts` | `ThemeMode` is just `"light" | "dark"`. Split into UI theme types and environment/atmosphere types. **Do not mix these two systems.** |

### New type definitions to create

```ts
// src/types/theme.ts
type ThemeMode = "light" | "dark";

// src/types/environment.ts
type EnvironmentPreset =
  | "storm-cliffs"
  | "misty-sunrise"
  | "clear-night"
  | "rain-heavy";

type ExperienceQuality = "low" | "medium" | "high" | "ultra";

// src/types/simulation.ts
type SkillLevel = "expert" | "intermediate" | "familiar";

interface SkillItem {
  id: string;
  label: string;
  level: SkillLevel;
  icon?: string;
  accent?: string;
  tags?: string[];
}

interface SkillCategory {
  id: "languages" | "frameworks" | "tools";
  label: string;
  items: SkillItem[];
}
```

---

## Services

| File | Lines | Verdict | Target | Rationale |
|---|---|---|---|---|
| `src/services/index.ts` | 2 | **DELETE NOW** | — | Barrel. Kill. |
| `src/services/AnimationEngine.ts` | 46 | **MOVE + REWRITE** ⚠ | `src/experience/animation/AnimationEngine.ts` | **High-value survivor.** Core concept (animation registration + conflict governance) is critical. But: calls `onCleanup()` outside component lifecycle (latent bug), never imported, needs richer metadata (id, owner, domain, lifecycle, killOn). **Risk: can become a god object or silent wrapper around GSAP rather than a real orchestration layer.** |
| `src/services/Heartbeat.ts` | 30 | **MOVE + REWRITE** ⚠ | `src/experience/runtime/Heartbeat.ts` | **Highest-priority survivor.** rAF loop with callback registration is the timing substrate everything touches. But: starts in constructor at import time (wasteful), `start()` is misleading, unused `onCleanup` import. Fix lifecycle, make start lazy. **Risk: can become the dumping ground for every loop.** |

---

## Engine

| File | Lines | Verdict | Target | Rationale |
|---|---|---|---|---|
| `src/engine/index.ts` | 1 | **DELETE NOW** | — | Barrel. Kill. |
| `src/engine/PhysicsManager.ts` | 44 | **SPLIT** ⚠ | `src/experience/sim/PhysicsWorkerClient.ts` + `src/experience/sim/SimulationDirector.ts` | Clean 44-line implementation. But one file should not own both worker protocol and simulation orchestration. **Split into:** `PhysicsWorkerClient` (worker creation, postMessage/onmessage, typed protocol, init/destroy/error) and `SimulationDirector` (public API, entity registration, orchestration with animation/runtime, quality toggles). **Risk: can blur the boundary between scheduler and business logic.** |

---

## Workers

| File | Lines | Verdict | Target | Rationale |
|---|---|---|---|---|---|
| `src/workers/physics.worker.ts` | 96 | **MOVE + REWRITE** ⚠ | `src/experience/sim/workers/physics.worker.ts` | Real logic: Three.js renderer, cannon-es physics, body/mesh sync. **High-value survivor.** Critical bugs: `window.devicePixelRatio` not available in Worker, `spawn_object` no-op, `OffscreenCanvas` API assumptions. Fix worker-environment issues, formalize message protocol. **Risk: worker + OffscreenCanvas + three + cannon in one file becomes un-debuggable if not split internally.** |

---

## Hooks

| File | Lines | Verdict | Target | Rationale |
|---|---|---|---|---|
| `src/hooks/index.ts` | 4 | **DELETE NOW** | — | Barrel. Kill. |
| `src/hooks/useMediaQuery.ts` | 14 | **MOVE** | `src/ui/hooks/useMediaQuery.ts` | Clean utility hook. Only used by `Responsive.tsx` currently, but will be needed. Move as-is. |
| `src/hooks/useMouse.ts` | 12 | **REWRITE** | `src/experience/input/PointerService.ts` + `src/ui/hooks/usePointer.ts` | Unused. Concept valuable — should become a proper input service. Authoritative pointer tracking in `experience/input/`; thin UI adapter in `ui/hooks/`. |
| `src/hooks/usePhysics.ts` | 22 | **DELETE NOW** | — | Unused. Eagerly instantiates `PhysicsManager` outside `onMount` (bug). Physics should be owned by `SimulationDirector`, not a hook. |
| `src/hooks/useScrollVelocity.ts` | 18 | **REWRITE** | `src/experience/input/ScrollService.ts` | Unused. Scroll velocity derivation belongs inside ScrollService. Velocity never resets to 0 when scrolling stops (bug). Absorb into service. |

---

## Components — Root-level

| File | Lines | Verdict | Target | Rationale |
|---|---|---|---|---|
| `src/components/index.ts` | 3 | **DELETE NOW** | — | Barrel. Kill. |
| `src/components/Layout.tsx` | 15 | **DELETE NOW** | — | Uses `@solidjs/router` but no router wired. Light-mode styles clash with dark theme. Dead code. |
| `src/components/SmoothScroll.tsx` | 21 | **SPLIT** | `src/experience/input/ScrollService.ts` + `src/experience/runtime/` (bootstrap) | **Two responsibilities:** (A) Lenis lifecycle / scroll state authority → `ScrollService.ts`; (B) bridge that hooks Lenis into the runtime tick/heartbeat → either inside ScrollService or `ExperienceBootstrap.ts`. Don't let ScrollService become a dumping ground. rAF loop never stores frameId (memory leak). |

---

## Components — UI Primitives

| File | Lines | Verdict | Target | Rationale |
|---|---|---|---|---|
| `src/components/ui/index.ts` | 6 | **DELETE NOW** | — | Barrel. Kill. |
| `src/components/ui/Box.tsx` | 26 | **MOVE** | `src/ui/primitives/Box.tsx` | Clean layout primitive. `splitProps` correct. No over-abstraction. Move as-is. |
| `src/components/ui/Center.tsx` | 24 | **MOVE** | `src/ui/primitives/Center.tsx` | Simple centering primitive. Clean. Move as-is. |
| `src/components/ui/Stack.tsx` | 25 | **MOVE** | `src/ui/primitives/Stack.tsx` | Clean flexbox primitive. Move as-is. |
| `src/components/ui/Text.tsx` | 32 | **REWRITE** | `src/ui/primitives/Text.tsx` | Right idea (variant → tag + size) but uses dynamic JSX tag which is broken in SolidJS. Rewrite with `Dynamic` from `solid-js/web`. |
| `src/components/ui/Overlay.tsx` | 22 | **REWRITE** | `src/ui/overlays/Overlay.tsx` | Valuable concept (Portal + backdrop) but: `isOpen` is plain boolean not getter (won't re-render), no click-outside-to-close, no body scroll lock. Rewrite as proper overlay system. |
| `src/components/ui/Responsive.tsx` | 19 | **DELETE NOW** | — | Wraps `useMediaQuery` in a render helper. Adds indirection without reducing complexity. Use `useMediaQuery` directly. |

---

## Components — Legacy

### Registry & Entry

| File | Lines | Verdict | Target | Rationale |
|---|---|---|---|---|
| `src/components/legacy/index.tsx` | 5 | **DELETE NOW** | — | Barrel with unused `For` import. Kill. |
| `src/components/legacy/ComponentsRegistry.tsx` | 118 | **EXTRACT DATA FROM** (schema donor) then **DELETE AFTER EXTRACTION** | `src/content/skills.ts` | Section registry architecture should not survive. But the `ALL_SKILLS_DATA` structure is the richest data source — **promote its data model into a first-class content contract**, not just copy values. Contains 5 inline SVG icon components — extract as assets. |
| `src/components/legacy/SimplifiedResume.tsx` | 59 | **MINE FOR PATTERNS** then **DELETE AFTER EXTRACTION** | — | Old page shell. Has unused imports, redundant constants. The `IntersectionObserver` section-tracking pattern is worth carrying forward as a service concept. Kill after mining. |

### Sections

| File | Lines | Verdict | Target | Rationale |
|---|---|---|---|---|
| `Sections/Hero/Hero.tsx` | 74 | **EXTRACT DATA FROM** | `src/content/profile.ts` | Name, title, description copy, per-character rendering idea, CTA copy. Extract all text. Kill shell. |
| `Sections/About/About.tsx` | 50 | **EXTRACT DATA FROM** | `src/content/profile.ts` | Bio text as `ARCHITECT_BIO_PARTS` array with highlighted segments. Clean data shape — extract. Kill. |
| `Sections/Projects/Projects.tsx` | 259 | **EXTRACT INTO TWO TARGETS** ⚠ | `src/content/projects.ts` + `src/data/github/*` | **Two different things in one file:** (A) curated project metadata → `content/projects.ts`; (B) GitHub API fetch/cache logic → `data/github/`. **Risk: static portfolio content gets entangled with live GitHub data. You accidentally make your frontpage depend on GitHub API latency/rate limits.** |
| `Sections/Skills/Skills.tsx` | 194 | **MINE FOR PATTERNS** then **DELETE AFTER EXTRACTION** | — | Contains category icons, skill card layout, level indicators, responsive grid. Data is already in ComponentsRegistry. Mine the layout/density patterns. Kill. |
| `Sections/Contact/Contact.tsx` | 135 | **EXTRACT DATA FROM** | `src/content/links.ts` | Social links (LinkedIn, GitHub, Instagram, Discord), email CTA, 4 inline SVG icons. Extract links as typed data, icons as assets. Kill. |

### Legacy UI

| File | Lines | Verdict | Target | Rationale |
|---|---|---|---|---|
| `legacy/UI/NavBar.tsx` | 152 | **MINE FOR PATTERNS** | — | Well-implemented responsive navbar: scroll-aware styling, hamburger menu, smooth-scroll. Mine the interaction patterns. Kill component. |
| `legacy/UI/SectionNav.tsx` | 107 | **DELETE NOW** | — | Right-side dot nav for sections. Tightly coupled to old architecture. Kill. |
| `legacy/UI/SectionTitle.tsx` | 21 | **DELETE NOW** | — | Accepts `level` but ignores it. Never imported. Dead code. |
| `legacy/UI/Card.tsx` | 112 | **MINE FOR PATTERNS** | — | Never used (Projects defines inline RepoCard). But the concept of title/subtitle/metadata display could inform `Surface.tsx` if needed. Mine, then kill. |

### Skill Data Files (16 files, all 10 lines each)

| Category | Files | Verdict | Target |
|---|---|---|---|
| Languages | `Java.tsx`, `JavaScript.tsx`, `TypeScript.tsx`, `Python.tsx`, `CPP.tsx`, `C.tsx`, `Kotlin.tsx`, `Rust.tsx` | **EXTRACT DATA FROM** | `src/content/skills.ts` |
| Frameworks | `React.tsx`, `NodeJs.tsx`, `Tailwindcss.tsx` | **EXTRACT DATA FROM** | `src/content/skills.ts` |
| Tools | `Docker.tsx`, `Git.tsx`, `Linux.tsx`, `Windows.tsx`, `SQL.tsx` | **EXTRACT DATA FROM** | `src/content/skills.ts` |

Collapse all 16 into one typed `skills.ts`. Extract inline SVG icons as assets. Delete all 16 `.tsx` files.

### Target content contract for skills

```ts
// src/content/skills.ts
import type { SkillCategory } from "@/types/simulation";

export const skillCategories: SkillCategory[] = [
  {
    id: "languages",
    label: "Core Languages & Systems",
    items: [
      { id: "python", label: "Python", level: "expert", accent: "#3776AB" },
      { id: "typescript", label: "TypeScript", level: "expert", accent: "#3178C6" },
      // ...
    ],
  },
  // ...
];
```

---

## Labs

| File | Lines | Verdict | Target | Rationale |
|---|---|---|---|---|
| `labs/rain-testing/RainCanvas.tsx` | 20 | **KEEP** | `src/labs/` | Stub/experiment. Exactly where it belongs. |
| `labs/rain-testing/rain.frag` | 19 | **KEEP** | `src/labs/` | Shader asset. Note: GLSL ES 1.0 — may need updating for WebGL 2. |

---

## Summary Statistics

| Verdict | Count | % |
|---|---|---|
| **KEEP** | 4 | 7% |
| **MOVE** | 4 | 7% |
| **REWRITE** | 8 | 14% |
| **EXTRACT DATA FROM** | 21 | 38% |
| **MINE FOR PATTERNS** | 5 | 9% |
| **DELETE NOW** | 10 | 18% |
| **DELETE AFTER EXTRACTION** | 4 | 7% |

---

## Highest-Value Survivors (priority order)

### Runtime / infra

1. ⚠ **`services/Heartbeat.ts`** → `experience/runtime/` — timing substrate everything touches
2. ⚠ **`services/AnimationEngine.ts`** → `experience/animation/` — animation governance
3. ⚠ **`engine/PhysicsManager.ts`** → split into `PhysicsWorkerClient` + `SimulationDirector`
4. ⚠ **`workers/physics.worker.ts`** → `experience/sim/workers/` — real physics logic
5. **`components/SmoothScroll.tsx`** → split into ScrollService + bootstrap bridge

### UI

6. `components/ui/Box.tsx` → `ui/primitives/`
7. `components/ui/Stack.tsx` → `ui/primitives/`
8. `components/ui/Center.tsx` → `ui/primitives/`
9. `hooks/useMediaQuery.ts` → `ui/hooks/`

### Content/data

10. `legacy/ComponentsRegistry.tsx` → `content/skills.ts` (schema donor)
11. `legacy/Sections/Projects/Projects.tsx` → `content/projects.ts` + `data/github/*`
12. `legacy/Sections/Skills/Data/*` → `content/skills.ts` (16 files collapsed)
13. `legacy/Sections/Hero/Hero.tsx` → `content/profile.ts`
14. `legacy/Sections/About/About.tsx` → `content/profile.ts`
15. `legacy/Sections/Contact/Contact.tsx` → `content/links.ts`

---

## Files to Delete Without Salvage

### DELETE NOW (no extraction needed)

- `src/routes/index.tsx` — placeholder stub
- `src/components/Layout.tsx` — dead code, wrong theme
- `src/components/legacy/UI/SectionTitle.tsx` — never imported, ignores props
- `src/components/legacy/UI/SectionNav.tsx` — old section-nav architecture
- `src/components/legacy/index.tsx` — barrel with unused import
- `src/hooks/usePhysics.ts` — unused, buggy, wrong ownership model
- `src/types/index.ts` — barrel
- `src/services/index.ts` — barrel
- `src/engine/index.ts` — barrel
- `src/hooks/index.ts` — barrel
- `src/components/index.ts` — barrel
- `src/components/ui/index.ts` — barrel
- `src/components/ui/Responsive.tsx` — adds indirection without value

### DELETE AFTER EXTRACTION (content must be mined first)

- `src/components/legacy/SimplifiedResume.tsx` — after mining IntersectionObserver pattern
- `src/components/legacy/ComponentsRegistry.tsx` — after extracting skill schema
- `src/components/legacy/UI/Card.tsx` — after mining display pattern
- `src/styles/global.css` — after merging into index.css

---

## Execution Order

### Wave 0 — Skeleton

Create the target folder structure and empty destination files. Wire path aliases. Mark legacy tree as read-only in your head.

### Wave 1 — Content Liberation

1. Create `src/content/profile.ts` — extract from Hero + About
2. Create `src/content/projects.ts` — extract curated project metadata from Projects
3. Create `src/content/skills.ts` — collapse 16 skill data files + ComponentsRegistry data into typed contract
4. Create `src/content/links.ts` — extract from Contact
5. Create `src/data/github/` — extract fetch/cache logic from Projects

### Wave 2 — Primitive Rescue

6. Move `Box.tsx`, `Center.tsx`, `Stack.tsx` → `src/ui/primitives/`
7. Rewrite `Text.tsx` with `Dynamic` → `src/ui/primitives/Text.tsx`
8. Rewrite `Overlay.tsx` with proper props → `src/ui/overlays/Overlay.tsx`
9. Move `useMediaQuery.ts` → `src/ui/hooks/`

### Wave 3 — Runtime Promotion

10. Move + rewrite `Heartbeat.ts` → `src/experience/runtime/` (fix lazy start, cleanup)
11. Move + rewrite `AnimationEngine.ts` → `src/experience/animation/` (fix onCleanup misuse, add metadata)
12. Split `PhysicsManager.ts` → `src/experience/sim/PhysicsWorkerClient.ts` + `src/experience/sim/SimulationDirector.ts`
13. Move + rewrite `physics.worker.ts` → `src/experience/sim/workers/` (fix window refs, implement spawn_object)

### Wave 4 — Input Cleanup

14. Split `SmoothScroll.tsx` → `src/experience/input/ScrollService.ts` + bootstrap bridge
15. Rewrite `useScrollVelocity.ts` → absorb into ScrollService
16. Rewrite `useMouse.ts` → `src/experience/input/PointerService.ts`

### Wave 5 — Kill Old Shells

17. Delete all legacy section components
18. Delete ComponentsRegistry, SimplifiedResume, legacy index
19. Delete Layout.tsx, routes/index.tsx
20. Delete all barrel files
21. Merge `styles/global.css` into `index.css`, delete styles/
22. Delete Responsive.tsx, SectionTitle.tsx, SectionNav.tsx
23. Delete usePhysics.ts
24. Rewrite ThemeContext → split into `state/theme.ts` + `state/environment.ts`
25. Rewrite `App.tsx` into thin composition root
