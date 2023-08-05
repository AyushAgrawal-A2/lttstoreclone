import { Prisma } from '@prisma/client';
import prisma from '.';

export async function saveProducts({ products }: { products: Product[] }) {
  try {
    await prisma.product.deleteMany();
    await Promise.all(
      products.map((product) =>
        prisma.product.create({
          data: {
            path: product.path,
            title: product.title,
            inStock: product.inStock,
            productId: product.productId,
            ranks: {
              create: product.ranks,
            },
            collections: product.collections,
            type: product.type,
            gender: product.gender,
            images: {
              createMany: {
                data: product.images,
              },
            },
            rating: {
              create: product.rating,
            },
            price: product.price,
            // colorSwatch: {
            //   createMany: {
            //     data: product.colorSwatch,
            //   },
            // },
            // sizeOptions: {
            //   connectOrCreate: {
            //     create: {

            //     }
            //   }
            // },
            details: product.details,
            featureImages: product.featureImages,
            reviewStats: {
              create: product.reviewStats,
            },
          },
        })
      )
    );
  } catch (error) {
    console.log(error);
  }
}

// export async function getProductCards({
//   page,
//   perPage,
// }: {
//   page: number;
//   perPage: number;
// }) {
//   const blogCards = await prisma.blogCard.findMany({
//     orderBy: {
//       date: 'desc',
//     },
//     skip: (page - 1) * perPage,
//     take: perPage,
//   });
//   return blogCards;
// }

// export async function getProduct({ blogPath }: { blogPath: string }) {
//   const blog = await prisma.blogCard.findUnique({
//     where: {
//       path: blogPath,
//     },
//     include: { content: true },
//   });
//   return blog;
// }
