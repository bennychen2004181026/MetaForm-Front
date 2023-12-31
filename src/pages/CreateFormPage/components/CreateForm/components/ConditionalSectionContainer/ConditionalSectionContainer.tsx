import React, { ReactNode } from 'react';

import Paper from '@mui/material/Paper';

const ConditionalSectionContainer = ({
    children,
    elevation = 4,
    backgroundColor,
    square = true,
}: {
    children: ReactNode;
    elevation?: number;
    backgroundColor?: string;
    square?: boolean;
}) => {
    return (
        <Paper
            elevation={elevation}
            square={square}
            variant="outlined"
            sx={{
                p: 4,
                marginBottom: '20px',
                bgcolor: backgroundColor || undefined,
            }}
        >
            {children}
        </Paper>
    );
};

export default ConditionalSectionContainer;
