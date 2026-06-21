# sequence.md

# Experience Timeline / Sequence Spec

This file defines the **actual user-facing sequence** of the experience.

Not the architecture.
Not the worldbuilding in isolation.
Not the visual mood board.

This is the **timeline of what the user actually goes through** from first load to final contact.

The goal is simple:

* the experience should feel like **a deliberate descent through a place**
* content should appear at the **right emotional and structural moments**
* the world should never feel like a wallpaper behind a portfolio
* the portfolio should never feel like cards awkwardly bolted on top of a tech demo

The world leads.
The content follows.
The sequencing is what makes those two things feel like one project instead of two unrelated ones forced together.

---

# 0. Sequence Principles

## 0.1 The experience is a route, not a page stack

The user is not moving through “Hero / About / Skills / Projects / Contact” as page sections.

They are moving through **a physical route** carved into the world.

That route has:

* a beginning
* a descent
* slower stretches
* reveal moments
* major stops
* a final exit / final chamber / last overlook

The content is attached to **moments along the route**, not to a generic webpage section order.

---

## 0.2 The world always gets the first word

Every phase begins with **space / motion / atmosphere / framing** first, then content.

That means:

* do **not** open with a giant text block
* do **not** start by throwing a skills grid in the user’s face
* do **not** front-load explanation

The user should first understand:

1. where they are
2. how movement feels
3. what kind of experience this is
4. what kind of taste / technical confidence is behind it

Only after that do we ask them to read more.

---

## 0.3 Content must arrive in order of trust

The order of content is not arbitrary.

A technically literate stranger will usually ask some version of these questions in sequence:

1. **What is this?**
2. **Who made it?**
3. **What kind of builder are they?**
4. **Can they actually do anything serious?**
5. **What have they built?**
6. **How do I contact them / verify them / dig deeper?**

The experience timeline should answer those questions in that order.

That means the content sequence is:

1. **Identity marker**
2. **Profile / philosophy / build style**
3. **Skills / capability framing**
4. **Projects / actual proof**
5. **Contact / links / exit**

Projects are the main payload.
Everything before them exists to make them hit harder.

---

## 0.4 Not every stretch of the route needs content

Some stretches exist to:

* reset the eye
* create anticipation
* let the world breathe
* make the next stop feel earned
* sell scale / mood / continuity

Silence is allowed.
Atmosphere is allowed.
Dead air is not.

If a stretch has no content, it still needs a job:

* scale reveal
* transition
* pacing reset
* tension build
* palette shift
* approach to next stop

---

# 1. High-Level Timeline

The first shipping experience is divided into **6 phases**:

1. **Arrival**
2. **Identity**
3. **Capability**
4. **Project Run**
5. **Deep Project / Final Proof**
6. **Exit / Contact**

These are not visible section names in the UI.
They are internal sequence phases.

---

# 2. Phase-by-Phase Timeline

---

# Phase 1 — Arrival

## Purpose

This phase exists to do one thing:

**make the user immediately understand that this is not a normal portfolio site.**

This is where the project earns attention.
If this phase feels generic, the rest of the experience starts from a disadvantage.

---

## Emotional job

The user should feel:

* they’ve entered something deliberate
* the world has scale
* movement has weight
* the site has confidence
* this thing was built, not assembled from templates

Not “wow so many particles.”
Not “cool background.”
Not “nice landing page.”

The feeling should be closer to:

> “alright, this person is doing something much more serious than a normal portfolio.”

---

## Content in this phase

**Almost none.**

Allowed content:

* name
* one-line identity / title
* maybe one short sentence if absolutely needed

That’s it.

No full bio.
No project cards.
No contact links.
No skill wall.

---

## What happens

### Arrival sequence

* The world loads in a controlled state.
* Camera establishes the cliff road and immediate surroundings.
* User is given the sense that the route continues deeper.
* Motion settles into the scroll-driven traversal model.

### First visible identity marker

Once the arrival motion settles enough for the user to read, show:

* **name**
* **title / one-line descriptor**

Example structure only, not final copy:

* `Buna Sai`
* `Systems-minded developer building overengineered interactive software`

This is not a hero section.
It is a **nameplate at the mouth of the experience**.

---

## Hard rules for Arrival

* no giant paragraph
* no full-screen CTA spam
* no “scroll down” cringe prompt unless it is extremely restrained
* no cards flying at the camera
* no fake terminal boot text
* no making the user read before they’ve even understood the space

---

# Phase 2 — Identity

## Purpose

This phase answers:

**Who am I, and what kind of builder is this experience trying to introduce?**

This is where `profile.ts` actually starts landing.

The user has already accepted the world and movement language.
Now they need the person behind it.

---

## Content source

**`src/content/profile.ts`**

This phase pulls from:

* name
* title
* short intro copy
* bio fragments / aboutParts
* any short “how I think / what I care about” statements

---

## Emotional job

This phase should make the viewer feel:

* there is an actual mind behind this, not just effects
* the builder has a point of view
* the work has personality without becoming self-indulgent
* this person likes systems, craft, polish, and hard problems

---

## How profile should be presented

Not one giant “About Me” slab.

Profile should arrive as **2–4 discrete beats** across the route.

### Profile Beat 1 — Identity

Short, clean, immediate:

* who I am
* what I broadly do

### Profile Beat 2 — Build style

What kind of work I gravitate toward:

* systems
* tooling
* simulation
* interfaces
* technical polish
* overbuilt experiments
* low-level curiosity
* whatever actually matches the truth of the portfolio

### Profile Beat 3 — Working philosophy

What matters in the work:

* architecture
* depth
* craft
* performance
* weird ideas executed properly
* not shipping half-baked gimmicks

### Optional Profile Beat 4 — Breadth without chaos

If needed, this is where I acknowledge the “generalist” shape of the work — but in a controlled way.

Not “I do everything.”
More like:

* multiple technical interests
* multiple project forms
* one consistent standard of build quality and curiosity

---

## World behavior in this phase

The world should still be moving.
This is still traversal, not a modal content stop.

The route can slow slightly during profile beats, but it should not feel like the entire experience freezes to show a bio.

The profile phase should feel like:

* you’re moving through the world
* the space is introducing its builder in measured fragments
* the route is still pulling you forward toward something larger

---

## Hard rules for Identity

* do not dump the whole bio at once
* do not turn this into a LinkedIn summary pasted into a pretty box
* do not oversell
* do not explain every interest here
* do not make profile longer than the projects section

Profile exists to create **context and trust**, not to consume the entire experience.

---

# Phase 3 — Capability

## Purpose

This phase answers:

**What can I actually do, technically?**

This is where **skills** land.

Not because skills are exciting on their own, but because after profile the user needs a clearer sense of technical range before the projects start making claims.

---

## Content source

**`src/content/skills.ts`**

This phase pulls from:

* language groups
* frameworks / libraries
* tools / systems
* capability categories
* level indicators if they’re actually honest and useful

---

## Emotional job

The user should come out of this phase thinking:

* okay, there’s real technical range here
* this person isn’t just doing one tutorial-stack trick
* the later project claims might actually be backed by skill depth
* the work probably spans systems, UI, runtime, tooling, and experimentation

---

## How skills should be presented

**Not as a giant resume grid dropped in the middle of the route.**

Skills should be shown as **capability clusters**.

I want this phase to feel less like “here are my technologies” and more like:

> “here’s the technical material this experience is made out of.”

---

## Capability cluster structure

### Cluster A — Core systems / programming foundation

Examples:

* C / C++
* Python
* TypeScript
* systems-level thinking
* performance-minded engineering

### Cluster B — interface / application / frontend runtime

Examples:

* Solid / React-style UI thinking
* animation systems
* interaction design
* rendering integration
* frontend architecture

### Cluster C — tools / platform / workflow

Examples:

* Git
* Linux
* Docker
* build systems
* whatever actually matters and isn’t filler

---

## Placement in the route

Skills should appear **after profile but before the main project run**.

This is important.

If skills come too early:

* they feel like resume filler
* the user doesn’t care yet
* the world hasn’t earned enough trust

If skills come too late:

* they feel like an appendix
* they stop mattering because projects have already done the proving

So skills belong in the **early-middle** of the experience.

---

## World behavior in this phase

This is a good place for the route to become slightly more structured.

Profile can be more fluid and atmospheric.
Skills can feel a little more architectural / organized.

The world does not need to stop, but the pacing can tighten:

* cleaner framing
* more deliberate panel placement
* slightly more technical HUD language if needed

This phase should feel like the experience briefly becomes more **legible and structural** before the projects blow it open again.

---

## Hard rules for Capability

* no giant skills wall
* no 50-icon soup
* no fake proficiency inflation
* no random technologies added for decoration
* no making skills feel more important than projects

Skills are support.
Projects are proof.

---

# Phase 4 — Project Run

## Purpose

This is the main body of the experience.

This phase answers:

**What have I actually built, and why should anyone take me seriously?**

This is where the experience cashes out.
If this phase is weak, the whole project is weak no matter how good the world looks.

---

## Content source

**`src/content/projects.ts`**
and optionally the GitHub adapter layer where useful.

This phase pulls from:

* flagship projects
* secondary projects worth surfacing
* stack / role / status / summary metadata
* links to repo / live demos / deeper case studies where applicable

---

## Emotional job

The user should feel some version of:

* this person actually builds substantial things
* the range is real, not cosmetic
* there is depth here, not just surface polish
* the experience itself is not a fluke — it belongs to a pattern of ambitious work

---

## Structure of the Project Run

Projects should not be one uniform list.

The project phase should be structured as **stops with hierarchy**.

## Stop 1 — First flagship

This is the first major proof point.
It should be a project that immediately establishes seriousness.

Use this stop to show:

* technical ambition
* problem complexity
* quality of thinking
* what kind of projects I’m drawn to

This is the first “sit here for a second” project moment.

---

## Stop 2 — Different axis of competence

The second project should not feel like a copy of the first.

If the first project proves one axis, the second should prove another.

Examples:

* first proves systems depth, second proves product/interaction depth
* first proves simulation/architecture, second proves tooling / real-world utility
* first proves low-level curiosity, second proves design / presentation / UX

The point is to show **range without chaos**.

---

## Stop 3 — Weird / memorable / technical flex

This stop exists to make the portfolio feel personal and unmistakable.

Not a random toy.
Not a filler mini-project.
A project that reveals taste, curiosity, or technical obsession.

Something where the viewer thinks:

> “yeah okay, this is absolutely the same person who built the experience I’m currently inside.”

---

## Stop 4+ — Optional secondary project band

If there are more projects worth showing, this is where they live.

These should be compressed compared to the flagship stops:

* smaller cards
* faster reveals
* less cinematic overhead
* still integrated into the route

Do **not** give every project equal dramatic weight.

That flattens the experience and makes the important work feel less important.

---

## World behavior in Project Run

This is where the world earns its keep.

Projects should be tied to **real route moments**:

* overlooks
* widened road segments
* chambers
* road cutouts
* hanging structures
* suspended surfaces
* embedded acrylic display surfaces
* whatever fits the world spec

The key point is:

**a project stop should feel like the route led you somewhere worth stopping.**

Not like a card happened to appear because scroll position reached 63%.

---

## Project phase pacing

This phase should be the **longest** and **richest** in the sequence.

Not because it has the most words, but because it gets:

* the biggest pauses
* the strongest camera framing
* the most memorable reveals
* the most deliberate information density
* the clearest connection between world and content

If the entire experience is a movie, the projects phase is the main act.

---

## Hard rules for Project Run

* no generic portfolio card wall
* no equal weight for every project
* no using the world as a fake excuse to hide weak project writing
* no turning projects into unreadable cinematic nonsense
* no making the user fight the camera just to learn what a project is

Projects are the payload.
They must still be readable, navigable, and clear.

---

# Phase 5 — Deep Project / Final Proof

## Purpose

This is the late-stage lock-in moment.

The user has already seen profile, skills, and a project run.
Now I want one final stretch that makes them think:

> “alright, this person is the real deal.”

This phase is not mandatory if the project run already achieves that cleanly, but I think the experience benefits from a **late heavy stop**.

---

## What this phase can be

One of three things:

### Option A — the strongest project gets a second, deeper treatment

Use this if there’s one project that genuinely deserves a more detailed breakdown.

### Option B — an engineering / process / architecture chamber

Use this if the portfolio needs a final “here’s how I think and build” moment without turning into a wall of text.

### Option C — a synthesis stop

A moment that ties together:

* the world
* the work
* the build philosophy
* the reason the experience was made this way

---

## What should land here

If this phase exists, it should justify itself by doing something the earlier project stops didn’t.

Examples:

* show the architecture of a flagship project
* show the depth behind the current experience itself
* reveal a more technical layer of one project
* make the “overbuilt but disciplined” identity fully explicit

---

## Why this phase matters

Without a late anchor, the back half of the experience can collapse into “more cards + then contact.”

I don’t want that.

I want the final content-bearing phase to feel like:

* a last serious proof point
* a final escalation
* a reason to remember the whole thing after leaving

---

# Phase 6 — Exit / Contact

## Purpose

This phase answers:

**Okay, I’m interested. Where do I go now?**

This is where **contact** and **links** land.

---

## Content source

**`src/content/links.ts`**

This phase pulls from:

* email
* GitHub
* LinkedIn
* any other actually relevant external links
* possibly a resume / CV export if I choose to keep one

---

## Emotional job

The end of the experience should feel like:

* a controlled release of tension
* a final clean surface after the heavier project stops
* an invitation to continue, not a desperate CTA wall

The user should leave feeling:

* they saw something coherent
* they know what kind of builder I am
* they know where to go if they want more

---

## How contact should appear

Not as:

* giant social icon soup
* a generic “let’s connect!”
* a contact form dropped into a cinematic experience for no reason

I want contact to feel like the **last practical surface** in the route.

Clean.
Useful.
No begging.

Possible content:

* direct email
* GitHub
* LinkedIn
* maybe one short closing line

That’s enough.

---

## What should happen right before contact

There should be a slight decompression stretch before the contact layer.

Not a full dead zone — just enough room so contact doesn’t feel like:

> “and now, after all that, here are four social icons.”

The route should gently release from the final proof phase into the contact phase.

---

# 3. Exact Content Mapping

This is the simplest answer to “where does each content domain actually land?”

## `profile.ts`

**Phase 1–2**

* tiny identity marker in Arrival
* main profile beats in Identity

### Specifically

* name: Arrival + Identity
* title: Arrival + Identity
* intro copy: Identity
* bio/about fragments: Identity

---

## `skills.ts`

**Phase 3**

* capability framing between profile and projects

### Specifically

* language / systems cluster
* frameworks / interaction / app cluster
* tools / platform cluster

---

## `projects.ts`

**Phase 4–5**

* main project run
* possibly final deep project / final proof

### Specifically

* flagship projects: Phase 4
* supporting projects: Phase 4
* deep technical breakdown / strongest case study: Phase 5 if needed

---

## `links.ts`

**Phase 6**

* final contact / exit layer

### Specifically

* GitHub
* LinkedIn
* email
* other actual external endpoints if worth keeping

---

# 4. Timeline at a Glance

This is the compact version.

## Phase 1 — Arrival

**World job:** establish scale, weight, and tone
**Content:** name + title only, maybe one short line

## Phase 2 — Identity

**World job:** carry the user deeper while the experience introduces me
**Content:** profile / bio / build philosophy / working identity

## Phase 3 — Capability

**World job:** become slightly more structured and legible
**Content:** skills / technical capability clusters

## Phase 4 — Project Run

**World job:** deliver the main stops and major reveals
**Content:** flagship projects + curated supporting work

## Phase 5 — Deep Project / Final Proof

**World job:** provide one last heavy anchor before release
**Content:** strongest project deeper dive or final engineering proof point

## Phase 6 — Exit / Contact

**World job:** decompress and give the user a clean exit
**Content:** links / email / next step surfaces

---

# 5. What This Timeline Explicitly Rejects

## 5.1 The generic section stack

Not doing:

* Hero
* About
* Skills
* Projects
* Contact

as five clean page slices with a fancy canvas behind them.

That is exactly what this project is trying not to be.

---

## 5.2 The “world first, content whenever” failure mode

I’m also not doing the opposite failure mode:

* world is amazing
* content has no structure
* projects are hard to find
* recruiter leaves impressed but unconvinced

The experience still has to sell me properly.
The world is not allowed to sabotage that.

---

## 5.3 Equal dramatic weight for every content block

Not every content type deserves the same amount of screen time.

Rough priority:

1. Projects
2. Identity / profile
3. Skills
4. Contact

Projects are the center of gravity.
Everything else exists to support them.

---

# 6. First-Ship Sequence Rules

For the first shippable version, I want to keep the sequence disciplined.

## First ship must include

* Arrival
* Identity
* Capability
* At least 2 meaningful project stops
* Contact

## First ship does **not** need

* 9 cinematic reveals
* 40 micro-transitions
* every possible project
* a perfect final proof chamber
* some huge lore layer explaining the world

The first ship only needs one thing:
**prove that the route structure works and that content actually lands in the right order.**

If the sequence works, the world can get richer later.
If the sequence doesn’t work, no amount of rendering polish will save it.

---

# 7. Final Rule

If I ever get lost while building, I come back to this:

## The experience must answer these questions in order:

1. **What is this place?**
2. **Who built it?**
3. **What kind of builder are they?**
4. **What can they actually do?**
5. **What have they built that proves it?**
6. **Where do I go if I want more?**

If a timeline decision breaks that order, it’s probably wrong.
If a content block appears before the user is ready to care about it, it’s probably misplaced.
If the world keeps interrupting the proof, it’s failing its job.

The route is there to make the work hit harder.
The work is there to justify the route.
If both of those stay true, the experience stays honest.
