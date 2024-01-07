import React, { useEffect } from 'react';

import { Badge, Business, BusinessCenter } from '@mui/icons-material/';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material/';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import DefaultCompanyLogo from '@/assets/images/DefaultCompanyLogo.jpg';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { ApiError } from '@/interfaces/ApiError';
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

const StyledListItemText = styled(ListItemText)`
    & .MuiListItemText-primary {
        color: #1045cc;
    }

    & .MuiListItemText-secondary {
        color: #a69355;
    }
`;

const CompanyIntros: React.FC = () => {
    const { companyId } = useParams<{ companyId: string }>();
    const showSnackbar = useSnackbarHelper();
    const dispatch = useAppDispatch();
    const companyName: string = useAppSelector(myCompanyName);
    const companyABN: string = useAppSelector(myCompanyABN);
    const companyLogo: string = useAppSelector(myCompanyLogo);
    const companyIndustry: string = useAppSelector(myCompanyIndustry);
    const companyMembers: IEmployeeInfo = useAppSelector(myCompanyMembersInfo);

    const { useGetEmployeesQuery } = companyApis;
    const { data, error, isLoading } = useGetEmployeesQuery(companyId as string);

    useEffect(() => {
        if (error) {
            const apiError = error as ApiError;
            const errorMessage =
                apiError.data?.errors?.[0].message || apiError.data || 'An unknown error occurred';

            showSnackbar(`statusCode: ${apiError.status}\nmessage: ${errorMessage}`, 'error');
        }
    }, [error]);

    if (data) {
        const { employeesArray } = data;
        dispatch(setEmployeesInfos(employeesArray));
    }

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
            <StyledListItem>
                <ListItemAvatar>
                    <Avatar>
                        <BusinessCenter />
                    </Avatar>
                </ListItemAvatar>
                <StyledListItemText primary="Company Name" secondary={`${companyName || 'None'}`} />
            </StyledListItem>
            <StyledListItem>
                <ListItemAvatar>
                    <Avatar>
                        <Badge />
                    </Avatar>
                </ListItemAvatar>
                <StyledListItemText primary="ABN" secondary={`${companyIndustry || 'None'}`} />
            </StyledListItem>
            <StyledListItem>
                <ListItemAvatar>
                    <Avatar>
                        <Business />
                    </Avatar>
                </ListItemAvatar>
                <StyledListItemText primary="Industry" secondary={`${companyABN || 'None'}`} />
            </StyledListItem>
        </List>
    );
};

export default CompanyIntros;
