import React, { useState } from 'react';

import { TextField } from '@mui/material';
import styled from 'styled-components';

import { IFetchedQuestion } from '@/interfaces/CreateResponse';
import { questionTypeCode } from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTypeSelector/questionTypes';

const StyledLengthTextfield = styled(TextField)`
    width: 40rem;
    max-width: 800px;
`;
const MultiLineTextField = ({
    multilines,
    question,
    setValue,
}: {
    multilines: boolean;
    question: IFetchedQuestion;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const [_, setBlur] = useState(false);
    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };
    const { required, questionType } = question;
    return (
        <StyledLengthTextfield
            id="short-answer-question-textfield"
            variant="standard"
            multiline={multilines}
            required={required && questionType !== questionTypeCode.CHECKBOXES}
            rows={4}
            margin="normal"
            fullWidth
            onChange={(e) => handleContentChange(e)}
            onBlur={() => setBlur(true)}
        />
    );
};

export default MultiLineTextField;
