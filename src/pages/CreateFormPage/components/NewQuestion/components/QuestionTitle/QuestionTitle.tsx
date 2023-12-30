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
    justify-content: space-between;
    align-items: flex-start;
`;

const StyledTitleImageIconBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
`;
const StyledQuestionTypeSelector = styled(QuestionTypeSelector)`
    width: 150px;
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
                <StyledTitleImageIconBox>
                    <TextEditor onTitleChange={onTitleChange} />
                    <IconButton onClick={handleClickOpen}>
                        <ImageOutlinedIcon fontSize="large" />
                    </IconButton>
                </StyledTitleImageIconBox>
                <StyledQuestionTypeSelector />
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
