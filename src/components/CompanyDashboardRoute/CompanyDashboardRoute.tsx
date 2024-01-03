import React, { useEffect } from 'react';

import { Outlet } from 'react-router-dom';

import Role from '@/constants/roles';
import { useAppSelector } from '@/hooks/redux';
import { IUser } from '@/interfaces/User';
import { authUser, authUserRole } from '@/store/slices/auth/authSlice';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

const CompanyDashboardRoute = () => {
    const showSnackbar = useSnackbarHelper();
    const fetchedUser: IUser = useAppSelector(authUser);
    const fetchUserRole: Role = useAppSelector(authUserRole);
    const allowedRoles: Role[] = [Role.Admin, Role.SuperAdmin];

    useEffect(() => {
        if (fetchedUser && !allowedRoles.includes(fetchUserRole)) {
            showSnackbar('Unauthorized access', 'warning');
        }
    }, [fetchedUser, allowedRoles, fetchUserRole, showSnackbar]);

    return <Outlet />;
};

export default CompanyDashboardRoute;
