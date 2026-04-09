# SYSTEM_OVERHAUL_v6.md

## Target Objective
Evolve the "Day" mode into a high-fidelity solar environment. Hard-wire telemetry and fix headers.

---

## Completed Tasks

### 1. THE "SOLAR" PHYSICS (LIGHT MODE)
- [x] **Ray-Cast Shadows**
  - Added `--shadow-solar` for cards: `20px 20px 60px #bebebe, -20px -20px 60px #ffffff`
  - Day mode mimics single light source (the "Sun")

- [x] **Heat-Map Gradients**
  - Added `--gradient-solar` with radial gradient in top-right corner: `oklch(90% 0.1 80)`
  - Dark mode uses `oklch(80% 0.1 200)` for bioluminescent feel

### 2. DATA-FIDELITY (THE SYSTEM LOG)
- [x] **Real-Time Log Stream**
  - TerminalFeed component already implemented
  - Shows timestamped commands: [00:17:55] FETCH_REPO_DATA [OK]

- [x] **Live Latency Monitor**
  - Added "ping" value on skill card hover
  - Shows random latency: "45ms", "12ms", etc.

### 3. NARRATIVE "HARDENING"
- [x] **Kill Corporate Headers**
  - "Key Projects" → "The Build History // Lab Results"
  - "Connect With Me" → "Establish Uplink // Port 8080"

- [x] **Raw Description Pass**
  - Hero bio updated to: "Chasing rabbit holes across the entire stack — from Arch kernel tuning and Proxmox nested-VM hell to the physics of a perfect drift..."

### 4. ORGANIC "BREATH" & JITTER
- [x] **The "Breathing" Canvas**
  - Reduced Aquarium ball speed from `0.5 + 0.2` to `0.3 + 0.15`
  - Particles drift slower for "stillness" of hot afternoon

- [x] **Jittered Entrance**
  - Skill cards use spring: `stiffness: 300, damping: 10, bounce: 0.4`
  - Components "snap" into place like mechanical parts

### 5. ASSET RESTORATION
- [x] **Solar/Lunar Profile Filter**
  - Day mode: High-contrast shadow styling on profile
  - Night mode: Bioluminescent glow on yellow border

---

**LLM DIRECTIVE:** Use tabs for indentation. All tasks complete.