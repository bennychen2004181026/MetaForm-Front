import React, { CSSProperties, ReactNode } from 'react';

import Paper from '@mui/material/Paper';

const ConditionalSectionContainer = ({
    children,
    elevation = 4,
    backgroundColor,
    square = true,
    style,
}: {
    children: ReactNode;
    elevation?: number;
    backgroundColor?: string;
    square?: boolean;
    style?: CSSProperties;
}) => {
    return (
        <Paper
            elevation={elevation}
            square={square}
            sx={{
                p: 4,
                position: 'relative',
                marginBottom: '20px',
                marginTop: '30px',
                width: '1200px',
                bgcolor: backgroundColor || undefined,
                ...style,
            }}
        >
            {children}
        </Paper>
    );
};

export default ConditionalSectionContainer;
