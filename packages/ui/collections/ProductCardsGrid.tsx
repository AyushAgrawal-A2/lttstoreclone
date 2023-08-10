'use client';

import API_ENDPOINT from '@/packages/config/api_endpoints';
import { useEffect, useState } from 'react';
import ProductCard from '../common/ProductCard';
import Loading from '../common/Loading';

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProductCards(initialProductCards);
  }, [initialProductCards, sortBy]);

  useEffect(() => {
    document.addEventListener('scroll', handleScrollEnd);
    function handleScrollEnd() {
      if (
        !loading &&
        productCards.length < totalCards &&
        document.documentElement.clientHeight +
          document.documentElement.scrollTop >=
          document.documentElement.scrollHeight
      ) {
        loadNextPage(productCards.length / perPage + 1);
        setLoading(true);
      }
    }
    async function loadNextPage(page: number) {
      const apiSearchParams = new URLSearchParams({
        page: page.toString(),
        perPage: perPage.toString(),
        sortBy: sortBy ?? '',
      });
      const path = `${API_ENDPOINT}/collections/${collection}?${apiSearchParams.toString()}`;
      const { productCards } = await fetch(path)
        .then((res) => res.json())
        .catch(console.log);
      setProductCards((prev) => [...prev, ...productCards]);
      setLoading(false);
    }
    return () => document.removeEventListener('scroll', handleScrollEnd);
  }, [loading, productCards, totalCards, collection, perPage, sortBy]);

  return (
    <div className="flex flex-wrap">
      {productCards.map((productCard) => (
        <div
          key={productCard.path}
          className="w-1/2 lg:w-1/3 p-1">
          <ProductCard productCard={productCard} />
        </div>
      ))}
      <Loading loading={loading} />
    </div>
  );
}
