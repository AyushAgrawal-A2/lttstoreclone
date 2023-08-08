import SortBy from '@/packages/ui/collections/SortBy';
import ProductCardsGrid from '@/packages/ui/collections/ProductCardsGrid';
import fetchProductCards from '@/packages/serverActions/fetchProductCards';

// export async function generateStaticParams() {
//   return ['accessories', 'clothing', 'all-products-1'];
// }

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
      <div className="max-w-[1800px] mx-auto py-9 px-8 md:px-12">
        <SortBy totalCards={totalCards} />
        <ProductCardsGrid
          collection={collection}
          perPage={perPage}
          sortBy={sortBy}
          initialProductCards={productCards}
          totalCards={totalCards}
        />
      </div>
    </main>
  );
}
