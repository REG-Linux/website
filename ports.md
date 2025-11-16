---
layout: default
title: Ports
body_class: ports
permalink: /ports/
description: Discover engine ports and community remakes that REG Linux handles via the wiki’s port-specific pages.
---
{% include site-header.html nav_current="ports" %}

<main>
  <section class="hero doc-hero">
    <div class="hero-text">
      <p class="eyebrow">Hardware: port</p>
      <h1>Community ports & remakes</h1>
      <p class="lede">
        The REG Linux wiki backs every `hardware: port` EmulationStation entry with a deep dive into engine details, ROM extensions, emulator hints,
        and upstream notes so you can supply the missing WADs, PK3s, or mod archives these versions expect.
      </p>
      <div class="hero-cta">
        <a class="btn primary" href="https://wiki.reglinux.org/ports/" target="_blank" rel="noreferrer">Browse the ports catalog</a>
      </div>
      <ul class="hero-highlights">
        <li>Covers Doom/Quake, Fallout, Sonic, and homebrew fighters</li>
        <li>Each page mirrors `es_systems.yml` with technical specs and ROM extensions</li>
        <li>Useful when building playlists that require community WADs or mods</li>
      </ul>
    </div>
    <div class="hero-media">
      <figure>
        <img src="{{ '/assets/images/logo-mame.png' | relative_url }}" alt="Ported engines" loading="lazy" />
        <figcaption>Ports rely on community builds and external assets.</figcaption>
      </figure>
    </div>
  </section>

  <section class="doc-section">
    <div class="section-heading">
      <p class="eyebrow">Classic FPS & PC ports</p>
      <h2>Doom, Quake, and their siblings</h2>
      <p>Entries such as DXX-Rebirth, PRBoom, GZDoom, Raze, Quake 3, Doom 3, VitaQuake2, and Xash3D FWGS outline the required WADs, mods, and `BR2` packages.</p>
    </div>
    <div class="grid">
      <article class="card">
        <h3>Doom engines</h3>
        <p>GZDoom, PRBoom, DXX-Rebirth, ECWolf, and Raze each have notes about IWADs, custom resource files, and modern engine offsets that keep the games stable.</p>
        <ul>
          <li>Most pages mention `.wad`, `.iwad`, `.pwad`, `.pk3`, and `gzdoom` extensions.</li>
          <li>Keep your Doom data in `/userdata/roms/ports` with matching file names so EmulationStation auto-detects them.</li>
        </ul>
      </article>
      <article class="card">
        <h3>Quake & engines</h3>
        <p>Entries for TyRQuake, Tyrian, OpenJazz, Jazz2, Quake 3, and VitaQuake2 describe the `.pak`/`.pk3` layout plus engine-specific CLI flags.</p>
        <ul>
          <li>Quake 3 and allied ports sometimes require shader/data folders under `/userdata/system/ports`.</li>
          <li>Tyrian and Tyrquake rely on `tyrian5.exe`/`tyrquake.exe` replacements bundled via the wiki notes.</li>
        </ul>
      </article>
    </div>
  </section>

  <section class="doc-section">
    <div class="section-heading">
      <p class="eyebrow">Action, platformers & strategy</p>
      <h2>Open-source remakes</h2>
      <p>Ports like Cannonball, CDogs, CorsixTH, OpenLara, Sonic 3 AIR, Sonic Mania, Sonic Retro, Mr. Boom, and Fury document game directories and controller optimizations.</p>
    </div>
    <div class="grid">
      <article class="card">
        <h3>Arcade & adventure</h3>
        <p>Cannonball, OpenLara, CDogs, and OpenJazz designate how to store asset packs and indexes; the wiki also notes license/BIOS requirements where applicable.</p>
      </article>
      <article class="card">
        <h3>Sonic & Mega Drive</h3>
        <p>Sonic 3 AIR, Sonic Mania, and the Sonic Retro entries cover hack patches, XL patches, and the archives you should drop into the ROM folder to unlock the best experience.</p>
      </article>
      <article class="card">
        <h3>Indie & retro shooters</h3>
        <p>Mr. Boom, Abuse, Fury, Tyrian, and UQM highlight the `.lvl`, `.wad`, and `.exe` files that these ports parse plus tips for audio scaling.</p>
      </article>
    </div>
  </section>

  <section class="doc-section">
    <div class="section-heading">
      <p class="eyebrow">How to use the ports folder</p>
      <h2>Supplement the engines with the right data</h2>
    </div>
    <ul class="doc-list">
      <li>The ports folder mirrors the EmulationStation structure (overview, technical spec, ROM extensions, emulator hints, and upstream notes).</li>
      <li>Ports usually demand extra content (WADs, PK3s, music, or fan-made assets) rather than simple ROM dumps.</li>
      <li>Follow the wiki notes to align file names, command-line flags, and directories so EmulationStation and the engines agree.</li>
    </ul>
  </section>

  <section class="doc-actions">
    <a class="btn primary" href="https://wiki.reglinux.org/ports/" target="_blank" rel="noreferrer">Open the ports directory</a>
  </section>
</main>
