import { getBlogPaths } from '@/packages/prisma/blogs';
import fetchBlog from '@/packages/serverActions/fetchBlog';
import Image from 'next/image';

// export const runtime = 'edge';

export async function generateStaticParams() {
  const blogPaths = await getBlogPaths();
  return blogPaths.map(({ path }) => {
    const temp = path.split('/');
    const name = temp[temp.length - 1];
    return { name };
  });
}

export default async function Page({
  params: { name },
}: {
  params: { name: string };
}) {
  const blog = await fetchBlog(name);
  if (!blog) return <></>;
  const {
    heading,
    date,
    content,
  }: { heading: string; date: Date; content: BlogContent[] } = blog;

  // document.title = blog.heading + ' - Linus Tech Tips Store';

  return (
    <main className="m-8">
      <div className="max-w-4xl mx-auto leading-8 p-8 md:p-20 rounded-xl bg-fgSecondary">
        <div className="text-2xl md:text-4xl font-bold">{heading}</div>
        <div className="text-xs font-semibold py-2">{date.toString()}</div>
        <div className="py-4 md:p-4">
          {content.map(({ isImage, data }) =>
            isImage ? (
              <Image
                alt={''}
                key={data}
                className="mx-auto"
                src={data}
                width={1000}
                height={1000}
                sizes="100vw"
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
