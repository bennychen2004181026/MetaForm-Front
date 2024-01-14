import React, { useState } from 'react';

import { IQuestionResponse } from '@/interfaces/CreateResponse';
import MultiLineTextField from '@/layouts/MultiLineTextField';
import { questionTypeCode } from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTypeSelector/questionTypes';

const ShortAnswerQuestion = ({ questionResponse }: { questionResponse: IQuestionResponse }) => {
    const { question } = questionResponse;
    const { questionType } = question;
    const [value, setValue] = useState('');
    return (
        <MultiLineTextField
            multilines={questionType === questionTypeCode.PARAGRAPH}
            question={question}
            value={value}
            setValue={setValue}
        />
    );
};

export default ShortAnswerQuestion;
