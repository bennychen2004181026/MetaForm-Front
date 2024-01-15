type EnvType = 'development' | 'test' | 'production';

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
const env: EnvType = (NODE_ENV as EnvType) in appURLs ? (NODE_ENV as EnvType) : 'development';
const BASE_URL = `${appURLs[env]}`;
const CREATE_FORM_API = `${BASE_URL}/forms/`;
const CREATE_QUESTION_API = `${BASE_URL}/questions/`;
const FETCH_FORM_API = (userId: string) => `${BASE_URL}/forms/user/${userId}`;
const PRESIGNED_URL = `${BASE_URL}/users/getPresignedUrl`;
const PRESIGNED_CLOUR_FRONT_URL = `${BASE_URL}/users/getPresignedUrl/users/getCloudFrontPresignedUrl`;
export {
    CREATE_FORM_API,
    CREATE_QUESTION_API,
    FETCH_FORM_API,
    PRESIGNED_URL,
    PRESIGNED_CLOUR_FRONT_URL,
};
