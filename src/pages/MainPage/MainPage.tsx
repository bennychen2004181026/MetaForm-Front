import React from 'react';

import AssistantDirectionIcon from '@mui/icons-material/AssistantDirection';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

import fakeImage from '@/assets/public/fake.jpg';
import StartIconButton from '@/components/StartIconButton';
import Footer from '@/layouts/Footer/Footer';
import Header from '@/layouts/Header/Header';
import MainLayout from '@/layouts/MainLayout';
import Title from '@/layouts/MainLayout/Title';
import ImageBox from '@/pages/MainPage/components/ImageBox';
import GlobalStyle from '@/styles/GlobalStyle';

const MainPage = () => {
    const navigate = useNavigate();
    const handleSignUpButton = () => {
        navigate('/register-option');
    };
    return (
        <div>
            <GlobalStyle />
            <Header />
            <MainLayout>
                <Title content="Welcome to MetaForm" />
                <Box textAlign="center">
                    <StartIconButton
                        text="Welcome"
                        onClick={handleSignUpButton}
                        startIcon={<AssistantDirectionIcon />}
                        variant="contained"
                    />
                </Box>
                <ImageBox src={fakeImage} alt="" />
            </MainLayout>
            <Footer />
        </div>
    );
};

export default MainPage;
