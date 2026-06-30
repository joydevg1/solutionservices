const RENDER_API = "https://solution-services-api.onrender.com";

export async function onRequest(context) {
  const request = context.request;
  const url = new URL(request.url);
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
