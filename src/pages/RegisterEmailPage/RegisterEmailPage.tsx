import React, { useState } from 'react';

import { Checkbox, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';
import styled from 'styled-components';

import StyledButton from '@/components/Button/Button';
import useForm from '@/hooks/useForm';
import Title from '@/layouts/MainLayout/Title';
import GlobalStyle from '@/styles/GlobalStyle';
import validator from '@/utils/UserRegisterFormValidators';

const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-conetnet: center;
    width: 30%;
`;

interface CustomFieldProps {
    customMargin?: string;
}
const StyledTextField = styled(TextField)<CustomFieldProps>`
    margin-bottom: ${(props) => props.customMargin};
`;
const registerEmailType = (formField: Record<string, string>) => [
    {
        id: 1,
        label: 'User Name',
        getErrorMessage: (data: Record<string, string>) =>
            validator.isRequired('UserName', data?.username),
        key: 'username',
        value: formField.username,
        margin: '1rem',
    },
    {
        id: 2,
        label: 'Work Email',
        getErrorMessage: (data: Record<string, string>) => validator.validEmail(data?.workEmail),
        key: 'workEmail',
        value: formField.workEmail,
        margin: '1rem',
    },
];

const RegisterEmail = () => {
    const [formData, setFormData] = useState({
        username: '',
        workEmail: '',
    });
    const formField = registerEmailType(formData);
    const { data, focus, onBlur, onChange, validation } = useForm(formField);
    return (
        <Content>
            <GlobalStyle />
            <Title content="Create your account" />
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
            <Typography variant="subtitle1" sx={{ padding: '5px', alignSelf: 'flex-start' }}>
                Opt-in
            </Typography>
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox />}
                    id="marketingEmail"
                    label="Marketing Emails"
                />
                <FormControlLabel
                    control={<Checkbox />}
                    id="newsEmail"
                    label="News & Updates Emails"
                />
                <FormControlLabel
                    id="termsAgreement"
                    required
                    control={<Checkbox />}
                    label="I agree to MetaForm's Terms of Service, Privacy Policy and Data Processing Agreement"
                />
            </FormGroup>
            <StyledButton variant="contained" sx={{ margin: '2rem' }}>
                Create my account
            </StyledButton>
        </Content>
    );
};

export default RegisterEmail;
