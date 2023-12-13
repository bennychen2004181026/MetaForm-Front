import React from 'react';

import ImagePreview from '@/components/ImagePreview';
import StyledUploadLoading from '@/components/StyledUploadLoading';
import UploadDefaultMessage from '@/components/UploadDefaultMessage';

interface ContentRendererProps {
    isLoading: boolean;
    companyLogo: string;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ isLoading, companyLogo }) => {
    if (isLoading) {
        return <StyledUploadLoading />;
    }
    if (companyLogo) {
        return <ImagePreview src={companyLogo} />;
    }
    return <UploadDefaultMessage />;
};

export default ContentRenderer;
