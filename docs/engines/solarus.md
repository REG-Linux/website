# Solarus

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/solarus.webp" alt="Solarus icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/solarus.png" alt="Solarus logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

[Solarus](https://www.solarus-games.org) is an open-source engine for action-RPG games inspired by The Legend of Zelda. It uses Lua scripts to orchestrate puzzles, dialogs, and behaviors while rendering hero sprites, top-down rooms, and particle effects. The project ships both a game editor and runtime so REG Linux can load Solarus adventures with the same user interface and controller support available on desktop builds.

## Supported formats

- `solarus` – archive format containing game scripts, sprites, audio, and map definitions.
- `zip` / `tar` – compressed packages exported from the Solarus Builder.

## Example games

* `Solarus Quest` – flagship demo featuring dungeons, bosses, and lore.
* `The Legend of Zelda: Mystery of Solarus DX` – fan remake built with Solarus (requires own assets).
* `Super Mario RPG Quest` – cross-genre Solarus fan game that mimics RPG battles.
* `Holy Wars` – top-down adventure with custom characters and music.
* Many other indie Zeldalike projects listed on the official wiki.

## Engines

- **solarus** – Requires `BR2_PACKAGE_SOLARUS_ENGINE`. Loads `game.solarus` archives and handles Lua extensions, sound, collisions, and item pickups.

## Notes

- Keep the archive’s `game.solarus` and `data/` folder intact; the engine expects a `game.yaml` manifest.
- Use RegLinux’s ROM tree to include the same directory structure the Solarus Builder generates so controllers and audio load without extra configuration.

---
