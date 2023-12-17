import React from 'react';

import { Container } from '@mui/material';

import ConditionalSectionContainer from '@/pages/CreateFormPage/components/CreateForm/components/ConditionalSectionContainer';
import FormTitleField from '@/pages/CreateFormPage/components/CreateForm/components/FormTitleField';
import NewQuestion from '@/pages/CreateFormPage/components/NewQuestion';
import MuitiChoiceQuestion from '@/pages/CreateFormPage/components/NewQuestion/components/MultiChoiceQuestion/MuitiChoiceQuestion';

const CreateForm = () => {
    return (
        <Container sx={{ display: 'flex', flexDirection: 'column' }}>
            <ConditionalSectionContainer backgroundColor="#e0e0e0">
                <FormTitleField />
            </ConditionalSectionContainer>
            <ConditionalSectionContainer>
                <NewQuestion>
                    <MuitiChoiceQuestion isCheckbox />
                </NewQuestion>
            </ConditionalSectionContainer>
        </Container>
    );
};
export default CreateForm;
