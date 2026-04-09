# 🏛 Project MyResume: The Living Ecosystem Guidelines

## 1. Core Philosophy: "Circadian Technology"
The website is a digital organism that follows a natural day/night cycle. It bridges the gap between high-performance systems (Arch Linux/Cybersec) and the fluid physics of nature (Sunlight/Drift/Breath).
* **Light Mode is "The Day":** High-key, warm, high-contrast, representing clarity and productivity.
* **Dark Mode is "The Night":** Low-key, bioluminescent, cool-toned, representing deep-focus and system internals.
* **Stateful Presence:** The site must feel "awake" when the user is active and "idle" (breathing) when the user is still.

---

## 2. Visual Language & Atmospheric Theming

### **Color Architecture (OKLCH Space)**
| Layer | Day Mode (Solar) | Night Mode (Lunar) |
| :--- | :--- | :--- |
| **Base Canvas** | `oklch(96% 0.01 90)` (Warm Paper) | `oklch(15% 0.02 260)` (Deep Obsidian) |
| **Primary Text** | `oklch(25% 0.02 90)` (Soft Ink) | `oklch(90% 0.01 260)` (Mist White) |
| **Accent 1** | `oklch(70% 0.15 100)` (Solar Yellow) | `oklch(80% 0.1 200)` (Moonlight Cyan) |
| **Muted Slate** | `oklch(55% 0.08 240)` (Stone) | `oklch(70% 0.05 265)` (Silver) |

### **Environmental Lighting**
* **Day:** Components cast long, soft, diffused shadows (`box-shadow`) as if illuminated by a single top-right light source.
* **Night:** Components emit a subtle "Bioluminescent" outer glow rather than casting shadows.

---

## 3. Motion & Organic Physics (Framer Motion)

### **The "Magnetic" Mass Principle**
Interactive elements (Photo frames, Cards) must have physical weight and inertia.
* **Spring Configuration:** `stiffness: 150`, `damping: 20`, `mass: 1`.
* **3D Tracking:** The Profile Photo Frame must track the cursor in 3D space (`rotateX`, `rotateY`), leaning toward the user's presence.

### **Biometric Transitions**
* **The "Breath" Loop:** The main Hero container must have a non-linear sine-wave floating animation (`y: [-8, 8]`) with a 6-second duration to mimic respiration.
* **Organized Chaos:** Use `Math.random()` to vary stagger delays for list items, mimicking the imperfect entry of falling leaves rather than a robotic sequence.

---

## 4. Interaction Architecture

### **The "Mobile" Device Engine**
* **Detailing:** Deep-dives into projects occur inside a physical **Device Mockup**.
* **Shared Layout:** Use `layoutId` to morph a project card into the device screen. The transition should feel like a camera zooming in, not a simple page load.
* **Tactile Feedback:** The mockup should support swipe gestures and haptic-style visual feedback.

### **Automated Telemetry**
* **The "Pulse":** Stats (Repos, Followers) **must** be live-fetched from the GitHub API. 
* **Visual Logic:** If a fetch is active, show a terminal-style "PING" indicator. On success, animate numbers using a `CountUp` with `easeOutExpo`.

---

## 5. Technical Rigor for LLMs

* **Modular Architecture:** Each major UI section (Hero, Projects, Skills) must be a standalone React component.
* **Code Style:** * **Tabs only** for indentation (System-level preference).
    * **Tailwind CSS** for layout; **Framer Motion** for state-driven animation.
* **Performance:** * Use GPU-accelerated properties (`opacity`, `transform`, `filter`) for all "Alive" effects.
    * Implement strict cleanup for any `requestAnimationFrame` or `setInterval` observers to prevent memory leaks on your Arch environment.

---

## 6. Narrative Persona (The Technologist)
* **Tone:** Expert but playful. Acknowledge the "ADHD of interests" as a superpower of broad-spectrum architecture.
* **Keywords:** Polyglot Orchestration, Interop Bridges, Kernel-level dev, Drifting Physics, System Hardening.

---

> **LLM Execution Directive:** Reference this file for all UI generation. If the current implementation feels "static" or "robotic," it violates Section 3. If the colors are hard-coded hex instead of OKLCH logic, it violates Section 2.
