import React, { useContext, useState } from 'react';

import { TextField } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';

import { questionTypes } from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTypeSelector/questionTypes';
import { NewQuestionContext } from '@/pages/CreateFormPage/components/NewQuestion/context/NewQuestionContext';

const QuestionTypeSelector = () => {
    const [selectedQuestionType, setSelectedQuestionType] = useState(questionTypes[0].value);
    const { dispatch } = useContext(NewQuestionContext);
    const onChangeSelect = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        e.preventDefault();
        const selectedQuestionTypeIndex = questionTypes.findIndex(
            (questionType) => e.target.value === questionType.value,
        );
        dispatch({
            type: 'CHANGE_QUESTION_TYPE',
            payload: selectedQuestionTypeIndex.toString(),
        });
        setSelectedQuestionType(e.target.value);
    };
    return (
        <TextField
            id="questionTypeSelector"
            select
            fullWidth
            value={selectedQuestionType}
            onChange={(e) => onChangeSelect(e)}
        >
            {questionTypes.map((option) => {
                return (
                    <MenuItem
                        key={option.id}
                        value={option.value}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            height: '3em',
                            fontFamily: `'Noto Sans', sans-serif`,
                        }}
                    >
                        <ListItemIcon>{option.icon}</ListItemIcon>
                        <ListItemText>{option.value}</ListItemText>
                    </MenuItem>
                );
            })}
        </TextField>
    );
};

export default QuestionTypeSelector;
