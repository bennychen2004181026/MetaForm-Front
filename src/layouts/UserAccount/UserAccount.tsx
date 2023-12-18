import React from 'react';

import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import headerLogo from '@/assets/images/user-account-logo.png';
import { Image, Nav } from '@/layouts/Header/Header.styles';

const UserAccount = () => {
    return (
        <Link to="/useraccount">
            <Nav style={{ justifyContent: 'right' }}>
                <Typography
                    variant="subtitle1"
                    sx={{ color: '#3e3e3e', textTransform: 'none', fontWeight: 'bold' }}
                >
                    User account
                </Typography>
                <Image
                    style={{ height: '35px', width: '35px', paddingLeft: '10px' }}
                    src={headerLogo}
                    alt="loading"
                />
            </Nav>
        </Link>
    );
};

export default UserAccount;
