"use client";

import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
// import fetchProductCards from '@/src/serverActions/fetchProductCards';

export default function Searchbar() {
  const [searchbarIsShown, setSearchbarIsShown] = useState<boolean>(false);
  const [searchResultsAreShown, setSearchResultsAreShown] =
    useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [productCards, setProductCards] = useState<ProductCard[]>([]);
  const debounceTimoutRef = useRef<NodeJS.Timeout>();
  const router = useRouter();

  const resetSearchBar = useCallback(() => {
    setSearchbarIsShown(false);
    setSearchResultsAreShown(false);
    setSearchText("");
    setProductCards([]);
  }, []);

  const displaySearchbar = useCallback(() => {
    document.body.style.overflow = "hidden";
    setSearchbarIsShown(true);
  }, []);

  const hideSearchbar = useCallback(() => {
    document.body.style.overflow = "auto";
    resetSearchBar();
  }, [resetSearchBar]);

  const handleResultClick = useCallback(
    (path: string) => {
      router.replace(path);
      resetSearchBar();
    },
    [router, resetSearchBar]
  );

  const gotoSearchPage = useCallback(() => {
    console.log(searchText);
  }, [searchText]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      resetSearchBar();
      gotoSearchPage();
    },
    [resetSearchBar, gotoSearchPage]
  );

  const loadProductCards = useCallback(async (searchText: string) => {
    const searchParams = new URLSearchParams({
      page: "1",
      perPage: "4",
      sortBy: "bestseller,asc",
      searchText,
    });
    const path = `/api/collections/all-products-1?${searchParams.toString()}`;
    const {
      data: { productCards },
    } = await axios.get(path);
    // const { productCards } = await fetchProductCards('all-products-1', 1, 4, 'bestseller,asc', searchText);
    setProductCards(productCards);
    setSearchResultsAreShown(true);
  }, []);

  const getSearchResult = useCallback(
    (searchText: string) => {
      if (!searchText) setSearchResultsAreShown(false);
      else loadProductCards(searchText);
    },
    [loadProductCards]
  );

  const handleSearchInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
      clearTimeout(debounceTimoutRef.current);
      debounceTimoutRef.current = setTimeout(
        () => getSearchResult(e.target.value),
        250
      );
    },
    [getSearchResult]
  );

  return (
    <>
      <button onClick={displaySearchbar}>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          size={"lg"}
          className="hover:scale-[1.15] px-2"
        />
      </button>
      <div
        className={`absolute top-0 left-0 h-full w-full bg-gradient justify-center items-center ${
          searchbarIsShown ? "flex" : "hidden"
        }`}>
        <form
          onSubmit={handleSubmit}
          className="relative bg-bgSecondary rounded-md flex items-center h-12 w-10/12 lg:w-3/5">
          <input
            id="search-items"
            placeholder=""
            className="peer bg-bgSecondary pt-3 pl-3 rounded-md outline-0 text-fgSecondary w-[95%] font-semibold"
            value={searchText}
            onChange={handleSearchInput}
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
                      className="flex items-center w-full hover:underline p-2 cursor-pointer"
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
            size={"xl"}
            className="hover:scale-[1.15] text-fgSecondary p-2 cursor-pointer"
            onClick={gotoSearchPage}
          />
          <FontAwesomeIcon
            icon={faXmark}
            size={"2xl"}
            className="hover:scale-[1.15] absolute right-[-35px]"
            onClick={hideSearchbar}
          />
        </form>
      </div>
      <div
        className={
          "w-full h-screen top-0 left-0 -z-10 bg-black opacity-30" +
          (searchbarIsShown ? " absolute" : " hidden")
        }
        onClick={hideSearchbar}
      />
    </>
  );
}
