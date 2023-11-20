import React, { FormEvent, ReactNode } from 'react';

import styled from 'styled-components';

import StyledButton from '@/components/Button';
import StyledTextField from '@/components/StyledTextField';
import { IField } from '@/hooks/useForm';

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

interface FormProps {
    children?: ReactNode;
    formFields: IField[];
    data: Record<string, string>;
    focus: Record<string, boolean>;
    errors: Record<string, string>;
    onChange: (field: string, value: string) => void;
    onBlur: (field: string) => void;
    isValid: () => boolean;
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
    styleProps?: React.CSSProperties;
}

const ReusableForm: React.FC<FormProps> = ({
    children,
    formFields,
    data,
    focus,
    errors,
    onChange,
    onBlur,
    isValid,
    handleSubmit,
    styleProps,
}) => {
    return (
        <StyledForm
            onSubmit={handleSubmit as React.FormEventHandler<HTMLFormElement>}
            style={{ ...styleProps }}
        >
            {formFields.map((field) => (
                <StyledTextField
                    key={field.id}
                    label={field.label}
                    type={field.type || 'text'}
                    value={data[field.key]}
                    onChange={(e) => onChange(field.key, e.target.value)}
                    onBlur={() => onBlur(field.key)}
                    error={focus[field.key] && !!errors[field.key]}
                    helperText={focus[field.key] ? errors[field.key] : ''}
                />
            ))}
            {children}
            <StyledButton type="submit" disabled={!isValid()} variant="contained" color="primary">
                Submit
            </StyledButton>
        </StyledForm>
    );
};

export default ReusableForm;
