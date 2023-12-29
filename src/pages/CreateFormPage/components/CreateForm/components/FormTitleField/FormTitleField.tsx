import React from 'react';

import { TextField } from '@mui/material';

import TextEditor from '@/pages/CreateFormPage/components/NewQuestion/components/TextEditor';

const FormTitleField = () => {
    return (
        <>
            <div>
                <TextField
                    required
                    id="form-title"
                    defaultValue="Untitled Form"
                    variant="standard"
                    margin="normal"
                    fullWidth
                    inputProps={{ style: { fontSize: 40 } }}
                />
            </div>
            <div>
                <TextField
                    required
                    id="form-description"
                    defaultValue="Description"
                    variant="standard"
                    fullWidth
                />
            </div>
<<<<<<< HEAD
            <TextEditor />
=======
>>>>>>> origin/feature/MET-101-paragraph-question--time-and-dat
        </>
    );
};
export default FormTitleField;
