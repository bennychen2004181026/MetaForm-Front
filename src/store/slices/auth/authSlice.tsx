import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { RootState } from '@/interfaces/redux';
import { IUser, Role } from '@/interfaces/User.interface';

interface AuthState {
    user: IUser | null;
    token: string | null;
    email: string | null;
    role: Role | null;
    company: string | null;
    userId: string | null;
    isAccountComplete: boolean;
    isActive: boolean;
}

const initialState: AuthState = {
    user: null,
    token: null,
    email: null,
    role: null,
    company: null,
    userId: null,
    isAccountComplete: false,
    isActive: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<{
                user: IUser;
                token: string;
                email: string | null;
                role: Role | null;
                company: string | null;
                userId: string | null;
                isAccountComplete: boolean | false;
                isActive: boolean | false;
            }>,
        ) => {
            const { user, token, email, role, company, userId, isAccountComplete, isActive } =
                action.payload;
            state.user = user;
            state.token = token;
            state.email = email;
            state.role = role;
            state.company = company;
            state.userId = userId;
            state.isAccountComplete = isAccountComplete;
            state.isActive = isActive;
        },
        clearCredentials: () => {
            return { ...initialState };
        },
    },
});

export const authUser = (state: RootState) => state.auth.user;
export const accountStatus = (state: RootState) => state.auth.isAccountComplete;
export const authUserId = (state: RootState) => state.auth.userId;
export const authUserRole = (state: RootState) => state.auth.role;
export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
