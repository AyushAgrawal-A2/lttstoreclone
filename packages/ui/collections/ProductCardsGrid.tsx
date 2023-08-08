'use client';
import { useEffect, useState, useTransition } from 'react';
import ProductCard from '../common/ProductCard';
import Loading from '../common/Loading';
import fetchProductCards from '../../actions/fetchProductCards';

interface ProductCardGridProps {
  collection: string;
  perPage: number;
  sortBy?: string;
  initialProductCards: ProductCard[];
  totalCards: number;
}

export default function ProductCardGrid({
  collection,
  perPage,
  sortBy,
  initialProductCards,
  totalCards,
}: ProductCardGridProps) {
  const [productCards, setProductCards] = useState<ProductCard[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setProductCards(initialProductCards);
  }, [initialProductCards, sortBy]);

  useEffect(() => {
    document.addEventListener('scroll', handleScrollEnd);
    function handleScrollEnd() {
      if (
        !isPending &&
        productCards.length < totalCards &&
        document.documentElement.clientHeight +
          document.documentElement.scrollTop >=
          document.documentElement.scrollHeight
      ) {
        startTransition(() => loadNextPage(productCards.length / perPage + 1));
      }
    }
    async function loadNextPage(page: number) {
      const { productCards } = await fetchProductCards(
        collection,
        page,
        perPage,
        sortBy
      );
      setProductCards((prev) => [...prev, ...productCards]);
    }
    return () => document.removeEventListener('scroll', handleScrollEnd);
  }, [isPending, productCards, totalCards, collection, perPage, sortBy]);

  return (
    <div className="flex flex-wrap">
      {productCards.map((productCard) => (
        <div
          key={productCard.path}
          className="w-1/2 lg:w-1/3 p-1">
          <ProductCard productCard={productCard} />
        </div>
      ))}
      {isPending && <Loading />}
    </div>
  );
}
