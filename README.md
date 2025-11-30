# Cinematic Resume Website - "The Animus Project"

## Overview

The Cinematic Resume Website is a dual-mode interactive portfolio designed to present your professional profile in two distinct experiences, bridged by a "Synchronization" mechanic inspired by the *Assassin's Creed* Animus.

### 1. Simplified Version (The Reality)
*   **Tech**: React, Tailwind CSS.
*   **Vibe**: Clean, fast, accessible.
*   **Purpose**: Optimized for recruiters and quick scanning.
*   **Interaction**: Standard vertical scrolling.

### 2. Cinematic Version (The Simulation)
*   **Tech**: **React Three Fiber (R3F)**, Drei, Framer Motion.
*   **Vibe**: **"Animus Simulation / Renaissance"**. A living 3D world.
*   **Purpose**: Immersive storytelling and "video game" feel.
*   **Interaction**: 3D camera movement, "White Room" / "Dark Room" themes.

---

## The Transition: "The Animus Bleed"

We replaced the traditional "Toggle Button" with an organic, scroll-driven experience.

1.  **Scroll to Synchronize**: As the user scrolls to the bottom of the Simplified Resume, they enter the **Transition Zone**.
2.  **The Bleed**: A **Drop of Memory Ink** appears and spreads organically across the screen (like ink on parchment).
3.  **The Handover**: The ink "soaks" into the 2D content, blurring and dissolving it. The 3D world reveals itself *inside* the spreading ink blot.
4.  **Entry**: Once fully saturated, the user is transported into the **Animus Simulation**.

---

## Technical Architecture

### Core Stack
*   **React**: UI Framework.
*   **Vite**: Build tool.
*   **Tailwind CSS**: Styling.

### Cinematic Stack
*   **React Three Fiber (R3F)**: 3D Rendering Engine (WebGL).
*   **@react-three/drei**: 3D Helpers and abstractions.
*   **Framer Motion**: 2D animations and layout transitions.
*   **Lenis**: Smooth scrolling for the 2D experience.

### Directory Structure
*   `src/components/Simplified/`: The 2D Resume components.
*   `src/components/Cinematic/`: The R3F 3D World components.
*   `src/components/Transition/`: The "ScrollTransitionZone" and Animus effects.
*   `src/context/CinematicModeContext.jsx`: Manages the state between "Simplified" and "Cinematic".

---

## Development

### Prerequisites
*   Node.js (v18+)

### Setup
```bash
npm install
npm run dev
```

### Key Commands
*   `npm run dev`: Start local development server.
*   `npm run build`: Build for production.

---

## Design Philosophy
*   **"Keep it Real"**: The transition should feel alive and organic (ink bleeding), not mechanical.
*   **"Video Game Website"**: The Cinematic mode is a world to explore, not just 3D slides.
*   **Performance**: Heavy 3D assets are loaded only when the transition begins.
