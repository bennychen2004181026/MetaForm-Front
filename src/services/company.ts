import { createApi } from '@reduxjs/toolkit/query/react';

import * as ICompanyInterfaces from '@/interfaces/ICompany';
import axiosBaseQuery from '@/utils/axiosBaseQuery';

const companyApis = createApi({
    reducerPath: 'companyApi',
    baseQuery: axiosBaseQuery({ basePath: '/companies' }),
    endpoints: (builder) => ({
        getEmployees: builder.query<ICompanyInterfaces.IGetEmployeesResponse, string>({
            query: (companyId: string) => ({
                url: `/${companyId}/employees`,
                method: 'GET',
            }),
        }),
        inviteEmployees: builder.mutation<
            ICompanyInterfaces.IInviteEmployeesResponse,
            ICompanyInterfaces.IInviteEmployeesRequest
        >({
            query: ({ companyId, emails }) => ({
                url: `/${companyId}/add-employees`,
                method: 'POST',
                data: { emails },
            }),
        }),
    }),
});

export default companyApis;
