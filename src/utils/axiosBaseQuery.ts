import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios from 'axios';
import type { AxiosError, AxiosRequestConfig } from 'axios';

import { getTokenMethod } from '@/utils/tokenHandler';

type EnvType = 'development' | 'test' | 'production';

interface AxiosQueryError {
    status: number;
    data: unknown;
}

const {
    NODE_ENV = 'development',
    REACT_APP_API_URL_LOCAL,
    REACT_APP_API_URL_TEST,
    REACT_APP_API_URL_PRODUCTION,
} = process.env;

const appURLs: Record<EnvType, string | undefined> = {
    development: REACT_APP_API_URL_LOCAL,
    test: REACT_APP_API_URL_TEST,
    production: REACT_APP_API_URL_PRODUCTION,
};

const withCredentials = true;
const timeout = 30000;

const env: EnvType = (NODE_ENV as EnvType) in appURLs ? (NODE_ENV as EnvType) : 'development';

const axiosInstance = axios.create({
    baseURL: `${appURLs[env]}`,
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
        AxiosQueryError
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
                    status: err.response?.status ?? 500,
                    data: err.response?.data || err.message,
                },
            };
        }
    };

export default axiosBaseQuery;
