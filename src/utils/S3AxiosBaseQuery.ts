import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

interface AxiosQueryError {
    status: number;
    data: unknown;
}

const S3AxiosBaseQuery: BaseQueryFn<
    {
        url: string;
        method: AxiosRequestConfig['method'];
        data?: AxiosRequestConfig['data'];
        params?: AxiosRequestConfig['params'];
        headers?: AxiosRequestConfig['headers'];
    },
    unknown,
    AxiosQueryError
> = async ({ url, method, data, params, headers }) => {
    try {
        const result = await axios({
            url,
            method,
            data,
            params,
            headers,
        });
        return { data: result.data };
    } catch (axiosError) {
        const err = axiosError as AxiosError<AxiosQueryError>;
        return {
            error: {
                status: err.response?.status ?? 500,
                data: err.response?.data || err.message,
            },
        };
    }
};

export default S3AxiosBaseQuery;
