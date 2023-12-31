import React, { useContext } from 'react';

import Button from '@mui/material/Button';
import styled from 'styled-components';

import { NewFormGlobalContext } from '@/pages/CreateFormPage/components/CreateForm/context/NewFormGlobalContext';

const StyledAddQuestionButton = styled(Button)`
    width: 100%;
    margin-top: 20px;
`;

const AddQuestion = () => {
    const { dispatch } = useContext(NewFormGlobalContext);
    const handleAddQuestion = () => {
        dispatch({
            type: 'CHANGE_QUESTION_NUMBER',
            payload: 1,
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
