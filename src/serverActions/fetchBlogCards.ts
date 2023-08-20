"use server";

import { unstable_cache } from "next/cache";
import { getBlogCards } from "../prisma/blogs";

export default async function fetchBlogCards(page: number, perPage: number) {
  return await unstable_cache(
    () =>
      getBlogCards({
        page,
        perPage,
      }),
    ["blogs", "the-newsletter-archive"],
  )();
}
