---
layout: default
title: Engines
body_class: engines
permalink: /engines/
description: Learn about the curated engines REG Linux pairs with its ROM metadata so you know which packages power each experience.
---
{% include site-header.html nav_current="engines" %}

<main>
  <section class="hero doc-hero">
    <div class="hero-text">
      <p class="eyebrow">Engine companions</p>
      <h1>Open-source runtimes</h1>
      <p class="lede">
        The REG Linux wiki documents every engine that ships with the default image—both native binaries and libretro builds—so you can drop the right assets and packages for adventure games,
        beat ’em ups, RPG Maker titles, Flash SWFs, or LaserDisc FMV discs.
      </p>
      <div class="hero-cta">
        <a class="btn primary" href="https://wiki.reglinux.org/engines/" target="_blank" rel="noreferrer">Browse the engine guides</a>
      </div>
    </div>
    <div class="hero-media">
      <figure>
        <img src="{{ '/assets/images/logo-retroarch.png' | relative_url }}" alt="Engine stack" loading="lazy" />
        <figcaption>Every engine pairs with curated ROM metadata.</figcaption>
      </figure>
    </div>
  </section>

  <section class="section-heading">
    <p class="eyebrow">What the wiki covers</p>
    <h2>Engine-specific instructions</h2>
    <p>Each entry describes the supported formats, required BR2 packages, and best practices for dropping content into REG Linux.</p>
  </section>

  <div class="grid">
    <article class="card">
      <h3>ScummVM</h3>
      <p>Reimplements SCUMM, SCI, AGI, and other adventure engines so classics like Monkey Island, Day of the Tentacle, Grim Fandango, and Broken Sword run with controller-friendly menus.</p>
      <ul>
        <li>Supported extensions: `.scummvm`, `.zar`</li>
        <li>Engine packages: `BR2_PACKAGE_SCUMMVM`, `BR2_PACKAGE_LIBRETRO_SCUMMVM`, `BR2_PACKAGE_LIBRETRO_SCUMM`</li>
      </ul>
      <a class="btn secondary" href="https://wiki.reglinux.org/engines/scummvm/" target="_blank" rel="noreferrer">Read ScummVM guide</a>
    </article>
    <article class="card">
      <h3>Solarus</h3>
      <p>The Zelda-inspired Solarus engine loads `game.solarus` archives and honors Lua scripts, sounds, and top-down maps while preserving save states and controller layouts.</p>
      <ul>
        <li>Supported extensions: `.solarus`, `.zip`, `.tar`</li>
        <li>Engine package: `BR2_PACKAGE_SOLARUS_ENGINE`</li>
      </ul>
      <a class="btn secondary" href="https://wiki.reglinux.org/engines/solarus/" target="_blank" rel="noreferrer">Read Solarus guide</a>
    </article>
    <article class="card">
      <h3>EasyRPG</h3>
      <p>Recreates the RPG Maker 2000/2003 runtime so you can drop `.easyrpg` project folders, `.zip` archives, or `.zar` bundles that contain `RPG_RT.exe` data.</p>
      <ul>
        <li>Supported extensions: `.easyrpg`, `.zip`, `.zar`</li>
        <li>Engine packages: `BR2_PACKAGE_EASYRPG_PLAYER`, `BR2_PACKAGE_LIBRETRO_EASYRPG`</li>
      </ul>
      <a class="btn secondary" href="https://wiki.reglinux.org/engines/easyrpg/" target="_blank" rel="noreferrer">Read EasyRPG guide</a>
    </article>
    <article class="card">
      <h3>IKEMEN</h3>
      <p>A modern revival of the M.U.G.E.N engine with rollback, Lua hooks, and high framerates, powering community-made fighters from Street Fighter to King of Fighters.</p>
      <ul>
        <li>Load `.def`, `.air`, `.cmd`, and Lua scripts like classic M.U.G.E.N builds.</li>
        <li>Engine package: `BR2_PACKAGE_IKEMEN`</li>
      </ul>
      <a class="btn secondary" href="https://wiki.reglinux.org/engines/ikemen/" target="_blank" rel="noreferrer">Read IKEMEN guide</a>
    </article>
    <article class="card">
      <h3>OpenBOR</h3>
      <p>Community-driven beat ’em up engine that loads `.pak` archives or `.pak.txt` manifests containing sprites, Lua logic, music, and Ai adjustments.</p>
      <ul>
        <li>Engine builds: `openbor4432`, `openbor6412`, `openbor7142`, `openbor7530`</li>
        <li>Packages: `BR2_PACKAGE_OPENBORxxxx` for each architecture</li>
      </ul>
      <a class="btn secondary" href="https://wiki.reglinux.org/engines/openbor/" target="_blank" rel="noreferrer">Read OpenBOR guide</a>
    </article>
    <article class="card">
      <h3>Flash Player</h3>
      <p>Replaces the retired Adobe player with Ruffle and Lightspark so SWF/ABC adventure and ActionScript titles keep running safely in REG Linux.</p>
      <ul>
        <li>Supported formats: `.swf`, `.abc`, `.flex`</li>
        <li>Engine packages: `BR2_PACKAGE_RUFFLE`, `BR2_PACKAGE_LIGHTSPARK`</li>
      </ul>
      <a class="btn secondary" href="https://wiki.reglinux.org/engines/flash/" target="_blank" rel="noreferrer">Read Flash guide</a>
    </article>
    <article class="card">
      <h3>TheXTech</h3>
      <p>Runs Super Mario Bros. X worlds, reading `System` folders, Lua scripts, and SMBX archives while adding widescreen, touch, and editor features.</p>
      <ul>
        <li>Supported extensions: `.smbx`, `.zip`</li>
        <li>Engine package: `BR2_PACKAGE_THEXTECH`</li>
      </ul>
      <a class="btn secondary" href="https://wiki.reglinux.org/engines/thextech/" target="_blank" rel="noreferrer">Read TheXTech guide</a>
    </article>
    <article class="card">
      <h3>Singe</h3>
      <p>Hypseus’s FMV interpreter for LaserDisc-era arcade shooters—Mad Dog McCree, Crime Patrol, Space Pirates, and Dragon’s Lair—using `.singe` framefiles.</p>
      <ul>
        <li>Supported extensions: `.singe`, `.framefile.txt`, `.m2v`, `.ogm`, `.ogg`</li>
        <li>Engine package: `BR2_PACKAGE_HYPSEUS_SINGE`</li>
      </ul>
      <a class="btn secondary" href="https://wiki.reglinux.org/engines/singe/" target="_blank" rel="noreferrer">Read Singe guide</a>
    </article>
  </div>

  <section class="doc-actions">
    <a class="btn primary" href="https://wiki.reglinux.org/engines/" target="_blank" rel="noreferrer">Open the engines directory</a>
  </section>
</main>
