"use client";

import axios from "axios";
import Loading from "../common/Loading";
import ProductCardGrid from "./ProductCardsGrid";
import { useCallback, useEffect, useState } from "react";
// import fetchProductCards from '@/src/serverActions/fetchProductCards';

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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadProductCards = useCallback(
    async (page: number, productCards: ProductCard[]) => {
      const searchParams = new URLSearchParams({
        page: page.toString(),
        perPage: perPage.toString(),
        sortBy: sortBy ?? "",
      });
      const path = `/api/collections/${collection}?${searchParams.toString()}`;
      const {
        data: { productCards: nextProductCards },
      } = await axios.get(path);
      // const { productCards: nextProductCards } = fetchProductCards(collection, page, perPage, sortBy)
      setProductCards([...productCards, ...nextProductCards]);
      setIsLoading(false);
    },
    [collection, perPage, sortBy]
  );

  useEffect(() => {
    function handleScrollEnd() {
      if (isLoading) return;
      if (productCards.length + perPage >= totalCards) return;
      if (
        document.documentElement.clientHeight +
          document.documentElement.scrollTop >=
        0.75 * document.documentElement.scrollHeight
      ) {
        setIsLoading(true);
        loadProductCards(productCards.length / perPage + 2, productCards);
      }
    }
    document.addEventListener("scrollend", handleScrollEnd);
    return () => document.removeEventListener("scrollend", handleScrollEnd);
  }, [perPage, totalCards, productCards, isLoading, loadProductCards]);

  return (
    <>
      <ProductCardGrid productCards={productCards} />
      <Loading isLoading={isLoading} />
    </>
  );
}
