# Theming

This document defines how theme works in this project.

This is **not** a generic "light mode / dark mode" styling file.
Theme here affects **both** the UI and the world, but they are **not the same thing** and they do **not have equal authority**.

The UI needs a theme because people need readable text, contrast, and normal controls.
The world needs atmosphere because this project is supposed to feel like a place, not a skinned webpage.

Those two systems are related, but they are not interchangeable.

---

# 1) Why storm-dark exists

Storm-dark exists because I want the dark state to feel **alive**, not just dim.

If dark mode is just "same scene but darker," then it's dead. It becomes a palette swap. I don't want that. The dark state needs an actual reason to exist as its own atmosphere, and for me that reason is **storm energy** — rain, pressure, distant thunder, intermittent light bursts, wet surfaces, harder contrast, and a feeling that the environment is under tension.

The thunder matters a lot here.

Not because I want "cinematic weather" for the sake of it, but because thunder is one of the few things that can instantly change the emotional weight of a scene without adding clutter. A lightning flash can reveal form, scale, silhouette, depth, wetness, and danger in a single moment. It is one of the cleanest tools available if I use it with discipline.

So the dark theme is stormy because it gives me something useful that plain darkness does not:

* a reason for high-contrast flashes
* a reason for reflective wet surfaces
* a reason for moving atmosphere without fake busyness
* a reason for tension in the environment
* a reason for the world to feel heavier and more dramatic at night

The dark theme is not "edgy mode."
It is the **charged / storm-loaded version** of the same place.

---

# 2) UI theme vs world atmosphere

These are two separate layers.

## UI theme

UI theme is the readable interface layer:

* typography color
* panel backgrounds
* acrylic card tint
* border contrast
* button states
* overlay opacity
* HUD readability
* shadows / highlights for interface elements

The UI theme exists so the interface remains usable and coherent.

## World atmosphere

World atmosphere is the environmental layer:

* sky / fog / haze / storm density
* wetness of roads and surfaces
* reflections and specular intensity
* ambient light color and strength
* distant visibility
* rain presence / absence
* thunder and lightning behavior
* overall emotional temperature of the scene

The world atmosphere exists so the project feels like a place with a condition, not a blank 3D backdrop.

## The rule

**UI theme follows usability first. World atmosphere follows emotional intent first.**

That means I am allowed to keep the UI highly legible even if the world is moody.
Likewise, I am allowed to keep the world visually restrained even if the UI is brighter.

The UI should support the world, not compete with it.
The world should dominate the emotional read of the project.

---

# 3) The two shipping world states

For first ship, there are **two real world states**. Not ten. Not a full weather simulator. Two.

They are the same place at different times / conditions.

---

## A) Storm Night — dark theme world state

This is the dark-mode world.

### Emotional target

* heavy
* charged
* wet
* tense
* cinematic
* controlled, not chaotic

### Visual identity

* deep navy / blue-black world base
* rain on roads and surfaces
* wet reflections catching sparse light
* distant darkness swallowing detail
* occasional thunder flash revealing the environment
* harder contrast and stronger silhouette read
* cooler light balance overall

### What this state should feel like

You are moving through a cliffside road system at night during bad weather.
Not in a horror sense. Not in a disaster sense. More like the place is still functioning, still alive, still lit, but under pressure.

The roads matter here.
The rain needs to read on the road surface, on edges, on puddled sections, and in reflected highlights.
The world should feel like something you are travelling through, not something you are looking at from a distance.

### Important restriction

The storm must never become visual spam.
If the rain, lightning, fog, bloom, particles, or reflections start fighting for attention, the scene has failed.

Storm Night should feel **expensive and restrained**, not noisy.

---

## B) Hazy Morning — light theme world state

This is the light-mode world.

### Emotional target

* calm
* open
* breathable
* reflective
* quiet after intensity
* still monumental, but less threatening

### Visual identity

* pale sky and atmospheric haze
* softer shadows
* lower contrast than night
* damp surfaces still allowed, but not storm-soaked
* warm / neutral light grazing cliff roads and structures
* greater depth visibility, but still with layered atmosphere
* no thunder, no active storm pressure

### What this state should feel like

This is not "sunny cheerful portfolio morning."
It is not a happy startup landing page.

This is the same place after time has moved forward. The storm has passed or is absent. The environment is still large, weathered, and serious, but it is now readable in a different way. The roads, rock, railings, structures, and water features are seen through haze and low-angle light instead of lightning and rain.

It should feel like the world exhaled, not like it changed genres.

### Important restriction

Morning must not become generic "clean white light mode."
If it loses atmosphere and becomes a normal bright portfolio backdrop, then it has failed.

It still needs scale, weight, and identity.
It just gets there through haze, distance, softness, and light rather than storm tension.

---

# 4) Theme-switch = time-skip spec

Theme switching is **not** a normal color interpolation.

I do not want a generic 250ms ease where a few CSS variables change and the scene crossfades.
That is too cheap for what the world is supposed to be.

The theme switch should feel like **time fast-forwarding through the same place**.

Not teleportation.
Not a hard cut.
Not a magical dissolve.
A **time skip**.

---

## Theme-switch principle

When the user changes theme, it should feel like the environment rapidly advances from one condition to another.

Dark → Light should feel like:

* storm intensity dropping
* rain easing out
* sky lifting
* darkness draining from the environment
* ambient visibility increasing
* haze and daylight pushing in
* the same roads and structures remaining in place while the time-of-day / weather state changes around them

Light → Dark should feel like:

* light fading
* atmosphere thickening
* surfaces becoming wetter
* reflections sharpening
* distant darkness closing in
* rain returning
* thunder pressure building back into the world

---

## Theme-switch timing target

First ship target:

* **total duration:** ~1.2s to 2.0s
* not instant
* not so long that it becomes annoying if someone toggles repeatedly

This transition should have phases rather than one flat tween.

### Suggested first-ship phases

## Phase 1 — trigger / atmospheric destabilization

**~150–250ms**

The world acknowledges that something is changing.

Examples:

* slight exposure shift
* wind / rain intensity begins changing
* UI glass tint begins moving toward the target theme
* ambient color begins to drift

This phase is the "the world is about to skip" cue.

---

## Phase 2 — accelerated time passage

**~500–900ms**

This is the main transition body.

Examples:

* storm parameters ramp down or ramp up
* sky / fog / ambient values move strongly
* wetness values change
* road reflection intensity changes
* light direction / environment lighting interpolates
* any cloud / rain / haze simulation accelerates to sell the time jump

This is where the scene should feel like it is fast-forwarding through weather and time rather than just recoloring.

---

## Phase 3 — settle into new state

**~250–500ms**

The new world state stabilizes.

Examples:

* rain reaches final density
* fog/haze reaches target density
* UI finishes tint/contrast update
* any residual shake or flicker is removed
* the world sits still again

The result should feel intentional and complete, not like it stopped halfway through a transition.

---

# 5) How thunder is allowed to be used

Thunder is one of the most abusable things in the whole project, so I need hard rules for it.

Thunder is **allowed** because it is the reason storm-dark exists.
Thunder is **restricted** because if I overuse it, it becomes Marvel trailer nonsense.

---

## Thunder is allowed to do these jobs

### 1. Reveal scale

A lightning flash can briefly expose cliff edges, road shape, barriers, distant structures, and depth layers that are otherwise hidden.

### 2. Reassert the storm-dark identity

A storm without thunder can still work, but thunder is one of the clearest signals that this is the charged version of the world.

### 3. Punctuate a transition or moment

Used rarely, a thunder event can support:

* first entry
* a major panel reveal
* a world beat
* a dark-theme arrival during theme switch

### 4. Add pressure to still scenes

If the camera is slow and the world is quiet, a distant thunder pulse can keep the environment feeling alive without adding visual clutter everywhere.

---

## Thunder is NOT allowed to do these jobs

### 1. It is not allowed to fire constantly

No "lightning every five seconds because it looks cool."
That kills the effect immediately.

### 2. It is not allowed to replace real lighting design

If the scene only looks good when lightning flashes, the base lighting is bad.

### 3. It is not allowed to interrupt reading

Thunder cannot keep firing while the user is trying to read a panel or inspect content.

### 4. It is not allowed to become a gimmick tied to every interaction

Not every hover, click, scroll threshold, or card open deserves thunder.
That would be ridiculous.

### 5. It is not allowed to become the project's entire personality

This is important.
Thunder is an accent, not the main character.

---

## First-ship thunder rules

For the first shipped version:

* thunder exists **only in storm-dark**
* thunder is **rare**
* most thunder is **distant / environmental**, not dramatic foreground lightning
* brightness spikes must be controlled
* thunder should never fully blow out the whole frame
* if thunder coincides with a UI-open moment, the UI still remains readable
* if it starts making the project feel like a weather demo, cut it back immediately

---

# 6) What changes in world / what stays fixed

This part matters because if everything changes between themes, then it feels like two unrelated scenes instead of one place across time.

The theme system only works if the world retains identity across both states.

---

## Fixed across both themes

These things should stay fundamentally the same:

### World layout

* cliffside road path
* terrain silhouette
* structural placement
* landmarks
* major geometry
* camera route / travel path logic

### Core world identity

* this is the same location
* same roads
* same architecture language
* same environmental composition
* same "moving through a place" feeling

### Interaction structure

* same scroll-to-travel logic
* same panel anchors / reveal points
* same world-space points of interest
* same UI information architecture

### Material family

The materials can shift in response to lighting and weather, but the underlying material identity should remain consistent.
The road should still be the road.
The rock should still be the rock.
The railings / structures / water surfaces should still read as the same authored objects.

---

## Changes between themes

These things are allowed to change:

### Atmosphere

* rain on/off
* storm density
* haze density
* sky color / sky brightness
* ambient fog behavior
* distant visibility range

### Lighting

* ambient intensity
* directional light color and angle
* shadow softness
* contrast levels
* lightning flashes in storm-dark only

### Surface response

* wetness
* reflectivity strength
* puddle intensity
* specular sharpness
* bloom thresholds if used carefully

### UI surface treatment

* acrylic tint
* overlay contrast
* text contrast
* panel edge brightness
* hover glow intensity if any

### Audio later, if added

If sound ever ships, theme is allowed to change:

* rain ambience
* distant thunder presence
* wind texture
* morning atmosphere bed

But sound is not a first-ship dependency.

---

# 7) First-ship implementation order

The biggest mistake here would be trying to build the perfect theme system before the base world exists.
I do not need ten environment presets and a weather framework before I even have the actual road scene working.

So the implementation order needs to be disciplined.

---

## Stage 1 — lock the visual baseline world

Goal: make one strong neutral version of the cliff-road world before worrying about dual-theme polish.

Build:

* cliffside road composition
* camera travel path / scroll movement
* base lighting rig
* base sky / fog / depth setup
* a few clear landmarks or silhouette anchors
* enough material work that the world already has identity

At the end of this stage, the project should already feel like a place even with only one environment state.

If it doesn't, then theme work is premature.

---

## Stage 2 — ship Storm Night first

Goal: establish the strongest identity state first.

Build:

* storm-dark lighting pass
* wet road response
* rain pass
* controlled fog / atmosphere
* first restrained thunder implementation
* dark UI tint pass that remains readable over the scene

Why storm first:

* it is the more distinctive state
* it defines the project's high-drama ceiling
* it forces the material and lighting system to earn itself
* it gives me the hardest case first

If storm-dark looks cheap, the project loses a lot of its edge.

---

## Stage 3 — build Hazy Morning from the same world

Goal: prove that the place survives outside the storm.

Build:

* morning light rig
* haze behavior
* visibility tuning
* reduced wetness / changed surface response
* light UI theme pass
* confirm that the same geometry and road composition still works emotionally in daylight

This stage is where I verify that the project has a real world identity and not just "night + rain carrying everything."

If the morning state feels generic, it needs more work.

---

## Stage 4 — implement the time-skip transition

Goal: make theme switching feel authored instead of skinned.

Build:

* world atmosphere interpolation layer
* UI variable interpolation layer
* storm-to-morning and morning-to-storm transition timing
* optional one-time thunder punctuation for dark arrival if it actually helps
* guardrails against spam toggling and broken mid-transition states

Only do this after both static world states already look good.
Do not try to invent the transition before the endpoints are strong.

---

## Stage 5 — tune theme behavior around actual content

Goal: make sure the theme system survives real usage, not just empty-scene screenshots.

Test against:

* project panel open
* skill/info overlays
* scrolling while transition happens
* low-end performance cases
* text readability on both themes
* whether thunder ever fights with content
* whether storm-dark becomes tiring over time
* whether morning becomes bland over time

This is the stage where theme stops being a rendering trick and becomes part of the actual product.

---

# 8) Final rule

Theme exists to strengthen the illusion that this is a **real place moving through time**, not to provide cosmetic color options.

If a theme decision helps the UI but weakens the world, I need to rethink it.
If a theme decision makes the world look cool but makes the product unreadable, I need to rethink it.
If a theme decision exists only because "theme switchers are expected on portfolio sites," it probably should not exist at all.

The correct outcome is this:

* dark feels like the place under storm pressure
* light feels like the same place after time has moved on
* the switch between them feels like time passing through the environment
* the user never feels like they left one page and loaded another

It should feel like one world with two conditions, not two themes with a 3D background.
