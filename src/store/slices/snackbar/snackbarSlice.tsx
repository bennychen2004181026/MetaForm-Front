import { createSlice } from '@reduxjs/toolkit';

type SnackbarVariant = 'info' | 'default' | 'error' | 'success' | 'warning';

const initialState = {
    message: '',
    // 'success', 'error', 'warning', 'info'
    type: 'info' as SnackbarVariant,
};

export const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        showSnackbar: (state, action) => {
            state.message = action.payload.message;
            state.type = action.payload.type || 'info';
        },
    },
});

export const { showSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
