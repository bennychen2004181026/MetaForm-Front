import React, { ReactNode } from 'react';

import ImagePreview from '@/components/ImagePreview';
import StyledUploadLoading from '@/components/StyledUploadLoading';
import UploadDefaultMessage from '@/components/UploadDefaultMessage';

interface ContentRendererProps {
    isLoading: boolean;
    companyLogo: string | null;
    cropComponent: ReactNode | null;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({
    isLoading,
    companyLogo,
    cropComponent,
}) => {
    if (isLoading) {
        return <StyledUploadLoading />;
    }
    if (cropComponent) {
        return cropComponent;
    }
    if (companyLogo) {
        return <ImagePreview src={companyLogo} />;
    }
    return <UploadDefaultMessage />;
};

export default ContentRenderer;
