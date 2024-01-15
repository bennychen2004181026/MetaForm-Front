import { ApiError } from '@/interfaces/ApiError';

const ApiErrorHelper = (
    error: unknown,
    showSnackbar: (
        message: string,
        variant: 'default' | 'error' | 'success' | 'warning' | 'info',
    ) => void,
) => {
    const apiError = error as ApiError;
    const statusCode = apiError.data?.errors?.[0]?.statusCode || apiError.status || 500;
    const errorMessage =
        apiError.data?.errors?.[0]?.message || apiError.data || 'An unknown error occurred';

    showSnackbar(`statusCode: ${statusCode}\nmessage: ${errorMessage}`, 'error');
};

export default ApiErrorHelper;
