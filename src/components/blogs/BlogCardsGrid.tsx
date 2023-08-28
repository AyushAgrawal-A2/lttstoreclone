"use client";

import BlogCard from "@/src/components/common/BlogCard";

interface BlogCardsGridProps {
  blogCards: BlogCard[];
}

export default function BlogCardsGrid({ blogCards }: BlogCardsGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
      {blogCards.map((blogCard) => (
        <BlogCard
          key={blogCard.path}
          blogCard={blogCard}
        />
      ))}
    </div>
  );
}
