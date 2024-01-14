import React, { useState } from 'react';

import CheckboxList from '@/components/CheckboxList';
import {} from '@/interfaces/CreateForm';
import { IQuestionResponse } from '@/interfaces/CreateResponse';

const CheckBoxesQuestion = ({ questionResponse }: { questionResponse: IQuestionResponse }) => {
    const { question } = questionResponse;

    const { options } = question;
    const [_, setSelected] = useState(['']);
    const handleCheckedChange = (selectedOptionIds: string[]) => {
        setSelected(selectedOptionIds);
    };
    return <CheckboxList setResult={handleCheckedChange} options={options} />;
};

export default CheckBoxesQuestion;
