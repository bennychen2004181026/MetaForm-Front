import React from 'react';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface DropdownSelectorOptions {
    options: string[];
}

const DropdownSelector: React.FC<DropdownSelectorOptions> = ({ options }) => {
    const [selected, setSelected] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSelected(event.target.value as string);
    };

    return (
        <Box sx={{ minWidth: 400 }}>
            <FormControl fullWidth>
                <InputLabel id="industry-select-label">Industry</InputLabel>
                <Select
                    labelId="industry-select-label"
                    id="company-industry-select"
                    value={selected}
                    label="Industry"
                    onChange={handleChange}
                >
                    {options.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};
export default DropdownSelector;
