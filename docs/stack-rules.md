# Project Constitution v2 — Experience Runtime

This repository is **not** a conventional resume site.
It is an **engine-backed experience runtime with content overlays** whose purpose is to:

- show frontend engineering depth
- show design taste and interaction design skill
- show systems thinking through architecture, rendering, animation, and simulation
- feel disproportionately ambitious for a solo-built project

The public-facing site may link to a more practical recruiter-friendly resume/site, but **this repository is not optimized for minimalism or conventional portfolio structure**. It is optimized for **impact, control, and technical execution**.

---

## 1. Thesis

The codebase is structured as a **small runtime/engine with UI mounted into it**, not like a traditional sectioned resume website with effects sprinkled on top.

The architectural flow is:

**boot → runtime → world → simulation → overlays/panels/content**

not

**page → section → component → effect**

The architectural center of gravity is:

- experience runtime and lifecycle
- world/rendering
- simulation
- animation orchestration
- input services
- content↔experience mapping
- UI panel/content surfaces

not "sections of a website."

---

## 2. Root Authority Model

### 2.1 ExperienceDirector is the sole root authority

`ExperienceDirector` is the **only** system allowed to coordinate across domains.

No other subsystem may laterally coordinate with another subsystem on its own. If `ScrollService`, `PanelController`, `WorldRuntime`, `AnimationEngine`, or `SimulationDirector` need to affect each other, that coordination routes through `ExperienceDirector` unless it is a narrowly defined callback/event contract with explicit typing.

### 2.2 Subsystem tree

```
ExperienceDirector
  ├─ WorldRuntime
  │   ├─ SceneRenderer
  │   ├─ CameraDirector
  │   ├─ EnvironmentDirector
  │   └─ WorldInteractionBridge
  │
  ├─ SimulationDirector
  │   └─ PhysicsWorkerClient
  │
  ├─ ScrollService
  ├─ AnimationEngine
  ├─ PanelController
  ├─ ContentBridge
  └─ ExperienceStore
```

### 2.3 The rule

> **Nothing coordinates across domains except ExperienceDirector.**

- UI does not talk directly to SimulationDirector unless explicitly allowed.
- ScrollService does not decide camera behavior.
- AnimationEngine does not decide world state.
- PanelController does not mutate simulation state directly.
- ContentBridge does not mutate world transforms directly.

Everything cross-domain routes upward through the experience root.

---

## 3. Runtime Subsystems

### 3.1 ExperienceDirector

Owns:

- high-level experience lifecycle (boot → intro → idle → panel-open → transitioning)
- cross-domain coordination between world, scroll, animation, simulation, and panel systems
- experience-level event routing
- mode transitions and global experience state changes
- lifecycle ownership of all subsystems (init, start, dispose)

Does not own:

- render loop internals
- physics stepping
- individual animation authoring
- content data
- raw scroll values
- panel UI implementation

### 3.2 WorldRuntime

Owns the **visual world runtime**. It is not the app shell, not content orchestration, and not a dumping ground for arbitrary scene logic.

WorldRuntime is internally split into four subsystems:

#### SceneRenderer

Owns:

- Three.js renderer
- scene graph
- frame render call
- resize handling
- DPR / performance caps
- postprocessing pipeline (if any)

Does not own:

- camera logic
- environment/lighting logic
- simulation state
- content data

#### CameraDirector

Owns:

- camera creation and rig
- camera targets and positions
- scroll-driven camera movement
- cinematic camera transitions
- focus targets / framing

Does not own:

- renderer
- environment lighting
- simulation state
- UI panel state

#### EnvironmentDirector

Owns:

- fog density and color
- ambient lighting
- directional lights
- atmosphere presets (storm, mist, sunrise, clear)
- weather visual systems (rain visuals, wetness, wind-driven effects)
- environment transitions

Does not own:

- physics simulation of weather
- camera targets
- UI state
- content data

#### WorldInteractionBridge

Owns:

- raycasting / hit testing in world space
- hover/select of 3D objects
- world-to-panel event bridging
- 3D interaction routing to ExperienceDirector

Does not own:

- panel state management
- simulation body logic
- camera transitions

### 3.3 SimulationDirector

Owns:

- physics worker lifecycle
- rigid body spawn/despawn/update protocol
- physics stepping authority
- simulation snapshots / authoritative body transforms
- worker communication for sim systems
- simulation quality/fallback management

Does not own:

- visual scene composition
- mesh/material/light construction
- camera behavior
- content data
- UI state

### 3.4 ScrollService

Owns:

- Lenis instance lifecycle
- smoothed scroll position
- scroll velocity
- normalized experience progress
- named scroll ranges / semantic scroll milestones (e.g., `heroProgress`, `worldDepthProgress`, `panelRevealProgress`)
- scroll-derived experience signals

Does not own:

- DOM transforms
- camera behavior (reports scroll state, does not decide camera targets)
- panel state
- world state

### 3.5 AnimationEngine

Owns:

- animation registration
- cancellation / cleanup
- conflict arbitration (no two systems fighting the same target)
- transition kill policies
- global pause / fallback hooks for registered animations
- "kill everything for mode transition" behavior

Does not own:

- individual animation authoring
- camera motion logic
- component animation definitions
- scene choreography
- world object transforms

AnimationEngine is a **governor / registry / conflict manager**, not a kitchen sink. Animation authoring lives in the relevant domain: camera choreography in world code, panel reveal motion in panel code, intro sequences in an intro module.

### 3.6 PanelController

Owns:

- content panel open/close state
- active panel identity
- overlay interaction lock / dismissal behavior
- panel-specific mode transitions

Does not own:

- tooltips, hover cards, toasts (those are component-local)
- theme toggles
- navbar state
- mobile nav
- simulation state
- world state

PanelController is limited to **navigational overlays and content panels only**. It is not a generic UI controller.

### 3.7 ContentBridge

Owns:

- mapping content entities to runtime anchors
- mapping scroll ranges to experience events
- mapping active project/section to camera/environment/panel behavior
- section timeline definitions
- project scene anchors
- environment moments tied to content

This layer translates **content data → experience behavior** without shoving content logic into the world runtime, simulation, or UI systems.

Does not own:

- raw content data (that lives in `content/`)
- render loop logic
- physics simulation
- panel UI implementation

---

## 4. Library Authority Map

| Library | Owns | Forbidden From |
|---------|------|----------------|
| **Solid** | App shell, UI composition, content state bindings, coarse reactive state, overlays | Frame simulation/render state, per-frame transforms, world internals |
| **Three** | Scene, camera, renderer, materials, world visuals | Content structure, app shell, UI state |
| **GSAP** | Directed sequences, intros, cinematic camera choreography, multi-element sequencing | Generic UI state ownership, component-local microinteractions |
| **Motion** | Component-local reveal/hover/tap motion, panel-local DOM transitions | Camera/world choreography, environment transitions |
| **Lenis** | Scroll smoothing + raw scroll values | Semantic experience mapping, DOM rendering |
| **ScrollService** | Semantic progress + scroll ranges + experience milestones | DOM rendering, camera decision-making |
| **Cannon-es** | Rigid-body simulation only where genuinely needed | Visual scene orchestration, rain rendering, UI animation |
| **Tailwind CSS v4** | Utility styling, tokens, layout and effect utility application | Runtime animation authority, world rendering concerns |

### Future library rule

Every new library must earn its place by answering **all four**:

1. **What exact problem is it solving?**
2. **Which runtime layer owns it?**
3. **What does it replace or prevent us from writing?**
4. **Who becomes the single authority once it is added?**

If those answers are not clear, do not add the library yet.

---

## 5. State Zones

State is split by **domain and update frequency**.

### 5.1 Experience State

High-level global mode: `boot`, `intro`, `idle`, `exploring`, `panelOpen`, `transitioning`, `performanceFallback`.

Owned by: `ExperienceDirector` / `ExperienceStore`.

### 5.2 Environment State

World/environment configuration: `weatherMode`, `rainIntensity`, `fogDensity`, `wetness`, `windStrength`, `timeOfDay`, `lightRigPreset`.

Owned by: `EnvironmentDirector`, surfaced through `ExperienceStore`.

### 5.3 UI State

DOM/UI-facing interaction state: open panel id, hovered card, active nav item, overlay visibility, selected content item.

Owned by: `PanelController`, component-local state.

### 5.4 Simulation State

High-frequency mutable runtime state: rigid-body transforms, droplet state, particle state, transient collision events, sampled wind field values.

Owned by: `SimulationDirector` and worker internals.

**Simulation state rule:** Do not push raw high-frequency simulation transforms into broad reactive UI state. Bridge simulation into UI through sampled render data, controller APIs, narrow subscriptions, or derived coarse state.

---

## 6. Render-State Firewall

This is a hard architectural rule.

### Rule

**Solid reactive state must never carry per-frame render or simulation state.**

High-frequency mutable state stays in runtime/sim systems, not in the UI reactivity graph.

### Allowed in Solid reactive state

- experience mode
- current environment preset
- active panel ID
- selected content target
- coarse scroll progress / milestones
- boot / loading / error / ready flags
- animation registration metadata

### Forbidden in Solid reactive state

- per-frame transforms (object positions, rotations, scales)
- particle arrays
- camera matrices
- worker snapshots at frame frequency
- simulation body arrays
- render-loop internals
- high-frequency rain/wind state
- raw physics body transforms

### Why

Solid signals trigger DOM updates. Feeding 60fps world state into signals means 60fps DOM reconciliation for data that never touches the DOM. This kills performance and conflates two state domains that must stay separate.

---

## 7. Ownership Rules / Forbidden Crossings

### 7.1 World ↔ Simulation

**SimulationDirector owns physics truth.** It holds authoritative body transforms, spawn/despawn logic, and simulation snapshots.

**WorldRuntime owns visual truth.** It holds meshes, materials, lights, camera, and maps simulation bodies to render objects (with interpolation/smoothing if needed).

Forbidden:

- World code directly owning rigid-body truth
- Simulation code constructing or owning presentation-layer scene composition
- Worker protocol leaking into arbitrary UI components
- WorldRuntime spawning physics bodies directly
- SimulationDirector constructing Three.js meshes

### 7.2 Scroll ↔ World

ScrollService reports scroll state. It does not decide camera targets. CameraDirector consumes scroll signals and decides camera behavior.

Forbidden:

- ScrollService mutating camera position directly
- ScrollService applying DOM transforms
- CameraDirector reading raw scroll DOM events (must go through ScrollService)

### 7.3 Animation ↔ World

AnimationEngine arbitrates conflicts and manages lifecycle. It does not author camera choreography or world object transforms.

Forbidden:

- AnimationEngine deciding camera targets
- AnimationEngine mutating scene graph directly
- World code bypassing AnimationEngine registration for non-trivial animations

### 7.4 Panel ↔ Simulation

PanelController manages panel state. It does not mutate simulation state.

Forbidden:

- PanelController spawning/despawning physics bodies
- SimulationDirector reading panel state directly (route through ExperienceDirector)

### 7.5 Content ↔ Runtime

ContentBridge maps content to experience behavior. Raw content files do not contain runtime logic.

Forbidden:

- Content files importing experience/runtime modules
- WorldRuntime importing raw content data directly (must go through ContentBridge)
- ContentBridge mutating world transforms directly

### 7.6 Libraries

- GSAP does not own state
- Motion does not choreograph the world camera
- Lenis does not decide semantic experience progress (ScrollService does)
- Cannon-es does not own visual scene orchestration
- Tailwind does not control runtime behavior

---

## 8. Content Bridge Rules

### 8.1 What the bridge does

ContentBridge translates between:

- **content data** (profile, projects, skills, links in `content/`)
- **experience behavior** (camera targets, environment moments, panel activation, scroll milestones)

### 8.2 Where bridge logic lives

```
src/experience/content/
  ContentBridge.ts        # Top-level translation layer
  SectionTimeline.ts      # Scroll range → experience event mappings
  ProjectAnchors.ts       # Project → camera/environment targets
  EnvironmentMoments.ts   # Content-triggered environment changes
```

### 8.3 What must not leak

- Content files must not import runtime, world, simulation, or animation modules.
- WorldRuntime must not import raw content data directly.
- PanelController must not contain content-to-runtime mapping logic.
- ScrollService must not contain content-aware scroll rules.

All content↔experience translation routes through ContentBridge.

---

## 9. Typing Rules

### 9.1 Absolute bans

- `any`
- Untyped event payloads
- Stringly-typed mode/state values scattered across files
- Giant `{ [key: string]: unknown }` escape hatches
- Implicit `undefined`-driven protocols when a discriminated union should exist

### 9.2 Preferred typing patterns

**Domain-first types:**

```ts
type WeatherMode = "storm" | "sunrise" | "mist" | "clear";
type PanelId = "builds" | "experiments" | "practical";

interface EnvironmentState {
  weatherMode: WeatherMode;
  rainIntensity: number;
  fogDensity: number;
}
```

**Discriminated unions for runtime modes:**

```ts
type ExperienceMode =
  | { kind: "boot" }
  | { kind: "intro" }
  | { kind: "idle" }
  | { kind: "panel-open"; panelId: PanelId }
  | { kind: "transitioning"; from: string; to: string };
```

**Typed worker boundaries:**

```ts
type SimulationCommand =
  | { type: "init"; payload: SimulationInitPayload }
  | { type: "step"; deltaMs: number }
  | { type: "dispose" };

type SimulationEvent =
  | { type: "ready" }
  | { type: "frame"; bodies: RigidBodySnapshot[] }
  | { type: "error"; payload: { message: string } };
```

### 9.3 Type location rules

- `src/types/` owns shared cross-domain types
- Local types live near the feature
- No giant unstructured `types.ts` dumping ground

### 9.4 Casting rules

Type assertions allowed only when: bridging a library boundary with incomplete upstream types, narrowing after a validation step, or interfacing with DOM APIs where TS cannot infer correctly. Not a substitute for proper modeling.

---

## 10. SolidJS Rules

- Use `createSignal`, `createMemo`, `createEffect`, `onMount`, `onCleanup`
- Do **not** import React APIs
- Start side-effectful runtime systems in `onMount`, tear down in `onCleanup`
- Never call `onCleanup` in plain class methods or outside a reactive/lifecycle scope
- Use `createMemo` for derived state; keep reactive scopes narrow
- Use static JSX tags (`<div>`, `<h2>`, etc.) or `Dynamic` from `solid-js/web` for dynamic tags
- Never use JS variables as JSX tag names (SolidJS does not support this pattern)

---

## 11. Animation Governance

### 11.1 Ownership

- **GSAP** owns intro sequences, large transitions, camera + overlay choreography, multi-element sequencing
- **Motion** owns component-local reveals, hover/tap interactions, panel-local DOM transitions
- **Three** owns world object transforms driven by world logic, material/shader animation, environment-driven motion
- **Cannon** owns rigid-body simulation outputs only where actual rigid-body simulation is justified
- **AnimationEngine** owns registration, arbitration, conflict resolution, lifecycle cleanup

### 11.2 Animation registration

Every non-trivial animation should have metadata: `id`, `owner`, `domain`, `lifecycle`, `killOn`.

### 11.3 Animation conflict rule

No two animation systems should actively control the same target/property pair without an explicit handoff strategy. AnimationEngine arbitrates conflicts.

---

## 12. Performance Rules

- Throttle high-frequency UI inputs through `requestAnimationFrame`
- Cancel rAF subscriptions / loops during cleanup
- Heartbeat/ticker loops start only when needed
- Expensive systems support reduced-quality modes
- Code-split heavyweight content/panels when appropriate
- Keep the boot path lean
- Solid signals never carry per-frame state (see Section 6)

---

## 13. Labs Promotion Rules

All risky or exploratory work begins in `labs/`.

### Graduation checklist

A lab feature may move into `experience/` or `ui/` **only** if it passes all six gates:

| # | Gate | Requirement |
|---|------|-------------|
| 1 | **Clear owner** | Assigned to a specific subsystem (world, sim, animation, input, panel, content) |
| 2 | **Typed public API** | Exported interface with explicit parameter and return types |
| 3 | **Explicit lifecycle** | Has `init`, `update` (if needed), and `dispose` methods |
| 4 | **No hidden global side effects** | No stray event listeners, no implicit singletons unless intentional |
| 5 | **Performance budget** | Expected frequency, expected object counts, fallback behavior defined |
| 6 | **Kill path** | Can be disabled/cleaned up without reloading the app |

If a lab feature cannot meet these gates, it stays in `labs/` or gets rewritten until it can.

---

## 14. Anti-God-Object Warning

These files are most at risk of bloating into unmanageable monoliths. The constitution explicitly limits what they are allowed to absorb.

### ExperienceDirector

**Risk:** Becomes the entire app logic because "it coordinates everything."

**Allowed to absorb:** Mode transitions, subsystem lifecycle, cross-domain event routing.

**Not allowed to absorb:** Render logic, physics stepping, animation authoring, content data, panel UI implementation, scroll calculations.

### WorldRuntime

**Risk:** Becomes a dumping ground for "anything 3D or scene-related."

**Allowed to absorb:** Renderer, scene, camera, environment, interaction bridging.

**Not allowed to absorb:** Physics simulation, content data, panel state, scroll logic, animation authoring, app shell concerns.

Split internally into SceneRenderer, CameraDirector, EnvironmentDirector, WorldInteractionBridge. If WorldRuntime exceeds ~300 lines, it needs further decomposition.

### SimulationDirector

**Risk:** Starts owning visual presentation of simulated objects.

**Allowed to absorb:** Worker lifecycle, body protocol, physics stepping, simulation snapshots.

**Not allowed to absorb:** Mesh/material construction, camera logic, content data, UI state, visual interpolation (that is WorldRuntime's job).

### AnimationEngine

**Risk:** Becomes a wrapper around every animation call in the app.

**Allowed to absorb:** Registration, conflict resolution, lifecycle cleanup, kill policies.

**Not allowed to absorb:** Animation authoring, camera choreography, world object transforms, component animation definitions.

---

## 15. File / Folder Conventions

- Components: `.tsx` under `ui/`
- Hooks: `use[Name].ts` in `ui/hooks/` (engine-facing hooks are thin adapters over services)
- Services: domain-placed under `experience/` (not a generic `services/` dump)
- Types: shared in `src/types/`, local beside the feature
- Path alias: `@/` maps to `src/`

### Top-level domains

| Directory | Purpose |
|-----------|---------|
| `experience/` | Engine-backed runtime: world, simulation, animation, input, content bridge |
| `ui/` | Visible interface surfaces: overlays, panels, HUDs, UI primitives |
| `content/` | Portable content/data: profile, projects, skills, links |
| `state/` | Global stores and state boundaries |
| `labs/` | Experimental systems and prototypes (must graduate via Section 13) |
| `types/` | Shared cross-domain type definitions |

---

## 16. Decision Procedure

When unsure about a design choice, ask in order:

1. **Which domain should own this?**
2. **Who is the single authority for it?**
3. **What state zone does it belong to?**
4. **Does it carry per-frame state? If yes, it must not live in Solid signals.**
5. **Can it be typed cleanly without lying to TypeScript?**
6. **Does it belong in the public runtime, or should it start in `labs/`?**
7. **Am I salvaging an asset from legacy, or accidentally preserving legacy architecture?**
8. **Does this coordination need to cross domains? If yes, does it route through ExperienceDirector?**

If those answers are unclear, the implementation is probably not ready yet.
