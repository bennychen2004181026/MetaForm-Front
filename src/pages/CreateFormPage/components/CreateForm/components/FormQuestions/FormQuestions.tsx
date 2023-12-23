import React from 'react';

import { Container } from '@mui/material';

import ConditionalSectionContainer from '@/pages/CreateFormPage/components/CreateForm/components/ConditionalSectionContainer';
import NewQuestion from '@/pages/CreateFormPage/components/NewQuestion';

const FormQuestions = () => {
    return (
        <Container>
            <ConditionalSectionContainer elevation={1} square={false}>
                <NewQuestion />
            </ConditionalSectionContainer>
            <ConditionalSectionContainer elevation={1} square={false}>
                <NewQuestion />
            </ConditionalSectionContainer>
            <ConditionalSectionContainer elevation={1} square={false}>
                <NewQuestion />
            </ConditionalSectionContainer>
        </Container>
    );
};

export default FormQuestions;
