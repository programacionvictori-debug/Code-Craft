# CodeCraft — sitio web

Sitio de 7 páginas con URLs limpias (sin `.html`), CSS y JS compartidos. Publicado en GitHub Pages como repositorio de proyecto sin dominio propio, en:

`https://programacionvictori-debug.github.io/Code-Craft/`

Por eso todas las rutas absolutas del sitio (enlaces, assets, canonical, og:url, sitemap, robots) llevan el prefijo `/Code-Craft`. Si más adelante conectas un dominio propio, ese prefijo debe quitarse de todos los archivos (ver README de la guía de URLs limpias).

## Estructura (URLs limpias vía carpeta + index.html)

```
codecraft-site/
├── index.html                          → Portada                         → /Code-Craft/
├── servicios/index.html                → Servicios, precios y FAQ        → /Code-Craft/servicios/
├── sobre-nosotros/index.html           → Misión, valores y equipo        → /Code-Craft/sobre-nosotros/
├── legal/
│   ├── aviso-legal/index.html          → /Code-Craft/legal/aviso-legal/
│   ├── privacidad/index.html           → /Code-Craft/legal/privacidad/
│   └── cookies/index.html              → /Code-Craft/legal/cookies/
├── 404.html                            → Página de error (debe vivir en la raíz)
├── .nojekyll                           → Evita el procesado Jekyll de GitHub Pages
├── assets/
│   ├── css/
│   │   └── styles.css                  → Todo el CSS del sitio, un solo archivo
│   ├── js/
│   │   ├── site.js                     → Compartido: menú móvil, banner de cookies, carga de GA4
│   │   └── home.js                     → Solo home: terminal animada, validación de formulario, Calendly
│   └── favicon/
├── sitemap.xml
├── robots.txt

```

Todos los enlaces internos y las rutas a `assets/` usan rutas absolutas con el prefijo `/Code-Craft` (por ejemplo `/Code-Craft/assets/css/styles.css`), así que funcionan igual sin importar la profundidad de la carpeta desde la que se sirvan, mientras el sitio siga publicado bajo ese subpath.

## Checklist de placeholders — reemplazar antes de publicar en serio

| Dónde | Qué reemplazar |
| --- | --- |
| `assets/js/*` (`SITE_CONFIG`) | `FORMSPREE_ENDPOINT`, `CALENDLY_URL`, `GA4_MEASUREMENT_ID` con las cuentas reales |
| `sobre-nosotros/index.html` | Nombres, roles y bios reales del equipo (hoy: "Nombre Apellido") |
| `servicios/index.html` | Precios reales en vez de los marcados en color cian |
| `legal/*` | Razón social, NIF/RFC, domicilio, país y jurisdicción — **revisar con un abogado** antes de publicar |
| Portafolio (`index.html`) | Los 3 proyectos siguen siendo de muestra |
| Todo el sitio | Si conectas un dominio propio, quitar el prefijo `/Code-Craft` de enlaces, assets, canonical, og:url, sitemap.xml y robots.txt |
