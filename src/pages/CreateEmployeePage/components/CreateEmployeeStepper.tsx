import React, { useState } from 'react';

import { Box, Button, Step, StepLabel, Stepper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import SubmitButton from '@/components/SubmitButton';
import Role from '@/constants/roles';
import { useAppDispatch } from '@/hooks/redux';
import useForm, { IField } from '@/hooks/useForm';
import { IAddEmployeeRequest, IAddEmployeeResponse, ICompany } from '@/interfaces/ICompany';
import { IUser } from '@/interfaces/IUser';
import LoadingSpinner from '@/layouts/LoadingSpinner';
import StepContentOne from '@/pages/CreateEmployeePage/components/StepContentOne';
import StepContentThree from '@/pages/CreateEmployeePage/components/StepContentThree';
import StepContentTwo from '@/pages/CreateEmployeePage/components/StepContentTwo';
import companyApis from '@/services/company';
import { setCredentials } from '@/store/slices/auth/authSlice';
import { setCompanyInfo } from '@/store/slices/company/companySlice';
import ApiErrorHelper from '@/utils/ApiErrorHelper';
import useSnackbarHelper from '@/utils/useSnackbarHelper';

const steps = ['Employee information', 'Create password', 'Review and submit'];

const StyledButtonsBox = styled(Box)`
    display: flex;
    flex-direction: row;
    padding-top: 16px;
    justify-content: space-between;
    max-width: 400px;
    width: 50vw;
    align-items: center;
    @media (max-width: 600px) {
        width: 80vw;
    }
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

const StepContentBox = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px 0 0;
    @media (max-width: 768px) {
        padding: 50px 0 0;
    }
`;

const StyledSubmitButtonBox = styled(Box)`
    padding: 6px 12px;
    margin-left: 8px;
`;

const CreateEmployeeStepper: React.FC = () => {
    const showSnackbar = useSnackbarHelper();
    const { companyId, token } = useParams<{ companyId?: string; token?: string }>();
    const { useAddEmployeeMutation } = companyApis;
    const [addEmployee, { isLoading }] = useAddEmployeeMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
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
            type: 'password',
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
            type: 'password',
            value: '',
            validationRules: [
                { key: 'isRequired', additionalData: 'Confirm Password' },
                { key: 'validateConfirmPassword', additionalData: 'password' },
            ],
        },
        {
            id: 6,
            label: 'Token',
            key: 'token',
            type: 'token',
            value: token,
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
        validateFieldsByStep,
    } = useForm(fields);

    const stepFieldKeys = [
        ['firstName', 'lastName', 'username'],
        ['password', 'confirmPassword'],
    ];
    const isLastStep = activeStep === steps.length - 1;
    const currentStepKeys = stepFieldKeys[activeStep] || [];
    const handleNext = () => {
        if (!validateFieldsByStep(currentStepKeys)) {
            showSnackbar(
                'Please fill the required valid fields in the current step first',
                'error',
            );
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        setFieldsData({
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
        });
    };

    const addEmployeeFunction = async () => {
        try {
            const response: IAddEmployeeResponse = await addEmployee({
                companyId,
                formData: fieldsData,
            } as IAddEmployeeRequest).unwrap();

            const { message, companyJson, userJson, loginToken } = response;
            const { email, role, company, _id: userId, isActive, isAccountComplete } = userJson;
            const {
                _id,
                companyName,
                abn,
                logo,
                description,
                industry,
                isActive: isCompanyActive,
                address,
                employees,
            } = companyJson as ICompany;

            dispatch(
                setCredentials({
                    user: userJson as IUser,
                    token: loginToken,
                    email: email ?? null,
                    role: (role as Role) ?? null,
                    company: company ?? null,
                    userId: userId ?? null,
                    companyInfo: (companyJson as ICompany) ?? null,
                    isAccountComplete: isAccountComplete ?? false,
                    isActive: isActive ?? false,
                }),
            );

            dispatch(
                setCompanyInfo({
                    companyId: _id ?? null,
                    companyName: companyName ?? null,
                    abn: abn ?? null,
                    logo: logo ?? null,
                    description: description ?? null,
                    industry: industry ?? null,
                    isActive: isCompanyActive ?? false,
                    employeesIds: Array.isArray(employees) && employees.length > 0 ? employees : [],
                    address: address ?? null,
                }),
            );

            showSnackbar(`${message}`, 'success');
            navigate('/forms');
        } catch (error) {
            ApiErrorHelper(error, showSnackbar);
        }
    };

    const handleSubmit = async () => {
        if (!validateAllFields()) {
            showSnackbar('Please fill all the required valid fields first', 'error');
        } else {
            await addEmployeeFunction();
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

    if (isLoading) {
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
                <StepContentBox>
                    {getStepContent(activeStep)}
                    <StyledButtonsBox>
                        <BackButton onClick={handleBack} disabled={activeStep === 0}>
                            Back
                        </BackButton>

                        {isLastStep && <ResetButton onClick={handleReset}>Reset</ResetButton>}
                        {isLastStep ? (
                            <StyledSubmitButtonBox>
                                <SubmitButton
                                    isValid={isValid()}
                                    text="Create"
                                    handleSubmit={handleSubmit}
                                />
                            </StyledSubmitButtonBox>
                        ) : (
                            <NextButton onClick={handleNext}>Next</NextButton>
                        )}
                    </StyledButtonsBox>
                </StepContentBox>
            </div>
        </Box>
    );
};

export default CreateEmployeeStepper;
