import React, { useEffect, useState } from 'react';

import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Button, Stack } from '@mui/material';
import styled from 'styled-components';

import { IUploadedFile } from '@/interfaces/CreateForm';
import { IAnswer, IQuestionProps } from '@/interfaces/CreateResponse';
import { DEFAULT_MAXIMUM_FILE_NUMBERS } from '@/pages/CreateFormPage/components/NewQuestion/createQuestions/CreateFileUploadQuestion/FileTypes';
import FileItem from '@/pages/NewResponsePage/questions/FileUploadQuestion/components/FileItem';
import FileUploadDialog from '@/pages/NewResponsePage/questions/FileUploadQuestion/components/FileUoloadDialog';

const FileItemsBox = styled.div`
    display: flex;
    flex-direction: row;
    jusity-content: space-around;
    gap: 20px;
    flex-wrap: wrap;
`;
const UploadQuestionBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;
const StyledButton = styled(Button)`
    text-transform: none;
`;
const FileUploadQuestion = ({ questionResponse, onAnswerChange }: IQuestionProps) => {
    const { question } = questionResponse;
    const [open, setOpen] = React.useState(false);
    const [currentFiles, setCurrentFiles] = useState<IUploadedFile[]>([]);
    const { numOfFiles } = question;
    const {
        question: { _id },
    } = questionResponse;

    const [availableSpace, setAvailableSpace] = useState<number>(
        numOfFiles || DEFAULT_MAXIMUM_FILE_NUMBERS,
    );
    useEffect(() => {
        const answer: IAnswer = { questionId: _id, answerBody: currentFiles };
        onAnswerChange(answer);
    }, [currentFiles]);
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        if (numOfFiles) {
            setAvailableSpace(numOfFiles - currentFiles.length);
        } else {
            setAvailableSpace(5 - currentFiles.length);
        }
    }, [currentFiles]);
    const handleSelectedFiles = (files: IUploadedFile[]) => {
        const newFiles: IUploadedFile[] = [...currentFiles!, ...files];
        setCurrentFiles(newFiles);
    };
    const removeFile = (fileToRemove: IUploadedFile) => {
        const newFiles = [...currentFiles.filter((file) => file.name !== fileToRemove.name)];
        setCurrentFiles(newFiles);
    };
    const removeAllFiles = () => {
        setCurrentFiles([]);
    };
    return (
        <>
            <UploadQuestionBody>
                <FileItemsBox>
                    {currentFiles.length > 0 &&
                        currentFiles.map((file) => (
                            <FileItem key={file.name} file={file} removeFile={removeFile} />
                        ))}
                </FileItemsBox>
                <Stack direction="row" spacing={2}>
                    <StyledButton
                        variant="contained"
                        onClick={() => setOpen(true)}
                        startIcon={<UploadFileIcon />}
                    >
                        Add File
                    </StyledButton>
                    {currentFiles.length > 0 && (
                        <StyledButton variant="contained" onClick={() => removeAllFiles()}>
                            Remove All
                        </StyledButton>
                    )}
                </Stack>
            </UploadQuestionBody>
            <FileUploadDialog
                open={open}
                handleSelectedFiles={handleSelectedFiles}
                onClose={handleClose}
                question={question}
                availableFileSpace={availableSpace}
            />
        </>
    );
};

export default FileUploadQuestion;
