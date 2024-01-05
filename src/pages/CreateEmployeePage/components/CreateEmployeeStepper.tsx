import React, { useState } from 'react';

import { Box, Button, Step, StepLabel, Stepper } from '@mui/material';
import styled from 'styled-components';

import SubmitButton from '@/components/SubmitButton';
import useForm, { IField } from '@/hooks/useForm';
import StepContentOne from '@/pages/CreateEmployeePage/components/StepContentOne';
import StepContentThree from '@/pages/CreateEmployeePage/components/StepContentThree';
import StepContentTwo from '@/pages/CreateEmployeePage/components/StepContentTwo';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

const steps = ['Employee information', 'Create password', 'Review and submit'];

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

const CreateEmployeeStepper: React.FC = () => {
    const showSnackbar = useSnackbarHelper();
    const [activeStep, setActiveStep] = useState(0);
    const fields: IField[] = [
        {
            id: 1,
            label: 'First Name',
            key: 'firstName',
            type: 'input',
            value: '',
            validationRules: [
                { key: 'isRequired', additionalData: 'First name' },
                { key: 'validateName', additionalData: 'First name' },
            ],
        },
        {
            id: 2,
            label: 'Last Name',
            key: 'lastName',
            type: 'input',
            value: '',
            validationRules: [{ key: 'validateName', additionalData: 'Last name' }],
        },
        {
            id: 3,
            label: 'User name',
            key: 'username',
            type: 'input',
            value: '',
            validationRules: [
                { key: 'isRequired', additionalData: 'Username' },
                { key: 'validateUsername', additionalData: 'username' },
            ],
        },
        {
            id: 4,
            label: 'Password',
            key: 'password',
            type: 'input',
            value: '',
            validationRules: [
                { key: 'isRequired', additionalData: 'Password' },
                { key: 'validatePassword' },
            ],
        },
        {
            id: 5,
            label: 'Confirm Password',
            key: 'confirmPassword',
            type: 'input',
            value: '',
            validationRules: [
                { key: 'isRequired', additionalData: 'Confirm Password' },
                { key: 'validateConfirmPassword', additionalData: 'password' },
            ],
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
                return (
                    <StepContentTwo
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

export default CreateEmployeeStepper;
