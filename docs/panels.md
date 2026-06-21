# panels.md

# Panels in this project are not floating website cards

If I wanted floating glass cards over a canvas, I could build that in a weekend and be done with it.

That is not what this is.

In this project, a **panel is a world event**. It is the moment where the environment yields structured information. It should feel like the world is exposing a layer of itself, not like a React modal got toggled on top of a 3D background.

So the rule is simple:

> **Content panels are physically anchored to the world, visually subordinate to the world, and only open when the camera has earned the right to focus on them.**

The 3D world is still the main act. Panels are how information becomes legible **inside** that act.

---

# 1. What a panel actually is

A panel is a **content-bearing reveal surface** attached to a real place in the experience.

That means every panel has **two identities at once**:

1. **World identity**
   What it is physically inside the world.

   * an embedded acrylic slab
   * a recessed lightbox in rock
   * a steel frame mounted into the roadside wall
   * a hanging translucent plate in a sheltered section of the path
   * a terminal-like inspection surface built into a turnout / overlook

2. **Content identity**
   What it contains logically.

   * profile / intro
   * skills
   * projects
   * contact

If a panel cannot answer both of those questions, it is not ready.

---

# 2. Core panel law

## Panels are not free-floating UI

No random centered modal.
No “card pops out of nowhere.”
No giant website sheet covering the screen unless the experience absolutely earns it.

A panel must have a **physical source** in the world:

* a wall recess
* a mounted slab
* a frame
* a console surface
* a roadside marker
* a suspended acrylic plate
* a cutout chamber face

The user should be able to point at the world and say:

> “that thing is what opened.”

Not:

> “some UI appeared.”

---

# 3. What panels are for

Panels exist to do exactly four jobs:

## A) Convert atmosphere into readable information

The world creates awe, tension, scale, mood, identity.
The panel converts that into:

* who I am
* what I build
* what I know
* where to go next

## B) Let content enter without killing the illusion

A portfolio still has to function like a portfolio.
Recruiters, engineers, friends, and random strangers still need to find:

* profile
* work
* skills
* contact

Panels are how that happens **without collapsing the whole thing into a normal page layout**.

## C) Create moments of focus

The world is broad and cinematic.
Panels are narrow and deliberate.

When a panel opens, the experience says:
**look here now.**
Not forever. Not in a boring way. Just long enough for the information to land.

## D) Reward interaction without turning the whole thing into a game

I do not want puzzle mechanics.
I do not want fake gamification.
I do not want scavenger-hunt portfolio nonsense.

But I *do* want the feeling that clicking something meaningful in the world causes the world to answer back.

That’s what a panel is for.

---

# 4. The actual panel families

There are **three panel classes** in first ship.

---

# 4.1 Inline Panels

These are the default content panels.

They are attached to the roadside / cliffside path and appear as part of traversal.
They are not hidden secrets. They are the main delivery mechanism for core content.

## Use cases

* profile
* skills overview
* contact
* lightweight project previews

## Behavior

* the user reaches a section of the road / overlook / wall
* camera subtly settles
* the physical panel surface becomes visible / illuminated / activated
* content fades / resolves onto it
* user can read without losing the sense of place

## Visual character

Inline panels should feel like:

* embedded acrylic slabs
* weather-protected illuminated plates
* framed technical displays mounted into stone or steel
* “information surface discovered in the architecture”

These are **world-native**, not “browser-native.”

---

# 4.2 Focus Panels

These are heavier panels triggered by deliberate interaction.

They exist when a topic needs more space, more hierarchy, or more intentional focus than an inline panel can carry.

## Use cases

* expanded project detail
* a deeper skill breakdown
* a selected artifact / object reveal
* project case-study mode

## Behavior

* user clicks a world object, panel trigger, or highlighted module
* camera reframes toward that object
* nearby environment darkens / softens / yields visual priority
* a larger content surface opens from the object or attached structure
* the panel takes temporary dominance without becoming a full-screen web page

Focus panels are allowed to be bigger, but they still must feel physically caused by something in the world.

---

# 4.3 Overlay Panels

These are the rarest and most dangerous ones because they can easily ruin the whole thing.

Overlay panels are only allowed when the content absolutely cannot be delivered cleanly on an inline or focus surface.

## Allowed use cases

* full project deep dive
* source links / external references cluster
* maybe a resume export / formal summary view if I even keep one

## Not allowed use cases

* basic profile text
* normal skills listing
* contact links
* anything that could have been shown on a mounted panel

Overlay panels are a **pressure release valve**, not the default content system.

If I catch myself using overlay panels for everything, I’ve failed the spec.

---

# 5. Physical panel language

This matters because “panel” cannot mean one generic rounded rectangle repeated 20 times.

The world needs a small set of **panel archetypes** that make physical sense.

---

# 5.1 Recessed wall slab

A flat acrylic or glass-like surface set into rock / concrete / metal.

## Best for

* profile
* section headers
* short skills clusters
* contact

## Feeling

Clean. Controlled. Integrated. Feels like the cliff was built with this in mind.

---

# 5.2 Framed roadside display

A structural frame mounted near a bend, turnout, railing, or overlook.

## Best for

* section intros
* projects overview
* navigation cues
* “you are here / this layer means X” type framing

## Feeling

More infrastructural. Less sacred. Good for information that belongs to the path itself.

---

# 5.3 Hanging acrylic plate

A translucent suspended surface in a sheltered or dramatic space.

## Best for

* selected project focus
* quote / one-line statement / key claim
* high-contrast “hero panel” moments

## Feeling

Elegant, modern, slightly impossible, slightly precious. Use sparingly or it becomes corny.

---

# 5.4 Terminal-like inspection surface

A deliberate interaction surface tied to a machine-like object or roadside unit.

## Best for

* project detail
* interactive metadata
* links / repo / stack / notes
* content that benefits from tabs or denser hierarchy

## Feeling

Technical, active, investigative. This is the closest thing to “UI” inside the world, so it has to be earned.

---

# 6. Where each content domain lands

This is the actual mapping. No ambiguity.

---

# 6.1 Profile lands in the **entry descent + first stable turnout**

Profile is not hidden. It is not a reward for digging through the whole experience. The user should know whose world they entered early.

## World placement

After the cliffside entry establishes the tone, the first true “landing point” contains the profile surface.

## Physical form

**Recessed wall slab** or **large framed embedded panel**.

## Content on it

* name
* one-line identity statement
* short summary
* possibly a second short block about how I build / what I care about

## What it should feel like

Not “about page.”
More like:

> “Alright. This place belongs to this person. Here’s what kind of builder I’m dealing with.”

## Interaction level

Low to medium.
It should mostly reveal itself through traversal and slight camera settle, not demand a big click ritual.

---

# 6.2 Skills land across the **mid-route roadside strata**

Skills should not appear as one giant infographic vomit wall.
They should appear as **structured technical layers** across a meaningful stretch of the route.

## World placement

Mid-route sections where the path broadens, bends, or exposes different cuts of the cliff.

## Physical form

Mostly **inline panels**, possibly multiple.
Could be:

* one panel for core systems / languages
* one panel for frameworks / application layer
* one panel for tools / workflow / infrastructure

## Why

Skills are not one singular dramatic reveal.
They are evidence of accumulated depth.
That means they work better as **a sequence of controlled reads** than one mega-surface.

## Interaction level

Mostly passive-to-deliberate:

* user reaches skill stratum
* panel is already present
* optional click expands a specific category into a focus panel

## What the user should feel

Not “here is a tech stack section.”
More:

> “This road is passing through layers of what this person actually knows.”

---

# 6.3 Projects land in the **main focal structures / pull-off moments**

Projects are the heaviest content in the whole experience.
They need the strongest staging.
If profile says who I am and skills say what I know, **projects are the proof**.

So projects do **not** get treated like another panel on the wall.

They get the best spots in the route.

## World placement

Projects live at **major pauses**:

* overlooks
* widened road cutouts
* dramatic structure-adjacent spaces
* engineered roadside insertions
* moments where the camera can stop and let something breathe

## Physical form

Projects begin as **focus panels**, not just inline panels.

A project zone should usually have:

1. a visible object / surface / anchor in the world
2. a preview state
3. an interaction that opens a larger panel state
4. optional deeper overlay only if needed

## First layer of project content

* title
* one-line read
* what it is
* stack / discipline tags
* “why it matters”

## Expanded project layer

* the problem
* the build
* key technical decisions
* visuals / clips / diagrams if I use them
* repo / demo / notes links

## Important rule

The project panel must still feel like a continuation of the world.
Not:

> “you clicked a rock and now you’re on a normal website.”

Projects are where this can go wrong fastest.

---

# 6.4 Contact lands near the **late-route quiet release / exit zone**

Contact should feel like the experience letting go of you, not like a desperate CTA screaming at the end.

## World placement

Late route or final turnout.
A quieter area after the main project beats have landed.

## Physical form

A clean inline panel or framed slab.
Possibly paired with one last strong view / weather moment / final camera hold.

## Content

* email
* GitHub
* LinkedIn
* whatever else survives the content pass
* maybe one line of closing invitation

## What it should feel like

Not “contact section.”
More:

> “You’ve seen enough. If you want to talk, here’s where to find me.”

---

# 7. Panel opening behavior

This is the actual behavior contract.

Every panel goes through **states**.

---

# 7.1 Dormant

The object / surface exists in the world but is not active yet.

What is visible:

* silhouette
* frame
* faint reflections
* a little emissive detail maybe
* no readable content yet

This keeps the world believable. The panel exists before the user interacts with it.

---

# 7.2 Armed

The camera / scroll position / proximity says this panel is now relevant.

What changes:

* subtle illumination
* slight environmental emphasis
* content hints or title marks become visible
* the surface becomes obviously “alive”

Still not fully open.

---

# 7.3 Open

The panel is now readable.

What changes:

* text resolves in
* hierarchy becomes clear
* camera settles enough to let the user actually read
* nearby motion / rain / particles may reduce slightly if needed for legibility

Open does **not** mean “fullscreen takeover.”
It just means the panel is currently the active information surface.

---

# 7.4 Focused

This is the heavy state.

Triggered by:

* click
* deliberate select
* specific project interaction
* a major sequence beat

What changes:

* camera reframes harder
* panel expands or secondary surface deploys
* environment reduces competition
* the panel gains more hierarchy / more detail / more controls

Focused panels are for projects and deep reads, not for everything.

---

# 7.5 Released

The user scrolls away, closes, or transitions out.

What changes:

* focus state collapses
* readable content retracts or fades
* panel returns to armed or dormant depending on proximity

The world should never feel like it “forgot” what happened.
It should feel like the panel simply went quiet again.

---

# 8. Camera relationship to panels

This part is non-negotiable.

## The camera is not allowed to fight the panel

If I open a panel and the camera is still drifting, bobbing, shaking, or showing off, I’ve ruined my own content.

When a panel opens, the camera must make a choice:

* either stay moving because the panel is intentionally brief / ambient
* or settle because the user is clearly meant to read

Most real content panels require some degree of settle.

## Settle does not mean freeze

I still want life:

* tiny breathing motion
* environmental movement
* rain
* distant lighting shifts
* subtle parallax

But not enough motion to make reading feel annoying.

---

# 9. How panels coexist with scroll

This experience is scroll-driven, but panels cannot behave like normal web sections.

So the rule is:

## Scroll reveals the opportunity for a panel.

## Interaction or arrival opens the panel.

## Reading is not tied to a race against scroll.

That means:

* a panel can auto-arm when the user reaches its zone
* a panel can auto-open in a light way if it’s a core section
* a project panel can require a click for full detail
* scrolling away can release it

What I do **not** want:

* giant blocks of text pinned to scroll progress like a PowerPoint
* panels flickering open/closed because the user moved 20 pixels
* content that is impossible to read because the scroll timeline refuses to wait

---

# 10. Panel density rules

This is where the project can become ugly if I’m careless.

## Never let panels stack like a dashboard

If I can see 4 readable panels at once, something has gone wrong.

## Only one panel should hold primary attention at a time

There can be background surfaces, dormant anchors, or hints of future panels.
But only one active content surface should feel dominant in a given moment.

## Big moments need negative space

If a project panel is opening, the world around it needs room to breathe.
No crowding. No “and also here are 3 skills cards and 2 contact buttons.”

---

# 11. What panels are allowed to look like

Panels are allowed to be beautiful.
They are not allowed to become decorative sludge.

## Allowed

* acrylic / glass / refractive feel
* clean monospaced technical typography where it fits
* controlled bloom / edge light
* subtle internal reflection
* slight grime / weathering if the world justifies it
* very restrained animated scan / shimmer / activation states

## Not allowed

* neon cyberpunk vomit
* endless HUD lines for no reason
* fake sci-fi gibberish
* giant glassmorphism rectangles floating in empty space
* overdesigned “futuristic” frames that do more talking than the content

The panel should look expensive and intentional, not like a Figma concept board.

---

# 12. What happens to the rest of the UI when a panel opens

The panel is not the only UI thing on screen, but it is the dominant one.

## Things that may still exist

* tiny navigation markers
* theme toggle
* subtle route progress cue
* maybe a minimal persistent control or label

## Things that must not compete

* giant nav bars
* noisy floating widgets
* multiple active CTA clusters
* unnecessary HUD chrome

If a panel is open and the browser still looks like a normal website with random controls everywhere, the illusion is dead.

---

# 13. Panel ownership in architecture

This is the runtime ownership model so I don’t build it like an idiot later.

## World owns

* physical panel anchors
* where the panel exists in space
* camera relationships
* visibility triggers based on position / focus / section

## PanelController owns

* which panel is armed / open / focused
* panel state transitions
* exclusivity rules
* release behavior
* interaction routing for panel open/close/focus

## Content layer owns

* the actual data inside panels
* profile / skills / projects / contact content structure
* project metadata
* social links
* labels / copy / descriptions

## UI layer owns

* typography components
* panel layout primitives
* overlay rendering if a rare overlay panel exists
* accessibility hooks / focus management / close affordances

## Solid state is allowed to know

* active panel id
* panel mode
* selected project id
* maybe route section

## Solid state is NOT allowed to carry

* per-frame transform state
* world animation state
* physics transforms
* camera motion values at 60fps

Panels are content state and interaction state.
They are not the place where I leak render-loop state into the app shell.

---

# 14. Accessibility / practical rules

This project still has to function.

## Panels must remain readable without perfect cinematic conditions

Meaning:

* enough contrast
* enough type size
* enough background control
* enough stability during reading

## Every focused panel must be closeable

Obvious close behavior. Escape if needed. Click-away only if it doesn’t feel janky.

## Core content cannot be locked behind obscure interaction

Profile, skills, projects, contact all need a clear path to visibility.

## If the world fails, the content still needs a fallback route

If WebGL dies, the content cannot die with it.
There needs to be a degraded content path.
Not because I want to design for failure first, but because I’m not building a toy.

---

# 15. First-ship panel plan

This is the actual shipping order.

---

# Ship 1 — one panel language, one route, one proof of life

Implement:

1. **Profile inline panel**
2. **One skills inline panel cluster**
3. **One project focus panel**
4. **One contact inline panel**

That’s it.

No giant panel system explosion.
No ten variants.
No premature complexity.

## Ship 1 panel forms

* profile → recessed wall slab
* skills → roadside framed inline slabs
* project → one focus panel with a clear world anchor
* contact → final framed slab

If these four work, the panel language is real.
If these four do not work, I do not earn the right to build 12 more.

---

# 16. The standard I’m holding this to

When someone opens this and reaches a panel, I want the reaction to be:

> “Oh, that’s smart. The information is literally part of the place.”

Not:

> “cool website card.”

If the panel system feels like I just layered a portfolio UI on top of a 3D scene, then I missed the point completely.

The panel should feel like the world itself decided to speak.
