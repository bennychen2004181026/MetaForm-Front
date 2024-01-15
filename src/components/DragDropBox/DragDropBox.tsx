import React from 'react';

import Box from '@mui/material/Box';
import styled from 'styled-components';

const getBorderColor = (isDragging: boolean, isFileValid: boolean) => {
    if (!isFileValid) return '2px dashed red';
    if (isDragging) return '2px dashed blue';
    return '2px dashed grey';
};

const StyledBox = styled(Box)`
    position: relative;
    width: 40vw;
    height: 40vh;
    max-width: 400px;
    max-height: 500px;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;
    flex-wrap: wrap;
    @media (max-width: 768px) {
        width: 80vw;
    }
`;

interface DragDropBoxProps {
    isDragging: boolean;
    isFileValid: boolean;
    onDragEnter: (event: React.DragEvent<HTMLDivElement>) => void;
    onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
    onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
    onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
    children: React.ReactNode;
}

const DragDropBox: React.FC<DragDropBoxProps> = ({
    isDragging,
    isFileValid,
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
            border: getBorderColor(isDragging, isFileValid),
        }}
    >
        <StyledBox>{children}</StyledBox>
    </Box>
);

export default DragDropBox;
