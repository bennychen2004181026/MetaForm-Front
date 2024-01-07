import React, { useEffect } from 'react';

import { Badge, Business, BusinessCenter, Groups2 } from '@mui/icons-material/';
import { List, ListItem, ListItemAvatar } from '@mui/material/';
import { SerializedError } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import DefaultCompanyLogo from '@/assets/images/DefaultCompanyLogo.jpg';
import ListIconAndTextItem from '@/components/ListIconAndTextItem/';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { IEmployeeInfo } from '@/interfaces/ICompany';
import LoadingSpinner from '@/layouts/LoadingSpinner';
import companyApis from '@/services/company';
import {
    myCompanyABN,
    myCompanyIndustry,
    myCompanyLogo,
    myCompanyMembersInfo,
    myCompanyName,
    setEmployeesInfos,
} from '@/store/slices/company/companySlice';
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
    const { companyId } = useParams<{ companyId: string }>();
    const showSnackbar = useSnackbarHelper();
    const dispatch = useAppDispatch();
    const companyName: string | null = useAppSelector(myCompanyName);
    const companyABN: string | null = useAppSelector(myCompanyABN);
    const companyLogo: string | null = useAppSelector(myCompanyLogo);
    const companyIndustry: string | null = useAppSelector(myCompanyIndustry);
    const companyMembers: IEmployeeInfo[] | [] = useAppSelector(myCompanyMembersInfo) || [];

    const { useGetEmployeesQuery } = companyApis;
    const { data, error, isLoading } = useGetEmployeesQuery(companyId as string);

    useEffect(() => {
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
    }, [error]);

    if (data) {
        const { employeesArray } = data;
        dispatch(setEmployeesInfos(employeesArray));
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
