import { useState } from 'react';

import uploadFileValidators from '@/utils/uploadFileValidators';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

const useUpload = (onFileDropped: (file: File) => void) => {
    const showSnackbar = useSnackbarHelper();
    const [isDragging, setIsDragging] = useState(false);
    const [isValid, setIsValid] = useState(true);

    const validateFile = async (file: File) => {
        const validationResult = await uploadFileValidators.validateFile(
            file,
            uploadFileValidators.logoValidators,
        );
        if (typeof validationResult === 'string') {
            setIsValid(false);
            showSnackbar(`Validation Error: ${validationResult}`, 'error');
            return false;
        }
        setIsValid(true);
        return true;
    };

    const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsValid(uploadFileValidators.dragValidation(event.dataTransfer.items));
        setIsDragging(true);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsValid(uploadFileValidators.dragValidation(event.dataTransfer.items));
        setIsDragging(true);
    };

    const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsValid(true);
        setIsDragging(false);
    };

    const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
        const file = event.dataTransfer.files[0];
        if (file && (await validateFile(file))) {
            onFileDropped(file);
        }
    };

    const handleUploadButton = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file && (await validateFile(file))) {
            onFileDropped(file);
        }
    };

    return {
        isDragging,
        handleDragEnter,
        handleDragOver,
        handleDragLeave,
        handleDrop,
        handleUploadButton,
        isValid,
    };
};

export default useUpload;
