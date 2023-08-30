import { unstable_cache } from "next/cache";
import { getProductCards } from "@/src/prisma/products";

export default async function cachedGetProductCards(
  collection: string,
  page: number,
  perPage: number,
  sortBy = "",
  searchText = ""
) {
  return await unstable_cache(
    () =>
      getProductCards({
        collection,
        page,
        perPage,
        sortBy,
        searchText,
      }),
    [
      "all",
      "collections",
      collection,
      page.toString(),
      perPage.toString(),
      sortBy,
      searchText,
    ]
  )();
}
