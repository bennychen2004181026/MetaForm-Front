import * as React from 'react';
import { useState } from 'react';

import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import BusinessIcon from '@mui/icons-material/Business';
import DynamicFormIcon from '@mui/icons-material/DynamicForm';
import EnhancedEncryptionIcon from '@mui/icons-material/EnhancedEncryption';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import LogoutDialog from '@/components/LogoutDialog';
import Role from '@/constants/roles';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { IUser } from '@/interfaces/IUser';
import * as authSliceExports from '@/store/slices/auth/authSlice';
import { authUser, authUserId } from '@/store/slices/auth/authSlice';
import * as companySliceExports from '@/store/slices/company/companySlice';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

const SidebarContainer = styled.div`
    display: flex;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 50;
`;

type SidebarProps = {
    isOpen: boolean;
};
const Sidebar = styled.div<SidebarProps>`
    text-transform: capitalize;
    background-color: #cad9ed;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-evenly;
    transition: width 0.3s;
    width: ${(props) => (props.isOpen ? '200px' : '50px')};
    position: relative;
    @media (max-width: 600px) {
        display: none;
    }
`;

type OverlayProps = {
    show: boolean;
};
const Overlay = styled.div<OverlayProps>`
    display: ${(props) => (props.show ? 'block' : 'none')};
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
    z-index: 49;
`;

const CustomNavLink = styled(NavLink)`
    height: 30px;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: black;
    margin-bottom: 5px;
    gap: 15px;
    &:hover {
        background-color: lightgrey;
        transition: all 1s;
    }
    &:active {
        background-color: lightgrey;
    }
`;

const IconContainer = styled.div`
    display: flex;
    align-items: center;
`;

const SidebarButton = ({ children }: { children?: React.ReactNode }) => {
    const showSnackbar = useSnackbarHelper();
    const fetchedUser: IUser = useAppSelector(authUser);
    const fetchUserRole: Role = useAppSelector(authSliceExports.authUserRole);
    const fetchUserId: string = useAppSelector(authUserId);
    const companyId: string | null = useAppSelector(companySliceExports.myCompanyId);
    const allowedRoles: Role[] = [Role.Admin, Role.SuperAdmin];
    const superAdmin: Role = Role.SuperAdmin;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

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

    const handleLogout = () => {
        setLogoutDialogOpen(false);
        dispatch(companySliceExports.clearCompanyInfo());
        dispatch(authSliceExports.clearCredentials());
        showSnackbar(`You are logged out.`, 'success');
        navigate('/login');
    };

    const handleItemClick = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        if (path === '/logout') {
            event.preventDefault();
            setLogoutDialogOpen(true);
        } else {
            navigate(path);
        }
    };

    return (
        <div>
            <Overlay show={isOpen} onClick={() => setIsOpen(false)} />
            <SidebarContainer>
                <Sidebar isOpen={isOpen} onClick={toggle}>
                    {displaySettings.map((item) => (
                        <CustomNavLink
                            to={item.path}
                            key={item.text}
                            onClick={(event) => {
                                event.stopPropagation();
                                handleItemClick(event, item.path);
                            }}
                            style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
                        >
                            <IconContainer>{item.icon}</IconContainer>
                            {isOpen && <p>{item.text}</p>}
                        </CustomNavLink>
                    ))}
                    <LogoutDialog
                        open={logoutDialogOpen}
                        onClose={() => setLogoutDialogOpen(false)}
                        onConfirm={handleLogout}
                    />
                </Sidebar>
                <main
                    style={{
                        marginLeft: isOpen ? '200px' : '50px',
                        transition: 'margin-left 0.3s',
                    }}
                >
                    {children}
                </main>
            </SidebarContainer>
        </div>
    );
};

export default SidebarButton;
