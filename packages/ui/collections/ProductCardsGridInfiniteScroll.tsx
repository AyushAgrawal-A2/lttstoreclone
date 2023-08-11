'use client';

import { useEffect, useState } from 'react';
import Loading from '../common/Loading';
import ProductCardGrid from './ProductCardsGrid';
import fetchProductCards from '@/packages/serverActions/fetchProductCards';

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
  const [productCards, setProductCard] = useState<ProductCard[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProductCard([]);
    setPage(1);
    setLoading(false);
  }, [sortBy]);

  useEffect(() => {
    if (page < 2) return;
    fetchProductCards(collection, page, perPage, sortBy).then(
      ({ productCards }) => {
        setProductCard((prev) => [...prev, ...productCards]);
        setLoading(false);
      }
    );
  }, [collection, page, perPage, sortBy]);

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    function handleScroll() {
      if (
        !loading &&
        page * perPage < totalCards &&
        document.documentElement.clientHeight +
          document.documentElement.scrollTop >=
          0.85 * document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setPage(page + 1);
      }
    }
    return () => document.removeEventListener('scroll', handleScroll);
  }, [collection, page, perPage, sortBy, totalCards, loading, productCards]);

  return (
    <>
      <ProductCardGrid productCards={productCards} />
      <Loading loading={loading} />
    </>
  );
}
