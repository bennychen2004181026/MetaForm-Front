import React from 'react';

import ConditionalSectionContainer from '@/pages/CreateFormPage/components/CreateForm/components/ConditionalSectionContainer';

const FormHeader = () => {
    return (
        <ConditionalSectionContainer elevation={1} square={false}>
            <h2>h1. Heading</h2>
            <p>Description</p>
        </ConditionalSectionContainer>
    );
};

export default FormHeader;
