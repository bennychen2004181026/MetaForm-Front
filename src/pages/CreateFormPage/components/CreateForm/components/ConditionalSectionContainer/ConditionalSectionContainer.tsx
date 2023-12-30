import React, { ReactNode } from 'react';

import Paper from '@mui/material/Paper';

const ConditionalSectionContainer = ({
    children,
    backgroundColor,
}: {
    children: ReactNode;
    backgroundColor?: string;
}) => {
    return (
        <Paper
            elevation={4}
            sx={{
                p: 4,
                bgcolor: backgroundColor || undefined,
            }}
        >
            {children}
        </Paper>
    );
};

export default ConditionalSectionContainer;
