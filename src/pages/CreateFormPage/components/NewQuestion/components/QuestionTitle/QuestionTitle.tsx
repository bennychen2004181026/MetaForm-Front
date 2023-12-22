import React, { useContext } from 'react';

import ImageIcon from '@mui/icons-material/Image';
import { Box, IconButton, TextField } from '@mui/material';
import styled from 'styled-components';

import { NewQuestionContext } from '@/pages/CreateFormPage/components/NewQuestion/components/MultiChoiceQuestion/context/GlobalState';
import QuestionTypeSelector from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTypeSelector';

const NewQuestionTitleBox = styled(Box)({
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
    flexBasis: '200px',
    gap: '1em',
    marginBottom: '2em',
});
const StyledQuestionTitle = styled(Box)({
    flexGrow: 1,
});

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
        <NewQuestionTitleBox>
            <StyledQuestionTitle>
                <TextField
                    required
                    id="form-question-title"
                    defaultValue={title}
                    variant="filled"
                    type="text"
                    onBlur={onBlur}
                    maxRows={1}
                    fullWidth
                />
            </StyledQuestionTitle>
            <IconButton>
                <ImageIcon fontSize="large" />
            </IconButton>
            <QuestionTypeSelector />
        </NewQuestionTitleBox>
    );
};

export default QuestionTitle;
