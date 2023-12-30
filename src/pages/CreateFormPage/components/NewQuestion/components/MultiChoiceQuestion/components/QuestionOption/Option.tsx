import React from 'react';

import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

const AddOption = () => {
    return (
        <TextField
            required
            id="muitichoice-question-option"
            defaultValue="Add new option"
            variant="standard"
            margin="normal"
            fullWidth
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton>
                            <AddCircleOutlineRoundedIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default AddOption;
