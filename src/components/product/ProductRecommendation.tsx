import ProductCard from "@/src/components/common/ProductCard";

interface ProductRecommendationProps {
  productCards: ProductCard[];
}

export default function ProductRecommendation({
  productCards,
}: ProductRecommendationProps) {
  return (
    <div>
      <div className="text-4xl font-semibold py-8 text-fgTertiary">
        CUSTOMERS ALSO LIKE
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {productCards.map((productCard) => (
          <ProductCard
            key={productCard.path}
            productCard={productCard}
          />
        ))}
      </div>
    </div>
  );
}
