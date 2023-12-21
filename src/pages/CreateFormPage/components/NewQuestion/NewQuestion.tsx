import React from 'react';

import { Box } from '@mui/material';
import styled from 'styled-components';

import SelectedQuestion from './components/SelectedQuestion/SelectedQuestion';
import QuestionTypeSelector from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTypeSelector';

const NewQuestionBox = styled(Box)({
    backgroundColor: 'aliceblue',
    color: 'darkslategray',
    padding: '2rem',
    textAlign: 'center',
});
const NewQuestion = () => {
    return (
        <NewQuestionBox>
            <SelectedQuestion />
            <QuestionTypeSelector />
        </NewQuestionBox>
    );
};
export default NewQuestion;
