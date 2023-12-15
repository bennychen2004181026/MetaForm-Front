import React from 'react';

import { Container } from '@mui/material';
import Paper from '@mui/material/Paper';

import ConditionalSectionContainer from '@/pages/CreateFormPage/components/CreateForm/components/ConditionalSectionContainer';
import FormTitleField from '@/pages/CreateFormPage/components/CreateForm/components/FormTitleField';
import MuitiChoiceQuestion from '@/pages/CreateFormPage/components/NewQuestion/components/MultiChoiceQuestion';

const CreateForm = () => {
    return (
        <Container sx={{ display: 'flex', flexDirection: 'column' }}>
            <ConditionalSectionContainer backgroundColor="#e0e0e0">
                <FormTitleField />
            </ConditionalSectionContainer>
            <ConditionalSectionContainer>
                <MuitiChoiceQuestion />
            </ConditionalSectionContainer>
        </Container>
    );
};
export default CreateForm;
