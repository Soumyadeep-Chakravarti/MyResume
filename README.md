# 🎮 The Animus Project – Interactive Resume Experience

## 🌟 Overview

An innovative dual-mode portfolio website that transforms your professional resume into an immersive 3D experience. Inspired by the *Assassin's Creed* Animus, this project bridges reality and simulation through organic transitions and cutting-edge web technologies.

---

## 🎭 Two Worlds, One Journey

### 📱 Simplified Mode – "The Reality"
- **Tech Stack**: React, Tailwind CSS, Framer Motion
- **Design**: Clean, minimal, professional
- **Purpose**: Fast-loading, accessible resume for recruiters
- **Interaction**: Standard vertical scrolling with smooth animations
- **Performance**: Optimized for quick scanning and mobile devices

### 🏛️ Cinematic Mode – "The Animus Simulation"
- **Tech Stack**: React Three Fiber (R3F), Drei, GLSL Shaders
- **Design**: **"Renaissance Ruins in Digital Void"**
  - **Light Mode**: "The White Room" – Infinite white void with geometric data fog
  - **Dark Mode**: "The Dark Room" – Deep black void with neon blue/red data streams
- **Purpose**: Immersive storytelling through a 3D "video game website"
- **Interaction**: Scroll-driven camera movement along a fixed rail through ancient ruins
- **Aesthetic**: Realistic stone architecture (Florence/Venice style) being "simulated" by the Animus

---

## 🌊 The Transition: "The Animus Bleed"

The magic happens in the transition – a scroll-driven, organic experience that feels alive:

1. **Scroll to Synchronize**: As you reach the bottom of the Simplified Resume, you enter the **Transition Zone**
2. **The Drop**: A **Memory Ink droplet** appears at the center of the screen
3. **The Spread**: The ink expands organically (like watercolor on parchment) as you continue scrolling
4. **The Bleed**: The ink "soaks" into the 2D content, blurring and dissolving text and elements
5. **The Reveal**: The 3D world emerges *inside* the spreading ink blot
6. **Full Synchronization**: Once the ink saturates the screen, you're transported into the Animus Simulation

**Key UX Principle**: No buttons. No clicks. Just scroll. The transition is driven entirely by your scroll momentum.

---

## 🏗️ Technical Architecture

### Core Technologies
- **React 18** – UI framework with concurrent features
- **Vite** – Lightning-fast build tool and dev server
- **Tailwind CSS** – Utility-first styling system
- **Framer Motion** – Declarative animations and layout transitions
- **Lenis** – Smooth scroll library for buttery-smooth scrolling

### 3D Rendering Stack
- **React Three Fiber (R3F)** – React renderer for Three.js
- **@react-three/drei** – Useful helpers and abstractions for R3F
- **@react-three/rapier** – Physics engine for 3D interactions (optional)
- **Three.js** – WebGL 3D graphics library

### Project Structure
```
src/
├── components/
│   ├── Simplified/          # 2D Resume components
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   └── Contact.jsx
│   ├── Cinematic/           # 3D World components (R3F)
│   │   ├── CameraContainer.jsx
│   │   ├── SceneGate.jsx    # Hero section
│   │   ├── SceneArchive.jsx # About section
│   │   ├── SceneObelisks.jsx # Skills section
│   │   ├── ScenePlaza.jsx   # Projects section
│   │   └── SceneBeacon.jsx  # Contact section
│   └── Transition/          # Animus Bleed effects
│       ├── ScrollTransitionZone.jsx
│       └── InkBlotOverlay.jsx
├── context/
│   └── CinematicModeContext.jsx  # Mode state management
├── hooks/
│   ├── useSmoothScroll.js        # Lenis integration
│   └── useMouseTilt.js           # Camera tilt effect
└── MainContent.jsx               # Root layout orchestrator
```

---

## 🎨 Design Philosophy

### "Keep it Real"
The transition should feel **organic and alive**, not mechanical. The ink bleed mimics real watercolor spreading on parchment – erratic, unpredictable, beautiful.

### "Video Game Website"
The Cinematic mode is not just "3D slides" – it's a **world to explore**. You move through ancient ruins, with depth, parallax, and interactive elements that respond to your mouse.

### "Rail-Based Exploration"
Scroll controls forward/backward movement along a fixed path (the "rail"). Mouse movement adds subtle camera tilt and brings interactive elements into focus – like a handheld camera or drone.

### "Performance First"
- Heavy 3D assets are **lazy-loaded** only when the transition begins
- GPU-friendly transforms only (`translate`, `scale`, `rotate`, `opacity`)
- Instanced meshes for repeating architectural elements
- Respects `prefers-reduced-motion` for accessibility

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18 or higher
- **npm** or **yarn**

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd MyResume

# Install dependencies
npm install
```

### Development
```bash
# Start the development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Build for Production
```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

---

## 🗺️ Cinematic World Map

The 3D world is structured as a linear journey through five distinct scenes:

| Section | Scene Name | Metaphor | Visual Elements |
|---------|-----------|----------|-----------------|
| **Hero** | The Gate | Entrance Plaza | Name appears as glowing glyphs. Camera moves through a massive archway. |
| **About** | The Archive Hall | Corridor of Ruins | Bio appears on a rising "Stone Tablet" with dust particles. |
| **Skills** | The Obelisks | Tech Sigils | Obelisks light up from base to top. Hover = focus + glow. |
| **Projects** | The Plaza | Ruined Central Square | Projects appear as "Relics" on rising pedestals. Cards tilt toward camera. |
| **Contact** | The Beacon | Tower Ascent | Final ascent toward a glowing beacon. Contact form shines as transmitted signal. |

---

## 🎯 Current Status

### ✅ Completed
- Simplified Resume with all sections
- Basic Cinematic Mode structure with R3F
- Scroll-driven transition zone
- Animus Bleed ink effect with organic expansion
- Theme-aware ink color (white/black based on mode)
- Context-based mode switching

### 🚧 In Progress
- Refining ink blot organic distortion
- Building individual cinematic scenes (Obelisks, Plaza, etc.)
- Camera tilt and mouse interaction
- 3D asset creation and optimization

### 📋 Planned
- Physics-based interactions
- Sound design and ambient audio
- Advanced particle effects
- Mobile-optimized 3D experience

---

## 🎨 Theming

### Light Mode – "The White Room"
- Infinite white void background
- Geometric data fog (subtle wireframes)
- Black ink bleed transition
- Clean, clinical Animus aesthetic

### Dark Mode – "The Dark Room"
- Deep black void background
- Neon blue/red data streams
- White ink bleed transition
- Cyberpunk Animus aesthetic

---

## ♿ Accessibility

- **Reduced Motion**: Respects `prefers-reduced-motion` media query
  - Disables camera tilt
  - Simplifies scroll animations
  - Replaces particle effects with basic fades
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Readers**: Semantic HTML and ARIA labels throughout
- **Color Contrast**: WCAG AA compliant color combinations

---

## 📄 License

This project is a personal portfolio. Feel free to use the code as inspiration, but please don't copy the content directly.

---

## 🙏 Acknowledgments

- Inspired by the *Assassin's Creed* series and the Animus concept
- Built with amazing open-source tools from the React and Three.js communities
- Special thanks to the R3F team for making 3D on the web accessible

---

**Ready to synchronize?** Scroll down and let the Animus Bleed begin. 🌊
