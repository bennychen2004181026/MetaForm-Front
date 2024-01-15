import React from 'react';

import { TextField } from '@mui/material';
import styled from 'styled-components';

const StyledLengthTextfield = styled(TextField)`
    width: 40rem;
    max-width: 800px;
`;
const CreateParagraphQuestion = ({ disabled }: { disabled: boolean }) => {
    return (
        <StyledLengthTextfield
            id="short-answer-question-textfield"
            defaultValue="Long answer text"
            variant="standard"
            multiline
            rows={4}
            margin="normal"
            disabled={disabled}
            fullWidth
        />
    );
};

export default CreateParagraphQuestion;
