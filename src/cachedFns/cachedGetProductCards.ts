import { unstable_cache } from "next/cache";
import { getProductCards } from "../prisma/products";

export default async function cachedGetProductCards(
  collection: string,
  page: number,
  perPage: number,
  sortBy = "",
  searchText = "",
  filter = []
) {
  return await unstable_cache(
    () =>
      getProductCards({
        collection,
        page,
        perPage,
        sortBy,
        searchText,
        filter,
      }),
    ["collections", collection]
  )();
}
