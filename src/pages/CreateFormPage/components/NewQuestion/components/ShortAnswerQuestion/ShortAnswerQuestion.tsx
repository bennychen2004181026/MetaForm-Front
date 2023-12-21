import React from 'react';

import { TextField } from '@mui/material';

const ShortAnswerQuestion = () => {
    return (
        <TextField
            id="short-answer-question-textfield"
            defaultValue="Short answer Text"
            variant="standard"
            margin="normal"
            disabled
            fullWidth
        />
    );
};

export default ShortAnswerQuestion;
