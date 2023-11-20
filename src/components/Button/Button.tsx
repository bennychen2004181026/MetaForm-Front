import React from 'react';

import { Button as MUIButton } from '@mui/material';

interface ButtonProps {
    onClick: () => void;
    value: string;
}
const CommonButton = (props: ButtonProps) => {
    const { onClick, value } = props;
    return (
        <MUIButton style={{ textTransform: 'none' }} variant="contained" onClick={onClick}>
            {value}
        </MUIButton>
    );
};
export default CommonButton;
