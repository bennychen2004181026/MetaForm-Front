import React, { useEffect, useState } from 'react';

import { Badge, Business, BusinessCenter, Groups2 } from '@mui/icons-material/';
import { List, ListItem, ListItemAvatar } from '@mui/material/';
import { SerializedError } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import DefaultCompanyLogo from '@/assets/images/DefaultCompanyLogo.jpg';
import ListIconAndTextItem from '@/components/ListIconAndTextItem/';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { IEmployeeInfo } from '@/interfaces/ICompany';
import LoadingSpinner from '@/layouts/LoadingSpinner';
import companyApis from '@/services/company';
import * as authSliceExports from '@/store/slices/auth/authSlice';
import * as companySliceExports from '@/store/slices/company/companySlice';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

const StyledListItem = styled(ListItem)`
    display: flex;
    justify-content: space-around;
    min-width: 220px;
    margin: 0 0 20px 0;
`;

const Logo = styled.img`
    height: 100px;
    width: 100px;
`;

const CompanyIntros: React.FC = () => {
    const showSnackbar = useSnackbarHelper();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const companyId: string | null = useAppSelector(companySliceExports.myCompanyId);
    const companyName: string | null = useAppSelector(companySliceExports.myCompanyName);
    const companyABN: string | null = useAppSelector(companySliceExports.myCompanyABN);
    const companyLogo: string | null = useAppSelector(companySliceExports.myCompanyLogo);
    const companyIndustry: string | null = useAppSelector(companySliceExports.myCompanyIndustry);
    const companyMembers: IEmployeeInfo[] | [] =
        useAppSelector(companySliceExports.myCompanyMembersInfo) || [];

    const { useGetEmployeesQuery } = companyApis;
    const shouldFetch =
        companyId && companyName && companyABN && companyLogo && companyIndustry && companyMembers;
    const {
        data,
        error,
        isLoading: isQueryLoading,
    } = useGetEmployeesQuery(companyId as string, {
        skip: !shouldFetch,
    });

    useEffect(() => {
        if (!shouldFetch) {
            showSnackbar(`Miss company info and you need to re-login`, 'error');
            dispatch(companySliceExports.clearCompanyInfo());
            dispatch(authSliceExports.clearCredentials());
            navigate('/login');
            return;
        }

        setIsLoading(isQueryLoading);
        if (error) {
            let message;
            let statusCode;
            if (error instanceof AxiosError) {
                statusCode = error.response?.status;
                message = error.response?.data?.message || error.message;
            } else {
                const serializedError = error as SerializedError;
                message = serializedError.message;
                statusCode = serializedError.code;
            }
            showSnackbar(
                `statusCode: ${statusCode ?? 500}\nmessage: ${
                    message ?? 'An unknown error occurred'
                }`,
                'error',
            );
        }
    }, [shouldFetch, error]);

    if (data) {
        const { employeesArray } = data;
        dispatch(companySliceExports.setEmployeesInfos(employeesArray));
    }

    const activeMembers = companyMembers.filter((user) => user.isActive === true);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <StyledListItem>
                <ListItemAvatar>
                    <Logo src={companyLogo || DefaultCompanyLogo} alt="Default Company Logo" />
                </ListItemAvatar>
            </StyledListItem>
            <ListIconAndTextItem
                icon={<BusinessCenter />}
                primaryText="Company Name"
                secondaryText={`${companyName ?? 'Fail to fetch company info'}`}
            />
            <ListIconAndTextItem
                icon={<Badge />}
                primaryText="ABN"
                secondaryText={`${companyABN ?? 'Fail to fetch company info'}`}
            />
            <ListIconAndTextItem
                icon={<Business />}
                primaryText="Industry"
                secondaryText={`${companyIndustry ?? 'Fail to fetch company info'}`}
            />
            <ListIconAndTextItem
                icon={<Groups2 />}
                primaryText="Active members"
                secondaryText={`${activeMembers.length ?? 'Fail to fetch company member info'}`}
            />
        </List>
    );
};

export default CompanyIntros;
