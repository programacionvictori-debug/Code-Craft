# CodeCraft — sitio web (Eleventy + Decap CMS)

El sitio dejó de ser HTML escrito a mano: ahora se genera con **Eleventy** a partir de plantillas (`src/_includes/`) y contenido (`src/_data/`, `src/proyectos/`, `src/blog/`, `src/testimonios/`). Un panel de administración (**Decap CMS**, en `/admin/`) permite editar ese contenido desde el navegador, sin tocar código.

Publicado en: `https://programacionvictori-debug.github.io/Code-Craft/`

## Cómo está armado

```
codecraft-site/
├── .eleventy.js              → configuración de Eleventy (pathPrefix, colecciones)
├── package.json
├── .github/workflows/deploy.yml   → reconstruye y publica el sitio en cada cambio
├── oauth-worker/              → proxy de login para el panel (Cloudflare Worker)
│   ├── worker.js
│   └── wrangler.toml
├── src/
│   ├── admin/                 → panel Decap CMS
│   │   ├── index.html
│   │   └── config.yml         → define qué es editable (Blog, Proyectos, Precios, Testimonios)
│   ├── _includes/             → plantillas (layouts y partials de nav/footer)
│   ├── _data/
│   │   ├── site.js            → dominio, email, IDs de cuentas externas
│   │   ├── precios.json       → editable desde el panel
│   │   └── equipo.json        → bios del equipo (no editable por el panel todavía)
│   ├── proyectos/             → colección: un .md por caso de éxito, editable desde el panel
│   ├── blog/posts/            → colección: un .md por artículo, editable desde el panel
│   ├── testimonios/           → colección: un .md por testimonio, editable desde el panel
│   ├── legal/                 → páginas legales (no editables por el panel; requieren revisión legal)
│   ├── assets/                → CSS, JS e imágenes, sin cambios
│   ├── index.njk, servicios.njk, sobre-nosotros.njk, 404.njk
│   └── robots.txt
└── docs/
    └── Estado_Proyecto_CodeCraft.docx
```

## Desarrollo local

```bash
npm install
npm run serve     # levanta el sitio en http://localhost:8080 con recarga automática
npm run build      # genera el sitio final en _site/
```

## Publicación

Cada `git push` a `main` dispara `.github/workflows/deploy.yml`, que reconstruye el sitio con Eleventy y lo publica en GitHub Pages automáticamente (tarda ~1 minuto). **Importante:** en GitHub, ve a *Settings → Pages* y cambia el "Source" a **GitHub Actions** (ya no "Deploy from a branch") — ver la guía de despliegue para el detalle completo.

## Panel de administración

Ver la guía **`GUIA_PANEL_ADMINISTRACION.md`** para la puesta en marcha completa: crear la app de GitHub, desplegar el proxy de login (`oauth-worker/`), configurar `src/admin/config.yml`, y dar acceso a las personas que van a publicar contenido.

## Qué es editable desde el panel (y qué no)

| Contenido | Desde el panel | Dónde vive |
| --- | --- | --- |
| Artículos de blog | Sí | `src/blog/posts/*.md` |
| Casos de éxito / proyectos | Sí | `src/proyectos/*.md` |
| Precios y paquetes | Sí | `src/_data/precios.json` |
| Testimonios | Sí | `src/testimonios/*.md` |
| Equipo (Sobre nosotros) | No (v1) | `src/_data/equipo.json` |
| Páginas legales | No — requieren revisión de un abogado | `src/legal/*.njk` |
| Diseño, CSS, layouts | No — requiere tocar código | `src/_includes/`, `src/assets/css/` |

## Checklist de placeholders — reemplazar antes de publicar en serio

| Dónde | Qué reemplazar |
| --- | --- |
| `src/_data/site.js` | `formspreeEndpoint`, `calendlyUrl`, `ga4Id` con las cuentas reales |
| `src/_data/equipo.json` | Nombres, roles y bios reales del equipo |
| `src/_data/precios.json` (o el panel) | Precios reales en vez de los marcados con `$XXX` |
| `src/legal/*.njk` | Razón social, NIF/RFC, domicilio, país y jurisdicción — **revisar con un abogado** |
| `src/proyectos/*.md` y `src/testimonios/*.md` (o el panel) | Proyectos y testimonios reales |
| `src/admin/config.yml` | `backend.repo` y `backend.base_url` con tus valores reales |
| Todo el sitio | Si conectas un dominio propio, cambiar `ELEVENTY_PATH_PREFIX` a `/` en `.github/workflows/deploy.yml` |
