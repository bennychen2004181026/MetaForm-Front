import React from 'react';

interface ImagePreviewProps {
    src: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ src }) => (
    <img src={src} alt="Uploaded Logo" style={{ maxWidth: '100%', maxHeight: '100%' }} />
);

export default ImagePreview;
