import React, { Dispatch, SetStateAction } from 'react';

import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { InputAdornment, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import { questionTypes } from '@/pages/CreateFormPage/components/NewQuestion/questionTypes';

const QuestionTypeSelector = ({
    setQuestionType,
}: {
    setQuestionType: Dispatch<SetStateAction<number>>;
}) => {
    const handleSelectQuestionType = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => {
        const selectedQuestionTypeIndex = questionTypes.findIndex(
            (questionType) => e.target.value === questionType.value,
        );
        setQuestionType(selectedQuestionTypeIndex || 0);
    };
    return (
        <TextField
            id="general-dropdown-selector"
            select
            label="Select"
            defaultValue={questionTypes[0].value}
            onChange={(e) => handleSelectQuestionType(e)}
            fullWidth
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
    );
};

export default QuestionTypeSelector;
