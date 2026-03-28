---
layout: default
title: Credits & Upstream Projects
permalink: /credits/
body_class: credits
description: REG Linux is built on the shoulders of these open-source projects. Thank you.
---
{% include site-header.html nav_current="credits" %}

<main>
  <section class="hero">
    <div class="hero-text" style="text-align: center; max-width: 640px; margin: 0 auto;">
      <p class="eyebrow">Open source</p>
      <h1>Credits</h1>
      <p class="lede">
        REG Linux wouldn't exist without these projects. We pick, adapt, and integrate their work. All credit goes to the original teams.
      </p>
    </div>
  </section>

  <!-- Build System & OS Foundation -->
  <section class="credits-section">
    <h2 class="credits-heading">Build System & OS Foundation</h2>
    <div class="credits-grid">
      {% include credit-card.html name="Buildroot" logo="/assets/images/credits/buildroot.png" url="https://buildroot.org" desc="Cross-compilation build system that generates the entire REG Linux root filesystem." %}
      {% include credit-card.html name="Linux Kernel" logo="/assets/images/credits/linux.png" url="https://kernel.org" desc="The kernel. REG Linux ships mainline LTS plus board-specific forks for ARM devices." %}
      {% include credit-card.html name="U-Boot" logo="/assets/images/credits/uboot.png" url="https://u-boot.org" desc="Bootloader for ARM, RISC-V, and MIPS devices." %}
      {% include credit-card.html name="SDL3" logo="/assets/images/credits/sdl.png" url="https://libsdl.org" desc="Window, input, and audio abstraction layer. Powers all emulators and the frontend." %}
      {% include credit-card.html name="Mesa 3D" logo="/assets/images/credits/mesa3d.png" url="https://mesa3d.org" desc="Open-source GPU drivers: Panfrost, Lima, Freedreno, V3D, VC4." %}
    </div>
  </section>

  <!-- Distro Upstreams -->
  <section class="credits-section">
    <h2 class="credits-heading">Distribution Upstreams</h2>
    <div class="credits-grid">
      {% include credit-card.html name="Armbian" logo="/assets/images/credits/armbian.png" url="https://armbian.com" desc="Kernel patches, device trees, and board support for ARM SBCs." %}
      {% include credit-card.html name="LibreELEC" logo="/assets/images/credits/libreelec.png" url="https://libreelec.tv" desc="Immutable OS architecture and Buildroot packaging patterns." %}
      {% include credit-card.html name="Batocera" logo="/assets/images/credits/batocera.png" url="https://batocera.org" desc="EmulationStation frontend, packaging recipes, and emulator integration. REG Linux forked from Batocera." %}
      {% include credit-card.html name="ROCKNIX" logo="/assets/images/credits/rocknix.svg" url="https://rocknix.org" desc="Handheld device support, controller configs, and suspend/resume fixes." %}
      {% include credit-card.html name="KNULLI" logo="/assets/images/credits/knulli.png" url="https://knulli.org" desc="Budget handheld support and Allwinner/RK3128 board work." %}
    </div>
  </section>

  <!-- Emulators -->
  <section class="credits-section">
    <h2 class="credits-heading">Emulators</h2>
    <div class="credits-logo-grid">
      {% include credit-logo.html name="RetroArch" logo="/assets/images/credits/retroarch.png" url="https://retroarch.com" %}
      {% include credit-logo.html name="MAME" logo="/assets/images/credits/mame.png" url="https://mamedev.org" %}
      {% include credit-logo.html name="Dolphin" logo="/assets/images/credits/dolphin.png" url="https://dolphin-emu.org" %}
      {% include credit-logo.html name="PCSX2" logo="/assets/images/credits/pcsx2.png" url="https://pcsx2.net" %}
      {% include credit-logo.html name="PPSSPP" logo="/assets/images/credits/ppsspp.png" url="https://ppsspp.org" %}
      {% include credit-logo.html name="RPCS3" logo="/assets/images/credits/rpcs3.png" url="https://rpcs3.net" %}
      {% include credit-logo.html name="DuckStation" logo="/assets/images/credits/duckstation.png" url="https://github.com/stenzek/duckstation" %}
      {% include credit-logo.html name="Flycast" logo="/assets/images/credits/flycast.png" url="https://github.com/flyinghead/flycast" %}
      {% include credit-logo.html name="melonDS" logo="/assets/images/credits/melonds.png" url="https://melonds.kuribo64.net" %}
      {% include credit-logo.html name="Mupen64Plus" logo="/assets/images/credits/mupen64plus.png" url="https://mupen64plus.org" %}
      {% include credit-logo.html name="Snes9x" logo="/assets/images/credits/snes9x.png" url="https://snes9x.com" %}
      {% include credit-logo.html name="DOSBox" logo="/assets/images/credits/dosbox.png" url="https://dosbox-staging.github.io" %}
      {% include credit-logo.html name="VICE" logo="/assets/images/credits/vice.png" url="https://vice-emu.sourceforge.io" %}
      {% include credit-logo.html name="Hatari" logo="/assets/images/credits/hatari.png" url="https://hatari.tuxfamily.org" %}
      {% include credit-logo.html name="xemu" logo="/assets/images/credits/xemu.png" url="https://xemu.app" %}
    </div>
  </section>

  <!-- Game Engines -->
  <section class="credits-section">
    <h2 class="credits-heading">Game Engines</h2>
    <div class="credits-logo-grid">
      {% include credit-logo.html name="ScummVM" logo="/assets/images/credits/scummvm.png" url="https://scummvm.org" %}
      {% include credit-logo.html name="OpenBOR" logo="/assets/images/credits/openbor.png" url="https://github.com/DCurrent/openbor" %}
      {% include credit-logo.html name="EasyRPG" logo="/assets/images/credits/easyrpg.png" url="https://easyrpg.org" %}
      {% include credit-logo.html name="Solarus" logo="/assets/images/credits/solarus.png" url="https://solarus-games.org" %}
      {% include credit-logo.html name="Love2D" logo="/assets/images/credits/love2d.png" url="https://love2d.org" %}
      {% include credit-logo.html name="Ruffle" logo="/assets/images/credits/ruffle.png" url="https://ruffle.rs" %}
    </div>
  </section>

  <section class="credits-note" style="text-align: center; margin-top: 2rem;">
    <p class="muted" style="max-width: 520px; margin: 0 auto; font-size: 0.85rem;">
      This list covers the major upstream projects. REG Linux includes 100+ libretro cores and dozens more libraries and tools.
      If we use your work and you're not listed, <a href="https://github.com/REG-Linux/website/issues">let us know</a>.
    </p>
  </section>
</main>

<style>
.credits-section { margin-bottom: 2rem; }
.credits-heading {
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--accent);
  margin: 0 0 1rem;
  text-align: center;
  font-weight: 600;
}
.credits-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  max-width: 900px;
  margin: 0 auto;
}
.credits-grid-sm {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  max-width: 900px;
  margin: 0 auto;
}
@media (max-width: 700px) {
  .credits-grid { grid-template-columns: 1fr; }
  .credits-grid-sm { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .credits-grid-sm { grid-template-columns: 1fr; }
}

/* Logo-only grid for emulators and engines */
.credits-logo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  max-width: 900px;
  margin: 0 auto;
}
@media (max-width: 600px) { .credits-logo-grid { grid-template-columns: repeat(2, 1fr); } }

.credit-logo-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  padding: 1.25rem 1rem;
  background: var(--card, rgba(16,22,40,0.85));
  border: 1px solid var(--border, rgba(255,255,255,0.12));
  border-radius: var(--radius, 14px);
  text-decoration: none;
  color: var(--text);
  transition: transform 0.15s, border-color 0.15s;
}
.credit-logo-card:hover { transform: translateY(-2px); border-color: var(--accent); text-decoration: none; }
.credit-logo-card img { width: 64px; height: 64px; object-fit: contain; border-radius: 10px; }
.credit-logo-card span { font-size: 0.85rem; font-weight: 600; text-align: center; }

/* Large card (distro upstreams, build system) */
.credit-card {
  display: flex;
  align-items: flex-start;
  gap: 1.1rem;
  padding: 1.25rem;
  background: var(--card, rgba(16,22,40,0.85));
  border: 1px solid var(--border, rgba(255,255,255,0.12));
  border-radius: var(--radius, 14px);
  box-shadow: var(--shadow);
  text-decoration: none;
  color: var(--text);
  transition: transform 0.15s, border-color 0.15s;
}
.credit-card:hover { transform: translateY(-2px); border-color: var(--accent); text-decoration: none; }
.credit-logo { width: 56px; height: 56px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
.credit-logo img { max-width: 56px; max-height: 56px; object-fit: contain; border-radius: 8px; }
.credit-info h3 { margin: 0 0 0.25rem; font-size: 1rem; }
.credit-info p { margin: 0 0 0.4rem; font-size: 0.82rem; color: var(--text-muted); line-height: 1.45; }
.credit-link { font-size: 0.72rem; color: var(--accent); }

/* Small card (emulators, engines, ports) */
.credit-card-sm {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: var(--card, rgba(16,22,40,0.85));
  border: 1px solid var(--border, rgba(255,255,255,0.12));
  border-radius: var(--radius, 14px);
  text-decoration: none;
  color: var(--text);
  transition: transform 0.15s, border-color 0.15s;
}
.credit-card-sm:hover { transform: translateY(-1px); border-color: var(--accent); text-decoration: none; }
.credit-logo-sm { width: 36px; height: 36px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
.credit-logo-sm img { max-width: 36px; max-height: 36px; object-fit: contain; border-radius: 6px; }
.credit-card-sm strong { display: block; font-size: 0.85rem; margin-bottom: 0.1rem; }
.credit-card-sm span { display: block; font-size: 0.72rem; color: var(--text-muted); line-height: 1.3; }
</style>

{% include site-footer.html %}
