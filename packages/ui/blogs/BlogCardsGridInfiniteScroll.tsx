'use client';

import BlogCardsGrid from './BlogCardsGrid';
import Loading from '../common/Loading';
import { useEffect, useState } from 'react';
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
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (page < 2) return;
    fetchBlogCards(page, perPage).then(({ blogCards }) => {
      setBlogCards((prev) => [...prev, ...blogCards]);
      setLoading(false);
    });
  }, [page, perPage]);

  useEffect(() => {
    document.addEventListener('scroll', handleScrollEnd);
    function handleScrollEnd() {
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
    return () => document.removeEventListener('scroll', handleScrollEnd);
  }, [page, perPage, totalCards, loading, blogCards]);

  return (
    <>
      <BlogCardsGrid blogCards={blogCards} />
      <Loading loading={loading} />
    </>
  );
}
