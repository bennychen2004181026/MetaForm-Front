import React from 'react';

import ReusableForm from '@/components/ReusableForm';
import { IField } from '@/hooks/useForm';

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
    );
};

export default StepContentOne;
