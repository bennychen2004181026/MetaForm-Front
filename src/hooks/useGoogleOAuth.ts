import { useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import Role from '@/constants/roles';
import { useAppDispatch } from '@/hooks/redux';
import { ICompany } from '@/interfaces/ICompany';
import { IUser } from '@/interfaces/IUser';
import { setCredentials } from '@/store/slices/auth/authSlice';
import { setCompanyInfo } from '@/store/slices/company/companySlice';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

const useGoogleOAuth = (currentApiUrl?: string) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const showSnackbar = useSnackbarHelper();
    const googleOAuthTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const messageHandler = (event: MessageEvent) => {
            if (
                event.origin !== `${currentApiUrl}` ||
                !event.data.source ||
                event.data.source !== 'GoogleOAuth'
            ) {
                return;
            }

            if (event.data.errors) {
                const { errors } = event.data;
                showSnackbar(`StatusCode: ${errors[0].statusCode}\n${errors[0].message}`, 'error');
                return;
            }

            const { message, token, user, isAccountComplete, companyInfo } = event.data;
            const { email, role, company, _id, isActive } = user;
            dispatch(
                setCredentials({
                    user: user as IUser,
                    token,
                    email: email ?? null,
                    role: (role as Role) ?? null,
                    company: company ?? null,
                    userId: _id ?? null,
                    companyInfo: (companyInfo as ICompany) ?? null,
                    isAccountComplete: isAccountComplete ?? false,
                    isActive: isActive ?? false,
                }),
            );

            if (companyInfo) {
                const {
                    _id: companyId,
                    companyName,
                    abn,
                    logo,
                    description,
                    industry,
                    isActive: isCompanyActive,
                    address,
                    employees,
                } = companyInfo as ICompany;

                dispatch(
                    setCompanyInfo({
                        companyId: companyId ?? null,
                        companyName: companyName ?? null,
                        abn: abn ?? null,
                        logo: logo ?? null,
                        description: description ?? null,
                        industry: industry ?? null,
                        isActive: isCompanyActive ?? false,
                        employeesIds:
                            Array.isArray(employees) && employees.length > 0 ? employees : [],
                        address: address ?? null,
                    }),
                );
            }
            showSnackbar(`${message}`, 'success');
            googleOAuthTimeout.current = setTimeout(() => {
                if (isAccountComplete) {
                    navigate('/user-dashboard');
                } else {
                    navigate(`/company-profile/${_id}`);
                }
            }, 500);
        };

        window.addEventListener('message', messageHandler);

        return () => {
            window.removeEventListener('message', messageHandler);
            if (googleOAuthTimeout.current) {
                clearTimeout(googleOAuthTimeout.current);
            }
        };
    }, [dispatch, navigate, currentApiUrl]);

    const handleGoogleLoginClick = () => {
        const width = window.screen.width / 2;
        const height = window.screen.height / 2;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;
        window.open(
            `${currentApiUrl}/users/auth/google`,
            'GoogleAuthWindow',
            `height=${height},width=${width},top=${top},left=${left}`,
        );
    };

    return { handleGoogleLoginClick };
};

export default useGoogleOAuth;
