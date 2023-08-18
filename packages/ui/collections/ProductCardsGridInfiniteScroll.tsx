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
    async (page: number, productCards: ProductCard[]) => {
      const searchParams = new URLSearchParams({
        page: page.toString(),
        perPage: perPage.toString(),
        sortBy: sortBy ?? '',
      });
      const path = `/api/collections/${collection}?${searchParams.toString()}`;
      const { productCards: nextProductCards } = await fetch(path, {
        next: {
          tags: ['collections', collection],
        },
      }).then((res) => res.json());
      // const { productCards: nextProductCards } = fetchProductCards(collection, page, perPage, sortBy);
      setProductCards([...productCards, ...nextProductCards]);
    },
    [collection, perPage, sortBy]
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
          loadProductCards(productCards.length / perPage + 2, productCards)
        );
    }
    document.addEventListener('scrollend', handleScrollEnd);
    return () => document.removeEventListener('scrollend', handleScrollEnd);
  }, [perPage, totalCards, productCards, isPending, loadProductCards]);

  return (
    <>
      <ProductCardGrid productCards={productCards} />
      <Loading isLoading={isPending} />
    </>
  );
}
