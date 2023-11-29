import React from 'react';

import StyledButton from '../Button/Button';

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
                bgcolor: 'primary.main',
                '&:hover': {
                    bgcolor: 'primary.dark',
                    color: 'white',
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
