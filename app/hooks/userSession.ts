import { useEffect, useState } from "react"
import { UserSessionType } from "../types"
import { getUserSession } from "../actions/authenticating";

const useSession = ()=>{
    const [session, setSession] = useState<UserSessionType>(null);
    useEffect(()=>{
        const init = async ()=>{
            const response = await getUserSession();
            if(response?.isAuthenticated && response.user){
                setSession(response);
                console.log(response);
            }
        }
        init();
    }, []);
    return session;
}
export default useSession;