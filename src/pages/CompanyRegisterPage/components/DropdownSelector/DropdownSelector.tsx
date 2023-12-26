import React, { useState } from 'react';

import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import styled from 'styled-components';

import useForm from '@/hooks/useForm';
import validator from '@/utils/CompanyRegisterFormValidators';

interface SelectorConfig {
    id: number;
    label: string;
    getErrorMessage: (data: Record<string, string>) => string;
    key: string;
    value: string;
    margin: string;
}

interface DropdownSelectorProps {
    options: string[];
    selectorConfig: SelectorConfig;
}
interface CustomFieldProps {
    customMargin?: string;
}
const StyledSelectorTextField = styled(TextField)<CustomFieldProps>`
    margin-bottom: ${(props) => props.customMargin};
`;

const DropdownSelector = (props: DropdownSelectorProps) => {
    const { options, selectorConfig } = props;

    const [selectedValue, setSelectedValue] = useState({ [selectorConfig.key]: '' });

    const selectorFields = [
        {
            ...selectorConfig,
            value: selectedValue[selectorConfig.key],
        },
    ];

    const { data, focus, onBlur, onChange, validation } = useForm(selectorFields);
    const { id, label, key, getErrorMessage, margin } = selectorConfig;
    return (
        <StyledSelectorTextField
            key={id}
            label={label}
            variant="outlined"
            fullWidth
            select
            defaultValue=""
            helperText={(focus[key] && getErrorMessage?.(data)) ?? ' '}
            onBlur={onBlur(key)}
            onChange={(e) => {
                onChange(key)(e);
                setSelectedValue({ [key]: e.target.value });
            }}
            error={focus[key] && !!getErrorMessage?.(data)}
            customMargin={margin}
        >
            {options.map((option) => (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
            ))}
        </StyledSelectorTextField>
    );
};
export default DropdownSelector;
