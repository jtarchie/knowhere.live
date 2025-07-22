export async function onRequest(context) {
  const timeout = 1500;
  const request = context.request;
  const modifyURL = new URL(
    context.env.API_URL || "https://api.knowhere.live",
  );
  const url = new URL(request.url.replace("/proxy/", "/"));

  url.protocol = modifyURL.protocol;
  url.hostname = modifyURL.hostname;
  url.port = modifyURL.port;

  const newRequest = new Request(url, request);
  let response = await fetch(newRequest, {
    cf: {
      cacheTtl: timeout,
      cacheEverything: true,
    },
    headers: {
      "Host": `${url.hostname}:${url.port}`,
      "User-Agent": request.headers.get("User-Agent"),
      "Accept": request.headers.get("Accept"),
      "Accept-Encoding": request.headers.get("Accept-Encoding"),
    },
  });

  // Reconstruct the Response object to make its headers mutable.
  response = new Response(response.body, response);
  // Set cache control headers to cache on browser for 25 minutes
  response.headers.set("Cache-Control", `max-age=${timeout}`);
  return response;
}
