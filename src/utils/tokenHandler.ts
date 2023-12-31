export type GetTokenMethod = () => string | null;

let getToken: GetTokenMethod = () => null;

export const setGetTokenMethod = (method: GetTokenMethod) => {
    getToken = method;
};

export const getTokenMethod = (): GetTokenMethod => getToken;
