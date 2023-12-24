import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios from 'axios';
import type { AxiosError, AxiosRequestConfig } from 'axios';

import { getTokenMethod } from '@/utils/tokenHandler';

const {
    NODE_ENV = 'test',
    REACT_APP_API_URL_LOCAL,
    REACT_APP_API_URL_TEST,
    REACT_APP_API_URL_PRODUCTION,
} = process.env;

const appURLs: {
    [key: string]: string | undefined;
    development: string | undefined;
    test: string | undefined;
    production: string | undefined;
} = {
    development: REACT_APP_API_URL_LOCAL,
    test: REACT_APP_API_URL_TEST,
    production: REACT_APP_API_URL_PRODUCTION,
};

const withCredentials = true;
const timeout = 30000;

const axiosInstance = axios.create({
    baseURL: `${appURLs[NODE_ENV]}`,
    withCredentials,
    timeout,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getTokenMethod()();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

const axiosBaseQuery =
    (
        { basePath }: { basePath: string } = { basePath: '' },
    ): BaseQueryFn<
        {
            url: string;
            method: AxiosRequestConfig['method'];
            data?: AxiosRequestConfig['data'];
            params?: AxiosRequestConfig['params'];
            headers?: AxiosRequestConfig['headers'];
        },
        unknown,
        unknown
    > =>
    async ({ url, method, data, params, headers }) => {
        try {
            const result = await axiosInstance({
                url: basePath + url,
                method,
                data,
                params,
                headers,
            });
            return { data: result.data };
        } catch (axiosError) {
            const err = axiosError as AxiosError;
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            };
        }
    };

export default axiosBaseQuery;
