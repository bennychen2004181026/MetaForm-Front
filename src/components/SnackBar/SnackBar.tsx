import React, { useEffect } from 'react';

import { SnackbarKey, useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';

import CloseSnackbarButton from '@/components/CloseSnackbarButton';
import { RootState } from '@/store/store';

const Snackbar = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const snackbar = useSelector((state: RootState) => state.snackbar);

    useEffect(() => {
        if (snackbar.message) {
            const renderCloseButton = (key: SnackbarKey) => (
                <CloseSnackbarButton snackbarKey={key} closeSnackbar={closeSnackbar} />
            );
            enqueueSnackbar(snackbar.message, {
                variant: snackbar.type,
                anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
                disableWindowBlurListener: true,
                transitionDuration: 300,
                action: renderCloseButton,
            });
        }
    }, [snackbar.message, snackbar.type, enqueueSnackbar]);

    return null;
};

export default Snackbar;
