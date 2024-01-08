import React from 'react';

import Grid from '@mui/material/Grid';

import FormCard from './FormCard/FormCard';
import { IForm } from '@/interfaces/CreateForm';

const FormCards = ({ forms }: { forms: IForm[] }) => {
    return (
        <Grid container spacing={4} justifyContent="center">
            {forms.map(({ formId, title, numberOfResponses }) => (
                <Grid item key={formId}>
                    <FormCard formTitle={title} numOfResponses={numberOfResponses} />
                </Grid>
            ))}
        </Grid>
    );
};

export default FormCards;
