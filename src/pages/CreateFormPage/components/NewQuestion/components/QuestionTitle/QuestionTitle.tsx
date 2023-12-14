import React from 'react';

import TextField from '@mui/material/TextField';

const QuestionTitle = () => {
    return (
        <TextField
            required
            id="standard-required"
            defaultValue="Untitled Question (Type Your Question Title)"
            variant="outlined"
            margin="normal"
            type="text"
            maxRows={1}
            fullWidth
        />
    );
};

export default QuestionTitle;
