import React from 'react';

import { Container } from '@mui/material';
import Paper from '@mui/material/Paper';

import FormTitleField from '@/components/EditForm/FormTitleField';
import MuitiChoiceQuestion from '@/pages/CreateFormPage/components/NewQuestion/components/MultiChoiceQuestion';

const CreateForm = () => {
    return (
        <Container sx={{ display: 'flex', flexDirection: 'column' }}>
            <Paper
                elevation={4}
                sx={{
                    p: 4,
                    bgcolor: '#e0e0e0',
                }}
            >
                <FormTitleField />
            </Paper>
            <Paper
                elevation={4}
                sx={{
                    p: 4,
                }}
            >
                <MuitiChoiceQuestion />
            </Paper>
        </Container>
    );
};
export default CreateForm;
