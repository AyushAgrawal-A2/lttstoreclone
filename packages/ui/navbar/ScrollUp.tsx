'use client';

import { useCallback, useEffect, useRef } from 'react';

export default function ScrollUp() {
  const scrollUpElRef = useRef<HTMLDivElement>(null);
  const scrollYValRef = useRef(0);
  const scrollUpState = useRef<boolean>(false);
  const throttleStatusRef = useRef<boolean>(false);
  const throttleTimoutRef = useRef<NodeJS.Timeout>();

  const hideNavbar = useCallback(() => {
    const parentEl = scrollUpElRef.current?.parentElement;
    if (!parentEl) return;
    parentEl.classList.remove('top-0');
    parentEl.classList.remove('border-b');
    parentEl.classList.remove('animate-slideInY');
    parentEl.classList.remove('bg-fgSecondary');
    scrollUpState.current = false;
  }, []);

  const showNavbar = useCallback(() => {
    const parentEl = scrollUpElRef.current?.parentElement;
    if (!parentEl) return;
    parentEl.classList.add('top-0');
    parentEl.classList.add('border-b');
    parentEl.classList.add('animate-slideInY');
    parentEl.classList.add('bg-fgSecondary');
    scrollUpState.current = true;
  }, []);

  useEffect(() => {
    function handleScroll() {
      if (throttleStatusRef.current && document.documentElement.scrollTop !== 0)
        return;
      throttleStatusRef.current = true;
      clearTimeout(throttleTimoutRef.current);
      throttleTimoutRef.current = setTimeout(
        () => (throttleStatusRef.current = false),
        250
      );
      if (
        scrollUpState.current &&
        (document.documentElement.scrollTop >= scrollYValRef.current ||
          document.documentElement.scrollTop === 0)
      )
        hideNavbar();
      else if (
        !scrollUpState.current &&
        document.documentElement.scrollTop < scrollYValRef.current &&
        document.documentElement.scrollTop !== 0
      )
        showNavbar();
      scrollYValRef.current = document.documentElement.scrollTop;
    }
    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, [hideNavbar, showNavbar]);
  return <div ref={scrollUpElRef}></div>;
}
