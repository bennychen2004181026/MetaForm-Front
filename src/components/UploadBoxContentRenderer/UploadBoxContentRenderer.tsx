import React, { ReactNode } from 'react';

import ImagePreview from '@/components/ImagePreview';
import StyledUploadLoading from '@/components/StyledUploadLoading';
import UploadDefaultMessage from '@/components/UploadDefaultMessage';

interface ContentRendererProps {
    isLoading: boolean;
    uploadProgress: number;
    companyLogo: string;
    cropComponent: ReactNode | null;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({
    isLoading,
    uploadProgress,
    companyLogo,
    cropComponent,
}) => {
    if (isLoading) {
        return <StyledUploadLoading uploadProgress={uploadProgress} />;
    }
    if (cropComponent) {
        console.log(123);
        return cropComponent;
    }
    if (companyLogo) {
        return <ImagePreview src={companyLogo} />;
    }
    return <UploadDefaultMessage />;
};

export default ContentRenderer;
