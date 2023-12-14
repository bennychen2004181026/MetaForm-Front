import React from 'react';

import { Box } from '@mui/material';
import styled from 'styled-components';

interface StyledDragDropBoxProps {
    isDragging: boolean;
}

const StyledDragDropBox = styled(Box)<StyledDragDropBoxProps>`
    border: ${(props) => (props.isDragging ? '2px dashed blue' : '2px dashed grey')};
    width: 300px;
    height: 200px;
    @media (min-width: 600px) {
        width: 400px;
        height: 300px;
    }
    @media (min-width: 960px) {
        width: 500px;
        height: 400px;
    }
    margin-right: 20px;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;
    flex-wrap: wrap;
`;
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
    <StyledDragDropBox
        isDragging={isDragging}
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
    >
        {children}
    </StyledDragDropBox>
);

export default DragDropBox;
