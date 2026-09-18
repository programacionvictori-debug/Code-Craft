/**
 * Proxy de autenticación OAuth para Decap CMS, usando GitHub como backend.
 *
 * Qué hace:
 *  - GET /auth      -> redirige a GitHub para que el editor inicie sesión.
 *  - GET /callback  -> recibe el código de GitHub, lo cambia por un token de
 *                      acceso, y se lo entrega al panel (/admin/) mediante
 *                      postMessage, siguiendo el protocolo que espera Decap CMS.
 *
 * No guarda nada: no hay base de datos ni almacenamiento. Solo intermedia el
 * login para que el Client Secret de GitHub nunca quede expuesto en el navegador.
 *
 * Variables necesarias (configúralas como "Secrets" en Cloudflare, nunca en
 * este archivo):
 *   GITHUB_CLIENT_ID
 *   GITHUB_CLIENT_SECRET
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/auth") {
      return handleAuth(url, env);
    }
    if (url.pathname === "/callback") {
      return handleCallback(url, env);
    }
    return new Response("CodeCraft CMS auth proxy activo.", { status: 200 });
  },
};

function handleAuth(url, env) {
  const redirectUri = `${url.origin}/callback`;
  const githubUrl = new URL("https://github.com/login/oauth/authorize");
  githubUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
  githubUrl.searchParams.set("redirect_uri", redirectUri);
  githubUrl.searchParams.set("scope", "repo,user");

  return Response.redirect(githubUrl.toString(), 302);
}

async function handleCallback(url, env) {
  const code = url.searchParams.get("code");
  if (!code) {
    return new Response("Falta el parámetro 'code' de GitHub.", { status: 400 });
  }

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const tokenData = await tokenRes.json();

  if (tokenData.error) {
    return new Response(`Error de GitHub: ${tokenData.error_description || tokenData.error}`, {
      status: 400,
    });
  }

  const token = tokenData.access_token;

  // Handshake que espera Decap CMS: la ventana emergente avisa que está
  // lista, espera un mensaje del panel, y entonces le envía el token.
  const html = `<!DOCTYPE html>
<html><body>
<script>
(function() {
  function receiveMessage(e) {
    window.opener.postMessage(
      'authorization:github:success:' + JSON.stringify({ token: ${JSON.stringify(token)}, provider: 'github' }),
      e.origin
    );
    window.removeEventListener('message', receiveMessage, false);
  }
  window.addEventListener('message', receiveMessage, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script>
Puedes cerrar esta ventana.
</body></html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
