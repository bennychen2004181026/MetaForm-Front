import React from 'react';

import { Grid } from '@mui/material';

import QuestionTypeSelector from './components/QuestionTypeSelector';

const NewQuestion = ({ children }: { children: React.ReactNode }) => {
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
                {children}
            </Grid>
            <Grid item xs={3}>
                <QuestionTypeSelector />
            </Grid>
        </Grid>
    );
};
export default NewQuestion;
