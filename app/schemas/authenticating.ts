import * as z from 'zod';
export const SigninSchema = z.object({
    id: z.string(),
    password: z.string(),
});
export const SignupSchema = z.object({
    username: z.string(),
    password: z.string(),
    email: z.string().email()
});