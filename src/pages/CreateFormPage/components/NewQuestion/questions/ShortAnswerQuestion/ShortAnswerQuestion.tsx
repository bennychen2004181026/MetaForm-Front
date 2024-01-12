import React from 'react';

import { TextField } from '@mui/material';
import styled from 'styled-components';

const StyledLengthTextfield = styled(TextField)`
    width: 40rem;
`;
const ShortAnswerQuestion = () => {
    return (
        <StyledLengthTextfield
            id="short-answer-question-textfield"
            defaultValue="Short answer text"
            variant="standard"
            margin="normal"
            disabled
            fullWidth
        />
    );
};

export default ShortAnswerQuestion;
