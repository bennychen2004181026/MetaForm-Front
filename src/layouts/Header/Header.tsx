import React, { useState } from 'react';

import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import BusinessIcon from '@mui/icons-material/Business';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';
import EditNoteIcon from '@mui/icons-material/EditNote';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { AppBar, Avatar, Box, Divider, Drawer, IconButton, List, Toolbar } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Image, SignUpLink, StyledLink, fadeIn } from './Header.styles';
import headerLogo from '@/assets/images/logo-jr-academy.png';
import smLogo from '@/assets/images/sm-jr-logo.png';
import AppBarDrawerListItem from '@/components/AppBarDrawerListItem';
import LogoutDialog from '@/components/LogoutDialog';
import NavBarUserMenu from '@/components/NavBarUserMenu';
import Role from '@/constants/roles';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { IUser } from '@/interfaces/IUser';
import * as authSliceExports from '@/store/slices/auth/authSlice';
import { accountStatus, authUser, authUserId } from '@/store/slices/auth/authSlice';
import * as companySliceExports from '@/store/slices/company/companySlice';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

const StyledAppBar = styled(AppBar)`
    position: sticky;
    display: flex;
    flex-direction: row;
    width: 100vw;
    top: 0;
    z-index: 100;
    justify-content: center;
    align-items: center;
    height: 8vh;
    background-color: #162a47;
`;

const StyledToolbarAndLogoBox = styled(Box)`
    display: flex;
`;

const StyledSignUpLinkBox = styled(Box)`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    @media (max-width: 600px) {
        width: 160px;
    }
`;

const StyledToolbar = styled(Toolbar)`
    display: none;
    @media (max-width: 600px) {
        display: flex;
    }
`;

const StyledNavBarContentBox = styled(Box)`
    display: flex;
    width: 1800px;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 0 20px;
`;

const StyledLogoBox = styled(Box)`
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
`;

const StyledLogoAvatar = styled(Avatar)`
    display: none;
    transition:
        box-shadow 0.3s ease-in-out,
        transform 0.3s ease-in-out;
    animation: ${fadeIn} 0.5s ease-in;

    &:hover {
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
        transform: scale(1.05);
    }

    @media (max-width: 600px) {
        display: flex;
    }
`;

const Header = () => {
    const showSnackbar = useSnackbarHelper();
    const location = useLocation();
    const fetchedUser: IUser = useAppSelector(authUser);
    const fetchAccountStatus: boolean = useAppSelector(accountStatus);
    const fetchUserRole: Role = useAppSelector(authSliceExports.authUserRole);
    const fetchUserId: string = useAppSelector(authUserId);
    const companyId: string | null = useAppSelector(companySliceExports.myCompanyId);
    const allowedRoles: Role[] = [Role.Admin, Role.SuperAdmin];
    const superAdmin: Role = Role.SuperAdmin;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const displaySettings = [
        {
            text: 'Profile',
            path: '/user-profile',
            icon: <PersonIcon />,
            divider: false,
        },
        {
            text: 'Change Password',
            path: '/user-profile/change-password',
            icon: <EnhancedEncryptionIcon />,
            divider: true,
        },
        {
            text: 'My workplace',
            path: '/forms',
            icon: <DynamicFormIcon />,
            divider: false,
        },
        {
            text: 'Create form',
            path: '/create-form',
            icon: <EditNoteIcon />,
            divider: true,
        },
        {
            text: 'Logout',
            path: '/logout',
            icon: <LogoutIcon />,
            divider: false,
        },
    ];

    if (!fetchedUser?.isAccountComplete && fetchUserId) {
        displaySettings.splice(0, displaySettings.length - 1, {
            text: 'Complete Account',
            path: `/company-profile/${fetchUserId}`,
            icon: <LogoutIcon />,
            divider: true,
        });
    }

    if (companyId && allowedRoles.includes(fetchUserRole)) {
        const companyDashboardItems = [
            {
                text: 'Company Dashboard',
                path: `/companies/${companyId}/dashboard`,
                icon: <BusinessIcon />,
                divider: false,
            },
            {
                text: 'Invite Employees',
                path: `/companies/${companyId}/invite-employees`,
                icon: <GroupAddIcon />,
                divider: true,
            },
        ];

        if (fetchUserRole === superAdmin) {
            companyDashboardItems.splice(companyDashboardItems.length - 1, 0, {
                text: 'Update profile',
                path: `/companies/${companyId}/users/${fetchUserId}/update-company-profile`,
                icon: <BrowserUpdatedIcon />,
                divider: false,
            });
        }
        displaySettings.splice(0, 0, ...companyDashboardItems);
    }

    if (!fetchedUser) {
        displaySettings.splice(0, displaySettings.length, {
            text: 'Login',
            path: '/login',
            icon: <LogoutIcon />,
            divider: false,
        });
    }

    const logoRedirectHandler = () => {
        if (!fetchedUser) {
            navigate('/login');
        } else if (!fetchAccountStatus) {
            navigate(`/company-profile/${fetchUserId}`);
        } else {
            navigate('/forms');
        }
    };

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setDrawerOpen(open);
    };

    const handleLogout = () => {
        setLogoutDialogOpen(false);
        dispatch(companySliceExports.clearCompanyInfo());
        dispatch(authSliceExports.clearCredentials());
        showSnackbar(`You are logged out.`, 'success');
        navigate('/login');
    };

    const handleItemClick = (path: string) => {
        if (path === '/logout') {
            setLogoutDialogOpen(true);
        } else if (location.pathname === path) {
            toggleDrawer(false);
        } else {
            setDrawerOpen(false);
            navigate(path);
        }
    };

    return (
        <StyledAppBar>
            <StyledNavBarContentBox>
                <StyledToolbarAndLogoBox>
                    <StyledToolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleDrawer(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                    </StyledToolbar>
                    <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                        <Box
                            role="presentation"
                            onClick={toggleDrawer(false)}
                            onKeyDown={toggleDrawer(false)}
                        >
                            <List>
                                {displaySettings.map((item) => (
                                    <React.Fragment key={item.text}>
                                        <AppBarDrawerListItem
                                            icon={item.icon}
                                            text={item.text}
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                handleItemClick(item.path);
                                            }}
                                        />
                                        {item.divider && <Divider />}
                                    </React.Fragment>
                                ))}
                            </List>
                            <LogoutDialog
                                open={logoutDialogOpen}
                                onClose={() => setLogoutDialogOpen(false)}
                                onConfirm={handleLogout}
                            />
                        </Box>
                    </Drawer>
                    <StyledLogoBox onClick={logoRedirectHandler}>
                        <Image src={headerLogo} alt="Logo" />
                        <StyledLogoAvatar src={smLogo} alt="Logo" />
                    </StyledLogoBox>
                </StyledToolbarAndLogoBox>
                <StyledSignUpLinkBox>
                    {!fetchedUser ? (
                        <SignUpLink>
                            Already have an account?
                            <StyledLink to="/login">Login</StyledLink>
                        </SignUpLink>
                    ) : (
                        <NavBarUserMenu />
                    )}
                </StyledSignUpLinkBox>
            </StyledNavBarContentBox>
        </StyledAppBar>
    );
};

export default Header;
