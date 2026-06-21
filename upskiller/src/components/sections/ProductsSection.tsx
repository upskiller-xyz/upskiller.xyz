// src/components/sections/ProductsSection.tsx
import React, { useState, useEffect } from 'react';
import Section from '../shared-components/Section';
import SectionHeader from '../shared-components/SectionHeader';
import ProductGrid from '../sections-components/ProductGrid';
import { Product, SectionTheme, ContentTheme } from '@shared/types';
import { fetchJsonWithFallback } from '../../utils/fetchWithFallback';
import AssetPathManager from '../../utils/AssetPathManager';
import { useSectionHeader } from '../../hooks/useSectionHeader';

const ProductsSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const header = useSectionHeader('products');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchJsonWithFallback(
          AssetPathManager.getDynamicData('products.json'),
          '/dynamic/products.json'
        );
        setProducts(data.products);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    fetchProducts();
  }, []);


  return (
    <Section id="products" theme={SectionTheme.Primary}>
      <SectionHeader
        content={{
          title: header?.title ?? '',
          subtitle: header?.subtitle,
          theme: ContentTheme.Light
        }}
      />
      
      <ProductGrid products={products} />
    </Section>
  );
};
export default ProductsSection;