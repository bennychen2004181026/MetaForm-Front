import React from 'react';

import { Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import styled from 'styled-components';

import FormCard from './FormCard/FormCard';

const StyledGridContainer = styled(Grid)`
    padding: 0 20px;
`;

const FormCards = () => {
    return (
        <Paper>
            <StyledGridContainer container spacing={4}>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormCard
                        formTitle="Test Form by Monash university sadasdasdasdasda"
                        numOfResponses={10}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormCard
                        formTitle="Test Form by Monash university sadasdasdasdasda"
                        numOfResponses={10}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormCard formTitle="Test Form by Monash university" numOfResponses={10} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormCard formTitle="Test Form by Monash university" numOfResponses={10} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={12}>
                    <FormCard formTitle="Test Form by Monash university" numOfResponses={10} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={12}>
                    <FormCard formTitle="Test Form by Monash university" numOfResponses={10} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <FormCard formTitle="Test Form by Monash university" numOfResponses={10} />
                </Grid>
            </StyledGridContainer>
        </Paper>
    );
};

export default FormCards;
