# Guía: poner en marcha el panel de administración

Esta guía cubre lo que falta para que el panel funcione de verdad: la app de GitHub, el proxy de login, la configuración final, activar GitHub Actions para publicar, y dar acceso a tus 2 colaboradoras.

Nada de esto tiene costo — todo corre en capas gratuitas (GitHub, GitHub Pages, GitHub Actions, Cloudflare Workers).

## Antes de empezar: reemplaza tu repositorio

El contenido de `codecraft-site-panel-admin.zip` reemplaza **todo** tu repositorio actual — la forma en que el sitio está armado por dentro cambió (de HTML fijo a Eleventy). Visualmente es idéntico a lo que ya tenías, más las secciones nuevas ya entregadas (blog, casos de éxito, testimonios).

1. Borra el contenido actual de tu repo local (o clónalo de nuevo) y copia todo el contenido del zip en su lugar.
2. Confirma que `node_modules/` y `_site/` **no** se suban al repo (ya vienen excluidos en `.gitignore`).
3. Haz commit y push de todo a `main`.

## Paso 1 — Crear la app OAuth en GitHub

Esto es lo que le permite a Decap CMS pedir "Iniciar sesión con GitHub".

1. Ve a **github.com → tu foto de perfil → Settings → Developer settings → OAuth Apps → New OAuth App**.
2. Completa:
   - **Application name**: `CodeCraft CMS`
   - **Homepage URL**: `https://programacionvictori-debug.github.io/Code-Craft/`
   - **Authorization callback URL**: `https://codecraft-cms-auth.TU-SUBDOMINIO.workers.dev/callback` (el subdominio lo defines en el paso 2 — puedes volver aquí después a completarlo).
3. Al crearla, GitHub te da un **Client ID**. Genera también un **Client Secret** (botón "Generate a new client secret") y guárdalo — no se vuelve a mostrar.

## Paso 2 — Desplegar el proxy de login (Cloudflare Workers)

1. Crea una cuenta gratuita en [cloudflare.com](https://dash.cloudflare.com/sign-up) si no tienes una.
2. En el dashboard: **Workers & Pages → Create → Create Worker**. Ponle un nombre, por ejemplo `codecraft-cms-auth` (el nombre define tu subdominio: `codecraft-cms-auth.tu-cuenta.workers.dev`).
3. Abre el editor del Worker y **reemplaza todo el código** por el contenido de `oauth-worker/worker.js` (incluido en el zip). Guarda y despliega ("Deploy").
4. Ve a **Settings → Variables and Secrets** de ese Worker y agrega dos secrets:
   - `GITHUB_CLIENT_ID` → el Client ID del paso 1
   - `GITHUB_CLIENT_SECRET` → el Client Secret del paso 1
5. Copia la URL final de tu Worker (algo como `https://codecraft-cms-auth.tu-cuenta.workers.dev`) y complétala en la **Authorization callback URL** de la app de GitHub del paso 1, agregando `/callback` al final.

*(Alternativa por línea de comandos, si prefieres: `npx wrangler deploy` desde la carpeta `oauth-worker/`, y `npx wrangler secret put GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`. El archivo `wrangler.toml` ya está listo.)*

## Paso 3 — Completar `src/admin/config.yml`

Abre `src/admin/config.yml` en el repo y ajusta dos líneas:

```yaml
backend:
  repo: TU-USUARIO/TU-REPO          # confirma que sea exactamente el nombre de tu repositorio
  base_url: https://codecraft-cms-auth.tu-cuenta.workers.dev   # la URL del Worker del paso 2
```

Haz commit y push de ese cambio.

## Paso 4 — Activar la publicación automática (GitHub Actions)

1. En tu repositorio de GitHub: **Settings → Pages**.
2. En "Build and deployment" → **Source**, cambia de "Deploy from a branch" a **"GitHub Actions"**.
3. Con el workflow ya incluido (`.github/workflows/deploy.yml`), cualquier `push` a `main` reconstruirá el sitio y lo publicará solo. Puedes verlo correr en la pestaña **Actions** del repo.

## Paso 5 — Dar acceso a las 2 personas

1. En tu repositorio: **Settings → Collaborators → Add people**.
2. Agrega la cuenta de GitHub de cada persona, con rol **Write** (necesitan poder hacer commits).
3. Cada una entra a `https://programacionvictori-debug.github.io/Code-Craft/admin/` y hace clic en "Login with GitHub" — inician sesión con su propia cuenta, no hay contraseñas nuevas que crear ni compartir.

## Paso 6 — Probar de punta a punta

1. Entra a `/admin/`, inicia sesión, y edita algo pequeño (por ejemplo, un precio en la colección **Precios**).
2. Guarda ("Publish" / "Save" según la colección). Esto crea un commit en tu repo automáticamente.
3. Ve a la pestaña **Actions** de GitHub y espera a que el workflow termine (~1 minuto).
4. Refresca el sitio publicado y confirma que el cambio aparece.

## Preguntas frecuentes

**¿Qué pasa si dos personas editan al mismo tiempo?**
Cada guardado es un commit independiente. Si ambas editan el *mismo* archivo casi al mismo tiempo, Git puede pedir resolver un conflicto — para contenido como blog o testimonios (archivos distintos por entrada) esto casi nunca pasa; es más probable en `precios.json`, que es un solo archivo compartido.

**¿Puedo revisar los cambios antes de que se publiquen?**
Sí. En `src/admin/config.yml`, cambia `publish_mode` a `editorial_workflow` (está comentado como sugerencia en el archivo). Esto agrega un flujo de borrador → revisión → publicación con Pull Requests, en vez de publicar directo.

**¿Cómo agrego una tercera persona más adelante?**
Repite el paso 5 — no hay que tocar el panel ni el código.

**¿Qué pasa si conecto un dominio propio después?**
Cambia `ELEVENTY_PATH_PREFIX: "/Code-Craft/"` a `"/"` en `.github/workflows/deploy.yml`, y actualiza `site_url`/`display_url`/`logo_url` en `src/admin/config.yml` y `public_folder` (quitando el prefijo `/Code-Craft`). Avísame cuando llegue ese momento y te lo dejo ajustado.
