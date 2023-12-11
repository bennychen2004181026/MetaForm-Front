import React, { useState } from 'react';

import { Box, Button, Step, StepLabel, Stepper } from '@mui/material';
import styled from 'styled-components';

import SubmitButton from '@/components/SubmitButton';
import useForm, { IField } from '@/hooks/useForm';
import StepContentOne from '@/pages/CompanyProfileStepperPage/components/StepContentOne';
import StepContentThree from '@/pages/CompanyProfileStepperPage/components/StepContentThree';
import StepContentTwo from '@/pages/CompanyProfileStepperPage/components/StepContentTwo';
import industries from '@/pages/CompanyRegisterPage/industryOptions';
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
    background-color: '#1976d2';
    color: white;
    &:hover {
        background-color: #115293;
        color: white;
    }
    text-transform: none;
    padding: 6px 12px;
    margin-left: 8px;
`;

const NextButton = styled(Button)`
    background-color: '#1976d2';
    color: white;
    &:hover {
        background-color: #115293;
        color: white;
    }
    text-transform: none;
    padding: 6px 12px;
`;

const CompanyProfileStepper: React.FC = () => {
    const showSnackbar = useSnackbarHelper();
    const [activeStep, setActiveStep] = useState(0);
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

    const handleSubmit = async () => {
        if (!validateAllFields()) {
            showSnackbar('Please fill all the required valid fields first', 'error');
        } else {
            showSnackbar('You had successfully created account', 'success');
        }
    };

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
                return <StepContentTwo fieldsData={fieldsData} onDataChange={onDataChange} />;
            case 2:
                return <StepContentThree fieldsData={fieldsData} />;
            default:
                throw new Error('Invalid step index');
        }
    };

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
