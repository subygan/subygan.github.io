---
layout: base
emoji:  ☁
title: local tunnels with cloudflare
description: notes while tinkering with ruby
date: 2021-07-06 22:15:00
tags: ["tech", "programming"]
---

# Exposing Local Services with Cloudflare Tunnels

Cloudflare Tunnels let you expose local services to the internet without opening ports or configuring firewalls. Here's how to set it up.

## Quick and Dirty: Anonymous Tunnels


```bash
brew install cloudflared
cloudflared tunnel --url http://localhost:8787
```

This gives you a random `https://xxx.trycloudflare.com` URL that proxies to your local port. Great for testing webhooks or sharing something temporarily. The URL dies when you kill the process.

Need multiple services? Run multiple instances:

```bash
cloudflared tunnel --url http://localhost:8787  # https://aaa.trycloudflare.com
cloudflared tunnel --url http://localhost:3000  # https://bbb.trycloudflare.com
```

Each gets its own random URL.

## Named Tunnels: Persistent Setup with Custom Domains

For a permanent setup with your own domain, you need a named tunnel.

### 1. Authenticate and create the tunnel

```bash
# Opens browser for OAuth
cloudflared tunnel login

# Creates tunnel + generates credentials file automatically
cloudflared tunnel create my-tunnel
```

The output tells you where the credentials file landed:

```
Created tunnel my-tunnel with id xxxx-xxxx-xxxx
Credentials written to ~/.cloudflared/xxxx-xxxx-xxxx.json
```

### 2. Point DNS at your tunnel

Your domain must be managed by Cloudflare (nameservers pointing to Cloudflare).

```bash
cloudflared tunnel route dns my-tunnel oread.yourdomain.com
```

This creates a CNAME record in Cloudflare DNS that routes traffic for that hostname into your tunnel.

### 3. Configure which local services handle which hostnames

Create `~/.cloudflared/config.yml`:

```yaml
tunnel: my-tunnel
credentials-file: ~/.cloudflared/xxxx-xxxx-xxxx.json

ingress:
  - hostname: oread.yourdomain.com
    service: http://localhost:8787
  - service: http_status:404  # catch-all (required)
```

The catch-all at the bottom is mandatory. Without it, cloudflared won't start.

### 4. Run it

```bash
cloudflared tunnel run
```

## Multiple Services, One Tunnel

This is where named tunnels shine. Route several hostnames to different local ports through a single `cloudflared` process:

```bash
# DNS: point multiple subdomains to the same tunnel
cloudflared tunnel route dns my-tunnel oread.yourdomain.com
cloudflared tunnel route dns my-tunnel api.yourdomain.com
cloudflared tunnel route dns my-tunnel grafana.yourdomain.com
```

```yaml
# config.yml: dispatch by hostname
tunnel: my-tunnel
credentials-file: ~/.cloudflared/xxxx-xxxx-xxxx.json

ingress:
  - hostname: oread.yourdomain.com
    service: http://localhost:8787
  - hostname: api.yourdomain.com
    service: http://localhost:3000
  - hostname: grafana.yourdomain.com
    service: http://localhost:3001
  - service: http_status:404
```

The flow:

```
oread.yourdomain.com   -->  Cloudflare DNS  -->  tunnel  -->  localhost:8787
api.yourdomain.com     -->  Cloudflare DNS  -->  tunnel  -->  localhost:3000
grafana.yourdomain.com -->  Cloudflare DNS  -->  tunnel  -->  localhost:3001
```

Cloudflared matches on the `Host` header of the incoming request to pick the right ingress rule. If you only have one service, the hostname match is redundant -- everything hitting the tunnel goes to one place. But it matters when you have multiple.

## How the Pieces Fit Together

Two things need to agree:

- **`tunnel route dns`** maps an external hostname to your tunnel at the DNS level
- **`config.yml` ingress** maps that hostname to a local port inside the tunnel

They're independent configurations that must use the same hostname. The DNS route gets the traffic to your tunnel. The ingress rule decides where it goes locally.


I've found it quiet helpful often