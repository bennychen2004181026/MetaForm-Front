import { configureStore } from '@reduxjs/toolkit';

import snackbarSlice from '@/store/slices/snackbar/snackbarSlice';

export const store = configureStore({
    reducer: {
        snackbar: snackbarSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
