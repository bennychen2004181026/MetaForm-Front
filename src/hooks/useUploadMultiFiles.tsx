import React, { useCallback, useRef, useState } from 'react';

import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';

import { IFileToUpload, IQuestion } from '@/interfaces/CreateForm';
import { getSelectedFileTypes } from '@/pages/CreateFormPage/components/NewQuestion/createQuestions/CreateFileUploadQuestion/FileTypes';
import validateFiles, { dragValidation } from '@/utils/uploadMultipleFilesValidators';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

const useUploadMultiFiles = ({
    question,
    availableSpace = 1,
}: {
    question: IQuestion;
    availableSpace?: number;
}) => {
    const showSnackbar = useSnackbarHelper();
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<IFileToUpload[] | null>(null);
    const imgRef = useRef<HTMLInputElement | null>(null);
    const [isFileValid, setIsFileValid] = useState(true);
    const { acceptFileTypes, questionId } = question;

    const selectedFileTypes = getSelectedFileTypes(acceptFileTypes!);

    const validFileExtensions: string[] = selectedFileTypes.reduce(
        (accu, curr) => [...accu, ...curr.fileExtensions!],
        [''],
    );
    const getFileName = (fileOrigialName: string) => {
        const timestamp = new Date().getTime();
        const fileName = `question-${questionId}-${timestamp}-${fileOrigialName}`;
        return fileName;
    };
    const getFileType = (file: File) => {
        const fileType = selectedFileTypes.find((type) => type.fileExtensions!.includes(file.type));
        if (fileType) {
            return fileType.icon;
        }
        return null;
    };
    const handleFilesSelection = useCallback(
        async (files: File[]) => {
            const errMsg = validateFiles({
                acceptFileTypes: validFileExtensions,
                files,
                availableSpace,
            });
            if (errMsg.length !== 0) {
                setIsFileValid(false);
                errMsg.map((err) => {
                    showSnackbar(err, 'error');
                    return null;
                });
                return;
            }
            const addedFiles = files.map((file) => {
                return {
                    name: getFileName(file.name),
                    originalName: file.name,
                    url: URL.createObjectURL(file),
                    fileType: getFileType(file) || <FindInPageOutlinedIcon />,
                };
            });
            setSelectedFiles(addedFiles);
            setIsFileValid(true);
        },
        [showSnackbar],
    );

    const handleDragEnter = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsFileValid(
            dragValidation({
                items: event.dataTransfer.items,
                acceptFileTypes: validFileExtensions,
            }),
        );
        setIsDragging(true);
    }, []);

    const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsFileValid(
            dragValidation({
                items: event.dataTransfer.items,
                acceptFileTypes: validFileExtensions,
            }),
        );
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
            const filesList = event.dataTransfer.files;
            const files = Array.prototype.slice.call(filesList);
            if (files) {
                await handleFilesSelection(files);
            }
        },
        [handleDragEnter, handleDragOver, handleDragLeave, handleFilesSelection],
    );

    const onFilesSelect = useCallback(
        async (event: React.ChangeEvent<HTMLInputElement>) => {
            const filesList = event.target.files ? event.target.files : null;
            const files = Array.prototype.slice.call(filesList);
            if (files) {
                await handleFilesSelection(files);
            }
        },
        [handleFilesSelection],
    );

    return {
        handleFilesSelection,
        isDragging,
        handleDragEnter,
        handleDragOver,
        handleDrop,
        onFilesSelect,
        handleDragLeave,
        selectedFiles,
        setSelectedFiles,
        imgRef,
        isFileValid,
    };
};

export default useUploadMultiFiles;
