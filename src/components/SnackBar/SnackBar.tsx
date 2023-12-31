import React, { useEffect } from 'react';

import { SnackbarKey, useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';

import CloseSnackbarButton from '@/components/CloseSnackbarButton';
import type { RootState } from '@/interfaces/redux';

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
                anchorOrigin: { vertical: 'top', horizontal: 'center' },
                disableWindowBlurListener: true,
                transitionDuration: 300,
                action: renderCloseButton,
                ...snackbar.options,
            });
        }
    }, [snackbar.message, snackbar.type, enqueueSnackbar]);

    return null;
};

export default Snackbar;
