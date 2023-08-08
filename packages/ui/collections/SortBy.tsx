'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface SortByProps {
  totalCards: number;
}

export default function SortBy({ totalCards }: SortByProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function handleSortBy(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sortBy', e.target.value);
    router.push(pathname + '?' + params.toString());
  }

  return (
    <div className="flex justify-end items-center py-4 text-sm font-bold text-fgTertiary">
      <label htmlFor="sortBy">SORT BY:</label>
      <select
        name="sortBy"
        className="mx-2 bg-bgPrimary focus-visible:outline-none"
        onChange={(e) => handleSortBy(e)}>
        <option
          value="featured,desc"
          className="text-sm font-semibold text-fgTertiary">
          FEATURED
        </option>
        <option
          value="bestseller,asc"
          className="text-sm font-semibold text-fgTertiary">
          BEST SELLING
        </option>
        <option
          value="alphabetically,asc"
          className="text-sm font-semibold text-fgTertiary">
          ALPHABETICALLY, A-Z
        </option>
        <option
          value="alphabetically,desc"
          className="text-sm font-semibold text-fgTertiary">
          ALPHABETICALLY, Z-A
        </option>
        <option
          value="price,asc"
          className="text-sm font-semibold text-fgTertiary">
          PRICE, LOW TO HIGH
        </option>
        <option
          value="price,desc"
          className="text-sm font-semibold text-fgTertiary">
          PRICE, HIGH TO LOW
        </option>
        <option
          value="date,desc"
          className="text-sm font-semibold text-fgTertiary">
          DATE, OLD TO NEW
        </option>
        <option
          value="date,asc"
          className="text-sm font-bold text-fgTertiary">
          DATE, NEW TO OLD
        </option>
      </select>
      <div className="text-sm font-bold text-fgTertiary px-1">
        {totalCards + ' PRODUCTS'}
      </div>
    </div>
  );
}
