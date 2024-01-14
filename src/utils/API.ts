const BASE_URL = 'http://localhost:3001';
const CREATE_FORM_API = `${BASE_URL}/forms/`;
const CREATE_QUESTION_API = `${BASE_URL}/questions/`;
const FETCH_FORM_API = (userId: string) => `${BASE_URL}/forms/user/${userId}`;
const PRESIGNED_URL = 'http://localhost:3001/users/getPresignedUrl';
const PRESIGNED_CLOUR_FRONT_URL = 'http://localhost:3001/users/getCloudFrontPresignedUrl';
export {
    CREATE_FORM_API,
    CREATE_QUESTION_API,
    FETCH_FORM_API,
    PRESIGNED_URL,
    PRESIGNED_CLOUR_FRONT_URL,
};
