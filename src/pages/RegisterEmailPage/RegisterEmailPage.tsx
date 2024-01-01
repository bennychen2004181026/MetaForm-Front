import React from 'react';

import { Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import ReusableForm from '@/components/ReusableForm';
import useForm, { IField } from '@/hooks/useForm';
import { ApiError } from '@/interfaces/ApiError';
import { IVerifyEmailResponse } from '@/interfaces/User.interface';
import LoadingSpinner from '@/layouts/LoadingSpinner';
import Title from '@/layouts/MainLayout/Title';
import userApis from '@/services/Auth/user';
import GlobalStyle from '@/styles/GlobalStyle';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

const RegisterEmailContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const RegisterEmail = () => {
    const showSnackbar = useSnackbarHelper();
    const { useVerifyEmailMutation } = userApis;
    const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
    const navigate = useNavigate();

    const formFields: IField[] = [
        {
            id: 1,
            label: 'User Name',
            key: 'username',
            type: 'input',
            value: '',
            validationRules: [
                { key: 'isRequired', additionalData: 'username' },
                { key: 'validateUsername', additionalData: 'username' },
            ],
        },
        {
            id: 2,
            label: 'Email',
            key: 'email',
            type: 'input',
            value: '',
            validationRules: [
                { key: 'isRequired', additionalData: 'email' },
                { key: 'validateEmail' },
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

    const verifyEmailFunction = async () => {
        try {
            const response: IVerifyEmailResponse = await verifyEmail(fieldsData).unwrap();
            const { message, email, username } = response;
            showSnackbar(`${message}`, 'success');
            setTimeout(() => {
                navigate('/email-verification', { state: { email, username } });
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
            await verifyEmailFunction();
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    const submitButtonText = 'Create My Account';
    return (
        <RegisterEmailContent>
            <GlobalStyle />
            <Title content="Create your account" />
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
                <Typography variant="subtitle1" sx={{ padding: '5px', alignSelf: 'flex-start' }}>
                    Opt-in
                </Typography>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox />}
                        id="marketingEmail"
                        label="Marketing Emails"
                    />
                    <FormControlLabel
                        control={<Checkbox />}
                        id="newsEmail"
                        label="News & Updates Emails"
                    />
                    <FormControlLabel
                        id="termsAgreement"
                        required
                        control={<Checkbox />}
                        label="I agree to MetaForm's Terms of Service, Privacy Policy and Data Processing Agreement"
                    />
                </FormGroup>
            </ReusableForm>
        </RegisterEmailContent>
    );
};

export default RegisterEmail;
