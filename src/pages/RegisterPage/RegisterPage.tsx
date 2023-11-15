import React from 'react';

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

const Text = styled.div`
    font-size: 15px;
    font-weight: 300;
    font-family: Arial, Helvetica, sans-serif;
    margin-top: 15px;
    margin-bottom: 15px;
`;

const RegisterPage = () => {
    return (
        <Content>
            <Title>Create your account</Title>
            <GoogleButton />
            <Text>or</Text>
            <EmailButton />
        </Content>
    );
};

export default RegisterPage;
