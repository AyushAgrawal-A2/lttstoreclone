import prisma from '.';
import asyncSeq from '../utils/asyncSeq';

export async function saveProducts({ products }: { products: Product[] }) {
  try {
    await prisma.product.deleteMany();
    await prisma.color.deleteMany();
    await prisma.sizeOption.deleteMany();
    const fnArray = products.map(
      ({
          path,
          title,
          inStock,
          price,
          lttProductId,
          type,
          gender,
          featureImages,
          collections,
          images,
          details,
          sizeOptions,
          ranks,
          rating,
          reviewStats,
          colorSwatch,
        }) =>
        async () =>
          await prisma.product.create({
            data: {
              path,
              title,
              inStock,
              price,
              lttProductId,
              type,
              gender,
              featureImages,
              collections,
              images: {
                create: images,
              },
              details,
              sizeOptions: {
                connectOrCreate: sizeOptions.map(({ symbol, name }) => ({
                  create: {
                    symbol,
                    name,
                  },
                  where: {
                    symbol,
                  },
                })),
              },
              ranks: {
                create: ranks,
              },
              rating: {
                create: rating,
              },
              reviewStats: {
                create: reviewStats,
              },
              colorSwatch: {
                create: colorSwatch.map(({ imgPosition, color }) => ({
                  imgPosition,
                  color: {
                    connectOrCreate: {
                      where: {
                        name: color.name,
                      },
                      create: color,
                    },
                  },
                })),
              },
            },
          })
    );
    await asyncSeq(fnArray);
    await Promise.all(
      products.map(({ path, relatedProducts }) =>
        prisma.product.update({
          where: { path },
          data: {
            relatedProducts: {
              connect: relatedProducts.map(({ path }) => ({
                path,
              })),
            },
          },
        })
      )
    );
  } catch (error) {
    console.log(error);
  }
}

interface OrderBy {
  title?: 'asc' | 'desc';
  price?: 'asc' | 'desc';
  ranks?: {
    date?: 'asc' | 'desc';
    bestseller?: 'asc' | 'desc';
    featured?: 'asc' | 'desc';
  };
}

export async function getProductCards({
  collection = 'all-products-1',
  page = 1,
  perPage = 12,
  sortBy = 'featured,desc',
  searchText = '',
  filter = [],
}) {
  const [sortRank, sortDirection] = sortBy.split(',');
  const rank = [
    'featured',
    'bestseller',
    'date',
    'alphabetically',
    'price',
  ].includes(sortRank)
    ? sortRank
    : 'featured';
  const direction: 'asc' | 'desc' =
    sortDirection === 'asc' || sortDirection === 'desc'
      ? sortDirection
      : 'desc';
  let orderBy: OrderBy = {};
  if (rank === 'alphabetically') {
    orderBy.title = direction;
  } else if (rank === 'price') {
    orderBy.price = direction;
  } else {
    orderBy.ranks = {
      [rank]: direction,
    };
  }
  const productCards = await prisma.product.findMany({
    where: {
      collections: {
        has: collection,
      },
      title: {
        contains: searchText,
        mode: 'insensitive',
      },
    },
    select: {
      path: true,
      title: true,
      inStock: true,
      price: true,
      images: {
        select: {
          src: true,
          overlay: true,
        },
      },
      colorSwatch: {
        select: {
          imgPosition: true,
          color: {
            select: {
              name: true,
              backgroundColor: true,
              backgroundImage: true,
            },
          },
        },
      },
    },
    skip: (page - 1) * perPage,
    take: perPage,
    orderBy,
  });

  const totalCards = await prisma.product.count({
    where: {
      collections: {
        has: collection,
      },
      title: {
        contains: searchText,
      },
    },
  });

  return { productCards, totalCards };

  // if (sortBy) {
  //   const desc: boolean = sortBy.includes(',')
  //     ? sortBy.split(',')[1] === 'desc'
  //     : false;
  //   sortBy = sortBy.split(',')[0];
  //   if (sortBy === 'price') {
  //     filteredProducts.sort((a, b) => getPrice(a.price) - getPrice(b.price));
  //   } else if (sortBy === 'alphabetically') {
  //     filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
  //   } else {
  //     filteredProducts = filteredProducts.filter(
  //       (product) => product.ranks[sortBy]
  //     );
  //     filteredProducts.sort((a, b) => a.ranks[sortBy] - b.ranks[sortBy]);
  //   }
  //   if (desc) filteredProducts.reverse();
  // }
}

export async function getProduct(path: string) {
  const product = await prisma.product.findUnique({
    where: {
      path: path,
    },
    select: {
      path: true,
      title: true,
      inStock: true,
      price: true,
      lttProductId: true,
      featureImages: true,
      images: {
        select: {
          src: true,
          overlay: true,
        },
      },
      details: true,
      sizeOptions: { select: { name: true, symbol: true } },
      rating: {
        select: {
          stars: true,
          reviews: true,
        },
      },
      reviewStats: {
        select: {
          star_1: true,
          star_2: true,
          star_3: true,
          star_4: true,
          star_5: true,
        },
      },
      colorSwatch: {
        select: {
          imgPosition: true,
          color: {
            select: {
              name: true,
              backgroundColor: true,
              backgroundImage: true,
            },
          },
        },
      },
      relatedProducts: {
        select: {
          path: true,
          title: true,
          inStock: true,
          price: true,
          images: {
            select: {
              src: true,
              overlay: true,
            },
          },
          colorSwatch: {
            select: {
              imgPosition: true,
              color: {
                select: {
                  name: true,
                  backgroundColor: true,
                  backgroundImage: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return product;
}
