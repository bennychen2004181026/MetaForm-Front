import React, { useContext, useState } from 'react';

import {
    FormControl,
    FormControlLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Switch,
} from '@mui/material';
import styled from 'styled-components';

import CheckboxList from '@/components/CheckboxList';
import { NewQuestionContext } from '@/pages/CreateFormPage/components/NewQuestion/context/NewQuestionContext';
import { fileTypesObjs } from '@/pages/CreateFormPage/components/NewQuestion/createQuestions/CreateFileUploadQuestion/FileTypes';

const maxNumberOfFiles = [1, 3, 5];
const StyledFormControl = styled(FormControl)`
    margin: 1rem;
    width: 300px;
    display: flex;
    flex-direction: column;
`;
const StyledFormGroup = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;
const CreateFileUploadQuestion = () => {
    const [specifyFileTypes, setSpecficyFileTypes] = useState<boolean>(false);
    const { state, dispatch } = useContext(NewQuestionContext);
    const { numOfFiles } = state;

    const handleNumOfFilesChange = (event: SelectChangeEvent<number>) => {
        dispatch({
            type: 'SET_MAX_NUM_OF_FILES',
            payload: event.target.value as 1 | 3 | 5,
        });
    };
    const handleFileTypesChange = (selectedOptionIds: string[]) => {
        dispatch({
            type: 'SET_ALLOWED_FILE_TYPES',
            payload: selectedOptionIds,
        });
    };
    return (
        <StyledFormGroup>
            <div>
                <StyledFormControl>
                    <FormControlLabel
                        value="Allow only specific file types"
                        control={
                            <Switch
                                color="primary"
                                checked={specifyFileTypes}
                                onChange={() => setSpecficyFileTypes(!specifyFileTypes)}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        }
                        label="Allow only specific file types"
                        labelPlacement="end"
                    />
                    {specifyFileTypes && (
                        <CheckboxList setResult={handleFileTypesChange} options={fileTypesObjs} />
                    )}
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
                        {maxNumberOfFiles.map((num) => (
                            <MenuItem key={num} value={num}>
                                {num}
                            </MenuItem>
                        ))}
                    </Select>
                </StyledFormControl>
            </div>
        </StyledFormGroup>
    );
};
export default CreateFileUploadQuestion;
