# 🎬 Transition Design – The Animus Bleed

## 🎯 Core Concept

This document defines the **scroll-driven transition** between the Simplified Resume and the Cinematic 3D World. The transition is called **"The Animus Bleed"** – an organic, ink-spreading effect that feels alive and unpredictable.

---

## 🌊 The Animus Bleed Experience

### User Flow
1. **Simplified Mode**: User scrolls through the standard 2D resume
2. **Transition Zone**: User reaches the bottom and continues scrolling
3. **The Drop**: A small ink droplet appears at the center of the screen
4. **The Spread**: As scrolling continues, the ink expands organically (like watercolor on parchment)
5. **The Soak**: The ink "bleeds" into the 2D content, blurring and dissolving it
6. **The Reveal**: The 3D world becomes visible *inside* the spreading ink
7. **Full Synchronization**: Once the ink covers the entire viewport, the user is in Cinematic Mode

### Key UX Principles
- **No Buttons**: The entire transition is scroll-driven. No clicks required.
- **Organic Motion**: The ink expansion is erratic and blob-like, not a perfect circle
- **Reversible**: Users can scroll back up to return to Simplified Mode
- **Theme-Aware**: Ink color adapts to the current theme
  - **Light Mode**: Black ink on white background
  - **Dark Mode**: White ink on black background

---

## 🏗️ Technical Architecture

### State Management

We use a **React Context** (`CinematicModeContext`) to manage the transition state:

```javascript
{
  mode: 'simplified' | 'transitioning' | 'cinematic',
  transitionProgress: 0.0 - 1.0,  // Scroll progress through transition zone
  theme: 'light' | 'dark'
}
```

### Component Hierarchy

```
App
├── CinematicModeProvider (Context)
└── MainContent
    ├── SimplifiedResume (visible when mode !== 'cinematic')
    ├── ScrollTransitionZone (visible when near bottom)
    │   └── InkBlotOverlay (renders the expanding ink)
    └── CinematicWorld (R3F Canvas, visible when mode === 'cinematic')
```

---

## 🎨 Visual Implementation

### The Ink Blot

The ink effect is achieved using:
1. **Fixed Overlay**: A `position: fixed` div that covers the entire viewport
2. **Radial Gradient**: Creates the ink blob shape
3. **SVG Filter**: Applies organic distortion to the edges
4. **Transform Scale**: Expands from `scale(0)` to `scale(2.5)` based on scroll progress

### SVG Turbulence Filter

```svg
<svg style="position: absolute; width: 0; height: 0;">
  <defs>
    <filter id="ink-distortion">
      <feTurbulence 
        type="fractalNoise" 
        baseFrequency="0.02" 
        numOctaves="3" 
        seed="2" 
      />
      <feDisplacementMap 
        in="SourceGraphic" 
        scale="80" 
      />
    </filter>
  </defs>
</svg>
```

This creates the organic, watercolor-like edges.

---

## 📊 Scroll Progress Mapping

The transition is divided into phases based on scroll progress:

| Progress | Phase | Visual State |
|----------|-------|--------------|
| 0% - 20% | **Idle** | Ink droplet appears (small, scale ~0.1) |
| 20% - 60% | **Expansion** | Ink blob grows erratically |
| 60% - 80% | **Saturation** | Ink covers most of the screen, 2D content blurs |
| 80% - 95% | **Reveal** | 3D world becomes visible inside the ink |
| 95% - 100% | **Full Sync** | Ink fades out, 3D world is fully interactive |

### Scroll Detection

We use **Framer Motion's `useScroll`** to track scroll position:

```javascript
const { scrollYProgress } = useScroll({
  target: transitionRef,
  offset: ["start end", "end start"]
});

// Map to 0-1 range for transition progress
const transitionProgress = useTransform(
  scrollYProgress,
  [0, 1],
  [0, 1]
);
```

---

## 🎭 Mode Transitions

### Simplified → Cinematic

1. **Trigger**: User scrolls past a threshold (e.g., 95% progress)
2. **Actions**:
   - Set `mode` to `'cinematic'`
   - Mount the R3F Canvas (lazy-loaded)
   - Disable Lenis smooth scroll on Simplified Resume
   - Enable Lenis on Cinematic World
   - Fade out the ink overlay
3. **Duration**: ~500ms fade-out

### Cinematic → Simplified

1. **Trigger**: User scrolls back up past a threshold (e.g., 20% progress)
2. **Actions**:
   - Set `mode` to `'simplified'`
   - Unmount the R3F Canvas (performance)
   - Re-enable Lenis on Simplified Resume
   - Fade in the 2D content
3. **Duration**: ~500ms fade-in

---

## 🎬 Animation Details

### Ink Expansion Easing

The ink doesn't expand linearly – it uses a **custom easing curve** to feel more organic:

```javascript
const inkScale = useTransform(
  transitionProgress,
  [0, 0.2, 0.6, 0.95],
  [0, 0.3, 1.5, 2.5],
  {
    ease: [0.16, 1, 0.3, 1] // Custom cubic-bezier
  }
);
```

### Blur Effect on 2D Content

As the ink spreads, the Simplified Resume content blurs:

```javascript
const blurAmount = useTransform(
  transitionProgress,
  [0.4, 0.8],
  [0, 10]
);

// Applied as: filter: blur(${blurAmount}px)
```

### 3D World Fade-In

The 3D world fades in as the ink reaches full coverage:

```javascript
const worldOpacity = useTransform(
  transitionProgress,
  [0.7, 0.95],
  [0, 1]
);
```

---

## ⚡ Performance Considerations

### Lazy Loading

The R3F Canvas and all 3D assets are **code-split** and only loaded when the user enters the transition zone:

```javascript
const CinematicWorld = lazy(() => import('./components/Cinematic/CinematicWorld'));
```

### GPU Acceleration

All animations use GPU-accelerated properties:
- `transform` (translate, scale, rotate)
- `opacity`
- `filter` (applied sparingly)

### Reduced Motion

Respects `prefers-reduced-motion`:
```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  // Skip ink animation, use simple crossfade
  // Disable camera tilt in 3D world
}
```

---

## 🎨 Theme Integration

### Light Mode – "The White Room"
- **Background**: Pure white (`#FFFFFF`)
- **Ink Color**: Deep black (`#000000`)
- **Data Fog**: Light gray wireframes
- **Aesthetic**: Clean, clinical, Apple-like

### Dark Mode – "The Dark Room"
- **Background**: Deep black (`#0A0A0A`)
- **Ink Color**: Pure white (`#FFFFFF`)
- **Data Streams**: Neon blue (`#00D9FF`) and red (`#FF006E`)
- **Aesthetic**: Cyberpunk, Matrix-like

---

## 🧪 Testing Checklist

### Visual Tests
- [ ] Ink appears at correct scroll position
- [ ] Ink expands smoothly with scroll
- [ ] Organic edges are visible (not a perfect circle)
- [ ] Ink color matches theme
- [ ] 2D content blurs as ink spreads
- [ ] 3D world is visible inside the ink
- [ ] Transition completes at 100% scroll

### Interaction Tests
- [ ] Scrolling up reverses the transition
- [ ] Mode switches at correct thresholds
- [ ] No jank or stuttering during scroll
- [ ] Works on mobile (touch scroll)
- [ ] Reduced motion fallback works

### Performance Tests
- [ ] 3D assets load only when needed
- [ ] No memory leaks when switching modes
- [ ] Smooth 60fps during transition
- [ ] GPU usage is reasonable

---

## 🚀 Future Enhancements

### Potential Improvements
- **Sound Design**: Subtle "ink drip" sound effect
- **Particle System**: Tiny ink droplets around the main blob
- **Distortion Shader**: Custom GLSL shader for more realistic ink spread
- **Multi-Point Spread**: Multiple ink droplets that merge together
- **Interactive Ink**: Mouse movement affects ink spread direction

---

## 📚 Related Documents

- [cinematic-idea.md](./cinematic-idea.md) – Full Cinematic Mode design
- [animus-bleed-plan.md](./Implementations/animus-bleed-plan.md) – Implementation details
- [README.md](../README.md) – Project overview

---

> 🎨 **Design Mantra**: "The transition should feel like watching ink bleed on parchment – organic, unpredictable, and beautiful."
