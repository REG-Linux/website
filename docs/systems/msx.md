# MSX

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/msx.webp" alt="MSX icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/msx.png" alt="MSX logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

The MSX standard began in 1983 looking to unify 8-bit home computers across multiple vendors. The platform evolved into MSX1, MSX2, MSX2+ and various turbo-capable revisions, each of which is documented separately (`msx1.md`, `msx2.md`, `msx2+.md`, `msxturbor.md`). REG-Linux groups all MSX titles under the `msx` system tag so metadata, themes and visual sets stay consistent.

## Quick reference

- Browse MSX1 titles via `msx1` documentation.
- Browse MSX2/MSX2+ titles via `msx2` and `msx2+` docs.
- Browse Turbo-R content via `msxturbor`.
- Shared BIOS folder: `/userdata/bios/`.
- Shared ROM root: `/userdata/roms/`.

## Emulators

All MSX cores in REG-Linux share the same base settings and hardware expectations. Use BlueMSX, FMSX, openMSX or Clock Signal depending on the generation you want to replicate. Each doc elaborates on the BIOS, ROM and emulator configuration peculiarities for that generation.

## Troubleshooting

Refer to the dedicated section for the generation you are emulating, or consult the [generic support pages](/support) if you need broad guidance.
