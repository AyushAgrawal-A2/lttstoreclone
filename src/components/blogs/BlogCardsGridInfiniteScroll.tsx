"use client";

import BlogCardsGrid from "./BlogCardsGrid";
import Loading from "../common/Loading";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
// import fetchBlogCards from '@/src/serverActions/fetchBlogCards';

interface BlogCardsGridInfiniteScrollProps {
  perPage: number;
  totalCards: number;
}

export default function BlogCardsGridInfiniteScroll({
  perPage,
  totalCards,
}: BlogCardsGridInfiniteScrollProps) {
  const [blogCards, setBlogCards] = useState<BlogCard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadBlogCards = useCallback(
    async (page: number, blogCards: BlogCard[]) => {
      const searchParams = new URLSearchParams({
        page: page.toString(),
        perPage: perPage.toString(),
      });
      const path = `/api/blogs/the-newsletter-archive?${searchParams.toString()}`;
      const {
        data: { blogCards: nextBlogCards },
      } = await axios.get(path);
      // const { blogCards: nextBlogCards } = await fetchBlogCards(page, perPage);
      setBlogCards([...blogCards, ...nextBlogCards]);
      setIsLoading(false);
    },
    [perPage]
  );

  useEffect(() => {
    function handleScrollEnd() {
      if (isLoading) return;
      if (blogCards.length + perPage >= totalCards) return;
      if (
        document.documentElement.clientHeight +
          document.documentElement.scrollTop >=
        0.75 * document.documentElement.scrollHeight
      ) {
        setIsLoading(true);
        loadBlogCards(blogCards.length / perPage + 2, blogCards);
      }
    }
    document.addEventListener("scrollend", handleScrollEnd);
    return () => document.removeEventListener("scrollend", handleScrollEnd);
  }, [perPage, totalCards, blogCards, isLoading, loadBlogCards]);

  return (
    <>
      <BlogCardsGrid blogCards={blogCards} />
      <Loading isLoading={isLoading} />
    </>
  );
}
