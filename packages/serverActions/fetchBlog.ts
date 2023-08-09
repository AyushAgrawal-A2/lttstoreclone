'use server';

import { cache } from 'react';
import { getBlog } from '../prisma/blogs';

const fetchBlog = cache(
  async (blogPath: string) => await getBlog({ blogPath })
);

export default fetchBlog;
