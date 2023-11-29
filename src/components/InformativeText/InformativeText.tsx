import React from 'react';

import styled from 'styled-components';

import Hyperlink from '@/components/StyledLink/';

interface MessageProps {
    textBeforeLink?: string;
    textAfterLink?: string;
    link?: {
        text: string;
        onClick: () => void;
    };
}

const MessageContainer = styled.p`
    color: #333;
    font-size: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
    align-items: center;
`;

const InformativeText: React.FC<MessageProps> = ({ textBeforeLink, textAfterLink, link }) => {
    return (
        <MessageContainer>
            {textBeforeLink}
            {link && <Hyperlink text={link.text} onClick={link.onClick} />}
            {textAfterLink}
        </MessageContainer>
    );
};

export default InformativeText;
