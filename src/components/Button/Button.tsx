import React from 'react';

import MUIButton from '@mui/material/Button';

const Button = ({ value }: { value: string }) => {
    return (
        <MUIButton style={{ textTransform: 'none' }} variant="contained">
            {value}
        </MUIButton>
    );
};
export default Button;
