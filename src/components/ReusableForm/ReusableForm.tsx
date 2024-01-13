import React, { FormEvent, ReactNode, useState } from 'react';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment, MenuItem, TextField } from '@mui/material';
import styled from 'styled-components';

import RequiredLabel from '@/components/RequiredLabel/RequiredLabel';
import StyledTextField from '@/components/StyledTextField';
import SubmitButton from '@/components/SubmitButton/SubmitButton';
import { IField } from '@/hooks/useForm';

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
    fieldsData: Record<string, string>;
    fieldsFocus: Record<string, boolean>;
    errors: Record<string, string>;
    onDataChange: (
        field: string,
    ) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string) => void;
    onFieldsBlur: (field: string) => () => void;
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
    fieldsData,
    fieldsFocus,
    errors,
    onDataChange,
    onFieldsBlur,
    isValid,
    handleSubmit,
    styleProps,
    showSubmitButton = true,
    submitButtonText = 'Submit',
}) => {
    const [showPassword, setShowPassword] = useState<Record<string, boolean>>({
        password: false,
        confirmPassword: false,
        newPassword: false,
    });

    const handleClickShowPassword = (field: string) => {
        setShowPassword({ ...showPassword, [field]: !showPassword[field] });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

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
                                isRequired={
                                    field.validationRules?.some(
                                        (rule) => rule.key === 'isRequired',
                                    ) ?? false
                                }
                            />
                        }
                        value={fieldsData[field.key]}
                        onChange={onDataChange(field.key)}
                        onBlur={onFieldsBlur(field.key)}
                        error={fieldsFocus[field.key] && !!errors[field.key]}
                        helperText={fieldsFocus[field.key] ? errors[field.key] : ''}
                    >
                        {field.options?.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </StyledTextField>
                );
            case 'file':
                return <input key={field.id} type="file" onChange={onDataChange(field.key)} />;
            case 'token':
                return <TextField>Hidden</TextField>;
            case 'password':
                return (
                    <StyledTextField
                        key={field.id}
                        label={
                            <RequiredLabel
                                label={field.label}
                                isRequired={
                                    field.validationRules?.some(
                                        (rule) => rule.key === 'isRequired',
                                    ) ?? false
                                }
                            />
                        }
                        type={showPassword[field.key] ? 'text' : 'password'}
                        value={fieldsData[field.key]}
                        onChange={onDataChange(field.key)}
                        onBlur={onFieldsBlur(field.key)}
                        error={fieldsFocus[field.key] && !!errors[field.key]}
                        helperText={fieldsFocus[field.key] ? errors[field.key] : ''}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label={`toggle ${field.label} visibility`}
                                        onClick={() => handleClickShowPassword(field.key)}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword[field.key] ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                );
            case 'input':
            default:
                return (
                    <StyledTextField
                        key={field.id}
                        label={
                            <RequiredLabel
                                label={field.label}
                                isRequired={
                                    field.validationRules?.some(
                                        (rule) => rule.key === 'isRequired',
                                    ) ?? false
                                }
                            />
                        }
                        value={fieldsData[field.key]}
                        onChange={onDataChange(field.key)}
                        onBlur={onFieldsBlur(field.key)}
                        error={fieldsFocus[field.key] && !!errors[field.key]}
                        helperText={fieldsFocus[field.key] ? errors[field.key] : ''}
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
