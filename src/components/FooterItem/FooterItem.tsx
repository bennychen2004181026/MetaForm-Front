import React from 'react';

import { Typography } from '@mui/material';
import styled from 'styled-components';

import { FooterLink } from '@/layouts/Footer/Footer.styles';

interface FooterItemProps {
    text: string;
    footerLink: string;
}

const StyledTypography = styled(Typography)`
    font-size: 1.4rem;
    font-weight: 500;
    text-decoration-thickness: 0.0625rem;
    text-underline-offset: 0.25rem;
    text-decoration-line: underline;
    text-decoration-color: transparent;
    transition: text-decoration-color 0.3s ease-in-out 0s;
    color: #0d1846;
    &:hover {
        text-decoration-line: underline;
        text-decoration-thickness: initial;
        text-decoration-style: initial;
        text-decoration-color: #0d1846;
    }
    @media (max-width: 768px) {
        font-size: 0.8rem;
        font-weight: 400;
        text-decoration-thickness: 0.0425rem;
    }
`;
const FooterItem: React.FC<FooterItemProps> = ({ text, footerLink }) => (
    <FooterLink to={footerLink}>
        <StyledTypography variant="body2">{text}</StyledTypography>
    </FooterLink>
);

export default FooterItem;
