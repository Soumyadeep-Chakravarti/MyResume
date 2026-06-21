# Commit Plan — Phase A: Prove the Route

This is the exact commit sequence for Phase A.
Each commit is one logical unit. Each has a binary "done" check.

---

## Commit 1: Strip to minimal shell

**What:** Delete everything that doesn't belong in Phase A.

**Files to delete:**
- `src/experience/core/PortfolioSections.tsx`
- `src/experience/sim/` (entire directory: SimulationDirector, PhysicsWorkerClient, workers/)
- `src/experience/animation/AnimationEngine.ts`
- `src/experience/input/PointerService.ts`
- `src/content/projects.ts`
- `src/content/skills.ts`
- `src/content/links.ts`

**Files to simplify:**
- `src/experience/core/ExperienceRoot.tsx` → gut to minimal shell (just canvas + scroll debug)
- `src/experience/core/ExperienceBootstrap.tsx` → remove simulation, pointer wiring. Keep heartbeat + scroll only.
- `src/experience/core/ExperienceCanvas.tsx` → remove SimulationDirector delegation. Just render a canvas element.

**Keep as-is:**
- `src/index.tsx`
- `src/App.tsx`
- `src/index.css`
- `src/state/theme.ts`
- `src/state/environment.ts`
- `src/types/*`
- `src/content/profile.ts`
- `src/experience/runtime/Heartbeat.ts`
- `src/experience/input/ScrollService.ts`
- `src/labs/`

**Done means:**
- `npm run dev` boots without errors
- Canvas element renders
- Scroll works (Lenis active)
- No simulation/physics/pointer references remain
- Console is clean

---

## Commit 2: Create Three.js scene scaffold

**What:** Wire Three.js into the canvas. Render loop running. Basic scene visible.

**Create:**
- `src/experience/world/SceneRenderer.ts`

Responsibilities:
- Create Three.js renderer, scene, camera (PerspectiveCamera)
- Attach to canvas element
- Render loop driven by Heartbeat subscription (no internal rAF)
- Handle resize
- Basic scene: background color, one directional light, one ambient light
- Expose: `renderer`, `scene`, `camera`, `resize()`, `dispose()`

**Modify:**
- `src/experience/core/ExperienceCanvas.tsx` → instantiate SceneRenderer on mount, subscribe to heartbeat for render calls
- `src/experience/core/ExperienceBootstrap.tsx` → create SceneRenderer, pass through context

**Done means:**
- A Three.js scene renders to the canvas
- Scene has basic lighting (not pitch black)
- Resize works
- Render loop runs at framerate
- No errors

---

## Commit 3: Road geometry

**What:** A road surface exists in the scene from point A to point B.

**Create:**
- `src/experience/world/RoadPath.ts`

Responsibilities:
- Define a road spline (CatmullRomCurve3 or similar)
- Create road mesh: either an ExtrudeGeometry along the spline, or a series of PlaneGeometries positioned along it
- Road has visible curvature and descent
- Road extends ~30-50 units (enough for 10-15 seconds of scroll)
- Export: `roadMesh`, `cameraSpline`, `roadLength`

**Modify:**
- `src/experience/world/SceneRenderer.ts` → add road mesh to scene

**Done means:**
- A road surface is visible in the scene
- Road curves and descends
- Camera path follows the road

**Not allowed:**
- no texturing (flat color is fine)
- no reflections
- no wetness

---

## Commit 4: Cliff wall geometry

**What:** A cliff wall on one side of the road.

**Create:**
- `src/experience/world/CliffGeometry.ts`

Responsibilities:
- Generate cliff wall mesh: a series of planes or a sculpted ExtrudeGeometry
- Positioned along one side of the road
- Height ≥ 2-3x camera height
- Extends full road length
- Export: `cliffMesh`

**Modify:**
- `src/experience/world/SceneRenderer.ts` → add cliff mesh to scene

**Done means:**
- Road is bounded by a cliff wall on one side
- Scale feels imposing
- Scene does not feel like a road in empty space

---

## Commit 5: Open side + background

**What:** The opposite side of the road implies open air and distance.

**Modify:**
- `src/experience/world/SceneRenderer.ts` → add either:
  - a distant sea plane (flat blue/gray plane far below road level)
  - or a fog plane / background gradient
  - or just set scene.background to a sky color

**Done means:**
- Looking off the open side implies distance or sky
- Scene does not feel like a box

---

## Commit 6: Camera rail

**What:** Camera follows the road spline, driven by scroll progress.

**Modify:**
- `src/experience/world/SceneRenderer.ts` or create `src/experience/world/CameraRig.ts`

Responsibilities:
- Camera position = point on cameraSpline at scrollProgress (0-1)
- Camera orientation = tangent of spline at that point
- scrollProgress comes from ScrollService.state().progress
- Camera looks forward along the road

**Modify:**
- `src/experience/core/ExperienceBootstrap.tsx` → wire ScrollService progress → CameraRig
- `src/experience/core/ExperienceRoot.tsx` → expose scroll progress

**Done means:**
- Scrolling moves camera from start to end of road
- Camera follows path smoothly
- Camera orientation follows road direction
- No user-controlled rotation
- No camera shake, no bob, no easing beyond basic lerp

---

## Commit 7: Solid integration cleanup

**What:** Clean up the Solid ↔ Three.js integration. Remove leftover hero/UI code.

**Modify:**
- `src/experience/core/ExperienceRoot.tsx` → remove hero section, scroll effects, title, theme toggle button (move toggle to a minimal debug control)
- Keep only: canvas (full viewport), scroll debug overlay
- Canvas should be full viewport, not fixed/absolute layered under hero

**Done means:**
- App boots → full viewport Three.js canvas
- Scroll works → camera moves
- Debug overlay shows scroll progress
- No hero section, no content sections, no DOM overlays beyond debug
- Clean, minimal, world-only experience

---

## Commit 8: Storm lighting setup

**What:** Lighting for storm theme.

**Create:**
- `src/experience/world/EnvironmentLighting.ts`

Responsibilities:
- Manage two lighting presets: storm, hazy-day
- Storm: dark ambient, cool/blue directional, low intensity
- Expose: `applyPreset(name)`, `transitionTo(name, duration)`
- Store current preset state

**Modify:**
- `src/experience/world/SceneRenderer.ts` → integrate EnvironmentLighting

**Done means:**
- Scene renders with dark, moody storm lighting
- Lighting creates atmosphere without any weather effects

---

## Commit 9: Hazy day lighting + theme switch

**What:** Second lighting preset. Toggle between them.

**Modify:**
- `src/experience/world/EnvironmentLighting.ts` → add hazy-day preset (warm ambient, golden directional, bright)
- Add instant switch function

**Modify:**
- `src/experience/core/ExperienceBootstrap.tsx` → expose theme toggle via scroll threshold or keyboard shortcut for testing

**Done means:**
- One toggle switches lighting between storm and hazy day
- Both modes look correct
- Toggle works without errors

---

## Commit 10: Fog + gradual transition

**What:** Atmospheric fog. Gradual theme transition.

**Modify:**
- `src/experience/world/SceneRenderer.ts` → add scene fog (ExpFog or LinearFog)
- Fog density varies by theme: heavy in storm, light in hazy day
- Fog color matches lighting

**Modify:**
- `src/experience/world/EnvironmentLighting.ts` → transition includes fog interpolation
- Transition duration: 2-3 seconds
- Transition triggered by scroll position (one defined point at ~50% progress)

**Done means:**
- Fog creates depth in both themes
- Fog is heavier in storm, lighter in hazy day
- Theme transition takes 2-3 seconds
- All lighting + fog interpolates together
- Transition feels like time passing, not a fade

---

## After Commit 10: Phase A checkpoint

Stop. Sit with it.

Ask:
1. Does scroll-to-camera feel better than scrolling a page?
2. Does the road curvature create a sense of movement?
3. Does the cliff wall create a sense of place?
4. Does the open side create depth?
5. Does the storm/hazy-day switch feel like a real atmospheric shift?
6. Does the fog sell the mood?

If all yes → move to Phase B.
If any no → fix before continuing.

---

## Dependency graph

```
Commit 1 (strip shell)
  └─ Commit 2 (Three.js scene)
       ├─ Commit 3 (road geometry)
       │    └─ Commit 4 (cliff wall)
       │         └─ Commit 5 (open side)
       │              └─ Commit 6 (camera rail)
       │                   └─ Commit 7 (Solid cleanup)
       │                        └─ Commit 8 (storm lighting)
       │                             └─ Commit 9 (hazy day + switch)
       │                                  └─ Commit 10 (fog + transition)
```

Each commit depends on the previous. No parallel work in Phase A.
