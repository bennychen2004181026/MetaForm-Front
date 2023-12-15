import React, { useState } from 'react';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button } from '@mui/material';
import styled from 'styled-components';

import DragDropBox from '@/components/DragDropBox/DragDropBox';
import UploadBoxContentRenderer from '@/components/UploadBoxContentRenderer';
import useUpload from '@/hooks/useUpload';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

const StyledStepperBoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    @media (min-width: 768px) {
        flex-direction: row;
    }
    width: 360px;
    height: 260px;
    @media (min-width: 600px) {
        width: 500px;
        height: 400px;
    }
    @media (min-width: 960px) {
        width: 600px;
        height: 500px;
    }
    justify-content: space-between;
    align-items: center;
    margin-top: 2px;
    gap: 2rem;
`;

interface StepContentTwoProps {
    fieldsData: Record<string, string>;
    onDataChange: (
        field: string,
    ) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string) => void;
}

const StepContentTwo: React.FC<StepContentTwoProps> = ({ fieldsData, onDataChange }) => {
    const showSnackbar = useSnackbarHelper();
    const [isLoading, setIsLoading] = useState(false);

    const uploadFileToS3 = (file: File) => {
        setIsLoading(true);
        showSnackbar(`Upload Request logic with ${file}`, 'info');
        setIsLoading(false);
    };
    const {
        isDragging,
        handleDragEnter,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleUploadButton,
        isValid,
    } = useUpload(uploadFileToS3);

    return (
        <StyledStepperBoxContainer>
            <DragDropBox
                isDragging={isDragging}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                isValid={isValid}
            >
                <UploadBoxContentRenderer
                    isLoading={isLoading}
                    companyLogo={fieldsData.companyLogo}
                />
            </DragDropBox>
            <Button variant="contained" component="label" startIcon={<CloudUploadIcon />}>
                Upload
                <input type="file" hidden onChange={handleUploadButton} />
            </Button>
        </StyledStepperBoxContainer>
    );
};

export default StepContentTwo;
