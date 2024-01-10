import React from 'react';

import { TextField } from '@mui/material';
import styled from 'styled-components';

const FixedWidthTextField = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const FormTitleField = () => {
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
            />
            <TextField
                required
                id="form-description"
                defaultValue="Describe form purposes, rules or other explanations"
                variant="outlined"
                multiline
                rows={2}
                fullWidth
            />
        </FixedWidthTextField>
    );
};
export default FormTitleField;
