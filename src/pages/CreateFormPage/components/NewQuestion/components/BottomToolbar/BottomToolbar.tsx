import React, { useContext } from 'react';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Divider, FormControlLabel, IconButton } from '@mui/material';
import Switch from '@mui/material/Switch';
import styled from 'styled-components';

import { NewFormGlobalContext } from '@/pages/CreateFormPage/components/CreateForm/context/NewFormGlobalContext';
import { NewQuestionContext } from '@/pages/CreateFormPage/components/NewQuestion/context/NewQuestionContext';

const BottomToolbarContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`;
const BottomToolbar = () => {
    const { state: questionState, dispatch: questionDispatch } = useContext(NewQuestionContext);
    const { state: formState, dispatch: formDispatch } = useContext(NewFormGlobalContext);

    const { required, questionId } = questionState;
    const { questions } = formState;

    const handleRequiredChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        questionDispatch({
            type: 'SET_REQUIRED',
            payload: event.target.checked,
        });
    };
    const handleDeleteQuestion = () => {
        formDispatch({
            type: 'DELETE_QUESTION',
            payload: questionId,
        });
    };
    const handleCopyQuestion = async () => {
        await updateCurrentQuestionInForm();
        const index = questions.indexOf(questionState);
        const newQuestion = {
            ...questionState,
            questionId: Math.floor(Math.random() * 10000).toString(),
        };
        let newQuestions = [];
        if (index === questions.length) {
            newQuestions = [...questions, newQuestion];
        } else if (index === 0) {
            newQuestions = [questions[0], newQuestion, ...questions.slice(1)];
        } else {
            newQuestions = [...questions.slice(0, index), newQuestion, ...questions.slice(index)];
        }
        formDispatch({
            type: 'SET_QUESTIONS',
            payload: newQuestions,
        });
    };
    function updateCurrentQuestionInForm() {
        const index = questions
            .map((question) => question.questionId)
            .indexOf(questionState.questionId);
        const newQuestions = [
            ...questions.slice(0, index),
            questionState,
            ...questions.slice(index + 1),
        ];
        formDispatch({
            type: 'SET_QUESTIONS',
            payload: newQuestions,
        });
    }
    return (
        <BottomToolbarContainer>
            <IconButton onClick={handleCopyQuestion}>
                <ContentCopyIcon />
            </IconButton>
            <IconButton onClick={handleDeleteQuestion}>
                <DeleteForeverIcon />
            </IconButton>
            <Divider orientation="vertical" variant="middle" flexItem sx={{ margin: '0 30px' }} />
            <FormControlLabel
                required
                control={
                    <Switch
                        checked={required}
                        onChange={handleRequiredChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                }
                label="Required"
            />
        </BottomToolbarContainer>
    );
};

export default BottomToolbar;
