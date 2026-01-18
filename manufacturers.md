---
layout: default
title: Manufacturers
body_class: manufacturers
permalink: /manufacturers/
description: Explore every hardware manufacturer behind the REG Linux device catalog.
---
{% assign manufacturers = site.data.manufacturers %}
{% include site-header.html nav_current="manufacturers" %}

<main>
  <section class="hero manufacturers-hero">
    <div class="hero-text">
      <p class="eyebrow">Hardware makers</p>
      <h1>Manufacturers powering REG Linux builds</h1>
      <p class="lede">
        Every REG Linux image maps to real hardware. Use this directory to jump straight to each
        manufacturer's official site before you flash, buy, or compare devices.
      </p>
      <div class="hero-cta">
        <a class="btn primary" href="{{ '/download/' | relative_url }}">Browse downloads</a>
        <a class="btn secondary" href="https://reglinux.org/wiki/sbcs/catalog/" target="_blank" rel="noreferrer">Open hardware wiki</a>
      </div>
      <ul class="hero-highlights">
        <li>Covers SBCs, handhelds, and mini PC makers</li>
        <li>Direct links to vendor specs, support, and storefronts</li>
        <li>Built from the same catalog that powers the downloads page</li>
      </ul>
    </div>
    <div class="hero-media">
      <figure>
        <img src="{{ '/assets/images/logo-linux.webp' | relative_url }}" alt="REG Linux hardware ecosystem" loading="lazy" />
        <figcaption>REG Linux reaches across multiple hardware ecosystems.</figcaption>
      </figure>
    </div>
  </section>

  <section class="manufacturer-grid-section">
    <div class="section-heading">
      <p class="eyebrow">Vendor directory</p>
      <h2>Device manufacturers</h2>
      <p>Counted across the current device lineup so you can trace each hardware family to its source.</p>
    </div>
    <div class="manufacturer-grid">
      {% for vendor in manufacturers %}
        {% assign device_count = 0 %}
        {% for entry in site.data.devices %}
          {% assign device = entry[1] %}
          {% if device.manufacturer contains vendor.id %}
            {% assign device_count = device_count | plus: 1 %}
          {% endif %}
        {% endfor %}
        <a class="manufacturer-card" href="{{ vendor.url }}" target="_blank" rel="noreferrer">
          <div class="manufacturer-logo" aria-hidden="true">
            {% if vendor.logo_image %}
              <img src="{{ vendor.logo_image | relative_url }}" alt="{{ vendor.name }} logo" loading="lazy" />
            {% else %}
              {{ vendor.logo | default: vendor.name }}
            {% endif %}
          </div>
          <div class="manufacturer-meta">
            <h3>{{ vendor.name }}</h3>
            <p>{{ device_count }} device{% if device_count != 1 %}s{% endif %}</p>
            <span class="chip">Visit website</span>
          </div>
        </a>
      {% endfor %}
    </div>
  </section>
</main>
