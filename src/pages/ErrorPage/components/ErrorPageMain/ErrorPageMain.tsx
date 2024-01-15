import React from 'react';

import { Box, Button, CardMedia, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import { ReactComponent as ErrorLogo } from '@/assets/public/errorLogo.svg';
import CustomTypography from '@/components/CustomTypography';
import { useAppSelector } from '@/hooks/redux';
import { IUser } from '@/interfaces/IUser';
import { accountStatus, authUser, authUserId } from '@/store/slices/auth/authSlice';

interface FadeInSpanProps {
    delay?: string;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    color: red;
  }
  to {
    opacity: 1;
    color: blue;
  }
`;

const StyledH1 = styled.h1`
    padding: 0;
    margin: 0;
    font-size: 8em;
    transition: font-size 200ms ease-in-out;
    border-bottom: 1px dashed white;
`;

const FadeInSpan = styled.span<FadeInSpanProps>`
    animation: ${fadeIn} 1s ease-in-out;
    animation-delay: ${(props) => props.delay || '0ms'};
    animation-iteration-count: infinite;
`;

const ErrorPageMain = () => {
    const fetchedUser: IUser = useAppSelector(authUser);
    const fetchAccountStatus: boolean = useAppSelector(accountStatus);
    const fetchUserId: string = useAppSelector(authUserId);
    const navigate = useNavigate();

    const handleBack = () => {
        if (!fetchedUser) {
            navigate('/login');
        }
        if (!fetchAccountStatus) {
            navigate(`/company-profile/${fetchUserId}`);
        }
        navigate(-1);
    };

    return (
        <Container maxWidth="sm">
            <Box textAlign="center" my={5}>
                <CardMedia>
                    <ErrorLogo />
                </CardMedia>
                <StyledH1>
                    <FadeInSpan delay="200ms">4</FadeInSpan>
                    <FadeInSpan delay="300ms">0</FadeInSpan>
                    <FadeInSpan delay="400ms">4</FadeInSpan>
                </StyledH1>
                <CustomTypography
                    variant="h5"
                    text="Oops! The page you're looking for isn't here."
                    gutterBottom
                />
                <CustomTypography
                    variant="body1"
                    text="You might have the wrong address, or the page may have moved."
                    gutterBottom
                />
                <Button variant="outlined" color="primary" onClick={handleBack}>
                    Go Back
                </Button>
            </Box>
        </Container>
    );
};

export default ErrorPageMain;
