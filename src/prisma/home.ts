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
  const homeBannerPromise = getHomeBanner();
  const featuredPromise = getProductCards({
    collection: 'top-sellers',
    page: 1,
    perPage: 3,
  });
  const bestsellerPromise = getProductCards({
    collection: 'all-products-1',
    page: 1,
    perPage: 6,
    sortBy: 'bestseller,asc',
  });
  const blogCardsPromise = getBlogCards({ page: 1, perPage: 3 });
  const [
    homeBanner,
    { productCards: featured },
    { productCards: bestseller },
    { blogCards: blogs },
  ] = await Promise.all([
    homeBannerPromise,
    featuredPromise,
    bestsellerPromise,
    blogCardsPromise,
  ]);
  const home: Home = {
    homeBanner,
    featured,
    bestseller,
    blogs,
  };
  return home;
}
