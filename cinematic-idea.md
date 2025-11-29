# 🎬 Cinematic Mode – Lost City Blueprint

## 🏛 Core Goal & Vibe
 
 Design the **Cinematic version** as a **Video Game Website**.
 - **NOT a 3D PowerPoint**: It should not feel like sliding through static screens in 3D space.
 - **Immersive World**: The user explores a living environment.
 - **Seamless Entry**: The experience begins naturally from the scroll transition of the simple site.

---

## 🧭 Architectural & Movement Principles

### 1. The Rail System (Scroll = Movement)

**Concept:**  
The scroll action (powered by **Lenis**) is remapped to simulate **moving a camera** (or player) forward and backward along a fixed, linear path — the "rail."

**Mechanism:**  
Use `Framer Motion`’s `useScroll` to map the **vertical scroll position** to a global `progress` value.  
This `progress` controls:
- `translateZ` (depth)
- `scale`
- `opacity` of scenes ahead and behind the viewer.

**Result:**  
Scenes ahead appear **small and distant**, the current scene is **large and focused**, and past scenes **fade** into the environment — creating a strong **2.5D depth illusion**.

---

### 2. Camera Focus (Mouse = Tilt & Interaction)

**Concept:**  
Mouse movement enhances immersion without breaking the "rail" constraint.

**Global Tilt:**  
Track mouse position across the viewport and apply subtle `rotateX` / `rotateY` transforms to the **Camera Container**, simulating a handheld camera or drone movement.

**Local Focus:**  
Interactive elements (e.g., Project Pedestals, Skill Obelisks):
- Scale up slightly
- Increase brightness/glow
- Lift vertically  
when hovered — bringing them **into focus**.

---

### 3. Scene Stack and Layers

The app is composed of **full-viewport scene components** wrapped in a single, fixed `CameraContainer`.

**Structure:**
CameraContainer (Fixed Overlay)
├── SceneGate (Hero)
├── SceneArchive (About)
├── SceneObelisks (Skills)
├── ScenePlaza (Projects)
└── SceneBeacon (Contact)

**Layering (2.5D):**
Each scene includes:
- Background elements
- Main content
- Foreground debris  
Each with **different parallax speeds** to enhance perceived depth.

---

## 🗺 Cinematic Scenes: The Lost City Map

| Section | Scene Metaphor | Visual Elements & Motion Concept |
|----------|----------------|----------------------------------|
| **Hero** | The Gate / Entrance Plaza | Name appears as glowing glyphs. Camera moves through a massive archway using scale/translate to begin the journey. |
| **About** | The Archive Hall | A corridor of ruined columns. Bio appears on a “Stone Tablet” that rises slowly with dust/particle fade-in. |
| **Skills** | Tech Sigils / Obelisks | Obelisks light up from base to top as camera approaches. Hover = focus + glow. |
| **Projects** | The Central Ruined Plaza | Each project appears as a “Relic” on rising pedestals. Active cards tilt subtly toward the camera. |
| **Contact** | The Beacon / Tower | Final ascent toward a glowing beacon. Contact form and links shine as the “signal” being transmitted. |

---

## ⚙️ Animation & Performance Principles (Mandatory)

**1. GPU-Friendly Transforms Only**
- Limit continuous animations to: `translate`, `scale`, `rotate`, and `opacity`.
- Avoid expensive properties (`box-shadow`, `filter: blur`) across multiple elements.

**2. Modest Ambient Detail**
- Use slow, low-density keyframes for effects like **dust, wind, or particles**.
- Keep CPU/GPU overhead minimal.

**3. Springs & Throttling**
- Use `useSpring` and damping for all tilt/focus motions.
- Ensures smooth transitions and avoids jitter.

**4. Controlled Timing**
- Favor long easings (`easeInOut`, slow spring) for **cinematic pacing**.
- Avoid fast or snappy transitions.

**5. Accessibility (Reduced Motion)**
- Implement `prefers-reduced-motion`.
- If active:  
  - Disable camera tilt  
  - Simplify scroll animations  
  - Replace particle/focus animations with basic opacity + translation fades.

**6. 3D / WebGL Core (React Three Fiber)**
- **Adopting R3F**: To achieve the desired "video game" rendering and true depth, we will use React Three Fiber.
- **Aesthetic**: "Pixel Art / Voxel" style (e.g., Octopath Traveler, Minecraft) or Low-Poly. This allows for true 3D depth without requiring AAA-level asset production.
- **Performance**: Use instanced meshes for repeating voxel elements to keep draw calls low.

---

## 🧩 Implementation Roadmap (V1 Focus: Skills)

1. **Develop `CameraContainer`**
   - Fixed overlay  
   - Mouse tracking logic for global tilt

2. **Develop `SceneObelisks` (Skills)**
   - First complex scene  
   - Prove "rail movement" + "mouse focus" mechanics integration

3. **Build Cinematic Transition**
   - Integrate scene stack into transition flow  
   - Entry from the **Laptop screen → Lost City experience**

---

> ⚡ *Goal:* Deliver a visually rich, smooth, cinematic scrolling experience that merges storytelling, motion design, and interactivity — all within pure DOM & CSS3D.
