import React from 'react';

import ReusableForm from '@/components/ReusableForm';
import { IField } from '@/hooks/useForm1';

interface StepContentOneProps {
    formFields: IField[];
    data: Record<string, string>;
    onChange: (field: string) => React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    focus: Record<string, boolean>;
    errors: Record<string, string>;
    onBlur: (field: string) => () => void;
    isValid: () => boolean;
    showSubmitButton: boolean;
}

const StepContentOne: React.FC<StepContentOneProps> = ({
    formFields,
    data,
    onChange,
    focus,
    errors,
    onBlur,
    isValid,
    showSubmitButton,
}) => {
    return (
        <ReusableForm
            // Does not display companyLogo field
            excludeFields={['companyLogo']}
            formFields={formFields}
            data={data}
            onChange={onChange}
            focus={focus}
            errors={errors}
            onBlur={onBlur}
            isValid={isValid}
            showSubmitButton={showSubmitButton}
        />
    );
};

export default StepContentOne;
