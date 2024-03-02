export async function onRequest(context) {
  const request = context.request;
  const url = new URL(request.url);

  url.protocol = "https:";
  url.hostname = "knowhere.fly.dev";
  url.port = "443";

  const newRequest = new Request(url, request);
  let response = await fetch(newRequest, {
    cf: {
      // Always cache this fetch regardless of content type
      // for a max of 5 seconds before revalidating the resource
      cacheTtl: 5,
      cacheEverything: true,
    },
    headers: {
      "Host": `${url.hostname}:${url.port}`,
    },
  });

  // Reconstruct the Response object to make its headers mutable.
  response = new Response(response.body, response);
  // Set cache control headers to cache on browser for 25 minutes
  response.headers.set("Cache-Control", "max-age=1500");
  return response;
}
