import React, { useEffect, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Button, ButtonGroup, IconButton, Link, Paper } from '@mui/material';
import styled from 'styled-components';

import { IFileToUpload, IQuestion } from '@/interfaces/CreateForm';
import { DEFAULT_MAXIMUM_FILE_NUMBERS } from '@/pages/CreateFormPage/components/NewQuestion/createQuestions/CreateFileUploadQuestion/FileTypes';
import FileUploadDialog from '@/pages/NewResponsePage/questions/FileUploadQuestion/components/FileUoloadDialog';

const CurrentFileItem = styled(Paper)`
    background-color: #fff;
    text-align: center;
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`;
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
const FileUploadQuestion = ({ question }: { question: IQuestion }) => {
    const [open, setOpen] = React.useState(false);

    const [currentFiles, setCurrentFiles] = useState<IFileToUpload[]>([]);
    const { numOfFiles } = question;
    const [availableSpace, setAvailableSpace] = useState<number>(
        numOfFiles || DEFAULT_MAXIMUM_FILE_NUMBERS,
    );

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
    const handleSelectedFiles = (files: IFileToUpload[]) => {
        const newFiles: IFileToUpload[] = [...currentFiles!, ...files];
        setCurrentFiles(newFiles);
    };
    const removeFile = (fileToRemove: IFileToUpload) => {
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
                            <CurrentFileItem key={file.originalName}>
                                <div>{file.fileType}</div>
                                <Link underline="hover" href="www.google.com">
                                    {file.originalName.slice(0, 20)}
                                </Link>

                                <IconButton onClick={() => removeFile(file)}>
                                    <CloseIcon />
                                </IconButton>
                            </CurrentFileItem>
                        ))}
                </FileItemsBox>
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                    <Button onClick={() => setOpen(true)} startIcon={<UploadFileIcon />}>
                        Add File
                    </Button>
                    {currentFiles.length > 0 && (
                        <Button onClick={() => removeAllFiles()}>Remove All</Button>
                    )}
                </ButtonGroup>
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
