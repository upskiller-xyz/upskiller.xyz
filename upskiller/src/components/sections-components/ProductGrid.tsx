import React from 'react';
import ComponentGrid from '../shared-components/ComponentGrid';
import { GridType } from '../../constants/grid-types.enums';
import { InfoCard } from './info-card/InfoCard';
import { Product } from '@shared/types';
import { ProductStatus } from '../../constants/enums';
import ProductIcon from './ProductIcon';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => (
  <ComponentGrid gridType={GridType.SECTION} columns="2col">
    {products.map((product) => {
      const isUpcoming = product.config.status === ProductStatus.UPCOMING;
      const isClickable = product.config.linkUrl && !isUpcoming;
      
      return (
        <InfoCard
          key={product.config.id}
          content={{
            ...product.content,
            icon: <ProductIcon iconData={product.icon} />
          }}
          button={{
            text: product.config.buttonText,
            disabled: isUpcoming,
            show: true,
            onClick: isClickable ? () => window.open(product.config.linkUrl, '_blank') : undefined
          }}
          config={{
            className: `${isUpcoming ? 'product-upcoming' : ''} ${isClickable ? 'product-clickable' : ''}`,
            onClick: isClickable ? () => window.open(product.config.linkUrl, '_blank') : undefined
          }}
        />
      );
    })}
  </ComponentGrid>
);

export default ProductGrid;