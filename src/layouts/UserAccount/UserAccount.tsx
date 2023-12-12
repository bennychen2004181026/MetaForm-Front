import React from 'react';

import { Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import { Image, Nav } from './UserAccount.styles';
import headerLogo from '@/assets/images/user-account-logo.png';

const UserAccount = () => {
    const navigate = useNavigate();
    const logoRedirectHandler = () => {
        navigate('/useraccount');
    };

    return (
        <Link to="/useraccount">
            <Nav>
                <Typography variant="subtitle1" sx={{ color: '#3e3e3e', textTransform: 'none' }}>
                    <b>User account</b>
                </Typography>
                <Image src={headerLogo} alt="loading" onClick={logoRedirectHandler} />
            </Nav>
        </Link>
    );
};

export default UserAccount;
