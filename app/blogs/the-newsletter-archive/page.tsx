import fetchBlogCards from '@/packages/serverActions/fetchBlogCards';
import BlogCardsGrid from '@/packages/ui/blogs/BlogCardsGrid';
import BlogCardsGridInfiniteScroll from '@/packages/ui/blogs/BlogCardsGridInfiniteScroll';

// export const runtime = 'edge';

export default async function Page() {
  // document.title = 'The Newsletter Archive - Linus Tech Tips Store';
  const page = 1;
  const perPage = 12;
  const { blogCards, totalCards } = await fetchBlogCards(page, perPage);

  return (
    <main className="md:m-8">
      <div className="w-max mx-auto text-3xl md:text-[40px] font-semibold">
        The Newsletter Archive
      </div>
      <div className="py-4 px-12">
        <BlogCardsGrid blogCards={blogCards} />
        <BlogCardsGridInfiniteScroll
          perPage={perPage}
          totalCards={totalCards}
        />
      </div>
    </main>
  );
}
