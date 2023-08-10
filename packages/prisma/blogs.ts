import prisma from '.';

export async function saveBlogs({
  blogCards,
  blogContents,
}: {
  blogCards: BlogCard[];
  blogContents: BlogContent[][];
}) {
  try {
    await prisma.blogCard.deleteMany();
    await Promise.all(
      blogCards.map((blogCard, idx) =>
        prisma.blogCard.create({
          data: {
            ...blogCard,
            content: {
              createMany: {
                data: blogContents[idx],
              },
            },
          },
        })
      )
    );
  } catch (error) {
    console.log(error);
  }
}

export async function getBlogCards({
  page,
  perPage,
}: {
  page: number;
  perPage: number;
}) {
  const blogCards = await prisma.blogCard.findMany({
    orderBy: {
      date: 'desc',
    },
    skip: (page - 1) * perPage,
    take: perPage,
  });
  const totalCards = await prisma.blogCard.count();
  return { blogCards, totalCards };
}

export async function getBlog({ blogPath }: { blogPath: string }) {
  const blogCards = await prisma.blogCard.findUnique({
    where: {
      path: blogPath,
    },
    include: { content: true },
  });
  const totalCards = await prisma.blogCard.count();
  return { blogCards, totalCards };
}
