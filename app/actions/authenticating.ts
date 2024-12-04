"use server";

import { FieldValues } from "react-hook-form";
import bcrypt from 'bcryptjs';
import { ActionResponseIntrfc, UserSessionInfoIntrfc, UserSessionType } from "../types";
import { SigninSchema, SignupSchema } from "../schemas/authenticating";
import { getUserByUsername } from "../data/user";
import { mongodb } from "../libs/mongodb";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';




export const getUserSession = async (): Promise<UserSessionType> => {
    const cookie = await cookies();
    const token = cookie.get('authToken')?.value;
    if(!token || !process.env.JWT_SECRET){
        return null;
    }
    const sessionData = jwt.verify(token, process.env.JWT_SECRET) as UserSessionInfoIntrfc;
    return {
        user: sessionData,
        isAuthenticated: true
    }
}






export const signin = async (data: FieldValues): Promise<ActionResponseIntrfc>=>{
    const validation = SigninSchema.safeParse(data);
    if(!validation.success){
        return {
            error: 'Invalid data'
        }
    }
    const { id, password } = validation.data;
    try{
        const userExists = await getUserByUsername(id);
        if(!userExists){
            return {
                error: "user doesn't exists"
            }
        }
        if(!userExists.hashedPassword || !userExists.username || !userExists.email){
            return {
                error: "user not found"
            }
        }
        const passwordMatch = await bcrypt.compare(password, userExists.hashedPassword);
        if(!passwordMatch){
            return {
                error: "Wrong password"
            }
        }
        if(!process.env.JWT_SECRET){
            return {
                error: "Internal server error"
            }
        }
        const payload: UserSessionInfoIntrfc = {
            username: userExists.username,
            id: userExists.id
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1h'});
        (await cookies()).set({
            name: 'authToken',
            value: token,
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV==='production',
            maxAge: 3600,
            path: '/'
        })
        return {
            success: "Verified",
            redirectedTo: `/user/profile/${userExists.username}`
        }
    }catch{
        return {
            error: 'failed for user login',
        }
    }
}
export const signup = async (data: FieldValues): Promise<ActionResponseIntrfc>=>{
    const validation = SignupSchema.safeParse(data);
    if(!validation.success){
        return {
            success: 'Invalid data'
        }
    }
    const { username, email, password } = validation.data;
    try{
        const userExists = await getUserByUsername(username);
        if(userExists){
            return {
                error: "user exists"
            }
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await mongodb.user.create({
            data: {
                username,
                hashedPassword: passwordHash,
                email
            }
        });
        if(!user){
            return {
                error: "Error while creating user"
            } 
        }
        return {
            success: "User created success",
            redirectedTo: `/user/profile/${user.username}`
        }
    }catch{
        return {
            error: "Unknown server damaged error"
        }
    }
}
export const signout = async (): Promise<ActionResponseIntrfc>=>{
    (await cookies()).delete('authToken');
    return {
        success: 'done',redirectedTo: `/`
    }
}