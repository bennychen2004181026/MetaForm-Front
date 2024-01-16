import React, { useState } from 'react';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

import LogoutDialog from '@/components/LogoutDialog';
import Role from '@/constants/roles';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { IUser } from '@/interfaces/IUser';
import * as authSliceExports from '@/store/slices/auth/authSlice';
import * as companySliceExports from '@/store/slices/company/companySlice';
import stringAvatar from '@/utils/stringAvatar';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

const NavBarUserMenu: React.FC = () => {
    const fetchedUser: IUser | null = useAppSelector(authSliceExports.authUser);
    const fetchAccountStatus: boolean = useAppSelector(authSliceExports.accountStatus);
    const fetchUserRole: Role = useAppSelector(authSliceExports.authUserRole);
    const fetchUserId: string | null = useAppSelector(authSliceExports.authUserId);
    const companyId: string | null = useAppSelector(companySliceExports.myCompanyId);
    const allowedRoles: Role[] = [Role.Admin, Role.SuperAdmin];
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const showSnackbar = useSnackbarHelper();

    const displayedSettings = [
        { label: 'Profile', path: '/user-profile' },
        { label: 'Change Password', path: '/user-profile/change-password' },
        { label: 'My workplace', path: '/forms' },
        { label: 'Logout', path: '/logout' },
    ];

    if (companyId && allowedRoles.includes(fetchUserRole)) {
        displayedSettings.splice(0, 0, {
            label: 'Company Dashboard',
            path: `/companies/${companyId}/dashboard`,
        });
    }

    if (!fetchedUser?.isAccountComplete && fetchUserId) {
        displayedSettings.splice(0, displayedSettings.length - 1, {
            label: 'Complete Account',
            path: `/company-profile/${fetchUserId}`,
        });
    }

    if (!fetchAccountStatus) {
        displayedSettings.splice(0, displayedSettings.length - 1);
    }

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleMenuClick = (path: string) => {
        if (path === '/logout') {
            setLogoutDialogOpen(true);
        } else {
            handleCloseUserMenu();
            navigate(path);
        }
    };

    const handleLogout = () => {
        setLogoutDialogOpen(false);
        dispatch(companySliceExports.clearCompanyInfo());
        dispatch(authSliceExports.clearCredentials());
        showSnackbar('You are logged out', 'success');
        navigate('/login');
    };

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {fetchedUser && (fetchedUser.firstName || fetchedUser.lastName) ? (
                        <Avatar
                            {...stringAvatar(`${fetchedUser.firstName} ${fetchedUser.lastName}`)}
                        />
                    ) : (
                        <Avatar>
                            <AccountCircleIcon />
                        </Avatar>
                    )}
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {displayedSettings.map((setting) => (
                    <MenuItem key={setting.label} onClick={() => handleMenuClick(setting.path)}>
                        <Typography textAlign="center">{setting.label}</Typography>
                    </MenuItem>
                ))}
            </Menu>
            <LogoutDialog
                open={logoutDialogOpen}
                onClose={() => setLogoutDialogOpen(false)}
                onConfirm={handleLogout}
            />
        </Box>
    );
};

export default NavBarUserMenu;
