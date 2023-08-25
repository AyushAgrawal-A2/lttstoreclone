"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";
import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface AppThemeProps {
  cookieTheme?: string;
}

export default function AppTheme({ cookieTheme }: AppThemeProps) {
  const [theme, setTheme] = useState<string>(cookieTheme ?? "light");

  const applyTheme = useCallback((theme: string) => {
    setTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  const changeTheme = useCallback(
    (theme: string) => {
      Cookies.set("theme", theme);
      applyTheme(theme);
    },
    [applyTheme]
  );

  useEffect(() => {
    if (!cookieTheme) {
      const operatingSystemTheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );
      const systemTheme = operatingSystemTheme.matches ? "dark" : "light";
      applyTheme(systemTheme);
    }
  }, [cookieTheme, applyTheme]);

  return (
    <button onClick={() => changeTheme(theme === "dark" ? "light" : "dark")}>
      <FontAwesomeIcon
        icon={theme === "dark" ? faMoon : faSun}
        size={"lg"}
        className="hover:scale-[1.15] pr-2"
      />
    </button>
  );
}
