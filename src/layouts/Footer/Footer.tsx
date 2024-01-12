import React from 'react';

import { Typography } from '@mui/material';

import { Div, FooterLink } from './Footer.styles';

const Footer = () => {
    return (
        <Div>
            <FooterLink to="/#">
                <Typography variant="body2">company address</Typography>
            </FooterLink>
            <FooterLink to="/#">
                <Typography variant="body2">Cookie Settings</Typography>
            </FooterLink>
            <FooterLink to="/#">
                <Typography variant="body2">Check our Cookie Policy to delete cookies</Typography>
            </FooterLink>
            <FooterLink to="/home">
                <Typography variant="body2">&copy; Metaform</Typography>
            </FooterLink>
        </Div>
    );
};
export default Footer;
