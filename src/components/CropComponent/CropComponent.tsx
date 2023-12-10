import React from 'react';

import { Box } from '@mui/material';

interface DragDropBoxProps {
    isDragging: boolean;
    onDragEnter: (event: React.DragEvent<HTMLDivElement>) => void;
    onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
    onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
    onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
    children: React.ReactNode;
}

const DragDropBox: React.FC<DragDropBoxProps> = ({
    isDragging,
    onDragEnter,
    onDragOver,
    onDragLeave,
    onDrop,
    children,
}) => (
    <Box
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        sx={{
            border: isDragging ? '2px dashed blue' : '2px dashed grey',
            position: 'relative',
            width: { xs: '300px', sm: '400px', md: '500px' },
            height: { xs: '200px', sm: '300px', md: '400px' },
            marginRight: '20px',
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
        }}
    >
        {children}
    </Box>
);

export default DragDropBox;
