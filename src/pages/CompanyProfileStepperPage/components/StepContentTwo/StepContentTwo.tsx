import React, { useRef } from 'react';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CropFreeIcon from '@mui/icons-material/CropFree';
import { Box, Button } from '@mui/material';
import { PixelCrop } from 'react-image-crop';

import CropComponent from '@/components/CropComponent';
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
    handleDrop: (event: React.DragEvent<HTMLDivElement>) => Promise<void>;
    handleUploadButton: (event: React.ChangeEvent<HTMLInputElement>) => void;
    selectedImage: string | null;
    setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
    setCroppedImageBlob: React.Dispatch<React.SetStateAction<Blob | null>>;
    croppedImageBlob: Blob | null;
    handleCropConfirmation: (croppedBlob: Blob) => void;
    handleCroppedImage: () => Promise<void>;
    isCropping: boolean;
    previewCanvasRef: React.RefObject<HTMLCanvasElement>;
    imgRef: React.RefObject<HTMLImageElement>;
    canvasPreview: (crop: PixelCrop) => void;
    croppedPreviewUrl: string | null;
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
    selectedImage,
    setSelectedImage,
    setCroppedImageBlob,
    croppedImageBlob,
    handleCropConfirmation,
    handleCroppedImage,
    isCropping,
    previewCanvasRef,
    imgRef,
    canvasPreview,
    croppedPreviewUrl,
}) => {
    let cropComponent = null;
    if (selectedImage && isCropping) {
        cropComponent = (
            <CropComponent
                key={selectedImage || new Date().getTime()}
                src={selectedImage}
                imgRef={imgRef}
                previewCanvasRef={previewCanvasRef}
                onCrop={canvasPreview}
                onImageCropped={handleCropConfirmation}
            />
        );
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: { xs: 'column', sm: 'column', md: 'row' },
                alignItems: 'center',
                gap: 0.1,
            }}
        >
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
                    companyLogo={fieldsData.companyLogo || croppedPreviewUrl}
                    cropComponent={cropComponent}
                />
            </DragDropBox>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'center',
                    justifyContent: 'space-around',
                    flexWrap: 'wrap',
                    height: '20vh',
                }}
            >
                <Button variant="contained" component="label" startIcon={<CropFreeIcon />}>
                    Upload and Crop
                    <input type="file" hidden onChange={handleUploadButton} />
                </Button>

                {croppedImageBlob && (
                    <Button
                        variant="contained"
                        onClick={handleCroppedImage}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload to S3
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default StepContentTwo;
