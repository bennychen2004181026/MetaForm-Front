import React, { useEffect, useRef, useState } from 'react';

import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import googleIcon from '@/assets/images/google-icon-logo.png';
import StyledButton from '@/components/Button/Button';
import InformativeText from '@/components/InformativeText';
import ReusableForm from '@/components/ReusableForm';
import Hyperlink from '@/components/StyledLink/';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import useForm, { IField } from '@/hooks/useForm';
import { ApiError } from '@/interfaces/ApiError';
import { ILoginResponse, IUser } from '@/interfaces/User.interface';
import Title from '@/layouts/MainLayout/Title';
import userApis from '@/services/Auth/user';
import { authUser, setCredentials } from '@/store/slices/auth/authSlice';
import GlobalStyle from '@/styles/GlobalStyle';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

const LoginContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 350px;
`;

const GoogleIcon = styled.img`
    margin-right: 10px;
    width: 22px;
    height: 22px;
`;

interface ButtonProps {
    backgroundColor: string;
}

const LoginButton = styled(StyledButton)<ButtonProps>`
    && {
        background-color: #7f8785;
        font-weight: bold;
        text-transform: none;
        &:hover {
            background-color: #4e6145;
        }
    }
`;

const Login = () => {
    const showSnackbar = useSnackbarHelper();
    const { useLoginMutation } = userApis;
    const [login] = useLoginMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const fetchedUser: IUser = useAppSelector(authUser);
    const [initialCheckDone, setInitialCheckDone] = useState(false);
    const googleOAuthTimeout = useRef<NodeJS.Timeout | null>(null);

    const {
        NODE_ENV,
        REACT_APP_API_URL_LOCAL,
        REACT_APP_API_URL_TEST,
        REACT_APP_API_URL_PRODUCTION,
    } = process.env;

    const apiURLs: {
        [key: string]: string | undefined;
        development: string | undefined;
        test: string | undefined;
        production: string | undefined;
    } = {
        development: REACT_APP_API_URL_LOCAL,
        test: REACT_APP_API_URL_TEST,
        production: REACT_APP_API_URL_PRODUCTION,
    };

    useEffect(() => {
        if (!initialCheckDone && fetchedUser !== null) {
            showSnackbar(`You are already login.`, 'warning');
            navigate('/user-dashboard');
        }
        setInitialCheckDone(true);
    }, [fetchedUser, navigate]);

    useEffect(() => {
        const messageHandler = (event: MessageEvent) => {
            if (
                event.origin !== `${apiURLs[NODE_ENV as string]}` ||
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
                    role: role ?? null,
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
    }, []);

    const formFields: IField[] = [
        {
            id: 1,
            label: 'Email',
            key: 'email',
            type: 'input',
            value: '',
            validationRules: [
                { key: 'isRequired', additionalData: 'email' },
                { key: 'validateEmail' },
            ],
        },
        {
            id: 2,
            label: 'Password',
            key: 'password',
            type: 'input',
            value: '',
            validationRules: [{ key: 'isRequired', additionalData: 'Password' }],
        },
    ];

    const {
        fieldsData,
        fieldsFocus,
        errors,
        onDataChange,
        onFieldsBlur,
        isValid,
        validateAllFields,
    } = useForm(formFields);

    const loginFunction = async () => {
        try {
            const response: ILoginResponse = await login(fieldsData).unwrap();
            const { message, user, token, isAccountComplete } = response;
            const { email, role, company, _id, isActive } = user;
            dispatch(
                setCredentials({
                    user: user as IUser,
                    token,
                    email: email ?? null,
                    role: role ?? null,
                    company: company ?? null,
                    userId: _id ?? null,
                    isAccountComplete: isAccountComplete ?? false,
                    isActive: isActive ?? false,
                }),
            );
            showSnackbar(`${message}`, 'success');
            setTimeout(() => {
                if (isAccountComplete) {
                    navigate('/user-dashboard');
                } else {
                    navigate(`/company-profile/${_id}`);
                }
            }, 500);
        } catch (error) {
            const apiError = error as ApiError;
            const errorMessage =
                apiError.data?.errors?.[0].message || apiError.data || 'An unknown error occurred';

            showSnackbar(`statusCode: ${apiError.status}\nmessage: ${errorMessage}`, 'error');
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validateAllFields()) {
            showSnackbar('Please fill all the required valid fields first', 'error');
        } else {
            await loginFunction();
        }
    };

    const handleGoogleLoginClick = async () => {
        const width = window.screen.width / 2;
        const height = window.screen.height / 2;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;
        window.open(
            `${apiURLs[NODE_ENV as string]}/users/auth/google`,
            'GoogleAuthWindow',
            `height=${height},width=${width},top=${top},left=${left}`,
        );
    };

    const handleRedirectToRegister = () => {
        const path = `/register-option`;
        navigate(path);
    };

    const forgotPassword = () => {
        const path = `/forgot-password`;
        navigate(path);
    };
    const submitButtonText = 'Confirm';
    return (
        <LoginContent>
            <GlobalStyle />
            <Title content="Welcome to MetaForm" />
            <ReusableForm
                formFields={formFields}
                fieldsData={fieldsData}
                fieldsFocus={fieldsFocus}
                errors={errors}
                onDataChange={onDataChange}
                onFieldsBlur={onFieldsBlur}
                isValid={isValid}
                handleSubmit={handleSubmit}
                submitButtonText={submitButtonText}
            >
                <InformativeText
                    textBeforeLink="Wanna create account? Let's start with "
                    link={{
                        text: 'create account.',
                        onClick: handleRedirectToRegister,
                    }}
                />
                <Typography variant="subtitle1" sx={{ padding: '5px', textAlign: 'center' }}>
                    Forgot password? Click <Hyperlink text="here" onClick={forgotPassword} />
                </Typography>
                <LoginButton
                    variant="contained"
                    startIcon={<GoogleIcon src={googleIcon} />}
                    onClick={handleGoogleLoginClick}
                >
                    Sign in with Google
                </LoginButton>
            </ReusableForm>
        </LoginContent>
    );
};

export default Login;
