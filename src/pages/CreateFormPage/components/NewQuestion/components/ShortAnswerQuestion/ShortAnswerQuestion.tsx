import React from 'react';

import { IconButton, TextField } from '@mui/material';

import QuestionContainer from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionContainer';
import QuestionTitle from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTitle';

const ShortAnswerQuestion = () => {
    return (
        <QuestionContainer>
            <QuestionTitle />
            <TextField
                id="short-answer-question-textfield"
                defaultValue="Short answer Text"
                variant="standard"
                margin="normal"
                disabled
                fullWidth
            />
        </QuestionContainer>
    );
};

export default ShortAnswerQuestion;
