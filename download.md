---
layout: default
title: Download REG Linux builds
permalink: /download/
body_class: download
description: Choose your REG Linux image by vendor or architecture across the supported device matrix.
---
{% assign total_devices = site.devices | size %}
{% assign brands = site.data.brand_order %}
{% include site-header.html nav_current="download" %}

<main>
  <section class="hero download-hero">
    <div class="hero-text">
      <p class="eyebrow">Pick your hardware</p>
      <h1>Download REG Linux builds</h1>
      <p class="lede">Browse curated images for {{ total_devices }} handhelds, SBCs, and mini PCs. Each board page includes flashing instructions, release notes, and troubleshooting tips.</p>
      <div class="hero-cta">
        <a class="btn primary" href="#brands">Jump to vendors</a>
        <a class="btn secondary" href="https://github.com/REG-Linux" target="_blank" rel="noreferrer">Contribute images</a>
      </div>
    </div>
    <div class="hero-media">
      <figure>
        <img src="{{ '/assets/images/logo-retroarch.png' | relative_url }}" alt="REG Linux builds" loading="lazy" />
        <figcaption>Images stay close to mainline kernels for stability.</figcaption>
      </figure>
    </div>
  </section>

  <section class="download-summary" id="brands">
    <div>
      <h2>Supported architectures</h2>
      <p>REG focuses on common retro hardware classes. Pick your CPU family if you are unsure about the device vendor.</p>
      <div class="arch-pills">
        <span class="chip">AArch64</span><span class="chip">ARMv6</span><span class="chip">ARMv7</span><span class="chip">RISC-V</span><span class="chip">x86-64</span>
      </div>
    </div>
    <div class="brand-pills">
      <h2>Vendors</h2>
      <p>Quick links to each vendor section.</p>
      <div class="pill-grid">
        {% for brand in brands %}
          {% assign brand_devices = site.devices | where: "brand", brand %}
          {% if brand_devices.size > 0 %}
            <a href="#brand-{{ brand | slugify }}">{{ brand }} <span>{{ brand_devices.size }} devices</span></a>
          {% endif %}
        {% endfor %}
      </div>
    </div>
  </section>

  {% for brand in brands %}
    {% assign brand_devices = site.devices | where: "brand", brand %}
    {% if brand_devices.size == 0 %}{% continue %}{% endif %}
    <section class="download-brand" id="brand-{{ brand | slugify }}">
      <div class="brand-heading">
        <h2>{{ brand }}</h2>
        <p>{{ brand_devices.size }} supported device{% if brand_devices.size > 1 %}s{% endif %}</p>
      </div>
      <div class="download-grid">
        {% for device in brand_devices %}
          <a class="device-card" href="{{ device.url }}" aria-label="{{ device.title }} details">
            <div class="device-media">
              <img src="{{ device.image | relative_url }}" alt="{{ device.title }}" loading="lazy"{% if device.image_width %} width="{{ device.image_width }}"{% endif %}{% if device.image_height %} height="{{ device.image_height }}"{% endif %} />
            </div>
            <div class="device-body">
              <h3>{{ device.title }}</h3>
              <p>REG Linux build tuned for the {{ device.soc | join: ', ' }} platform.</p>
              <span class="chip">View device page</span>
            </div>
          </a>
        {% endfor %}
      </div>
    </section>
  {% endfor %}
</main>

<footer class="site-footer">
  <p>&copy; 2025 REG Linux. Retro Emulation Gaming Linux is free, open source, and community supported.</p>
  <p class="small">Images and board descriptions are referenced from <a href="https://reglinux.org/download" target="_blank" rel="noreferrer">reglinux.org/download</a>.</p>
</footer>
