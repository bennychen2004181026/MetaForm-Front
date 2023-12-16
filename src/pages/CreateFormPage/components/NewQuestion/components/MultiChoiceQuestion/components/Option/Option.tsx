import React, { useContext } from 'react';

import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, ListItem } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import IOption from '@/interfaces/IOption';
import { MuitichoiceContext } from '@/pages/CreateFormPage/components/NewQuestion/components/MultiChoiceQuestion/context/GlobalState';

const Option = ({ option }: { option: IOption }) => {
    // const { deleteOption } = useContext(MuitichoiceContext);

    return (
        <ListItem
            secondaryAction={
                <IconButton onClick={() => console.log('123')}>
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
