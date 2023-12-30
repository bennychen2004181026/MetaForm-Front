import React, { useEffect } from 'react';

import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAppSelector } from '@/hooks/redux';
import { IUser } from '@/interfaces/User.interface';
import { accountStatus, authUser, authUserId } from '@/store/slices/auth/authSlice';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

const ProtectedRoute = () => {
    const showSnackbar = useSnackbarHelper();
    const fetchedUser: IUser = useAppSelector(authUser);
    const fetchAccountStatus: boolean = useAppSelector(accountStatus);
    const fetchUserId: string = useAppSelector(authUserId);
    const location = useLocation();
    const currentPath = location.pathname;
    const profilePath = `/company-profile/${fetchUserId}`;

    useEffect(() => {
        if (!fetchedUser) {
            showSnackbar('You need to login first', 'warning');
        }
        if (fetchedUser && !fetchAccountStatus && currentPath !== profilePath) {
            showSnackbar(
                'You are already logged in, but need to complete your account first',
                'warning',
            );
        }
    }, [fetchedUser, fetchAccountStatus, showSnackbar, currentPath, profilePath]);

    if (!fetchedUser) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (fetchedUser && !fetchAccountStatus && currentPath !== profilePath) {
        return <Navigate to={`${profilePath}`} state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
