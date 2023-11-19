import React from 'react';

import { Button, Container, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';

import { showSnackbar } from '@/store/slices/snackbar/snackbarSlice';

type SnackbarVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

const SnackbarTestingPage = () => {
    const dispatch = useDispatch();

    const handleSnackbarOpen = (variant: SnackbarVariant) => {
        dispatch(
            showSnackbar({
                message: `This is a ${variant} message!`,
                type: variant,
                options: {
                    anchorOrigin:
                        variant === 'error'
                            ? { vertical: 'top', horizontal: 'left' }
                            : { vertical: 'bottom', horizontal: 'left' },
                    transitionDuration: variant === 'error' ? 10 : 600,
                    // Add any other custom options here for testing
                },
            }),
        );
    };

    return (
        <Container
            maxWidth="sm"
            style={{ backgroundColor: 'white', width: '120%', marginTop: '20px' }}
        >
            <Grid container spacing={2} justifyContent="center">
                {['default', 'success', 'error', 'warning', 'info'].map((variant) => (
                    <Grid item key={variant}>
                        <Button
                            variant="contained"
                            onClick={() => handleSnackbarOpen(variant as SnackbarVariant)}
                        >
                            Show {variant} Snackbar
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default SnackbarTestingPage;
