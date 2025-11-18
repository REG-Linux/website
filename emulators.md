---
layout: default
title: Emulators
body_class: emulators
permalink: /emulators/
description: REG Linux supported emulators through EmulationStation frontend.
---
{% assign emulator_categories = site.data.emulators %}
{% include site-header.html nav_current="emulators" %}

<main>
  <section class="hero doc-hero">
    <div class="hero-text">
      <p class="eyebrow">Emulators are amazing</p>
      <h1>Enjoy faithful retro games with REG Linux</h1>
      <p class="lede">
        REG Linux blends EmulationStation frontend with curated emulators for an outstanding out of the box experience.
      </p>
      <div class="hero-cta">
        <a class="btn primary" href="https://wiki.reglinux.org/systems/" target="_blank" rel="noreferrer">Browse emulator wiki index</a>
        <a class="btn secondary" href="https://github.com/REG-Linux/REG-Linux" target="_blank" rel="noreferrer">View the GitHub repo</a>
      </div>
      <ul class="hero-highlights">
        <li>50+ systems tracked across arcade, console, and computer folders</li>
        <li>Use wiki to organize your game collection accurately</li>
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
      <p class="eyebrow">Hardware</p>
      <h2>Plan your retrogaming experience with confidence</h2>
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

  <section class="doc-actions">
    <a class="btn primary" href="https://wiki.reglinux.org/systems/" target="_blank" rel="noreferrer">Open the wiki for an extensive catalog of emulated systems</a>
  </section>
</main>
