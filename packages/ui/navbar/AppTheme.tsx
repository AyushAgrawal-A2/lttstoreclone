'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function AppTheme() {
  const [theme, setTheme] = useState<string>();

  function changeTheme(theme: string) {
    setTheme(theme);
    Cookies.set('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }

  useEffect(() => {
    if (theme) return;
    const cookieTheme = Cookies.get('theme');
    if (cookieTheme) changeTheme(cookieTheme);
    else {
      const operatingSystemTheme = window.matchMedia(
        '(prefers-color-scheme: dark)'
      );
      const systemTheme = operatingSystemTheme.matches ? 'dark' : 'light';
      changeTheme(systemTheme);
    }
  }, [theme]);

  return (
    <button onClick={() => changeTheme(theme === 'dark' ? 'light' : 'dark')}>
      <FontAwesomeIcon
        icon={theme === 'dark' ? faMoon : faSun}
        size={'lg'}
        className="hover:scale-[1.15] pr-2"
      />
    </button>
  );
}
