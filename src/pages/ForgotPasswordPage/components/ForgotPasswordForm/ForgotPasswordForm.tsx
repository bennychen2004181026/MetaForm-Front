import React from 'react';

import { Box, Link, Typography } from '@mui/material';

import ReusableForm from '@/components/ReusableForm';
import useForm, { IField } from '@/hooks/useForm';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

const formFields: IField[] = [
    {
        id: 1,
        label: 'Work Email',
        key: 'email',
        type: 'input',
        value: '',
        validationRules: [{ key: 'isRequired', additionalData: 'Email' }, { key: 'validateEmail' }],
    },
];

const ForgotPasswordForm: React.FC = () => {
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
        if (!validateAllFields) {
            showSnackbar('Please fill the Work Email', 'error');
        } else {
            showSnackbar(
                'The email has sent to the email address if the email address already registered.',
                'info',
            );
        }
    };

    return (
        <Box sx={{ maxWidth: 480 }}>
            <Typography variant="h4" gutterBottom>
                Forgot Password
            </Typography>
            <Typography variant="body1" gutterBottom>
                Enter your email and we&apos;ll send you a link to reset your password
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
                submitButtonText="Send"
            >
                <Link href="/login" variant="body2">
                    &lt; Back to login
                </Link>
            </ReusableForm>
        </Box>
    );
};

export default ForgotPasswordForm;
