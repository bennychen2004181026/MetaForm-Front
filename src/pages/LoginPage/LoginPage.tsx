import React, { useState } from 'react';

import { TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import StyledButton from '@/components/Button/Button';
import Hyperlink from '@/components/StyledLink/';
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
    min-width: 350px;
`;

interface CustomFieldProps {
    customMargin?: string;
}
const StyledTextField = styled(TextField)<CustomFieldProps>`
    margin-bottom: ${(props) => props.customMargin};
`;
const loginType = (formField: Record<string, string>) => [
    {
        id: 1,
        label: 'Email',
        getErrorMessage: (data: Record<string, string>) => validator.validEmail(data?.email),
        key: 'email',
        value: formField.email,
        margin: '1rem',
    },
    {
        id: 2,
        label: 'Password',
        getErrorMessage: (data: Record<string, string>) => validator.validPassword(data?.password),
        key: 'password',
        value: formField.password,
        margin: '1rem',
    },
];

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        workEmail: '',
    });
    const formField = loginType(formData);
    const { data, focus, onBlur, onChange, validation } = useForm(formField);
    const navigate = useNavigate();
    const forgotPassword = () => {
        const path = `../forgetpassword`;
        navigate(path);
    };
    return (
        <Content>
            <GlobalStyle />
            <Title content="Welcome to MetaForm" />
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
            <Typography variant="subtitle1" sx={{ padding: '5px' }}>
                Forgot password? Click <Hyperlink text="here" onClick={forgotPassword} />
            </Typography>
            <StyledButton
                variant="contained"
                sx={{ margin: '2rem', backgroundColor: 'grey', textTransform: 'none' }}
            >
                Use Google account to login
            </StyledButton>
            <StyledButton variant="contained" sx={{ margin: '2rem', textTransform: 'none' }}>
                Confirm
            </StyledButton>
        </Content>
    );
};

export default Login;
