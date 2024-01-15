import React, { useContext } from 'react';

import { Button, Stack } from '@mui/material';
import styled from 'styled-components';

import { NewQuestionContext } from '@/pages/CreateFormPage/components/NewQuestion/context/NewQuestionContext';

const StyledButton = styled(Button)`
    text-transform: none;
`;
const AddOption = () => {
    const { dispatch, state } = useContext(NewQuestionContext);
    const { options, other } = state;
    const totalOptions = options.length;
    const handleAddOption = () => {
        dispatch({
            type: 'ADD_OPTION',
            payload: {
                id: Math.floor(Math.random() * 10000).toString(),
                value: `Option  ${totalOptions + 1}`,
            },
        });
    };
    const handleAllowOtherOption = () => {
        dispatch({
            type: 'ALLOW_OTHER_OPTION',
            payload: true,
        });
    };
    return (
        <Stack direction="row" spacing={2}>
            <StyledButton variant="contained" onClick={handleAddOption}>
                Add option
            </StyledButton>
            <StyledButton variant="contained" onClick={handleAllowOtherOption} disabled={other}>
                Add Other
            </StyledButton>
        </Stack>
    );
};

export default AddOption;
