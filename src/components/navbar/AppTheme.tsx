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

  const changeTheme = useCallback((theme: string) => {
    document.documentElement.setAttribute("data-theme", theme);
    Cookies.set("theme", theme);
    setTheme(theme);
  }, []);

  useEffect(() => {
    if (!cookieTheme) {
      const operatingSystemTheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );
      if (operatingSystemTheme.matches) changeTheme("dark");
    }
  }, [cookieTheme, changeTheme]);

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
