# 🎯 Implementation Plan – The Animus Bleed Transition

## 📋 Overview

This document outlines the technical implementation of the **Animus Bleed** transition effect – the scroll-driven ink spread that bridges the Simplified Resume and the Cinematic 3D World.

---

## 🎨 Visual Goal

Create an organic, watercolor-like ink blot that:
- Starts as a small droplet at the center of the screen
- Expands erratically as the user scrolls (not a perfect circle)
- Has organic, distorted edges (using SVG filters)
- "Soaks" into the 2D content, blurring it
- Reveals the 3D world inside the ink
- Adapts color based on theme (black in light mode, white in dark mode)

---

## 🏗️ Architecture

### Component Structure

```
MainContent.jsx
├── SimplifiedResume (2D content)
├── ScrollTransitionZone (transition orchestrator)
│   └── InkBlotOverlay (the ink effect)
└── CinematicWorld (R3F Canvas, lazy-loaded)
```

### State Flow

```
CinematicModeContext
├── mode: 'simplified' | 'transitioning' | 'cinematic'
├── transitionProgress: 0.0 - 1.0
└── theme: 'light' | 'dark'
```

---

## 🔧 Implementation Details

### Phase 1: Ink Overlay Component

**File**: `src/components/Transition/InkBlotOverlay.jsx`

**Responsibilities**:
- Render a fixed overlay that covers the viewport
- Display the ink blob using radial gradient
- Apply SVG turbulence filter for organic edges
- Scale the blob based on `transitionProgress`
- Adapt color based on theme

**Key Properties**:
```javascript
{
  position: 'fixed',
  inset: 0,
  zIndex: 100,
  pointerEvents: 'none',
  background: 'radial-gradient(circle, currentColor 40%, transparent 70%)',
  filter: 'url(#ink-distortion)',
  transform: `scale(${inkScale})`,
  transformOrigin: 'center',
  color: theme === 'light' ? '#000000' : '#FFFFFF'
}
```

---

### Phase 2: SVG Filter Definition

**File**: `src/components/Transition/InkBlotOverlay.jsx` or `public/index.html`

**Filter Configuration**:
```svg
<svg style="position: absolute; width: 0; height: 0;">
  <defs>
    <filter id="ink-distortion">
      <feTurbulence 
        type="fractalNoise" 
        baseFrequency="0.015 0.02" 
        numOctaves="4" 
        seed="5" 
      />
      <feDisplacementMap 
        in="SourceGraphic" 
        scale="120" 
        xChannelSelector="R" 
        yChannelSelector="G" 
      />
      <feGaussianBlur stdDeviation="2" />
    </filter>
  </defs>
</svg>
```

**Parameters Explained**:
- `baseFrequency`: Controls the "grain" of the distortion (lower = larger blobs)
- `numOctaves`: Adds complexity to the noise (higher = more detail)
- `scale`: Intensity of the displacement (higher = more distortion)
- `feGaussianBlur`: Softens the edges for a more organic look

---

### Phase 3: Scroll Progress Tracking

**File**: `src/components/Transition/ScrollTransitionZone.jsx`

**Implementation**:
```javascript
import { useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { useCinematicMode } from '../../context/CinematicModeContext';

const ScrollTransitionZone = () => {
  const zoneRef = useRef(null);
  const { setTransitionProgress, setMode } = useCinematicMode();

  const { scrollYProgress } = useScroll({
    target: zoneRef,
    offset: ["start end", "end start"]
  });

  // Map scroll to 0-1 progress
  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setTransitionProgress(latest);
      
      // Switch modes at thresholds
      if (latest > 0.95) {
        setMode('cinematic');
      } else if (latest < 0.2) {
        setMode('simplified');
      } else {
        setMode('transitioning');
      }
    });
  }, [scrollYProgress, setTransitionProgress, setMode]);

  return (
    <div ref={zoneRef} className="h-[200vh] relative">
      <InkBlotOverlay />
    </div>
  );
};
```

---

### Phase 4: Ink Scale Animation

**File**: `src/components/Transition/InkBlotOverlay.jsx`

**Scale Mapping**:
```javascript
import { motion, useTransform } from 'framer-motion';
import { useCinematicMode } from '../../context/CinematicModeContext';

const InkBlotOverlay = () => {
  const { transitionProgress, theme } = useCinematicMode();

  // Custom easing for organic expansion
  const inkScale = useTransform(
    transitionProgress,
    [0, 0.15, 0.5, 0.85, 1],
    [0, 0.2, 1.2, 2.0, 2.5],
    {
      ease: [0.16, 1, 0.3, 1] // easeOutExpo-like
    }
  );

  const inkOpacity = useTransform(
    transitionProgress,
    [0, 0.05, 0.95, 1],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        pointerEvents: 'none',
        background: 'radial-gradient(circle, currentColor 35%, transparent 65%)',
        filter: 'url(#ink-distortion)',
        scale: inkScale,
        opacity: inkOpacity,
        color: theme === 'light' ? '#000000' : '#FFFFFF'
      }}
    />
  );
};
```

---

### Phase 5: 2D Content Blur

**File**: `src/components/Simplified/SimplifiedResume.jsx`

**Blur Effect**:
```javascript
import { motion, useTransform } from 'framer-motion';
import { useCinematicMode } from '../../context/CinematicModeContext';

const SimplifiedResume = () => {
  const { transitionProgress, mode } = useCinematicMode();

  const contentBlur = useTransform(
    transitionProgress,
    [0.3, 0.7],
    [0, 8]
  );

  const contentOpacity = useTransform(
    transitionProgress,
    [0.5, 0.9],
    [1, 0]
  );

  if (mode === 'cinematic') return null;

  return (
    <motion.div
      style={{
        filter: contentBlur,
        opacity: contentOpacity
      }}
    >
      {/* Resume content */}
    </motion.div>
  );
};
```

---

### Phase 6: 3D World Lazy Loading

**File**: `src/MainContent.jsx`

**Lazy Loading**:
```javascript
import { lazy, Suspense } from 'react';
import { useCinematicMode } from './context/CinematicModeContext';

const CinematicWorld = lazy(() => import('./components/Cinematic/CinematicWorld'));

const MainContent = () => {
  const { mode } = useCinematicMode();

  return (
    <>
      <SimplifiedResume />
      <ScrollTransitionZone />
      
      {mode === 'cinematic' && (
        <Suspense fallback={<div>Loading 3D World...</div>}>
          <CinematicWorld />
        </Suspense>
      )}
    </>
  );
};
```

---

## 🎨 Refinement: Organic Blob Shape

### Problem
The initial implementation used a simple radial gradient, which creates a perfect circle. We need an **erratic, blob-like shape**.

### Solution: Enhanced SVG Filter

```svg
<filter id="ink-distortion-v2">
  <!-- Layer 1: Large-scale distortion -->
  <feTurbulence 
    type="fractalNoise" 
    baseFrequency="0.01 0.015" 
    numOctaves="3" 
    seed="7" 
    result="turbulence1"
  />
  <feDisplacementMap 
    in="SourceGraphic" 
    in2="turbulence1" 
    scale="150" 
    result="displacement1"
  />
  
  <!-- Layer 2: Fine-detail distortion -->
  <feTurbulence 
    type="turbulence" 
    baseFrequency="0.05 0.06" 
    numOctaves="2" 
    seed="3" 
    result="turbulence2"
  />
  <feDisplacementMap 
    in="displacement1" 
    in2="turbulence2" 
    scale="40" 
    result="displacement2"
  />
  
  <!-- Soften edges -->
  <feGaussianBlur in="displacement2" stdDeviation="3" />
</filter>
```

This creates a **two-layer distortion**:
1. Large-scale warping (blob shape)
2. Fine-detail noise (organic texture)

---

## ⚡ Performance Optimizations

### 1. GPU Acceleration
- Use `transform` instead of `width`/`height`
- Use `will-change: transform` on the ink overlay
- Limit `filter` usage to the ink overlay only

### 2. Lazy Loading
- Load R3F Canvas only when `transitionProgress > 0.5`
- Preload 3D assets during the ink expansion

### 3. Reduced Motion
```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  // Skip ink animation, use simple crossfade
  return <SimpleCrossfade />;
}
```

---

## ✅ Testing Checklist

### Visual Tests
- [ ] Ink droplet appears at scroll start
- [ ] Ink expands smoothly with scroll
- [ ] Edges are organic and distorted (not circular)
- [ ] Ink color matches theme
- [ ] 2D content blurs progressively
- [ ] 3D world is visible inside the ink
- [ ] Ink fades out at 100% progress

### Interaction Tests
- [ ] Scrolling up reverses the effect
- [ ] Mode switches at correct thresholds
- [ ] No jank or stuttering
- [ ] Works on mobile (touch scroll)
- [ ] Reduced motion fallback works

### Performance Tests
- [ ] Maintains 60fps during scroll
- [ ] GPU usage is reasonable
- [ ] No memory leaks when switching modes
- [ ] 3D assets load only when needed

---

## 🚀 Future Enhancements

### Potential Improvements
1. **Multi-Point Spread**: Multiple ink droplets that merge
2. **Mouse-Influenced Direction**: Ink spreads toward mouse position
3. **Particle System**: Tiny ink droplets around the main blob
4. **Custom GLSL Shader**: More realistic fluid simulation
5. **Sound Design**: Subtle ink drip sound effect

---

## 📚 Related Files

- `src/components/Transition/ScrollTransitionZone.jsx`
- `src/components/Transition/InkBlotOverlay.jsx`
- `src/context/CinematicModeContext.jsx`
- `src/MainContent.jsx`

---

> ⚡ **Key Insight**: The ink effect is not a mask – it's an **overlay that expands**. The 3D world is rendered behind it and becomes visible as the ink spreads.
