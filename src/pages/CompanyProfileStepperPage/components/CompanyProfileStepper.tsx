import React, { useState } from 'react';

import { Box, Button, Step, StepLabel, Stepper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import SubmitButton from '@/components/SubmitButton';
import { useAppDispatch } from '@/hooks/redux';
import useForm, { IField } from '@/hooks/useForm';
import useUploadImage from '@/hooks/useUploadImage';
import { ApiError } from '@/interfaces/ApiError';
import { ICompany } from '@/interfaces/ICompany';
import { ICompleteAccountRequest, ICompleteAccountResponse, IUser } from '@/interfaces/IUser';
import Role from '@/interfaces/UserEnum';
import LoadingSpinner from '@/layouts/LoadingSpinner';
import StepContentOne from '@/pages/CompanyProfileStepperPage/components/StepContentOne';
import StepContentThree from '@/pages/CompanyProfileStepperPage/components/StepContentThree';
import StepContentTwo from '@/pages/CompanyProfileStepperPage/components/StepContentTwo';
import industries from '@/pages/CompanyRegisterPage/industryOptions';
import userApis from '@/services/Auth/user';
import { setCredentials } from '@/store/slices/auth/authSlice';
import { setCompanyInfo } from '@/store/slices/company/companySlice';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

const steps = ['Enter company profile', 'Upload the company logo', 'Review and submit'];

const StyledButtonsBox = styled(Box)`
    display: flex;
    flex-direction: row;
    padding-top: 16px;
    justify-content: space-around;
`;

const BackButton = styled(Button)`
    background-color: LightSalmon;
    color: black;
    &:hover {
        background-color: gray;
        color: white;
    }
    &:disabled {
        background-color: lightgray;
        color: darkgray;
    }
    text-transform: none;
    margin-right: 8px;
    padding: 6px 12px;
`;

const ResetButton = styled(Button)`
    background-color: #1976d2;
    color: white;
    &:hover {
        background-color: #1565c0;
        color: white;
    }
    text-transform: none;
    padding: 6px 12px;
    margin-left: 8px;
`;

const NextButton = styled(Button)`
    background-color: #1976d2;
    color: white;
    &:hover {
        background-color: #1565c0;
        color: white;
    }
    text-transform: none;
    padding: 6px 12px;
`;

interface CompanyProfileStepperProps {
    userId: string | undefined;
}

const CompanyProfileStepper: React.FC<CompanyProfileStepperProps> = ({ userId }) => {
    const showSnackbar = useSnackbarHelper();
    const [activeStep, setActiveStep] = useState(0);
    const { useCompleteAccountMutation } = userApis;
    const [isLoading, setIsLoading] = useState(false);
    const [completeAccount, { isLoading: isSubmitLoading }] = useCompleteAccountMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

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
        setFieldsData,
    } = useForm(fields);

    const isLastStep = activeStep === steps.length - 1;
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        setFieldsData({
            companyName: '',
            industry: '',
            abn: '',
            companyLogo: '',
        });
    };

    const completeAccountFunction = async () => {
        try {
            const response: ICompleteAccountResponse = await completeAccount({
                userId,
                formData: fieldsData,
            } as ICompleteAccountRequest).unwrap();

            const { message, user, token, isAccountComplete, companyInfo } = response;
            const { email, role, company, _id, isActive } = user;
            const {
                _id: companyId,
                companyName,
                abn,
                logo,
                description,
                industry,
                isActive: isCompanyActive,
                address,
                employees,
            } = companyInfo as ICompany;

            dispatch(
                setCredentials({
                    user: user as IUser,
                    token,
                    email: email ?? null,
                    role: (role as Role) ?? null,
                    company: company ?? null,
                    userId: _id ?? null,
                    companyInfo: (companyInfo as ICompany) ?? null,
                    isAccountComplete: isAccountComplete ?? false,
                    isActive: isActive ?? false,
                }),
            );

            dispatch(
                setCompanyInfo({
                    companyId: companyId ?? null,
                    companyName: companyName ?? null,
                    abn: abn ?? null,
                    logo: logo ?? null,
                    description: description ?? null,
                    industry: industry ?? null,
                    isActive: isCompanyActive ?? false,
                    employees: Array.isArray(employees) && employees.length > 0 ? employees : [],
                    address: address ?? null,
                }),
            );

            showSnackbar(`${message}`, 'success');
            navigate('/user-dashboard');
        } catch (error) {
            const apiError = error as ApiError;
            const errorMessage =
                apiError.data?.errors?.[0].message || apiError.data || 'An unknown error occurred';

            showSnackbar(`statusCode: ${apiError.status}\nmessage: ${errorMessage}`, 'error');
        }
    };

    const handleSubmit = async () => {
        if (!validateAllFields()) {
            showSnackbar('Please fill all the required valid fields first', 'error');
        } else {
            await completeAccountFunction();
        }
    };

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
        userId,
    });

    const getStepContent = (stepIndex: number): JSX.Element => {
        switch (stepIndex) {
            case 0:
                return (
                    <StepContentOne
                        formFields={fields}
                        fieldsData={fieldsData}
                        onDataChange={onDataChange}
                        fieldsFocus={fieldsFocus}
                        errors={errors}
                        onFieldsBlur={onFieldsBlur}
                        isValid={isValid}
                        showSubmitButton={false}
                    />
                );
            case 1:
                return (
                    <StepContentTwo
                        fieldsData={fieldsData}
                        isDragging={isDragging}
                        handleDragEnter={handleDragEnter}
                        handleDragOver={handleDragOver}
                        handleDragLeave={handleDragLeave}
                        handleDrop={handleDrop}
                        handleUploadButton={handleUploadButton}
                        isLoading={isLoading}
                        selectedImage={selectedImage}
                        croppedImageBlob={croppedImageBlob}
                        handleCropConfirmation={handleCropConfirmation}
                        handleCroppedImage={handleCroppedImage}
                        isCropping={isCropping}
                        previewCanvasRef={previewCanvasRef}
                        imgRef={imgRef}
                        canvasPreview={canvasPreview}
                        croppedPreviewUrl={croppedPreviewUrl}
                        isFileValid={isFileValid}
                    />
                );
            case 2:
                return <StepContentThree fieldsData={fieldsData} />;
            default:
                throw new Error('Invalid step index');
        }
    };

    if (isSubmitLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                <div>
                    {getStepContent(activeStep)}
                    <StyledButtonsBox>
                        <BackButton onClick={handleBack} disabled={activeStep === 0}>
                            Back
                        </BackButton>

                        {isLastStep && <ResetButton onClick={handleReset}>Reset</ResetButton>}
                        {isLastStep ? (
                            <SubmitButton
                                isValid={isValid()}
                                text="Create"
                                handleSubmit={handleSubmit}
                            />
                        ) : (
                            <NextButton onClick={handleNext}>Next</NextButton>
                        )}
                    </StyledButtonsBox>
                </div>
            </div>
        </Box>
    );
};

export default CompanyProfileStepper;
