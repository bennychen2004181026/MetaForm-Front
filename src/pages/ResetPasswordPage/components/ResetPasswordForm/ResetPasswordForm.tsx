import React, { useEffect } from 'react';

import { Box, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import ReusableForm from '@/components/ReusableForm';
import useForm, { IField } from '@/hooks/useForm';
import { ApiError } from '@/interfaces/ApiError';
import { IPasswordResponse } from '@/interfaces/IUser';
import LoadingSpinner from '@/layouts/LoadingSpinner';
import userApis from '@/services/Auth/user';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

interface ResetPasswordFormProps {
    token?: string;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ token }) => {
    const showSnackbar = useSnackbarHelper();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            showSnackbar(`Need email verification link to reset password`, 'error');
            navigate('/forgot-password');
        }
    }, [token]);

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
        {
            id: 3,
            label: 'Token',
            key: 'token',
            type: 'input',
            value: token,
            validationRules: [],
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

    const { useResetPasswordMutation } = userApis;
    const [resetPassword, { isLoading }] = useResetPasswordMutation();

    const resetPasswordFunction = async () => {
        try {
            const response: IPasswordResponse = await resetPassword(fieldsData).unwrap();
            const { message } = response;
            showSnackbar(`${message}`, 'success');
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
            await resetPasswordFunction();
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center', padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Reset Password
            </Typography>
            <Typography variant="body1" gutterBottom>
                Enter a new password for your Metaform account
            </Typography>

            <ReusableForm
                excludeFields={['token']}
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
