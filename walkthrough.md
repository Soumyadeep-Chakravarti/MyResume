# Walkthrough - The Animus Bleed Transition (V2 - Blob Overlay)

I have completely redesigned the transition to use an expanding blob overlay approach.

## The New Approach

### Visual Flow
1. **User scrolls** past the simplified resume into the transition zone
2. **Blob appears** (after 50% scroll): A small ink blob appears at the center
3. **Blob expands**: The blob grows organically with distorted edges
4. **Full coverage**: The blob covers the entire viewport
5. **Transition**: The 3D world fades in and the blob disappears

### Technical Implementation

#### Blob Overlay
- A fixed `<div>` positioned at `z-index: 50` (above everything)
- Starts as a circle (`borderRadius: 50%`)
- Scales from `0` to `3` based on scroll progress
- SVG turbulence filter creates organic, erratic edges
- Theme-aware color (white in dark mode, black in light mode)

#### 3D World Loading
- Starts loading at 50% progress (hidden with `opacity: 0`)
- Fades in when transition completes
- Only becomes interactive when fully visible

#### Benefits
- More intuitive "ink spreading" metaphor
- The blob **covers** the page (not reveals through it)
- Cleaner code with better separation
- Better performance

## Verification
1. Scroll down to the transition zone
2. Watch for a small blob to appear at the center
3. Continue scrolling - the blob should expand erratically
4. The blob should eventually cover the entire screen
5. The 3D world should fade in as the blob disappears
