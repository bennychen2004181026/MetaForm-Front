import React from 'react';

import styled from 'styled-components';

import Hyperlink from '../StyledLink/Hyperlink';

interface MessageProps {
    textBeforeLink?: string;
    textAfterLink?: string;
    link?: {
        text: string;
        onClick: () => void;
        className?: string;
    };
    className?: string;
}

const MessageContainer = styled.p`
    color: #333;
    font-size: 16px;
`;

const InformativeText: React.FC<MessageProps> = ({
    textBeforeLink,
    textAfterLink,
    link,
    className,
}) => {
    return (
        <MessageContainer className={className}>
            {textBeforeLink}
            {link && (
                <Hyperlink text={link.text} onClick={link.onClick} className={link.className} />
            )}
            {textAfterLink}
        </MessageContainer>
    );
};

export default InformativeText;
