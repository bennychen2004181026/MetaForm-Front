import React, { useEffect } from 'react';

import { Outlet } from 'react-router-dom';

import { useAppSelector } from '@/hooks/redux';
import { Role } from '@/interfaces/User.interface';
import { authUserRole } from '@/store/slices/auth/authSlice';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

const SuperAdminRoute = () => {
    const showSnackbar = useSnackbarHelper();
    const fetchUserRole: Role = useAppSelector(authUserRole);

    useEffect(() => {
        if (fetchUserRole === Role.Admin) {
            showSnackbar('Unauthorized Super Admin access', 'warning');
        }
    }, []);

    return <Outlet />;
};

export default SuperAdminRoute;
