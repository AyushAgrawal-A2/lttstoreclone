'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProductCard from '@/packages/ui/ProductCard';
import Loading from '@/packages/ui/Loading';

export default function Collections() {
  const collection = useParams().collection as string;
  const [curCollection, setCurCollection] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [productCards, setProductCards] = useState<ProductCard[]>([]);
  const [totalCards, setTotalCards] = useState<number>(0);
  const [sortCriteria, setSortCriteria] = useState<string>('');

  // if (category === 'all')
  //   document.title = 'All Products - Linus Tech Tips Store';
  // else if (category === 'accessories')
  //   document.title = 'Gear - Linus Tech Tips Store';
  // else if (category === 'clothing')
  //   document.title = 'Clothing - Linus Tech Tips Store';
  // else document.title = category.toUpperCase() + ' - Linus Tech Tips Store';

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    function handleScroll() {
      if (
        !loading &&
        !allLoaded &&
        document.documentElement.clientHeight +
          document.documentElement.scrollTop >=
          document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
        setLoading(true);
      }
    }
    if (collection !== curCollection) {
      setCurCollection(collection);
      setPage(1);
      setLoading(true);
      setAllLoaded(false);
      setProductCards([]);
      setTotalCards(0);
      setSortCriteria('');
    } else if (loading && !allLoaded) {
      const apiURL = '/api/collections/' + curCollection;
      const searchParams = new URLSearchParams({
        page: page.toString(),
        perPage: '12',
        sortBy: 'featured',
        sortDirection: 'desc',
      });
      const path = `${apiURL}?${searchParams.toString()}`;
      fetch(path)
        .then((res) => {
          if (res.ok) return res.json();
          // navigate('/404');
        })
        .then(({ productCards, totalCards }) => {
          if (productCards.length < 12) setAllLoaded(true);
          setProductCards((prev) => [
            ...prev.slice(0, 12 * (page - 1)),
            ...productCards,
          ]);
          setTotalCards(totalCards);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          // navigate('/404');
        });
    }
    return () => document.removeEventListener('scroll', handleScroll);
  }, [collection, curCollection, page, sortCriteria, loading, allLoaded]);

  function handleSortBy(e: React.ChangeEvent<HTMLSelectElement>) {
    setPage(1);
    setLoading(true);
    setAllLoaded(false);
    setSortCriteria(e.target.value);
  }

  return (
    <main className="md:mx-8">
      <div className="max-w-[1800px] mx-auto py-9 px-8 md:px-12">
        <div className="flex justify-end items-center py-4 text-sm font-bold text-fgTertiary">
          <label htmlFor="sortBy">SORT BY:</label>
          <select
            name="sortBy"
            className="mx-2 bg-bgPrimary focus-visible:outline-none"
            onChange={handleSortBy}>
            <option
              value="featured,desc"
              className="text-sm font-semibold text-fgTertiary">
              FEATURED
            </option>
            <option
              value="bestseller"
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
        <div className="flex flex-wrap">
          {productCards.map((productCard) => (
            <div
              key={productCard.path}
              className="w-1/2 lg:w-1/3 p-1">
              <ProductCard productCard={productCard} />
            </div>
          ))}
        </div>
        {loading && <Loading />}
      </div>
    </main>
  );
}
