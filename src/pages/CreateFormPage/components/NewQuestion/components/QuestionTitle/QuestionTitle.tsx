import React, { useContext } from 'react';

import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { Box, IconButton } from '@mui/material';
import styled from 'styled-components';

import ImageContainer from '../ImageContainer';

import { IImage } from '@/interfaces/CreateForm.interface';
import ImageUploadDialog from '@/pages/CreateFormPage/components/NewQuestion/components/ImageUploader/ImageUploadDialog';
import QuestionTypeSelector from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTypeSelector';
import TextEditor from '@/pages/CreateFormPage/components/NewQuestion/components/TextEditor/TextEditor';
import { NewQuestionContext } from '@/pages/CreateFormPage/components/NewQuestion/context/NewQuestionContext';

const NewQuestionTitleBox = styled(Box)`
    text-align: center;
    display: flex;
    flex-direction: row;
    flex-basis: 200px;
    gap: 1em;
    justify-content: space-between;
    align-items: flex-start;
`;
const StyledQuestionTitle = styled(Box)`
    flex-grow: 1;
`;
const StyledTitleImageIconBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
`;
const StyledQuestionTypeSelector = styled(QuestionTypeSelector)`
    width: 150px;
    flex-grow: 1;
`;
const QuestionTitle = () => {
    const { state, dispatch } = useContext(NewQuestionContext);
    const { title, questionType } = state;
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
                    <StyledQuestionTitle>
                        <TextEditor onTitleChange={onTitleChange} value={title.content} />
                    </StyledQuestionTitle>
                    <IconButton onClick={handleClickOpen}>
                        <ImageOutlinedIcon fontSize="large" />
                    </IconButton>
                </StyledTitleImageIconBox>
                <StyledQuestionTypeSelector />
                <ImageUploadDialog
                    key={questionType}
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
