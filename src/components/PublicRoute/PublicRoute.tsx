import React, { useEffect } from 'react';

import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAppSelector } from '@/hooks/redux';
import { IUser } from '@/interfaces/User';
import { accountStatus, authUser, authUserId } from '@/store/slices/auth/authSlice';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

const PublicRoute = () => {
    const showSnackbar = useSnackbarHelper();
    const fetchedUser: IUser = useAppSelector(authUser);
    const fetchAccountStatus: boolean = useAppSelector(accountStatus);
    const fetchUserId: string = useAppSelector(authUserId);
    const location = useLocation();

    useEffect(() => {
        if (fetchedUser !== null) {
            const message = !fetchAccountStatus
                ? 'You are already logged in, but need to complete your account first'
                : 'You are already logged in.';
            showSnackbar(message, 'warning');
        }
    }, [fetchedUser, fetchAccountStatus, showSnackbar]);

    if (fetchedUser) {
        const path = fetchAccountStatus ? '/user-dashboard' : `/company-profile/${fetchUserId}`;
        return <Navigate to={path} state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default PublicRoute;
