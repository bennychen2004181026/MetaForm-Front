import React, { useState } from 'react';

import { Box } from '@mui/system';

import StyledButton from '@/components/Button';
import ReusableForm from '@/components/ReusableForm';
import industries from '@/constants/industryOptions';
import { useAppSelector } from '@/hooks/redux';
import useForm, { IField } from '@/hooks/useForm';
import useUploadImage from '@/hooks/useUploadImage';
import { authUserId } from '@/store/slices/auth/authSlice';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

const UpdateCompanyProfileForm = () => {
    const showSnackbar = useSnackbarHelper();
    const [isLoading, setIsLoading] = useState(false);
    const fetchedUserId: string | null = useAppSelector(authUserId);

    const industryArray = industries.map((industry) => industry.name);
    const fields: IField[] = [
        {
            id: 1,
            label: 'Company Name',
            key: 'companyName',
            type: 'input',
            value: '',
            validationRules: [{ key: 'isRequired', additionalData: 'company name' }],
        },
        {
            id: 2,
            label: 'Industry',
            key: 'industry',
            type: 'select',
            options: industryArray,
            value: '',
            validationRules: [{ key: 'isRequired', additionalData: 'industry' }],
        },
        {
            id: 3,
            label: 'ABN',
            key: 'abn',
            type: 'input',
            value: '',
            validationRules: [{ key: 'isRequired', additionalData: 'ABN' }, { key: 'validateABN' }],
        },
        {
            id: 4,
            label: 'Company Logo URL',
            key: 'companyLogo',
            type: 'file',
            value: '',
            validationRules: [],
        },
    ];

    const {
        fieldsData,
        fieldsFocus,
        errors,
        onDataChange,
        onFieldsBlur,
        isValid,
        validateAllFields,
    } = useForm(fields);

    const {
        isDragging,
        handleDragEnter,
        handleDragOver,
        handleDrop,
        handleDragLeave,
        handleUploadButton,
        selectedImage,
        croppedImageBlob,
        handleCropConfirmation,
        handleCroppedImage,
        isCropping,
        previewCanvasRef,
        imgRef,
        canvasPreview,
        croppedPreviewUrl,
        isFileValid,
    } = useUploadImage({
        setIsLoading,
        onDataChange,
        userId: fetchedUserId,
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validateAllFields()) {
            showSnackbar('Please fill all the required valid fields first', 'error');
        } else {
            showSnackbar('submit logic', 'info');
        }
    };

    const submitButtonText = 'Update Profile';
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: 8,
            }}
        >
            <ReusableForm
                // excludeFields={['companyLogo']}
                formFields={fields}
                fieldsData={fieldsData}
                fieldsFocus={fieldsFocus}
                errors={errors}
                onDataChange={onDataChange}
                onFieldsBlur={onFieldsBlur}
                isValid={isValid}
                handleSubmit={handleSubmit}
                submitButtonText={submitButtonText}
            />
        </Box>
    );
};

export default UpdateCompanyProfileForm;
