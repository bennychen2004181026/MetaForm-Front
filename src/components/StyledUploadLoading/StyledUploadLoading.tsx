import React from 'react';

import {
    Box,
    CircularProgress,
    LinearProgress,
    Typography,
    circularProgressClasses,
    linearProgressClasses,
    useTheme,
} from '@mui/material';

interface LoadingProgressProps {
    uploadProgress: number;
}

const StyledUploadLoading: React.FC<LoadingProgressProps> = ({ uploadProgress }) => {
    const theme = useTheme();
    return (
        <>
            <Box sx={{ position: 'relative' }}>
                <CircularProgress
                    variant="determinate"
                    sx={{
                        color: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                    }}
                    size={40}
                    thickness={4}
                    value={uploadProgress}
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
            <Typography variant="body1">{uploadProgress.toFixed(2)}%</Typography>
            <LinearProgress
                variant="determinate"
                value={uploadProgress}
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 10,
                    borderRadius: 5,
                    [`&.${linearProgressClasses.colorPrimary}`]: {
                        backgroundColor:
                            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                    },
                    [`& .${linearProgressClasses.bar}`]: {
                        borderRadius: 5,
                        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
                        backgroundImage:
                            'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.15) 10px, rgba(0,0,0,0.15) 20px)',
                        transition: 'width 0.4s ease',
                    },
                }}
            />
        </>
    );
};

export default StyledUploadLoading;
