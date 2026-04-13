"use client";
import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, User, ChevronDown, Menu, X } from 'lucide-react';
import styles from './Header.module.css';
import Image from 'next/image';
import logo from '../../public/Logo.png';
import Link from 'next/link';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
     
      {menuOpen && (
        <div
          className={styles.backdrop}
          onClick={() => setMenuOpen(false)}
        >
          <button
            className={styles.closeBtn}
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>
      )}

      <nav className={styles.navbarWrapper}>
        <div className={styles.mainNav}>
          <div className={styles.leftGroup}>
            <button
              className={styles.mobileMenu}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Open menu"
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
            <div className={styles.logoIcon}>
              <Image src={logo} alt="Mettamuse logo" />
            </div>
          </div>

          <div className={styles.logo}>LOGO</div>

          <div className={styles.iconGroup}>
            <div className={styles.iconItem}><Search size={24} strokeWidth={1.5} /></div>
            <div className={styles.iconItem}><Heart size={24} strokeWidth={1.5} /></div>
            <div className={styles.iconItem}><ShoppingBag size={24} strokeWidth={1.5} /></div>
            <div className={`${styles.iconItem} ${styles.desktopOnly}`}><User size={24} strokeWidth={1.5} /></div>
            <div className={`${styles.langToggle} ${styles.desktopOnly}`}>
              <span>ENG</span>
              <ChevronDown size={16} />
            </div>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className={styles.navLinks}>
          <a className={styles.navItem}>Shop</a>
          <a className={styles.navItem}>Skills</a>
          <a className={styles.navItem}>Stories</a>
          <a className={styles.navItem}>About</a>
          <a className={styles.navItem}>Contact Us</a>
        </div>

        {/* Mobile Drawer */}
        <div className={`${styles.mobileDrawer} ${menuOpen ? styles.drawerOpen : ''}`}>
          <Link href={'/'} className={styles.drawerItem} onClick={() => setMenuOpen(false)}>Shop</Link >
          <Link href={'/'}  className={styles.drawerItem} onClick={() => setMenuOpen(false)}>Skills</Link>
          <Link href={'/'}  className={styles.drawerItem} onClick={() => setMenuOpen(false)}>Stories</Link>
          <Link href={'/'}  className={styles.drawerItem} onClick={() => setMenuOpen(false)}>About</Link>
          <Link href={'/'}  className={styles.drawerItem} onClick={() => setMenuOpen(false)}>Contact Us</Link>
          <div className={styles.drawerExtras}>
            <div className={styles.drawerExtra}><User size={20} strokeWidth={1.5} /><span>Account</span></div>
            <div className={styles.drawerExtra}><span>ENG</span><ChevronDown size={16} /></div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;