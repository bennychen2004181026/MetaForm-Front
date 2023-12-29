import * as React from 'react';

import { FormControl, ListItemText, MenuItem, OutlinedInput } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const fileTypes = ['Image', 'PDF'];
const CheckboxLabels = () => {
    const [numOfFiles, setNumOfFiles] = React.useState(1);
    const [allowedFiletypes, setAllowedFileTypes] = React.useState<string[]>([]);

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    const handleFileTypesChange = (event: SelectChangeEvent<typeof allowedFiletypes>) => {
        const {
            target: { value },
        } = event;
        setAllowedFileTypes(typeof value === 'string' ? value.split(',') : value);
    };
    const handleNumOfFilesChange = (event: SelectChangeEvent<number>) => {
        setNumOfFiles(event.target.value as number);
    };
    return (
        <FormGroup>
            <div>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <p>Allowed File Types</p>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        required
                        value={allowedFiletypes}
                        onChange={handleFileTypesChange}
                        input={<OutlinedInput />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {fileTypes.map((type) => (
                            <MenuItem key={type} value={type}>
                                <Checkbox checked={allowedFiletypes.indexOf(type) > -1} />
                                <ListItemText primary={type} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <p>Maximum files accepted</p>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={numOfFiles}
                        onChange={(e) => handleNumOfFilesChange(e)}
                    >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </FormGroup>
    );
};
export default CheckboxLabels;
