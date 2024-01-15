import React, { useEffect, useState } from 'react';

import { TextField } from '@mui/material';

import CheckboxList from '@/components/CheckboxList';
import { IAnswer, IQuestionProps } from '@/interfaces/CreateResponse';

const CheckBoxesQuestion = ({ questionResponse, onAnswerChange }: IQuestionProps) => {
    const { question } = questionResponse;

    const { other, _id } = question;
    const [selected, setSelected] = useState<string[]>([]);
    const [otherOption, setOtherOption] = useState('');

    const onOtherOptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        setOtherOption(e.target.value);
    };
    useEffect(() => {
        const answerBody = [...selected, otherOption];
        const answer: IAnswer = { questionId: _id, answerBody };
        onAnswerChange(answer);
    }, [selected, otherOption]);
    return (
        <>
            <CheckboxList question={question} selected={selected} setSelected={setSelected} />
            {other && (
                <TextField
                    id="Check-box-other-option"
                    label="Other"
                    fullWidth
                    variant="standard"
                    onChange={(e) => onOtherOptionChange(e)}
                />
            )}
        </>
    );
};
export default CheckBoxesQuestion;
