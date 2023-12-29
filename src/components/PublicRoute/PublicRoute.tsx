import React, { ReactNode } from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import { useAppSelector } from '@/hooks/redux';
import { IUser } from '@/interfaces/User.interface';
import { accountStatus, authUser, authUserId } from '@/store/slices/auth/authSlice';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

interface PublicRouteProps {
    children: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
    const showSnackbar = useSnackbarHelper();
    const fetchedUser: IUser = useAppSelector(authUser);
    const fetchAccountStatus: boolean = useAppSelector(accountStatus);
    const fetchUserId: string = useAppSelector(authUserId);
    const location = useLocation();

    let redirectPath = '';
    let message = '';

    if (fetchedUser !== null) {
        if (!fetchAccountStatus) {
            message = 'You are already login, but need to complete your account first';
            redirectPath = `/company-profile/${fetchUserId}`;
        } else {
            message = 'You are already login.';
            redirectPath = '/user-dashboard';
        }

        showSnackbar(message, 'warning');

        return <Navigate to={redirectPath} state={{ from: location }} replace />;
    }

    return children;
};

export default PublicRoute;
