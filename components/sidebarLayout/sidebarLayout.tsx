"use client";
import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown, ChevronUp } from 'lucide-react';
import styles from './sidebarLayout.module.css';

const SidebarLayout: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    'IDEAL FOR': true,
  });

  const toggleSection = (section: string) => {
    setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());

    if (checked) {
     
      const categoryMap: Record<string, string> = {
        "Men":  "men's clothing",
        "Women": "women's clothing",
        "Baby & Kids":"baby and kids",
        
      };
      
      const apiCategory = categoryMap[category] || category.toLowerCase();
      params.set('category', apiCategory);
    } else {
      params.delete('category');
    }

    router.push(`?${params.toString()}`);
  };

  const categories = [
    {
      name: 'IDEAL FOR',
      options: ["Men", "Women", "Baby & Kids"],
    },
    { name: 'OCCASION', options: ['All'] },
    { name: 'WORK',     options: ['All'] },
    { name: 'FABRIC',   options: ['All'] },
  ];

  const activeCategory = searchParams.get('category') || '';

  return (
    <div className={styles.sidebar}>
      <label className={styles.customizable}>
        <input type="checkbox" />
        <span>CUSTOMIZABLE</span>
      </label>

      {categories.map((cat) => (
        <div key={cat.name} className={styles.filterGroup}>
          <div
            className={styles.filterHeader}
            onClick={() => toggleSection(cat.name)}
          >
            <div className={styles.filterTitleGroup}>
              <span className={styles.filterName}>{cat.name}</span>
              <span className={styles.filterSelection}>All</span>
            </div>
            {expanded[cat.name] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {expanded[cat.name] && (
            <div className={styles.filterOptions}>
              <button
                className={styles.unselectBtn}
                onClick={() => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.delete('category');
                  router.push(`?${params.toString()}`);
                }}
              >
                Unselect all
              </button>

              {cat.options.map((option) => {
                const categoryMap: Record<string, string> = {
                  "Men":         "men's clothing",
                  "Women":       "women's clothing",
                  "Baby & Kids": "baby and kids",
                 
                };
                const apiVal = categoryMap[option] || option.toLowerCase();
                const isChecked = activeCategory === apiVal;

                return (
                  <label key={option} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) =>
                        handleCategoryChange(option, e.target.checked)
                      }
                    />
                    {option}
                  </label>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SidebarLayout;