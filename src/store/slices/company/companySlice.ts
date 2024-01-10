import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IEmployeeInfo } from '@/interfaces/ICompany';
import type { RootState } from '@/interfaces/redux';

interface CompanyInfoState {
    companyId: string | null;
    companyName: string | null;
    abn: string | null;
    logo: string | null;
    description: string | null;
    industry: string | null;
    isActive: boolean;
    employeesIds: string[] | [];
    address: string | null;
    employeesInfo: IEmployeeInfo[] | [];
}

const initialState: CompanyInfoState = {
    companyId: null,
    companyName: null,
    abn: null,
    logo: null,
    description: null,
    industry: null,
    isActive: false,
    employeesIds: [],
    address: null,
    employeesInfo: [],
};

const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        setCompanyInfo: (
            state,
            action: PayloadAction<{
                companyId: string | null;
                companyName: string | null;
                abn: string | null;
                logo: string | null;
                description: string | null;
                industry: string | null;
                isActive: boolean;
                employeesIds: string[] | [];
                address: string | null;
            }>,
        ) => {
            const {
                companyId,
                companyName,
                abn,
                logo,
                description,
                industry,
                isActive,
                employeesIds,
                address,
            } = action.payload;
            state.companyId = companyId;
            state.companyName = companyName;
            state.abn = abn;
            state.logo = logo;
            state.description = description;
            state.industry = industry;
            state.isActive = isActive;
            state.employeesIds = employeesIds;
            state.address = address;
        },
        clearCompanyInfo: () => {
            return { ...initialState };
        },
        setEmployeesInfos(state, action: PayloadAction<IEmployeeInfo[]>) {
            state.employeesInfo = action.payload;
        },
    },
});

export const myCompanyId = (state: RootState) => state.company.companyId;
export const myCompanyName = (state: RootState) => state.company.companyName;
export const myCompanyABN = (state: RootState) => state.company.abn;
export const myCompanyLogo = (state: RootState) => state.company.logo;
export const myCompanyDescription = (state: RootState) => state.company.description;
export const myCompanyIndustry = (state: RootState) => state.company.industry;
export const myCompanyEmployeeIds = (state: RootState) => state.company.employeesIds;
export const myCompanyAddress = (state: RootState) => state.company.address;
export const myCompanyMembersInfo = (state: RootState) => state.company.employeesInfo;
export const { setCompanyInfo, clearCompanyInfo, setEmployeesInfos } = companySlice.actions;
export default companySlice.reducer;
