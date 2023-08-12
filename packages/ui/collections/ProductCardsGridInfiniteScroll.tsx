'use client';

import Loading from '../common/Loading';
import ProductCardGrid from './ProductCardsGrid';
import { useEffect, useState, useTransition } from 'react';
import fetchProductCards from '@/packages/serverActions/fetchProductCards';
import fetchReviews from '@/packages/serverActions/fetchReviews';

interface ProductCardsGridInfiniteScrollProps {
  collection: string;
  perPage: number;
  sortBy?: string;
  totalCards: number;
}

export default function ProductCardsGridInfiniteScroll({
  collection,
  perPage,
  sortBy,
  totalCards,
}: ProductCardsGridInfiniteScrollProps) {
  const [productCards, setProductCards] = useState<ProductCard[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setProductCards([]);
  }, [sortBy]);

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    function handleScroll() {
      if (
        !isPending &&
        productCards.length + perPage < totalCards &&
        document.documentElement.clientHeight +
          document.documentElement.scrollTop >=
          0.85 * document.documentElement.scrollHeight
      ) {
        startTransition(() => loadNextPage(productCards.length / perPage + 2));
      }
      async function loadNextPage(page: number) {
        const { productCards: nextProductCards } = await fetchProductCards(
          collection,
          page,
          perPage,
          sortBy
        );
        const reviewsResponse = await fetchReviews('6649895256167', 1, '');
        setProductCards([...productCards, ...nextProductCards]);
      }
    }
    return () => document.removeEventListener('scroll', handleScroll);
  }, [collection, perPage, sortBy, totalCards, productCards, isPending]);

  return (
    <>
      <ProductCardGrid productCards={productCards} />
      <Loading loading={isPending} />
    </>
  );
}
