import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@/hooks/redux';
import { ApiError } from '@/interfaces/ApiError';
import { clearCredentials } from '@/store/slices/auth/authSlice';
import { clearCompanyInfo } from '@/store/slices/company/companySlice';

const useHandleInvalidToken = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (error: unknown) => {
        const apiError = error as ApiError;

        if (apiError.data?.errors?.[0].field === 'Token') {
            navigate('/login');
            dispatch(clearCredentials());
            dispatch(clearCompanyInfo());
        }
    };
};

export default useHandleInvalidToken;
