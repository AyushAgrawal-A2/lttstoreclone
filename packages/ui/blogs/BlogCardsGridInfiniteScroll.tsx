'use client';

import BlogCardsGrid from './BlogCardsGrid';
import Loading from '../common/Loading';
import { useCallback, useEffect, useState, useTransition } from 'react';
// import fetchBlogCards from '@/packages/serverActions/fetchBlogCards';

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

  const loadBlogCards = useCallback(
    async (perPage: number, page: number, blogCards: BlogCard[]) => {
      const searchParams = new URLSearchParams({
        page: page.toString(),
        perPage: perPage.toString(),
      });
      const path = `/api/blogs/the-newsletter-archive?${searchParams.toString()}`;
      const { blogCards: nextBlogCards } = await fetch(path, {
        next: {
          tags: ['blogs'],
        },
      }).then((res) => res.json());
      // const { blogCards: nextBlogCards } = await fetchBlogCards(page, perPage);
      setBlogCards([...blogCards, ...nextBlogCards]);
    },
    []
  );

  useEffect(() => {
    function handleScrollEnd() {
      if (isPending) return;
      if (blogCards.length + perPage >= totalCards) return;
      if (
        document.documentElement.clientHeight +
          document.documentElement.scrollTop >=
        0.75 * document.documentElement.scrollHeight
      )
        startTransition(() =>
          loadBlogCards(perPage, blogCards.length / perPage + 2, blogCards)
        );
    }
    document.addEventListener('scrollend', handleScrollEnd);
    return () => document.removeEventListener('scrollend', handleScrollEnd);
  }, [perPage, totalCards, blogCards, isPending, loadBlogCards]);

  return (
    <>
      <BlogCardsGrid blogCards={blogCards} />
      <Loading isLoading={isPending} />
    </>
  );
}
