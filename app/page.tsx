import styles from "./page.module.css";
import { Product } from "@/typeScript/interface";
import { PageProps } from "@/typeScript/interface";
import { Suspense } from "react";
import NextDynamic from "next/dynamic";

export const dynamic = "force-dynamic";

const SortDropdown = NextDynamic(() => import("@/components/sortDropdown/sortDropdown"), { ssr: true });
const MainLayout = NextDynamic(() => import("@/components/mainLayout/mainLayout"), { ssr: true });
const SidebarLayout = NextDynamic(() => import("@/components/sidebarLayout/sidebarLayout"), { ssr: true });
const ProductCard = NextDynamic(() => import("@/components/productCard/productCard"), { ssr: true });

async function getProducts(sort: string, category?: string): Promise<Product[]> {
  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

    const params = new URLSearchParams();
    if (category && category !== "all") params.set("category", category);

    const res = await fetch(`${baseUrl}/api/products?${params}`, {
      cache: "no-store",
    });

    if (!res.ok) return [];

    const products: Product[] = await res.json();

    if (sort === "price-low") products.sort((a, b) => a.price - b.price);
    else if (sort === "price-high") products.sort((a, b) => b.price - a.price);
    else if (sort === "newest") products.sort((a, b) => b.id - a.id);
    else if (sort === "popular") products.sort((a, b) => b.rating.rate - a.rating.rate);

    return products;
  } catch (error: any) {
    console.error("Error:", error?.message);
    return [];
  }
}
export default async function Page({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const sortValue = resolvedParams.sort || "recommended";
  const categoryValue = resolvedParams.category || "all";

  const products = await getProducts(sortValue, categoryValue);

  return (
    <div className={styles.container}>
      <section className={styles.heroSection}>
        <h1 className={styles.heroHeading}>DISCOVER OUR PRODUCTS</h1>
        <p className={styles.heroDescription}>
          Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus
          scelerisque. Dolor integer scelerisque nibh amet mi ut elementum
          dolor.
        </p>
      </section>
      <MainLayout
        itemCount={products.length}
        sortElement={<SortDropdown defaultValue={sortValue} />}
        sidebar={
          <Suspense fallback={<div>Loading filters...</div>}>
            <SidebarLayout />
          </Suspense>
        }
        productGrid={
          <>
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </>
        }
      />
    </div>
  );
}