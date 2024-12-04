"use client";

import { SIZE_SM } from "@/app/constants/classConstants";
import clsx from "clsx";
import { useState } from "react";
import { TbMoon, TbSun } from "react-icons/tb";


const ThemeToggle = () => {
  const [theme, setTheme] = useState<string>('');
  const changeTheme = (themeName: string)=>{
    setTheme(themeName);
    document.querySelector('html')?.setAttribute('data-theme', theme);
  }
  return (
    <button onClick={()=>changeTheme(theme==='dark'?'light':'dark')} className="cursor-pointer">
      {
        theme==='dark'?(
          <div className="flex items-center gap-2">
            <TbSun className={clsx(SIZE_SM)} />
            <span>light</span>
          </div>
        ):(
          <div className="flex items-center gap-2">
            <TbMoon className={clsx(SIZE_SM)} />
            <span>dark</span>
          </div>
        )
      }
    </button>
  )
}

export default ThemeToggle