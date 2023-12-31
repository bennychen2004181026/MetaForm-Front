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
    const { dispatch: formDispatch } = useContext(NewFormGlobalContext);

    const { required, questionId } = questionState;

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
        formDispatch({
            type: 'CHANGE_QUESTION_NUMBER',
            payload: -1,
        });
    };
    return (
        <BottomToolbarContainer>
            <IconButton>
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
