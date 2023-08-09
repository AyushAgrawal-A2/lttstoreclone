import fetchBlog from '@/packages/serverActions/fetchBlog';

export const runtime = 'edge';

export default async function Page({
  params: { path },
}: {
  params: { path: string };
}) {
  const blogPath = '/blogs/the-newsletter-archive/' + path;
  const blog = await fetchBlog(blogPath);
  if (!blog) return <div>Not found</div>;
  const { heading, date, content } = blog;

  // document.title = blog.heading + ' - Linus Tech Tips Store';

  return (
    <main className="m-8">
      <div className="max-w-4xl mx-auto leading-8 p-8 md:p-20 rounded-xl bg-fgSecondary">
        <div className="text-2xl md:text-4xl font-bold">{heading}</div>
        <div className="text-xs font-semibold py-2">
          {date.toLocaleDateString()}
        </div>
        <div className="py-4 md:p-4">
          {content.map(({ isImage, data }) =>
            isImage ? (
              <img
                key={data}
                className="mx-auto"
                src={data}
              />
            ) : (
              <p
                key={data}
                className="whitespace-pre-line py-2 font-semibold text-sm md:text-base">
                {data}
              </p>
            )
          )}
        </div>
      </div>
    </main>
  );
}
