import React from 'react';

import { Box } from '@mui/system';

const Title = ({ content }: { content: string }) => {
    return (
        <Box sx={{ mb: '4rem' }}>
            <h1>{content}</h1>
        </Box>
    );
};
export default Title;
