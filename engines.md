---
layout: default
title: Engines
body_class: engines
permalink: /engines/
description: Learn about the curated open souce engines REG Linux comes with and what you can do with.
---
{% assign engines = site.data.engines %}
{% include site-header.html nav_current="engines" %}

<main>
  <section class="hero doc-hero">
    <div class="hero-text">
      <p class="eyebrow">Engine companions</p>
      <h1>Open-source runtimes</h1>
      <p class="lede">
        REG Linux ships with the several open source engines — both native binaries and libretro builds —so you can drop the right assets and packages for adventure games,
        beat ’em ups, RPG Maker titles, Flash SWFs, fan-made games, or even LaserDisc FMV discs.
      </p>
      <div class="hero-cta">
        <a class="btn primary" href="https://wiki.reglinux.org/engines/" target="_blank" rel="noreferrer">Browse the engine guides</a>
      </div>
    </div>
    <div class="hero-media">
      <figure>
        <img src="{{ '/assets/images/engines/engines-hero.png' | relative_url }}" alt="Collage of REG Linux engine logos" loading="lazy" />
        <figcaption>Every engine pairs with curated ROM metadata.</figcaption>
      </figure>
    </div>
  </section>

  <section class="section-heading">
    <p class="eyebrow">Browse our wiki</p>
    <h2>Engine-specific instructions</h2>
    <p>Each entry in the wiki describes the engines, supported formats, and best practices for enjoying your content into REG Linux.</p>
  </section>

  <div class="engine-grid">
    {% for engine in engines %}
      <article class="card engine-card">
        <figure class="engine-logo">
          {% for logo in engine.logos %}
            <img src="{{ logo.src | relative_url }}" alt="{{ logo.alt }}" loading="lazy" />
          {% endfor %}
        </figure>
        <h3>{{ engine.name }}</h3>
        <p>{{ engine.description }}</p>
        <a class="btn secondary" href="{{ engine.url }}" target="_blank" rel="noreferrer">{{ engine.cta_label }}</a>
      </article>
    {% endfor %}
  </div>

  <section class="doc-actions">
    <a class="btn primary" href="https://wiki.reglinux.org/engines/" target="_blank" rel="noreferrer">Open the engines directory</a>
  </section>
</main>
