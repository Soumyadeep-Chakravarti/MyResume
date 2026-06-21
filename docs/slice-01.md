# slice-01.md

# First Vertical Slice

This is the only doc that matters right now.

Not the world spec. Not the panel taxonomy. Not the architecture constitution.

This is the concrete, testable, shippable slice that proves the project is alive.

If this slice works, the project has a foundation.
If this slice doesn't work, nothing else matters.

---

# 1. What this slice proves

The slice exists to answer six questions with working code, not design intent:

1. **Can the world carry tone with minimal geometry?**
2. **Does scroll-driven traversal feel better than scrolling a page?**
3. **Can a panel emerge from a world object and feel physically real?**
4. **Does a theme switch feel like a time-skip, not a color swap?**
5. **Can one content reveal land with proper pacing?**
6. **Does the runtime architecture survive first contact with reality?**

If all six answers are yes, the project is alive.
If any answer is no, we fix it before building anything else.

---

# 2. The slice in one sentence

> Camera descends a short cliff road in rain, reaches a mounted acrylic panel, panel opens to reveal profile identity, user triggers theme switch, world transitions from storm to hazy day, panel closes, camera continues to a short rest point, slice ends.

That's it.

No multiple panels. No project showcase. No skill clusters. No contact section. No navigation system. No overlay panels. No interaction complexity.

One route. One panel. One transition. One reveal. One clean ending.

---

# 3. Route segment

## Start point

Camera is positioned at the upper edge of a cliff road segment. Looking slightly downward along the road path. Rain is falling. Fog is present. The road curves slightly and descends.

The viewer should immediately understand:
* this is a physical place
* the road continues downward
* the weather is active
* this is not a homepage

## Movement

Scroll drives camera forward along the road path. The camera follows a predefined spline. No free movement. No user-controlled camera.

Camera motion characteristics:
* smooth forward drift along the road
* slight downward pitch following the road descent
* gentle lateral drift matching road curvature
* no jitter, no shake, no aggressive easing
* the feeling should be "being carried along a path"

## What the viewer passes

During the descent, the viewer sees:
* cliff wall on one side (massive, textured, wet)
* open air on the other side (fog, distant sea hint, atmospheric depth)
* road surface beneath (wet, reflective patches)
* one or two silhouettes in the distance (structures, not detailed)
* rain particles throughout
* occasional runoff or drip effects on the cliff face

That's the full world content for slice 1. No buildings to explore. No objects to interact with during traversal. Just the road, the cliff, the atmosphere, and forward motion.

## First anchor point

At roughly 60% through the route, the road widens slightly into a small overlook or turnout. Here, mounted to the cliff wall or a structural frame, is the **panel anchor object**.

This is a physical object in the world:
* an acrylic or glass-like slab
* mounted to rock or steel frame
* faintly illuminated
* edge-lit or internally lit
* visibly part of the environment, not floating

The camera slows slightly as it approaches. This is the first interaction opportunity.

## End point

After the panel interaction (or after passing the anchor if no interaction), the road continues briefly to a rest point. The camera settles. The view opens slightly. This is the slice termination point.

The feeling should be:
* the route led somewhere
* something happened
* there could be more
* but this particular moment is complete

---

# 4. Camera behavior

## Traversal camera

During the road descent:
* camera follows the road spline
* forward speed is tied to scroll progress
* slight vertical bob is allowed but must be subtle
* camera orientation follows the spline tangent
* no user rotation, no mouse-look, no free control

## Approach camera

As the camera reaches the panel anchor:
* forward motion slows
* camera begins to settle toward the panel
* framing tightens slightly to put the panel in readable position
* settling is not instant — it takes 1-2 seconds of controlled easing

## Panel-open camera

When the panel opens:
* camera is mostly settled
* very slight breathing motion allowed (tiny drift, not distracting)
* the panel is the dominant visual element
* the world is still visible but subordinate

## Release camera

After the panel closes:
* camera resumes traversal
* forward motion picks back up
* the road continues to the end point

## End camera

At the slice termination:
* camera settles to a composed final frame
* slight drift or breathe, but mostly still
* the viewer can see the road behind or the view ahead
* clean stopping point

---

# 5. Panel system

## Panel type: one only

Ship 1 uses **one panel archetype**: the mounted acrylic slab.

Not a recessed wall slab. Not a hanging plate. Not a terminal surface. Not an overlay.

One type. Mounted to a structural frame or cliff face. Acrylic/glass-like material. Edge-lit. Semi-transparent with content resolving onto it.

## Panel physical form

The panel object in the world:
* rectangular, slightly wider than tall
* mounted to a steel frame or rock bracket
* faintly glowing even when dormant
* the surface has slight refraction or reflection
* it feels like a real object with thickness and mounting

## Panel states (simplified for slice 1)

Only three states in slice 1:

### Dormant

Before the camera arrives. The panel object is visible but content-free. Slight emissive glow. Surface is clean but empty. The viewer can see it's there but can't read anything yet.

### Open

After the camera settles and the auto-reveal triggers (or after a scroll threshold is crossed). Content resolves onto the panel surface. Text fades in. Hierarchy becomes clear. The panel is now readable.

### Closed

After the user scrolls past or actively dismisses. Content retracts. The panel returns to dormant or the camera moves on.

No armed state. No focused state. No overlay state. No complex state machine.

Dormant → Open → Closed. That's the full vocabulary for slice 1.

## Panel content

The panel carries **profile identity only**:

* name
* one-line title or descriptor
* one short sentence about what I do

Three lines of text maximum on the panel itself.

The panel is not a bio page. It's not an about section. It's a **nameplate** — a quick identity marker that proves panels can deliver content inside the world.

If the viewer learns who I am and gets a sense of what kind of builder I am, the panel did its job.

## Panel interaction

In slice 1, the panel opens automatically when the camera reaches the anchor point and settles. No click required for the initial open.

Why: click interaction adds complexity. The slice needs to prove the panel can emerge from the world and feel readable. Click behavior comes in slice 2.

The panel closes when the user scrolls past a threshold, or after a timeout if no scroll activity. The camera resumes traversal.

---

# 6. Theme system

## Two themes only

Slice 1 ships with exactly two themes:

### Theme A: Storm

* dark sky
* rain active
* fog present
* wet surfaces
* cool/blue-ish lighting
* occasional distant thunder flash (visual only, no audio in slice 1)
* moody, heavy, cinematic

### Theme B: Hazy Day

* bright sky with haze
* no rain
* light mist or atmospheric haze
* dry or slightly damp surfaces
* warm/golden lighting
* calm, open, breathing room

## Transition behavior

The theme switch happens once during the slice, at a defined point in the route.

How it works:
* the user reaches a scroll threshold or interaction point
* the transition begins
* rain ramps down over 2-3 seconds
* fog density shifts
* skybox transitions
* lighting temperature shifts
* surface wetness reduces
* the world goes from storm to hazy day (or reverse)

The transition should feel like **time passing**, not a toggle flip. Not instant. Not a 200ms CSS transition. A real environmental shift that takes a few seconds and feels physically motivated.

## Transition trigger

For slice 1, the trigger is scroll-position-based. At a specific point in the route, the theme begins transitioning. No user interaction required.

Why: interaction-triggered theme switching adds complexity. The slice needs to prove the transition can feel cinematic. Trigger mechanism is secondary.

---

# 7. Content payload

## What ships in slice 1

One content payload only: **profile identity**.

This goes on the single panel.

Content:
* name: Buna Sai
* title: Systems-minded developer building overengineered interactive software
* optionally one more short line about build philosophy

That's it.

No projects. No skills. No contact links. No social icons. No bio paragraphs. No about sections.

The profile content is the minimum viable proof that panels can deliver readable information inside the world.

## Where content lives in code

`src/content/profile.ts`

Typed. Clean. No runtime imports. Just data.

```ts
export const profile = {
  name: "Buna Sai",
  title: "Systems-minded developer building overengineered interactive software",
  tagline: "I build things that shouldn't have been built by one person.",
} as const;
```

Slice 1 does not consume this data yet in a sophisticated way. The panel reads it and displays it. That's enough.

---

# 8. Performance budget

## Target hardware

* primary: mid-range desktop (GTX 1060 / RX 580 equivalent or better)
* secondary: modern laptop with dedicated GPU
* stretch: integrated graphics at reduced quality

## Frame rate targets

* desktop: locked 60fps or close to it
* laptop with dGPU: 45+ fps
* integrated: 30+ fps with quality reduction

## What gets cut first if performance dips

Priority order for quality reduction:
1. rain particle count
2. fog quality / resolution
3. surface reflection quality
4. post-processing (bloom, etc.)
5. shadow quality
6. geometry detail

The experience must never drop below 30fps on target laptop hardware. If it does, quality tiers are broken.

## Geometry budget (approximate)

* cliff wall: single mesh or small set, < 50k triangles
* road surface: simple plane or extruded path, < 10k triangles
* panel anchor object: simple geometry, < 5k triangles
* distant silhouettes: low-poly or billboard, < 10k triangles total
* sea plane: flat plane with animated shader, < 1k triangles
* total scene: < 75k triangles (generous, but disciplined)

## Texture budget

* cliff: one tiling material, 2k max
* road: one tiling material, 1k max
* panel surface: procedural or small texture, 512 max
* structures: minimal, 1k max
* total VRAM: keep under 256MB on desktop

---

# 9. Runtime architecture for slice 1

## What actually runs

For slice 1, the runtime is minimal:

### Boot sequence
* load assets
* initialize renderer
* set up camera
* start scroll service
* transition to idle

### Render loop
* Three.js render call
* camera update from scroll position
* rain particle update
* theme transition interpolation

### Scroll service
* Lenis instance
* scroll position → route progress mapping
* velocity tracking

### Panel controller (minimal)
* panel state (dormant / open / closed)
* scroll-position-based trigger for open
* scroll-position-based trigger for close
* content display

### Theme manager (minimal)
* current theme state
* transition interpolation
* skybox swap
* fog/rain/lighting parameter changes

## What does NOT exist in slice 1

* ExperienceDirector (not needed yet — too few subsystems)
* SimulationDirector (no physics in slice 1)
* AnimationEngine (no animation conflict arbitration needed yet)
* ContentBridge (content is directly consumed by the panel)
* WorldInteractionBridge (no raycasting, no click interactions)
* CameraDirector as a separate system (camera logic is simple enough to live inline)

The architecture for slice 1 is intentionally flat. If it needs to become hierarchical later, that migration happens after the slice works, not before.

## Why this matters

The architecture constitution says ExperienceDirector is the root authority. That's true for the full project. But for slice 1, there aren't enough subsystems to justify the coordination layer. Adding it now would be premature abstraction.

Slice 1 proves the content works. Slice 2 proves the subsystems need coordination. That's when ExperienceDirector earns its place.

---

# 10. Done criteria

The slice is done when ALL of the following are true:

## Visual

* [ ] cliff road environment renders with acceptable quality
* [ ] rain is visible and feels atmospheric
* [ ] fog creates depth and mood
* [ ] wet surfaces have visible reflectivity or sheen
* [ ] the scene does not look like a Three.js starter template

## Traversal

* [ ] scroll drives camera along the road spline
* [ ] camera motion is smooth and feels physical
* [ ] the route has a clear beginning, middle, and end
* [ ] the viewer can feel the descent

## Panel

* [ ] one acrylic panel object is visible in the world
* [ ] the panel has a dormant state with visible presence
* [ ] the panel transitions to open state at the right moment
* [ ] profile text is readable on the panel
* [ ] the panel transitions back to closed
* [ ] the panel feels physically anchored, not floating

## Theme

* [ ] storm theme renders with rain, fog, cool lighting
* [ ] hazy day theme renders with warm lighting, no rain
* [ ] transition between themes takes 2-3 seconds
* [ ] the transition feels like time passing, not a color swap
* [ ] the transition is triggered by scroll position

## Performance

* [ ] 60fps on mid-range desktop
* [ ] 45+ fps on laptop with dedicated GPU
* [ ] no visible frame hitches during traversal
* [ ] no memory leaks over repeated playthroughs

## Architecture

* [ ] code is organized but not over-architected
* [ ] no god objects
* [ ] no spaghetti between renderer, scroll, and panel
* [ ] adding slice 2 features would not require rewriting slice 1

---

# 11. What ships after slice 1 works

This is not part of slice 1. This is what slice 1 unlocks.

* click-to-open panel interaction
* second panel type (recessed wall slab or terminal surface)
* project content panel
* more world geometry (structures, details)
* sound (rain, ambient, thunder)
* performance quality tiers
* ExperienceDirector if subsystem count warrants it

None of that exists until slice 1 passes all done criteria.

---

# 12. Time estimate

Honest estimate for one person building this properly:

* week 1: Three.js scene setup, cliff geometry, road spline, camera movement
* week 2: rain system, fog, atmosphere, wet surface materials
* week 3: panel object, panel states, profile content display
* week 4: theme system, transition, skybox, lighting shift
* week 5: polish, performance tuning, done criteria audit

Five weeks to a working slice. Not five weeks to a portfolio.

If it takes longer, the scope is wrong or the assumptions are wrong. Either way, better to know at week 5 than at week 20.
