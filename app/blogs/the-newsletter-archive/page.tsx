import fetchBlogCards from '@/packages/serverActions/fetchBlogCards';
import BlogCardsGrid from '@/packages/ui/BlogCardsGrid';

export default async function Page() {
  // document.title = 'The Newsletter Archive - Linus Tech Tips Store';
  const perPage = 12;
  const { blogCards, totalCards } = await fetchBlogCards(1, perPage);

  return (
    <main className="md:m-8">
      <div className="w-max mx-auto text-3xl md:text-[40px] font-semibold">
        The Newsletter Archive
      </div>
      <div className="max-w-[1800px] py-4 px-12">
        <BlogCardsGrid
          perPage={perPage}
          initialBlogCards={blogCards}
          totalCards={totalCards}
        />
      </div>
    </main>
  );
}
