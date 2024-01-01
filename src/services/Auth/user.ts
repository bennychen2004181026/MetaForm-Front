import { createApi } from '@reduxjs/toolkit/query/react';

import * as IUerInterfaces from '@/interfaces/IUser';
import axiosBaseQuery from '@/utils/axiosBaseQuery';

const userApis = createApi({
    reducerPath: 'userApi',
    baseQuery: axiosBaseQuery({ basePath: '/users' }),
    endpoints: (builder) => ({
        login: builder.mutation<IUerInterfaces.ILoginResponse, IUerInterfaces.IUser>({
            query: (formData: IUerInterfaces.IUser) => ({
                url: '/login',
                method: 'POST',
                data: formData,
            }),
        }),
        verifyEmail: builder.mutation<IUerInterfaces.IVerifyEmailResponse, IUerInterfaces.IUser>({
            query: (formData: IUerInterfaces.IUser) => ({
                url: '/verify-email',
                method: 'POST',
                data: formData,
            }),
        }),
        verifyEmailToken: builder.query<IUerInterfaces.IVerifyEmailTokenResponse, string>({
            query: (token: string) => ({
                url: `/verification/${token}`,
                method: 'GET',
            }),
        }),
        createUser: builder.mutation<IUerInterfaces.ICreateUserResponse, IUerInterfaces.IUser>({
            query: (formData: IUerInterfaces.IUser) => ({
                url: '/create-account',
                method: 'POST',
                data: formData,
            }),
        }),
        forgotPassword: builder.mutation<
            IUerInterfaces.IForgotPasswordResponse,
            IUerInterfaces.IUser
        >({
            query: (formData: IUerInterfaces.IUser) => ({
                url: '/forgotPassword',
                method: 'POST',
                data: formData,
            }),
        }),
        resetPassword: builder.mutation<
            IUerInterfaces.IResetPasswordResponse,
            IUerInterfaces.IUser
        >({
            query: (formData: IUerInterfaces.IUser) => ({
                url: '/resetPassword',
                method: 'POST',
                data: formData,
            }),
        }),
        getS3PreSignedUrl: builder.query<IUerInterfaces.IGetS3PreSignedUrlResponse, void>({
            query: () => ({
                url: '/getPresignedUrl',
                method: 'GET',
            }),
        }),
        getCloudFrontPreSignedUrl: builder.query<
            IUerInterfaces.IGetCloudFrontPreSignedUrlResponse,
            string
        >({
            query: (key: string) => ({
                url: '/getCloudFrontPresignedUrl',
                method: 'GET',
                params: { key },
            }),
        }),
    }),
});

export default userApis;
