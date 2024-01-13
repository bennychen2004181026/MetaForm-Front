import React, { useContext, useState } from 'react';

import { InputAdornment, TextField } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import styled from 'styled-components';

import { questionTypes } from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTypeSelector/questionTypes';
import { NewQuestionContext } from '@/pages/CreateFormPage/components/NewQuestion/context/NewQuestionContext';

const FixedWidthTypeSelector = styled.div`
    width: 300px;
`;
const StyledMenuItem = styled(MenuItem)`
    height: 2em;
`;
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
                            {selectedQuestionType
                                ? questionTypes.find(
                                      (questionType) => questionType.value === selectedQuestionType,
                                  )?.icon
                                : null}
                        </InputAdornment>
                    ),
                }}
            >
                {questionTypes.map((option) => {
                    return (
                        <StyledMenuItem key={option.id} value={option.value}>
                            <ListItemText>{option.value}</ListItemText>
                        </StyledMenuItem>
                    );
                })}
            </TextField>
        </FixedWidthTypeSelector>
    );
};

export default QuestionTypeSelector;
