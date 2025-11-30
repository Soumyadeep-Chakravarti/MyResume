# Task: Implement "The Animus Bleed" Transition

- [ ] **Setup & Context**
    - [x] Update `CinematicModeContext.jsx` to include `transitionProgress` state. <!-- id: 0 -->
    - [x] Create `Docs/Implementations/animus-bleed-plan.md` to outline the technical approach. <!-- id: 1 -->

- [ ] **The Ink Portal (MainContent)**
    - [x] Modify `MainContent.jsx` to allow simultaneous rendering of Simplified and Cinematic modes during transition. <!-- id: 2 -->
    - [x] Implement the "Ink Portal" using CSS `mask-image` or `clip-path` on the Cinematic container. <!-- id: 3 -->
    - [ ] Apply SVG filters for the organic "ink bleed" edge effect. <!-- id: 4 -->

- [ ] **Scroll Driver (ScrollTransitionZone)**
    - [x] Update `ScrollTransitionZone.jsx` to drive `transitionProgress` via `useScroll`. <!-- id: 5 -->
    - [x] Remove the old "Void" circle and button (or repurpose them). <!-- id: 6 -->
    - [x] Tune the scroll thresholds for a smooth experience. <!-- id: 7 -->

- [ ] **Refinement & Polish**
    - [ ] Ensure performance (optimize 3D mounting). <!-- id: 8 -->
    - [ ] Add "dissolve" effect to the 2D content if possible (blur/opacity). <!-- id: 9 -->
    - [ ] Verify the transition flow (Scroll -> Bleed -> 3D). <!-- id: 10 -->
