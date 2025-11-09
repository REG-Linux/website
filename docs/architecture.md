# System Architecture

REG Linux uses a minimal, immutable filesystem layout based on Buildroot.

- Init system: sysvinit (no systemd)
- Root filesystem: squashfs (read-only)
- User data: overlay mounted from /userdata
