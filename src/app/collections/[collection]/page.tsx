import InfiniteScroll from "@/src/components/common/InfiniteScroll";
import ProductCardGrid from "@/src/components/collections/ProductCardsGrid";
import SortBy from "@/src/components/collections/SortBy";
import { getProductCollections } from "@/src/prisma/products";
import cachedGetProductCards from "@/src/cachedFns/cachedGetProductCards";

// export const runtime = 'edge';

export async function generateStaticParams() {
  const collectionsArray = await getProductCollections();
  const uniqueCollections: string[] = [];
  collectionsArray.forEach(({ collections }) => {
    collections.forEach((collection) => {
      if (!uniqueCollections.includes(collection))
        uniqueCollections.push(collection);
    });
  }, []);
  return uniqueCollections.map((collection) => ({ collection }));
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { collection: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const collection = params.collection;
  const page = 1;
  const perPage = 12;
  const sortBy =
    typeof searchParams.sortBy === "string" ? searchParams.sortBy : undefined;
  const { productCards, totalCards } = await cachedGetProductCards(
    collection,
    page,
    perPage,
    sortBy
  );
  const apiURLSearchParams = new URLSearchParams({
    page: page.toString(),
    perPage: perPage.toString(),
    sortBy: sortBy ?? "",
  });
  const apiPath = `/api/collections/${collection}?${apiURLSearchParams.toString()}`;
  const time = new Date().toString();

  // if (category === 'all')
  //   document.title = 'All Products - Linus Tech Tips Store';
  // else if (category === 'accessories')
  //   document.title = 'Gear - Linus Tech Tips Store';
  // else if (category === 'clothing')
  //   document.title = 'Clothing - Linus Tech Tips Store';
  // else document.title = category.toUpperCase() + ' - Linus Tech Tips Store';

  return (
    <main className="md:mx-8">
      <div className="mx-auto py-9 px-8 md:px-12">
        <SortBy totalCards={totalCards} />
        <div>{time}</div>
        <ProductCardGrid productCards={productCards} />
        <InfiniteScroll
          key={"sortBy=" + (sortBy ?? "")}
          page={page}
          totalPages={Math.ceil(totalCards / perPage)}
          apiPath={apiPath}
          DisplayGridComponent={<ProductCardGrid productCards={[]} />}
        />
      </div>
    </main>
  );
}
