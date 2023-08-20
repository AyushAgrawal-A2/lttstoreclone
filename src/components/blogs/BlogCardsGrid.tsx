import BlogCard from "../common/BlogCard";

interface BlogCardsGridProps {
  blogCards: BlogCard[];
}

export default function BlogCardsGrid({ blogCards }: BlogCardsGridProps) {
  return (
    <div className="flex flex-wrap">
      {blogCards.map((blogCard) => (
        <div key={blogCard.path} className="w-full md:w-1/3 md:p-4">
          <BlogCard blogCard={blogCard} />
        </div>
      ))}
    </div>
  );
}
