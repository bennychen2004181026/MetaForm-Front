import React, { useContext } from 'react';

import AddImageIcon from '@mui/icons-material/AddPhotoAlternate';
import { Box, IconButton } from '@mui/material';
import styled from 'styled-components';

import ImageUploadDialog from '@/pages/CreateFormPage/components/NewQuestion/components/ImageUploader/ImageUploadDialog';
import { NewQuestionContext } from '@/pages/CreateFormPage/components/NewQuestion/components/MultiChoiceQuestion/context/NewQuestionContext';
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
    const [open, setOpen] = React.useState(false);
    const { dispatch } = useContext(NewQuestionContext);
    const onBlur = () => {
        dispatch({
            type: 'SAVE_TITLE',
            payload: title,
        });
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <NewQuestionTitleBox>
            <StyledQuestionTitle>
                <TextEditor />
            </StyledQuestionTitle>
            <IconButton onClick={handleClickOpen}>
                <AddImageIcon fontSize="large" />
            </IconButton>
            <QuestionTypeSelector />
            <ImageUploadDialog open={open} onClose={handleClose} />
        </NewQuestionTitleBox>
    );
};

export default QuestionTitle;
