import React from 'react';

import { ThemeProvider, styled } from 'styled-components';

import { IImage } from '@/interfaces/IQuestion';

const StyledImageContainer = styled.div`
    img {
        max-height: ${(props) => props.theme.optionMaxHieght};
    }
    padding: ${(props) => props.theme.padding};
`;
const theme = {
    large: {
        optionMaxHieght: '400px',
        padding: '20px 20px',
    },
    small: {
        optionMaxHieght: '200px',
        padding: '20px 60px',
    },
};

const ImageContainer = ({ image, large }: { image: IImage; large: boolean }) => {
    const { name, url } = image;
    return (
        <ThemeProvider theme={large ? theme.large : theme.small}>
            <StyledImageContainer>
                <img src={url} alt={name} />
            </StyledImageContainer>
        </ThemeProvider>
    );
};

export default ImageContainer;
