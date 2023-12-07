// Step2Content.tsx
import React, { useState } from 'react';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Button, CircularProgress, Typography } from '@mui/material';

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
    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            const s3 = new AWS.S3();
            const params = {
                Bucket: 'metaform-company-logo',
                Key: `companyLogos/${file.name}`,
                Body: file,
            };

            s3.upload(params, (err: Error, data: { Location: string }) => {
                if (err) {
                    showSnackbar(`Error uploading:${err}`, 'error');
                    return;
                }
                showSnackbar('You had successfully upload logo', 'success');
                showSnackbar(`${data.Location}`, 'success');
                onDataChange('companyLogo')(data.Location);
            });
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
            <Box
                sx={{
                    border: '2px dashed grey',
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
                {fieldsData.companyLogo ? (
                    <img
                        src={fieldsData.companyLogo}
                        alt="Uploaded Logo"
                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                    />
                ) : (
                    <Typography variant="body1">
                        (Optional) Drag and drop an image here, or click to select a file
                    </Typography>
                )}
            </Box>
            <Button variant="contained" component="label" startIcon={<CloudUploadIcon />}>
                Upload
                <input type="file" hidden onChange={handleFileChange} />
            </Button>
        </Box>
    );
};

export default StepContentTwo;
