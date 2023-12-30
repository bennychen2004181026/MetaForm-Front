import React from 'react';

import { Container } from '@mui/material';

import ConditionalSectionContainer from '@/pages/CreateFormPage/components/CreateForm/components/ConditionalSectionContainer';
import FormQuestions from '@/pages/CreateFormPage/components/CreateForm/components/FormQuestions';
import FormTitleField from '@/pages/CreateFormPage/components/CreateForm/components/FormTitleField';
import { NewQuestionContext } from '@/pages/CreateFormPage/components/NewQuestion/context/NewQuestionContext';

const CreateForm = () => {
    return (
        <Container>
            <ConditionalSectionContainer backgroundColor="#03787c">
                <FormTitleField />
            </ConditionalSectionContainer>
            <ConditionalSectionContainer backgroundColor="#03787c">
                <FormQuestions />
            </ConditionalSectionContainer>
        </Container>
    );
};
export default CreateForm;
