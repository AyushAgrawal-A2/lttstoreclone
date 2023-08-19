'use client';

import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

export default function Sidebar() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const displaySideBar = useCallback(() => {
    document.body.style.overflow = 'hidden';
    setSidebarIsOpen(true);
  }, []);

  const hideSideBar = useCallback(() => {
    document.body.style.overflow = 'auto';
    setSidebarIsOpen(false);
  }, []);

  useEffect(() => {
    function handleResize() {
      if (!sidebarIsOpen) return;
      if (window.outerWidth >= 768) document.body.style.overflow = 'auto';
      else document.body.style.overflow = 'hidden';
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarIsOpen]);

  return (
    <>
      {!sidebarIsOpen && (
        <FontAwesomeIcon
          icon={faBars}
          size={'lg'}
          className={'hover:scale-[1.15] px-2'}
          onClick={displaySideBar}
        />
      )}
      {sidebarIsOpen && (
        <FontAwesomeIcon
          icon={faXmark}
          size={'lg'}
          className={'hover:scale-[1.15] px-2'}
          onClick={hideSideBar}
        />
      )}
      <div
        className={
          'absolute top-0 left-0 bg-bgPrimary h-screen w-full flex flex-col justify-between pt-24 px-7 text-lg font-semibold text-fgTertiary -z-10' +
          `${sidebarIsOpen ? ' block animate-slideInX' : ' hidden'}`
        }>
        <div className="flex flex-col gap-4 py-8 items-center">
          <Link
            href={'/'}
            onClick={hideSideBar}>
            Home
          </Link>
          <Link
            href={'/collections/accessories'}
            onClick={hideSideBar}>
            Gear
          </Link>
          <Link
            href={'/collections/clothing'}
            onClick={hideSideBar}>
            Clothing
          </Link>
          <Link
            href={'/collections/all-products-1'}
            onClick={hideSideBar}>
            All Products
          </Link>
        </div>
        <div className="fixed bottom-4 text-sm">
          <Link
            href={'/account/login'}
            onClick={hideSideBar}>
            <FontAwesomeIcon
              icon={faUser}
              size="lg"
              className="pr-2"
            />
            Log in
          </Link>
        </div>
      </div>
    </>
  );
}
