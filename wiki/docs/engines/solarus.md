# Solarus

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/solarus.webp" alt="Solarus icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/solarus.png" alt="Solarus logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Solarus is an open-source Zelda-style engine focused on 16-bit action-RPGs. REG-Linux exposes the `solarus` metadata group so community-made adventures appear as a single engine entry that handles the Lua scripts, sprites, and particle effects.

### Quick reference

- **ROM folder:** `/userdata/roms/solarus`
- **Accepted formats:** `.solarus`, `.zip`
- **Engine:** Solarus native runtime
- **System group:** `engines`

## ROMs

Drop each `.solarus` archive or zipped directory from the Solarus catalog into `/userdata/roms/solarus/`. Community packs (Solarus Quest, Mystery of Solarus DX, etc.) are listed on <https://solarus-games.org/en/games>. Each pack should include a `game.solarus` manifest and a `data/` folder with sprites, audio, and Lua scripts.

## Emulator settings

Solarus exposes standard display overrides (`solarus.videomode`, `solarus.decoration`) and a control choice option:

| Setting | Description |
| --- | --- |
| `solarus.joystick` | Select which controller input drives the hero (Joypad, Left stick, Right stick). |

Adjust options via the Quick Menu (`[HOTKEY]` + south button) or the advanced game settings in EmulationStation.

## Controls

The default overlay maps movement to the D-pad/analog stick and face buttons to attack/jump actions. Use `/remapping_controls_per_emulator` if you want to assign the Storm Sword or Shield to shoulder buttons.

## Troubleshooting

- Ensure each archive contains `game.solarus` and that the `data/` folder (sprites, music, maps) sits inside the root of your `.solarus` folder.
- Repack zipped directories if Solarus fails to detect assets; the core expects the manifest at the top level.
- For general questions refer to the generic support pages.
