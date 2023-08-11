import API_ENDPOINT from '@/packages/config/api_endpoints';
import ProductCardsGridInfiniteScroll from '@/packages/ui/collections/ProductCardsGridInfiniteScroll';
import ProductCardGrid from '@/packages/ui/collections/ProductCardsGrid';
import SortBy from '@/packages/ui/collections/SortBy';
import loadMoreProductCards from '@/packages/utils/loadMoreProductCards';

// export const runtime = 'edge';
export function generateStaticParams() {
  return [
    { collection: 'accessories' },
    { collection: 'clothing' },
    { collection: 'all-products-1' },
  ];
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
  const { productCards, totalCards } = await loadMoreProductCards(
    collection,
    page,
    perPage,
    sortBy
  ).catch(console.log);

  // if (category === 'all')
  //   document.title = 'All Products - Linus Tech Tips Store';
  // else if (category === 'accessories')
  //   document.title = 'Gear - Linus Tech Tips Store';
  // else if (category === 'clothing')
  //   document.title = 'Clothing - Linus Tech Tips Store';
  // else document.title = category.toUpperCase() + ' - Linus Tech Tips Store';

  return (
    <main className="md:mx-8">
      <div className="max-w-[1800px] mx-auto py-9 px-8 md:px-12">
        <SortBy totalCards={totalCards} />
        <ProductCardGrid productCards={productCards} />
        <ProductCardsGridInfiniteScroll
          collection={collection}
          perPage={perPage}
          sortBy={sortBy}
          totalCards={totalCards}
        />
      </div>
    </main>
  );
}
