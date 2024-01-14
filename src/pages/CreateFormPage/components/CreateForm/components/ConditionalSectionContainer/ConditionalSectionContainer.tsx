import React, { ReactNode } from 'react';

import Paper from '@mui/material/Paper';

const ConditionalSectionContainer = ({
    children,
    elevation = 4,
    backgroundColor,
    square = true,
    wariningBorderStyle,
}: {
    children: ReactNode;
    elevation?: number;
    backgroundColor?: string;
    square?: boolean;
    wariningBorderStyle?: string;
}) => {
    return (
        <Paper
            elevation={elevation}
            square={square}
            sx={{
                p: 4,
                position: 'relative',
                marginBottom: '20px',
                minWidth: '800px',
                border: wariningBorderStyle,
                bgcolor: backgroundColor || undefined,
            }}
        >
            {children}
        </Paper>
    );
};

export default ConditionalSectionContainer;
