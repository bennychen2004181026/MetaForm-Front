import React from 'react';

import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavLink = styled(Link)`
    text-decoration: none;
`;

const EmailBtn = styled.button`
    width: 320px;
    height: 52px;
    margin: 0px;
    border: 0px;
    border-radius: 15px;
    padding: 8px 50px;
    font-weight: 600;
    font-size: 15px;
    color: white;
    background-color: black;
    text-decoration: none;
`;

const EmailButton = () => (
    <NavLink to="signupEmail">
        <EmailBtn type="button">Sign up with email</EmailBtn>
    </NavLink>
);

export default EmailButton;
