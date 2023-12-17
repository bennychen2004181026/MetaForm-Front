import React from 'react';

import { Box } from '@mui/material';

const QuestionContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                pr: 4,
                alignItems: 'center',
                borderRight: 1,
                justifyContent: 'space-between',
            }}
        >
            {children}
        </Box>
    );
};
export default QuestionContainer;
