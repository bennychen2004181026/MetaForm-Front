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

export enum Role {
    SuperAdmin = 'super_admin',
    Admin = 'admin',
    Employee = 'employee',
}
