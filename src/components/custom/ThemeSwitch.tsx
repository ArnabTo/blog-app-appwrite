'use client';

import { Switch, VisuallyHidden, useSwitch } from "@nextui-org/react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitch = (props:any) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []); // To avoid mismatched render on the server

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch(props);

  if (!mounted) return null; // Avoid rendering before hydration

  const isDarkMode = theme === "dark";

  return (
    <div className="flex flex-col gap-2">
      <Component {...getBaseProps()}>
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          className={slots.wrapper({
            class: [
              "w-7 h-7",
              "flex items-center justify-center",
              "rounded-lg bg-transparent hover:bg-default-200 transition-all delay-100",
            ],
          })}
          onClick={() => setTheme(isDarkMode ? "light" : "dark")} // Toggle between themes
        >
          {isDarkMode ? <SunIcon className='text-secondary'/> : <MoonIcon className="text-textcolor"/>}
        </div>
      </Component>
    </div>
  );
};

export default ThemeSwitch;
