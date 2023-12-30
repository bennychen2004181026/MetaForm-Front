import React, { useContext, useState } from 'react';

import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { IconButton, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

import { NewQuestionContext } from '@/pages/CreateFormPage/components/NewQuestion/components/MultiChoiceQuestion/context/GlobalState';

const AddOption = () => {
    const { dispatch } = useContext(NewQuestionContext);
    const [text, SetText] = useState<string>('Add Option');
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({
            type: 'ADD_OPTION',
            payload: {
                id: Math.floor(Math.random() * 10000).toString(),
                value: text,
            },
        });
        SetText('Add Option');
    };

    return (
        <form onSubmit={onSubmit}>
            <TextField
                required
                id="muitichoice-question-option"
                value={text}
                variant="standard"
                margin="normal"
                fullWidth
                onChange={(e) => {
                    SetText(e.target.value);
                }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton type="submit">
                                <AddCircleOutlineRoundedIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </form>
    );
};

export default AddOption;
