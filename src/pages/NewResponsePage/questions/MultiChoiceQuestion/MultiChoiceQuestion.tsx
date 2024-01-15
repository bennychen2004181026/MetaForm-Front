import React, { useEffect, useState } from 'react';

import { FormControlLabel, Radio, TextField } from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import styled from 'styled-components';

import { IAnswer, IQuestionProps } from '@/interfaces/CreateResponse';
import ImageContainer from '@/layouts/ImageContainer';

const StyledRadioGroup = styled(RadioGroup)`
    margin-left: 40px;
`;
const MultiChoiceQuestion = ({ questionResponse, onAnswerChange }: IQuestionProps) => {
    const { question } = questionResponse;
    const [selected, setSelected] = useState<string>('');
    const { options, _id, other } = question;
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelected(event.target.value);
    };
    useEffect(() => {
        const answerBody = [selected];
        const answer: IAnswer = { questionId: _id, answerBody };
        onAnswerChange(answer);
    }, [selected]);
    return (
        <StyledRadioGroup name="multichoice question" value={selected} onChange={handleRadioChange}>
            {options.map((option) => (
                <>
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio />}
                        label={option.value}
                    />
                    {option.image && <ImageContainer large={false} image={option.image} />}
                </>
            ))}

            {other && (
                <TextField
                    id="multi-choice-other-option"
                    label="Other"
                    variant="standard"
                    onChange={(e) => setSelected(e.target.value)}
                />
            )}
        </StyledRadioGroup>
    );
};

export default MultiChoiceQuestion;
