import { createApi } from '@reduxjs/toolkit/query/react';

import {
    ICreateUserResponse,
    IForgotPasswordResponse,
    IGetS3PreSignedUrlResponse,
    ILoginResponse,
    IResetPasswordResponse,
    IUser,
    IVerifyEmailResponse,
    IVerifyEmailTokenResponse,
} from '@/interfaces/IUser';
import axiosBaseQuery from '@/utils/axiosBaseQuery';

const userApis = createApi({
    reducerPath: 'userApi',
    baseQuery: axiosBaseQuery({ basePath: '/users' }),
    endpoints: (builder) => ({
        login: builder.mutation<ILoginResponse, IUser>({
            query: (formData: IUser) => ({
                url: '/login',
                method: 'POST',
                data: formData,
            }),
        }),
        verifyEmail: builder.mutation<IVerifyEmailResponse, IUser>({
            query: (formData: IUser) => ({
                url: '/verify-email',
                method: 'POST',
                data: formData,
            }),
        }),
        verifyEmailToken: builder.query<IVerifyEmailTokenResponse, string>({
            query: (token: string) => ({
                url: `/verification/${token}`,
                method: 'GET',
            }),
        }),
        createUser: builder.mutation<ICreateUserResponse, IUser>({
            query: (formData: IUser) => ({
                url: '/create-account',
                method: 'POST',
                data: formData,
            }),
        }),
        forgotPassword: builder.mutation<IForgotPasswordResponse, IUser>({
            query: (formData: IUser) => ({
                url: '/forgotPassword',
                method: 'POST',
                data: formData,
            }),
        }),
        resetPassword: builder.mutation<IResetPasswordResponse, IUser>({
            query: (formData: IUser) => ({
                url: '/resetPassword',
                method: 'POST',
                data: formData,
            }),
        }),
        getS3PreSignedUrl: builder.query<IGetS3PreSignedUrlResponse, void>({
            query: () => ({
                url: '/getPresignedUrl',
                method: 'GET',
            }),
        }),
    }),
});

export default userApis;
