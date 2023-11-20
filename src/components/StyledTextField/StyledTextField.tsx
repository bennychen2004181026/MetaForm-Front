import React from 'react';

import { TextField } from '@mui/material';
import styled from 'styled-components';

interface CustomTextFieldProps {
    styleProps?: React.CSSProperties;
}

const StyledTextField = styled(TextField)<CustomTextFieldProps>`
    && {
        max-width: 100%;
        .MuiFormHelperText-root {
            max-width: 80%;
        }
        ${(props) => ({ ...props.styleProps })}
    }
`;

export default StyledTextField;
