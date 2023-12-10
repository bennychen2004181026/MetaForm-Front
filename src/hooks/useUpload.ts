import { useState } from 'react';

import uploadFileToS3 from '@/utils/uploadFileToS3';
import uploadFileValidators from '@/utils/uploadFileValidators';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

interface UseUploadProps {
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    setUploadProgress: React.Dispatch<React.SetStateAction<number>>;
    onDataChange: (
        field: string,
    ) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string) => void;
}

const useUpload = ({ setIsLoading, setUploadProgress, onDataChange }: UseUploadProps) => {
    const showSnackbar = useSnackbarHelper();
    const [isDragging, setIsDragging] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [croppedImageBlob, setCroppedImageBlob] = useState<Blob | null>(null);

    const logoValidators = [
        uploadFileValidators.logoSizeValidator(128 * 1024),
        uploadFileValidators.logoTypeValidator([
            'image/jpeg',
            'image/png',
            'image/webp',
            'image/svg+xml',
            'image/bmp',
            'image/x-icon',
            'image/vnd.microsoft.icon',
        ]),
        uploadFileValidators.logoDimensionValidator(100, 100),
    ];

    const handleFileSelection = async (file: File) => {
        const validationResult = await uploadFileValidators.validateFile(file, logoValidators);
        if (typeof validationResult === 'string') {
            showSnackbar(`Validation Error: ${validationResult}`, 'error');
        } else {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    const handleCropConfirmation = (croppedBlob: Blob) => {
        setCroppedImageBlob(croppedBlob);
    };

    const handleCroppedImage = async () => {
        if (!croppedImageBlob) {
            showSnackbar('No cropped image to upload', 'error');
            return;
        }
        const timestamp = new Date().getTime();
        const fileName = `companyLogo${timestamp}.png`;
        uploadFileToS3({
            file: new File([croppedImageBlob], fileName, { type: 'image/jpeg' }),
            setIsLoading,
            setUploadProgress,
            onDataChange,
            showSnackbar,
        });
    };

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

    const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
        const file = event.dataTransfer.files[0];
        if (file) {
            await handleFileSelection(file);
        }
    };

    const handleUploadButton = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            await handleFileSelection(file);
        }
    };

    return {
        isDragging,
        handleDragEnter,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleUploadButton,
        selectedImage,
        setSelectedImage,
        croppedImageBlob,
        setCroppedImageBlob,
        handleCropConfirmation,
        handleCroppedImage,
    };
};

export default useUpload;
