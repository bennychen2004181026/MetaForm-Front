import React from 'react';

import { TextField } from '@mui/material';
import styled from 'styled-components';

interface CustomTextFieldProps {
    styleProps?: React.CSSProperties;
}

const StyledTextField = styled(TextField)<CustomTextFieldProps>`
    && {
        ${(props) => ({ ...props.styleProps })}
    }
`;

export default StyledTextField;
