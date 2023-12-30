import { createApi } from '@reduxjs/toolkit/query/react';

import { ILoginResponse, IUser } from '@/interfaces/User.interface';
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
    }),
});

export default userApis;
