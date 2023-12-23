import axios from 'axios';

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

export default axiosInstance;
