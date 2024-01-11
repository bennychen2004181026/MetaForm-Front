import React, { useEffect } from 'react';

import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import ReusableForm from '@/components/ReusableForm';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import useForm, { IField } from '@/hooks/useForm';
import { IChangePasswordRequest, IChangePasswordResponse } from '@/interfaces/IUser';
import LoadingSpinner from '@/layouts/LoadingSpinner';
import userApis from '@/services/Auth/user';
import { authUserId } from '@/store/slices/auth/authSlice';
import * as authSliceExports from '@/store/slices/auth/authSlice';
import * as companySliceExports from '@/store/slices/company/companySlice';
import ApiErrorHelper from '@/utils/ApiErrorHelper';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

const ChangePasswordForm: React.FC = () => {
    const showSnackbar = useSnackbarHelper();
    const fetchedUserId: string | null = useAppSelector(authUserId);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { useChangePasswordMutation } = userApis;
    const [changePassword, { isLoading }] = useChangePasswordMutation();

    useEffect(() => {
        if (!fetchedUserId) {
            showSnackbar('Require companyId or userId and you need to re-login', 'warning');
            dispatch(companySliceExports.clearCompanyInfo());
            dispatch(authSliceExports.clearCredentials());
            navigate('/login');
        }
    }, [fetchedUserId]);

    const formFields: IField[] = [
        {
            id: 1,
            label: 'Current Password',
            key: 'password',
            type: 'password',
            value: '',
            validationRules: [{ key: 'isRequired', additionalData: 'Password' }],
        },
        {
            id: 2,
            label: 'New Password',
            key: 'newPassword',
            type: 'password',
            value: '',
            validationRules: [
                { key: 'isRequired', additionalData: 'New Password' },
                { key: 'validatePassword' },
            ],
        },
        {
            id: 3,
            label: 'Confirm Password',
            key: 'confirmPassword',
            type: 'password',
            value: '',
            validationRules: [
                { key: 'isRequired', additionalData: 'Confirm Password' },
                { key: 'validateConfirmPassword', additionalData: 'newPassword' },
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
        resetForm,
    } = useForm(formFields);

    const changePasswordFunction = async () => {
        try {
            const response: IChangePasswordResponse = await changePassword({
                userId: fetchedUserId,
                formData: fieldsData,
            } as IChangePasswordRequest).unwrap();
            const { message } = response;
            showSnackbar(`${message}`, 'success');
            resetForm();
        } catch (error) {
            ApiErrorHelper(error, showSnackbar);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validateAllFields()) {
            showSnackbar('Please fill all the required valid fields first', 'error');
        } else {
            await changePasswordFunction();
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }
    return (
        <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center', padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Change Password
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
                submitButtonText="Change password"
            />
        </Box>
    );
};

export default ChangePasswordForm;
