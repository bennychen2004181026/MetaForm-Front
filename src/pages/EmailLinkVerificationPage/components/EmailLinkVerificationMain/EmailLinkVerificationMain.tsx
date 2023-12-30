import React, { useEffect, useState } from 'react';

import { CircularProgress, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import HyerLink from '@/components/StyledLink/Hyperlink';
import userApis from '@/services/Auth/user';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

interface EmailLinkVerificationMainProps {
    token: string | undefined;
}

const EmailLinkVerificationMain: React.FC<EmailLinkVerificationMainProps> = ({ token }) => {
    const showSnackbar = useSnackbarHelper();
    const navigate = useNavigate();
    const { useVerifyEmailTokenQuery } = userApis;
    const { data, error, isLoading } = useVerifyEmailTokenQuery(token as string);
    const [countdown, setCountdown] = useState(3);
    const [stopCountdown, setStopCountdown] = useState(false);

    useEffect(() => {
        if (error) {
            showSnackbar(`Verification failed. You need to re-verify the email again.`, 'error');
            navigate('/login');
        }
    }, [error]);

    useEffect(() => {
        if (data && countdown === 0) {
            navigate('/create-user', { state: { email: data.email, username: data.username } });
        }
    }, [countdown, data]);

    useEffect(() => {
        let timer: number | undefined;

        if (data && !stopCountdown) {
            showSnackbar(`${data.message}`, 'success');
            timer = window.setInterval(() => {
                setCountdown((currentCountdown) => {
                    if (currentCountdown <= 0) {
                        clearInterval(timer);
                        return 0;
                    }
                    return currentCountdown - 1;
                });
            }, 1000);
        }

        return () => {
            if (timer !== undefined) {
                clearInterval(timer);
            }
        };
    }, [data, stopCountdown, showSnackbar]);

    if (isLoading) {
        return (
            <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '100px' }}>
                <CircularProgress />
                <Typography variant="h6" style={{ marginTop: '20px' }}>
                    Verifying your email...
                </Typography>
            </Container>
        );
    }

    const handleLinkClick = () => {
        setStopCountdown(true);
        navigate('/create-user');
    };

    if (data) {
        return (
            <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '100px' }}>
                <Typography variant="h6">You can click below to redirect immediately.</Typography>
                <HyerLink onClick={handleLinkClick} text={`Redirect in ${countdown} seconds...`} />
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '100px' }}>
            <Typography variant="h6">Failed to fetch token in param.</Typography>
        </Container>
    );
};

export default EmailLinkVerificationMain;
