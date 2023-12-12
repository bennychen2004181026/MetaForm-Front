import React from 'react';

import Button from '@mui/material/Button';
import styled from 'styled-components';

interface StartIconButtonProps {
    text: string;
    onClick?: () => void;
    startIcon: React.ReactNode;
    variant?: 'text' | 'outlined' | 'contained';
    children?: React.ReactNode;
}

const StyledStartIconButton = styled(Button)`
    height: 4vh;
    width: 16vw;
    border: none;
    padding: 2px;
    border-radius: 10%;
    transition:
        background-color 0.2s,
        color 0.2s;
`;

const StartIconButton: React.FC<StartIconButtonProps> = ({
    text,
    onClick,
    startIcon,
    variant = 'text',
    children,
}) => {
    return (
        <StyledStartIconButton variant={variant} onClick={onClick} startIcon={startIcon}>
            {text}
            {children}
        </StyledStartIconButton>
    );
};

export default StartIconButton;
