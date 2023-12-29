import React, { useContext } from 'react';

import AddImageIcon from '@mui/icons-material/AddPhotoAlternate';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CloseIcon from '@mui/icons-material/Close';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { IconButton, ListItem, TextField } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import styled from 'styled-components';

import IOption from '@/interfaces/IOption';
import { IImage } from '@/interfaces/IQuestion';
import { NewQuestionContext } from '@/pages/CreateFormPage/components/NewQuestion/components/context/NewQuestionContext';
import ImageContainer from '@/pages/CreateFormPage/components/NewQuestion/components/ImageContainer';
import ImageUploadDialog from '@/pages/CreateFormPage/components/NewQuestion/components/ImageUploader/ImageUploadDialog';

const StyledImageUploadButton = styled.div`
    visibility: hidden;
    margin-right: 4rem;
`;
const StyledDragButton = styled.div`
    visibility: hidden;
`;
const StyledOptionContainer = styled.div`
    &:hover {
        & #onHoverUploadImageButton {
            visibility: visible;
        }
        & #onHoverDragIcon {
            visibility: visible;
        }
    }
`;

const Option = ({ option, checkbox = false }: { option: IOption; checkbox?: boolean }) => {
    const { dispatch, state } = useContext(NewQuestionContext);
    const [open, setOpen] = React.useState(false);
    const { options, questionId } = state;
    const handleClose = () => {
        setOpen(false);
    };
    const insertImage = (image: IImage) => {
        const index = options.findIndex((obj) => obj.id === option.id);
        options[index] = {
            ...option,
            image,
        };
        dispatch({
            type: 'SET_OPTIONS',
            payload: options,
        });
    };
    const removeImage = () => {
        const index = state.options.findIndex((obj) => obj.id === option.id);
        options[index] = {
            id: option.id,
            value: option.value,
        };
        dispatch({
            type: 'SET_OPTIONS',
            payload: options,
        });
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        dispatch({
            type: 'DELETE_OPTION',
            payload: {
                id: option.id,
                value: option.value,
            },
        });
        if (option.otherOption) {
            dispatch({
                type: 'ALLOW_OTHER_OPTION',
                payload: false,
            });
        }
    };
    return (
        <StyledOptionContainer>
            <ListItem
                secondaryAction={
                    <IconButton onClick={handleDelete}>
                        <CloseIcon />
                    </IconButton>
                }
            >
                <StyledDragButton id="onHoverDragIcon">
                    <DragIndicatorIcon />
                </StyledDragButton>
                <ListItemIcon>
                    {checkbox ? <CheckBoxOutlineBlankIcon /> : <CircleOutlinedIcon />}
                </ListItemIcon>
                {option.otherOption ? (
                    <TextField
                        id="option"
                        defaultValue={option.value}
                        variant="standard"
                        type="text"
                        disabled
                        fullWidth
                        maxRows={1}
                    />
                ) : (
                    <TextField
                        id="option"
                        defaultValue={option.value}
                        variant="standard"
                        type="text"
                        fullWidth
                        maxRows={1}
                    />
                )}

                <StyledImageUploadButton id="onHoverUploadImageButton">
                    {!option.otherOption && (
                        <IconButton onClick={handleClickOpen}>
                            <AddImageIcon fontSize="medium" />
                        </IconButton>
                    )}
                </StyledImageUploadButton>
            </ListItem>
            {option.image && <ImageContainer large={false} image={option.image} />}

            <ImageUploadDialog
                key={questionId}
                open={open}
                insertImage={insertImage}
                onClose={handleClose}
            />
        </StyledOptionContainer>
    );
};

export default Option;
