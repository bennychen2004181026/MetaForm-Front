import React from 'react';

import styled from 'styled-components';

import CustomTypography from '@/components/CustomTypography';
import ReusableForm from '@/components/ReusableForm';
import { IField } from '@/hooks/useForm';

const StyledStepperBoxContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    width: 80vw;
    max-width: 1000px;
    height: 70vh;
    max-height: 500px;
    flex-direction: column;
`;

const TitleContainer = styled.div`
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
`;
interface StepContentOneProps {
    formFields: IField[];
    fieldsData: Record<string, string>;
    onDataChange: (
        field: string,
    ) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string) => void;
    fieldsFocus: Record<string, boolean>;
    errors: Record<string, string>;
    onFieldsBlur: (field: string) => () => void;
    isValid: () => boolean;
    showSubmitButton: boolean;
}

const StepContentOne: React.FC<StepContentOneProps> = ({
    formFields,
    fieldsData,
    onDataChange,
    fieldsFocus,
    errors,
    onFieldsBlur,
    isValid,
    showSubmitButton,
}) => {
    return (
        <StyledStepperBoxContainer>
            <TitleContainer>
                <CustomTypography variant="h5" text="Create Employee Profile" />
            </TitleContainer>
            <ReusableForm
                excludeFields={['password', 'confirmPassword', 'token']}
                formFields={formFields}
                fieldsData={fieldsData}
                onDataChange={onDataChange}
                fieldsFocus={fieldsFocus}
                errors={errors}
                onFieldsBlur={onFieldsBlur}
                isValid={isValid}
                showSubmitButton={showSubmitButton}
            />
        </StyledStepperBoxContainer>
    );
};

export default StepContentOne;
