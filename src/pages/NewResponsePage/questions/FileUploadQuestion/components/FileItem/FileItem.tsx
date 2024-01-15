import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Link, Paper } from '@mui/material';
import styled from 'styled-components';

import { IUploadedFile } from '@/interfaces/CreateForm';

const CurrentFileItem = styled(Paper)`
    background-color: #fff;
    text-align: center;
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
`;
const FileItem = ({
    file,
    removeFile,
}: {
    file: IUploadedFile;
    removeFile?: (fileToRemove: IUploadedFile) => void;
}) => {
    const { fileType, originalName, remoteUrl } = file;
    return (
        <CurrentFileItem>
            <div>{fileType}</div>
            <Link underline="hover" href={remoteUrl} target="_blank" rel="noopener">
                {originalName.slice(0, 20)}
            </Link>
            {removeFile && (
                <IconButton onClick={() => removeFile(file)}>
                    <CloseIcon />
                </IconButton>
            )}
        </CurrentFileItem>
    );
};

export default FileItem;
