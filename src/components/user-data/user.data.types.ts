export interface IUserData {
    accountType?: 'retail' | 'business'
}
export interface GetUser {
    ok?: boolean;
    message?: string;
}

export interface User {
    name: string;
    phone: string;
    username?: string;
}