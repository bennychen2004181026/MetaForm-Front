import React, { useEffect } from 'react';

import { Outlet } from 'react-router-dom';

import Role from '@/constants/roles';
import { useAppSelector } from '@/hooks/redux';
import { authUserRole } from '@/store/slices/auth/authSlice';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

const SuperAdminRoute = () => {
    const showSnackbar = useSnackbarHelper();
    const fetchUserRole: Role = useAppSelector(authUserRole);

    useEffect(() => {
        if (fetchUserRole !== Role.SuperAdmin) {
            showSnackbar('Unauthorized Super Admin access', 'warning');
        }
    }, [fetchUserRole, showSnackbar]);

    return <Outlet />;
};

export default SuperAdminRoute;
