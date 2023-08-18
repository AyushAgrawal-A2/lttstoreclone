'use server';

import { unstable_cache } from 'next/cache';
import { getBlog } from '../prisma/blogs';

export default async function fetchBlog(name: string) {
  return await unstable_cache(() => {
    const blogPath = '/blogs/the-newsletter-archive/' + name;
    return getBlog({ blogPath });
  }, ['blogs', 'the-newsletter-archive', name])();
}
