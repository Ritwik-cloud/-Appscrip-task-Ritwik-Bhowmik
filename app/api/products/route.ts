export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "";

  const apiUrl =
    category && category !== "all"
      ? `https://fakestoreapi.com/products/category/${category}`
      : `https://fakestoreapi.com/products`;

  // Use allorigins as a proxy to bypass Vercel IP block
  const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(apiUrl)}`;

  const res = await fetch(proxyUrl, { next: { revalidate: 60 } });

  if (!res.ok) return Response.json([], { status: 200 });

  const json = await res.json();
  const data = JSON.parse(json.contents);

  return Response.json(data);
}