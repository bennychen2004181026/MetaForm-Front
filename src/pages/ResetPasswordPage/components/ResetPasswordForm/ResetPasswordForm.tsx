import React from 'react';

import { Box, Link, Typography } from '@mui/material';

import ReusableForm from '@/components/ReusableForm';
import useForm, { IField } from '@/hooks/useForm';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

const formFields: IField[] = [
    {
        id: 1,
        label: 'Password',
        key: 'password',
        type: 'input',
        value: '',
        validationRules: [
            { key: 'isRequired', additionalData: 'Password' },
            { key: 'validatePassword' },
        ],
    },
    {
        id: 2,
        label: 'Confirm Password',
        key: 'confirmPassword',
        type: 'input',
        value: '',
        validationRules: [
            { key: 'isRequired', additionalData: 'Confirm Password' },
            { key: 'validateConfirmPassword', additionalData: 'password' },
        ],
    },
];

const ResetPasswordForm = () => {
    const showSnackbar = useSnackbarHelper();
    const {
        fieldsData,
        fieldsFocus,
        errors,
        onDataChange,
        onFieldsBlur,
        isValid,
        validateAllFields,
    } = useForm(formFields);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validateAllFields()) {
            showSnackbar('Please fill all the required valid fields first', 'error');
        } else {
            showSnackbar('handleSubmit logic triggered.', 'info');
        }
    };

    return (
        <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center', padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Reset Password
            </Typography>
            <Typography variant="body1" gutterBottom>
                Enter a new password for your Metaform account
            </Typography>

            <ReusableForm
                formFields={formFields}
                fieldsData={fieldsData}
                fieldsFocus={fieldsFocus}
                onDataChange={onDataChange}
                onFieldsBlur={onFieldsBlur}
                errors={errors}
                isValid={isValid}
                handleSubmit={handleSubmit}
                submitButtonText="Reset password"
            />

            <Link href="/login" variant="body2">
                &lt; Back to Login
            </Link>
        </Box>
    );
};

export default ResetPasswordForm;
