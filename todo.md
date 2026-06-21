# MyResume Todo

## Status

Migration from legacy SolidJS resume site to "Sunken Stratum" 3D experience is **mostly complete**.

| Section | Done | Total |
|---------|------|-------|
| Critical Issues | 4 | 4 |
| Bugs | 3 | 3 |
| Improvements | 3 | 5 |
| Wave 1 — Foundations | 5 | 6 |
| Wave 2 — Engine Salvage | 9 | 9 |
| Wave 3 — Content Extraction | 7 | 7 |
| Cannibalization | 25 | 25 |
| **Subtotal (migration)** | **56** | **59** |

### Audit — Jun 2026

| Category | Done | Total |
|----------|------|-------|
| Security / Critical | 2 | 2 |
| Bugs | 3 | 3 |
| Config / Build | 3 | 3 |
| Dead Code / Stubs | 5 | 5 |
| Documentation | 2 | 2 |
| **Subtotal (audit)** | **15** | **15** |
| **Grand Total** | **71** | **74** |

> Remaining 3 items: `resumeOld/` git history cleanup (nested repo, requires filter-branch or BFG), and `RainCanvas.tsx` intentionally kept in `labs/`.

---

## Open Items

_(none — all audit items resolved)_

---

## Completed

### Critical Issues
- [x] `usePhysics` eager Worker spawn → Fixed: `PhysicsWorkerClient.ts` creates Worker only on `init()`
- [x] `SmoothScroll` rAF never cancels → Fixed: `ScrollService.ts` has no internal rAF, driven by heartbeat `tick()`
- [x] `AnimationEngine` `onCleanup` outside context → Fixed: returns unregister function, callers manage cleanup
- [x] `Text` dynamic tag via JS variable → Fixed: uses `Dynamic` from `solid-js/web`

### Bugs
- [x] `Heartbeat` singleton starts rAF in constructor → Fixed: `createHeartbeat()` factory with explicit `start()`/`stop()`
- [x] `App.tsx` renders duplicate `<div id="root">` → Fixed: `App.tsx` wraps in plain div, no `id="root"`
- [x] `routes/index.tsx` and `Layout.tsx` are dead code → Fixed: both files deleted

### Improvements
- [x] `useScrollVelocity` throttling → Absorbed into `ScrollService.ts`, updated on heartbeat tick
- [x] `useMouse` throttling → Absorbed into `PointerService.ts` with 16ms throttle
- [x] Two competing CSS resets → Fixed: single `index.css` with Tailwind + minimal overrides

### Wave 1 — Foundations
- [x] Create `src/content/` — `profile.ts`, `projects.ts`, `skills.ts`, `links.ts` all exist
- [x] Create `src/ui/primitives/` — `Box`, `Stack`, `Text`, `Center` exist; `Overlay` in `ui/overlays/`
- [x] Create `src/experience/animation/AnimationEngine.ts` — clean factory, no `onCleanup` misuse
- [x] Create `src/experience/input/ScrollService.ts` — heartbeat-driven, Lenis-backed
- [x] Create `src/experience/sim/` — `SimulationDirector`, `PhysicsWorkerClient`, 4 worker runtime modules
- [x] Build first new panel — `PortfolioSections.tsx` renders all sections from extracted content

### Wave 2 — Engine Salvage (all 9 migrations complete)
- [x] `services/AnimationEngine.ts` → `experience/animation/AnimationEngine.ts`
- [x] `services/Heartbeat.ts` → `experience/runtime/Heartbeat.ts`
- [x] `engine/PhysicsManager.ts` → `experience/sim/SimulationDirector.ts` + `PhysicsWorkerClient.ts`
- [x] `workers/physics.worker.ts` → `experience/sim/workers/physics.worker.ts`
- [x] `SmoothScroll.tsx` → `experience/input/ScrollService.ts`
- [x] `useScrollVelocity.ts` → `experience/input/ScrollService.ts`
- [x] `useMouse.ts` → `experience/input/PointerService.ts`
- [x] `hooks/useMediaQuery.ts` → `ui/hooks/useMediaQuery.ts`
- [x] `context/ThemeContext.tsx` → `state/theme.ts` (singleton signals, not context provider)

### Wave 3 — Content Extraction (all 7 items complete)
- [x] `Sections/About/About.tsx` → `content/profile.ts`
- [x] `Sections/Projects/Projects.tsx` → `content/projects.ts`
- [x] `Sections/Skills/Skills.tsx` → `content/skills.ts`
- [x] `Sections/Contact/Contact.tsx` → `content/links.ts`
- [x] `Sections/Skills/Data/**/*.tsx` → `content/skills.ts`
- [x] `SimplifiedResume.tsx` → deleted
- [x] `ComponentsRegistry.tsx` → deleted

### Cannibalization Checklist (all 25 items complete)
- [x] `Box.tsx` → `ui/primitives/Box.tsx`
- [x] `Center.tsx` → `ui/primitives/Center.tsx` (kept, contrary to "DROP" verdict)
- [x] `Overlay.tsx` → `ui/overlays/Overlay.tsx`
- [x] `Responsive.tsx` → dropped (no replacement)
- [x] `Stack.tsx` → `ui/primitives/Stack.tsx`
- [x] `Text.tsx` → `ui/primitives/Text.tsx` (fixed dynamic tag)
- [x] All legacy section files deleted
- [x] All UI shell files deleted (`SimplifiedResume`, `ComponentsRegistry`)
- [x] `services/` files moved to `experience/`
- [x] `engine/PhysicsManager.ts` absorbed into `experience/sim/`
- [x] All hooks moved/absorbed (`useMediaQuery`, `useMouse`, `usePhysics`, `useScrollVelocity`)
- [x] `ThemeContext.tsx` → `state/theme.ts`
- [x] Dead code (`routes/index.tsx`, `Layout.tsx`) deleted
- [x] `labs/rain-testing/` kept as-is (stub, low priority)

### Audit — Completed (all 15 items)
- [x] **`sesion_code.txt`** — session token removed from repo, added to `.gitignore`
- [x] **`dist/` committed** — confirmed not tracked in git; `.gitignore` already has `dist`
- [x] **`PointerService.ts:40` velocity bug** — `lastTime` now updated after `dt` is computed
- [x] **`ExperienceRoot.tsx:76` theme toggle** — wrapped in `createMemo` for explicit reactivity
- [x] **`physics.worker.ts:106-138` test objects** — removed floor and test cube from production init
- [x] **`Dockerfile:9` cache invalidation** — multi-stage build: deps stage copies lockfile first
- [x] **`docker-compose.yaml:10` invalid flag** — `--host 0.0.0.0` → `--host`
- [x] **`tsconfig.json` missing patterns** — added `include: ["src"]`, `exclude: ["node_modules", "dist", "resumeOld"]`
- [x] **`RainCanvas.tsx`** — kept in `labs/rain-testing/` (intentional stub, low priority)
- [x] **`Overlay.tsx`** — removed (never imported/used anywhere)
- [x] **`resumeOld/`** — added to `.gitignore` (nested git repo, requires BFG for history cleanup)
- [x] **`types/input.ts:19-22` `ScrollServiceConfig`** — removed unused type
- [x] **`types/theme.ts:4-7` `ThemeContextType`** — removed unused type
- [x] **`README.md`** — rewritten to match actual project (bun, not pnpm)
- [x] **`index.html:7` title** — changed from "Solid App" to "Sunken Stratum"
- [x] **`types/index.ts` barrel file** — deleted per constitution (no barrel files)

---

## Deviations from Original Plan

| Original | Actual | Reason |
|----------|--------|--------|
| `MouseService` | `PointerService` | Covers mouse + touch |
| `ThemeContext` (provider) | `state/theme.ts` (singleton signals) | No context overhead |
| `PhysicsWorld` | `SimulationDirector` + `PhysicsWorkerClient` | Cleaner separation |
| `Center.tsx` → DROP | Kept | Useful primitive |
| `Overlay.tsx` → `ui/primitives/` | Removed | Never used |
| `Responsive.tsx` → REWRITE | Dropped | Not needed in new architecture |
