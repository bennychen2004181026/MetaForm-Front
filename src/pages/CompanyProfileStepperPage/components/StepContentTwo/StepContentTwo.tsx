import React from 'react';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CropFreeIcon from '@mui/icons-material/CropFree';
import { Box } from '@mui/material';
import { PixelCrop } from 'react-image-crop';
import styled from 'styled-components';

import CropComponent from '@/components/CropComponent';
import DragDropBox from '@/components/DragDropBox/DragDropBox';
import StartIconButton from '@/components/StartIconButton';
import UploadBoxContentRenderer from '@/components/UploadBoxContentRenderer';

const StyledStepperBoxContainer = styled(Box)`
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
    margin-top: 1px;
    gap: 1rem;
`;

const IconButtonBox = styled(Box)`
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: space-around;
    flex-wrap: wrap;
    height: 20vh;
`;
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
    isFileValid: boolean;
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
    isFileValid,
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
        <StyledStepperBoxContainer>
            <DragDropBox
                isDragging={isDragging}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                isFileValid={isFileValid}
            >
                <UploadBoxContentRenderer
                    isLoading={isLoading}
                    uploadProgress={uploadProgress}
                    companyLogo={fieldsData.companyLogo || croppedPreviewUrl}
                    cropComponent={cropComponent}
                />
            </DragDropBox>
            <IconButtonBox>
                <StartIconButton text="Crop" startIcon={<CropFreeIcon />} variant="contained">
                    <input type="file" hidden onChange={handleUploadButton} />
                </StartIconButton>

                {croppedImageBlob && (
                    <StartIconButton
                        text="Upload"
                        onClick={handleCroppedImage}
                        startIcon={<CloudUploadIcon />}
                        variant="contained"
                    />
                )}
            </IconButtonBox>
        </StyledStepperBoxContainer>
    );
};

export default StepContentTwo;
