import React from 'react';

import IOption from '@/interfaces/IOption';
import CheckboxesQuestion from '@/pages/CreateFormPage/components/NewQuestion/components/CheckboxesQuestion';
import MuitiChoiceQuestion from '@/pages/CreateFormPage/components/NewQuestion/components/MultiChoiceQuestion';
import choice from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTypeSelector/assets/choice.jpg';
import date from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTypeSelector/assets/date.jpg';
import dropDown from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTypeSelector/assets/dropDown.jpg';
import fileUpload from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTypeSelector/assets/fileUpload.jpg';
import paragraph from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTypeSelector/assets/paragraph.jpg';
import shortAnswer from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTypeSelector/assets/shortAnswer.jpg';
import time from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTypeSelector/assets/time.jpg';
import yesOrNo from '@/pages/CreateFormPage/components/NewQuestion/components/QuestionTypeSelector/assets/yesOrNo.jpg';
import ShortAnswerQuestion from '@/pages/CreateFormPage/components/NewQuestion/components/ShortAnswerQuestion';

enum questionTypeStrings {
    MULTIPLE_CHOICE = 'Multiple Choice',
    SHORT_ANSWER = 'Short answer',
    PARAGRAPH = 'Paragraph',
    DROPDOWN = 'Dropdown',
    CHECKBOXES = 'CheckBoxes',
    FILE_UPLOAD = 'File upload',
    DATEPICKER = 'Date',
    TIMEPICKER = 'Time',
    YES_NO = 'Yes/No',
}
const questionTypes: IOption[] = [
    {
        id: '0',
        value: questionTypeStrings.MULTIPLE_CHOICE,
        icon: { choice },
    },
    {
        id: '1',
        value: questionTypeStrings.SHORT_ANSWER,
        icon: { shortAnswer },
    },
    {
        id: '2',
        value: questionTypeStrings.PARAGRAPH,
        icon: { paragraph },
    },
    {
        id: '3',
        value: questionTypeStrings.DROPDOWN,
        icon: { dropDown },
    },
    {
        id: '4',
        value: questionTypeStrings.CHECKBOXES,
        icon: { choice },
    },
    {
        id: '5',
        value: questionTypeStrings.FILE_UPLOAD,
        icon: { fileUpload },
    },
    {
        id: '6',
        value: questionTypeStrings.DATEPICKER,
        icon: { date },
    },
    {
        id: '7',
        value: questionTypeStrings.TIMEPICKER,
        icon: { time },
    },
    {
        id: '8',
        value: questionTypeStrings.YES_NO,
        icon: { yesOrNo },
    },
];
const questionIcons = [
    choice,
    shortAnswer,
    paragraph,
    dropDown,
    choice,
    fileUpload,
    date,
    time,
    yesOrNo,
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
export { getQuestion, questionIcons as images, questionTypes };
