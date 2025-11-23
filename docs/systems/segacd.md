# Sega CD

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/segacd.webp" alt="Sega CD icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/segacd.png" alt="Sega CD logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Introduced in 1991 by Sega, the Sega CD was a console system. Its platform tag is `segacd` for proper filtering.

## Technical specifications

- CPU: Motorola 68000 clocked at 12.5 MHz with a dedicated co-processor for CD-ROM streaming.
- Memory: 512 KB main RAM, 512 KB video RAM, 256 KB audio RAM, plus buffers for CD data.
- Display: HuC6270-based video controller augmenting the HuC6280 core with overscan sprites and scaling for FMV.
- Sound: 16-bit PCM plus Redbook audio streaming combined with the HuC6280 PSG channels.

## Supported ROM extensions

cue, iso, chd, m3u

## Emulators

- **genesisplusgx** (libretro)
- **picodrive** (libretro)

---