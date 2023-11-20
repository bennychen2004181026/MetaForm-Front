import React from 'react';

import MUIButton from '@mui/material/Button';

interface ButtonProps {
    onClick: () => void;
    value: string;
}
const Button = (props: ButtonProps) => {
    const { onClick, value } = props;
    return (
        <MUIButton style={{ textTransform: 'none' }} variant="contained" onClick={onClick}>
            {value}
        </MUIButton>
    );
};
export default Button;
