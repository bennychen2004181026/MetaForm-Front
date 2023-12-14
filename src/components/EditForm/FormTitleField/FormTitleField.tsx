import React from 'react';

import TextField from '@mui/material/TextField';

const EditFormTitle = () => {
    return (
        <>
            <div style={{ marginBottom: 10 }}>
                <TextField
                    required
                    id="standard-required"
                    defaultValue="Untitled Form"
                    variant="standard"
                    margin="normal"
                    inputProps={{ style: { fontSize: 40 } }}
                />
            </div>

            <div>
                <TextField
                    required
                    id="standard-required"
                    defaultValue="Description"
                    variant="standard"
                />
            </div>
        </>
    );
};
export default EditFormTitle;
