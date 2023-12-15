import React from 'react';

import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { InputAdornment, TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import ISelectorOption from '@/interfaces/ISelectorOption';

const GeneralSelector = ({ options }: { options: ISelectorOption[] }) => {
    return (
        <TextField
            id="general-dropdown-selector"
            select
            label="Select"
            defaultValue={options[0].value}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <RadioButtonCheckedIcon />
                    </InputAdornment>
                ),
            }}
        >
            {options.map((option) => (
                <MenuItem key={option.key} value={option.value}>
                    {option.value}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default GeneralSelector;
