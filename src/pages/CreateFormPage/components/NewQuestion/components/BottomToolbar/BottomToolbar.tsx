import React, { useContext } from 'react';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Divider, FormControlLabel, IconButton } from '@mui/material';
import Switch from '@mui/material/Switch';
import styled from 'styled-components';

import { NewQuestionContext } from '@/pages/CreateFormPage/components/NewQuestion/context/NewQuestionContext';

const BottomToolbarContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`;
const BottomToolbar = () => {
    const { state, dispatch } = useContext(NewQuestionContext);
    const { required } = state;

    const handleRequiredChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: 'SET_REQUIRED',
            payload: event.target.checked,
        });
    };

    return (
        <BottomToolbarContainer>
            <IconButton>
                <ContentCopyIcon />
            </IconButton>
            <IconButton>
                <DeleteForeverIcon />
            </IconButton>
            <Divider orientation="vertical" variant="middle" flexItem sx={{ margin: '0 30px' }} />
            <FormControlLabel
                required
                control={
                    <Switch
                        checked={required}
                        onChange={handleRequiredChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                }
                label="Required"
            />
        </BottomToolbarContainer>
    );
};

export default BottomToolbar;
