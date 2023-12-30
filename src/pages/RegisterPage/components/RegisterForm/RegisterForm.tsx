import React from 'react';

import { Box } from '@mui/system';
import { useLocation, useNavigate } from 'react-router-dom';

import StyledButton from '@/components/Button';
import ReusableForm from '@/components/ReusableForm';
import useForm, { IField } from '@/hooks/useForm';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

const RegisterForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const showSnackbar = useSnackbarHelper();
    // Former page delivers with email, username in the location.state
    const { email, username } = location.state || {};

    if (!email || !username) {
        showSnackbar(`Missing necessary state`, 'error');
        navigate(-1);
    }

    const formFields: IField[] = [
        {
            id: 1,
            label: 'First Name',
            key: 'firstName',
            type: 'input',
            value: '',
            validationRules: [
                { key: 'isRequired', additionalData: 'First name' },
                { key: 'validateName', additionalData: 'First name' },
            ],
        },
        {
            id: 2,
            label: 'Last Name',
            key: 'lastName',
            type: 'input',
            value: '',
            validationRules: [{ key: 'validateName', additionalData: 'Last name' }],
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

    const {
        fieldsData,
        fieldsFocus,
        errors,
        onDataChange,
        onFieldsBlur,
        resetForm,
        isValid,
        validateAllFields,
    } = useForm(formFields);

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
                fieldsData={fieldsData}
                fieldsFocus={fieldsFocus}
                errors={errors}
                onDataChange={onDataChange}
                onFieldsBlur={onFieldsBlur}
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
