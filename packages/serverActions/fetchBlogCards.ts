'use server';

import { getBlogCards } from '../prisma/blogs';

export default async function fetchBlogCards(page: number, perPage: number) {
  return await getBlogCards({
    page,
    perPage,
  });
}
