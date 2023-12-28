import React, { useRef, useState } from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import styled from 'styled-components';

import DragDropBox from '@/components/DragDropBox';
import useForm, { IField } from '@/hooks/useForm';
import useUploadQuestionImage from '@/hooks/useUploadQuestionImage';

export interface ImageInsertDialogProps {
    open: boolean;
    onClose: () => void;
}
const ImageUploadDialog = (props: ImageInsertDialogProps) => {
    const { onClose, open } = props;

    const [uploadProgress, setUploadProgress] = useState(0);
    const [image, setImage] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const selectFiles = () => fileInputRef.current && fileInputRef.current.click();
    const {
        isDragging,
        handleDragEnter,
        handleDragOver,
        handleDrop,
        handleDragLeave,
        isFileValid,
    } = useUploadQuestionImage();
    const handleClose = () => {
        onClose();
    };
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Insert Image</DialogTitle>
            <DialogContent>
                <DragDropBox
                    isDragging={isDragging}
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    isFileValid={isFileValid}
                >
                    <Button>
                        Browse
                        <input type="file" hidden />
                    </Button>
                    <br />
                    <div>
                        <p>Or Drag a file here</p>
                    </div>
                </DragDropBox>
            </DialogContent>
            <DialogActions>
                <Button>Subscribe</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ImageUploadDialog;
