'use client';

import { useState, useEffect, useRef } from 'react';

export function ScrollUp() {
  const scrollUpRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef(0);
  const throttleRef = useRef<boolean>(false);
  const [scrollUp, setScrollUp] = useState(false);

  useEffect(() => {
    document.addEventListener('scroll', onScroll);
    function onScroll() {
      if (throttleRef.current) return;
      throttleRef.current = true;
      setTimeout(() => (throttleRef.current = false), 250);
      const navbarEl = scrollUpRef.current?.parentElement;
      if (!navbarEl) return;
      if (
        scrollUp &&
        (document.documentElement.scrollTop >= scrollYRef.current ||
          document.documentElement.scrollTop === 0)
      ) {
        navbarEl.classList.remove('top-0');
        navbarEl.classList.remove('border-b');
        navbarEl.classList.remove('animate-slideInY');
        navbarEl.classList.remove('bg-fgSecondary');
        setScrollUp(false);
      } else if (
        !scrollUp &&
        document.documentElement.scrollTop < scrollYRef.current &&
        document.documentElement.scrollTop !== 0
      ) {
        navbarEl.classList.add('top-0');
        navbarEl.classList.add('border-b');
        navbarEl.classList.add('animate-slideInY');
        navbarEl.classList.add('bg-fgSecondary');
        setScrollUp(true);
      }
      scrollYRef.current = document.documentElement.scrollTop;
    }
    return () => document.removeEventListener('scroll', onScroll);
  }, [scrollUp]);
  return <div ref={scrollUpRef}></div>;
}
