import React from 'react';

import { Grid } from '@mui/material';

import QuestionTypeSelector from '../QuestionTypeSelector';

import AddOption from './components/AddOption/AddOption';
import OptionList from './components/OptionList';
import QuestionTitle from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTitle';

const MuitiChoiceQuestion = () => {
    return (
        <Grid
            container
            sx={{
                display: 'flex',
                flexDirection: 'row',
                p: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <Grid
                xs={8}
                container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    p: 1,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <QuestionTitle />
                <OptionList dense />
                <AddOption />
            </Grid>
            <Grid item xs={3}>
                <QuestionTypeSelector />
            </Grid>
        </Grid>
    );
};

export default MuitiChoiceQuestion;
