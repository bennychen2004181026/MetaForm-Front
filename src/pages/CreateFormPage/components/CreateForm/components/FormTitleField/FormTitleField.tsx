import React from 'react';

import { TextField } from '@mui/material';

import Editor from '../QuillEditor/QuillEditor';

const EditFormTitle = () => {
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
            <Editor />
        </>
    );
};
export default EditFormTitle;
