const RENDER_API = "https://solution-services-api.onrender.com";

/**
 * Intercepts /api/* before the SPA fallback and proxies to Render.
 */
export async function onRequest(context) {
  const request = context.request;
  const url = new URL(request.url);

  if (!url.pathname.startsWith("/api")) {
    return context.next();
  }

  const apiPath = url.pathname.replace(/^\/api/, "") || "/";
  const targetUrl = `${RENDER_API}/api${apiPath}${url.search}`;

  const headers = new Headers(request.headers);
  headers.delete("host");

  const init = {
    method: request.method,
    headers,
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = await request.arrayBuffer();
  }

  return fetch(targetUrl, init);
}
