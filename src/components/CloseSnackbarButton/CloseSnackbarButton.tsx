import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { SnackbarKey } from 'notistack';

interface CloseSnackbarButtonProps {
    snackbarKey: SnackbarKey;
    closeSnackbar: (key: SnackbarKey) => void;
}

const CloseSnackbarButton: React.FC<CloseSnackbarButtonProps> = ({
    snackbarKey,
    closeSnackbar,
}) => (
    <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => closeSnackbar(snackbarKey)}
    >
        <CloseIcon fontSize="small" />
    </IconButton>
);

export default CloseSnackbarButton;
