"use client";
import React, { useState } from 'react';
import { Heart } from 'lucide-react'; 
import styles from './productCard.module.css';
import { ProductCardProps } from '@/typeScript/interface';
import Image from 'next/image';


const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [isFavorite, setIsFavorite] = useState(false)
    const handleToggle = ()=>{
        setIsFavorite(!isFavorite)
    }
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image 
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
          className={styles.cardImg}
        />
        {/* currently hardcoded the outOfStock */}
        {product.id === 2 && (
          <div className={styles.outOfStockOverlay}>OUT OF STOCK</div>
        )}
      </div>

      <div className={styles.productInfo}>
        <h2 className={styles.productName}>{product.title.toUpperCase()}</h2>
        
        <div className={styles.productMeta}>
                {/* pricing  */}
          <div className={styles.pricing}>
          
            <p className={styles.priceText}>
              <span className={styles.underline}>Sign in</span> or Create an account to order
            </p>
        
            <p className={styles.actualPrice}>${product.price.toFixed(2)}</p>
          </div>
          
          <button onClick={handleToggle} className={styles.favoriteBtn} aria-label="Add to favorites">
           <Heart 
              size={20} 
              strokeWidth={1.5} 
              
              fill={isFavorite ? "#eb4d4b" : "none"} 
              color={isFavorite ? "#eb4d4b" : "currentColor"} 
            />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;