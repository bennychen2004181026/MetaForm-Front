import React from 'react';

import { Box, CircularProgress, circularProgressClasses, useTheme } from '@mui/material';

const StyledUploadLoading: React.FC = () => {
    const theme = useTheme();
    return (
        <Box sx={{ position: 'relative' }}>
            <CircularProgress
                variant="determinate"
                sx={{
                    color: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                }}
                size={40}
                thickness={4}
            />
            <CircularProgress
                variant="indeterminate"
                disableShrink
                sx={{
                    color: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
                    animationDuration: '550ms',
                    position: 'absolute',
                    left: 0,
                    [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: 'round',
                    },
                }}
                size={40}
                thickness={4}
            />
        </Box>
    );
};

export default StyledUploadLoading;
