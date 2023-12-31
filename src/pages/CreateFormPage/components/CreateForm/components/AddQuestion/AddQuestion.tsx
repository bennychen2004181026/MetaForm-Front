import React, { useContext } from 'react';

import Button from '@mui/material/Button';
import styled from 'styled-components';

import { IQuestion } from '@/interfaces/CreateForm.interface';
import { NewFormGlobalContext } from '@/pages/CreateFormPage/components/CreateForm/context/NewFormGlobalContext';
import { initQuestionState } from '@/pages/CreateFormPage/components/CreateForm/initForm';

const StyledAddQuestionButton = styled(Button)`
    width: 100%;
    margin-top: 20px;
`;
const AddQuestion = () => {
    const { dispatch, state } = useContext(NewFormGlobalContext);
    const handleAddQuestion = () => {
        const newQuestion: IQuestion = {
            ...initQuestionState,
            questionId: Math.floor(Math.random() * 10000).toString(),
        };
        console.log(newQuestion);
        dispatch({
            type: 'ADD_QUESTION',
            payload: newQuestion,
        });
        console.log(state);
    };

    return (
        <StyledAddQuestionButton
            onClick={handleAddQuestion}
            aria-label="Add New Question"
            variant="contained"
        >
            Add Question
        </StyledAddQuestionButton>
    );
};

export default AddQuestion;
