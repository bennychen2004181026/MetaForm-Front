import React, { useContext } from 'react';

import ImageIcon from '@mui/icons-material/Image';
import { Box, IconButton, TextField } from '@mui/material';
import styled from 'styled-components';

import ImageUploadDialog from '../ImageUploader/ImageUploadDialog';

import { NewQuestionContext } from '@/pages/CreateFormPage/components/NewQuestion/components/MultiChoiceQuestion/context/GlobalState';
import QuestionTypeSelector from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTypeSelector';
import TextEditor from '@/pages/CreateFormPage/components/NewQuestion/components/TextEditor/TextEditor';

const NewQuestionTitleBox = styled(Box)`
    text-align: center;
    display: flex;
    flex-direction: row;
    flex-basis: 200px;
    gap: 1em;
    margin-bottom: 2em;
`;
const StyledQuestionTitle = styled(Box)`
    flex-grow: 1;
`;

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
                <TextEditor />
            </StyledQuestionTitle>
            <IconButton>
                <ImageIcon fontSize="large" />
            </IconButton>
            <QuestionTypeSelector />
            {/* <ImageUploadDialog /> */}
        </NewQuestionTitleBox>
    );
};

export default QuestionTitle;
