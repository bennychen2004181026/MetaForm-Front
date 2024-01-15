import React, { useContext } from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import styled from 'styled-components';

import DragDropBox from '@/components/DragDropBox';
// import useUploadQuestionImage from '@/hooks/useUploadQuestionImage';
import useUploadMultiFiles from '@/hooks/useUploadMultiFiles';
import { IUploadedFile } from '@/interfaces/CreateForm';
import ImageContainer from '@/layouts/ImageContainer';
import { NewQuestionContext } from '@/pages/CreateFormPage/components/NewQuestion/context/NewQuestionContext';

export interface ImageInsertDialogProps {
    open: boolean;
    key: string;
    onClose: () => void;
    handleSelectedFiles: (value: IUploadedFile) => void;
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
    const { onClose, open, handleSelectedFiles } = props;
    const { state } = useContext(NewQuestionContext);
    const results = useUploadMultiFiles({ question: { ...state, _id: state.questionId } });
    const {
        isDragging,
        handleDragEnter,
        handleDrop,
        handleDragLeave,
        onFilesSelect,
        isFileValid,
        setSelectedFiles,
        imgRef,
    } = results;
    const { selectedFiles } = results;

    const selectFiles = () => imgRef.current && imgRef.current.click();
    const handleClose = () => {
        setSelectedFiles(null);
        onClose();
    };
    const handleInsert = () => {
        if (selectedFiles) {
            handleSelectedFiles(selectedFiles[0]);
            setSelectedFiles(null);
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
                        onDragOver={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        isFileValid={isFileValid}
                    >
                        {selectedFiles && <ImageContainer image={selectedFiles[0]} large={false} />}
                        <StyledDialogContent>
                            {!isDragging && (
                                <>
                                    <Button variant="outlined" onClick={selectFiles} fullWidth>
                                        Browse
                                        <input
                                            type="file"
                                            hidden
                                            ref={imgRef}
                                            accept="image/*"
                                            onChange={onFilesSelect}
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
