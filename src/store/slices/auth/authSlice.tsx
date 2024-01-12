import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import Role from '@/constants/roles';
import { ICompany } from '@/interfaces/ICompany';
import { IUser } from '@/interfaces/IUser';
import type { RootState } from '@/interfaces/redux';

interface AuthState {
    user: IUser | null;
    token: string | null;
    email: string | null;
    role: Role | null;
    company: string | null;
    userId: string | null;
    companyInfo: ICompany | null;
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
    companyInfo: null,
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
                companyInfo: ICompany | null;
                isAccountComplete: boolean;
                isActive: boolean;
            }>,
        ) => {
            const {
                user,
                token,
                email,
                role,
                company,
                userId,
                isAccountComplete,
                isActive,
                companyInfo,
            } = action.payload;
            state.user = user;
            state.token = token;
            state.email = email;
            state.role = role;
            state.company = company;
            state.userId = userId;
            state.companyInfo = companyInfo;
            state.isAccountComplete = isAccountComplete;
            state.isActive = isActive;
        },
        clearCredentials: () => {
            return { ...initialState };
        },
        setCompanyInfoInUser: (
            state,
            action: PayloadAction<{
                companyInfo: ICompany;
            }>,
        ) => {
            const { companyInfo } = action.payload;
            state.companyInfo = companyInfo;
        },
    },
});

export const authUser = (state: RootState) => state.auth.user;
export const accountStatus = (state: RootState) => state.auth.isAccountComplete;
export const authUserId = (state: RootState) => state.auth.userId;
export const authUserRole = (state: RootState) => state.auth.role;
export const authUserCompanyInfo = (state: RootState) => state.auth.companyInfo;
export const { setCredentials, clearCredentials, setCompanyInfoInUser } = authSlice.actions;
export default authSlice.reducer;
