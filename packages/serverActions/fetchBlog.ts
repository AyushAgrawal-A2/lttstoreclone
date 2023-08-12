'use server';

import { getBlog } from '../prisma/blogs';

export default async function fetchBlog(name: string) {
  const blogPath = '/blogs/the-newsletter-archive/' + name;
  return await getBlog({ blogPath });
}
