import React, { useContext } from 'react';

import Button from '@mui/material/Button';
import styled from 'styled-components';

import { NewFormGlobalContext } from '@/pages/CreateFormPage/components/CreateForm/context/NewFormGlobalContext';
import { initQuestionState } from '@/pages/CreateFormPage/components/CreateForm/initForm';

const StyledAddQuestionButton = styled(Button)`
    width: 100%;
    margin-top: 20px;
`;

const AddQuestion = () => {
    const { dispatch } = useContext(NewFormGlobalContext);
    const handleAddQuestion = () => {
        dispatch({
            type: 'ADD_QUESTION',
            payload: {
                ...initQuestionState,
                questionId: Math.floor(Math.random() * 10000).toString(),
            },
        });
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
