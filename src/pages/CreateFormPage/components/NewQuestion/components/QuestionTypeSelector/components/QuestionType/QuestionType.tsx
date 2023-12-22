import React from 'react';

import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';

const imageFolderUrl =
    'src/pages/CreateFormPage/components/NewQuestion/components/QuestionTypeSelector/assets/';

const QuestionType = ({ key, value, icon }: { key: string; value: string; icon: string }) => {
    const imageUrl = `${imageFolderUrl}${icon}.png`;
    console.log({ key, value, icon });
    return (
        <MenuItem key={key} value={value}>
            <ListItemIcon sx={{ alignItems: 'center', mx: '3em' }}>
                <img src={imageUrl} alt={value} />
            </ListItemIcon>
            <ListItemText> {value} </ListItemText>
        </MenuItem>
    );
};

export default QuestionType;
