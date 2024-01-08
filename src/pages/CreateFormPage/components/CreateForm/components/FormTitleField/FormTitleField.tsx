import React, { useContext } from 'react';

import { TextField } from '@mui/material';
import styled from 'styled-components';

import { NewFormGlobalContext } from '@/pages/CreateFormPage/components/CreateForm/context/NewFormGlobalContext';

const FixedWidthTextField = styled.div`
    width: 50em;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const FormTitleField = () => {
    const { dispatch } = useContext(NewFormGlobalContext);
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch({
            type: 'CHANGE_FORM_TITLE',
            payload: e.target.value,
        });
    };
    const handleDescriptionChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        dispatch({
            type: 'CHANGE_FORM_DESCRIPTION',
            payload: e.target.value,
        });
    };
    return (
        <FixedWidthTextField>
            <TextField
                required
                id="form-title"
                defaultValue="Untitled Form"
                variant="standard"
                margin="normal"
                fullWidth
                inputProps={{ style: { fontSize: 40 } }}
                onChange={(e) => handleTitleChange(e)}
            />
            <TextField
                required
                id="form-description"
                defaultValue="Describe form purposes, rules or other explanations"
                variant="outlined"
                multiline
                rows={2}
                fullWidth
                onChange={(e) => handleDescriptionChange(e)}
            />
        </FixedWidthTextField>
    );
};
export default FormTitleField;
