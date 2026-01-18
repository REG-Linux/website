# Triforce

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/triforce.webp" alt="Triforce icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:.75rem;"><img src="/wiki/assets/systems/logos/triforce.png" alt="Triforce logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Triforce (2003) is the collaborative arcade hardware developed by Namco, Sega and Nintendo on GameCube/NAOMI 2 technology. REG-Linux exposes it as `triforce` so you can browse the dedicated cabinet list and launch the games with the dedicated Dolphin Triforce branch.

## Technical specifications

- CPU: IBM PowerPC Gekko core at 485 MHz (GameCube-based) with a 256-bit SIMD unit.
- Memory: 24 MB of 1T-SRAM plus 16 MB of auxiliary texture RAM and 4 MB of embedded framebuffer memory.
- Display: ATI “Flipper”-derived GPU capable of 480p/720p tiled 3D polygons with hardware lighting and texture mapping.
- Sound: Custom Dolby Pro Logic II-capable audio pipeline with 24-bit PCM mixing derived from the GameCube architecture.

### Quick reference

- **ROM folder:** `/userdata/roms/triforce`
- **Accepted formats:** `.gcm`, `.iso`, `.gcz`, `.ciso`, `.wbfs`, `.elf`, `.dol`, `.m3u`
- **Emulator:** Dolphin Triforce (`dolphin-triforce` branch)
- **System group:** `triforce`, `arcade`

## ROMs & compatibility

Triforce games demand specific builds and save states due to the arcade card hardware. Move each title’s disc image (matching the MD5 below) into `/userdata/roms/triforce`, and keep any required save files (e.g., `GGPE01.s01`) in `/userdata/system/configs/dolphin-triforce/StateSaves/`.

| Game | Example image | Notes |
| --- | --- | --- |
| `F-Zero AX` | `F-Zero GX (USA).iso` / MD5 `81293462cf48c6a482c33e25c4097ac0` | Mostly demo/x-box; gameplay is limited without additional patches. |
| `Mario Kart Arcade GP` | `Mario Kart Arcade GP (USA).iso` / MD5 `4367f5ff113399f5c749d8336f371d7f` | Load `GGPE01.s01` credit file from the StateSaves directory. |
| `Mario Kart Arcade GP 2` | `Mario Kart Arcade GP 2 (USA).iso` / MD5 `976b91bcb09fea5b1343f6658d07fcf9` | Works with limited button support; load the credit file before running. |
| `Virtua Striker 2002` | `Virtua Striker 2002 (Export).iso` / MD5 `eec44d152ccd630d68f5df85293e06b3` | Only rudimentary inputs respond; most of the game remains a tech demo. |

Most other Triforce titles remain experimental; explore the arcade compatibility notes and fallback to the GameCube releases (F-Zero GX) when Dolphin’s compatibility diverges.

## Emulation

### Dolphin Triforce (standalone)

Use the Dolphin Triforce branch to launch these arcade images. Advanced options include render resolution (`triforce.internal_resolution`), shader precaching (`triforce.wait_for_shaders`), Ubershaders, performance hacks, and pad profiles tailored to arcade sticks.

### Dolphin (RetroArch core)

`libretro: dolphin_triforce` exposes similar switches inside the Quick Menu; adjust shaders, audio, and controller overlays per title, and rely on `[SELECT]` → **Advanced System Options** to configure emulation overrides that persist across sessions.

## Controls

Map credit/start buttons and the arcade stick using the controller overlay or via EmulationStation’s remapping interface. Many titles expect additional buttons (e.g., Z for credits on Mario Kart arcade).

## Troubleshooting

- Ensure the `.iso`/`.gcz` file matches the MD5 above; Dolphin refuses mismatched dumps.
- Copy the proper `GGPE01.s01` (or similar save files) into the StateSaves folder before launching to simulate card insertions.
- Expect reduced functionality; this branch is experimental, and only a few games behave properly. Consult the generic support pages for emulator-level help.
