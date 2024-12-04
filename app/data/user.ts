import { mongodb } from "../libs/mongodb"

export const getUserByUsername = async (username: string)=>{
    try{
        const user = await mongodb.user.findUnique({
            where: {
                username
            }
        });
        return user;
    }catch{
        return null;
    }
}