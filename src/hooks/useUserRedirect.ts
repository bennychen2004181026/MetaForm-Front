import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '@/hooks/redux';
import { IUser } from '@/interfaces/User.interface';
import { accountStatus, authUser, authUserId } from '@/store/slices/auth/authSlice';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

function useUserRedirect() {
    const showSnackbar = useSnackbarHelper();
    const fetchedUser: IUser = useAppSelector(authUser);
    const fetchAccountStatus: boolean = useAppSelector(accountStatus);
    const fetchUserId: string = useAppSelector(authUserId);
    const navigate = useNavigate();
    const [initialCheckDone, setInitialCheckDone] = useState(false);

    useEffect(() => {
        if (!initialCheckDone && fetchedUser !== null) {
            let message = 'You are already login.';
            let path = '/user-dashboard';

            if (!fetchAccountStatus) {
                message = 'You are already login, but need to complete your account first';
                path = `/company-profile/${fetchUserId}`;
            }

            showSnackbar(message, 'warning');
            navigate(path);
        }
        setInitialCheckDone(true);
    }, [fetchedUser, navigate, initialCheckDone, fetchAccountStatus, fetchUserId]);
}

export default useUserRedirect;
