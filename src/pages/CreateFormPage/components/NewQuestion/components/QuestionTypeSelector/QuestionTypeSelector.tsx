import React, { useContext, useState } from 'react';

import { Grid, TextField } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import styled from 'styled-components';

import { NewQuestionContext } from '@/pages/CreateFormPage/components/NewQuestion/components/MultiChoiceQuestion/context/NewQuestionContext';
import { questionTypes } from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTypeSelector/questionTypes';

const FixedWidthTypeSelector = styled.div`
    width: 300px;
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
            >
                {questionTypes.map((option) => {
                    return (
                        <MenuItem
                            key={option.id}
                            value={option.value}
                            sx={{ display: 'flex', flexDirection: 'row' }}
                        >
                            <Grid container sx={{ display: 'flex' }}>
                                <Grid item xs={4}>
                                    <ListItemIcon
                                        sx={{
                                            alignItems: 'center',
                                            mx: '3em',
                                        }}
                                    >
                                        {option.icon}
                                    </ListItemIcon>
                                </Grid>
                                <Grid item xs={8}>
                                    <ListItemText>{option.value}</ListItemText>
                                </Grid>
                            </Grid>
                        </MenuItem>
                    );
                })}
            </TextField>
        </FixedWidthTypeSelector>
    );
};

export default QuestionTypeSelector;
