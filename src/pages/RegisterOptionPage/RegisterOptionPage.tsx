import React from 'react';

import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import googleIcon from '@/assets/images/google-icon-logo.png';
import useGoogleOAuth from '@/hooks/useGoogleOAuth';
import Title from '@/layouts/MainLayout/Title';
import GlobalStyle from '@/styles/GlobalStyle';
import { currentApiUrl } from '@/utils/axiosBaseQuery';

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const RegisterButton = styled(Button)`
    width: 320px;
    height: 52px;
    margin: 0px;
    border: 1px;
    border-style: solid;
    border-radius: 15px;
    border-color: black;
    padding: 8px 50px;
    font-weight: 600;
    font-size: 15px;
    text-transform: none;
    text-decoration: none;
`;

const GoogleIcon = styled.img`
    margin-right: 10px;
    width: 22px;
    height: 22px;
`;

const RegisterOptionPage = () => {
    const { handleGoogleLoginClick } = useGoogleOAuth(currentApiUrl);
    return (
        <Content>
            <GlobalStyle />
            <Title content="Create your account" />
            <RegisterButton
                startIcon={<GoogleIcon src={googleIcon} />}
                sx={{ color: 'black', backgroundColor: 'white' }}
                onClick={handleGoogleLoginClick}
            >
                Sign up with Google
            </RegisterButton>
            <Typography variant="subtitle1" padding="15px">
                or
            </Typography>
            <Link to="/register-email">
                <RegisterButton
                    sx={{
                        color: 'white',
                        backgroundColor: 'black',
                        '&:hover': { bgcolor: 'grey' },
                    }}
                >
                    Sign up with email
                </RegisterButton>
            </Link>
        </Content>
    );
};

export default RegisterOptionPage;
