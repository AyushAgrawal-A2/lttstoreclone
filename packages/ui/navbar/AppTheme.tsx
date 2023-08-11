'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';

export default function AppTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  function setLightTheme() {
    document.documentElement.setAttribute('data-theme', 'light');
    window.localStorage.setItem('prefered-theme', 'light');
    setTheme('light');
  }

  function setDarkTheme() {
    document.documentElement.setAttribute('data-theme', 'dark');
    window.localStorage.setItem('prefered-theme', 'dark');
    setTheme('dark');
  }

  useEffect(() => {
    const operatingSystemTheme = window.matchMedia(
      '(prefers-color-scheme: dark)'
    );
    function handleSystemThemeChange(e: MediaQueryListEvent) {
      e.matches ? setDarkTheme() : setLightTheme();
    }
    operatingSystemTheme.addEventListener('change', handleSystemThemeChange);

    const storedTheme = window.localStorage.getItem('prefered-theme');
    if (storedTheme) {
      storedTheme === 'light' ? setLightTheme() : setDarkTheme();
    } else if (operatingSystemTheme.matches) {
      setDarkTheme();
    }

    return () =>
      operatingSystemTheme.removeEventListener(
        'change',
        handleSystemThemeChange
      );
  }, []);

  return (
    <FontAwesomeIcon
      icon={theme === 'dark' ? faSun : faMoon}
      size={'lg'}
      className="hover:scale-[1.15] pr-2"
      onClick={() => {
        theme === 'light' ? setDarkTheme() : setLightTheme();
      }}
    />
  );
}
