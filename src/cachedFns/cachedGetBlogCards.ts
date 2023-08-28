import { unstable_cache } from "next/cache";
import { getBlogCards } from "@/src/prisma/blogs";

export default async function cachedGetBlogCards(
  page: number,
  perPage: number
) {
  return await unstable_cache(
    () =>
      getBlogCards({
        page,
        perPage,
      }),
    ["blogs", "the-newsletter-archive"]
  )();
}
