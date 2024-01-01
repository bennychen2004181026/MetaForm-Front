import React, { useContext } from 'react';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import { NewQuestionContext } from '@/pages/CreateFormPage/components/NewQuestion/components/MultiChoiceQuestion/context/GlobalState';

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
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button onClick={handleAddOption}>Add option</Button>
            {!other ? (
                <Button onClick={handleAllowOtherOption}>Add Other </Button>
            ) : (
                <Button disabled onClick={handleAllowOtherOption}>
                    Add Other
                </Button>
            )}
        </ButtonGroup>
    );
};

export default AddOption;
