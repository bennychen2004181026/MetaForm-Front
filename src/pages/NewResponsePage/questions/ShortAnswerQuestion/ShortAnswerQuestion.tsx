import React, { useEffect, useState } from 'react';

import { TextField } from '@mui/material';

import { IAnswer, IQuestionProps } from '@/interfaces/CreateResponse';
import { questionTypeCode } from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTypeSelector/questionTypes';

const ShortAnswerQuestion = ({ questionResponse, onAnswerChange }: IQuestionProps) => {
    const { question } = questionResponse;
    const { questionType, _id } = question;
    const [value, setValue] = useState('');

    useEffect(() => {
        const answerBody = [value];
        const answer: IAnswer = { questionId: _id, answerBody };
        onAnswerChange(answer);
    }, [value]);

    return (
        <TextField
            id="short-answer-and-paragraph-question-input"
            variant="standard"
            label="Your Answer"
            multiline={questionType !== questionTypeCode.PARAGRAPH}
            onChange={(e) => setValue(e.target.value)}
            fullWidth
        />
    );
};

export default ShortAnswerQuestion;
