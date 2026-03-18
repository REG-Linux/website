---
layout: default
title: Supported Devices
permalink: /devices/
body_class: devices
description: Browse all devices supported by REG Linux — handhelds, SBCs, TV boxes, and PCs.
---
{% assign devices_data = site.data.devices %}
{% assign manufacturers = site.data.manufacturers %}
{% include site-header.html nav_current="devices" %}

<main>
  <section class="hero">
    <div class="hero-text">
      <p class="eyebrow">Hardware support</p>
      <h1>Supported devices</h1>
      <p class="lede">
        {{ devices_data.size }} devices across ARM, AArch64, RISC-V, and x86_64. Find yours, check compatibility, and download.
      </p>
      <div class="hero-cta">
        <a class="btn primary" href="{{ '/download/' | relative_url }}">Download</a>
        <a class="btn secondary" href="https://compat.reglinux.org">Compatibility matrix</a>
      </div>
    </div>
  </section>

  <section class="device-browser" id="device-list">
    <div class="device-filters" id="device-filters">
      <input type="text" id="device-search" placeholder="Search by name, brand, or SoC..." class="device-search" />
      <div class="filter-row">
        <div class="filter-group" id="type-filters">
          <button class="filter-btn active" data-filter="all">All</button>
          <button class="filter-btn" data-filter="handheld">Handhelds</button>
          <button class="filter-btn" data-filter="sbc">SBCs</button>
          <button class="filter-btn" data-filter="tvbox">TV Boxes</button>
          <button class="filter-btn" data-filter="pc">PCs</button>
          <button class="filter-btn" data-filter="console">Consoles</button>
        </div>
      </div>
    </div>

    <p class="device-count" id="device-count"></p>

    <div class="device-grid" id="device-grid">
      {% assign sorted_devices = devices_data | sort %}
      {% for entry in sorted_devices %}
        {% assign slug = entry[0] %}
        {% assign device = entry[1] %}
        {% assign soc_name = device.soc | first | default: "" %}
        {% assign device_type = "unknown" %}
        {% if slug contains "rg" or slug contains "rgb" or slug contains "pocket" or slug contains "odin" or slug contains "gameforce" or slug contains "powkiddy" or slug contains "odroid-go" or slug contains "ayaneo" or slug contains "trimui" or slug contains "miniloong" or slug contains "mangmi" %}
          {% assign device_type = "handheld" %}
        {% elsif slug contains "steam-deck" or slug contains "rog-ally" %}
          {% assign device_type = "pc" %}
        {% elsif slug contains "x96" or slug contains "h96" or slug contains "a95x" or slug contains "tx3" or slug contains "nexbox" or slug contains "wetek" or slug contains "tronsmart" or slug contains "mxiii" or slug contains "beelink" %}
          {% assign device_type = "tvbox" %}
        {% elsif slug contains "capcom" or slug contains "nintendo" %}
          {% assign device_type = "console" %}
        {% elsif slug contains "raspberry" or slug contains "banana-pi" or slug contains "orange-pi" or slug contains "khadas" or slug contains "radxa" or slug contains "firefly" or slug contains "milk-v" or slug contains "starfive" or slug contains "pine64" or slug contains "tinker" or slug contains "miqi" %}
          {% assign device_type = "sbc" %}
        {% endif %}
        <a class="device-card" href="{{ '/download/' | append: slug | append: '/' | relative_url }}"
           data-type="{{ device_type }}"
           data-brand="{{ device.brand | downcase }}"
           data-soc="{{ soc_name | downcase }}"
           data-title="{{ device.title | downcase }}">
          <div class="device-media">
            {% if device.image and device.image != "" %}
              {% assign img_small = device.image | replace: '.webp', '-sm.webp' %}
              <img src="{{ device.image | relative_url }}" alt="{{ device.title }}" loading="lazy" decoding="async"
                   {% if device.image_width %}width="{{ device.image_width }}" height="{{ device.image_height }}"
                   srcset="{{ img_small | relative_url }} {{ device.image_width | divided_by: 2 }}w, {{ device.image | relative_url }} {{ device.image_width }}w"
                   sizes="140px"{% endif %} />
            {% endif %}
          </div>
          <div class="device-info">
            <strong class="device-name">{{ device.title }}</strong>
            <span class="device-soc">{{ soc_name }}</span>
            <span class="device-type-badge device-type-{{ device_type }}">{{ device_type }}</span>
          </div>
        </a>
      {% endfor %}
    </div>
  </section>

  <!-- Manufacturers -->
  <section class="manufacturer-section">
    <div class="section-heading">
      <p class="eyebrow">Manufacturers</p>
      <h2>Hardware makers</h2>
    </div>
    <div class="manufacturer-grid">
      {% assign sorted_manufacturers = manufacturers | sort: "name" %}
      {% for mfr in sorted_manufacturers %}
        {% assign mfr_count = 0 %}
        {% for d in devices_data %}
          {% if d[1].brand == mfr.id %}
            {% assign mfr_count = mfr_count | plus: 1 %}
          {% endif %}
        {% endfor %}
        {% if mfr_count > 0 %}
        <a href="{{ mfr.url }}" target="_blank" rel="noreferrer" class="manufacturer-card" title="{{ mfr.name }}">
          <div class="mfr-logo">
            <img src="{{ mfr.logo_image | relative_url }}" alt="{{ mfr.name }}" loading="lazy" />
          </div>
          <div class="mfr-info">
            <strong>{{ mfr.name }}</strong>
            <span class="mfr-count">{{ mfr_count }} device{{ mfr_count | minus: 1 | at_least: 1 | divided_by: 1 }}{% if mfr_count != 1 %}s{% endif %}</span>
          </div>
        </a>
        {% endif %}
      {% endfor %}
    </div>
  </section>
</main>

<style>
  .device-search {
    width: 100%;
    max-width: 400px;
    padding: 0.6rem 1rem;
    background: var(--bg-soft, #0c101c);
    border: 1px solid var(--border, rgba(255,255,255,0.08));
    border-radius: 999px;
    color: var(--text, #f4f6fb);
    font-size: 0.9rem;
    outline: none;
    margin-bottom: 0.75rem;
  }
  .device-search:focus {
    border-color: var(--accent, #2bb0e9);
  }
  .filter-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  .filter-group {
    display: flex;
    flex-wrap: wrap;
    gap: 0.3rem;
  }
  .filter-btn {
    padding: 0.3rem 0.8rem;
    border-radius: 999px;
    border: 1px solid var(--border, rgba(255,255,255,0.08));
    background: transparent;
    color: var(--text-muted, #b2bed1);
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s;
  }
  .filter-btn:hover { color: var(--text, #f4f6fb); border-color: var(--accent, #2bb0e9); }
  .filter-btn.active { background: var(--accent, #2bb0e9); color: #030915; border-color: var(--accent, #2bb0e9); }
  .device-count {
    font-size: 0.8rem;
    color: var(--text-muted, #b2bed1);
    margin: 0 0 1rem;
  }
  .device-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }
  @media (max-width: 900px) { .device-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 560px) { .device-grid { grid-template-columns: 1fr; } }
  .device-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.25rem;
    background: var(--card, rgba(12,16,28,0.75));
    border: 1px solid var(--border, rgba(255,255,255,0.08));
    border-radius: var(--radius, 18px);
    box-shadow: var(--shadow, 0 25px 60px rgba(3,9,27,0.55));
    text-decoration: none;
    color: var(--text, #f4f6fb);
    transition: transform 0.15s, border-color 0.15s;
  }
  .device-card:hover {
    transform: translateY(-2px);
    border-color: var(--accent, #2bb0e9);
    text-decoration: none;
  }
  .device-card[data-hidden="true"] { display: none; }
  .device-media { width: 72px; height: 72px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
  .device-media img { max-width: 72px; max-height: 72px; object-fit: contain; border-radius: 8px; }
  .device-info { display: flex; flex-direction: column; gap: 0.2rem; min-width: 0; }
  .device-name { font-size: 0.95rem; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .device-soc { font-size: 0.78rem; color: var(--text-muted, #b2bed1); font-family: 'JetBrains Mono', monospace; }
  .device-type-badge {
    font-size: 0.68rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.03em;
    width: fit-content; padding: 0.1rem 0.45rem; border-radius: 999px;
  }
  .device-type-handheld { color: #2bb0e9; background: rgba(43,176,233,0.1); }
  .device-type-sbc { color: #a78bfa; background: rgba(167,139,250,0.1); }
  .device-type-tvbox { color: #f59e0b; background: rgba(245,158,11,0.1); }
  .device-type-pc { color: #f472b6; background: rgba(244,114,182,0.1); }
  .device-type-console { color: #22c55e; background: rgba(34,197,94,0.1); }
  .device-type-unknown { color: #6b7280; background: rgba(107,114,128,0.1); }
  .manufacturer-section { margin-top: 3rem; }
  .manufacturer-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
  .manufacturer-card {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.9rem 1.1rem;
    background: var(--card, rgba(12,16,28,0.75));
    border: 1px solid var(--border, rgba(255,255,255,0.08));
    border-radius: var(--radius, 18px);
    box-shadow: var(--shadow, 0 25px 60px rgba(3,9,27,0.55));
    text-decoration: none;
    color: var(--text, #f4f6fb);
    transition: transform 0.15s, border-color 0.15s;
  }
  .manufacturer-card:hover {
    transform: translateY(-2px);
    border-color: var(--accent, #2bb0e9);
    text-decoration: none;
  }
  .mfr-logo { width: 40px; height: 40px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
  .mfr-logo img { max-width: 40px; max-height: 40px; object-fit: contain; }
  .mfr-info { display: flex; flex-direction: column; gap: 0.1rem; }
  .mfr-info strong { font-size: 0.85rem; }
  .mfr-count { font-size: 0.72rem; color: var(--text-muted, #b2bed1); }
</style>

<script>
(function() {
  const search = document.getElementById('device-search');
  const grid = document.getElementById('device-grid');
  const countEl = document.getElementById('device-count');
  const typeFilters = document.getElementById('type-filters');
  const cards = Array.from(grid.querySelectorAll('.device-card'));
  let activeType = 'all';

  function filter() {
    const q = search.value.toLowerCase();
    let visible = 0;
    cards.forEach(function(card) {
      const title = card.dataset.title || '';
      const brand = card.dataset.brand || '';
      const soc = card.dataset.soc || '';
      const type = card.dataset.type || '';
      const matchesType = activeType === 'all' || type === activeType;
      const matchesSearch = !q || title.includes(q) || brand.includes(q) || soc.includes(q);
      const show = matchesType && matchesSearch;
      card.setAttribute('data-hidden', show ? 'false' : 'true');
      if (show) visible++;
    });
    countEl.textContent = visible + ' device' + (visible !== 1 ? 's' : '');
  }

  search.addEventListener('input', filter);

  typeFilters.addEventListener('click', function(e) {
    if (e.target.classList.contains('filter-btn')) {
      typeFilters.querySelector('.active').classList.remove('active');
      e.target.classList.add('active');
      activeType = e.target.dataset.filter;
      filter();
    }
  });

  filter();
})();
</script>

<footer class="site-footer">
  {% include vendor-strip.html %}
  <p>&copy; 2025 REG Linux. Retro Emulation Gaming Linux is free and community supported.</p>
</footer>
