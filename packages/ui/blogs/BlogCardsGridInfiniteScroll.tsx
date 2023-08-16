'use client';

import BlogCardsGrid from './BlogCardsGrid';
import Loading from '../common/Loading';
import { useEffect, useState, useTransition } from 'react';
import fetchBlogCards from '@/packages/serverActions/fetchBlogCards';

interface BlogCardsGridInfiniteScrollProps {
  perPage: number;
  totalCards: number;
}

export default function BlogCardsGridInfiniteScroll({
  perPage,
  totalCards,
}: BlogCardsGridInfiniteScrollProps) {
  const [blogCards, setBlogCards] = useState<BlogCard[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    document.addEventListener('scroll', handleScrollEnd);
    function handleScrollEnd() {
      if (
        !isPending &&
        blogCards.length + perPage < totalCards &&
        document.documentElement.clientHeight +
          document.documentElement.scrollTop >=
          0.85 * document.documentElement.scrollHeight
      ) {
        startTransition(() => loadNextPage(blogCards.length / perPage + 2));
      }
    }
    async function loadNextPage(page: number) {
      const { blogCards: nextBlogCards } = await fetchBlogCards(page, perPage);
      setBlogCards([...blogCards, ...nextBlogCards]);
    }
    return () => document.removeEventListener('scroll', handleScrollEnd);
  }, [perPage, totalCards, blogCards, isPending]);

  return (
    <>
      <BlogCardsGrid blogCards={blogCards} />
      <Loading isLoading={isPending} />
    </>
  );
}
