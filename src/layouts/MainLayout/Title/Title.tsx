import React from 'react';

import { Box } from '@mui/system';
import styled from 'styled-components';

const TitleBox = styled(Box)`
    margin-bottom: 4rem;
    justify-content: center;
    text-align: center;
`;
const Title = ({ content }: { content: string }) => {
    return (
        <TitleBox>
            <h1>{content}</h1>
        </TitleBox>
    );
};
export default Title;
