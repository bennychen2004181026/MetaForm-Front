import React, { useContext } from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import styled from 'styled-components';

import DragDropBox from '@/components/DragDropBox';
import useUploadQuestionImage from '@/hooks/useUploadQuestionImage';
import { IImage } from '@/interfaces/IQuestion';
import { NewQuestionContext } from '@/pages/CreateFormPage/components/NewQuestion/components/context/NewQuestionContext';
import ImageContainer from '@/pages/CreateFormPage/components/NewQuestion/components/ImageContainer';

export interface ImageInsertDialogProps {
    open: boolean;
    key: string;
    onClose: () => void;
    insertImage: (value: IImage) => void;
}
const StyledDialogContent = styled.div`
    display: flex;
    flex-direction: column;
`;
const StyledDragBox = styled.div<{ isDragging: boolean; isFileValid: boolean }>`
    background-color: ${({ isDragging, isFileValid }) =>
        isDragging && isFileValid ? '#03a9f4' : 'white'};
`;
const ImageUploadDialog = (props: ImageInsertDialogProps) => {
    const { onClose, open, insertImage } = props;
    const { state } = useContext(NewQuestionContext);
    const { questionId } = state;
    const results = useUploadQuestionImage({ questionId });
    const {
        isDragging,
        handleDragEnter,
        handleDragOver,
        handleDrop,
        handleDragLeave,
        onFileSelect,
        isFileValid,
        setSelectedImage,
        imgRef,
    } = results;
    const { selectedImage } = results;

    const selectFiles = () => imgRef.current && imgRef.current.click();
    const handleClose = () => {
        setSelectedImage(null);
        onClose();
    };
    const handleInsert = () => {
        if (selectedImage) {
            insertImage(selectedImage);
            setSelectedImage(null);
        }
        onClose();
    };
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Insert Image</DialogTitle>
            <DialogContent>
                <StyledDragBox isDragging={isDragging} isFileValid={isFileValid}>
                    <DragDropBox
                        isDragging={isDragging}
                        onDragEnter={handleDragEnter}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        isFileValid={isFileValid}
                    >
                        <StyledDialogContent>
                            {selectedImage && (
                                <ImageContainer image={selectedImage} large={false} />
                            )}
                            {!isDragging && (
                                <>
                                    <Button variant="outlined" onClick={selectFiles}>
                                        Browse
                                        <input
                                            type="file"
                                            hidden
                                            ref={imgRef}
                                            accept="image/*"
                                            onChange={onFileSelect}
                                        />
                                    </Button>
                                    <p>Or Drag a file here</p>
                                </>
                            )}
                        </StyledDialogContent>
                    </DragDropBox>
                </StyledDragBox>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleInsert}>
                    Insert
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ImageUploadDialog;
