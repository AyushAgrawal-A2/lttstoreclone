import ProductCardsGridInfiniteScroll from '@/packages/ui/collections/ProductCardsGridInfiniteScroll';
import ProductCardGrid from '@/packages/ui/collections/ProductCardsGrid';
import SortBy from '@/packages/ui/collections/SortBy';
import { Suspense } from 'react';
import fetchProductCards from '@/packages/serverActions/fetchProductCards';
import { getProductCollections } from '@/packages/prisma/products';

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
    typeof searchParams.sortBy === 'string' ? searchParams.sortBy : undefined;
  const { productCards, totalCards } = await fetchProductCards(
    collection,
    page,
    perPage,
    sortBy
  );

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
        <ProductCardGrid productCards={productCards} />
        <Suspense>
          <ProductCardsGridInfiniteScroll
            collection={collection}
            perPage={perPage}
            sortBy={sortBy}
            totalCards={totalCards}
          />
        </Suspense>
      </div>
    </main>
  );
}
