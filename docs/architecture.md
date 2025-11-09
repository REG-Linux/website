# System Architecture

REG Linux uses a minimal, immutable filesystem layout based on Buildroot.

- Init system: sysvinit (no systemd)
- Root filesystem: squashfs (read-only)
- User data: Can be an internal partition or external partition mounted at boot time to /userdata
