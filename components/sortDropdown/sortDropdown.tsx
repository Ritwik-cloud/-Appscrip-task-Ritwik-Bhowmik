"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import styles from './sortDropdown.module.css'; 
import { ChevronDown, ChevronUp } from 'lucide-react';
import { SortDropdownProps } from '@/typeScript/interface';

const SORT_OPTIONS = [
  { label: 'RECOMMENDED', value: 'recommended' },
  { label: 'NEWEST FIRST', value: 'newest' },
  { label: 'POPULAR', value: 'popular' },
  { label: 'PRICE : HIGH TO LOW', value: 'price-high' },
  { label: 'PRICE : LOW TO HIGH', value: 'price-low' },
];


export default function SortDropdown({ defaultValue }: SortDropdownProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

    // function for handling the sorting change and setting the value in the url

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    router.push(`?${params.toString()}`, { scroll: false });
    setIsOpen(false);
  };

  const currentLabel = SORT_OPTIONS.find(opt => opt.value === defaultValue)?.label || 'RECOMMENDED';

  return (
    <div className={styles.sortWrapper} ref={dropdownRef}>
      <div className={styles.dropdownHeader} onClick={() => setIsOpen(!isOpen)}>
        {currentLabel} <span className={styles.arrow}>{isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
      </div>

      {isOpen && (
        <ul className={styles.dropdownList}>
          {SORT_OPTIONS.map((option) => (
            <li 
              key={option.value} 
              className={`${styles.dropdownItem} ${defaultValue === option.value ? styles.active : ''}`}
              onClick={() => handleSortChange(option.value)}
            >
              {defaultValue === option.value && <span className={styles.checkmark}>✓</span>}
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}