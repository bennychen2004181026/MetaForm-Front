import React, { useState } from 'react';

import { Box, Button, Step, StepLabel, Stepper, Typography } from '@mui/material';

import SubmitButton from '@/components/SubmitButton';
import { IField, useForm } from '@/hooks/useForm1';
import industries from '@/pages/CompanyRegisterPage/industryOptions';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

const steps = ['Enter company profile', 'Upload the company logo', 'Review and submit'];

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

    const { data, focus, errors, onChange, onBlur, isValid, validateAllFields, setData } =
        useForm(fields);

    const isLastStep = activeStep === steps.length - 1;
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        setData({
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
                        data={data}
                        onChange={onChange}
                        focus={focus}
                        errors={errors}
                        onBlur={onBlur}
                        isValid={isValid}
                        showSubmitButton={false}
                    />
                );
            case 1:
                return <StepContentTwo data={data} onChange={onChange} />;
            case 2:
                return <StepContentThree data={data} />;
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
                    <Typography sx={{ mt: 2, mb: 1 }}>{getStepContent(activeStep)}</Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            pt: 2,
                            justifyContent: 'space-around',
                        }}
                    >
                        <Button
                            sx={{
                                bgcolor: 'LightSalmon',
                                color: 'black',
                                '&:hover': { bgcolor: 'gray', color: 'white' },
                                '&:disabled': { bgcolor: 'lightgray', color: 'darkgray' },
                                textTransform: 'none',
                                marginRight: '8px',
                                padding: '6px 12px',
                            }}
                            color="inherit"
                            onClick={handleBack}
                            disabled={activeStep === 0}
                        >
                            Back
                        </Button>

                        {isLastStep && (
                            <Button
                                sx={{
                                    bgcolor: 'secondary.main',
                                    color: 'white',
                                    '&:hover': { bgcolor: 'secondary.dark', color: 'white' },
                                    textTransform: 'none',
                                    padding: '6px 12px',
                                    marginLeft: '8px',
                                }}
                                onClick={handleReset}
                            >
                                Reset
                            </Button>
                        )}
                        {isLastStep ? (
                            <SubmitButton
                                isValid={isValid()}
                                text="Create"
                                handleSubmit={handleSubmit}
                            />
                        ) : (
                            <Button
                                sx={{
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                    '&:hover': { bgcolor: 'primary.dark', color: 'white' },
                                    textTransform: 'none',
                                    padding: '6px 12px',
                                }}
                                onClick={handleNext}
                            >
                                Next
                            </Button>
                        )}
                    </Box>
                </div>
            </div>
        </Box>
    );
};

export default CompanyProfileStepper;
