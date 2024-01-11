import React from 'react';

import { Box, Typography } from '@mui/material';

import ReusableForm from '@/components/ReusableForm';
import useForm, { IField } from '@/hooks/useForm';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

const ChangePasswordForm: React.FC = () => {
    const showSnackbar = useSnackbarHelper();

    const formFields: IField[] = [
        {
            id: 1,
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
            id: 2,
            label: 'Password',
            key: 'password',
            type: 'password',
            value: '',
            validationRules: [{ key: 'isRequired', additionalData: 'Password' }],
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
    } = useForm(formFields);

    const changePasswordFunction = async () => {};

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validateAllFields()) {
            showSnackbar('Please fill all the required valid fields first', 'error');
        } else {
            await changePasswordFunction();
        }
    };

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
