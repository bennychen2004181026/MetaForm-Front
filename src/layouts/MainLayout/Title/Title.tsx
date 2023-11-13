import React from 'react';

import styled from 'styled-components';

export const StyledTitle = styled.h1`
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@700&family=Roboto+Condensed:wght@300&display=swap');
    font-family: 'Noto Sans', sans-serif;
`;
const Title = ({ content }: { content: string }) => {
    return <StyledTitle>{content}</StyledTitle>;
};
export default Title;
