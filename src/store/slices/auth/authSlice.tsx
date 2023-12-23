import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
    email: null,
    role: null,
    company: null,
    userId: null,
    isAccountComplete: null,
    isActive: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.company = action.payload.company;
            state.userId = action.payload.userId;
            state.isAccountComplete = action.payload.isAccountComplete;
            state.isActive = action.payload.isActive;
        },
        clearCredentials: (state) => {
            state.user = null;
            state.token = null;
            state.email = null;
            state.role = null;
            state.company = null;
            state.userId = null;
            state.isAccountComplete = null;
            state.isActive = null;
        },
    },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
