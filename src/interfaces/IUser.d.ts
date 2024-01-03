import Role from '@/constants/roles';

export interface IUser {
    username?: string;
    _id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmedPassword?: string;
    company?: string;
    role?: Role;
    token?: string | null;
    isActive?: boolean;
    isAccountComplete?: boolean;
}

export interface ILoginResponse {
    user: IUser;
    token: string;
    email?: string;
    company?: string;
    role?: string;
    userId?: string;
    isAccountComplete?: boolean;
    isActive?: boolean;
    message?: string;
}

export interface IVerifyEmailResponse {
    message: string;
    email: string;
    username: string;
}

export interface IVerifyEmailTokenResponse {
    message: string;
    email: string;
    username: string;
}

export interface ICreateUserResponse {
    message: string;
    user: IUser;
    token: string;
    isAccountComplete: boolean;
}
