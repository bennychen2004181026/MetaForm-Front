import React, { useState } from 'react';

import { Alert, TextField } from '@mui/material';
import styled from 'styled-components';

const StyledLengthTextfield = styled(TextField)`
    width: 40rem;
    max-width: 800px;
`;
const MultiLineTextField = ({
    multilines,
    requiredQuestion,
}: {
    multilines: boolean;
    requiredQuestion: boolean;
}) => {
    const [blur, setBlur] = useState(false);
    const [value, setValue] = useState('');
    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };
    return (
        <>
            <StyledLengthTextfield
                id="short-answer-question-textfield"
                variant="standard"
                multiline={multilines}
                rows={4}
                margin="normal"
                fullWidth
                onChange={(e) => handleContentChange(e)}
                onBlur={() => setBlur(true)}
            />
            {blur && requiredQuestion && value === '' && (
                <Alert severity="error">This is a required question!</Alert>
            )}
        </>
    );
};

export default MultiLineTextField;
