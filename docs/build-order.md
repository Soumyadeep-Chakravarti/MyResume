# build-order.md

# Slice 01 Build Order

This is the implementation law for slice 01.

Not suggestions. Not a rough outline. The exact order I am allowed to build things in.

If I skip ahead, I stop and go back to the current phase.
If I feel tempted to add something from a later phase, I write it in a `maybe-later.md` file and keep going.

The build order exists because I will absolutely start building the cool part (panels, themes, content) before the foundation part (route, camera, world) if nobody stops me.

This document stops me.

---

# Phase A — Prove the route exists

**Goal:** A camera moves through a 3D scene driven by scroll. Nothing else. No panels. No content. No themes. No rain. Just motion through space.

**Why this comes first:** If scroll-to-camera-feels-bad, nothing else matters. The route is the spine. The spine has to work before anything attaches to it.

---

## A1. Scene scaffold

Create a minimal Three.js scene.

* renderer running
* camera created
* render loop calling `renderer.render()`
* basic scene lighting (one directional, one ambient)
* a ground plane or road surface so the camera has something to look at

### Done means:
* a Three.js canvas fills the viewport
* something renders
* no errors in console
* frame loop is running

### Not allowed during A1:
* no rain
* no fog
* no post-processing
* no Solid integration yet (prove Three.js works standalone first)
* no scroll handling
* no animation libraries

---

## A2. Road geometry

Create the actual road surface the camera will follow.

* a road mesh — either a plane following a spline, an extruded path, or a simple series of planes
* road extends from a start point to an end point
* road has slight curvature and descent (not a straight line)
* road is visible and gives the camera something to move along

### Done means:
* a road surface exists in the scene from point A to point B
* the road is long enough to feel like a short route (10-15 seconds of scroll at normal speed)
* the road has visible curvature or descent

### Not allowed during A2:
* no road texturing beyond a flat color
* no road reflections
* no road wetness
* no cliff walls yet
* no structures
* no objects on the road

---

## A3. Cliff wall masses

Add the cliff geometry that defines the world.

* a large cliff wall on one side of the road
* simple geometry — a wall, a set of planes, or a sculpted mass
* cliff extends the full length of the road
* cliff is tall enough to feel imposing (at least 2-3x camera height)

### Done means:
* the road is bounded by a cliff wall on one side
* the scene feels like a road cut into rock, not a road in empty space
* the scale feels believable

### Not allowed during A3:
* no cliff texturing beyond a flat material
* no rock detail geometry
* no runoff channels
* no vegetation
* no structures attached to the cliff

---

## A4. Open side treatment

The other side of the road (opposite the cliff) needs to feel like open air, not a void.

* either a distant sea plane with a flat color
* or a fog plane that creates depth
* or just a background color that implies distance

Minimal. Just enough to stop the scene from feeling like a box.

### Done means:
* looking off the open side of the road implies distance or sky
* the scene does not feel enclosed on all sides

### Not allowed during A4:
* no detailed ocean
* no distant landscape
* no skybox yet
* no clouds

---

## A5. Camera rail

The camera needs to follow a path through the scene.

* define a camera spline or path through the road segment
* camera position is driven by a single parameter: scroll progress (0-1)
* at progress 0, camera is at the road start
* at progress 1, camera is at the road end
* camera orientation follows the path tangent (looks where it's going)

### Done means:
* scrolling moves the camera from start to end of the road
* camera follows the path smoothly
* camera orientation follows the road direction
* no user-controlled rotation
* no keyboard controls
* no mouse-look

### Not allowed during A5:
* no camera shake
* no camera bob
* no easing beyond basic lerp
* no approach/settle behavior (that's for panels)
* no focus targets
* no FOV changes

---

## A6. Solid integration

Wire the Three.js scene into the Solid app.

* renderer canvas mounts into the Solid component tree
* scroll position comes from the DOM (or Lenis if already set up)
* scroll position drives camera progress
* app boots and the scene is immediately interactive

### Done means:
* the Solid app renders the Three.js scene
* scrolling the page moves the camera
* the integration works without errors
* hot reload doesn't break the scene

### Not allowed during A6:
* no reactive signals driving per-frame camera state (camera update is imperative, not reactive)
* no Solid state managing world transforms
* no component-level render loops (one central loop)

---

## A checkpoint: Prove the route feels good

Before moving to Phase B, sit with this.

* Does scroll-to-camera feel better than scrolling a page?
* Does the road curvature and descent create a sense of movement?
* Does the cliff wall create a sense of place?
* Does the open side create depth?
* Does the route have a clear beginning and end?

If the answer to any of those is no, fix the route before adding anything else.

**This is the most important checkpoint in the entire build.**

---

# Phase B — Prove the world has atmosphere

**Goal:** The route from Phase A now has weather, lighting, and material quality that makes it feel like a place instead of a geometry test.

**Why this comes second:** Atmosphere is what separates "Three.js demo" from "world." The route needs to feel heavy and intentional before panels attach to it.

---

## B1. Storm lighting

Set up the storm theme lighting.

* dark ambient light
* directional light with cool/blue temperature
* scene should feel dark, moody, heavy
* no阳光. No warmth. Storm means storm.

### Done means:
* the scene reads as "dark and stormy" without any rain
* the lighting creates mood

### Not allowed during B1:
* no rain yet
* no thunder
* no fog yet
* no skybox yet
* no second lighting setup

---

## B2. Hazy day lighting

Set up the hazy day theme lighting.

* warmer ambient light
* directional light with golden/neutral temperature
* scene should feel bright, open, breathable
* the contrast with storm mode should be obvious

### Done means:
* the scene reads as "bright daytime" when this lighting is active
* switching between storm and hazy day lighting creates an obvious mood shift

### Not allowed during B2:
* no rain in either mode
* no fog differences yet (just lighting)
* no skybox yet
* no transition system yet

---

## B3. Theme switching (lighting only)

Implement the ability to toggle between storm and hazy day lighting.

* one signal or variable controls the current theme
* switching updates all lights to match the target theme
* the switch is instant for now (transition comes later)

### Done means:
* one toggle switches all lighting between storm and hazy day
* the toggle can be triggered from a scroll threshold or manual call
* the scene looks correct in both modes

### Not allowed during B3:
* no gradual transition (instant switch is fine for now)
* no fog transition
* no rain transition
* no skybox transition
* no UI for theme switching

---

## B4. Fog

Add atmospheric fog.

* scene fog that creates depth
* fog density varies by theme: heavier in storm, lighter in hazy day
* fog color matches the lighting in each theme

### Done means:
* distant objects fade into fog
* fog is heavier in storm mode, lighter in hazy day mode
* the fog transition is visible when switching themes

### Not allowed during B4:
* no volumetric fog
* no fog layers
* no fog cards
* just scene fog or simple exponential fog

---

## B5. Skybox or background

Replace the void with a sky.

* either a simple gradient sky
* or a skybox image
* sky changes with theme: dark/stormy in storm mode, bright/hazy in hazy day mode

### Done means:
* looking up or into the distance shows sky, not blackness
* sky matches the current theme
* sky transition is visible when switching themes

### Not allowed during B5:
* no animated clouds
* no dynamic sky
* no day/night cycle
* just a static sky per theme

---

## B6. Cliff material

Give the cliff wall a real material.

* tiling rock or concrete material
* should look rough, weathered, heavy
* responds to lighting properly (roughness, normal map if available)
* wetness variation is not needed yet (comes in B7)

### Done means:
* the cliff looks like rock or concrete, not a flat polygon
* the material holds up at camera distance

### Not allowed during B6:
* no wetness yet
* no moss/vegetation
* no dynamic material changes
* no multiple cliff materials

---

## B7. Road material

Give the road a real material.

* dark asphalt or concrete tiling material
* roughness that can later support wetness
* should feel like a road surface

### Done means:
* the road looks like a road surface
* the material responds to lighting

### Not allowed during B7:
* no road reflections yet
* no road wetness yet
* no puddles
* no road markings

---

## B8. Wetness system (basic)

This is what sells the storm theme.

* cliff and road surfaces get a wetness parameter
* in storm mode: surfaces look wet (lower roughness, slight reflectivity, darker albedo)
* in hazy day mode: surfaces look dry (higher roughness, normal albedo)
* the wetness transitions with the theme

### Done means:
* storm mode surfaces look wet
* hazy day mode surfaces look dry
* the difference is visible and feels physical
* wetness transitions with the theme (can be instant for now)

### Not allowed during B8:
* no puddles
* no runoff
* no animated water
* no reflection probes
* just roughness/albedo shift

---

## B9. Theme transition (gradual)

Make the theme switch gradual instead of instant.

* transition takes 2-3 seconds
* all lighting, fog, skybox, and wetness interpolate together
* the transition is triggered by scroll position (one defined point in the route)
* transition should feel like time passing, not a fade between two screenshots

### Done means:
* theme switch takes 2-3 seconds
* lighting, fog, sky, and wetness all transition together
* the transition feels smooth and physically motivated
* route progress does not reset during transition
* camera does not jump during transition

### Not allowed during B9:
* no per-object transition effects
* no transition sound
* no transition particles
* no user-triggered switching (scroll trigger only)
* no pause during transition

---

## A checkpoint: Prove the world has tone

Before moving to Phase C, sit with this.

* Does storm mode feel heavy, moody, cinematic?
* Does hazy day mode feel open, warm, breathable?
* Does the transition between them feel like time passing?
* Does the wetness sell the rain feeling even without actual rain?
* Does the route feel like a place, not a geometry test?

If the atmosphere doesn't land, the panels won't land. Fix the mood before adding content.

---

# Phase C — Prove one panel works

**Goal:** A physical panel object exists in the world, attached to the route, that can display profile content. The viewer can scroll past it, see it open, read it, and continue.

**Why this comes third:** The route and atmosphere have to feel like a real place before a panel attaches to it. A panel in a geometry test is a card on a canvas. A panel in a world is an object in a place.

---

## C1. Panel anchor object

Place one physical object in the world that will hold the panel.

* a steel frame, wall bracket, or rock-cut recess at a defined point on the road
* positioned at roughly 60% through the route
* visible from a distance as the camera approaches
* should feel like something mounted to the cliff or road infrastructure

### Done means:
* a physical anchor object is visible at the correct route position
* the object feels like it belongs in the world
* the camera passes it naturally during traversal

### Not allowed during C1:
* no panel surface yet (just the anchor/mount)
* no interaction
* no glow
* no content

---

## C2. Acrylic panel surface

Add the actual panel surface to the anchor.

* a flat rectangular slab — acrylic, glass, or translucent material
* mounted to the anchor object from C1
* slight edge glow or internal illumination when dormant
* the surface should feel like a physical object with thickness

### Done means:
* a translucent slab is visible, attached to the anchor
* the slab has a slight glow or emissive presence in storm mode
* it looks like a mounted display surface, not a floating plane

### Not allowed during C2:
* no text on the panel
* no content
* no interaction states
* no panel animation

---

## C3. Panel states

Implement the three panel states.

* **dormant**: panel surface visible, slight glow, no content
* **open**: panel surface lit up, content resolved onto it
* **closed**: content retracts, panel returns to dormant or camera moves on

State transitions are triggered by scroll position:
* panel opens when camera reaches the anchor (scroll threshold)
* panel closes when camera scrolls past a second threshold

### Done means:
* panel transitions from dormant to open at the right scroll position
* panel transitions from open to closed at the right scroll position
* transitions are smooth (fade in/out of content, not a hard cut)
* the state machine is clean and debuggable

### Not allowed during C3:
* no click interaction
* no close button
* no escape key
* no focus state
* no armed state
* just dormant → open → closed

---

## C4. Panel content rendering

Display profile content on the panel.

* name
* title
* tagline

Three lines of text, rendered onto the panel surface.

The text should be readable. Not decorative. Not microscopic. Actually legible at the camera distance the settling behavior creates.

### Done means:
* profile text is visible and readable when the panel is open
* text fades in with the panel open transition
* text fades out with the panel close transition
* text is properly positioned on the panel surface

### Not allowed during C4:
* no rich layout
* no icons
* no links
* no interactive elements on the panel
* just text on the panel surface

---

## C5. Camera settle on panel approach

When the camera reaches the panel, it needs to settle into a readable position.

* camera slows down as it approaches the anchor
* camera frames the panel in a readable position
* settling takes 1-2 seconds of controlled easing
* the panel is the dominant visual element during open state

### Done means:
* camera settles to a position where the panel content is readable
* settling feels smooth, not jerky
* the world is still visible but the panel has visual priority
* camera resumes traversal after panel closes

### Not allowed during C5:
* no camera cut
* no instant snap
* no complex camera choreography
* just slow down → settle → resume

---

## A checkpoint: Prove the panel works in the world

Before moving to Phase D, sit with this.

* Does the panel feel physically anchored to the world?
* Does the dormant state feel like a real object waiting to activate?
* Can you read the profile content when the panel is open?
* Does the camera settle feel smooth and deliberate?
* Does the panel close feel clean, not jarring?
* Does the world still feel like a place while the panel is open?
* Does scrolling past the panel feel natural?

**This is the second most important checkpoint.** The panel is the main content delivery mechanism. If it doesn't work here, nothing downstream works.

---

# Phase D — Polish and freeze

**Goal:** Add the remaining atmospheric details, performance tune, and freeze the slice.

**Why this comes last:** Rain, thunder, and polish are not features — they're the final layer that makes the existing work feel finished. They come after everything structural works.

---

## D1. Rain particles

Add rain to storm mode.

* particle system with rain drops
* rain is visible but not overwhelming
* rain falls in both storm and hazy day modes (rain stops during hazy day)
* rain transitions with the theme (ramps down during transition)

### Done means:
* rain is visible in storm mode
* rain stops or nearly stops in hazy day mode
* rain particles don't tank performance
* rain feels atmospheric, not distracting

### Not allowed during D1:
* no rain sound
* no rain on surfaces (that's a shader system, not slice 1)
* no puddle generation
* no splash particles
* just falling particles

---

## D2. Thunder flash (optional)

If it actually improves the storm moment.

* occasional bright flash in storm mode (sky briefly lights up)
* flash happens 2-3 times during the route
* flash is visual only, no sound

### Done means:
* flash is visible but subtle
* flash doesn't break the render
* flash feels like distant lightning, not a screen flash

### Not allowed during D2:
* no thunder sound
* no screen shake
* no particle burst
* just a sky/light flash

If thunder doesn't improve the moment, skip it entirely. Don't add it because it's in the spec.

---

## D3. Material polish

Final material pass on the world.

* cliff material looks good in both themes
* road material looks good in both themes
* panel material looks good in both themes
* wetness transition is convincing
* no material pops or obvious tiling artifacts at camera distance

### Done means:
* materials hold up at all camera distances the route uses
* no visual glitches in either theme
* the world looks intentional, not like placeholder textures

---

## D4. Performance audit

Test on target hardware.

* desktop: 60fps
* laptop with dGPU: 45+ fps
* no frame hitches during traversal
* no memory growth over repeated playthroughs
* rain particles don't cause drops

If performance is bad, reduce in this order:
1. rain particle count
2. fog quality
3. wetness quality
4. post-processing
5. shadow quality
6. geometry detail

### Done means:
* frame rate targets are met
* no visual quality is obviously broken after reduction
* the experience feels smooth

---

## D5. Done criteria audit

Go through every done criterion in `slice-01.md` and check it against the working build.

If anything fails, fix it before freezing.

### Done means:
* every checkbox in `slice-01.md` section 10 is checked
* the slice works end-to-end
* no major architectural rewrites are needed for slice 2

---

## D6. Freeze

Once all done criteria pass:

* no more feature additions
* no more polish
* no "one more thing"
* the slice is done
* move on to `maybe-later.md` and slice 2 planning

---

# Checkpoints summary

| Phase | Checkpoint question | If no → action |
|-------|-------------------|----------------|
| A | Does the route feel better than scrolling a page? | Fix route. Don't add atmosphere to a bad route. |
| B | Does the world have tone and mood in both themes? | Fix atmosphere. Don't add panels to a flat world. |
| C | Does the panel feel like a physical object in the world? | Fix panel. Don't polish a broken content delivery system. |
| D | Does the slice pass all done criteria? | Fix what fails. Don't ship a broken slice. |

---

# Technical dependency notes

These are the real dependencies between phases, not just logical ordering:

* **A6 (Solid integration) depends on A5 (camera rail)**: the scroll-to-camera link needs the camera path defined first
* **B9 (gradual transition) depends on B3 (instant switch)**: you need the toggle working before you can interpolate it
* **B8 (wetness) depends on B6/B7 (materials)**: wetness modifies material properties, so materials need to exist first
* **C5 (camera settle) depends on C1 (anchor position)**: camera needs to know where the panel is to settle on it
* **C4 (content rendering) depends on C2 (panel surface)**: text needs a surface to render onto
* **D1 (rain) depends on B9 (transition)**: rain needs to transition with the theme

Everything else within a phase can be built in the listed order or slightly shuffled as needed.

---

# maybe-later.md

Features that come up during build but are not in slice 1 go here. Updated as the build progresses.

* click-to-open panel interaction
* panel close button / escape key
* second panel archetype
* project content panels
* skill content panels
* contact panel
* rain sound
* thunder sound
* ambient audio
* multiple route zones
* tunnel / compression segments
* interactive world objects
* raycasting / hit testing
* ExperienceDirector
* SimulationDirector
* AnimationEngine
* ContentBridge
* quality tier system
* loading screen
* intro sequence
* cursor effects
* scroll progress indicator
* section navigation
* mobile optimization
* accessibility
