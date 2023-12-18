import React from 'react';

import CustomTypography from '@/components/CustomTypography';

const UploadDefaultMessage: React.FC = () => (
    <CustomTypography
        variant="body1"
        text="(Optional) Drag and drop an image here, or click to select a file"
    />
);

export default UploadDefaultMessage;
