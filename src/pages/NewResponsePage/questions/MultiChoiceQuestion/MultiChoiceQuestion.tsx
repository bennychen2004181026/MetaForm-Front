import React, { useState } from 'react';

import { FormControlLabel } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import styled from 'styled-components';

import { IQuestion } from '@/interfaces/CreateForm';
import MultiLineTextField from '@/layouts/MultiLineTextField';

const OtherOption = styled.div`
    display: flex;
    flex-direction: column;
`;
const MultiChoiceQuestion = ({ question }: { question: IQuestion }) => {
    const [value, setValue] = useState('');
    const { options } = question;
    const [openOtherTextField, setOpenOtherTextField] = useState(false);
    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        if (event.target.value === 'Other') {
            setOpenOtherTextField(true);
        } else {
            setOpenOtherTextField(false);
        }
    };
    return (
        <RadioGroup name="multichoice question" value={value} onChange={handleRadioChange}>
            {options.map((option) => (
                <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label={option.value}
                />
            ))}
            {question.other && (
                <OtherOption>
                    <FormControlLabel key="Other" value="Other" control={<Radio />} label="Other" />
                    {openOtherTextField && (
                        <MultiLineTextField
                            multilines={false}
                            requiredQuestion={question.required}
                        />
                    )}
                </OtherOption>
            )}
        </RadioGroup>
    );
};

export default MultiChoiceQuestion;
