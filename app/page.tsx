import styles from "./page.module.css";
import Wrapper from "@/layout/wrapper/wrapper";
import MainLayout from "@/components/mainLayout/mainLayout";
import SortDropdown from "@/components/sortDropdown/sortDropdown";
import ProductCard from "@/components/productCard/productCard";
import { AxiosInstance } from "@/api/axios/axios";
import { endPoints } from "@/api/endpoints/endpoints";
import { Product } from "@/typeScript/interface";
import { PageProps } from "@/typeScript/interface";
import SidebarLayout from "@/components/sidebarLayout/sidebarLayout";
import { Suspense } from "react";



async function getProducts(
  sort: string,
  category?: string,
): Promise<Product[]> {
  try {
    // calling the api using axios

    let url = endPoints.allProducts;
    if (category && category !== "all") {
      url = `${endPoints.allProducts}/category/${category.toLowerCase()}`;
    }

    const res = await AxiosInstance.get(url);

    if (res.status !== 200) {
      console.log(`HTTP error! status: ${res.status}`);
      return [];
    }

    // storing the response data
    const products: Product[] = res.data;

    // Sorting Logic
    if (sort === "price-low") {
      products.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      products.sort((a, b) => b.price - a.price);
    } else if (sort === "newest") {
      products.sort((a, b) => b.id - a.id);
    } else if (sort === "popular") {
      products.sort((a, b) => b.rating.rate - a.rating.rate);
    }

    return products;
  } catch (error: any) {
    console.error("Fetch error:", error.message);
    return [];
  }
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const sortValue = resolvedParams.sort || "recommended";
  const categoryValue = resolvedParams.category || "all";

  const products = await getProducts(sortValue, categoryValue);

  return (
    <Wrapper>
      <div className={styles.container}>
        {/*  Hero Section */}
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
    </Wrapper>
  );
}
