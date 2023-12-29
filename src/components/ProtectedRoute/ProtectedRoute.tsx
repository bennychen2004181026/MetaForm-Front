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

    useEffect(() => {
        if (!fetchedUser) {
            showSnackbar('You need to login first', 'warning');
        }
        if (fetchedUser && !fetchAccountStatus) {
            showSnackbar(
                'You are already logged in, but need to complete your account first',
                'warning',
            );
        }
    }, [fetchedUser, fetchAccountStatus, showSnackbar]);

    if (!fetchedUser) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (fetchedUser && !fetchAccountStatus) {
        return (
            <Navigate to={`/company-profile/${fetchUserId}`} state={{ from: location }} replace />
        );
    }

    return <Outlet />;
};

export default ProtectedRoute;
