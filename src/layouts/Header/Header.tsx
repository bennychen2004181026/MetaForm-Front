import React from 'react';

import { Link, useNavigate } from 'react-router-dom';

import Logo from '../../assets/images/logo-jr-academy.png';

import { Image, Nav, SignUpLink } from './Header.styles';

const Header = () => {
    const navigate = useNavigate();
    const logoRedirectHandler = () => {
        navigate('/home');
    };

    return (
        <Nav>
            <div id="nav-items">
                <Link to="/home">
                    <Image src={Logo} alt="loading" onClick={logoRedirectHandler} />
                </Link>
                <SignUpLink>
                    Already have an account?
                    <Link to="/login" className="login">
                        Log in
                    </Link>
                </SignUpLink>
            </div>
        </Nav>
    );
};

export default Header;
