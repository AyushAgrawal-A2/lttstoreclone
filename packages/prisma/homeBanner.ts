import prisma from '.';

export async function saveHomeBanner({
  homeBanner,
}: {
  homeBanner: HomeBanner[];
}) {
  try {
    await prisma.homeBanner.deleteMany();
    await Promise.all(
      homeBanner.map((data) =>
        prisma.homeBanner.create({
          data,
        })
      )
    );
  } catch (error) {
    console.log(error);
  }
}

export async function getHomeBanner() {
  const homeBanner = await prisma.homeBanner.findMany({
    orderBy: {
      position: 'asc',
    },
  });
  return homeBanner;
}
