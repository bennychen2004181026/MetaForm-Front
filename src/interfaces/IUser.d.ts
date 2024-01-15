import Role from '@/constants/roles';
import { ICompany } from '@/interfaces/ICompany';

export interface IUser {
    username?: string;
    _id?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmedPassword?: string;
    newPassword?: string;
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
    companyInfo?: ICompany;
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

export interface IPasswordResponse {
    message: string;
}

export interface IGetS3PreSignedUrlResponse {
    url: string;
    key: string;
}

export interface IGetCloudFrontPreSignedUrlResponse {
    cloudFrontSignedUrl: string;
}

export interface ICompleteAccountResponse {
    message: string;
    token: string;
    companyInfo: ICompany;
    user: IUser;
    isAccountComplete: boolean;
}

export interface ICompleteAccountRequest {
    userId: string;
    formData: ICompany;
}

export interface IChangePasswordRequest {
    userId: string;
    formData: IUser;
}

export interface IChangePasswordResponse {
    message: string;
}
