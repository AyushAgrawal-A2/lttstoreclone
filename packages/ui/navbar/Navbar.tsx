'use client';

import { useState, useEffect, useRef } from 'react';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import NavbarTitle from './NavbarTitle';
import NavbarIcon from './NavbarIcon';
import Sidebar from './Sidebar';
import Searchbar from './Searchbar';
import AppTheme from './AppTheme';
import Logo from '../common/Logo';
import Link from 'next/link';

export default function Navbar() {
  const scrollY = useRef(0);
  const [scrollUp, setScrollUp] = useState(false);

  useEffect(() => {
    document.addEventListener('scrollend', onScroll);
    function onScroll() {
      if (
        scrollUp &&
        (document.documentElement.scrollTop >= scrollY.current ||
          document.documentElement.scrollTop === 0)
      )
        setScrollUp(false);
      else if (
        !scrollUp &&
        document.documentElement.scrollTop < scrollY.current &&
        document.documentElement.scrollTop !== 0
      )
        setScrollUp(true);
      scrollY.current = document.documentElement.scrollTop;
    }
    return () => document.removeEventListener('scrollend', onScroll);
  }, [scrollUp]);

  return (
    <div
      id="navbar"
      className={`z-20 ${
        scrollUp && 'top-0 border-b animate-slideInY bg-black'
      } sticky bg-bgPrimary`}>
      <div className="flex flex-row items-center justify-between px-5 md:px-12 py-2 md:py-5">
        <div className="md:hidden w-24">
          <Sidebar />
        </div>
        <Link href="/">
          <Logo size={50} />
        </Link>
        <div className="hidden md:flex flex-row gap-[10px] lg:gap-[50px] text-xl font-semibold">
          <NavbarTitle
            href="/"
            name="Home"
          />
          <NavbarTitle
            href="/collections/accessories"
            name="Gear"
          />
          <NavbarTitle
            href="/collections/clothing"
            name="Clothing"
          />
          <NavbarTitle
            href="/collections/all-products-1"
            name="All Products"
          />
        </div>
        <div className="flex flex-row w-24 md:w-32">
          <AppTheme />
          <Searchbar />
          {/* <div className="hidden md:block px-2">
            <NavbarIcon
              href="/account"
              faIcon={faUser}
            />
          </div>
          <div className="pl-2">
            <NavbarIcon
              href="/cart"
              faIcon={faCartShopping}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
}
