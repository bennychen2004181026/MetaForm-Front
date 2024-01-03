import React from 'react';

import { Container } from '@mui/material';
import styled from 'styled-components';

import ConditionalSectionContainer from '@/pages/CreateFormPage/components/CreateForm/components/ConditionalSectionContainer';
import FormQuestions from '@/pages/CreateFormPage/components/CreateForm/components/FormQuestions';
import FormTitleField from '@/pages/CreateFormPage/components/CreateForm/components/FormTitleField';
import { GlobalState } from '@/pages/CreateFormPage/components/NewQuestion/components/context/NewQuestionContext';
import TextEditor from '@/pages/CreateFormPage/components/NewQuestion/components/TextEditor';

const StyledCreateForm = styled(Container)`
    font-family: 'Noto Sans', sans-serif;
`;
const CreateForm = () => {
    return (
        <StyledCreateForm>
            <ConditionalSectionContainer backgroundColor="#03787c">
                <GlobalState>
                    <FormQuestions />
                </GlobalState>
            </ConditionalSectionContainer>
        </StyledCreateForm>
    );
};
export default CreateForm;
