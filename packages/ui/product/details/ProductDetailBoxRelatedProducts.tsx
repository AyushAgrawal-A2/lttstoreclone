'use client';

import ProductDetailBox from './ProductDetailBox';
import ProductCard from '../../common/ProductCard';

type ProductDetailBoxRelatedProductsProps = {
  relatedProducts: ProductCard[];
};

export default function ProductDetailBoxRelatedProducts({
  relatedProducts,
}: ProductDetailBoxRelatedProductsProps) {
  if (relatedProducts.length === 0) return <></>;
  return (
    <ProductDetailBox title="Related Products">
      <div className="pt-3 flex gap-5 overflow-auto">
        {relatedProducts.map((productCard) => (
          <div
            key={productCard.path}
            className="flex-none w-[80%]">
            <ProductCard productCard={productCard} />
          </div>
        ))}
      </div>
    </ProductDetailBox>
  );
}
