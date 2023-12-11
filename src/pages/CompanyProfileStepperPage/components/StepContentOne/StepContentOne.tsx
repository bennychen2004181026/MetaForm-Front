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
    justify-content: space-between;
    align-items: center;
    margin-top: 2px;
    gap: 2rem;
`;
interface StepContentOneProps {
    formFields: IField[];
    fieldsData: Record<string, string>;
    onDataChange: (
        field: string,
    ) => React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
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
            <ReusableForm
                // Does not display companyLogo field
                excludeFields={['companyLogo']}
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
