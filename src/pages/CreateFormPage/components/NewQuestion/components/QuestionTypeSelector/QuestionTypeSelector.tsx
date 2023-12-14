import React, { useState } from 'react';

import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { FormControl, InputAdornment, InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import questionTypes from '@/pages/CreateFormPage/components/CreateForm/questionTypes';

const QuestionTypeSelector = () => {
    const [questionType, setQuestionType] = useState('Multiple Choice');

    const handleChange = (event: SelectChangeEvent) => {
        setQuestionType(event.target.value as string);
    };
    return (
        <FormControl fullWidth>
            <InputLabel id="question-type-select-label">Type</InputLabel>
            <Select
                labelId="question-type-select-label"
                id="question-type-select"
                value={questionType}
                label="Type"
                inputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <RadioButtonCheckedIcon />
                        </InputAdornment>
                    ),
                }}
                onChange={handleChange}
            >
                {questionTypes.map((type) => (
                    <MenuItem key={type}>{type}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default QuestionTypeSelector;
