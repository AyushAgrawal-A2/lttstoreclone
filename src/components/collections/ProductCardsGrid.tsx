import ProductCard from '../common/ProductCard';

interface ProductCardGridProps {
  productCards: ProductCard[];
}

export default function ProductCardGrid({ productCards }: ProductCardGridProps) {
  return (
    <div className="flex flex-wrap">
      {productCards.map((productCard) => (
        <div
          key={productCard.path}
          className="w-1/2 lg:w-1/3 p-1">
          <ProductCard productCard={productCard} />
        </div>
      ))}
    </div>
  );
}
