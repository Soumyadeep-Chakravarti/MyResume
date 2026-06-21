# ship-1-scope.md

# Ship 1 Scope Wall

This document exists for one reason:

**To stop me from building 40% of a masterpiece and shipping 0% of a working experience.**

Every feature, system, panel, world element, and interaction that is not in the "included" list is **explicitly banned** until slice 01 passes all done criteria.

No exceptions. No "I'll just add this quickly." No "it's only 20 lines."

The slice works first. Everything else waits.

---

# 1. What's included in ship 1

These are the only things that exist in the first working build.

## World

* one cliff road segment (single spline, single route)
* one cliff wall (one side)
* open air on the other side (fog + distant sea plane)
* rain particles
* fog / atmospheric haze
* wet surface materials
* one panel anchor object (acrylic slab on frame)
* 1-2 distant silhouettes (low-poly or billboard)

That's the full world. No buildings to enter. No structures to explore. No multiple zones. No branching paths.

## Camera

* scroll-driven traversal along road spline
* approach settling at panel anchor
* panel-open settling
* release and resume
* end-point settling

No free camera. No mouse-look. No user-controlled rotation. No cinematic cutscenes. No camera shake. No FOV tricks.

## Panel

* one panel archetype: mounted acrylic slab
* three states: dormant, open, closed
* auto-open on scroll threshold
* auto-close on scroll past
* profile content only (name, title, tagline)

No click interaction. No focus state. No overlay panels. No multiple panel types. No panel animations beyond fade-in/fade-out of content. No close button. No escape key handling.

## Theme

* two themes: storm, hazy day
* one transition between them
* scroll-position trigger
* fog, rain, lighting, skybox changes during transition

No user-triggered switching. No theme picker UI. No multiple transition styles. No per-object theme reactions. No theme-dependent geometry changes.

## Content

* `src/content/profile.ts` with name, title, tagline

No projects. No skills. No contact. No links. No social icons. No bio paragraphs. No about section. No resume data.

## Runtime

* boot sequence
* render loop
* scroll service (Lenis)
* panel controller (minimal state machine)
* theme manager (two states, interpolation)

No ExperienceDirector. No SimulationDirector. No AnimationEngine. No ContentBridge. No WorldInteractionBridge. No physics worker. No animation governance. No subsystem coordination layer.

## Audio

None. Slice 1 is silent.

---

# 2. What's explicitly banned until after slice 01 works

This is the hard wall. Everything listed here is a real feature that belongs in the full project. None of it ships in slice 1.

If I catch myself building any of these before slice 01 passes all done criteria, I stop and go back to the slice.

## Banned: panels

* click-to-open interaction
* second panel type (recessed wall slab)
* third panel type (terminal surface)
* fourth panel type (hanging acrylic plate)
* overlay panels
* panel focus state
* panel armed state
* close button / escape key dismissal
* click-outside-to-close
* panel-to-panel transitions
* panel animation choreography
* panel content beyond profile identity

## Banned: world

* multiple route segments
* branching paths
* tunnel / compression segments
* structures to enter or explore
* multiple anchor objects
* interactive world objects (clickable things in the scene)
* world object hover states
* raycasting / hit testing
* distance-based object LOD system
* dynamic geometry loading
* world sound zones

## Banned: content

* project content / project panels
* skill content / skill panels
* contact content / contact panels
* social links
* bio paragraphs
* about section
* resume data
* any content beyond profile identity

## Banned: runtime systems

* ExperienceDirector
* SimulationDirector
* AnimationEngine
* ContentBridge
* WorldInteractionBridge
* CameraDirector as a separate system
* physics worker
* rigid body simulation
* particle physics
* wind simulation
* simulation quality tiers

## Banned: interaction

* click-to-open anything
* hover states on world objects
* mouse-driven camera movement
* touch gestures beyond scroll
* keyboard navigation
* accessibility features (comes after the experience works)

## Banned: theme / atmosphere

* more than two themes
* user-triggered theme switching
* theme picker UI
* per-object theme reactions
* theme-dependent geometry swaps
* seasonal variations
* time-of-day cycle
* dynamic weather beyond storm ↔ hazy day

## Banned: audio

* ambient sound
* rain sound
* thunder sound
* UI sound effects
* music
* spatial audio
* audio-reactive visuals

## Banned: performance

* quality tier system (comes after base performance is proven)
* dynamic resolution scaling
* aggressive LOD system
* texture streaming
* geometry instancing optimization (unless needed for rain)

## Banned: polish

* intro sequence / boot animation
* loading screen design
* cursor effects
* scroll indicator / progress bar
* section navigation
* mini-map or route indicator
* any HUD element

## Banned: deployment

* custom domain setup
* analytics
* SEO optimization
* meta tags / Open Graph
* sitemap
* performance monitoring
* error tracking

---

# 3. The rule

The rule is simple:

> **If it's not in the included list, it doesn't exist yet.**

Not "I'll add it quickly."
Not "it's just a small feature."
Not "it'll only take an hour."

The slice is the whole world right now.
Everything outside the slice is a lie until the slice works.

---

# 4. How to use this document

When I'm building and I think "I should add X":

1. Check this document.
2. If X is in the banned list, stop.
3. If X is not in either list, add it to the banned list (default to banned).
4. Go back to slice work.

When I'm designing and I think "the experience needs Y":

1. Check this document.
2. If Y is banned, write it in a `maybe-later.md` file.
3. Go back to slice work.

The only document that matters during slice development is `slice-01.md`.
This document exists to protect that focus.

---

# 5. What happens after slice 01 works

Once slice 01 passes all done criteria from `slice-01.md`:

1. Audit the working slice. What actually worked? What assumptions were wrong?
2. Update `stack-rules.md` based on what the code actually taught me.
3. Define slice 02 (probably: click interaction + project panel + second panel type).
4. Move features from banned to included, one slice at a time.

The full project vision (world.md, panels.md, sequence.md) becomes relevant again at that point. Not before.

---

# 6. Why this wall exists

Because the vision docs are seductive.

`world.md` makes me want to build six world zones.
`panels.md` makes me want to build five panel archetypes.
`sequence.md` makes me want to choreograph a full cinematic experience.
`stack-rules.md` makes me want to build seven subsystems before anything renders.

All of those impulses are correct for the full project.
All of them are fatal for ship 1.

The wall exists so I can build the thing that makes people stare — not the thing that makes me admire my own design docs.
