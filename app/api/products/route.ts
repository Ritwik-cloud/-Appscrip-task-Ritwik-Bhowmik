// app/api/products/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "";

  const url =
    category && category !== "all"
      ? `https://fakestoreapi.com/products/category/${category}`
      : `https://fakestoreapi.com/products`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  
  if (!res.ok) return Response.json([], { status: 200 });
  
  const data = await res.json();
  return Response.json(data);
}