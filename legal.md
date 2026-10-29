---
layout: default
title: Legal
permalink: /legal/
body_class: credits
description: Licenses, source code, trademarks, disclaimers and how to contact the REG Linux project.
---
{% assign legal = site.data.legal %}
{% include site-header.html nav_current="legal" %}

<main>
  <section class="hero">
    <div class="hero-text" style="max-width: 760px; margin: 0 auto;">
      <p class="eyebrow">Legal</p>
      <h1>Licenses, source code and disclaimers</h1>
      <p class="lede">Plain-language summary. The license files shipped with each release are authoritative.</p>
    </div>
  </section>

  <section style="max-width: 760px; margin: 0 auto; line-height: 1.7;">

    <h2>What REG Linux is</h2>
    <p>REG Linux is a free-to-use, non-commercial project. It is a compilation of many components, each under its own license.</p>

    <h2>Open-source components</h2>
    <p>Most of the system is open source: the Linux kernel, the Buildroot-based system, emulators and libraries, under licenses such as GPL, LGPL, MIT and BSD. Source code for those components is available at
      <a href="https://github.com/REG-Linux/REG-Linux">github.com/REG-Linux/REG-Linux</a>. For GPL and LGPL components, you may also request the corresponding source for any release you received by opening an issue on that repository{% if legal.contact_email != "" %} or writing to <a href="mailto:{{ legal.contact_email }}">{{ legal.contact_email }}</a>{% endif %}.</p>
    <p>Upstream projects and their licenses are listed on the <a href="{{ '/credits/' | relative_url }}">credits page</a>. Each emulator remains the work of its authors and is subject to their license.</p>

    <h2>Components that are not open source</h2>
    <p>The REG-Station frontend and the REG system daemon are distributed in binary form, free of charge. They are not open source; the license shipped with each release sets out the terms of use and redistribution. Some hardware drivers and firmware are also proprietary and are redistributed under their vendors' terms.</p>

    <h2>Games, ROMs, BIOS and keys</h2>
    <p>REG Linux does not include commercial ROMs, BIOS files or encryption keys, and does not help obtain them. The few games that ship with the system are homebrew or are included with the permission of their authors or under open licenses. You are responsible for making sure you have the right to use any game or file you add.</p>

    <h2>Trademarks and affiliation</h2>
    <p>REG Linux is an independent project. It is not affiliated with, endorsed by or sponsored by any console, game, hardware or software company. All product names, logos and brands are property of their respective owners and are used for identification only, including to indicate hardware compatibility.</p>

    <h2>No warranty</h2>
    <p>REG Linux is provided "as is", without warranty of any kind. Flashing a device carries risk: back up your data, and use it at your own risk. To the extent permitted by law, the project and its contributors are not liable for damage to your device, data or anything else.</p>

    <h2>Donations</h2>
    <p>Donations, where offered, are voluntary gifts to support development. They do not buy features, support, source access or license rights, and they do not change the terms above.</p>

    <h2>Reporting content and contact</h2>
    <p>To report content, request a takedown, or ask a privacy question, open an issue on <a href="https://github.com/REG-Linux/website/issues">GitHub</a>{% if legal.contact_email != "" %} or write to <a href="mailto:{{ legal.contact_email }}">{{ legal.contact_email }}</a>{% endif %}. Please do not post personal information in public issues; use email for that.{% if legal.maintainer != "" %} Responsible for this site: {{ legal.maintainer }}.{% endif %}</p>

    <h2>Privacy</h2>
    <p>The compatibility service and its data handling are described in its <a href="https://compat.reglinux.org/privacy">privacy notice</a>. This website sets no tracking cookies of its own, but it loads fonts from Google Fonts, so Google receives your IP address when you visit.</p>
  </section>
</main>

{% include site-footer.html %}
