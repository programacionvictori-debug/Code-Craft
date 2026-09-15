# CodeCraft — sitio web

Mockup funcional de 7 páginas, con CSS y JS compartidos. Aún no está publicado en un dominio real ni conectado a servicios externos reales (ver checklist abajo).

## Estructura

```
codecraft-site/
├── index.html                 → Página de inicio (antes "codecraft-home.html")
├── servicios.html              → Detalle de ambos servicios, precios orientativos y FAQ
├── sobre-nosotros.html         → Misión, valores y equipo
├── 404.html                    → Página de error personalizada
├── legal/
│   ├── aviso-legal.html
│   ├── privacidad.html
│   └── cookies.html
├── assets/
│   ├── css/
│   │   └── styles.css          → Todo el CSS del sitio, un solo archivo
│   ├── js/
│   │   ├── site.js             → Compartido: menú móvil, banner de cookies, carga de GA4
│   │   └── home.js             → Solo home: terminal animada, validación de formulario, Calendly
│   └── favicon/
│       └── favicon.svg         → Favicon provisional (punto cian sobre fondo oscuro)
├── sitemap.xml
├── robots.txt

```

Cada página trae un pequeño bloque `<script>window.SITE_CONFIG = {...}</script>` antes de cargar `site.js`, con la configuración propia de esa página (claves de Formspree, Calendly, Google Analytics).

## Qué se agregó en esta vuelta (SEO técnico + 404)

- Meta descripción, Open Graph y Twitter Card en las 7 páginas.
- Datos estructurados (Schema.org) de tipo `ProfessionalService` en la home y `Service` en Servicios.
- `sitemap.xml` y `robots.txt`, listos para cuando el sitio tenga dominio real.
- Favicon SVG provisional.
- Página 404 personalizada, con `noindex` para que no la indexen los buscadores.
- Se separó el CSS y el JS que antes vivían embebidos en el HTML de la home, para que las 7 páginas compartan un mismo stylesheet y no haya que repetir estilos.

## Checklist de placeholders — reemplazar antes de publicar

| Dónde | Qué reemplazar |
| --- | --- |
| Todas las páginas (`<head>`) | `https://www.codecraft.dev` es un dominio ficticio — usar el dominio real en canonical, Open Graph y Twitter Card |
| `assets/js/*` (`SITE_CONFIG`) | `FORMSPREE_ENDPOINT`, `CALENDLY_URL`, `GA4_MEASUREMENT_ID` con las cuentas reales |
| `sitemap.xml` / `robots.txt` | Cambiar `www.codecraft.dev` por el dominio real |
| `assets/favicon/favicon.svg` | Reemplazar por el logo real cuando esté diseñado |
| `assets/favicon/og-preview.png` | **No existe todavía** — crear esta imagen (1200×630px) para que las tarjetas de redes sociales se vean bien |
| `sobre-nosotros.html` | Nombres, roles y bios reales del equipo (hoy: "Nombre Apellido") |
| `servicios.html` | Precios reales en vez de los marcados en <span style="color:#2DD4EE">cian</span> |
| `legal/*.html` | Razón social, NIF/RFC, domicilio, país y jurisdicción — **revisar con un abogado** antes de publicar |
| Portafolio (`index.html`) | Los 3 proyectos siguen siendo de muestra, pendiente de la fase de "contenido real" |

## Próximos pasos sugeridos

1. Contenido real: textos definitivos, precios, equipo, 1-2 proyectos propios.
2. Conectar formulario (Formspree o backend propio) y Calendly reales.
3. Registrar dominio, crear repositorio en GitHub y desplegar (Vercel/Netlify).
4. Crear la imagen `og-preview.png` y el logo/favicon definitivos.
5. Dar de alta el sitio en Google Search Console una vez publicado.
