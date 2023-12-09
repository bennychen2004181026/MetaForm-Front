import React, { useState } from 'react';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Button } from '@mui/material';

import DragDropBox from '@/components/DragDropBox/DragDropBox';
import UploadBoxContentRenderer from '@/components/UploadBoxContentRenderer';
import useUpload from '@/hooks/useUpload';
import AWS from '@/utils/awsConfig';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

interface StepContentTwoProps {
    fieldsData: Record<string, string>;
    onDataChange: (
        field: string,
    ) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string) => void;
}

const StepContentTwo: React.FC<StepContentTwoProps> = ({ fieldsData, onDataChange }) => {
    const showSnackbar = useSnackbarHelper();
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const uploadFileToS3 = (file: File) => {
        setIsLoading(true);
        const s3 = new AWS.S3();
        const params = {
            Bucket: 'metaform-company-logo',
            Key: `companyLogos/${file.name}`,
            Body: file,
        };

        s3.upload(params)
            .on('httpUploadProgress', (progress: { loaded: number; total: number }) => {
                setUploadProgress(Math.round((progress.loaded / progress.total) * 100));
            })
            .send((err: Error, data: { Location: string }) => {
                setIsLoading(false);
                if (err) {
                    showSnackbar(`Error uploading: ${err}`, 'error');
                    return;
                }
                onDataChange('companyLogo')(data.Location);
                showSnackbar('You had successfully uploaded the logo', 'success');
            });
    };
    const {
        isDragging,
        handleDragEnter,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleUploadButton,
    } = useUpload(uploadFileToS3);

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
