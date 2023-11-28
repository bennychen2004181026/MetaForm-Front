import React, { useState } from 'react';

import { TextField } from '@mui/material';
import styled from 'styled-components';

import DropdownSelector from './components/DropdownSelector';
import industries from './industryOptions';
import useForm from '@/hooks/useForm';
import Title from '@/layouts/MainLayout/Title';
import validator from '@/utils/CompanyRegisterFormValidators';

interface CustomFieldProps {
    customMargin?: string;
}
const StyledTextField = styled(TextField)<CustomFieldProps>`
    margin-bottom: ${(props) => props.customMargin};
`;
const companyRegisterType = (formField: Record<string, string>) => [
    {
        id: 1,
        label: 'Company Name',
        getErrorMessage: (data: Record<string, string>) =>
            validator.isRequired('CompanyName', data?.companyName),
        key: 'companyName',
        value: formField.companyName,
        margin: '2rem',
    },
    {
        id: 2,
        label: 'ABN',
        getErrorMessage: (data: Record<string, string>) => validator.validABN(data?.abn),
        key: 'abn',
        value: formField.abn,
        margin: '1rem',
    },
];
const industrySelectorConfig = {
    id: 1,
    label: 'Industry',
    getErrorMessage: (data: Record<string, string>) =>
        validator.isRequired('Industry', data?.industry),
    key: 'industry',
    value: '',
    margin: '2rem',
};
const CompanyRegisterPage = () => {
    const [formData, setFormData] = useState({ companyName: '', abn: '' });
    const formField = companyRegisterType(formData);
    const { data, focus, onBlur, onChange, validation } = useForm(formField);
    const industryArray = industries.map((industry) => industry.name);
    return (
        <div>
            <Title content="Register Company Account" />
            <DropdownSelector options={industryArray} selectorConfig={industrySelectorConfig} />
            {formField.map((type) => {
                return (
                    <StyledTextField
                        key={type.id}
                        label={type.label}
                        variant="outlined"
                        fullWidth
                        helperText={(focus[type.key] && type.getErrorMessage?.(data)) ?? ' '}
                        onBlur={onBlur(type.key)}
                        onChange={onChange(type.key)}
                        error={focus[type.key] && !!type.getErrorMessage?.(data)}
                        customMargin={type.margin}
                    />
                );
            })}
        </div>
    );
};
export default CompanyRegisterPage;
