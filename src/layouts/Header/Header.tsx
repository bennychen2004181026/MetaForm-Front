import React, { useState } from 'react';

import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import {
    AppBar,
    Avatar,
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Image, SignUpLink, StyledLink, fadeIn } from './Header.styles';
import headerLogo from '@/assets/images/logo-jr-academy.png';
import smLogo from '@/assets/images/sm-jr-logo.png';
import NavBarUserMenu from '@/components/NavBarUserMenu';
import { useAppSelector } from '@/hooks/redux';
import { IUser } from '@/interfaces/IUser';
import { accountStatus, authUser, authUserId } from '@/store/slices/auth/authSlice';

const StyledAppBar = styled(AppBar)`
    position: sticky;
    display: flex;
    flex-direction: row;
    width: 100vw;
    top: 0;
    z-index: 20;
    justify-content: center;
    align-items: center;
    height: 6vh;
`;

const StyledToolbarAndLogoBox = styled(Box)`
    display: flex;
`;

const StyledSignUpLinkBox = styled(Box)`
    display: flex;
    flex-wrap: wrap;
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
    width: 800px;
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
    const fetchedUser: IUser = useAppSelector(authUser);
    const fetchAccountStatus: boolean = useAppSelector(accountStatus);
    const fetchUserId: string = useAppSelector(authUserId);
    // const fetchUserRole: string = useAppSelector(authUserRole);
    const navigate = useNavigate();
    const logoRedirectHandler = () => {
        if (!fetchedUser) {
            navigate('/login');
        }
        if (!fetchAccountStatus) {
            navigate(`/company-profile/${fetchUserId}`);
        }
        navigate('user-dashboard');
    };

    const [drawerOpen, setDrawerOpen] = useState(false);

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

    const list = () => (
        <Box role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <List>
                <ListItem>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </Box>
    );

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
                        {list()}
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
                            <StyledLink to="/login">Log in</StyledLink>
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
