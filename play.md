---
layout: default
title: Emulators, Ports & Game Engines
permalink: /play/
body_class: emulators
description: Emulators, game engines, and native ports bundled with REG Linux — arcade, console, computer, and indie games ready out of the box.
---
{% assign emulator_categories = site.data.emulators %}
{% assign engines = site.data.engines %}
{% assign ports = site.data.ports %}
{% include site-header.html nav_current="play" %}

<main>
  <section class="hero doc-hero">
    <div class="hero-text">
      <p class="eyebrow">50+ systems &middot; 40+ ports &middot; 8 engines</p>
      <h1>Play everything</h1>
      <p class="lede">
        Emulators, game engines, and native ports — all pre-configured. Just add your games.
      </p>
      <div class="hero-cta">
        <a class="btn primary" href="{{ '/download/' | relative_url }}">Download REG Linux</a>
        <a class="btn secondary" href="https://reglinux.org/wiki/systems/" target="_blank" rel="noreferrer">Full systems list on wiki</a>
      </div>
    </div>
    <div class="hero-media">
      <figure>
        <img src="{{ '/assets/images/logo-regstation.webp' | relative_url }}" alt="REG-Station" loading="lazy" />
        <figcaption>REG-Station organizes all systems, ports, and engines.</figcaption>
      </figure>
    </div>
  </section>

  <!-- Emulators -->
  <section class="doc-section" id="emulators">
    <div class="section-heading">
      <p class="eyebrow">Emulators</p>
      <h2>Arcade, console, and computer</h2>
      <p>Controls, video, and audio pre-configured. Pick a system and play.</p>
    </div>
    <div class="grid">
      {% for category in emulator_categories %}
        <article class="card">
          <h3>{{ category.title }}</h3>
          <p>{{ category.description }}</p>
          <div class="{{ category.grid_class }}">
            {% for system in category.systems %}
              <figure class="emulator-tile">
                <img src="{{ system.image | relative_url }}" alt="{{ system.alt }}" loading="lazy" />
                <figcaption>
                  <strong>{{ system.name }}</strong>
                  <span>{{ system.caption }}</span>
                </figcaption>
              </figure>
            {% endfor %}
          </div>
        </article>
      {% endfor %}
    </div>
  </section>

  <!-- Game Engines -->
  <section class="doc-section" id="engines">
    <div class="section-heading">
      <p class="eyebrow">Game engines</p>
      <h2>Open-source runtimes</h2>
      <p>Run specific game formats directly, no emulation needed.</p>
    </div>
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
  </section>

  <!-- Ports -->
  <section class="doc-section ports-grid-section" id="ports">
    <div class="section-heading">
      <p class="eyebrow">Native ports</p>
      <h2>Classic games, rebuilt for Linux</h2>
      <p>Classic games rebuilt as native Linux ports. No emulation, full speed.</p>
    </div>
    <div class="ports-grid">
      {% for port in ports %}
        <article class="card port-card">
          {% if port.logo %}
            <figure class="port-logo">
              <img src="{{ port.logo.src | relative_url }}" alt="{{ port.logo.alt }}" loading="lazy" />
            </figure>
          {% endif %}
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
    <a class="btn primary" href="{{ '/bundled-games/' | relative_url }}">Bundled games — free and legal, playable on first boot</a>
  </section>
</main>
