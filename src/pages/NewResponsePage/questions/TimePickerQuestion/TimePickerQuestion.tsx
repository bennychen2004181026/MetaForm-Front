import React, { useEffect, useState } from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs';

import { IAnswer, IQuestionProps } from '@/interfaces/CreateResponse';

const TimePickerQuestion = ({ questionResponse, onAnswerChange }: IQuestionProps) => {
    const [value, setValue] = useState<Dayjs>(dayjs('2022-04-17T15:30'));
    const {
        question: { _id },
    } = questionResponse;

    useEffect(() => {
        const answerBody = [value.toISOString()];
        const answer: IAnswer = { questionId: _id, answerBody };
        onAnswerChange(answer);
    }, [value]);
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
                <TimePicker
                    label="Controlled picker"
                    value={value}
                    onChange={(newValue) => setValue(newValue!)}
                />
            </DemoContainer>
        </LocalizationProvider>
    );
};

export default TimePickerQuestion;
