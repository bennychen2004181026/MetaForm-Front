import React, { useState } from 'react';

import { Grid } from '@mui/material';

import SelectedQuestion from './components/QuestionBody/SelectedQuestion';
import QuestionTypeSelector from './components/QuestionTypeSelector';

const NewQuestion = () => {
    const [questionType, setQuestionType] = useState(0);
    return (
        <Grid
            container
            xs={12}
            sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Grid item xs={8}>
                <SelectedQuestion selectedQuestionType={questionType} />
            </Grid>
            <Grid item xs={3}>
                <QuestionTypeSelector setQuestionType={setQuestionType} />
            </Grid>
        </Grid>
    );
};
export default NewQuestion;
