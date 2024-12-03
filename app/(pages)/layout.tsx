// nav bar and body aligns each other by their margin and height.



import type { Metadata } from "next"
import PrimeNav from "./_components/PrimeNav";
import clsx from "clsx";
import { SIDE_GAP } from "../constants/classConstants";






interface LayoutProps {
  children: React.ReactNode;
}
export const metadata: Metadata = {
  title: 'localhost',
  description: 'localhost:3000, developers meeting center'
}

const layout = ({children}: LayoutProps) => {
  return (
    <html data-theme="light">
      <body>
        <div className="fixed top-0 left-0 w-screen">
          <div className={clsx(
            'w-full h-[10vh]',
            SIDE_GAP
          )}>
            <PrimeNav />
          </div>
        </div>
        <main className={clsx(
          SIDE_GAP,
          'mt-[10vh] py-4'
        )}>
          {children}
        </main>
      </body>
    </html>
  )
}

export default layout