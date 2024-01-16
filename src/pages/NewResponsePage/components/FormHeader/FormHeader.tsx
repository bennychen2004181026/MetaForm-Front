import React from 'react';

import { useSelector } from 'react-redux';

import ConditionalSectionContainer from '@/pages/CreateFormPage/components/CreateForm/components/ConditionalSectionContainer';
import { getForm } from '@/store/slices/formResponse/formResponseSlice';

const FormHeader = () => {
    const form = useSelector(getForm);
    let title = '';
    let description = '';
    if (form !== null) {
        title = form.title;
        description = form.description;
    }
    return (
        <ConditionalSectionContainer style={{ width: '1130px' }} elevation={1} square={false}>
            <h2>{title}</h2>
            <p>{description}</p>
        </ConditionalSectionContainer>
    );
};

export default FormHeader;
