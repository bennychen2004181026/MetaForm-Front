import React from 'react';

import { Container } from '@mui/material';

import ConditionalSectionContainer from '@/pages/CreateFormPage/components/CreateForm/components/ConditionalSectionContainer';
import FormTitleField from '@/pages/CreateFormPage/components/CreateForm/components/FormTitleField';
import NewQuestion from '@/pages/CreateFormPage/components/NewQuestion';
import {
    GlobalState,
    NewQuestionContext,
} from '@/pages/CreateFormPage/components/NewQuestion/components/MultiChoiceQuestion/context/GlobalState';

const CreateForm = () => {
    return (
        <Container sx={{ display: 'flex', flexDirection: 'column' }}>
            <ConditionalSectionContainer backgroundColor="#03787c">
                <FormTitleField />
            </ConditionalSectionContainer>
            <ConditionalSectionContainer>
                <GlobalState>
                    <NewQuestion />
                </GlobalState>
            </ConditionalSectionContainer>
        </Container>
    );
};
export default CreateForm;
