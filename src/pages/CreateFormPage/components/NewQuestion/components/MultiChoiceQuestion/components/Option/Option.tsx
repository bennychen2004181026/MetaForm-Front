import React from 'react';

import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, ListItem } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const Option = () => {
    return (
        <ListItem
            secondaryAction={
                <IconButton edge="end" aria-label="delete">
                    <CloseIcon />
                </IconButton>
            }
        >
            <ListItemIcon>
                <CircleOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Single-line item" />
        </ListItem>
    );
};

export default Option;
