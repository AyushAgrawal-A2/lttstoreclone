'use server';

import { unstable_cache } from 'next/cache';
import { getBlog } from '../prisma/blogs';

export default async function fetchBlog(blog: string) {
  return await unstable_cache(() => {
    const blogPath = '/blogs/the-newsletter-archive/' + blog;
    return getBlog({ blogPath });
  }, ['blogs', 'the-newsletter-archive', blog])();
}
