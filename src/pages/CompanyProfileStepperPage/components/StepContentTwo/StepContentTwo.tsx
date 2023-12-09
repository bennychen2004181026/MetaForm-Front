import React from 'react';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Button } from '@mui/material';

import DragDropBox from '@/components/DragDropBox/DragDropBox';
import UploadBoxContentRenderer from '@/components/UploadBoxContentRenderer';

interface StepContentTwoProps {
    fieldsData: Record<string, string>;
    isDragging: boolean;
    isLoading: boolean;
    uploadProgress: number;
    handleDragEnter: (event: React.DragEvent<HTMLDivElement>) => void;
    handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
    handleDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
    handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
    handleUploadButton: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StepContentTwo: React.FC<StepContentTwoProps> = ({
    fieldsData,
    isDragging,
    isLoading,
    uploadProgress,
    handleDragEnter,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleUploadButton,
}) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
            <DragDropBox
                isDragging={isDragging}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <UploadBoxContentRenderer
                    isLoading={isLoading}
                    uploadProgress={uploadProgress}
                    companyLogo={fieldsData.companyLogo}
                />
            </DragDropBox>
            <Button variant="contained" component="label" startIcon={<CloudUploadIcon />}>
                Upload
                <input type="file" hidden onChange={handleUploadButton} />
            </Button>
        </Box>
    );
};

export default StepContentTwo;
