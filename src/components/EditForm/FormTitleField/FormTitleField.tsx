import React from 'react';

import { TextField } from '@mui/material';

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
                    inputProps={{ style: { fontSize: 40 } }}
                />
            </div>
            <div>
                <TextField
                    required
                    id="form-description"
                    defaultValue="Description"
                    variant="standard"
                />
            </div>
        </>
    );
};
export default EditFormTitle;
