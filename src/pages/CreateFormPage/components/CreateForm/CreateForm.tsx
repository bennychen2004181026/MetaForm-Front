import React from 'react';

import { Container } from '@mui/material';

import AddQuestion from './components/AddQuestion';
import SubmitButton from '@/components/SubmitButton';
import ConditionalSectionContainer from '@/pages/CreateFormPage/components/CreateForm/components/ConditionalSectionContainer';
import FormQuestions from '@/pages/CreateFormPage/components/CreateForm/components/FormQuestions';
import FormTitleField from '@/pages/CreateFormPage/components/CreateForm/components/FormTitleField';
import { GlobalNewFormState } from '@/pages/CreateFormPage/components/CreateForm/context/NewFormGlobalContext';

const CreateForm = () => {
    const handleSubmit = () => {};
    return (
        <GlobalNewFormState>
            <Container>
                <ConditionalSectionContainer backgroundColor="#03787c">
                    <FormTitleField />
                </ConditionalSectionContainer>
                <ConditionalSectionContainer backgroundColor="#03787c">
                    <FormQuestions />
                    <AddQuestion />
                </ConditionalSectionContainer>
                <SubmitButton isValid text="Create Form" handleSubmit={handleSubmit} />
            </Container>
        </GlobalNewFormState>
    );
};
export default CreateForm;
