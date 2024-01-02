import React from 'react';

import Grid from '@mui/material/Grid';
// import { makeStyles } from '@mui/styles';

import FormCard from './FormCard/FormCard';

// const useStyles = makeStyles((theme) => ({
//     gridContainer: {
//         padding: '0 20px',
//     },
// }));

const FormCards = () => {
    // const classes = useStyles();
    return (
        <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
                <FormCard />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <FormCard />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <FormCard />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <FormCard />
            </Grid>
        </Grid>
    );
};

export default FormCards;
