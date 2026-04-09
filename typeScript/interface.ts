import { ReactNode } from "react";

// Define the interface for the component props in the main layout page
export interface MainLayoutProps {
  sidebar: ReactNode;     
  productGrid: ReactNode;        
  itemCount: number;      
  sortElement: ReactNode;  
}

//  the Product structure based on FakeStoreAPI
export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

 interface ProductCard {
  id: number;
  title: string;
  price: number;
  image: string;
}

 export interface ProductCardProps {
  product: ProductCard;
}

export interface PageProps {
  searchParams: Promise<{ sort?: string; category?: string }>;
}