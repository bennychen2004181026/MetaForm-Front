import React from 'react';

import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import googleIcon from '@/assets/images/google-icon-logo.png';
import StyledButton from '@/components/Button/Button';
import ReusableForm from '@/components/ReusableForm';
import Hyperlink from '@/components/StyledLink/';
import useForm, { IField } from '@/hooks/useForm';
import Title from '@/layouts/MainLayout/Title';
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
    background-color: ${(props) => props.backgroundColor};
    font-weight: bold;
    text-transform: none;
`;

const Login = () => {
    const showSnackbar = useSnackbarHelper();
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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validateAllFields()) {
            showSnackbar('Please fill all the required valid fields first', 'error');
        } else {
            // temporary message, to be updated with authentification logic
            showSnackbar('login successful', 'success');
        }
    };
    const navigate = useNavigate();
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
