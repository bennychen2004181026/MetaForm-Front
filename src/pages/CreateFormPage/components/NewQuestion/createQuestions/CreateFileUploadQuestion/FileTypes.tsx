import React from 'react';

import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';

import { IOption } from '@/interfaces/CreateForm';

enum FileTypes {
    IMAGE = 'Image',
    PDF = 'PDF',
    DOCUMENT = 'Document',
    PRESENTATION = 'Presentation',
}

const fileTypesObjs: IOption[] = [
    {
        id: '0',
        value: FileTypes.IMAGE,
        fileExtensions: ['image/png', 'image/jpeg', 'image/jpg'],
        icon: <ImageOutlinedIcon />,
    },
    {
        id: '1',
        value: FileTypes.PDF,
        fileExtensions: ['application/pdf'],
        icon: <PictureAsPdfOutlinedIcon />,
    },
    {
        id: '2',
        value: FileTypes.DOCUMENT,
        fileExtensions: ['application/msword', '.doc', '.docx', 'text/plain'],
        icon: <TextSnippetOutlinedIcon />,
    },
    {
        id: '3',
        value: FileTypes.PRESENTATION,
        fileExtensions: ['application/vnd.ms-powerpoint'],
        icon: <SlideshowOutlinedIcon />,
    },
];
const getSelectedFileTypes = (allowedFileTypes: string[]) => {
    const selectedFileTypes = fileTypesObjs.filter((fileType) => fileType.id in allowedFileTypes);
    return selectedFileTypes || fileTypesObjs;
};
const getValidFileExtensions = (allowedFileTypes: string[]) => {
    const selectedFileTypes =
        fileTypesObjs.filter((fileType) => fileType.id in allowedFileTypes) || fileTypesObjs;
    let validFileExtensions: string[] = [];

    for (let i = 0; i < selectedFileTypes.length; i += 1) {
        validFileExtensions = [...validFileExtensions, ...selectedFileTypes[i].fileExtensions!];
    }
    return validFileExtensions;
};
const DEFAULT_INPUT_TYPES = 'image/*,application/pdf,.doc,.docx,application/vnd.ms-powerpoint';
const DEFAULT_MAXIMUM_FILE_NUMBERS = 5;

export default FileTypes;
export {
    fileTypesObjs,
    DEFAULT_MAXIMUM_FILE_NUMBERS,
    DEFAULT_INPUT_TYPES,
    getSelectedFileTypes,
    getValidFileExtensions,
};
