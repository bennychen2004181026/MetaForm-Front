import React from 'react';

import { OptionsObject, VariantType, useSnackbar } from 'notistack';

import CloseSnackbarButton from '@/components/CloseSnackbarButton';

const useSnackbarHelper = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const customSnackbar = (message: string, variant: VariantType) => {
        enqueueSnackbar(message, {
            variant,
            anchorOrigin: { vertical: 'top', horizontal: 'center' },
            disableWindowBlurListener: true,
            transitionDuration: 300,
            action: (key) => (
                <CloseSnackbarButton snackbarKey={key} closeSnackbar={closeSnackbar} />
            ),
        } as OptionsObject);
    };

    return customSnackbar;
};

export default useSnackbarHelper;
