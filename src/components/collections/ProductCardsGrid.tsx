"use client";

import ProductCard from "@/src/components/common/ProductCard";

interface ProductCardGridProps {
  productCards: ProductCard[];
}

export default function ProductCardGrid({
  productCards,
}: ProductCardGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
      {productCards.map((productCard) => (
        <ProductCard
          key={productCard.path}
          productCard={productCard}
        />
      ))}
    </div>
  );
}
