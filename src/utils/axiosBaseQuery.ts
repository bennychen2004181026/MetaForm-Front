import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios from 'axios';
import type { AxiosError, AxiosRequestConfig } from 'axios';

const {
    NODE_ENV = 'development',
    APP_URL_LOCAL = 'http://localhost:3000',
    APP_URL_TEST = 'http://localhost:3001',
    APP_URL_PRODUCTION = 'http://example.com',
} = process.env;

const appURLs: {
    [key: string]: string;
    development: string;
    test: string;
    production: string;
} = {
    development: APP_URL_LOCAL,
    test: APP_URL_TEST,
    production: APP_URL_PRODUCTION,
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
        // const token = store.getState().auth.token;
        // config.headers.Authorization = `Bearer ${getToken()}`;
        //    if(token){config.headers.Authorization = `Bearer ${token}`;}
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
