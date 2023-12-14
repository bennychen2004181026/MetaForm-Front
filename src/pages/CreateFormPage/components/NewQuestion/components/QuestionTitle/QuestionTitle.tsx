import React from 'react';

import TextField from '@mui/material/TextField';

const QuestionTitle = () => {
    return (
        <div style={{ marginBottom: 10 }}>
            <TextField
                required
                id="standard-required"
                defaultValue="Question"
                variant="filled"
                margin="normal"
                inputProps={{ style: { fontSize: 28 } }}
            />
        </div>
    );
};

export default QuestionTitle;
