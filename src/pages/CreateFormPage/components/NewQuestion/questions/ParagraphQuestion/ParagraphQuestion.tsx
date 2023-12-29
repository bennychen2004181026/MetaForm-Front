import React from 'react';

import { TextField } from '@mui/material';
import styled from 'styled-components';

const StyledLengthTextfield = styled(TextField)`
    width: 80%;
`;
const ParagraphQuestion = () => {
    return (
        <StyledLengthTextfield
            id="short-answer-question-textfield"
            defaultValue="Long answer text"
            variant="outlined"
            multiline
            rows={4}
            margin="normal"
            disabled
            fullWidth
        />
    );
};

export default ParagraphQuestion;
