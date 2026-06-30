/**
 * Proxy /api/* to Render so the frontend can use same-origin /api (no CORS).
 */
export async function onRequest(context) {
  const request = context.request;
  const url = new URL(request.url);
  const apiPath = url.pathname.replace(/^\/api/, "") || "/";
  const targetUrl = `https://solution-services-api.onrender.com/api${apiPath}${url.search}`;

  const headers = new Headers(request.headers);
  headers.delete("host");

  const init = {
    method: request.method,
    headers,
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = await request.arrayBuffer();
  }

  const response = await fetch(targetUrl, init);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}
