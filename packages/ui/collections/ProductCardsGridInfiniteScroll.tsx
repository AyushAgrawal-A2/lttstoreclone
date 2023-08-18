'use client';

import Loading from '../common/Loading';
import ProductCardGrid from './ProductCardsGrid';
import { useCallback, useEffect, useState, useTransition } from 'react';
// import fetchProductCards from '@/packages/serverActions/fetchProductCards';

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

  const loadProductCards = useCallback(
    async (
      collection: string,
      page: number,
      perPage: number,
      sortBy = '',
      productCards: ProductCard[]
    ) => {
      const searchParams = new URLSearchParams({
        page: page.toString(),
        perPage: perPage.toString(),
        sortBy,
      });
      const path = `/api/collections/${collection}?${searchParams.toString()}`;
      const { productCards: nextProductCards } = await fetch(path).then((res) =>
        res.json()
      );
      // const { productCards: nextProductCards } = fetchProductCards(collection, page, perPage, sortBy);
      setProductCards([...productCards, ...nextProductCards]);
    },
    []
  );

  useEffect(() => {
    function handleScrollEnd() {
      if (isPending) return;
      if (productCards.length + perPage >= totalCards) return;
      if (
        document.documentElement.clientHeight +
          document.documentElement.scrollTop >=
        0.75 * document.documentElement.scrollHeight
      )
        startTransition(() =>
          loadProductCards(
            collection,
            productCards.length / perPage + 2,
            perPage,
            sortBy,
            productCards
          )
        );
    }
    document.addEventListener('scrollend', handleScrollEnd);
    return () => document.removeEventListener('scrollend', handleScrollEnd);
  }, [
    collection,
    perPage,
    sortBy,
    totalCards,
    productCards,
    isPending,
    loadProductCards,
  ]);

  return (
    <>
      <ProductCardGrid productCards={productCards} />
      <Loading isLoading={isPending} />
    </>
  );
}
