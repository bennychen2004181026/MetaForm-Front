import React from 'react';

import { TextField } from '@mui/material';
import styled from 'styled-components';

interface CustomTextFieldProps {
    styleProps?: React.CSSProperties;
}

const StyledTextField = styled(TextField)<CustomTextFieldProps>`
    && {
        position: relative;
        margin: 20px 0 30px 0;
        max-width: 100%;
        @media(max-width:400px) {
            margin: 40px 0 30px 0;
        }
        .MuiFormHelperText-root {
            max-width: 90%;
            position: absolute;
            left: 0;
            top: 100%;
            padding: 5px 0 0 0;
        ${(props) => ({ ...props.styleProps })}
    }
`;

export default StyledTextField;
