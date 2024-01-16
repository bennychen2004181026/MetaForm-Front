import React from 'react';

import StyledButton from '@/components/Button/Button';

interface SubmitButtonProps {
    isValid: boolean;
    text: string;
    handleSubmit?: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ isValid, text, handleSubmit }) => {
    const onClick = () => {
        if (isValid && handleSubmit) {
            handleSubmit();
        }
    };
    return (
        <StyledButton
            type="submit"
            disabled={!isValid}
            onClick={onClick}
            variant="contained"
            color="primary"
            sx={{
                textTransform: 'none',
                fontSize: '16px',
                bgcolor: 'primary.main',
                '&:hover': {
                    backgroundColor: '#d36fed',
                    transform: 'scale(1.05)',
                    transition: 'background-color 0.3s ease, transform 0.3s ease',
                },
                '&:disabled': {
                    bgcolor: 'lightgray',
                    color: 'darkgray',
                },
            }}
        >
            {text}
        </StyledButton>
    );
};

export default SubmitButton;
