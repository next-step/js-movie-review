function formatUrl(config) {
  const { href, query } = config;
  const searchParams = new URLSearchParams(query);

  return `${href}?${searchParams.toString()}`;
}

function formatHeaders(headersRecord) {
  const headers = new Headers();

  headers.append("content-type", "application/json");
  Object.entries(headersRecord).forEach(([key, value]) => {
    headers.append(key, value);
  });
  return headers;
}

export async function createAPIRequest(request) {
  const response = await fetch(
    formatUrl({
      href: request.url,
      query: request.query ?? {},
    }),
    {
      method: request.method || "GET",
      headers: formatHeaders(request.headers),
      body: request.body,
    },
  ).catch((error) => {
    throw new Error("Network error: ", error);
  });

  if (!response.ok) {
    throw new Error("Http error: ", response.status);
  }

  const data = !response.body ? null : await response.json();
  return data;
}
