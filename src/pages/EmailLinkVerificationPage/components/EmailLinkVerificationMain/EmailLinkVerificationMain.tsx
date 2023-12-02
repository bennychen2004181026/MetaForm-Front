import React, { useEffect, useState } from 'react';

import { Box, CircularProgress, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

interface EmailLinkVerificationMainProps {
    token: string | undefined;
}

const EmailLinkVerificationMain: React.FC<EmailLinkVerificationMainProps> = ({ token }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setLoading] = useState(true);
    const [verificationFailed, setVerificationFailed] = useState(false);
    const { NODE_ENV } = process.env;

    let verificationLink: string;
    if (NODE_ENV === 'production') {
        verificationLink = `http://localhost:3001/users/verification/${token}`;
    } else if (NODE_ENV === 'development') {
        verificationLink = `http://localhost:3001/users/verification/${token}`;
    } else {
        verificationLink = `http://localhost:3001/users/verification/${token}`;
    }

    useEffect(() => {
        if (token) {
            axios
                .get(verificationLink)
                .then((response) => {
                    setLoading(false);
                    const { email, username } = response.data;
                    // Next page can useLocation to fetch the email and username in state
                    navigate('/create-user', { state: { email, username } });
                })
                .catch((error) => {
                    setLoading(false);
                    setVerificationFailed(true);
                    setTimeout(() => navigate('/confirm-email'), 3000);
                });
        } else {
            setLoading(false);
            setVerificationFailed(true);
        }
    }, [location, navigate]);

    return (
        <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '100px' }}>
            {isLoading && (
                <Box>
                    <CircularProgress />
                    <Typography variant="h6" style={{ marginTop: '20px' }}>
                        Verifying your email...
                    </Typography>
                </Box>
            )}
            {verificationFailed && (
                <Typography variant="h6">
                    Verification failed. You will be redirected to the home page shortly.
                </Typography>
            )}
        </Container>
    );
};

export default EmailLinkVerificationMain;
