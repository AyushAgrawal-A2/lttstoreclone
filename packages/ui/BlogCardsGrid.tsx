'use client';

import fetchBlogCards from '../serverActions/fetchBlogCards';
import BlogCard from './common/BlogCard';
import Loading from './common/Loading';
import { useEffect, useState, useTransition } from 'react';

interface ProductCardGridProps {
  perPage: number;
  initialBlogCards: BlogCard[];
  totalCards: number;
}

export default function ProductCardGrid({
  perPage,
  initialBlogCards,
  totalCards,
}: ProductCardGridProps) {
  const [blogCards, setBlogCards] = useState<BlogCard[]>(initialBlogCards);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    document.addEventListener('scroll', handleScrollEnd);
    function handleScrollEnd() {
      if (
        !isPending &&
        blogCards.length < totalCards &&
        document.documentElement.clientHeight +
          document.documentElement.scrollTop >=
          document.documentElement.scrollHeight
      ) {
        startTransition(
          async () => await loadNextPage(blogCards.length / perPage + 1)
        );
      }
    }
    async function loadNextPage(page: number) {
      const { blogCards } = await fetchBlogCards(page, perPage);
      setBlogCards((prev) => [...prev, ...blogCards]);
    }
    return () => document.removeEventListener('scroll', handleScrollEnd);
  }, [isPending, blogCards.length, perPage, totalCards]);

  return (
    <div className="flex flex-wrap">
      {blogCards.map((blogCard) => (
        <div
          key={blogCard.path}
          className="w-full md:w-1/3 md:p-4">
          <BlogCard blogCard={blogCard} />
        </div>
      ))}
      {isPending && <Loading />}
    </div>
  );
}
