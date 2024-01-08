import React, { useState } from 'react';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CropFreeIcon from '@mui/icons-material/CropFree';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import CropComponent from '@/components/CropComponent';
import DragDropBox from '@/components/DragDropBox/DragDropBox';
import ReusableForm from '@/components/ReusableForm';
import StartIconButton from '@/components/StartIconButton';
import UploadBoxContentRenderer from '@/components/UploadBoxContentRenderer';
import industries from '@/constants/industryOptions';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import useForm, { IField } from '@/hooks/useForm';
import useUploadImage from '@/hooks/useUploadImage';
import { ApiError } from '@/interfaces/ApiError';
import { IUpdateCompanyProfileRequest, IUpdateCompanyProfileResponse } from '@/interfaces/ICompany';
import LoadingSpinner from '@/layouts/LoadingSpinner';
import companyApis from '@/services/company';
import { authUserId } from '@/store/slices/auth/authSlice';
import { myCompanyId, setCompanyInfo } from '@/store/slices/company/companySlice';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

const CompanyInfosBox = styled(Box)`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
    justify-content: space-around;
    align-items: center;
`;

const StyledStepperBoxContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    @media (max-width: 768px) {
        flex-direction: column;
    }
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    gap: 1rem;
    flex-wrap: wrap;
    align-content: center;
`;

const IconButtonBox = styled(Box)`
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: space-around;
    flex-wrap: nowrap;
    height: 60px;
    margin: 30px 0;
`;

const LogoBox = styled(Box)`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
`;

const UpdateCompanyProfileForm = () => {
    const showSnackbar = useSnackbarHelper();
    const [isLoading, setIsLoading] = useState(false);
    const fetchedUserId: string | null = useAppSelector(authUserId);
    const companyId: string = useAppSelector(myCompanyId);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { useUpdateCompanyProfileMutation } = companyApis;
    const [updateCompany, { isLoading: isUpdateLoading }] = useUpdateCompanyProfileMutation();

    const industryArray = industries.map((industry) => industry.name);
    const fields: IField[] = [
        {
            id: 1,
            label: 'Company Name',
            key: 'companyName',
            type: 'input',
            value: '',
            validationRules: [],
        },
        {
            id: 2,
            label: 'Industry',
            key: 'industry',
            type: 'select',
            options: industryArray,
            value: '',
            validationRules: [],
        },
        {
            id: 3,
            label: 'ABN',
            key: 'abn',
            type: 'input',
            value: '',
            validationRules: [{ key: 'validateABN' }],
        },
        {
            id: 4,
            label: 'Company Logo URL',
            key: 'logo',
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

    const updateCompanyFunction = async () => {
        try {
            const response: IUpdateCompanyProfileResponse = await updateCompany({
                companyId,
                formData: fieldsData,
            } as IUpdateCompanyProfileRequest).unwrap();
            const { message, companyJson } = response;
            const {
                _id,
                companyName,
                abn,
                logo,
                description,
                industry,
                isActive,
                employees,
                address,
            } = companyJson;
            dispatch(
                setCompanyInfo({
                    companyId: _id ?? null,
                    companyName: companyName ?? null,
                    abn: abn ?? null,
                    logo: logo ?? null,
                    description: description ?? null,
                    industry: industry ?? null,
                    isActive: isActive ?? false,
                    employeesIds: Array.isArray(employees) && employees.length > 0 ? employees : [],
                    address: address ?? null,
                }),
            );
            showSnackbar(`${message}`, 'success');
            navigate(`/companies/${_id}/dashboard`);
        } catch (error) {
            const apiError = error as ApiError;
            const errorMessage =
                apiError.data?.errors?.[0].message || apiError.data || 'An unknown error occurred';

            showSnackbar(`statusCode: ${apiError.status}\nmessage: ${errorMessage}`, 'error');
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!validateAllFields()) {
            showSnackbar('Please fill all the required valid fields first', 'error');
        } else {
            await updateCompanyFunction();
        }
    };

    let cropComponent = null;
    if (selectedImage && isCropping) {
        cropComponent = (
            <CropComponent
                key={selectedImage || new Date().getTime()}
                src={selectedImage}
                imgRef={imgRef}
                previewCanvasRef={previewCanvasRef}
                onCrop={canvasPreview}
                onImageCropped={handleCropConfirmation}
            />
        );
    }

    if (isUpdateLoading) {
        return <LoadingSpinner />;
    }

    const submitButtonText = 'Update Profile';
    return (
        <CompanyInfosBox>
            <Typography variant="h4" gutterBottom>
                Update Company Profile
            </Typography>
            <LogoBox>
                <Typography variant="h5">Company Logo:</Typography>
                <StyledStepperBoxContainer>
                    <DragDropBox
                        isDragging={isDragging}
                        onDragEnter={handleDragEnter}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        isFileValid={isFileValid}
                    >
                        <UploadBoxContentRenderer
                            isLoading={isLoading}
                            companyLogo={croppedPreviewUrl || fieldsData.logo}
                            cropComponent={cropComponent}
                        />
                    </DragDropBox>
                    <IconButtonBox>
                        <StartIconButton
                            text="Crop"
                            startIcon={<CropFreeIcon />}
                            variant="contained"
                        >
                            <input type="file" hidden onChange={handleUploadButton} />
                        </StartIconButton>

                        {croppedImageBlob && (
                            <StartIconButton
                                text="Upload"
                                onClick={handleCroppedImage}
                                startIcon={<CloudUploadIcon />}
                                variant="contained"
                            />
                        )}
                    </IconButtonBox>
                </StyledStepperBoxContainer>
            </LogoBox>
            <ReusableForm
                excludeFields={['logo']}
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
        </CompanyInfosBox>
    );
};

export default UpdateCompanyProfileForm;
