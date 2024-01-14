import React, { useState } from 'react';

import { Button, FormControlLabel, Radio } from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { IOption } from '@/interfaces/CreateForm';
import { IAnswer, IQuestionResponse } from '@/interfaces/CreateResponse';
import MultiLineTextField from '@/layouts/MultiLineTextField';
import { saveQuestionAnswer } from '@/store/slices/formResponse/formResponseSlice';
import { AppDispatch } from '@/store/store';

const OtherOption = styled.div`
    display: flex;
    flex-direction: column;
`;

const MultiChoiceQuestion = ({ questionResponse }: { questionResponse: IQuestionResponse }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { question } = questionResponse;
    const [value, setValue] = useState('');
    const { options, _id } = question;
    const [openOtherTextField, setOpenOtherTextField] = useState(false);
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        if (event.target.value === 'Other') {
            setOpenOtherTextField(true);
        } else {
            setOpenOtherTextField(false);
        }
    };
    const handleSaveAnswer = () => {
        const answer: IAnswer = { questionId: _id, answerBody: [value] };
        dispatch(saveQuestionAnswer(answer));
    };
    return (
        <div>
            <RadioGroup name="multichoice question" value={value} onChange={handleRadioChange}>
                {options.map((option: IOption) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio />}
                        label={option.value}
                    />
                ))}
                {question.other && (
                    <OtherOption>
                        <FormControlLabel
                            key="Other"
                            value="Other"
                            control={<Radio />}
                            label="Other"
                        />
                        {openOtherTextField && (
                            <MultiLineTextField
                                multilines={false}
                                question={question}
                                value={value}
                                setValue={setValue}
                            />
                        )}
                    </OtherOption>
                )}
            </RadioGroup>
            <Button variant="outlined" onClick={handleSaveAnswer}>
                save
            </Button>
        </div>
    );
};

export default MultiChoiceQuestion;
