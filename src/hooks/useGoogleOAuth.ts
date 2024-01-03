import { useEffect, useRef } from 'react';

import { useNavigate } from 'react-router-dom';

import Role from '@/constants/roles';
import { useAppDispatch } from '@/hooks/redux';
import { IUser } from '@/interfaces/User';
import { setCredentials } from '@/store/slices/auth/authSlice';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

const useGoogleOAuth = (currentApiUrl: string | undefined) => {
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

            const { message, token, user, isAccountComplete } = event.data;
            const { email, role, company, _id, isActive } = user;
            dispatch(
                setCredentials({
                    user: user as IUser,
                    token,
                    email: email ?? null,
                    role: (role as Role) ?? null,
                    company: company ?? null,
                    userId: _id ?? null,
                    isAccountComplete: isAccountComplete ?? false,
                    isActive: isActive ?? false,
                }),
            );
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
