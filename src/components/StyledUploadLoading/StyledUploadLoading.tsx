import React from 'react';

import { Box, CircularProgress, circularProgressClasses, useTheme } from '@mui/material';
import styled from 'styled-components';

const lightModeColor = '#1a90ff';
const darkModeColor = '#308fe8';
const lightGreyColor = 200;
const darkGreyColor = 800;

const StyledDeterminateCircularProgress = styled(CircularProgress)`
    color: ${({ theme }) =>
        theme.palette.grey[theme.palette.mode === 'light' ? lightGreyColor : darkGreyColor]};
    size: 40px;
    thickness: 4;
`;

const StyledIndeterminateCircularProgress = styled(CircularProgress)`
    color: ${({ theme }) => (theme.palette.mode === 'light' ? lightModeColor : darkModeColor)};
    animationduration: 550ms;
    position: absolute;
    left: 0;

    & .${circularProgressClasses.circle} {
        strokelinecap: round;
    }
    size: 40px;
    thickness: 4;
`;

const StyledUploadLoading: React.FC = () => {
    const theme = useTheme();

    return (
        <Box sx={{ position: 'relative' }}>
            <StyledDeterminateCircularProgress theme={theme} variant="determinate" />
            <StyledIndeterminateCircularProgress
                theme={theme}
                variant="indeterminate"
                disableShrink
            />
        </Box>
    );
};

export default StyledUploadLoading;
