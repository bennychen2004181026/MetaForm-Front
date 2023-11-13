import React from 'react';

import { Box } from '@mui/system';
import { Image } from 'mui-image';

import Button from '@/components/Button';
import Title from '@/layouts/MainLayout/Title';

const LoginPage = () => {
    return (
        <div>
            <Box sx={{ mb: '4rem' }}>
                <Title content="Welcome to MetaForm" />
            </Box>

            <Box textAlign="center">
                <Button value="Sign Up" />
            </Box>
            <Image src="./assets/1.png" />
        </div>
    );
};

export default LoginPage;
