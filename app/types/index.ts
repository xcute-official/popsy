export interface ActionResponseIntrfc {
    success?: string;
    error?: string;
    data?: {
        [key: string]: [string | undefined];
    };
    redirectedTo?: string;
}





export interface UserSessionInfoIntrfc {
    username: string;
    id: string;
}
export type UserSessionType = {
    user: UserSessionInfoIntrfc | null;
    isAuthenticated: boolean;
} | null;