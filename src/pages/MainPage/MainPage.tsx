import React from 'react';

import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

import fakeImage from '@/assets/public/fake.jpg';
import Button from '@/components/Button';
import Title from '@/layouts/MainLayout/Title';
import ImageBox from '@/pages/MainPage/components/ImageBox';
import GlobalStyle from '@/styles/GlobalStyle';

const LoginPage = () => {
    const navigate = useNavigate();
    const handleSignUpButton = () => {
        navigate('/register');
    };
    return (
        <div>
            <GlobalStyle />
            <Title content="Welcome to MetaForm" />
            <Box textAlign="center">
                <Button value="Sign Up" onClick={handleSignUpButton} />
            </Box>
            <ImageBox src={fakeImage} alt="" />
        </div>
    );
};

export default LoginPage;
