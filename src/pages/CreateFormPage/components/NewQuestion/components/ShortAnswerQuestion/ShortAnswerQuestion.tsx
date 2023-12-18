import React from 'react';

import { IconButton, TextField } from '@mui/material';

import QuestionTitle from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTitle';

const ShortAnswerQuestion = () => {
    return (
        <>
            <QuestionTitle />
            <TextField
                id="short-answer-question-textfield"
                defaultValue="Short answer Text"
                variant="standard"
                margin="normal"
                disabled
                fullWidth
            />
        </>
    );
};

export default ShortAnswerQuestion;
