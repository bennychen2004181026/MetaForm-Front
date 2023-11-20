import React from 'react';

import { Typography } from '@mui/material';
import styled from 'styled-components';

import EmailButton from './components/EmailButton';
import GoogleButton from './components/GoogleButton';

const Content = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Title = styled.strong`
    font-size: 38px;
    font-weight: 600;
    font-family: Arial, Helvetica, sans-serif;
    margin-bottom: 35px;
`;

const RegisterPage = () => {
    return (
        <Content>
            <Title>Create your account</Title>
            <GoogleButton />
            <Typography variant="subtitle1" padding="15px">
                or
            </Typography>
            <EmailButton />
        </Content>
    );
};

export default RegisterPage;
