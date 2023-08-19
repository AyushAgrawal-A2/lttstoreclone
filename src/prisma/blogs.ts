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
  const blogCardsPromise = prisma.blogCard.findMany({
    orderBy: {
      date: 'desc',
    },
    skip: (page - 1) * perPage,
    take: perPage,
    select: {
      path: true,
      heading: true,
      cardText: true,
      date: true,
      imgURL: true,
    },
  });
  const totalCardsPromise = prisma.blogCard.count();
  const [blogCards, totalCards] = await Promise.all([
    blogCardsPromise,
    totalCardsPromise,
  ]);
  return { blogCards, totalCards };
}

export async function getBlog({ blogPath }: { blogPath: string }) {
  const blog = await prisma.blogCard.findUnique({
    where: {
      path: blogPath,
    },
    select: {
      heading: true,
      date: true,
      content: { select: { isImage: true, data: true } },
    },
  });
  return blog;
}

export async function getBlogPaths() {
  return await prisma.blogCard.findMany({
    select: {
      path: true,
    },
  });
}
