import React from 'react';

import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { InputAdornment, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import ISelectorOption from '@/interfaces/IOption';

const GeneralSelector = ({ options }: { options: ISelectorOption[] }) => {
    return (
        <TextField
            id="general-dropdown-selector"
            select
            label="Select"
            defaultValue={options[0].value}
            fullWidth
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <RadioButtonCheckedIcon />
                    </InputAdornment>
                ),
            }}
        >
            {options.map((option) => (
                <MenuItem key={option.id} value={option.value}>
                    {option.value}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default GeneralSelector;
