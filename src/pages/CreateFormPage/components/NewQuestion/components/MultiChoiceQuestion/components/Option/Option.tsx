import React, { useContext } from 'react';

import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, ListItem } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import IOption from '@/interfaces/IOption';
import { MuitichoiceContext } from '@/pages/CreateFormPage/components/NewQuestion/components/MultiChoiceQuestion/context/GlobalState';

const Option = ({ option }: { option: IOption }) => {
    const { dispatch } = useContext(MuitichoiceContext);
    const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        console.log('in delete');
        dispatch({
            type: 'DELETE_OPTION',
            payload: {
                id: option.id,
                value: option.value,
            },
        });
    };
    return (
        <ListItem
            secondaryAction={
                <IconButton onClick={handleDelete}>
                    <CloseIcon />
                </IconButton>
            }
        >
            <ListItemIcon>
                <CircleOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={option.value} />
        </ListItem>
    );
};

export default Option;
