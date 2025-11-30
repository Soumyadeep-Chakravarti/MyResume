# Implementation Plan - The Animus Bleed Transition (V2 - Blob Approach)

## Problem with V1
The current approach masks the 3D world, which creates a "reveal" effect. This is backwards from the desired "ink blot" metaphor.

## New Approach

### Visual Flow
1. **Start**: User scrolls past the simplified resume
2. **Blob Appears**: A small ink blob appears at the center of the screen
3. **Blob Expands**: As user scrolls, the blob grows erratically (organic edges via SVG filter)
4. **Full Coverage**: The blob eventually covers the entire viewport
5. **Transition**: Once fully covered, switch to 3D mode and fade out the blob overlay

### Technical Implementation

#### Phase 1: Blob Overlay (0% - 80% progress)
- Render a `<div>` with background color (white in light mode, black in dark mode)
- Start with `scale(0)` at center
- Apply SVG turbulence filter for organic edges
- Expand to `scale(2)` to cover entire viewport

#### Phase 2: Full Coverage (80% - 90% progress)
- Blob is now covering the entire screen
- The simplified resume is hidden underneath
- Start loading the 3D world in the background

#### Phase 3: Reveal 3D (90% - 100% progress)
- Switch mode to `cinematic`
- Fade out the blob overlay
- 3D world is now visible and interactive

### Code Changes

#### MainContent.jsx
- Remove the mask approach entirely
- Add a fixed blob overlay that sits on top of everything
- Control blob size via `transform: scale()`
- Apply filter to the blob element itself

#### ScrollTransitionZone.jsx
- Keep the scroll driver logic
- Adjust progress mapping if needed

## Benefits
- More intuitive "ink spreading" metaphor
- Cleaner separation of concerns
- Better performance (no masking of 3D content)
- Easier to control blob appearance
