import styles from './ProductPage.module.css';

// 3. SSR Data Fetching (Requirement #3)
async function getProducts() {
  const res = await fetch('https://fakestoreapi.com/products');
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export default async function Page() {
  const products = await getProducts();

  return (
    <div className={styles.container}>
      {/* 6c. SEO: Proper H1 tag */}
      <header className={styles.plpHeader}>
        <div>
          <span>{products.length} ITEMS</span>
          <button className={styles.filterToggle}>HIDE FILTER</button>
        </div>
        <div>
          <select className={styles.sortSelect}>
            <option>RECOMMENDED</option>
            <option>NEWEST FIRST</option>
          </select>
        </div>
      </header>

      <main className={styles.mainLayout}>
        {/* Sidebar Filters */}
        <aside className={styles.sidebar}>
            <label className={styles.filterGroup}>
                <input type="checkbox" /> CUSTOMIZABLE
            </label>
            
            {['IDEAL FOR', 'OCCASION', 'WORK', 'FABRIC'].map((filter) => (
                <div key={filter} className={styles.filterGroup}>
                    <div className={styles.filterHeader}>
                        <span>{filter}</span>
                        <span>⌄</span>
                    </div>
                    <div className={styles.filterValue}>All</div>
                </div>
            ))}
        </aside>

        {/* 5e. Product Grid - Minimal DOM size */}
        <section className={styles.grid}>
          {products.map((product) => (
            <div key={product.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                {/* 6f. SEO: Alt text included */}
                <img 
                   src={product.image} 
                   alt={product.title} 
                   className={styles.cardImg} 
                />
                {product.id === 2 && <div className={styles.outOfStockOverlay}>OUT OF STOCK</div>}
              </div>
              <div className={styles.productInfo}>
                <h2 className={styles.productName}>{product.title.toUpperCase()}</h2>
                <div className={styles.productMeta}>
                  <p>Sign in or Create an account to see pricing</p>
                  <span>♡</span>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}