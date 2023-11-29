import React, { FormEvent, ReactNode } from 'react';

import { MenuItem } from '@mui/material';
import styled from 'styled-components';

import RequiredLabel from '@/components/RequiredLabel/RequiredLabel';
import StyledTextField from '@/components/StyledTextField';
import SubmitButton from '@/components/SubmitButton/SubmitButton';
import { IField } from '@/hooks/useForm1';

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    width: 100%;
    margin: auto;

    @media (min-width: 600px) {
        width: 400px;
    }

    @media (min-width: 1024px) {
        width: 450px;
    }
`;

interface FormProps {
    excludeFields?: string[];
    children?: ReactNode;
    formFields: IField[];
    data: Record<string, string>;
    focus: Record<string, boolean>;
    errors: Record<string, string>;
    onChange: (
        field: string,
    ) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onBlur: (field: string) => () => void;
    isValid: () => boolean;
    handleSubmit?: (event: FormEvent<HTMLFormElement>) => void;
    styleProps?: React.CSSProperties;
    showSubmitButton?: boolean;
    submitButtonText?: string;
}

const ReusableForm: React.FC<FormProps> = ({
    excludeFields = [],
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
    showSubmitButton = true,
    submitButtonText = 'Submit',
}) => {
    const renderField = (field: IField) => {
        switch (field.type) {
            case 'select':
                return (
                    <StyledTextField
                        key={field.id}
                        select
                        label={
                            <RequiredLabel
                                label={field.label}
                                isRequired={field.validationRules.some(
                                    (rule) => rule.key === 'isRequired',
                                )}
                            />
                        }
                        value={data[field.key]}
                        onChange={onChange(field.key)}
                        onBlur={onBlur(field.key)}
                        error={focus[field.key] && !!errors[field.key]}
                        helperText={focus[field.key] ? errors[field.key] : ''}
                    >
                        {field.options?.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </StyledTextField>
                );
            case 'file':
                return <input key={field.id} type="file" onChange={onChange(field.key)} />;
            case 'input':
            default:
                return (
                    <StyledTextField
                        key={field.id}
                        label={
                            <RequiredLabel
                                label={field.label}
                                isRequired={field.validationRules.some(
                                    (rule) => rule.key === 'isRequired',
                                )}
                            />
                        }
                        value={data[field.key]}
                        onChange={onChange(field.key)}
                        onBlur={onBlur(field.key)}
                        error={focus[field.key] && !!errors[field.key]}
                        helperText={focus[field.key] ? errors[field.key] : ''}
                    />
                );
        }
    };

    return (
        <StyledForm
            onSubmit={handleSubmit as React.FormEventHandler<HTMLFormElement>}
            style={{ ...styleProps }}
        >
            {formFields.filter((field) => !excludeFields.includes(field.key)).map(renderField)}
            {children}
            {showSubmitButton && <SubmitButton isValid={isValid()} text={submitButtonText} />}
        </StyledForm>
    );
};

export default ReusableForm;
