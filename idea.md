# Cinematic Transition – Design Notes

## Context

This document captures the current ideas for the cinematic transition between the **Simplified** and **Cinematic** resume modes.

- Tech stack: React, Framer Motion, Lenis.
- Anime.js was briefly explored but removed; we’re standardizing on Framer Motion for animations and Lenis for smooth scrolling.

## High-Level Concept

Two primary modes:

1. **Simplified Mode** – fast, recruiter-friendly, minimal animation, shown in a **tablet mockup**.
2. **Cinematic Mode** – immersive, animation-heavy experience shown on a **laptop**.

The key UX element is a **mode toggle** that triggers a choreographed, cinematic transition sequence:

- Tablet closes.
- Camera pans/rotates toward a laptop.
- Laptop opens.
- Laptop screen grows to fill the viewport.
- Cinematic resume takes over.

The reverse sequence plays when going from Cinematic → Simplified.

## Architectural Approach

We model this with three conceptual layers:

1. **Content Layer**
   - `SimplifiedResume` – minimal, fast-reading layout.
   - `CinematicResume` – animated, scroll-driven experience.

2. **Device Scene Layer** (transition “stage”)
   - Contains visual representations of the **tablet** and **laptop**.
   - Handles camera-like movement via Framer Motion transforms.
   - Likely implemented as a fixed, full-viewport overlay.

3. **Mode / Transition State Machine**
   - Top-level mode values (example):
     - `"simplified"`
     - `"transitioning-to-cinematic"`
     - `"cinematic"`
     - `"transitioning-to-simplified"`
   - The toggle drives state changes; state drives which sequences/variants play and which content is mounted.

## Transition Sequence (Simplified → Cinematic)

1. **Tablet Close**
   - Triggered by the mode toggle.
   - Tablet card animation ideas:
     - Small `scale` bump and `rotateX` to feel like a physical close/tilt.
     - Optional dark overlay fade to simulate the tablet screen turning off.
   - Duration: ~0.4–0.6s, ease-out.

2. **Camera Pan to Laptop**
   - Animate a shared **camera container** (a `motion.div` that wraps both tablet and laptop):
     - Translate `x`/`y` so the laptop moves into center frame.
     - Slight `rotateY` for a swivel effect.
   - Tablet remains visible but moves out of focus or off to the side.
   - Duration: ~0.8–1.2s, ease-in-out.

3. **Laptop Opening**
   - Laptop lid animation (2D/2.5D illusion using transforms):
     - `rotateX` from ~90° (closed) to 0° (open).
   - Screen brightness overlay fades in to simulate turning on.
   - Duration: ~0.6–0.8s.

4. **Laptop Fills Viewport & Handover to Cinematic Resume**
   - Camera container scales and translates so the laptop screen fills (or slightly overfills) the viewport.
   - Around 60–70% through this zoom-in:
     - Start fading in `CinematicResume` inside/behind the laptop screen area.
   - At the end of this step:
     - Set mode to `"cinematic"`.
     - Hide/unmount the device scene overlay.
     - Enable full cinematic scrolling with Lenis.

## Reverse Sequence (Cinematic → Simplified)

The reverse flow mirrors the forward animation to maintain narrative consistency:

1. Zoom/camera pull-back from laptop screen.
2. Laptop closes.
3. Camera pans/rotates back toward tablet.
4. Tablet “turns on” and fills focus.
5. Return to `"simplified"` mode, with `SimplifiedResume` visible.

## Role of Lenis

- During the **transition** itself:
  - Scroll is effectively locked; the transition is a **time-based Framer Motion sequence**, not scroll-driven.
- In **Cinematic Mode**:
  - Lenis manages smooth scrolling between sections.
  - Subtle “camera moves” (e.g., parallax, section reveals) can be driven by scroll + Framer Motion.

## Accessibility and Reduced Motion

- Respect `prefers-reduced-motion`:
  - If reduced motion is requested, skip the long cinematic sequence.
  - Instead, use a simple fade or quick crossfade between Simplified and Cinematic modes.
- Keep the total transition duration in a reasonable range (~2–3 seconds) to avoid feeling sluggish.

## Next Steps

1. Define concrete React components for this structure (proposed):
   - `ModeManager` (or similar) – owns the mode state machine.
   - `TransitionScene` – fixed overlay with tablet + laptop + camera container.
   - `Tablet` / `Laptop` – presentational components.
   - `ToggleSwitch` – triggers transitions.
2. Design Framer Motion variants/timelines for each step.
3. Integrate with existing `SimplifiedResume` and planned `CinematicResume`.
4. Add reduced-motion handling and scroll locking/unlocking around the transition.
