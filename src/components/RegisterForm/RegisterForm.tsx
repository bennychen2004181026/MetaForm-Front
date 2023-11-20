import React from 'react';

import StyledTextField from '@/components/StyledTextField';
import { IField, useForm } from '@/hooks/useForm';

const formFields: IField[] = [
    {
        id: 1,
        label: 'First Name',
        key: 'firstName',
        value: '',
        validationRules: [{ key: 'isRequired', additionalData: 'First Name' }],
    },
    {
        id: 2,
        label: 'Last Name',
        key: 'lastName',
        value: '',
        validationRules: [{ key: 'isRequired', additionalData: 'Last Name' }],
    },
    {
        id: 3,
        label: 'Password',
        key: 'password',
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
        value: '',
        validationRules: [
            { key: 'isRequired', additionalData: 'Confirm Password' },
            { key: 'validateConfirmPassword', additionalData: 'password' },
        ],
    },
];

const RegisterForm = () => {
    const { data, focus, errors, onChange, onBlur, resetForm, isValid } = useForm(formFields);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isValid()) {
            // Handle form submission logic here
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {formFields.map((field) => (
                <StyledTextField
                    key={field.id}
                    label={field.label}
                    value={data[field.key]}
                    onChange={() => onChange(field.key)}
                    onBlur={() => onBlur(field.key)}
                    error={focus[field.key] && !!errors[field.key]}
                    helperText={focus[field.key] ? errors[field.key] : ''}
                />
            ))}
            <button type="submit" disabled={!isValid()}>
                Register
            </button>
            <button type="button" onClick={resetForm}>
                Reset
            </button>
        </form>
    );
};

export default RegisterForm;
