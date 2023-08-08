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

export default function Navbar() {
  const scrollY = useRef(0);
  const [scrollUp, setScrollUp] = useState(false);

  useEffect(() => {
    document.addEventListener('scroll', onScroll);
    function onScroll() {
      if (
        scrollUp &&
        (document.documentElement.scrollTop >= scrollY.current ||
          document.documentElement.scrollTop === 0)
      )
        setScrollUp(false);
      else if (
        !scrollUp &&
        document.documentElement.scrollTop < scrollY.current
      )
        setScrollUp(true);
      scrollY.current = document.documentElement.scrollTop;
    }
    return () => document.removeEventListener('scroll', onScroll);
  }, [scrollUp]);

  console.log(scrollUp);

  return (
    <div
      id="navbar"
      className={`${
        scrollUp && 'top-0 border-b animate-slideInY bg-black z-20'
      } sticky bg-bgPrimary`}>
      <div className="flex flex-row items-center justify-between px-5 md:px-12 py-2 md:py-5">
        <div className="md:hidden w-24">
          <Sidebar />
        </div>
        <NavbarIcon href="/">
          <Logo size={50} />
        </NavbarIcon>
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
          <div className="hidden md:block px-2">
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
          </div>
        </div>
      </div>
    </div>
  );
}
