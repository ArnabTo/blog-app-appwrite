'use client';

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeSwitch = () => {
  const { theme, setTheme, resolvedTheme } = useTheme(); // Use `resolvedTheme` to get the actual applied theme
  const [mounted, setMounted] = useState(false);

  // This useEffect ensures the component waits until mounted before rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Avoid rendering before hydration to prevent mismatch

  const isDarkMode = resolvedTheme === "dark"; // Use resolvedTheme to determine if dark mode is active

  return (
    <div
      className="w-7 h-7 flex items-center justify-center rounded-lg bg-transparent hover:bg-default-200 transition-all delay-100 cursor-pointer"
      onClick={() => setTheme(isDarkMode ? "light" : "dark")} // Toggle between dark and light modes
    >
      {isDarkMode ? (
        <SunIcon className="text-secondary" />
      ) : (
        <MoonIcon className="text-textcolor" />
      )}
    </div>
  );
};

export default ThemeSwitch;
