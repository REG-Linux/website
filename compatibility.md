---
layout: default
title: Compatibility Matrix
permalink: /compatibility/
body_class: compatibility
description: Quick view of REG Linux hardware compatibility across Wi-Fi, Bluetooth, HDMI audio, sleep, and storage.
---
{% assign matrix = site.data.compatibility_matrix %}
{% include site-header.html %}

<main>
  <section class="hero compatibility-hero">
    <div class="hero-text">
      <p class="eyebrow">Compatibility matrix</p>
      <h1>Hardware feature status at a glance</h1>
      <p class="lede">
        Track key features like Wi-Fi, Bluetooth, HDMI audio, and sleep across every supported device.
        This matrix starts with untested status so you can fill in real results as you validate hardware.
      </p>
      <div class="hero-cta">
        <a class="btn primary" href="{{ '/download/' | relative_url }}">Browse downloads</a>
        <a class="btn secondary" href="https://reglinux.org/wiki/" target="_blank" rel="noreferrer">Open the wiki</a>
      </div>
      <ul class="hero-highlights">
        <li>Designed for quick decision making before you flash</li>
        <li>Update entries as new releases and kernels land</li>
        <li>Use the notes column for quirks and workarounds</li>
      </ul>
    </div>
    <div class="hero-media">
      <figure>
        <img src="{{ '/assets/images/logo-linux.webp' | relative_url }}" alt="Hardware compatibility overview" loading="lazy" />
        <figcaption>Keep feature status transparent and current.</figcaption>
      </figure>
    </div>
  </section>

  <section class="compatibility-matrix">
    <div class="section-heading">
      <p class="eyebrow">Device matrix</p>
      <h2>Feature support by device</h2>
      <p>Statuses are set to untested by default. Update entries as you verify each platform.</p>
    </div>
    <div class="matrix-legend">
      <span class="status status-untested">Untested</span>
      <span class="status status-ok">Works</span>
      <span class="status status-partial">Partial</span>
      <span class="status status-no">No</span>
    </div>
    <div class="matrix-table">
      <table>
        <thead>
          <tr>
            <th>Device</th>
            <th>Brand</th>
            <th>Wi-Fi</th>
            <th>Bluetooth</th>
            <th>HDMI audio</th>
            <th>Sleep</th>
            <th>USB storage</th>
            <th>Controller hotplug</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {% for entry in matrix %}
            {% assign slug = entry[0] %}
            {% assign status = entry[1] %}
            {% assign device = site.data.devices[slug] %}
            {% assign device_url = '/download/' | append: slug | append: '/' | relative_url %}
            <tr>
              <td><a href="{{ device_url }}">{{ device.title }}</a></td>
              <td>{{ device.brand }}</td>
              <td><span class="status status-{{ status.wifi }}">{{ status.wifi | capitalize }}</span></td>
              <td><span class="status status-{{ status.bluetooth }}">{{ status.bluetooth | capitalize }}</span></td>
              <td><span class="status status-{{ status.hdmi_audio }}">{{ status.hdmi_audio | replace: '_', ' ' | capitalize }}</span></td>
              <td><span class="status status-{{ status.sleep_resume }}">{{ status.sleep_resume | replace: '_', ' ' | capitalize }}</span></td>
              <td><span class="status status-{{ status.usb_storage }}">{{ status.usb_storage | replace: '_', ' ' | capitalize }}</span></td>
              <td><span class="status status-{{ status.controller_hotplug }}">{{ status.controller_hotplug | replace: '_', ' ' | capitalize }}</span></td>
              <td>{{ status.notes }}</td>
            </tr>
          {% endfor %}
        </tbody>
      </table>
    </div>
  </section>

  <section class="compatibility-faq">
    <div class="section-heading">
      <p class="eyebrow">FAQ</p>
      <h2>Compatibility matrix questions</h2>
      <p>Short answers to keep the matrix updated and consistent.</p>
    </div>
    <div class="faq-grid">
      <article class="card">
        <h3>What does “Untested” mean?</h3>
        <p>We have not validated the feature on that device yet. Treat it as unknown until someone confirms it.</p>
      </article>
      <article class="card">
        <h3>How should we mark partial support?</h3>
        <p>Use “Partial” when a feature works with limitations, extra steps, or only under specific builds.</p>
      </article>
      <article class="card">
        <h3>Where should fixes or quirks be documented?</h3>
        <p>Add a short note in the matrix and link to the wiki or device page for the full details.</p>
      </article>
    </div>
  </section>

  <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What does \"Untested\" mean?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We have not validated the feature on that device yet. Treat it as unknown until someone confirms it."
          }
        },
        {
          "@type": "Question",
          "name": "How should we mark partial support?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Use \"Partial\" when a feature works with limitations, extra steps, or only under specific builds."
          }
        },
        {
          "@type": "Question",
          "name": "Where should fixes or quirks be documented?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Add a short note in the matrix and link to the wiki or device page for the full details."
          }
        }
      ]
    }
  </script>
</main>

<footer class="site-footer">
  {% include vendor-strip.html %}
  <p>&copy; 2025 REG Linux. Retro Emulation Gaming Linux is free, open source, and community supported.</p>
  <p class="small">Board metadata sourced from <a href="https://reglinux.org" target="_blank" rel="noreferrer">reglinux.org</a>.</p>
</footer>
