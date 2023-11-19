import React from 'react';

import styled from 'styled-components';

interface IHyperlinkProps {
    text: string;
    onClick?: () => void;
    className?: string;
}

const StyledLink = styled.a`
    color: blue;
    cursor: pointer;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

const HyerLink: React.FC<IHyperlinkProps> = ({ text, onClick, className }) => {
    return (
        <StyledLink onClick={onClick} className={className}>
            {text}
        </StyledLink>
    );
};

export default HyerLink;
