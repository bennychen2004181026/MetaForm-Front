import React, { useEffect } from 'react';

import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import styled from 'styled-components';

import DragDropBox from '@/components/DragDropBox';
import useUploadMultiFiles from '@/hooks/useUploadMultiFiles';
import { IUploadedFile } from '@/interfaces/CreateForm';
import { IFetchedQuestion } from '@/interfaces/CreateResponse';
import { getValidFileExtensions } from '@/pages/CreateFormPage/components/NewQuestion/createQuestions/CreateFileUploadQuestion/FileTypes';

export interface FilesUploadDialogProps {
    open: boolean;
    onClose: () => void;
    handleSelectedFiles: (value: IUploadedFile[]) => void;
    question: IFetchedQuestion;
    availableFileSpace: number;
}
const StyledDialogContent = styled.div`
    display: flex;
    flex-direction: column;
`;
const StyledDragBox = styled.div<{ isDragging: boolean; isFileValid: boolean }>`
    background-color: ${({ isDragging, isFileValid }) =>
        isDragging && isFileValid ? '#03a9f4' : 'white'};
`;
const FileUploadDialog = (props: FilesUploadDialogProps) => {
    const { onClose, open, handleSelectedFiles, question, availableFileSpace } = props;
    const { acceptFileTypes } = question;
    const validFileExtensions = getValidFileExtensions(acceptFileTypes || ['0', '1', '2', '3']);
    const results = useUploadMultiFiles({ question, availableSpace: availableFileSpace });
    const {
        isDragging,
        handleDragEnter,
        handleDrop,
        handleDragLeave,
        onFilesSelect,
        isFileValid,
        selectedFiles,
        setSelectedFiles,
        imgRef: filesRef,
    } = results;

    const selectFiles = () => filesRef.current && filesRef.current.click();
    const handleClose = () => {
        setSelectedFiles(null);
        onClose();
    };
    useEffect(() => {
        if (selectedFiles) {
            handleSelectedFiles(selectedFiles);
            setSelectedFiles(null);
        }
        onClose();
    }, [selectedFiles]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Uoload File</DialogTitle>
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
                        <StyledDialogContent>
                            {!isDragging && (
                                <>
                                    <Button variant="outlined" onClick={selectFiles}>
                                        Browse
                                        <input
                                            type="file"
                                            hidden
                                            ref={filesRef}
                                            accept={validFileExtensions.join()}
                                            onChange={onFilesSelect}
                                            multiple
                                        />
                                    </Button>
                                    <p>Or Drag a file here</p>
                                </>
                            )}
                        </StyledDialogContent>
                    </DragDropBox>
                </StyledDragBox>
            </DialogContent>
        </Dialog>
    );
};

export default FileUploadDialog;
