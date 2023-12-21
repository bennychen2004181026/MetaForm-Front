import React, { useContext } from 'react';

import TextField from '@mui/material/TextField';

import { NewQuestionContext } from '@/pages/CreateFormPage/components/NewQuestion/components/MultiChoiceQuestion/context/GlobalState';

const QuestionTitle = () => {
    const { state } = useContext(NewQuestionContext);
    const { title } = state;
    const { dispatch } = useContext(NewQuestionContext);

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
