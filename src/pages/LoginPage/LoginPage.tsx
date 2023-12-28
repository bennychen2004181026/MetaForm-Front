import React from 'react';

import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import googleIcon from '@/assets/images/google-icon-logo.png';
import StyledButton from '@/components/Button/Button';
import InformativeText from '@/components/InformativeText';
import ReusableForm from '@/components/ReusableForm';
import Hyperlink from '@/components/StyledLink/';
import { useAppDispatch } from '@/hooks/redux';
import useForm, { IField } from '@/hooks/useForm';
import useGoogleOAuth from '@/hooks/useGoogleOAuth';
import useUserRedirect from '@/hooks/useUserRedirect';
import { ApiError } from '@/interfaces/ApiError';
import { ILoginResponse, IUser } from '@/interfaces/User.interface';
import Title from '@/layouts/MainLayout/Title';
import userApis from '@/services/Auth/user';
import { setCredentials } from '@/store/slices/auth/authSlice';
import GlobalStyle from '@/styles/GlobalStyle';
import { currentApiUrl } from '@/utils/axiosBaseQuery';
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

    const { handleGoogleLoginClick } = useGoogleOAuth(currentApiUrl);

    useUserRedirect();

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

    const handleRedirectToRegister = () => {
        const path = `/register-option`;
        navigate(path);
    };

    const forgotPassword = () => {
        const path = `../forgot-password`;
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
