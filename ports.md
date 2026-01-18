---
layout: default
title: Community Ports
body_class: ports
permalink: /ports/
description: Discover engine ports and community remakes that REG Linux handles via the wiki’s port-specific pages.
---
{% assign ports = site.data.ports %}
{% include site-header.html nav_current="ports" %}

<main>
  <section class="hero doc-hero">
    <div class="hero-text">
      <p class="eyebrow">Hardware: port</p>
      <h1>Community ports & remakes</h1>
      <p class="lede">
        The REG Linux wiki backs every `hardware: port` REG-Station entry with a deep dive into engine details, ROM extensions, emulator hints,
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
        <img src="{{ '/assets/images/ports.png' | relative_url }}" alt="Ported engines" loading="lazy" />
        <figcaption>Ports rely on community builds and external assets.</figcaption>
      </figure>
    </div>
  </section>

  <section class="doc-section ports-grid-section">
    <div class="section-heading">
      <p class="eyebrow">Ports catalog</p>
      <h2>Community-tested ports & remakes</h2>
      <p>Every entry below mirrors a wiki port page with the key specs, supported extensions, and emulator notes you need to drop into REG Linux.</p>
    </div>
    <div class="ports-grid">
      {% for port in ports %}
        <article class="card port-card">
          <h3>{{ port.name }}</h3>
          <p class="port-overview">{{ port.overview }}</p>
          {% if port.release_year != "" %}
            <ul class="port-meta">
              <li><strong>Release year:</strong> {{ port.release_year }}</li>
            </ul>
          {% endif %}
          <p class="port-extensions"><strong>Extensions:</strong> {{ port.extensions }}</p>
          <a class="btn secondary" href="{{ port.url }}" target="_blank" rel="noreferrer">Read port notes</a>
        </article>
      {% endfor %}
    </div>
  </section>

  <section class="doc-actions">
    <a class="btn primary" href="https://wiki.reglinux.org/ports/" target="_blank" rel="noreferrer">Open the ports directory</a>
  </section>
</main>
