import { useCallback, useRef, useState } from 'react';

import { IImage } from '@/interfaces/CreateForm.interface';
import uploadFileValidators, {
    questionImageValidators,
    validateFile,
} from '@/utils/uploadFileValidators';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

const useUploadQuestionImage = ({ questionId }: { questionId: string }) => {
    const showSnackbar = useSnackbarHelper();
    const [isDragging, setIsDragging] = useState(false);
    const [selectedImage, setSelectedImage] = useState<IImage | null>(null);
    const imgRef = useRef<HTMLInputElement | null>(null);
    const [isFileValid, setIsFileValid] = useState(true);
    const getImageName = () => {
        const timestamp = new Date().getTime();
        const fileName = `question-${questionId}-${timestamp}.jpeg`;
        return fileName;
    };
    const handleFileSelection = useCallback(
        async (file: File) => {
            const validationResult = await validateFile(file, questionImageValidators);
            if (typeof validationResult === 'string') {
                setIsFileValid(false);
                showSnackbar(`Validation Error: ${validationResult}`, 'error');
                return;
            }
            setSelectedImage({ name: getImageName(), url: URL.createObjectURL(file) });
            setIsFileValid(true);
        },
        [questionImageValidators, showSnackbar],
    );

    const handleDragEnter = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsFileValid(uploadFileValidators.dragValidation(event.dataTransfer.items));
        setIsDragging(true);
    }, []);

    const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsFileValid(uploadFileValidators.dragValidation(event.dataTransfer.items));
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
        setIsFileValid(true);
    }, []);

    const handleDrop = useCallback(
        async (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();
            setIsDragging(false);
            const file = event.dataTransfer.files[0];
            if (file) {
                await handleFileSelection(file);
            }
        },
        [handleDragEnter, handleDragOver, handleDragLeave, handleFileSelection],
    );

    const onFileSelect = useCallback(
        async (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files ? event.target.files[0] : null;
            if (file) {
                await handleFileSelection(file);
            }
        },
        [handleFileSelection],
    );

    return {
        handleFileSelection,
        isDragging,
        handleDragEnter,
        handleDragOver,
        handleDrop,
        handleDragLeave,
        onFileSelect,
        selectedImage,
        setSelectedImage,
        imgRef,
        isFileValid,
    };
};

export default useUploadQuestionImage;
