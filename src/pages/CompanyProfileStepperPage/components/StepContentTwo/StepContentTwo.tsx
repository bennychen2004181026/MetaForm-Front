// Step2Content.tsx
import React, { useState } from 'react';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
    Box,
    Button,
    CircularProgress,
    LinearProgress,
    Typography,
    circularProgressClasses,
    linearProgressClasses,
    useTheme,
} from '@mui/material';

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
    const theme = useTheme();
    const [isDragging, setIsDragging] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

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

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
        const file = event.dataTransfer.files[0];
        if (file) {
            uploadFileToS3(file);
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            uploadFileToS3(file);
        }
    };

    const renderLoading = () => (
        <>
            <Box sx={{ position: 'relative' }}>
                <CircularProgress
                    variant="determinate"
                    sx={{
                        color: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                    }}
                    size={40}
                    thickness={4}
                    value={uploadProgress}
                />
                <CircularProgress
                    variant="indeterminate"
                    disableShrink
                    sx={{
                        color: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
                        animationDuration: '550ms',
                        position: 'absolute',
                        left: 0,
                        [`& .${circularProgressClasses.circle}`]: {
                            strokeLinecap: 'round',
                        },
                    }}
                    size={40}
                    thickness={4}
                />
            </Box>
            <Typography variant="body1">{uploadProgress.toFixed(2)}%</Typography>
            <LinearProgress
                variant="determinate"
                value={uploadProgress}
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 10,
                    borderRadius: 5,
                    [`&.${linearProgressClasses.colorPrimary}`]: {
                        backgroundColor:
                            theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                    },
                    [`& .${linearProgressClasses.bar}`]: {
                        borderRadius: 5,
                        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
                        backgroundImage:
                            'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.15) 10px, rgba(0,0,0,0.15) 20px)',
                        transition: 'width 0.4s ease',
                    },
                }}
            />
        </>
    );

    const renderImagePreview = () => (
        <img
            src={fieldsData.companyLogo}
            alt="Uploaded Logo"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
        />
    );

    const renderDefaultMessage = () => (
        <Typography variant="body1">
            (Optional) Drag and drop an image here, or click to select a file
        </Typography>
    );

    const renderContent = () => {
        if (isLoading) return renderLoading();
        if (fieldsData.companyLogo) return renderImagePreview();
        return renderDefaultMessage();
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
            <Box
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
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
                {renderContent()}
            </Box>
            <Button variant="contained" component="label" startIcon={<CloudUploadIcon />}>
                Upload
                <input type="file" hidden onChange={handleFileChange} />
            </Button>
        </Box>
    );
};

export default StepContentTwo;
