import { useState } from 'react';

import uploadFileValidators from '@/utils/uploadFileValidators';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

const useUpload = (onFileDropped: (file: File) => void) => {
    const showSnackbar = useSnackbarHelper();
    const [isDragging, setIsDragging] = useState(false);

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
            const validationResult = await uploadFileValidators.validateFile(file, logoValidators);
            if (typeof validationResult === 'string') {
                showSnackbar(`Validation Error: ${validationResult}`, 'error');
            } else {
                onFileDropped(file);
            }
        }
    };

    const handleUploadButton = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            const validationResult = await uploadFileValidators.validateFile(file, logoValidators);
            if (typeof validationResult === 'string') {
                showSnackbar(`Validation Error: ${validationResult}`, 'error');
            } else {
                onFileDropped(file);
            }
        }
    };
    return {
        isDragging,
        handleDragEnter,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleUploadButton,
    };
};

export default useUpload;
