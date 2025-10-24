# Presently under construction

## Cinematic Resume Website - Full Documentation

### Overview

The Cinematic Resume Website is a dual-mode interactive portfolio designed to present your professional profile in two distinct experiences:

1. **Simplified Version**

   * Optimized for **fast viewing** and **quick reading**.
   * Minimal animations for **recruiter-focused scanning**.
   * Displayed within a **tablet mockup** on the website.
   * Focused on **clarity, speed, and readability**.

2. **Cinematic Version**

   * Full **movie-like, immersive experience**.
   * Includes **dynamic animations, interactive section transitions**, and camera-like movements.

Both versions are **optimized and managed for viewing on both mobile and desktop environments**. Users can seamlessly **switch between the two modes** using an **animated toggle**.

---

### Transition Sequence

The transition from the Simplified Version to the Cinematic Version is carefully choreographed to create a cinematic storytelling effect.

1. **Toggle Activation (Simplified → Cinematic)**

   * User clicks/taps the animated toggle.
   * Tablet mockup **closes smoothly**.

2. **Camera Movement**

   * Camera **swivels** from the tablet to a laptop on the scene.
   * Smooth pan and rotation simulate a cinematic camera movement.

3. **Laptop Opening**

   * Laptop lid **opens gradually**.
   * Camera **moves forward** toward the laptop screen.
   * Laptop screen expands until it **fills the full website viewport**.

4. **Cinematic Resume Launch**

   * The cinematic resume animations begin once the laptop screen fills the view.
   * Features include:

     * **Dynamic section transitions** (About, Skills, Projects, Contact)
     * **Interactive effects** (hover, clicks, or scroll-based animations)
     * **Camera-like panning and zooming** across sections

**Note:** Transition from **Cinematic → Simplified** is the **reverse** of the above sequence:

* Camera moves back from the laptop.
* Laptop closes.
* Camera turns toward the tablet.
* Tablet turns on.
* Camera zooms in to fill the screen with the tablet view.

---

### Visual Metaphor

* **Tablet / Simplified Mode**: Fast reading, recruiter-focused.
* **Laptop / Cinematic Mode**: Immersive cinematic experience with storytelling animations.
* **Camera Motion**: Bridges the gap between simplified and cinematic depth.

---

### Components Structure

* `components/SimplifiedResume.jsx` → Simplified version.
* `components/CinematicResume.jsx` → Cinematic version.
* `components/ToggleSwitch.jsx` → Handles mode switching and triggers animations.

#### Component Responsibilities

* **SimplifiedResume**:

  * Render the tablet mockup.
  * Show minimal, readable sections.
  * Ensure **fast loading** and **readable layout**.

* **CinematicResume**:

  * Render sections with cinematic transitions.
  * Control camera movement, zoom, and section animation timing.
  * Maintain **responsive and interactive behavior**.

* **ToggleSwitch**:

  * Animates the mode switch.
  * Handles **state management** between Simplified and Cinematic modes.
  * Triggers camera and scene transition animations.

---

### Implementation Notes

* Use **Framer Motion** or **Three.js** for smooth animations.
* Ensure **performance optimization** during transitions and heavy animations.
* Make both modes **fully responsive** across devices.
* Consider **lazy-loading cinematic assets** to reduce initial load time.
* Maintain accessibility: Simplified version ensures screen readers and keyboard navigation work properly.
* Reverse animations for **Cinematic → Simplified** must mirror the forward transition exactly for consistency.

---

### User Flow

1. User lands on the website, sees the **Simplified Resume** inside a tablet mockup.
2. User toggles the switch:

   * Tablet closes.
   * Camera pans to laptop.
   * Laptop opens.
   * Cinematic Resume begins.
3. User interacts with Cinematic Resume:

   * Scrolls through sections.
   * Experiences smooth transitions and dynamic animations.
4. User can toggle back to **Simplified Mode**:

   * Camera moves back from laptop.
   * Laptop closes.
   * Camera turns toward tablet.
   * Tablet turns on.
   * Camera zooms in to tablet view.

---

### Future Enhancements

* Add **sound effects** or subtle background music for cinematic immersion.
* Incorporate **3D interactions** for laptop and tablet models.
* Track **user engagement** with each section to refine experience.
* Add **theming options**: light, dark, and cinematic themes.
* Expand **mobile cinematic adaptation** for tablets and larger devices.

---

### Conclusion

The Cinematic Resume Website combines **functionality and storytelling**:

* **Simplified Version**: for fast reading and recruiter access.
* **Cinematic Version**: for an immersive, memorable showcase of your skills and experience.

By seamlessly transitioning between these modes, it provides an **innovative and engaging resume experience** that works well across **tablet, mobile, and desktop environments**.

