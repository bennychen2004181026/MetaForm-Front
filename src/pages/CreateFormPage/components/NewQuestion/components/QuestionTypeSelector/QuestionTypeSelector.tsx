import React, { useContext, useState } from 'react';

import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { InputAdornment, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import styled from 'styled-components';

import { NewQuestionContext } from '@/pages/CreateFormPage/components/NewQuestion/components/MultiChoiceQuestion/context/GlobalState';
import { questionTypes } from '@/pages/CreateFormPage/components/NewQuestion/questionTypes';

const FixedWidthTypeSelector = styled('div')({
    width: '200px',
});
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
        <FixedWidthTypeSelector>
            <TextField
                id="questionTypeSelector"
                select
                fullWidth
                value={selectedQuestionType}
                onChange={(e) => onChangeSelect(e)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <RadioButtonCheckedIcon />
                        </InputAdornment>
                    ),
                }}
            >
                {questionTypes.map((option) => (
                    <MenuItem key={option.id} value={option.value}>
                        {option.value}
                    </MenuItem>
                ))}
            </TextField>
        </FixedWidthTypeSelector>
    );
};

export default QuestionTypeSelector;
