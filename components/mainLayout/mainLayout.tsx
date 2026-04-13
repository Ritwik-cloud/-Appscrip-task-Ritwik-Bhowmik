"use client";
import { useState, useEffect, memo } from 'react';
import styles from '../../app/page.module.css';
import { MainLayoutProps } from '@/typeScript/interface';
import { X } from 'lucide-react';

 function MainLayout({ sidebar, productGrid, itemCount, sortElement }: MainLayoutProps) {
  const [showFilter, setShowFilter] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size to handle filter and show/hide
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <header className={styles.plpHeader}>
        <div className={styles.filterControls}>
          {/* On mobile item count is hidden  */}
          <span className={`${styles.itemCount} ${styles.desktopOnly}`}>{itemCount} ITEMS</span>
          
          <button 
            className={styles.filterToggle} 
            onClick={() => setShowFilter(!showFilter)}
          >
            {/*  Mobile just shows "filter" */}
            {!isMobile && (
              <span className={styles.toggleArrow}>
                {showFilter ? "<" : ">"}
              </span>
            )}
            {isMobile ? "FILTER" : (showFilter ? "HIDE FILTER" : "SHOW FILTER")}
          </button>
        </div>
       
        <div className={styles.sortContainer}>
          {sortElement}
        </div>
      </header>

      {/* Backdrop for Mobile Drawer */}
      {isMobile && showFilter && (
        <div className={styles.backdrop} onClick={() => setShowFilter(false)} />
      )}

      <main className={`${styles.mainLayout} ${showFilter ? styles.withSidebar : styles.fullWidth}`}>
        <aside className={`${styles.sidebar} ${showFilter ? styles.sidebarOpen : styles.sidebarClosed}`}>
          
          {isMobile && (
            <button className={styles.closeDrawer} onClick={() => setShowFilter(false)}><X/></button>
          )}
          {sidebar}
        </aside>

        <section className={styles.grid}>
          {productGrid}
        </section>
      </main>
    </>
  );
}
export default memo(MainLayout)