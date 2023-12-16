import React from 'react';

import { Container, Grid } from '@mui/material';

import ConditionalSectionContainer from '@/pages/CreateFormPage/components/CreateForm/components/ConditionalSectionContainer';
import FormTitleField from '@/pages/CreateFormPage/components/CreateForm/components/FormTitleField';
import MuitiChoiceQuestion from '@/pages/CreateFormPage/components/NewQuestion/components/MultiChoiceQuestion';
import QuestionTypeSelector from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTypeSelector';

const CreateForm = () => {
    return (
        <Container sx={{ display: 'flex', flexDirection: 'column' }}>
            <ConditionalSectionContainer backgroundColor="#e0e0e0">
                <FormTitleField />
            </ConditionalSectionContainer>
            <ConditionalSectionContainer>
                <Grid
                    container
                    xs={12}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        p: 1,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Grid item xs={8}>
                        <MuitiChoiceQuestion />
                    </Grid>
                    <Grid item xs={3}>
                        <QuestionTypeSelector />
                    </Grid>
                </Grid>
            </ConditionalSectionContainer>
        </Container>
    );
};
export default CreateForm;
