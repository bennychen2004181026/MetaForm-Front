import React from 'react';

import { ThemeProvider, styled } from 'styled-components';

import { IUploadedFile } from '@/interfaces/CreateForm';

const StyledImageContainer = styled.div`
    img {
        max-height: ${(props) => props.theme.maxHieght};
        max-width: ${(props) => props.theme.maxWidth};
    }
    padding: ${(props) => props.theme.padding};
`;
const theme = {
    large: {
        maxHieght: '400px',
        maxWidth: '400px',
        padding: '20px 20px',
    },
    small: {
        maxHieght: '200px',
        maxWidth: '200px',
        padding: '20px 60px',
    },
};

const ImageContainer = ({ image, large }: { image: IUploadedFile; large: boolean }) => {
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
