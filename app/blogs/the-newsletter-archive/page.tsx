import BlogCardsGrid from '@/packages/ui/blogs/BlogCardsGrid';
import BlogCardsGridInfiniteScroll from '@/packages/ui/blogs/BlogCardsGridInfiniteScroll';
import loadMoreBlogCards from '@/packages/utils/loadMoreBlogCards';
import { Suspense } from 'react';

// export const runtime = 'edge';

export default async function Page() {
  // document.title = 'The Newsletter Archive - Linus Tech Tips Store';
  const page = 1;
  const perPage = 12;
  const { blogCards, totalCards } = await loadMoreBlogCards(page, perPage);

  return (
    <main className="md:m-8">
      <div className="w-max mx-auto text-3xl md:text-[40px] font-semibold">
        The Newsletter Archive
      </div>
      <div className="py-4 px-12">
        <BlogCardsGrid blogCards={blogCards} />
        <Suspense>
          <BlogCardsGridInfiniteScroll
            perPage={perPage}
            totalCards={totalCards}
          />
        </Suspense>
      </div>
    </main>
  );
}
