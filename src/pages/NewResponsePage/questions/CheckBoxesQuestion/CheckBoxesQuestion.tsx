import React, { useState } from 'react';

import CheckboxList from '@/components/CheckboxList';
import { IQuestion } from '@/interfaces/CreateForm';

const CheckBoxesQuestion = ({ question }: { question: IQuestion }) => {
    const { options } = question;
    const [_, setSelected] = useState(['']);
    const handleCheckedChange = (selectedOptionIds: string[]) => {
        setSelected(selectedOptionIds);
    };
    return <CheckboxList setResult={handleCheckedChange} options={options} />;
};

export default CheckBoxesQuestion;
