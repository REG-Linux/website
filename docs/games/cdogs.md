# C-Dogs SDL

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/cdogs.webp" alt="C-Dogs SDL icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
</div>

## Overview

C-Dogs is a top-down shooter built for cooperative or deathmatch play. REG-Linux bundles it as a standalone port so you only need the native data rather than any legacy ROM set.

### Quick reference

- **ROM folder:** `/userdata/roms/cdogs`
- **Accepted format:** `.game`
- **Engine:** C-Dogs SDL native port
- **System group:** `ports`

## BIOS

No BIOS is required.

## Game data

Install the assets through the Content Downloader into `/userdata/roms/cdogs/`. The `.game` folder created by the downloader is what the frontend scans; once present, the entry appears automatically in the ports list.

## Controls

C-Dogs uses the standard RETROpad mappings. Configure action buttons or keyboard bindings via the Quick Menu or `/remapping_controls_per_emulator` if you want to tweak the layout.

## Troubleshooting

- Confirm the Content Downloader placed a `.game` folder inside `/userdata/roms/cdogs/`.
- If the title does not launch, reinstall the content package or delete the folder and reinstall it via the downloader.
- Refer to the [generic support pages](/support) for any engine-specific issues.
