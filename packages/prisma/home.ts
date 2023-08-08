import prisma from '.';
import { getBlogCards } from '../prisma/blogs';
import { getProductCards } from '../prisma/products';

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

async function getHomeBanner() {
  const homeBanner = await prisma.homeBanner.findMany({
    orderBy: {
      position: 'asc',
    },
  });
  return homeBanner;
}

export async function getHome() {
  const home: Home = {
    homeBanner: await getHomeBanner(),
    featured: (
      await getProductCards({ collection: 'top-sellers', page: 1, perPage: 3 })
    ).productCards,
    bestseller: (
      await getProductCards({
        collection: 'all-products-1',
        page: 1,
        perPage: 6,
        sortBy: 'bestseller,asc',
      })
    ).productCards,
    blogs: await getBlogCards({ page: 1, perPage: 3 }),
  };
  return home;
}
