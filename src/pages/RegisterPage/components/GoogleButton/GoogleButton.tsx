import React from 'react';

import { Link } from 'react-router-dom';
import styled from 'styled-components';

import googleIcon from '@/assets/images/google-icon-logo.png';

const NavLink = styled(Link)`
    text-decoration: none;
`;

const GoogleBtn = styled.button`
    width: 320px;
    height: 50px;
    margin: 0px;
    border: 1px;
    border-style: solid;
    border-radius: 15px;
    padding: 8px 50px;
    font-weight: 600;
    font-size: 15px;
    background-color: white;
    border-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const GoogleIcon = styled.img`
    margin-right: 10px;
    width: 22px;
    height: 22px;
`;

const GoogleButton = () => (
    <NavLink to="signupGoogle">
        <GoogleBtn type="button">
            <GoogleIcon alt="googleIcon" src={googleIcon} />
            Sign up with Google
        </GoogleBtn>
    </NavLink>
);

export default GoogleButton;
