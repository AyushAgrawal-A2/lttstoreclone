import prisma from '.';

export async function saveProducts({ products }: { products: Product[] }) {
  try {
    await prisma.product.deleteMany();
    await Promise.all(
      products.map(
        ({
          path,
          title,
          inStock,
          productId,
          ranks,
          collections,
          type,
          gender,
          images,
          rating,
          price,
          colorSwatch,
          sizeOptions,
          details,
          featureImages,
          reviewStats,
        }) =>
          prisma.product.create({
            data: {
              path,
              title,
              inStock,
              productId,
              ranks: {
                create: ranks,
              },
              collections,
              type,
              gender,
              images: {
                create: images,
              },
              rating: {
                create: rating,
              },
              price,
              colorSwatch: {
                create: colorSwatch.map(
                  ({
                    imgPosition,
                    color: name,
                    backgroundColor,
                    backgroundImage,
                  }) => {
                    return {
                      imgPosition,
                      color: {
                        connectOrCreate: {
                          where: {
                            name,
                          },
                          create: {
                            name,
                            backgroundColor,
                            backgroundImage,
                          },
                        },
                      },
                    };
                  }
                ),
              },
              sizeOptions: {
                connectOrCreate: sizeOptions.map(({ symbol, name }) => {
                  return {
                    where: { symbol },
                    create: { symbol, name },
                  };
                }),
              },
              details,
              featureImages,
              reviewStats: {
                create: reviewStats,
              },
            },
          })
      )
    );
    await Promise.all(
      products.map(({ path, relatedProducts }) =>
        prisma.product.update({
          where: { path },
          data: { relatedProducts: { connect: relatedProducts } },
        })
      )
    );
  } catch (error) {
    console.log(error);
  }
}

export async function getProductCards({
  collection = 'all-products-1',
  page = 1,
  perPage = 12,
  sortBy = 'featured,desc',
  filter = [],
  searchText = '',
}) {
  const filteredProducts = await prisma.product.findMany({
    where: {
      collections: {
        has: collection,
      },
      title: {
        contains: searchText,
      },
    },
    select: {
      path: true,
      title: true,
      inStock: true,
      price: true,
      images: true,
      colorSwatch: { include: { color: true } },
    },
    // orderBy: {
    //   ranks:{
    //   [sortBy.split[,][0]]:
    //   }
    // },
  });

  const productCards = filteredProducts.slice(
    (page - 1) * perPage,
    page * perPage
  );
  const totalCards = filteredProducts.length;

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

export async function getProduct({ path }: { path: string }) {
  const product = await prisma.product.findUnique({
    where: {
      path,
    },
    include: {
      ranks: true,
      images: true,
      rating: true,
      colorSwatch: { include: { color: true } },
      sizeOptions: true,
      reviewStats: true,
      relatedProducts: {
        select: {
          path: true,
          title: true,
          inStock: true,
          price: true,
          images: true,
          colorSwatch: { include: { color: true } },
        },
      },
    },
  });
  return product;
}
