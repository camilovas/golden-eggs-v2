# SEO & Analytics — Golden Eggs v2

## Estado actual (2026-07-09)

- **Google Analytics 4**: `G-C75PNV9Z5W` (propiedad `rightline-429e3`, stream ID `2698706012`)
- **URL del stream GA4**: `https://camilovas.github.io/golden-eggs-v2`
- **Google Search Console**: propiedad `https://camilovas.github.io/golden-eggs-v2/` — creada y verificada automáticamente
- **Indexación manual solicitada**: 2026-07-09

---

## Historial de cambios

### 2026-07-09 — SEO completo (commit `92a0d37`)

Se reescribió el `<head>` de `index.html` con:

#### Title
```
Camilo Vasquez — Desarrollador Full Stack & Consultor de Software
```

#### Meta description (155 chars)
```
Desarrollador Full Stack con 10+ años de experiencia. Web, móvil, IA, chatbots y Power BI.
React, Next.js, Rust, Python, .NET. Soluciones reales a precio justo. ¡Hablemos!
```

#### Meta keywords
```
desarrollador full stack, consultor de software, desarrollo web, aplicaciones móviles,
chatbot WhatsApp, agentes IA, automatización, Power BI, React, Next.js, Rust, Python,
Android, freelance, Colombia, programador freelance, desarrollo de software
```

#### Canonical URL
```
https://camilovas.github.io/golden-eggs-v2/
```

#### Open Graph (LinkedIn / WhatsApp / Facebook)
- `og:type`, `og:url`, `og:title`, `og:description`, `og:locale`, `og:site_name`

#### Twitter Card
- `twitter:card`, `twitter:title`, `twitter:description`

#### JSON-LD estructurado (schema.org)
- Tipo: `Person`
- `knowsAbout`: 30 skills tecnológicos
- `hasOccupation`: Desarrollador Full Stack
- `makesOffer`: 7 servicios con nombre y descripción (Web, Móvil, Backend, IA, Chatbots, BI, ETL)

---

### 2026-07-09 — Migración GA4 desde golden-eggs-portfolio

- ID `G-C75PNV9Z5W` **eliminado** de `golden-eggs-portfolio/index.html`
- ID `G-C75PNV9Z5W` **agregado** a `golden-eggs-v2/index.html` (commit `3560c0e`)
- URL del flujo de datos actualizada en el panel de GA4 admin a `https://camilovas.github.io/golden-eggs-v2`

---

### 2026-07-09 — Sol Negro rebrand completo

Se aplicó la identidad de marca Sol Negro a todas las secciones del sitio:

**Paleta (`tailwind.config.js` — tokens `ge.*`)**
| Token | Hex | Uso |
|---|---|---|
| `ge-bg` | `#0A0705` | Fondo principal |
| `ge-alt` | `#0E0B08` | Secciones alternadas |
| `ge-surface` | `#140F09` | Cards |
| `ge-gold` | `#D9A441` | Acento principal |
| `ge-amber` | `#C25E00` | Acento secundario |
| `ge-photon` | `#FFD37A` | Hover / highlight |
| `ge-cream` | `#F2E9DC` | Texto principal |
| `ge-muted` | `#a08d76` | Texto secundario |
| `ge-faint` | `#7a6c58` | Texto terciario |

**Logo animado (`SolNegroMark.jsx`)**
- SVG con anillo orfebrería precolombino que rota 360° en 40s (clase `.solnegro-ring`)
- Div estático central (agujero negro) posicionado sobre el SVG con `position: absolute`
- Acepta prop `size` (default 64px). Usos: Navbar (36px), Footer (26px), Contact (72px / 22px)
- `prefers-reduced-motion` desactiva la animación

**Secciones actualizadas**: Navbar, Footer, Hero, Services, About, Differentiators, Process, Projects, Testimonials, WhatsAppButton, Contact

---

## Google Search Console — guía rápida

- **URL**: [search.google.com/search-console](https://search.google.com/search-console)
- **Propiedad**: `https://camilovas.github.io/golden-eggs-v2/`
- **Re-indexar manualmente**: Inspección de URLs → pegar URL → Solicitar indexación
- **Ver posiciones en Google**: Rendimiento → Consultas
- **Sitemap**: no configurado (sitio de 1 sola página, no crítico)

---

## Notas de referencia

- La propiedad de Search Console se verificó automáticamente porque `camilovas.github.io` ya estaba verificada con otra propiedad (`golden-eggs-portfolio`).
- GA4 tarda hasta 48h en mostrar datos tras un nuevo dominio o tag.
- Search Console tarda 1-2 semanas en mostrar datos de rendimiento (clics, impresiones, posición).
- El sitio es una SPA en React/Vite — Google puede renderizar JavaScript, pero sin SSR la indexación puede tardar más. Si se migra a Next.js en el futuro, el SEO mejora automáticamente.
