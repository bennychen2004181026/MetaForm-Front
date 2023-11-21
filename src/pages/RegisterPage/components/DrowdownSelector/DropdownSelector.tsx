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
    const [industry, setIndustry] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setIndustry(event.target.value as string);
    };

    return (
        <Box sx={{ minWidth: 400 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Industry</InputLabel>
                <Select
                    labelId="company-industry-select-label"
                    id="company-industry-select"
                    value={industry}
                    label="Industry"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};
export default DropdownSelector;
