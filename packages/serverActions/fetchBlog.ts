'use server';

import { getBlog } from '../prisma/blogs';

export default async function fetchBlog(blogPath: string) {
  return await getBlog({ blogPath });
}
