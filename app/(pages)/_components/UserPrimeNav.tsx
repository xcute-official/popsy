"use client";
import { signout } from "@/app/actions/authenticating";
import useSession from "@/app/hooks/userSession";

import Link from "next/link";
import { useRouter } from "next/navigation";



const UserPrimeNav = () => {
    const router = useRouter();
    const user = useSession();
    const handleLogout = ()=>{
        signout().then((response)=>{
            if(response.success && response.redirectedTo){
                router.push(response.redirectedTo);
            }
        })
    }
    if(!user?.isAuthenticated && !user?.user){
        return (
            <button className="flex items-center">
                <Link href="/">
                    <span>login</span>
                </Link>
                <span>/</span>
                <Link href="/">
                    <span>signup</span>
                </Link>
            </button>
        )
    }
    return (
        <div className="relative cursor-pointer">
            <div>
                <span>{user?.user?.username}</span>
            </div>
            <ul className="absolute top-full right-0 p-2 rounded-md border">
                <li onClick={()=>handleLogout()}>
                    logout
                </li>
            </ul>
        </div>
    )
}

export default UserPrimeNav