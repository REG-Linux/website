---
title: Network, SSH and Samba
description: Connect REG Linux to Wi-Fi, reach it over the network, the SSH and Samba logins, and how to protect them with a password.
---

# Network, SSH and Samba

## Wi-Fi

`NETWORK & SERVICES > NETWORK`: turn on **ENABLE WIFI**, pick your network in
**WIFI SSID** (or **MANUAL INPUT** for a hidden one), enter the **WIFI KEY**.
The same menu sets the **HOSTNAME** and can turn the device into a **HOTSPOT**.

Once connected, the device answers as `reglinux.local` on most home networks.

## Services

`NETWORK & SERVICES > SERVICES` turns the network services on and off. Samba
(file sharing) and SSH are on by default.

## Logins

| Service | Address | User | Password |
|---|---|---|---|
| Samba (file share) | `\\REGLINUX\share` (Windows), `smb://reglinux.local/share` (macOS, Linux) | none needed | none |
| SSH and SFTP | `reglinux.local`, port 22 | `root` | `linux` |

!!! warning "Protect your device on shared networks"
    Anyone on your network can use these logins. On a network you do not fully
    trust, turn on security (below). Changing the password with `passwd` does
    not last: with security off, REG Linux sets `linux` again.

## Security

`NETWORK & SERVICES > SECURITY > ENFORCE SECURITY`:

- REG Linux generates a random root password. It is shown in
  `NETWORK & SERVICES > SECURITY > ROOT PASSWORD`.
- SSH and SFTP use that password.
- The Samba share then asks for a login: user `root`, same password.

Turning security off brings back the `linux` password and guest access to the
share.

## SSH

```
ssh root@reglinux.local
```

Useful commands once logged in:

| Command | Use |
|---|---|
| `system-upgrade` | update the system (same as the menu) |
| `system-support` | create a support file in `/userdata/saves/` |
| `system-services list` | list the services and their state |
| `regmsg bios check` | list missing BIOS files |
