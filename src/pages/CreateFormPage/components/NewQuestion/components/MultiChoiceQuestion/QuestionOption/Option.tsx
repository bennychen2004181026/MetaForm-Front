import React from 'react';

import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

const Option = () => {
    return (
        <div>
            <TextField
                required
                id="standard-required"
                defaultValue="Option"
                variant="outlined"
                margin="normal"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <CircleOutlinedIcon />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                // onClick={handleClickShowPassword}
                                // onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                <CloseIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
};

export default Option;
