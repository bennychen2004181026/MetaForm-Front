import { createApi } from '@reduxjs/toolkit/query/react';

import { IField } from '@/hooks/useForm';
import axiosBaseQuery from '@/utils/axiosBaseQuery';

type ResponseData = Record<string, string>;
const userApis = createApi({
    baseQuery: axiosBaseQuery({ basePath: '/users' }),
    endpoints: (builder) => ({
        login: builder.mutation<ResponseData, IField>({
            query: (formData: IField) => ({
                url: '/login',
                method: 'POST',
                data: formData,
            }),
        }),
    }),
});

export default userApis;
