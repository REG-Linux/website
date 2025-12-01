# Flatpak

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/flatpak.webp" alt="Flatpak icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/flatpak.png" alt="Flatpak logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Flatpak is a portable Linux packaging format that lets you install modern applications in a sandboxed environment. REG-Linux exposes Flatpak apps through the `flatpak` system, which groups under the `ports/pc` category and shares the `flatpak` artwork set where available.

This system currently targets x86_64 hosts because most Flatpak packages are distributed for that architecture.

## Quick reference

- **ROM folder:** `/userdata/roms/flatpak` (stores shortcuts)  
- **Saves folder:** `/userdata/saves/flatpak` (where Flatpak runtimes and data live)  
- **Accepted formats:** `.flatpak`  
- **Common tools:** `flatpak-config`, `flatpak-update`, `REG-Linux-flatpak-update`

## Installing Flatpaks

### Step 1: add a repository

Flatpak uses remotes such as Flathub. On REG-Linux v31 you must add the repo manually via SSH or the system terminal:

```
flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo
```

REG-Linux v32+ ships with Flathub already configured.

### Step 2: install via `flatpak-config`

Open `flatpak-config` from Applications ([F1] → Applications) to search and install packages graphically.

### Step 3: register the shortcut

After installing a Flatpak, run `REG-Linux-flatpak-update` over SSH or from the menu to add the application shortcut to the Ports category (`/userdata/roms/flatpak`).

### Alternative: install via command line

From SSH, add the repo (if needed), then install a package by ID:

```
flatpak install com.valvesoftware.Steam
```

This downloads runtimes to `/userdata/saves/flatpak` and registers the shortcut in `/userdata/roms/flatpak` after you run `REG-Linux-flatpak-update`.

## Managing Flatpaks

- **Update packages:** run `flatpak update` or click **Upgrade** in `flatpak-config`.
- **Uninstall:** use `flatpak uninstall <app>` or the UI, then delete the `.flatpak` shortcut from `/userdata/roms/flatpak`.
- **Clean unused runtimes:** `flatpak uninstall --unused` removes orphaned dependencies.

## Notes & limitations

- Flatpaks may not yet support NAS save directories; use internal storage if you experience install failures.
- Some apps rely on a keyboard/mouse; controllers often require pad-to-key mappings or Steam’s input layer.
- Due to sandboxing, some games might need `--no-sandbox` or extra permissions; add those flags to the `.sh` script in Ports if necessary.

## Controls

Flatpaks typically use keyboard/mouse input. Map your controller using Pad2Key in RetroArch or rely on the virtual keyboard overlay if the app lacks controller support.

## Troubleshooting

- **App not launching:** refresh game lists, ensure the Flatpak shortcut exists in `/userdata/roms/flatpak`, and try running with `--no-sandbox`.
- **Slow performance:** make sure your GPU drivers are up to date (`dosent relevant?).
- **Controller issues:** configure input in the app, use Steam/Proton helper packages, or check PCGamingWiki for solution tips.
- **Need to remove entire Flatpak environment:** delete `/userdata/saves/flatpak` and `/userdata/roms/flatpak`.
