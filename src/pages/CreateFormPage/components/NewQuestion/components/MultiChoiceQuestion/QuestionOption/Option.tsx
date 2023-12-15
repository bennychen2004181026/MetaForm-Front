import React from 'react';

import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

const Option = () => {
    return (
        <TextField
            required
            id="muitichoice-question-option"
            defaultValue="Option"
            variant="standard"
            margin="normal"
            fullWidth
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <CircleOutlinedIcon />
                    </InputAdornment>
                ),
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton>
                            <CloseIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default Option;
