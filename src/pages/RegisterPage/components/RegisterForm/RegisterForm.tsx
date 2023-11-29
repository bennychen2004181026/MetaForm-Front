import React from 'react';

import { Box } from '@mui/system';
import { useLocation } from 'react-router-dom';

import StyledButton from '@/components/Button';
import ReusableForm from '@/components/ReusableForm';
import { IField, useForm } from '@/hooks/useForm1';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

const RegisterForm = () => {
    const location = useLocation();
    const showSnackbar = useSnackbarHelper();
    // Former page delivers with email, username in the location.state
    const { email, username } = location.state || {};
    const formFields: IField[] = [
        {
            id: 1,
            label: 'First Name',
            key: 'firstName',
            type: 'input',
            value: '',
            validationRules: [{ key: 'isRequired', additionalData: 'First Name' }],
        },
        {
            id: 2,
            label: 'Last Name',
            key: 'lastName',
            type: 'input',
            value: '',
            validationRules: [{ key: 'isRequired', additionalData: 'Last Name' }],
        },
        {
            id: 3,
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
            id: 4,
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
            id: 5,
            label: 'Email',
            key: 'email',
            type: 'input',
            value: email,
            validationRules: [],
        },
        {
            id: 6,
            label: 'User name',
            key: 'username',
            type: 'input',
            value: username,
            validationRules: [],
        },
    ];

    const { data, focus, errors, onChange, onBlur, resetForm, isValid, validateAllFields } =
        useForm(formFields);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validateAllFields()) {
            showSnackbar('Please fill all the required valid fields first', 'error');
        } else {
            // Logic with handleSubmit
            showSnackbar('You had successfully created account', 'success');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: 8,
            }}
        >
            <ReusableForm
                excludeFields={['email', 'username']}
                formFields={formFields}
                data={data}
                focus={focus}
                errors={errors}
                onChange={onChange}
                onBlur={onBlur}
                isValid={isValid}
                handleSubmit={handleSubmit}
            >
                <StyledButton
                    type="button"
                    onClick={resetForm}
                    variant="contained"
                    color="secondary"
                >
                    Reset
                </StyledButton>
            </ReusableForm>
        </Box>
    );
};

export default RegisterForm;
