---
layout: default
title: Emulators
body_class: emulators
permalink: /emulators/
description: Explore the EmulatedStation systems the REG Linux wiki documents so you can plan your ROM folders with confidence.
---
{% include site-header.html nav_current="emulators" %}

<main>
  <section class="hero doc-hero">
    <div class="hero-text">
      <p class="eyebrow">Official wiki data</p>
      <h1>Every supported emulator profile</h1>
      <p class="lede">
        The REG Linux wiki mirrors the EmulationStation `es_systems.yml` bundle with metadata for 150+ systems, so you can see which manufacturer,
        release year, hardware type, ROM extensions, and upstream notes ship with each entry.
      </p>
      <div class="hero-cta">
        <a class="btn primary" href="https://wiki.reglinux.org/systems/" target="_blank" rel="noreferrer">Browse emulator index</a>
        <a class="btn secondary" href="https://github.com/REG-Linux/REG-Linux" target="_blank" rel="noreferrer">View the repo</a>
      </div>
      <ul class="hero-highlights">
        <li>150+ systems tracked across arcade, console, and computer folders</li>
        <li>Each wiki page publishes ROM extensions for accurate folder names</li>
        <li>Use the same metadata when curating shaders, playlists, and dat files</li>
      </ul>
    </div>
    <div class="hero-media">
      <figure>
        <img src="{{ '/assets/images/logo-es.png' | relative_url }}" alt="EmulationStation systems" loading="lazy" />
        <figcaption>EmulationStation organizes these systems inside REG Linux.</figcaption>
      </figure>
    </div>
  </section>

  <section class="doc-section">
    <div class="section-heading">
      <p class="eyebrow">Organized by hardware</p>
      <h2>Plan your ROM tree with context</h2>
      <p>The wiki breaks the systems folder into familiar groupings so you can match ROM sets and BIOS files with the right emulator.</p>
    </div>
    <div class="grid">
      <article class="card">
        <h3>Arcade & cabinets</h3>
        <p>The wiki surfaces the metadata for every arcade driver, BIOS set, and command-line tweak so REG Linux can ship curated folders for each release.</p>
        <div class="emulator-grid">
          <figure class="emulator-tile">
            <img src="{{ '/assets/images/emulators/mame.svg' | relative_url }}" alt="MAME logo" loading="lazy" />
            <figcaption>
              <strong>MAME</strong>
              <span>Multi-hardware arcade backbone</span>
            </figcaption>
          </figure>
          <figure class="emulator-tile">
            <img src="{{ '/assets/images/emulators/finalburn-neo.svg' | relative_url }}" alt="FinalBurn Neo logo" loading="lazy" />
            <figcaption>
              <strong>FinalBurn NEO</strong>
              <span>Neo Geo, CPS, ST-V fighters</span>
            </figcaption>
          </figure>
          <figure class="emulator-tile">
            <img src="{{ '/assets/images/emulators/supermodel.svg' | relative_url }}" alt="SuperModel logo" loading="lazy" />
            <figcaption>
              <strong>SuperModel</strong>
              <span>Sega Model 3 &amp; 2 cabinets</span>
            </figcaption>
          </figure>
          <figure class="emulator-tile">
            <img src="{{ '/assets/images/emulators/daphne.svg' | relative_url }}" alt="Daphne logo" loading="lazy" />
            <figcaption>
              <strong>Daphne</strong>
              <span>Laserdisc &amp; arcade classics</span>
            </figcaption>
          </figure>
          <figure class="emulator-tile">
            <img src="{{ '/assets/images/emulators/hypseus.svg' | relative_url }}" alt="Hypseus logo" loading="lazy" />
            <figcaption>
              <strong>Hypseus</strong>
              <span>Naomi, Naomi 2, and board layers</span>
            </figcaption>
          </figure>
          <figure class="emulator-tile">
            <img src="{{ '/assets/images/emulators/flycast.svg' | relative_url }}" alt="Flycast logo" loading="lazy" />
            <figcaption>
              <strong>Flycast</strong>
              <span>Dreamcast &amp; Naomi drivers</span>
            </figcaption>
          </figure>
          <figure class="emulator-tile">
            <img src="{{ '/assets/images/emulators/naomi.svg' | relative_url }}" alt="Naomi logo" loading="lazy" />
            <figcaption>
              <strong>Naomi</strong>
              <span>Official Sega Naomi hardware</span>
            </figcaption>
          </figure>
        </div>
      </article>
      <article class="card">
        <h3>Consoles & handhelds</h3>
        <p>The wiki profiles NES, SNES, Mega Drive, GameCube, Dreamcast, PSX, PSP, Switch, Wii, and Xbox systems so you know which cores, shaders, and controllers to pair.</p>
        <div class="console-grid">
          <figure class="emulator-tile">
            <img src="{{ '/assets/images/emulators/nestopia.svg' | relative_url }}" alt="Nestopia logo" loading="lazy" />
            <figcaption>
              <strong>Nestopia</strong>
              <span>Nintendo Entertainment System</span>
            </figcaption>
          </figure>
          <figure class="emulator-tile">
            <img src="{{ '/assets/images/emulators/snes9x.svg' | relative_url }}" alt="SNES9X logo" loading="lazy" />
            <figcaption>
              <strong>SNES9X</strong>
              <span>Super Nintendo / Super Famicom</span>
            </figcaption>
          </figure>
          <figure class="emulator-tile">
            <img src="{{ '/assets/images/emulators/mupen64plus.svg' | relative_url }}" alt="Mupen64Plus logo" loading="lazy" />
            <figcaption>
              <strong>Mupen64Plus</strong>
              <span>Nintendo 64 pioneers</span>
            </figcaption>
          </figure>
          <figure class="emulator-tile">
            <img src="{{ '/assets/images/emulators/genesis-plus-gx.svg' | relative_url }}" alt="Genesis Plus GX logo" loading="lazy" />
            <figcaption>
              <strong>Genesis Plus GX</strong>
              <span>Mega Drive &amp; Master System</span>
            </figcaption>
          </figure>
          <figure class="emulator-tile">
            <img src="{{ '/assets/images/emulators/picodrive.svg' | relative_url }}" alt="Picodrive logo" loading="lazy" />
            <figcaption>
              <strong>Picodrive</strong>
              <span>Sega Genesis + 32X + Pico</span>
            </figcaption>
          </figure>
          <figure class="emulator-tile">
            <img src="{{ '/assets/images/emulators/duckstation.svg' | relative_url }}" alt="DuckStation logo" loading="lazy" />
            <figcaption>
              <strong>DuckStation</strong>
              <span>PlayStation 1 &amp; ports</span>
            </figcaption>
          </figure>
          <figure class="emulator-tile">
            <img src="{{ '/assets/images/emulators/pcsx2.svg' | relative_url }}" alt="PCSX2 logo" loading="lazy" />
            <figcaption>
              <strong>PCSX2</strong>
              <span>PlayStation 2</span>
            </figcaption>
          </figure>
          <figure class="emulator-tile">
            <img src="{{ '/assets/images/emulators/rpcs3.svg' | relative_url }}" alt="RPCS3 logo" loading="lazy" />
            <figcaption>
              <strong>RPCS3</strong>
              <span>PlayStation 3</span>
            </figcaption>
          </figure>
          <figure class="emulator-tile">
            <img src="{{ '/assets/images/emulators/xemu.svg' | relative_url }}" alt="Xemu logo" loading="lazy" />
            <figcaption>
              <strong>Xemu</strong>
              <span>Original Xbox</span>
            </figcaption>
          </figure>
          <figure class="emulator-tile">
            <img src="{{ '/assets/images/emulators/gambatte.svg' | relative_url }}" alt="Gambatte logo" loading="lazy" />
            <figcaption>
              <strong>Gambatte</strong>
              <span>Game Boy / Color</span>
            </figcaption>
          </figure>
          <figure class="emulator-tile">
            <img src="{{ '/assets/images/emulators/mgba.svg' | relative_url }}" alt="mGBA logo" loading="lazy" />
            <figcaption>
              <strong>mGBA</strong>
              <span>Game Boy Advance</span>
            </figcaption>
          </figure>
          <figure class="emulator-tile">
            <img src="{{ '/assets/images/emulators/melonds.svg' | relative_url }}" alt="MelonDS logo" loading="lazy" />
            <figcaption>
              <strong>MelonDS</strong>
              <span>Nintendo DS</span>
            </figcaption>
          </figure>
        </div>
      </article>
      <article class="card">
        <h3>Computers</h3>
        <p>From Amiga to Apple II, the wiki outlines the emulator version, BIOS/ROM shortcuts, and configuration splits for each classic computer profile.</p>
        <div class="emulator-grid">
          <figure class="emulator-tile">
            <img src="{{ '/assets/images/emulators/amiberry.svg' | relative_url }}" alt="Amiberry logo" loading="lazy" />
            <figcaption>
              <strong>Amiberry</strong>
              <span>ARM Amiga accelerator</span>
            </figcaption>
          </figure>
          <figure class="emulator-tile">
            <img src="{{ '/assets/images/emulators/vice.svg' | relative_url }}" alt="VICE logo" loading="lazy" />
            <figcaption>
              <strong>VICE</strong>
              <span>Commodore 64/128/Amiga</span>
            </figcaption>
          </figure>
          <figure class="emulator-tile">
            <img src="{{ '/assets/images/emulators/dosbox.svg' | relative_url }}" alt="DOSBox logo" loading="lazy" />
            <figcaption>
              <strong>DOSBox</strong>
              <span>MS-DOS and early PCs</span>
            </figcaption>
          </figure>
          <figure class="emulator-tile">
            <img src="{{ '/assets/images/emulators/hatari.svg' | relative_url }}" alt="Hatari logo" loading="lazy" />
            <figcaption>
              <strong>Hatari</strong>
              <span>Atari ST/TT</span>
            </figcaption>
          </figure>
          <figure class="emulator-tile">
            <img src="{{ '/assets/images/emulators/openmsx.svg' | relative_url }}" alt="openMSX logo" loading="lazy" />
            <figcaption>
              <strong>openMSX</strong>
              <span>MSX1/2/2+</span>
            </figcaption>
          </figure>
          <figure class="emulator-tile">
            <img src="{{ '/assets/images/emulators/applewin.svg' | relative_url }}" alt="AppleWin logo" loading="lazy" />
            <figcaption>
              <strong>AppleWin</strong>
              <span>Apple IIgs &amp; IIe</span>
            </figcaption>
          </figure>
        </div>
      </article>
      <article class="card">
        <h3>Ports</h3>
        <p>The port entries cover remaining niche builds, whether the distro ships a native binary or applies community patches to keep the experience consistent.</p>
      </article>
    </div>
  </section>

  <section class="doc-section">
    <div class="section-heading">
      <p class="eyebrow">What each page includes</p>
      <h2>Metadata you can trust</h2>
    </div>
    <ul class="doc-list">
      <li>Manufacturer, release year, and hardware type pulled straight from the upstream EmulationStation data.</li>
      <li>Supported ROM extensions, compatible emulator packages, and folder tags so REG Linux can auto-detect your content.</li>
      <li>Notes in English, French, and Portuguese to explain BIOS dependencies, translation tips, or community fixes.</li>
    </ul>
    <p>Use these entries when drafting README files, reorganizing playlists, or documenting the ROM requirements for friends and contributors.</p>
  </section>

  <section class="doc-actions">
    <a class="btn primary" href="https://wiki.reglinux.org/systems/" target="_blank" rel="noreferrer">Open the system catalog</a>
  </section>
</main>
