import React, { useCallback, useRef, useState } from 'react';

import FindInPageOutlinedIcon from '@mui/icons-material/FindInPageOutlined';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { IUploadedFile } from '@/interfaces/CreateForm';
import { IFetchedQuestion } from '@/interfaces/CreateResponse';
import { getSelectedFileTypes } from '@/pages/CreateFormPage/components/NewQuestion/createQuestions/CreateFileUploadQuestion/FileTypes';
import { authToken } from '@/store/slices/auth/authSlice';
import { PRESIGNED_CLOUR_FRONT_URL, PRESIGNED_URL } from '@/utils/API';
import validateFiles, { dragValidation } from '@/utils/uploadMultipleFilesValidators';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

const useUploadMultiFiles = ({
    question,
    availableSpace = 1,
}: {
    question: IFetchedQuestion;
    availableSpace?: number;
}) => {
    const token = useSelector(authToken);

    const showSnackbar = useSnackbarHelper();
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<IUploadedFile[] | null>(null);
    const imgRef = useRef<HTMLInputElement | null>(null);
    const [isFileValid, setIsFileValid] = useState(true);
    const { acceptFileTypes, _id } = question;

    const selectedFileTypes = getSelectedFileTypes(acceptFileTypes!);

    const validFileExtensions: string[] = selectedFileTypes.reduce(
        (accu, curr) => [...accu, ...curr.fileExtensions!],
        [''],
    );
    const getFileName = (fileOrigialName: string) => {
        const timestamp = new Date().getTime();
        const fileName = `question-${_id}-${timestamp}-${fileOrigialName}`;
        return fileName;
    };
    const getFileType = (file: File) => {
        const fileType = selectedFileTypes.find((type) => type.fileExtensions!.includes(file.type));
        if (fileType) {
            return fileType.icon;
        }
        return null;
    };
    const uploadFile = async (file: File) => {
        const uploadResponse = await axios.get(PRESIGNED_URL, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const { url, key } = uploadResponse.data;

        const a = {
            headers: {
                'Content-Type': file.type,
            },
        };
        await axios.put(url, file, a);
        const downloadResponse = await axios.get(PRESIGNED_CLOUR_FRONT_URL, {
            params: { key },
        });
        const { cloudFrontSignedUrl: downloadUrl } = downloadResponse.data;
        return downloadUrl;
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
            setIsFileValid(true);

            files.map((file) => {
                try {
                    uploadFile(file).then((url) => {
                        const uploadedFile: IUploadedFile = {
                            name: getFileName(file.name),
                            originalName: file.name,
                            url: URL.createObjectURL(file),
                            fileType: getFileType(file) || <FindInPageOutlinedIcon />,
                            remoteUrl: url,
                        };
                        if (selectedFiles !== null) {
                            setSelectedFiles([...selectedFiles, uploadedFile]);
                        } else {
                            setSelectedFiles([uploadedFile]);
                        }
                    });
                } catch (err) {
                    showSnackbar('Upload failed, try again later', 'error');
                }
                return null;
            });
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
                try {
                    await handleFilesSelection(files).then(async () => {
                        const fileUrls = await Promise.all(files.map((file) => uploadFile(file)));
                        return fileUrls;
                    });
                } catch (err) {
                    showSnackbar('Upload failed, try again later', 'error');
                }
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
