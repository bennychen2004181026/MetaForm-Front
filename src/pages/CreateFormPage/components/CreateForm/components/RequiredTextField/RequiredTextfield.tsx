import React, { FormEvent, ReactNode } from 'react';

import { TextField } from '@mui/material';

import useForm, { IField } from '@/hooks/useForm';
import validator from '@/utils/RequiredTextfieldValidator';

interface ITextfieldProps {
    children?: ReactNode;
    formField: IField;
    fieldsData: Record<string, string>;
    fieldsFocus: Record<string, boolean>;
    errors: Record<string, string>;
    onDataChange: (
        field: string,
    ) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string) => void;
    onFieldBlur: (field: string) => () => void;
    isValid: () => boolean;
}

const RequiredTextfield = () => {
    return (
        <TextField
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
        </TextField>
    );
};

export default RequiredTextfield;
