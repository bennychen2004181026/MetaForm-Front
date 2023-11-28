import React from 'react';

import { useSnackbar } from 'notistack';

import StyledButton from '@/components/Button';
import ReusableForm from '@/components/ReusableForm';
import { IField, useForm } from '@/hooks/useForm1';

const formFields: IField[] = [
    {
        id: 1,
        label: 'First Name',
        key: 'firstName',
        type: 'text',
        value: '',
        validationRules: [{ key: 'isRequired', additionalData: 'First Name' }],
    },
    {
        id: 2,
        label: 'Last Name',
        key: 'lastName',
        type: 'text',
        value: '',
        validationRules: [{ key: 'isRequired', additionalData: 'Last Name' }],
    },
    {
        id: 3,
        label: 'Password',
        key: 'password',
        type: 'text',
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
        type: 'text',
        value: '',
        validationRules: [
            { key: 'isRequired', additionalData: 'Confirm Password' },
            { key: 'validateConfirmPassword', additionalData: 'password' },
        ],
    },
];

const RegisterForm = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { data, focus, errors, onChange, onBlur, resetForm, isValid } = useForm(formFields);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isValid()) {
            // Handle form submission logic here
            enqueueSnackbar('handleSubmit logic triggered', {
                variant: 'info',
            });
        }
    };

    return (
        <ReusableForm
            formFields={formFields}
            data={data}
            focus={focus}
            errors={errors}
            onChange={onChange}
            onBlur={onBlur}
            isValid={isValid}
            handleSubmit={handleSubmit}
        >
            <StyledButton type="button" onClick={resetForm} variant="contained" color="secondary">
                Reset
            </StyledButton>
        </ReusableForm>
    );
};

export default RegisterForm;
