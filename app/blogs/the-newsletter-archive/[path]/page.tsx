import API_ENDPOINT from '@/packages/config/api_endpoints';

// export const runtime = 'edge';

export default async function Page({
  params: { path },
}: {
  params: { path: string };
}) {
  const blogPath = `${API_ENDPOINT}/blogs/the-newsletter-archive/${path}`;
  const blog = await fetch(blogPath)
    .then((res) => res.json())
    .catch(console.log);
  if (!blog) return <div>Not found</div>;
  const {
    heading,
    date,
    content,
  }: { heading: string; date: string; content: BlogContent[] } = blog;

  // document.title = blog.heading + ' - Linus Tech Tips Store';

  return (
    <main className="m-8">
      <div className="max-w-4xl mx-auto leading-8 p-8 md:p-20 rounded-xl bg-fgSecondary">
        <div className="text-2xl md:text-4xl font-bold">{heading}</div>
        <div className="text-xs font-semibold py-2">{date}</div>
        <div className="py-4 md:p-4">
          {content.map(({ isImage, data }) =>
            isImage ? (
              <img
                key={data}
                className="mx-auto"
                src={data}
                loading="eager"
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
