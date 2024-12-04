"use client";

import { SIZE_SM } from "@/app/constants/classConstants";
import clsx from "clsx";
import Link from "next/link";
import { FiHexagon, FiHome } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import UserPrimeNav from "./UserPrimeNav";

interface Page {
  text: string;
  href: string;
  icon?: React.ReactNode;
}

const pages: Page[]=[
  {
    text: 'home',
    href: '/',
    icon: <FiHome className={clsx(
      SIZE_SM
    )}/>
  }
]

const PrimeNav = () => {
  return (
    <nav className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <FiHexagon className={clsx(
          SIZE_SM
        )} />
        <span>DevCompany</span>
      </div>
      <div className="flex items-center gap-8">
        <ThemeToggle />
        <UserPrimeNav />
        <ul>
          {
            pages.map((page: Page, index: number)=>(
              <li key={index}>
                <Link href={page.href}>
                  <div className="flex items-center gap-2">
                    <span>{page.text}</span>
                    {page.icon}
                  </div>
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    </nav>
  )
}

export default PrimeNav;