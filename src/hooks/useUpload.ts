import { useState } from 'react';

const useUpload = (onFileDropped: (file: File) => void) => {
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

    const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
        const file = event.dataTransfer.files[0];
        if (file) {
            onFileDropped(file);
        }
    };

    const handleUploadButton = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
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
    };
};

export default useUpload;
