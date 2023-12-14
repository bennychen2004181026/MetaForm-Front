import React from 'react';

import { Grid } from '@mui/material';

import QuestionTypeSelector from '../QuestionTypeSelector';

import Option from './QuestionOption/Option';
import QuestionTitle from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTitle';

const MuitiChoiceQuestion = () => {
    return (
        <Grid container>
            <Grid xs={12}>
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
                    <Grid item xs={8}>
                        <QuestionTitle />
                    </Grid>
                    <Grid item xs={2}>
                        <QuestionTypeSelector />
                    </Grid>
                </Grid>
                <Grid xs={10}>
                    <Option />
                    <Option />
                    <Option />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default MuitiChoiceQuestion;
