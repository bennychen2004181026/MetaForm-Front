import React, { useContext, useState } from 'react';

import TextField from '@mui/material/TextField';

import { MuitichoiceContext } from '@/pages/CreateFormPage/components/NewQuestion/components/MultiChoiceQuestion/context/GlobalState';

const QuestionTitle = () => {
    const { state } = useContext(MuitichoiceContext);
    const { title } = state;
    const { dispatch } = useContext(MuitichoiceContext);

    const onBlur = () => {
        dispatch({
            type: 'SAVE_TITLE',
            payload: title,
        });
    };
    return (
        <TextField
            required
            id="form-question-title"
            defaultValue={title}
            variant="outlined"
            margin="normal"
            type="text"
            onBlur={onBlur}
            maxRows={1}
            fullWidth
        />
    );
};

export default QuestionTitle;
