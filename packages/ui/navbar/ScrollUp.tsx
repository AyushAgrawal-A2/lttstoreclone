'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export default function ScrollUp() {
  const scrollUpElRef = useRef<HTMLDivElement>(null);
  const scrollYValRef = useRef(0);
  const throttleRef = useRef<boolean>(false);
  const [scrollUp, setScrollUp] = useState(false);

  const handleScroll = useCallback(() => {
    if (throttleRef.current) return;
    throttleRef.current = true;
    setTimeout(() => (throttleRef.current = false), 250);

    const parentEl = scrollUpElRef.current?.parentElement;
    if (!parentEl) return;
    if (
      scrollUp &&
      (document.documentElement.scrollTop >= scrollYValRef.current ||
        document.documentElement.scrollTop === 0)
    ) {
      parentEl.classList.remove('z-30');
      parentEl.classList.remove('top-0');
      parentEl.classList.remove('border-b');
      parentEl.classList.remove('animate-slideInY');
      parentEl.classList.remove('bg-fgSecondary');
      setScrollUp(false);
    } else if (
      !scrollUp &&
      document.documentElement.scrollTop < scrollYValRef.current &&
      document.documentElement.scrollTop !== 0
    ) {
      parentEl.classList.add('z-30');
      parentEl.classList.add('top-0');
      parentEl.classList.add('border-b');
      parentEl.classList.add('animate-slideInY');
      parentEl.classList.add('bg-fgSecondary');
      setScrollUp(true);
    }
    scrollYValRef.current = document.documentElement.scrollTop;
  }, [scrollUp]);

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => document.removeEventListener('scroll', handleScroll);
  }, [scrollUp, handleScroll]);
  return <div ref={scrollUpElRef}></div>;
}
