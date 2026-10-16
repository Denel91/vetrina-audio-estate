const ID_FILE = /^[a-zA-Z0-9_-]+$/;

export async function GET(request, { params }) {
  const { id } = await params;

  if (!ID_FILE.test(id)) {
    return new Response("ID audio non valido", { status: 400 });
  }

  const headers = {};
  const range = request.headers.get("range");
  if (range) headers.Range = range;

  const upstream = await fetch(
    `https://drive.usercontent.google.com/download?id=${id}&export=download`,
    { headers, cache: "no-store" },
  );

  if (!upstream.ok) {
    return new Response("Audio non disponibile", { status: upstream.status });
  }

  const responseHeaders = new Headers({
    "Content-Type": upstream.headers.get("content-type") || "audio/wav",
    "Accept-Ranges": upstream.headers.get("accept-ranges") || "bytes",
    "Cache-Control": "public, max-age=3600",
  });

  for (const name of ["content-length", "content-range"]) {
    const value = upstream.headers.get(name);
    if (value) responseHeaders.set(name, value);
  }

  return new Response(upstream.body, {
    status: upstream.status,
    headers: responseHeaders,
  });
}
