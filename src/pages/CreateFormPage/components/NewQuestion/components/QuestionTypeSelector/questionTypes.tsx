import React from 'react';

import FileUploadIcon from '@mui/icons-material/BackupOutlined';
import DateIcon from '@mui/icons-material/CalendarMonthOutlined';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ParagraphIcon from '@mui/icons-material/FeedOutlined';
import ShortAnswerIcon from '@mui/icons-material/NotesOutlined';
import ChoiceIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import TimeIcon from '@mui/icons-material/TimerOutlined';

import { IOption } from '@/interfaces/CreateForm';
import CreateCheckboxesQuestion from '@/pages/CreateFormPage/components/NewQuestion/createQuestions/CreateCheckboxesQuestion';
import CreateDatePickerQuestion from '@/pages/CreateFormPage/components/NewQuestion/createQuestions/CreateDatePickerQuestion';
import CreateFileUploadQuestion from '@/pages/CreateFormPage/components/NewQuestion/createQuestions/CreateFileUploadQuestion';
import CreateMuitiChoiceQuestion from '@/pages/CreateFormPage/components/NewQuestion/createQuestions/CreateMuitiChoiceQuestion';
import CreateParagraphQuestion from '@/pages/CreateFormPage/components/NewQuestion/createQuestions/CreateParagraphQuestion';
import CreateShortAnswerQuestion from '@/pages/CreateFormPage/components/NewQuestion/createQuestions/CreateShortAnswerQuestion';
import CreateTimePickerQuestion from '@/pages/CreateFormPage/components/NewQuestion/createQuestions/CreateTimePickerQuestion';

enum questionTypeStrings {
    MULTIPLE_CHOICE = 'Multiple Choice',
    SHORT_ANSWER = 'Short answer',
    PARAGRAPH = 'Paragraph',
    DROPDOWN = 'Dropdown',
    CHECKBOXES = 'CheckBoxes',
    FILE_UPLOAD = 'File upload',
    DATEPICKER = 'Date',
    TIMEPICKER = 'Time',
}
enum questionTypeCode {
    MULTIPLE_CHOICE = '0',
    SHORT_ANSWER = '1',
    PARAGRAPH = '2',
    CHECKBOXES = '3',
    FILE_UPLOAD = '4',
    DATEPICKER = '5',
    TIMEPICKER = '6',
}
const questionTypes: IOption[] = [
    {
        id: '0',
        value: questionTypeStrings.MULTIPLE_CHOICE,
        icon: <ChoiceIcon />,
    },
    {
        id: '1',
        value: questionTypeStrings.SHORT_ANSWER,
        icon: <ShortAnswerIcon />,
    },
    {
        id: '2',
        value: questionTypeStrings.PARAGRAPH,
        icon: <ParagraphIcon />,
    },
    {
        id: '3',
        value: questionTypeStrings.CHECKBOXES,
        icon: <CheckBoxIcon />,
    },
    {
        id: '4',
        value: questionTypeStrings.FILE_UPLOAD,
        icon: <FileUploadIcon />,
    },
    {
        id: '5',
        value: questionTypeStrings.DATEPICKER,
        icon: <DateIcon />,
    },
    {
        id: '6',
        value: questionTypeStrings.TIMEPICKER,
        icon: <TimeIcon />,
    },
];
const questionIcons = [
    ChoiceIcon,
    ShortAnswerIcon,
    ParagraphIcon,
    CheckBoxIcon,
    FileUploadIcon,
    DateIcon,
    TimeIcon,
];

const getQuestion = (questionId: string) => {
    switch (questionId) {
        case '0':
            return <CreateMuitiChoiceQuestion isCheckbox={false} />;
        case '1':
            return <CreateShortAnswerQuestion disabled />;
        case '2':
            return <CreateParagraphQuestion disabled />;
        case '3':
            return <CreateCheckboxesQuestion />;
        case '4':
            return <CreateFileUploadQuestion />;
        case '5':
            return <CreateDatePickerQuestion disabled />;
        case '6':
            return <CreateTimePickerQuestion disabled />;
        default:
            return <CreateMuitiChoiceQuestion isCheckbox={false} />;
    }
};
export { getQuestion, questionIcons as icons, questionTypes, questionTypeCode };
