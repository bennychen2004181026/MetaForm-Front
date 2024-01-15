import React, { useContext } from 'react';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CloseIcon from '@mui/icons-material/Close';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { IconButton, ListItem, TextField } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import styled from 'styled-components';

import { IOption, IUploadedFile } from '@/interfaces/CreateForm';
import ImageContainer from '@/layouts/ImageContainer';
import ImageUploadDialog from '@/pages/CreateFormPage/components/NewQuestion/components/ImageUploader/ImageUploadDialog';
import { NewQuestionContext } from '@/pages/CreateFormPage/components/NewQuestion/context/NewQuestionContext';
import OTHER_OPTION from '@/utils/OtherConstant';

const StyledButtonContainer = styled.div<{ isuploadbutton?: boolean }>`
    opacity: 0;
    margin-right: ${({ isuploadbutton }) => (isuploadbutton ? '4rem' : '0')};
    &:hover {
        opacity: 1;
    }
`;

const Option = ({ option, checkbox = false }: { option: IOption; checkbox?: boolean }) => {
    const { dispatch, state } = useContext(NewQuestionContext);
    const [open, setOpen] = React.useState(false);
    const { options, questionId } = state;
    const handleClose = () => {
        setOpen(false);
    };
    const insertImage = (image: IUploadedFile) => {
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
    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newOption = { ...option, value: e.target.value };
        dispatch({
            type: 'UPDATE_OPTION',
            payload: newOption,
        });
    };

    const handleClickImageIcon = () => {
        setOpen(true);
    };
    const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (option.value === 'Other') {
            dispatch({
                type: 'ALLOW_OTHER_OPTION',
                payload: false,
            });
        }
        dispatch({
            type: 'DELETE_OPTION',
            payload: {
                id: option.id,
                value: option.value,
            },
        });
    };
    return (
        <>
            <ListItem
                secondaryAction={
                    <IconButton onClick={handleDelete}>
                        <CloseIcon />
                    </IconButton>
                }
            >
                <StyledButtonContainer>
                    <DragIndicatorIcon />
                </StyledButtonContainer>
                <ListItemIcon>
                    {checkbox ? <CheckBoxOutlineBlankIcon /> : <CircleOutlinedIcon />}
                </ListItemIcon>
                <TextField
                    id="option"
                    defaultValue={option.value}
                    variant="standard"
                    onChange={(e) => handleOptionChange(e)}
                    type="text"
                    disabled={option.value === 'Other'}
                    fullWidth
                    maxRows={1}
                />
                {option.id !== OTHER_OPTION.id && (
                    <StyledButtonContainer isuploadbutton>
                        <IconButton onClick={handleClickImageIcon}>
                            <ImageOutlinedIcon fontSize="medium" />
                        </IconButton>
                    </StyledButtonContainer>
                )}
            </ListItem>
            {option.image && <ImageContainer large={false} image={option.image} />}

            <ImageUploadDialog
                key={questionId}
                open={open}
                handleSelectedFiles={insertImage}
                onClose={handleClose}
            />
        </>
    );
};

export default Option;
