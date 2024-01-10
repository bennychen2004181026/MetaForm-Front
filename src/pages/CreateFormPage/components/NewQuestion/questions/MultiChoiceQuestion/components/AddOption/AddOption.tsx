import React, { useContext } from 'react';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import { NewQuestionContext } from '@/pages/CreateFormPage/components/NewQuestion/context/NewQuestionContext';

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
        dispatch({
            type: 'ADD_OPTION',
            payload: {
                id: Math.floor(Math.random() * 10000).toString(),
                value: 'Other',
                otherOption: true,
            },
        });
    };

    return (
        <ButtonGroup variant="outlined">
            <Button onClick={handleAddOption} aria-label="Add a new Option">
                Add option
            </Button>

            <Button onClick={handleAllowOtherOption} aria-label="Add Other Option" disabled={other}>
                Add Other
            </Button>
        </ButtonGroup>
    );
};

export default AddOption;
