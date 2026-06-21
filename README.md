# Sunken Stratum

A cinematic 3D portfolio experience — a coastal cliffside route built into a Japanese-inspired ruin.

## Tech Stack

- SolidJS (UI)
- Three.js (3D world via Web Worker)
- Cannon-es (physics via Web Worker)
- GSAP (sequence animation)
- Lenis (smooth scroll)
- Tailwind CSS v4
- Vite + Bun

## Development

```bash
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
bun run build
```

Output goes to `dist/`.

## Docker

```bash
docker compose up
```

## Architecture

See `docs/stack-rules.md` for the architecture constitution and `theming.md` for the theme system.
