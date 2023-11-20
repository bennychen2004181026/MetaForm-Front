import React from 'react';

import { Link, useNavigate } from 'react-router-dom';

import headerLogo from '../../assets/images/logo-jr-academy.png';

import { Image, Nav, SignUpLink } from './Header.styles';

const Header = () => {
    const navigate = useNavigate();
    const logoRedirectHandler = () => {
        navigate('/home');
    };
    const loginLinkStyle = {
        color: 'black',
        fontWeight: 'bold',
        marginLeft: '10px',
    };

    return (
        <Nav>
            <Link to="/home">
                <Image src={headerLogo} alt="loading" onClick={logoRedirectHandler} />
            </Link>
            <SignUpLink>
                Already have an account?
                <Link to="/login" style={loginLinkStyle}>
                    Log in
                </Link>
            </SignUpLink>
        </Nav>
    );
};

export default Header;
