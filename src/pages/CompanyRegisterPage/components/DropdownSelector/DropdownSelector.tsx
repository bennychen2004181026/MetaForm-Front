import React, { useState } from 'react';

import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import styled from 'styled-components';

import useForm from '@/hooks/useForm';
import validator from '@/utils/CompanyRegisterFormValidators';

interface DropdownSelectorProps {
    options: string[];
}
interface CustomFieldProps {
    customMargin?: string;
}
const StyledSelectorTextFiled = styled(TextField)<CustomFieldProps>`
    margin-bottom: ${(props) => props.customMargin};
`;
const industrySelectorType = (formField: Record<string, string>) => [
    {
        id: 1,
        label: 'Industry',
        getErrorMessage: (data: Record<string, string>) =>
            validator.isRequired('Industry', data?.industry),
        key: 'industry',
        value: formField.industry,
        margin: '2rem',
    },
];
const DropdownSelector = (props: DropdownSelectorProps) => {
    const { options } = props;
    const [selected, setSelected] = useState({ industry: '' });
    const industryField = industrySelectorType(selected);
    const { data, focus, onBlur, onChange, validation } = useForm(industryField);
    const { id, label, key, getErrorMessage, margin } = industryField[0];
    return (
        <StyledSelectorTextFiled
            key={id}
            label={label}
            variant="outlined"
            fullWidth
            select
            helperText={(focus[key] && getErrorMessage?.(data)) ?? ' '}
            onBlur={onBlur(key)}
            onChange={onChange(key)}
            error={focus[key] && !!getErrorMessage?.(data)}
            customMargin={margin}
        >
            {options.map((option) => (
                <MenuItem key={option} value={option}>
                    {option}
                </MenuItem>
            ))}
        </StyledSelectorTextFiled>
    );
};
export default DropdownSelector;
