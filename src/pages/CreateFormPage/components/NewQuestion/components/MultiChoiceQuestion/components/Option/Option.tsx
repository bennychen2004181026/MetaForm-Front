import React, { useContext } from 'react';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import { IconButton, ListItem, TextField } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import styled from 'styled-components';

import IOption from '@/interfaces/IOption';
import { NewQuestionContext } from '@/pages/CreateFormPage/components/NewQuestion/components/MultiChoiceQuestion/context/GlobalState';

const StyledImageUploadButton = styled.div`
    visibility: hidden;
    margin-right: 4rem;
`;
const Styledabc = styled.div`
    &:hover {
        & #onHoverUploadImageButton {
            visibility: visible;
        }
    }
`;

const Option = ({ option, checkbox = false }: { option: IOption; checkbox?: boolean }) => {
    const { dispatch } = useContext(NewQuestionContext);
    const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        dispatch({
            type: 'DELETE_OPTION',
            payload: {
                id: option.id,
                value: option.value,
            },
        });
    };
    return (
        <Styledabc>
            <ListItem
                secondaryAction={
                    <IconButton onClick={handleDelete}>
                        <CloseIcon />
                    </IconButton>
                }
            >
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
                    {!option.otherOption ? (
                        <IconButton>
                            <ImageIcon fontSize="medium" />
                        </IconButton>
                    ) : (
                        <IconButton />
                    )}
                </StyledImageUploadButton>
            </ListItem>
        </Styledabc>
    );
};

export default Option;
