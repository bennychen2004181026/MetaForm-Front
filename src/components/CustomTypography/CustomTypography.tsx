import React from 'react';

import Typography, { TypographyProps } from '@mui/material/Typography';
import styled from 'styled-components';

interface CustomTypographyProps extends TypographyProps {
    text: string;
}

const StyledTypography = styled(Typography)`
    &.MuiTypography-h5 {
        font-weight: bold;
    }

    &.MuiTypography-subtitle1 {
    }

    &.MuiTypography-body1 {
    }
`;

const CustomTypography: React.FC<CustomTypographyProps> = ({ variant, text, ...props }) => {
    return (
        <StyledTypography variant={variant} {...props}>
            {text}
        </StyledTypography>
    );
};

export default CustomTypography;
