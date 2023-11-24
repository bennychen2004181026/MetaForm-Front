import React from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { Image, Nav, SignUpLink, StyledLink } from './Header.styles';
import headerLogo from '@/assets/images/logo-jr-academy.png';

const Header = () => {
    const navigate = useNavigate();
    const logoRedirectHandler = () => {
        navigate('/home');
    };

    return (
        <Nav>
            <Link to="/home">
                <Image src={headerLogo} alt="loading" onClick={logoRedirectHandler} />
            </Link>
            <SignUpLink>
                Already have an account?
                <StyledLink to="/login">Log in</StyledLink>
            </SignUpLink>
        </Nav>
    );
};

export default Header;
