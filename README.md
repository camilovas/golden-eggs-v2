# Golden Eggs — Portfolio v2

Portfolio profesional de Camilo Vasquez, desarrollador Full Stack & consultor de software.

**Demo**: https://camilovas.github.io/golden-eggs-v2/

## Stack

- HTML5 + Tailwind CSS (CDN) + Vanilla JS
- HumanGuard SDK para protección del formulario de contacto
- i18n: Español / Inglés sin librerías externas

## Deploy en GitHub Pages

1. Crear repo público `camilovas/golden-eggs-v2`
2. Push del código a `main`
3. Settings → Pages → Deploy from branch `main` / `/ (root)`
4. El sitio queda disponible en `https://camilovas.github.io/golden-eggs-v2/`

## Personalización

- **Textos**: editar `js/main.js` — objeto `translations` (es/en)
- **WhatsApp**: actualizar número en `index.html` → `href="https://wa.me/57XXXXXXXXXX"`
- **Proyectos**: sección `#projects` en `index.html`
- **Site key HumanGuard**: `HG_SITE_KEY` en `js/main.js`

## Desarrollo local

Abrir `index.html` directamente en el browser — no requiere servidor ni build step.
