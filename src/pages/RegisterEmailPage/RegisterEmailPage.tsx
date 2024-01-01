import React from 'react';

import { Checkbox, FormControlLabel, FormGroup, Typography } from '@mui/material';
import styled from 'styled-components';

import ReusableForm from '@/components/ReusableForm';
import useForm, { IField } from '@/hooks/useForm';
import Title from '@/layouts/MainLayout/Title';
import GlobalStyle from '@/styles/GlobalStyle';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

const RegisterEmailContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-conetnet: center;
`;

const RegisterEmail = () => {
    const showSnackbar = useSnackbarHelper();
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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validateAllFields()) {
            showSnackbar('Please fill all the required valid fields first', 'error');
        } else {
            // temporary message, to be updated with authentification logic
            showSnackbar('Account Creation Successful', 'success');
        }
    };

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
