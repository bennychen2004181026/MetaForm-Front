import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    message: '',
    type: 'info',
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
