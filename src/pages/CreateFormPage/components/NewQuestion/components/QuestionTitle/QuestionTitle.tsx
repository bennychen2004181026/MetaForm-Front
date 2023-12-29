import React, { useContext } from 'react';

import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { Box, IconButton } from '@mui/material';
import styled from 'styled-components';

import ImageContainer from '../ImageContainer';

import { IImage } from '@/interfaces/IQuestion';
import { NewQuestionContext } from '@/pages/CreateFormPage/components/NewQuestion/components/context/NewQuestionContext';
import ImageUploadDialog from '@/pages/CreateFormPage/components/NewQuestion/components/ImageUploader/ImageUploadDialog';
import QuestionTypeSelector from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTypeSelector';
import TextEditor from '@/pages/CreateFormPage/components/NewQuestion/components/TextEditor/TextEditor';

const NewQuestionTitleBox = styled(Box)`
    text-align: center;
    display: flex;
    flex-direction: row;
    flex-basis: 200px;
    gap: 1em;
    margin-bottom: 2em;
    align-items: flex-start;
`;
const StyledQuestionTitle = styled(Box)`
    flex-grow: 1;
`;
const QuestionTitle = () => {
    const { state, dispatch } = useContext(NewQuestionContext);
    const { title, questionId } = state;
    const [open, setOpen] = React.useState(false);
    const onTitleChange = (newTitle: string) => {
        dispatch({
            type: 'SAVE_TITLE',
            payload: newTitle,
        });
    };

    const handleClose = () => {
        setOpen(false);
    };
    const insertImage = (image: IImage) => {
        dispatch({
            type: 'INSERT_TITLE_IMAGE',
            payload: image,
        });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <NewQuestionTitleBox>
                <StyledQuestionTitle>
                    <TextEditor onTitleChange={onTitleChange} />
                </StyledQuestionTitle>
                <IconButton onClick={handleClickOpen}>
                    <ImageOutlinedIcon fontSize="large" />
                </IconButton>
                <QuestionTypeSelector />
                <ImageUploadDialog
                    key={questionId}
                    open={open}
                    insertImage={insertImage}
                    onClose={handleClose}
                />
            </NewQuestionTitleBox>
            {title.image && <ImageContainer large image={title.image} />}
        </>
    );
};

export default QuestionTitle;
