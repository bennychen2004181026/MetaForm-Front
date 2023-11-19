import { createSlice } from '@reduxjs/toolkit';

type SnackbarVariant = 'info' | 'default' | 'error' | 'success' | 'warning';

const initialState = {
    message: '',
    // 'success', 'error', 'warning', 'info','default'
    type: 'default' as SnackbarVariant,
};

export const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        showSnackbar: (state, action) => {
            state.message = action.payload.message;
            state.type = action.payload.type || 'default';
        },
    },
});

export const { showSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
