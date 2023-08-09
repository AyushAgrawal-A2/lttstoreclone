'use server';

import { cache } from 'react';
import { getBlogCards } from '../prisma/blogs';

const fetchBlogCards = cache(
  async (page: number, perPage: number) =>
    await getBlogCards({
      page,
      perPage,
    })
);

export default fetchBlogCards;
