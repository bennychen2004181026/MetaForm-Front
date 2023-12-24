import React from 'react';

import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import googleIcon from '@/assets/images/google-icon-logo.png';
import StyledButton from '@/components/Button/Button';
import ReusableForm from '@/components/ReusableForm';
import Hyperlink from '@/components/StyledLink/';
import { useAppDispatch } from '@/hooks/redux';
import useForm, { IField } from '@/hooks/useForm';
import { ILoginResponse, IUser } from '@/interfaces/User.interface';
import Title from '@/layouts/MainLayout/Title';
import userApis from '@/services/Auth/user';
import { setCredentials } from '@/store/slices/auth/authSlice';
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

interface ApiErrorResponse {
    error?: string;
    data?: {
        errors?: Array<{ message?: string; name?: string; statusCode?: number; field?: string }>;
    };
    status?: number;
}

const LoginButton = styled(StyledButton)<ButtonProps>`
    background-color: ${(props) => props.backgroundColor};
    font-weight: bold;
    text-transform: none;
`;

const Login = () => {
    const showSnackbar = useSnackbarHelper();
    const { useLoginMutation } = userApis;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

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
            validationRules: [
                { key: 'isRequired', additionalData: 'Password' },
                { key: 'validatePassword' },
            ],
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
        const [login, { isError, error }] = useLoginMutation();

        const response: ILoginResponse = await login(fieldsData).unwrap();
        const { message, user, token, isAccountComplete } = response;
        const { email, username, role, company, _id, isActive } = user;
        dispatch(
            setCredentials({
                user: user as IUser,
                token,
                email: email ?? null,
                role: role ?? null,
                company: company ?? null,
                userId: _id ?? null,
                isAccountComplete: isAccountComplete ?? null,
                isActive: isActive ?? null,
            }),
        );
        showSnackbar(`${message}`, 'success');
        if (isAccountComplete === true) {
            navigate('/user-dashboard');
        }
        navigate('/create-user', { state: { email, username } });

        if (isError) {
            const apiError = error as ApiErrorResponse;
            const statusCode = apiError.status || apiError.data?.errors?.[0]?.statusCode;
            const customErrorMessage = apiError.data?.errors?.[0]?.message;
            const defaultErrorMessage = apiError.error ?? 'An unknown error occurred';
            const errorMessage = customErrorMessage || defaultErrorMessage;
            showSnackbar(`Status Code: ${statusCode}\nError: ${errorMessage}`, 'error');
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
                <Typography variant="subtitle1" sx={{ padding: '5px', textAlign: 'center' }}>
                    Forgot password? Click <Hyperlink text="here" onClick={forgotPassword} />
                </Typography>
                <LoginButton
                    variant="contained"
                    startIcon={<GoogleIcon src={googleIcon} />}
                    backgroundColor="silver"
                >
                    Sign in with Google
                </LoginButton>
            </ReusableForm>
        </LoginContent>
    );
};

export default Login;
