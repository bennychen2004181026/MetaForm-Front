import React from 'react';

import { styled } from 'styled-components';

interface ImageProps {
    src: string;
    alt: string;
}
const StyledImage = styled.img`
    display: block;
    width: 300px;
    margin: 100px auto;
`;
const ImageBox = (props: ImageProps) => {
    const { src, alt } = props;
    return <StyledImage src={src} alt={alt} />;
};

export default ImageBox;
