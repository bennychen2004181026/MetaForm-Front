import { useEffect } from 'react';

import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';

import { RootState } from '@/store/store';

const Snackbar = () => {
    const { enqueueSnackbar } = useSnackbar();
    const snackbar = useSelector((state: RootState) => state.snackbar);

    useEffect(() => {
        if (snackbar.message) {
            enqueueSnackbar(snackbar.message, {
                variant: snackbar.type,
                anchorOrigin: { vertical: 'top', horizontal: 'left' },
                disableWindowBlurListener: true,
            });
        }
    }, [snackbar.message, snackbar.type, enqueueSnackbar]);

    return null;
};

export default Snackbar;
