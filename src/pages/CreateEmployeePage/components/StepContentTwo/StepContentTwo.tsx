import React from 'react';

import styled from 'styled-components';

import ReusableForm from '@/components/ReusableForm';
import { IField } from '@/hooks/useForm';

const StyledStepperBoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    @media (min-width: 768px) {
        flex-direction: row;
    }
    width: 360px;
    height: 260px;
    @media (min-width: 600px) {
        width: 500px;
        height: 400px;
    }
    @media (min-width: 960px) {
        width: 600px;
        height: 500px;
    }
    justify-content: space-between;
    align-items: center;
    margin-top: 1px;
    gap: 1rem;
`;

interface StepContentTwoProps {
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

const StepContentTwo: React.FC<StepContentTwoProps> = ({
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
            <ReusableForm
                excludeFields={['firstName', 'lastName', 'username']}
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

export default StepContentTwo;
