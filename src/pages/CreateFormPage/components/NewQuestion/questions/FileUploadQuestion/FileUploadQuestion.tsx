import * as React from 'react';

import { FormControl, ListItemText, MenuItem, OutlinedInput } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import styled from 'styled-components';

const fileTypes = ['Image', 'PDF'];
const StyledFormControl = styled(FormControl)`
    margin: 1rem;
    width: 300px;
    display: flex;
    flex-direction: column;
`;
const StyledFormGroup = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
const FileUploadQuestion = () => {
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
        <StyledFormGroup>
            <div>
                <StyledFormControl>
                    <div>
                        <p>Allowed File Types</p>
                    </div>
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
                </StyledFormControl>
            </div>
            <div>
                <StyledFormControl>
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
                </StyledFormControl>
            </div>
        </StyledFormGroup>
    );
};
export default FileUploadQuestion;
