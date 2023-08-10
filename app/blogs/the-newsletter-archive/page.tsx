import API_ENDPOINT from '@/packages/config/api_endpoints';
import BlogCardsGrid from '@/packages/ui/BlogCardsGrid';

// export const runtime = 'edge';
export const dynamic = 'force-static';

export default async function Page() {
  // document.title = 'The Newsletter Archive - Linus Tech Tips Store';
  const page = 1;
  const perPage = 12;
  const searchParams = new URLSearchParams({
    page: page.toString(),
    perPage: perPage.toString(),
  });
  const path = `${API_ENDPOINT}/blogs/the-newsletter-archive/?${searchParams.toString()}`;
  const { blogCards, totalCards } = await fetch(path)
    .then((res) => res.json())
    .catch(console.log);

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
