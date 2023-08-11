'use client';

import fetchProductCards from '@/packages/serverActions/fetchProductCards';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function Searchbar() {
  const [searchbarIsShown, setSearchbarIsShown] = useState<boolean>(false);
  const [searchResultsAreShown, setSearchResultsAreShown] =
    useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [productCards, setProductCards] = useState<ProductCard[]>([]);
  const timeoutId = useRef<NodeJS.Timeout>();
  const router = useRouter();

  function resetSearchBar() {
    setSearchbarIsShown(false);
    setSearchResultsAreShown(false);
    setSearchText('');
    setProductCards([]);
  }

  useEffect(() => {
    function getSearchResult() {
      if (!searchText) setSearchResultsAreShown(false);
      else {
        fetchProductCards('all-products-1', 1, 4, 'bestseller,asc', searchText)
          .then(({ productCards }) => {
            setProductCards(productCards);
            setSearchResultsAreShown(true);
          })
          .catch(console.log);
      }
    }
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(getSearchResult, 250);
    return () => clearTimeout(timeoutId.current);
  }, [searchText]);

  function displaySearchbar() {
    document.body.style.overflow = 'hidden';
    setSearchbarIsShown(true);
  }

  function hideSearchbar() {
    document.body.style.overflow = 'auto';
    resetSearchBar();
  }

  function handleResultClick(path: string) {
    setSearchbarIsShown(false);
    resetSearchBar();
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    resetSearchBar();
    gotoSearchPage();
  }

  function gotoSearchPage() {
    console.log(searchText);
  }

  return (
    <div>
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        size={'lg'}
        className="hover:scale-[1.15] px-2"
        onClick={displaySearchbar}
      />
      <div
        className={`absolute top-0 left-0 h-full w-full bg-gradient justify-center items-center z-40  ${
          searchbarIsShown ? 'flex' : 'hidden'
        }`}>
        <form
          onSubmit={handleSubmit}
          className="relative bg-bgSecondary rounded-md flex items-center h-12 w-10/12 lg:w-3/5">
          <input
            id="search-items"
            placeholder=" "
            className="peer bg-bgSecondary pt-3 pl-3 rounded-md outline-0 text-fgSecondary w-[95%] font-semibold"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <label
            htmlFor="search-items"
            className="absolute top-0 left-3 text-fgSecondary text-xs peer-focus:text-xs peer-focus:top-0 peer-placeholder-shown:text-lg peer-placeholder-shown:top-2 font-semibold">
            Search
          </label>
          {searchResultsAreShown && (
            <div className="bg-fgSecondary absolute top-12 w-full p-3 font-bold text-fgTertiary rounded-md border border-bgSecondary">
              {productCards.length > 0 && (
                <div>
                  <div className="p-1">Products</div>
                  {productCards.map((productCard) => (
                    <div
                      key={productCard.path}
                      className="flex items-center w-full hover:underline p-2"
                      onClick={() => handleResultClick(productCard.path)}>
                      <Image
                        alt={productCard.title}
                        src={productCard.images[0].src}
                        className="h-14 w-fit"
                        width={1500}
                        height={1500}
                        sizes="75px"
                      />
                      <div className="pl-4">{productCard.title}</div>
                    </div>
                  ))}
                </div>
              )}
              <div
                className="p-2 cursor-pointer"
                onClick={gotoSearchPage}>
                Search for &quot;{searchText}&quot;
              </div>
            </div>
          )}
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size={'xl'}
            className="hover:scale-[1.15] text-fgSecondary p-2 cursor-pointer"
            onClick={gotoSearchPage}
          />
          <FontAwesomeIcon
            icon={faXmark}
            size={'2xl'}
            className="hover:scale-[1.15] absolute right-[-35px]"
            onClick={hideSearchbar}
          />
        </form>
      </div>
      <div
        className={
          'w-full h-screen top-0 left-0 -z-10 bg-black opacity-30' +
          (searchbarIsShown ? ' absolute' : ' hidden')
        }
        onClick={hideSearchbar}
      />
    </div>
  );
}
