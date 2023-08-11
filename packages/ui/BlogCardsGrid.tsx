'use client';

import API_ENDPOINT from '@/packages/config/api_endpoints';
import BlogCard from './common/BlogCard';
import Loading from './common/Loading';
import { useEffect, useState } from 'react';

interface BlogCardsGridProps {
  perPage: number;
  initialBlogCards: BlogCard[];
  totalCards: number;
}

export default function BlogCardsGrid({
  perPage,
  initialBlogCards,
  totalCards,
}: BlogCardsGridProps) {
  const [blogCards, setBlogCards] = useState<BlogCard[]>(initialBlogCards);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.addEventListener('scroll', handleScrollEnd);
    function handleScrollEnd() {
      if (
        !loading &&
        blogCards.length < totalCards &&
        document.documentElement.clientHeight +
          document.documentElement.scrollTop >=
          document.documentElement.scrollHeight
      ) {
        setLoading(true);
        loadNextPage(blogCards.length / perPage + 1);
      }
    }
    async function loadNextPage(page: number) {
      const searchParams = new URLSearchParams({
        page: page.toString(),
        perPage: perPage.toString(),
      });
      const path = `${API_ENDPOINT}/blogs/the-newsletter-archive/?${searchParams.toString()}`;
      const { blogCards } = await fetch(path)
        .then((res) => res.json())
        .catch(console.log);
      setBlogCards((prev) => [...prev, ...blogCards]);
      setLoading(false);
    }
    return () => document.removeEventListener('scroll', handleScrollEnd);
  }, [loading, blogCards.length, perPage, totalCards]);

  return (
    <div className="flex flex-wrap">
      {blogCards.map((blogCard) => (
        <div
          key={blogCard.path}
          className="w-full md:w-1/3 md:p-4">
          <BlogCard blogCard={blogCard} />
        </div>
      ))}
      <Loading loading={loading} />
    </div>
  );
}
