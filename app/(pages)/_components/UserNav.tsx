"use client";
import Link from "next/link";
import { useState } from "react";


const UserNav = () => {
    const [user, setUser] = useState(null);
    if(!user){
        <button className="flex items-center gap-2">
            <Link href="/">
                <span>login</span>
            </Link>
            <Link href="/">
                <span>signup</span>
            </Link>
        </button>
    }
  return (
    <div>user active</div>
  )
}

export default UserNav