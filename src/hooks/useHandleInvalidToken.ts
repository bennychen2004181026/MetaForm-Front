import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@/hooks/redux';
import { ApiError } from '@/interfaces/ApiError';
import { clearCredentials } from '@/store/slices/auth/authSlice';
import { clearCompanyInfo } from '@/store/slices/company/companySlice';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

const useHandleInvalidToken = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const showSnackbar = useSnackbarHelper();

    return (error: unknown) => {
        const apiError = error as ApiError;

        if (apiError.data?.errors?.[0].field === 'Token') {
            navigate('/login');
            showSnackbar('You are logged out', 'success');
            dispatch(clearCredentials());
            dispatch(clearCompanyInfo());
        }
    };
};

export default useHandleInvalidToken;
