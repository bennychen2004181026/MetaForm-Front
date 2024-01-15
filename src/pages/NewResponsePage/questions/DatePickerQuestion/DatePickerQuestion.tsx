import React, { useEffect, useState } from 'react';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';

import { IAnswer, IQuestionProps } from '@/interfaces/CreateResponse';

const DatePickerQuestion = ({ questionResponse, onAnswerChange }: IQuestionProps) => {
    const [value, setValue] = useState<Dayjs>(dayjs('2020-01-01'));
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
            <DemoContainer components={['DatePicker']}>
                <DateCalendar value={value} onChange={(newValue) => setValue(newValue!)} />
            </DemoContainer>
        </LocalizationProvider>
    );
};

export default DatePickerQuestion;
