import React from 'react';

import IOption from '@/interfaces/IOption';
import CheckboxesQuestion from '@/pages/CreateFormPage/components/NewQuestion/components/CheckboxesQuestion';
import MuitiChoiceQuestion from '@/pages/CreateFormPage/components/NewQuestion/components/MultiChoiceQuestion';
import ShortAnswerQuestion from '@/pages/CreateFormPage/components/NewQuestion/components/ShortAnswerQuestion';

enum questionTypeStrings {
    MULTIPLE_CHOICE = 'Multiple Choice',
    SHORT_ANSWER = 'Short Answer',
    PARAGRAPH = 'Paragraph',
    DROPDOWN = 'Dropdown',
    CHECKBOXES = 'CheckBoxes',
    DATEPICKER = 'Date Picker',
}
const questionTypes: IOption[] = [
    {
        id: '0',
        value: questionTypeStrings.MULTIPLE_CHOICE,
    },
    {
        id: '1',
        value: questionTypeStrings.SHORT_ANSWER,
    },
    {
        id: '2',
        value: questionTypeStrings.PARAGRAPH,
    },
    {
        id: '3',
        value: questionTypeStrings.DROPDOWN,
    },
    {
        id: '4',
        value: questionTypeStrings.CHECKBOXES,
    },
    {
        id: '5',
        value: questionTypeStrings.DATEPICKER,
    },
];

const getQuestion = (questionId: string) => {
    switch (questionId) {
        case '0':
            return <MuitiChoiceQuestion isCheckbox={false} />;
        case '1':
            return <ShortAnswerQuestion />;
        case '4':
            return <CheckboxesQuestion />;
        default:
            return <MuitiChoiceQuestion isCheckbox={false} />;
    }
};
export { getQuestion, questionTypes };
