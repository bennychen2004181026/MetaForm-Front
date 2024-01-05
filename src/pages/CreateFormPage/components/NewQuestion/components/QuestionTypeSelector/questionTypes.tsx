import React from 'react';

import DropDownIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';
import FileUploadIcon from '@mui/icons-material/BackupOutlined';
import DateIcon from '@mui/icons-material/CalendarMonthOutlined';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ParagraphIcon from '@mui/icons-material/FeedOutlined';
import ShortAnswerIcon from '@mui/icons-material/NotesOutlined';
import ChoiceIcon from '@mui/icons-material/RadioButtonCheckedOutlined';
import TimeIcon from '@mui/icons-material/TimerOutlined';

import IOption from '@/interfaces/IOption';
import CheckboxesQuestion from '@/pages/CreateFormPage/components/NewQuestion/components/CheckboxesQuestion';
import DatePickerQuestion from '@/pages/CreateFormPage/components/NewQuestion/components/DatePickerQuestion';
import FileUploadQuestion from '@/pages/CreateFormPage/components/NewQuestion/components/FileUploadQuestion';
import MuitiChoiceQuestion from '@/pages/CreateFormPage/components/NewQuestion/components/MultiChoiceQuestion';
import ParagraphQuestion from '@/pages/CreateFormPage/components/NewQuestion/components/ParagraphQuestion';
import ShortAnswerQuestion from '@/pages/CreateFormPage/components/NewQuestion/components/ShortAnswerQuestion';
import TimePickerQuestion from '@/pages/CreateFormPage/components/NewQuestion/components/TimePickerQuestion';

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
            return <MuitiChoiceQuestion isCheckbox={false} />;
        case '1':
            return <ShortAnswerQuestion />;
        case '2':
            return <ParagraphQuestion />;
        case '3':
            return <CheckboxesQuestion />;
        case '4':
            return <FileUploadQuestion />;
        case '5':
            return <DatePickerQuestion />;
        case '6':
            return <TimePickerQuestion />;
        default:
            return <MuitiChoiceQuestion isCheckbox={false} />;
    }
};
export { getQuestion, questionIcons as icons, questionTypes };
