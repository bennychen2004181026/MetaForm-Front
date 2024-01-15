import React from 'react';

import Grid from '@mui/material/Grid';

import FormCard from './FormCard/FormCard';
import { IFectchedForm } from '@/interfaces/CreateResponse';

const FormCards = ({ forms }: { forms: IFectchedForm[] }) => {
    return (
        <Grid container spacing={4} justifyContent="center">
            {forms.map((form) => (
                <Grid item xs={12} md={6} lg={4} key={form._id}>
                    <FormCard form={form} />
                </Grid>
            ))}
        </Grid>
    );
};

export default FormCards;
