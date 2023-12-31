import { createApi } from '@reduxjs/toolkit/query/react';

import {
    ICreateUserResponse,
    ILoginResponse,
    IUser,
    IVerifyEmailResponse,
    IVerifyEmailTokenResponse,
} from '@/interfaces/User.interface';
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
    }),
});

export default userApis;
