import React from 'react';

import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import googleIcon from '@/assets/images/google-icon-logo.png';
import StyledButton from '@/components/Button/Button';
import InformativeText from '@/components/InformativeText';
import ReusableForm from '@/components/ReusableForm';
import Hyperlink from '@/components/StyledLink/';
import Role from '@/constants/roles';
import { useAppDispatch } from '@/hooks/redux';
import useForm, { IField } from '@/hooks/useForm';
import useGoogleOAuth from '@/hooks/useGoogleOAuth';
import { ICompany } from '@/interfaces/ICompany';
import { ILoginResponse, IUser } from '@/interfaces/IUser';
import LoadingSpinner from '@/layouts/LoadingSpinner';
import Title from '@/layouts/MainLayout/Title';
import userApis from '@/services/Auth/user';
import { setCredentials } from '@/store/slices/auth/authSlice';
import { setCompanyInfo } from '@/store/slices/company/companySlice';
import GlobalStyle from '@/styles/GlobalStyle';
import ApiErrorHelper from '@/utils/ApiErrorHelper';
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
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { handleGoogleLoginClick } = useGoogleOAuth(currentApiUrl);

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
            type: 'password',
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
        resetForm,
    } = useForm(formFields);

    const loginFunction = async () => {
        try {
            const response: ILoginResponse = await login(fieldsData).unwrap();
            const { message, user, token, isAccountComplete, companyInfo } = response;
            const { email, role, company, _id: userId, isActive } = user as IUser;

            dispatch(
                setCredentials({
                    user,
                    token,
                    email: email ?? null,
                    role: (role as Role) ?? null,
                    company: company ?? null,
                    userId: userId ?? null,
                    companyInfo: (companyInfo as ICompany) ?? null,
                    isAccountComplete: isAccountComplete ?? false,
                    isActive: isActive ?? false,
                }),
            );

            if (companyInfo) {
                const {
                    _id,
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
                        companyId: _id ?? null,
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
            resetForm();
            if (isAccountComplete) {
                navigate('/user-dashboard');
            } else {
                navigate(`/company-profile/${userId}`);
            }
        } catch (error) {
            ApiErrorHelper(error, showSnackbar);
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

    if (isLoading) {
        return <LoadingSpinner />;
    }

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
